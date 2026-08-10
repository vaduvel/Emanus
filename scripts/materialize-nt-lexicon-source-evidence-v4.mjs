#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const sourcesPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-review-sources.json")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence.json")
const MORPHGNT = {
  id: "morphgnt-sblgnt-6.12",
  repository: "morphgnt/sblgnt",
  ref: "6.12",
  license: "CC-BY-SA",
  citation: "Tauber, J. K., ed. (2017) MorphGNT: SBLGNT Edition, Version 6.12",
}
const MORPH_FILES = {
  matei: "61-Mt-morphgnt.txt", marcu: "62-Mk-morphgnt.txt", luca: "63-Lk-morphgnt.txt", ioan: "64-Jn-morphgnt.txt",
  fapte: "65-Ac-morphgnt.txt", romani: "66-Ro-morphgnt.txt", "1-corinteni": "67-1Co-morphgnt.txt", "2-corinteni": "68-2Co-morphgnt.txt",
  galateni: "69-Ga-morphgnt.txt", efeseni: "70-Eph-morphgnt.txt", filipeni: "71-Php-morphgnt.txt", coloseni: "72-Col-morphgnt.txt",
  "1-tesaloniceni": "73-1Th-morphgnt.txt", "2-tesaloniceni": "74-2Th-morphgnt.txt", "1-timotei": "75-1Ti-morphgnt.txt", "2-timotei": "76-2Ti-morphgnt.txt",
  tit: "77-Tit-morphgnt.txt", filimon: "78-Phm-morphgnt.txt", evrei: "79-Heb-morphgnt.txt", iacov: "80-Jas-morphgnt.txt",
  "1-petru": "81-1Pe-morphgnt.txt", "2-petru": "82-2Pe-morphgnt.txt", "1-ioan": "83-1Jn-morphgnt.txt", "2-ioan": "84-2Jn-morphgnt.txt",
  "3-ioan": "85-3Jn-morphgnt.txt", iuda: "86-Jud-morphgnt.txt", apocalipsa: "87-Re-morphgnt.txt",
}

