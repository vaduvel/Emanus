#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const evidencePath = path.join(dataDir, "nt-lexicon-source-evidence.json")
const sourcesPath = path.join(dataDir, "nt-lexicon-review-sources.json")
const corpusDir = path.join(dataDir, "nt-final-source-first")

function fail(message) { console.error(`[NT reviewed Strong aliases] ${message}`); process.exit(1) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function exactGreek(value) {
  return String(value ?? "").normalize("NFC").toLowerCase().replace(/ς/gu, "σ").replace(/[^\p{Script=Greek}\p{M}]+/gu, "")
}
function rawUrl(repo, ref, file) {
  return `https://raw.githubusercontent.com/${repo}/${ref}/${file.split("/").map(encodeURIComponent).join("/")}`
}

const REVIEWED_ALIASES = [
  {
    bookId: "matei",
    chapter: 10,
    ref: "Matei 10:24-33",
    original: "φοβεῖσθε",
    meaning: "nu vă temeți / vă temeți; formă a verbului φοβέομαι, «a se teme».",
    morphFile: "61-Mt-morphgnt.txt",
    morphRef: "6.12",
    morphSurface: "φοβεῖσθε",
    morphLemma: "φοβέομαι",
    strongId: "G5399",
    rationale: "MorphGNT uses the deponent lemma φοβέομαι for the exact Matthew 10 surface form; the pinned Extended Strong lexical family is G5399. The alias is reviewed explicitly rather than inferred by accent stripping or fuzzy lemma matching."
  }
]

if (!fs.existsSync(evidencePath) || !fs.existsSync(sourcesPath) || !fs.existsSync(corpusDir)) fail("required evidence/source/corpus missing")
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const registry = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const tbesg = (registry.sources ?? []).find((source) => source.id === "stepbible-tbesg")
if (!tbesg?.repository || !tbesg?.commitSha || !tbesg?.path || !tbesg?.blobSha) fail("pinned TBESG source missing")

const tbResponse = await fetch(rawUrl(tbesg.repository, tbesg.commitSha, tbesg.path), { redirect: "follow" })
if (!tbResponse.ok) fail(`TBESG fetch failed: HTTP ${tbResponse.status}`)
const tbLines = (await tbResponse.text()).split(/\r?\n/u)

let resolved = 0
for (const rule of REVIEWED_ALIASES) {
  const entry = (evidence.entries ?? []).find((item) =>
    item.bookId === rule.bookId && item.chapter === rule.chapter && item.ref === rule.ref && item.original === rule.original && item.meaning === rule.meaning
  )
  if (!entry) fail(`${rule.ref} ${rule.original}: reviewed alias target missing`)
  if (entry.candidateCount !== 0 || (entry.candidates ?? []).length !== 0) fail(`${rule.ref} ${rule.original}: reviewed alias must only resolve a still-unmatched entry`)

  const morphResponse = await fetch(rawUrl("morphgnt/sblgnt", rule.morphRef, rule.morphFile), { redirect: "follow" })
  if (!morphResponse.ok) fail(`MorphGNT ${rule.morphFile} fetch failed: HTTP ${morphResponse.status}`)
  const morphRows = (await morphResponse.text()).split(/\r?\n/u).filter(Boolean).map((raw) => raw.trim().split(/\s+/u))
  const passageMatches = morphRows.filter((columns) => {
    if (columns.length < 7 || !/^\d{6}$/.test(columns[0])) return false
    const ch = Number(columns[0].slice(2,4))
    const verse = Number(columns[0].slice(4,6))
    return ch === rule.chapter && verse >= 24 && verse <= 33 && exactGreek(columns[5]) === exactGreek(rule.morphSurface) && exactGreek(columns[6]) === exactGreek(rule.morphLemma)
  })
  if (!passageMatches.length) fail(`${rule.ref} ${rule.original}: exact MorphGNT surface→lemma evidence missing`)

  const tbMatches = []
  for (let index = 0; index < tbLines.length; index += 1) {
    const raw = tbLines[index]
    if (!raw.trim()) continue
    const columns = raw.split("\t")
    if (String(columns[0] ?? "").trim() !== rule.strongId) continue
    tbMatches.push({ lineNumber: index + 1, raw, lemma: String(columns[3] ?? "").trim(), transliteration: String(columns[4] ?? "").trim(), morphology: String(columns[5] ?? "").trim(), gloss: String(columns[6] ?? "").trim() })
  }
  if (!tbMatches.length) fail(`${rule.ref} ${rule.original}: ${rule.strongId} absent from pinned TBESG`)

  const rawLines = tbMatches.map((item) => item.raw)
  entry.candidates = [{
    sourceId: tbesg.id,
    sourceCommitSha: tbesg.commitSha,
    sourceBlobSha: tbesg.blobSha,
    sourceLocator: tbMatches.length === 1 ? `TBESG line ${tbMatches[0].lineNumber}` : `TBESG lines ${tbMatches.map((item) => item.lineNumber).join(",")}`,
    strongId: rule.strongId,
    canonicalLemma: [...new Set(tbMatches.map((item) => item.lemma).filter(Boolean))].join(" / "),
    transliteration: [...new Set(tbMatches.map((item) => item.transliteration).filter(Boolean))].join(" / "),
    morphology: [...new Set(tbMatches.map((item) => item.morphology).filter(Boolean))].join(" / "),
    briefGloss: [...new Set(tbMatches.map((item) => item.gloss).filter(Boolean))].join(" / "),
    matchKind: "reviewed-morphgnt-deponent-lemma-to-strong-alias",
    lineSha256: `sha256:${sha256(rawLines.join("\n"))}`,
    rawLine: rawLines.join("\n"),
    reviewedAliasRationale: rule.rationale,
    morphgntEvidence: {
      repository: "morphgnt/sblgnt",
      ref: rule.morphRef,
      file: rule.morphFile,
      surface: rule.morphSurface,
      lemma: rule.morphLemma,
      occurrences: passageMatches.map((columns) => ({ bcv: columns[0], word: columns[4], normalizedWord: columns[5], lemma: columns[6] }))
    }
  }]
  entry.candidateCount = 1
  delete entry.morphgntProblem
  entry.reviewedStrongAlias = { strongId: rule.strongId, rationale: rule.rationale }
  resolved += 1
}

const matched = (evidence.entries ?? []).filter((entry) => entry.candidateCount > 0).length
const unique = (evidence.entries ?? []).filter((entry) => entry.candidateCount === 1).length
const ambiguous = (evidence.entries ?? []).filter((entry) => entry.candidateCount > 1).length
evidence.counts = { ...(evidence.counts ?? {}), matched, unique, ambiguous, unmatched: (evidence.entries ?? []).length - matched, reviewedStrongAliasesResolved: resolved }
fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2) + "\n", "utf8")
console.log(`NT reviewed Strong aliases: ${resolved}/${REVIEWED_ALIASES.length} exact reviewed alias mappings resolved.`)
