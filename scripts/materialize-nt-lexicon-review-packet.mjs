#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const queuePath = path.join(dataDir, "nt-lexicon-review-queue.json")
const uniquePath = path.join(dataDir, "nt-lexicon-source-evidence-unique-compact.json")
const ambiguousPath = path.join(dataDir, "nt-lexicon-source-evidence-ambiguous-index.json")
const unmatchedPath = path.join(dataDir, "nt-lexicon-source-evidence-unmatched.json")
const outputPath = path.join(dataDir, "nt-lexicon-review-packet.jsonl")

function fail(message) {
  console.error(`[NT lexicon review packet] ${message}`)
  process.exit(1)
}
function load(file) {
  if (!fs.existsSync(file)) fail(`missing ${path.basename(file)}`)
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

const queue = load(queuePath)
const unique = load(uniquePath)
const ambiguous = load(ambiguousPath)
const unmatched = load(unmatchedPath)
if (!Array.isArray(queue.entries) || queue.entries.length !== 219) fail(`expected 219 queue entries, found ${queue.entries?.length ?? 0}`)

const uniqueById = new Map((unique.entries ?? []).map((entry) => [entry.reviewId, entry]))
const ambiguousById = new Map((ambiguous.entries ?? []).map((entry) => [entry.reviewId, entry]))
const unmatchedById = new Map((unmatched.entries ?? []).map((entry) => [entry.reviewId, entry]))
const rows = []
let uniqueCount = 0
let ambiguousCount = 0
let unmatchedCount = 0

for (let index = 0; index < queue.entries.length; index += 1) {
  const entry = queue.entries[index]
  const uniqueEvidence = uniqueById.get(entry.reviewId)
  const ambiguousEvidence = ambiguousById.get(entry.reviewId)
  const unmatchedEvidence = unmatchedById.get(entry.reviewId)
  const evidenceKinds = [uniqueEvidence && "unique", ambiguousEvidence && "ambiguous", unmatchedEvidence && "unmatched"].filter(Boolean)
  if (evidenceKinds.length !== 1) fail(`${entry.reviewId}: expected exactly one evidence classification, found ${evidenceKinds.join(",") || "none"}`)

  let evidence
  if (uniqueEvidence) {
    uniqueCount += 1
    evidence = {
      kind: "unique",
      sourceId: uniqueEvidence.sourceId,
      sourceBlobSha: uniqueEvidence.sourceBlobSha,
      sourceLocator: uniqueEvidence.sourceLocator,
      strongId: uniqueEvidence.strongId,
      canonicalLemma: uniqueEvidence.canonicalLemma,
      transliteration: uniqueEvidence.transliteration,
      morphology: uniqueEvidence.morphology,
      briefGloss: uniqueEvidence.briefGloss,
      matchKind: uniqueEvidence.matchKind,
      ...(uniqueEvidence.morphgntEvidence ? { morphgntEvidence: uniqueEvidence.morphgntEvidence } : {}),
    }
  } else if (ambiguousEvidence) {
    ambiguousCount += 1
    evidence = {
      kind: "ambiguous",
      normalizedLemma: ambiguousEvidence.normalizedLemma,
      candidateCount: ambiguousEvidence.candidateCount,
      candidates: (ambiguousEvidence.candidates ?? []).map((candidate) => ({
        sourceId: candidate.sourceId,
        sourceBlobSha: candidate.sourceBlobSha,
        sourceLocator: candidate.sourceLocator,
        strongId: candidate.strongId,
        canonicalLemma: candidate.canonicalLemma,
        briefGloss: candidate.briefGloss,
        matchKind: candidate.matchKind,
        ...(candidate.morphgntEvidence ? { morphgntEvidence: candidate.morphgntEvidence } : {}),
      })),
    }
  } else {
    unmatchedCount += 1
    evidence = {
      kind: "unmatched",
      normalizedLemma: unmatchedEvidence.normalizedLemma,
      reason: unmatchedEvidence.reason,
      ...(unmatchedEvidence.morphgntProblem ? { morphgntProblem: unmatchedEvidence.morphgntProblem } : {}),
      ...(unmatchedEvidence.morphgntFile ? { morphgntFile: unmatchedEvidence.morphgntFile, morphgntBlobSha: unmatchedEvidence.morphgntBlobSha } : {}),
    }
  }

  rows.push({
    n: index + 1,
    reviewId: entry.reviewId,
    bookId: entry.bookId,
    chapter: entry.chapter,
    ref: entry.ref,
    original: entry.original,
    meaning: entry.meaning,
    meaningSha256: entry.meaningSha256,
    evidence,
  })
}

if (uniqueCount + ambiguousCount + unmatchedCount !== 219) fail(`classification totals do not cover 219 entries: ${uniqueCount}/${ambiguousCount}/${unmatchedCount}`)
fs.writeFileSync(outputPath, rows.map((row) => JSON.stringify(row)).join("\n") + "\n", "utf8")
console.log(`NT lexicon review packet: ${rows.length} rows (${uniqueCount} unique / ${ambiguousCount} ambiguous / ${unmatchedCount} unmatched).`)