function fail(message) { console.error(`[NT lexicon source evidence v4] ${message}`); process.exit(1) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function gitBlobSha(buffer) {
  const header = Buffer.from(`blob ${buffer.length}\0`, "utf8")
  return crypto.createHash("sha1").update(header).update(buffer).digest("hex")
}
function arg(name) { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : null }
function exactGreek(value) {
  return String(value ?? "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/ς/gu, "σ")
    .replace(/[^\p{Script=Greek}\p{M}]+/gu, "")
}
function looseGreek(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/ς/gu, "σ")
    .replace(/[^\p{Script=Greek}]+/gu, "")
}
function greekTokens(value) {
  return [...String(value ?? "").normalize("NFD").matchAll(/[\p{Script=Greek}\u0300-\u036f]+/gu)]
    .map((match) => match[0].normalize("NFC"))
    .filter((token) => exactGreek(token))
}
function rawGithubUrl(source) {
  const encodedPath = source.path.split("/").map(encodeURIComponent).join("/")
  return `https://raw.githubusercontent.com/${source.repository}/${source.commitSha}/${encodedPath}`
}
function morphRawUrl(file) {
  return `https://raw.githubusercontent.com/${MORPHGNT.repository}/${MORPHGNT.ref}/${encodeURIComponent(file)}`
}
function compactLineLocator(numbers) {
  const sorted = [...new Set(numbers)].sort((a, b) => a - b)
  if (!sorted.length) return ""
  if (sorted.length === 1) return `TBESG line ${sorted[0]}`
  const contiguous = sorted.every((value, index) => index === 0 || value === sorted[index - 1] + 1)
  return contiguous ? `TBESG lines ${sorted[0]}-${sorted.at(-1)}` : `TBESG lines ${sorted.join(",")}`
}
function cartesian(lists, limit = 16) {
  let result = [[]]
  for (const list of lists) {
    const next = []
    for (const prefix of result) {
      for (const item of list) {
        next.push([...prefix, item])
        if (next.length >= limit) break
      }
      if (next.length >= limit) break
    }
    result = next
    if (!result.length) break
  }
  return result
}

if (!fs.existsSync(corpusDir) || !fs.existsSync(sourcesPath)) fail("final corpus/source registry missing")
const registry = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const source = (registry.sources ?? []).find((entry) => entry.id === "stepbible-tbesg")
if (!source?.repository || !source?.commitSha || !source?.path || !source?.blobSha) fail("pinned TBESG source metadata missing")

const sourceFile = arg("--source-file")
let sourceBuffer
if (sourceFile) {
  if (!fs.existsSync(sourceFile)) fail(`source file missing: ${sourceFile}`)
  sourceBuffer = fs.readFileSync(sourceFile)
} else {
  const response = await fetch(rawGithubUrl(source), { redirect: "follow" })
  if (!response.ok) fail(`failed to fetch pinned TBESG: HTTP ${response.status}`)
  sourceBuffer = Buffer.from(await response.arrayBuffer())
}
const actualBlobSha = gitBlobSha(sourceBuffer)
if (actualBlobSha !== source.blobSha) fail(`TBESG blob mismatch: ${actualBlobSha} != ${source.blobSha}`)

const tbByExactLemma = new Map()
for (const [index, rawLine] of sourceBuffer.toString("utf8").split(/\r?\n/u).entries()) {
  if (!rawLine.trim()) continue
  const columns = rawLine.split("\t")
  if (columns.length < 4) continue
  const strongId = String(columns[0] ?? "").trim()
  const lemmaField = String(columns[3] ?? "").trim()
  const transliteration = String(columns[4] ?? "").trim()
  const morphology = String(columns[5] ?? "").trim()
  const briefGloss = String(columns[6] ?? "").trim()
  for (const token of new Set(greekTokens(lemmaField))) {
    const key = exactGreek(token)
    if (!key) continue
    if (!tbByExactLemma.has(key)) tbByExactLemma.set(key, [])
    tbByExactLemma.get(key).push({ lineNumber: index + 1, strongId, lemmaField, transliteration, morphology, briefGloss, rawLine })
  }
}
function collapseTbGroups(records) {
  const grouped = new Map()
  for (const item of records) {
    const key = `${item.strongId}\u0000${exactGreek(item.lemmaField)}`
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(item)
  }
  return [...grouped.values()].map((group) => {
    const first = group[0]
    const rawLines = group.map((item) => item.rawLine)
    return {
      lineNumbers: group.map((item) => item.lineNumber),
      strongId: first.strongId,
      canonicalLemma: first.lemmaField,
      transliteration: first.transliteration,
      morphology: first.morphology,
      briefGloss: [...new Set(group.map((item) => item.briefGloss).filter(Boolean))].join(" / "),
      rawLines,
      lineSha256: `sha256:${sha256(rawLines.join("\n"))}`,
    }
  })
}
function tbGroupsForLemma(lemma) { return collapseTbGroups(tbByExactLemma.get(exactGreek(lemma)) ?? []) }
function tbCandidateFromGroup(group, matchKind, morphgntEvidence = undefined) {
  return {
    sourceId: source.id,
    sourceCommitSha: source.commitSha,
    sourceBlobSha: source.blobSha,
    sourceLocator: compactLineLocator(group.lineNumbers),
    strongId: group.strongId,
    canonicalLemma: group.canonicalLemma,
    transliteration: group.transliteration,
    morphology: group.morphology,
    briefGloss: group.briefGloss,
    matchKind,
    lineSha256: group.lineSha256,
    rawLine: group.rawLines.join("\n"),
    ...(morphgntEvidence ? { morphgntEvidence } : {}),
  }
}

const morphCache = new Map()
async function loadMorphBook(bookId) {
  if (morphCache.has(bookId)) return morphCache.get(bookId)
  const file = MORPH_FILES[bookId]
  if (!file) fail(`no MorphGNT mapping for ${bookId}`)
  const response = await fetch(morphRawUrl(file), { redirect: "follow" })
  if (!response.ok) fail(`failed to fetch MorphGNT ${file}: HTTP ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const rows = []
  for (const rawLine of buffer.toString("utf8").split(/\r?\n/u)) {
    if (!rawLine.trim()) continue
    const columns = rawLine.trim().split(/\s+/u)
    if (columns.length < 7 || !/^\d{6}$/.test(columns[0])) continue
    rows.push({
      bcv: columns[0], chapter: Number(columns[0].slice(2, 4)), verse: Number(columns[0].slice(4, 6)),
      pos: columns[1], parsing: columns[2], text: columns[3], word: columns[4], normalizedWord: columns[5], lemma: columns[6],
      exactText: exactGreek(columns[3]), exactWord: exactGreek(columns[4]), exactNormalized: exactGreek(columns[5]), exactLemma: exactGreek(columns[6]),
      looseText: looseGreek(columns[3]), looseWord: looseGreek(columns[4]), looseNormalized: looseGreek(columns[5]),
    })
  }
  const value = { file, blobSha: gitBlobSha(buffer), rows }
  morphCache.set(bookId, value)
  return value
}

async function resolveWithMorph(bookId, chapterNumber, verseStart, verseEnd, original) {
  const tokens = greekTokens(original)
  if (!tokens.length) return { candidates: [], morphgntProblem: "no-greek-tokens" }
  const morph = await loadMorphBook(bookId)
  const passage = morph.rows.filter((row) => row.chapter === chapterNumber && row.verse >= verseStart && row.verse <= verseEnd)
  const tokenGroups = []
  const tokenEvidence = []
  for (const token of tokens) {
    const exact = exactGreek(token)
    const loose = looseGreek(token)
    let matches = passage.filter((row) => row.exactText === exact || row.exactWord === exact || row.exactNormalized === exact)
    let resolution = "exact-diacritic-preserving-surface"
    if (!matches.length) {
      matches = passage.filter((row) => row.looseText === loose || row.looseWord === loose || row.looseNormalized === loose)
      resolution = "loose-surface-fallback"
    }
    if (!matches.length) return { candidates: [], morphgntProblem: `surface-not-found-in-passage:${token}`, morphgntFile: morph.file, morphgntBlobSha: morph.blobSha }
    const lemmas = [...new Map(matches.map((row) => [row.exactLemma, row.lemma])).values()]
    if (lemmas.length !== 1) return { candidates: [], morphgntProblem: `surface-has-${lemmas.length}-lemmas:${token}`, morphgntFile: morph.file, morphgntBlobSha: morph.blobSha }
    const lemma = lemmas[0]
    const groups = tbGroupsForLemma(lemma)
    if (!groups.length) return { candidates: [], morphgntProblem: `resolved-lemma-not-in-tbesg:${lemma}`, morphgntFile: morph.file, morphgntBlobSha: morph.blobSha }
    tokenGroups.push(groups)
    tokenEvidence.push({
      inputToken: token, resolution, lemma,
      occurrences: matches.map((row) => ({ bcv: row.bcv, word: row.word, normalizedWord: row.normalizedWord, lemma: row.lemma, pos: row.pos, parsing: row.parsing })),
    })
  }
  const combinations = cartesian(tokenGroups)
  const candidates = combinations.map((combination) => {
    const rawLines = combination.flatMap((group) => group.rawLines)
    const lineNumbers = combination.flatMap((group) => group.lineNumbers)
    return {
      sourceId: source.id, sourceCommitSha: source.commitSha, sourceBlobSha: source.blobSha,
      sourceLocator: combination.map((group) => compactLineLocator(group.lineNumbers)).join(" + "),
      strongId: combination.map((group) => group.strongId).join(" + "),
      canonicalLemma: combination.map((group) => group.canonicalLemma).join(" "),
      transliteration: combination.map((group) => group.transliteration).join(" "),
      morphology: combination.map((group) => group.morphology).join(" | "),
      briefGloss: combination.map((group) => group.briefGloss).join("; "),
      matchKind: "morphgnt-passage-form-to-exact-lemma+canonical-lemma",
      lineSha256: `sha256:${sha256(rawLines.join("\n"))}`,
      rawLine: rawLines.join("\n"),
      morphgntEvidence: { sourceId: MORPHGNT.id, repository: MORPHGNT.repository, ref: MORPHGNT.ref, file: morph.file, fileBlobSha: morph.blobSha, license: MORPHGNT.license, tokens: tokenEvidence },
      tbesgLineNumbers: [...new Set(lineNumbers)].sort((a, b) => a - b),
    }
  })
  return { candidates, morphgntFile: morph.file, morphgntBlobSha: morph.blobSha }
}

const entries = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        const meaning = String(word.meaning ?? "")
        const reviewId = sha256(`${book.id}\u0000${chapter.number}\u0000${unit.ref}\u0000${word.original}\u0000${meaning}`)
        const tokens = greekTokens(word.original)
        let candidates = []
        let morphResolution = null
        if (tokens.length === 1) {
          candidates = tbGroupsForLemma(tokens[0]).map((group) => tbCandidateFromGroup(group, "canonical-lemma-diacritic-exact"))
        }
        if (!candidates.length) {
          morphResolution = await resolveWithMorph(book.id, chapter.number, unit.verseStart, unit.verseEnd, word.original)
          candidates = morphResolution.candidates
        }
        entries.push({
          reviewId, bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original,
          normalizedLemma: looseGreek(word.original), meaning, meaningSha256: `sha256:${sha256(meaning)}`,
          candidateCount: candidates.length, candidates,
          ...(morphResolution?.morphgntProblem ? { morphgntProblem: morphResolution.morphgntProblem } : {}),
          ...(morphResolution?.morphgntFile ? { morphgntFile: morphResolution.morphgntFile, morphgntBlobSha: morphResolution.morphgntBlobSha } : {}),
        })
      }
    }
  }
}

const matched = entries.filter((entry) => entry.candidateCount > 0).length
const unique = entries.filter((entry) => entry.candidateCount === 1).length
const ambiguous = entries.filter((entry) => entry.candidateCount > 1).length
const unmatched = entries.length - matched
const morphResolved = entries.filter((entry) => entry.candidates.some((candidate) => candidate.matchKind.startsWith("morphgnt-"))).length
fs.writeFileSync(outputPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-v4",
  policy: "Greek lexical lookup is diacritic-preserving. An original-language note is matched directly to TBESG only when its single Greek token exactly matches the accented canonical lemma after Unicode normalization. Inflected and multi-word forms are resolved inside the exact explanation passage with MorphGNT SBLGNT 6.12, preferring exact diacritic-preserving surface matches; only the resulting exact lemma is then looked up in TBESG. Accent-stripped Greek is never used as a lexical lemma key. MorphGNT remains morphology/lemmatization evidence, not lexical-definition authority. No candidate constitutes automatic approval of the Romanian gloss.",
  source: { id: source.id, repository: source.repository, commitSha: source.commitSha, path: source.path, blobSha: source.blobSha, verifiedBlobSha: actualBlobSha, license: source.license },
  morphologySource: { ...MORPHGNT, files: [...morphCache.entries()].map(([bookId, morph]) => ({ bookId, file: morph.file, blobSha: morph.blobSha })) },
  counts: { entries: entries.length, matched, unique, ambiguous, unmatched, morphResolved },
  entries,
}, null, 2) + "\n", "utf8")
console.log(`NT lexicon source evidence v4: ${entries.length} entries / ${matched} matched / ${unique} unique / ${ambiguous} ambiguous / ${unmatched} unmatched / ${morphResolved} via MorphGNT; accent-stripped lemma matching disabled.`)
