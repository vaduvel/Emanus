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
    ...(candidate.morphgntEvidence ? { morphgntEvidence: candidate.morphgntEvidence } : {}),
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
    candidates: entry.candidates.slice(0, 16).map((candidate) => ({
      sourceId: candidate.sourceId,
      sourceBlobSha: candidate.sourceBlobSha,
      sourceLocator: candidate.sourceLocator,
      strongId: candidate.strongId,
      canonicalLemma: candidate.canonicalLemma,
      briefGloss: candidate.briefGloss,
      matchKind: candidate.matchKind,
      lineSha256: candidate.lineSha256,
      rawLine: candidate.rawLine,
      ...(candidate.morphgntEvidence ? { morphgntEvidence: candidate.morphgntEvidence } : {}),
    })),
  }))

const sourceMeta = {
  primaryLexicalSource: evidence.source,
  fallbackLexicalSource: evidence.fallbackLexicalSource ?? null,
  morphologySource: evidence.morphologySource,
}

fs.writeFileSync(uniquePath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unique-v4",
  policy: "Review batch only. Each entry has exactly one pinned lexical candidate. TBESG is primary; MorphGNT 6.12 may resolve the exact passage form to its lemma; TFLSJ is permitted only as a pinned fallback where TBESG has no adequate entry. Semantic agreement of the Romanian gloss still requires explicit human review.",
  ...sourceMeta,
  count: unique.length,
  entries: unique,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(uniqueCompactPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unique-compact-v3",
  policy: "Compact human-review projection of the single pinned lexical candidate, retaining source id/blob/locator and, where available, Strong ID, canonical lemma, morphology, brief gloss and MorphGNT passage-form evidence. TFLSJ candidates are identified explicitly by sourceId rather than being represented as TBESG evidence.",
  ...sourceMeta,
  count: uniqueCompact.length,
  entries: uniqueCompact,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(unmatchedPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-unmatched-v4",
  policy: "Entries with no verified pinned lexical candidate after diacritic-preserving TBESG lookup, passage-bounded MorphGNT 6.12 lemmatization, explicit-lemma resolution, and the pinned TFLSJ fallback. These remain unapprovable and block the frozen lexical ledger.",
  ...sourceMeta,
  count: unmatched.length,
  entries: unmatched,
}, null, 2) + "\n", "utf8")
fs.writeFileSync(ambiguousPath, JSON.stringify({
  schema: "emanus-nt-lexicon-source-evidence-ambiguous-index-v4",
  policy: "Entries with multiple pinned lexical candidates after diacritic-preserving form/lemma resolution. Candidate records are retained for explicit editorial sense selection; no candidate is auto-selected merely to satisfy publication gates.",
  ...sourceMeta,
  count: ambiguous.length,
  entries: ambiguous,
}, null, 2) + "\n", "utf8")
console.log(`NT lexical review batches: ${unique.length} unique / ${ambiguous.length} ambiguous / ${unmatched.length} unmatched.`)
