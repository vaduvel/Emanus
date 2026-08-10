#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const inputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence.json")
const uniquePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-unique.json")
const uniqueCompactPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-unique-compact.json")
const unmatchedPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-unmatched.json")
const ambiguousPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-source-evidence-ambiguous-index.json")

if (!fs.existsSync(inputPath)) throw new Error("missing nt-lexicon-source-evidence.json")
const evidence = JSON.parse(fs.readFileSync(inputPath, "utf8"))
const entries = evidence.entries ?? []

const unique = entries.filter((entry) => entry.candidateCount === 1)
const uniqueCompact = unique.map((entry) => {
  const candidate = entry.candidates[0]
  return {
    reviewId: entry.reviewId,
    bookId: entry.bookId,
    chapter: entry.chapter,
    ref: entry.ref,
    original: entry.original,
    meaning: entry.meaning,
    meaningSha256: entry.meaningSha256,
    sourceId: candidate.sourceId,
    sourceBlobSha: candidate.sourceBlobSha,
    sourceLocator: candidate.sourceLocator,
    strongId: candidate.strongId,
    canonicalLemma: candidate.canonicalLemma,
    transliteration: candidate.transliteration,
    morphology: candidate.morphology,
    briefGloss: candidate.briefGloss,
    matchKind: candidate.matchKind,
  }
})
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
      strongId: candidate.strongId,
      canonicalLemma: candidate.canonicalLemma,
      briefGloss: candidate.briefGloss,
      lineSha256: candidate.lineSha256,
      rawLine: candidate.rawLine,
    })),
  }))

fs.writeFileSync(uniquePath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unique-v2",
  policy: "Review batch only. Each entry has exactly one exact normalized match in TBESG's canonical lemma column; semantic agreement of the Romanian gloss still requires review.",
  source: evidence.source,
  count: unique.length,
  entries: unique,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(uniqueCompactPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unique-compact-v1",
  policy: "Compact human-review projection of exact canonical-lemma TBESG matches. It intentionally omits long dictionary examples while retaining Strong ID, canonical lemma, morphology, brief gloss, pinned source locator and meaning hash.",
  source: evidence.source,
  count: uniqueCompact.length,
  entries: uniqueCompact,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(unmatchedPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unmatched-v2",
  policy: "Entries with no exact normalized match in TBESG's canonical lemma column. These are commonly inflected or multi-word forms and require lemmatization or another pinned lexical reference; they are not approvable from absence of evidence.",
  source: evidence.source,
  count: unmatched.length,
  entries: unmatched,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(ambiguousPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-ambiguous-index-v2",
  policy: "Entries with multiple exact TBESG canonical-lemma records. Candidate records are retained for Strong/sense disambiguation; no candidate is auto-selected.",
  source: evidence.source,
  count: ambiguous.length,
  entries: ambiguous,
}, null, 2) + "\n", "utf8")
console.log(`NT lexical review batches: ${unique.length} exact-lemma unique / ${ambiguous.length} ambiguous / ${unmatched.length} unmatched.`)
