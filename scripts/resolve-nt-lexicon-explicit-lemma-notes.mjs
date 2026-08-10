#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const evidencePath = path.join(dataDir, "nt-lexicon-source-evidence.json")
const sourcesPath = path.join(dataDir, "nt-lexicon-review-sources.json")
const corpusDir = path.join(dataDir, "nt-final-source-first")
const MORPH_REPO = "morphgnt/sblgnt"
const MORPH_REF = "6.12"
const MORPH_FILES = {
  matei: "61-Mt-morphgnt.txt", marcu: "62-Mk-morphgnt.txt", luca: "63-Lk-morphgnt.txt", ioan: "64-Jn-morphgnt.txt",
  fapte: "65-Ac-morphgnt.txt", romani: "66-Ro-morphgnt.txt", "1-corinteni": "67-1Co-morphgnt.txt", "2-corinteni": "68-2Co-morphgnt.txt",
  galateni: "69-Ga-morphgnt.txt", efeseni: "70-Eph-morphgnt.txt", filipeni: "71-Php-morphgnt.txt", coloseni: "72-Col-morphgnt.txt",
  "1-tesaloniceni": "73-1Th-morphgnt.txt", "2-tesaloniceni": "74-2Th-morphgnt.txt", "1-timotei": "75-1Ti-morphgnt.txt", "2-timotei": "76-2Ti-morphgnt.txt",
  tit: "77-Tit-morphgnt.txt", filimon: "78-Phm-morphgnt.txt", evrei: "79-Heb-morphgnt.txt", iacov: "80-Jas-morphgnt.txt",
  "1-petru": "81-1Pe-morphgnt.txt", "2-petru": "82-2Pe-morphgnt.txt", "1-ioan": "83-1Jn-morphgnt.txt", "2-ioan": "84-2Jn-morphgnt.txt",
  "3-ioan": "85-3Jn-morphgnt.txt", iuda: "86-Jud-morphgnt.txt", apocalipsa: "87-Re-morphgnt.txt"
}

function fail(message) { console.error(`[NT explicit-lemma resolver] ${message}`); process.exit(1) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function exactGreek(value) {
  return String(value ?? "").normalize("NFC").toLowerCase().replace(/ς/gu, "σ").replace(/[^\p{Script=Greek}\p{M}]+/gu, "")
}
function greekTokens(value) {
  return [...String(value ?? "").normalize("NFD").matchAll(/[\p{Script=Greek}\u0300-\u036f]+/gu)]
    .map((match) => match[0].normalize("NFC"))
    .filter((token) => exactGreek(token))
}
function compactLineLocator(numbers) {
  const sorted = [...new Set(numbers)].sort((a, b) => a - b)
  if (sorted.length === 1) return `TBESG line ${sorted[0]}`
  return `TBESG lines ${sorted.join(",")}`
}
function rawUrl(repo, ref, file) {
  return `https://raw.githubusercontent.com/${repo}/${ref}/${file.split("/").map(encodeURIComponent).join("/")}`
}

if (!fs.existsSync(evidencePath) || !fs.existsSync(sourcesPath) || !fs.existsSync(corpusDir)) fail("required evidence/source/corpus missing")
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const tbesg = (sources.sources ?? []).find((source) => source.id === "stepbible-tbesg")
if (!tbesg) fail("TBESG source missing")

const tbResponse = await fetch(rawUrl(tbesg.repository, tbesg.commitSha, tbesg.path))
if (!tbResponse.ok) fail(`TBESG fetch failed: HTTP ${tbResponse.status}`)
const tbLines = (await tbResponse.text()).split(/\r?\n/u)
const tbByLemma = new Map()
for (let index = 0; index < tbLines.length; index += 1) {
  const raw = tbLines[index]
  const columns = raw.split("\t")
  if (columns.length < 4) continue
  const strongId = String(columns[0] ?? "").trim()
  const lemmaField = String(columns[3] ?? "").trim()
  for (const lemmaToken of new Set(greekTokens(lemmaField))) {
    const key = exactGreek(lemmaToken)
    if (!tbByLemma.has(key)) tbByLemma.set(key, [])
    tbByLemma.get(key).push({ lineNumber: index + 1, strongId, lemmaField, transliteration: String(columns[4] ?? "").trim(), morphology: String(columns[5] ?? "").trim(), briefGloss: String(columns[6] ?? "").trim(), raw })
  }
}
function groupsForLemma(token) {
  const records = tbByLemma.get(exactGreek(token)) ?? []
  const grouped = new Map()
  for (const record of records) {
    const key = `${record.strongId}\u0000${exactGreek(record.lemmaField)}`
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(record)
  }
  return [...grouped.values()].map((group) => ({
    lineNumbers: group.map((item) => item.lineNumber), strongId: group[0].strongId, canonicalLemma: group[0].lemmaField,
    transliteration: group[0].transliteration, morphology: group[0].morphology,
    briefGloss: [...new Set(group.map((item) => item.briefGloss).filter(Boolean))].join(" / "), rawLines: group.map((item) => item.raw)
  }))
}

const unitRange = new Map()
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json"))) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) for (const unit of chapter.units ?? []) unitRange.set(`${book.id}\u0000${chapter.number}\u0000${unit.ref}`, { verseStart: unit.verseStart, verseEnd: unit.verseEnd })
}

