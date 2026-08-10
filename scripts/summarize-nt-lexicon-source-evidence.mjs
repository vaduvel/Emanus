#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const inputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence.json")
const uniquePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-unique.json")
const unmatchedPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-unmatched.json")
const ambiguousPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-ambiguous-index.json")

if (!fs.existsSync(inputPath)) throw new Error("missing nt-lexicon-source-evidence.json")
const evidence = JSON.parse(fs.readFileSync(inputPath, "utf8"))
const entries = evidence.entries ?? []

const unique = entries.filter((entry) => entry.candidateCount === 1)
const unmatched = entries
  .filter((entry) => entry.candidateCount === 0)
  .map(({ candidates, ...entry }) => entry)
const ambiguous = entries
  .filter((entry) => entry.candidateCount > 1)
  .map((entry) => ({
    reviewId: entry.reviewId,
    bookId: entry.bookId,
    chapter: entry.chapter,
    ref: entry.ref,
    original: entry.original,
    normalizedLemma: entry.normalizedLemma,
    meaning: entry.meaning,
    meaningSha256: entry.meaningSha256,
    candidateCount: entry.candidateCount,
    candidates: entry.candidates.slice(0, 6).map((candidate) => ({
      sourceId: candidate.sourceId,
      sourceBlobSha: candidate.sourceBlobSha,
      sourceLocator: candidate.sourceLocator,
      lineSha256: candidate.lineSha256,
      rawLine: candidate.rawLine,
    })),
  }))

fs.writeFileSync(uniquePath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unique-v1",
  policy: "Review batch only. Each entry has exactly one exact normalized-lemma TBESG source-line candidate; semantic agreement of the Romanian gloss still requires review.",
  source: evidence.source,
  count: unique.length,
  entries: unique,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(unmatchedPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unmatched-v1",
  policy: "Entries with no exact normalized-lemma token match in the pinned TBESG snapshot. These require improved lemma resolution or another pinned lexical reference; they are not approvable from absence of evidence.",
  source: evidence.source,
  count: unmatched.length,
  entries: unmatched,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(ambiguousPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-ambiguous-index-v1",
  policy: "Entries with multiple TBESG lines containing the normalized lemma. Candidate lines are retained for sense/record disambiguation; no candidate is auto-selected.",
  source: evidence.source,
  count: ambiguous.length,
  entries: ambiguous,
}, null, 2) + "\n", "utf8")
console.log(`NT lexical review batches: ${unique.length} unique / ${ambiguous.length} ambiguous / ${unmatched.length} unmatched.`)
