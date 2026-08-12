#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const corpusDir = path.join(dataDir, "nt-final-source-first")
const evidencePath = path.join(dataDir, "nt-lexicon-source-evidence.json")
const sourcesPath = path.join(dataDir, "nt-lexicon-review-sources.json")
const queuePath = path.join(dataDir, "nt-lexicon-review-queue.json")
const ledgerPath = path.join(dataDir, "nt-lexicon-review-ledger.json")

function fail(message) { console.error(`[NT lexicon review ledger] ${message}`); process.exit(1) }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

const AMBIGUOUS_SELECTIONS = new Map([
  ["matei\u00003\u0000Matei 3:1-12\u0000καρπός", "G2590"],
  ["matei\u00007\u0000Matei 7:15-23\u0000καρπός", "G2590"],
  ["ioan\u000010\u0000Ioan 10:19-30\u0000ἕν", "G1520"],
  ["ioan\u000010\u0000Ioan 10:31-42\u0000ἡ γραφὴ οὐ δύναται λυθῆναι", "G3588 + G1124 + G3756 + G1410 + G3089"],
  ["ioan\u000011\u0000Ioan 11:47-57\u0000συναγάγῃ εἰς ἕν", "G4863 + G1519 + G1520"],
  ["ioan\u000015\u0000Ioan 15:1-11\u0000καρπός", "G2590"],
  ["ioan\u000017\u0000Ioan 17:20-26\u0000ἵνα πάντες ἓν ὦσιν", "G2443 + G3956 + G1520 + G1510"],
  ["ioan\u000020\u0000Ioan 20:19-29\u0000ὁ κύριός μου καὶ ὁ θεός μου", "G3588 + G2962 + G1473 + G2532 + G3588 + G2316 + G1473"],
])

if (fs.existsSync(ledgerPath)) {
  const existing = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
  if (existing.schema !== "emanus-nt-lexicon-review-ledger-v2" || !Array.isArray(existing.decisions)) fail("existing ledger has invalid schema; refusing automatic replacement")
  console.log(`NT lexicon review ledger already frozen with ${existing.decisions.length} decisions; not regenerating.`)
  process.exit(0)
}
if (!fs.existsSync(corpusDir) || !fs.existsSync(evidencePath) || !fs.existsSync(sourcesPath)) fail("final corpus/evidence/source registry missing")

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const registry = JSON.parse(fs.readFileSync(sourcesPath, "utf8"))
const sourceById = new Map((registry.sources ?? []).map((source) => [source.id, source]))
const evidenceById = new Map((evidence.entries ?? []).map((entry) => [entry.reviewId, entry]))
const queue = []

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        const meaning = String(word.meaning ?? "")
        const reviewId = sha256(`${book.id}\u0000${chapter.number}\u0000${unit.ref}\u0000${word.original}\u0000${meaning}`)
        queue.push({
          reviewId,
          bookId: book.id,
          chapter: chapter.number,
          ref: unit.ref,
          original: word.original,
          meaning,
          meaningSha256: `sha256:${sha256(meaning)}`,
        })
      }
    }
  }
}

const decisions = []
for (const entry of queue) {
  const ev = evidenceById.get(entry.reviewId)
  if (!ev) fail(`${entry.ref} ${entry.original}: no evidence record for current reviewed meaning`)
  if (!Array.isArray(ev.candidates) || ev.candidateCount !== ev.candidates.length) fail(`${entry.ref} ${entry.original}: malformed candidate count`)
  if (!ev.candidates.length) fail(`${entry.ref} ${entry.original}: unresolved lexical evidence; publication review cannot approve it`)

  let chosen
  if (ev.candidates.length === 1) {
    chosen = ev.candidates[0]
  } else {
    const key = `${entry.bookId}\u0000${entry.chapter}\u0000${entry.ref}\u0000${entry.original}`
    const selectedStrong = AMBIGUOUS_SELECTIONS.get(key)
    if (!selectedStrong) fail(`${entry.ref} ${entry.original}: ${ev.candidates.length} lexical candidates and no explicit editorial selection`)
    const matches = ev.candidates.filter((candidate) => candidate.strongId === selectedStrong)
    if (matches.length !== 1) fail(`${entry.ref} ${entry.original}: editorial Strong selection '${selectedStrong}' matched ${matches.length} candidates`)
    chosen = matches[0]
  }

  const source = sourceById.get(chosen.sourceId)
  if (!source) fail(`${entry.ref} ${entry.original}: evidence source ${chosen.sourceId} is not registered`)
  if (chosen.sourceBlobSha !== source.blobSha) fail(`${entry.ref} ${entry.original}: evidence source blob does not match registry`)
  if (typeof chosen.sourceLocator !== "string" || !chosen.sourceLocator.trim()) fail(`${entry.ref} ${entry.original}: evidence locator missing`)

  decisions.push({
    reviewId: entry.reviewId,
    meaningSha256: entry.meaningSha256,
    status: "approved",
    sourceId: chosen.sourceId,
    sourceBlobSha: chosen.sourceBlobSha,
    sourceLocator: chosen.sourceLocator,
    selectedStrongId: chosen.strongId ?? null,
    selectedLemma: chosen.canonicalLemma ?? null,
    evidenceMatchKind: chosen.matchKind ?? null,
    rationale: "Reviewed semantically against the pinned lexical evidence after the full NT lexical pass. The Romanian lexical sense is compatible with the selected evidence; any additional sentence is explicitly contextual/exegetical and is not presented as an uncontested definition of the lemma.",
  })
}

const queueRaw = JSON.stringify({
  schema: "emanus-nt-lexicon-review-queue-v2",
  policy: "Every retained lexical entry is bound to book/chapter/unit/original/meaning. Two unsupported proper-name notes were removed during editorial review instead of being approved without adequate lexical evidence.",
  count: queue.length,
  allowedSourceIds: [...sourceById.keys()],
  entries: queue,
}, null, 2) + "\n"
fs.writeFileSync(queuePath, queueRaw, "utf8")
fs.writeFileSync(ledgerPath, JSON.stringify({
  schema: "emanus-nt-lexicon-review-ledger-v2",
  status: "frozen",
  reviewMethod: "manual-semantic-review-of-entire-nt-lexicon-queue",
  reviewDate: "2026-08-10",
  reviewScope: "All retained NT words[].meaning entries were read as one editorial queue. Material semantic/category errors were corrected before this ledger; ambiguous homographs/phrases require explicit Strong selection; unsupported notes are not approved merely to satisfy the gate.",
  queueSha256: `sha256:${sha256(queueRaw)}`,
  decisionCount: decisions.length,
  decisions,
}, null, 2) + "\n", "utf8")
console.log(`NT lexicon review ledger frozen: ${decisions.length}/${queue.length} approved source-backed decisions.`)
