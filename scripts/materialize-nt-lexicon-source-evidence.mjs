#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const sourcesPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-review-sources.json")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence.json")

function fail(message) { console.error(`[NT lexicon source evidence] ${message}`); process.exit(1) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function gitBlobSha(buffer) {
  const header = Buffer.from(`blob ${buffer.length}\0`, "utf8")
  return crypto.createHash("sha1").update(header).update(buffer).digest("hex")
}
function arg(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : null
}
function normalizeGreek(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/ς/gu, "σ")
    .replace(/[^\p{Script=Greek}]+/gu, "")
}
function greekTokens(value) {
  return [...String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").matchAll(/[\p{Script=Greek}]+/gu)]
    .map((match) => normalizeGreek(match[0]))
    .filter(Boolean)
}
function rawGithubUrl(source) {
  const encodedPath = source.path.split("/").map(encodeURIComponent).join("/")
  return `https://raw.githubusercontent.com/${source.repository}/${source.commitSha}/${encodedPath}`
}

if (!fs.existsSync(corpusDir) || !fs.existsSync(sourcesPath)) fail("final corpus/source registry missing")
const registry = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const source = (registry.sources ?? []).find((entry) => entry.id === "stepbible-tbesg")
if (!source?.repository || !source?.commitSha || !source?.path || !source?.blobSha) fail("pinned stepbible-tbesg source metadata missing")

const sourceFile = arg("--source-file")
let sourceBuffer
if (sourceFile) {
  if (!fs.existsSync(sourceFile)) fail(`source file missing: ${sourceFile}`)
  sourceBuffer = fs.readFileSync(sourceFile)
} else {
  const url = rawGithubUrl(source)
  const response = await fetch(url, { redirect: "follow" })
  if (!response.ok) fail(`failed to fetch pinned TBESG: HTTP ${response.status}`)
  sourceBuffer = Buffer.from(await response.arrayBuffer())
}
const actualBlobSha = gitBlobSha(sourceBuffer)
if (actualBlobSha !== source.blobSha) fail(`TBESG blob mismatch: ${actualBlobSha} != ${source.blobSha}`)
const rawSource = sourceBuffer.toString("utf8")

// TBESG is tab-separated. Column 4 (zero-based index 3) is the canonical Greek
// lemma field. Match ONLY there. Searching every Greek token in the whole raw
// line creates false evidence when an inflected word merely appears inside the
// definition/example text of an unrelated lemma.
const lines = rawSource.split(/\r?\n/u)
const byCanonicalLemma = new Map()
for (let index = 0; index < lines.length; index += 1) {
  const rawLine = lines[index]
  if (!rawLine.trim()) continue
  const columns = rawLine.split("\t")
  if (columns.length < 4) continue
  const strongId = String(columns[0] ?? "").trim()
  const lemmaField = String(columns[3] ?? "").trim()
  const transliteration = String(columns[4] ?? "").trim()
  const morphology = String(columns[5] ?? "").trim()
  const briefGloss = String(columns[6] ?? "").trim()
  const lemmaTokens = new Set(greekTokens(lemmaField))
  for (const token of lemmaTokens) {
    if (!byCanonicalLemma.has(token)) byCanonicalLemma.set(token, [])
    byCanonicalLemma.get(token).push({
      lineNumber: index + 1,
      strongId,
      lemmaField,
      transliteration,
      morphology,
      briefGloss,
      rawLine,
      lineSha256: `sha256:${sha256(rawLine)}`,
      matchKind: "canonical-lemma-column-exact",
    })
  }
}

const entries = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        const meaning = String(word.meaning ?? "")
        const reviewId = sha256(`${book.id}\u0000${chapter.number}\u0000${unit.ref}\u0000${word.original}\u0000${meaning}`)
        const normalizedLemma = normalizeGreek(word.original)
        const candidates = (byCanonicalLemma.get(normalizedLemma) ?? [])
          .slice(0, 12)
          .map((candidate) => ({
            sourceId: source.id,
            sourceCommitSha: source.commitSha,
            sourceBlobSha: source.blobSha,
            sourceLocator: `TBESG line ${candidate.lineNumber}`,
            lineNumber: candidate.lineNumber,
            strongId: candidate.strongId,
            canonicalLemma: candidate.lemmaField,
            transliteration: candidate.transliteration,
            morphology: candidate.morphology,
            briefGloss: candidate.briefGloss,
            matchKind: candidate.matchKind,
            lineSha256: candidate.lineSha256,
            rawLine: candidate.rawLine,
          }))
        entries.push({
          reviewId,
          bookId: book.id,
          chapter: chapter.number,
          ref: unit.ref,
          original: word.original,
          normalizedLemma,
          meaning,
          meaningSha256: `sha256:${sha256(meaning)}`,
          candidateCount: candidates.length,
          candidates,
        })
      }
    }
  }
}

const matched = entries.filter((entry) => entry.candidateCount > 0).length
const unique = entries.filter((entry) => entry.candidateCount === 1).length
const ambiguous = entries.filter((entry) => entry.candidateCount > 1).length
const unmatched = entries.length - matched
const output = {
  schema: "emanus-nt-lexicon-source-evidence-v2",
  policy: "Diagnostic/source-review evidence only. The source bytes are fetched from the pinned repository commit and rejected unless their computed Git blob SHA equals the registered blobSha. A match is accepted only when the normalized Emanus form exactly matches a Greek token in TBESG's canonical lemma column; Greek words appearing only in definition/example text are ignored. A candidate never constitutes automatic approval of the Romanian gloss.",
  source: {
    id: source.id,
    repository: source.repository,
    commitSha: source.commitSha,
    path: source.path,
    blobSha: source.blobSha,
    verifiedBlobSha: actualBlobSha,
    license: source.license,
  },
  counts: { entries: entries.length, matched, unique, ambiguous, unmatched },
  entries,
}
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8")
console.log(`NT lexicon source evidence: ${entries.length} entries / ${matched} canonical-lemma matches / ${unique} unique / ${ambiguous} ambiguous / ${unmatched} unmatched / blob ${actualBlobSha}.`)