const morphCache = new Map()
async function morphRows(bookId) {
  if (morphCache.has(bookId)) return morphCache.get(bookId)
  const file = MORPH_FILES[bookId]
  if (!file) fail(`MorphGNT mapping missing for ${bookId}`)
  const response = await fetch(rawUrl(MORPH_REPO, MORPH_REF, file))
  if (!response.ok) fail(`MorphGNT ${file} fetch failed: HTTP ${response.status}`)
  const rows = []
  for (const raw of (await response.text()).split(/\r?\n/u)) {
    const columns = raw.trim().split(/\s+/u)
    if (columns.length < 7 || !/^\d{6}$/.test(columns[0])) continue
    rows.push({ bcv: columns[0], chapter: Number(columns[0].slice(2,4)), verse: Number(columns[0].slice(4,6)), word: columns[4], normalizedWord: columns[5], lemma: columns[6], exactLemma: exactGreek(columns[6]) })
  }
  morphCache.set(bookId, { file, rows })
  return morphCache.get(bookId)
}

let resolved = 0
for (const entry of evidence.entries ?? []) {
  if (entry.candidateCount !== 0) continue
  const range = unitRange.get(`${entry.bookId}\u0000${entry.chapter}\u0000${entry.ref}`)
  if (!range) continue
  const tokens = greekTokens(entry.original)
  if (!tokens.length) continue
  const morph = await morphRows(entry.bookId)
  const passage = morph.rows.filter((row) => row.chapter === entry.chapter && row.verse >= range.verseStart && row.verse <= range.verseEnd)
  const chosen = []
  const tokenEvidence = []
  let ok = true
  for (const token of tokens) {
    const lemmaKey = exactGreek(token)
    const passageOccurrences = passage.filter((row) => row.exactLemma === lemmaKey)
    const groups = groupsForLemma(token)
    if (!passageOccurrences.length || groups.length !== 1) { ok = false; break }
    chosen.push(groups[0])
    tokenEvidence.push({ inputLemma: token, occurrences: passageOccurrences.map((row) => ({ bcv: row.bcv, word: row.word, normalizedWord: row.normalizedWord, lemma: row.lemma })) })
  }
  if (!ok) continue
  const rawLines = chosen.flatMap((group) => group.rawLines)
  const lineNumbers = chosen.flatMap((group) => group.lineNumbers)
  entry.candidates = [{
    sourceId: tbesg.id, sourceCommitSha: tbesg.commitSha, sourceBlobSha: tbesg.blobSha,
    sourceLocator: compactLineLocator(lineNumbers), strongId: chosen.map((group) => group.strongId).join(" + "),
    canonicalLemma: chosen.map((group) => group.canonicalLemma).join(" "), transliteration: chosen.map((group) => group.transliteration).join(" "),
    morphology: chosen.map((group) => group.morphology).join(" | "), briefGloss: chosen.map((group) => group.briefGloss).join("; "),
    matchKind: "explicit-lemma-present-in-passage+canonical-lemma", lineSha256: `sha256:${sha256(rawLines.join("\n"))}`, rawLine: rawLines.join("\n"),
    morphgntEvidence: { sourceId: "morphgnt-sblgnt-6.12", repository: MORPH_REPO, ref: MORPH_REF, file: morph.file, tokens: tokenEvidence }
  }]
  entry.candidateCount = 1
  delete entry.morphgntProblem
  resolved += 1
}

if (resolved) {
  const matched = evidence.entries.filter((entry) => entry.candidateCount > 0).length
  const unique = evidence.entries.filter((entry) => entry.candidateCount === 1).length
  const ambiguous = evidence.entries.filter((entry) => entry.candidateCount > 1).length
  evidence.counts = { ...(evidence.counts ?? {}), matched, unique, ambiguous, unmatched: evidence.entries.length - matched, explicitLemmaResolved: resolved }
}
fs.writeFileSync(evidencePath, JSON.stringify(evidence, null, 2) + "\n", "utf8")
console.log(`NT explicit-lemma resolver: ${resolved} formerly-unmatched entries resolved only where every written lemma is present as a MorphGNT lemma inside the exact passage.`)
