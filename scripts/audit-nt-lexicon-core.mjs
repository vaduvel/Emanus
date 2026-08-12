#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-audit.json")
const reviewQueuePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-review-queue.json")
const reviewLedgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-review-ledger.json")
const reviewSourcesPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-review-sources.json")

function fail(message) {
  console.error(`[NT lexicon audit] ${message}`)
  process.exit(1)
}
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
if (!fs.existsSync(corpusDir)) fail("missing final NT corpus")
if (!fs.existsSync(reviewSourcesPath)) fail("missing nt-lexicon-review-sources.json")

const reviewSources = JSON.parse(fs.readFileSync(reviewSourcesPath, "utf8"))
if (reviewSources.schema !== "emanus-nt-lexicon-review-sources-v1" || !Array.isArray(reviewSources.sources) || !reviewSources.sources.length) fail("invalid lexical review source registry")
const lexicalSources = new Map()
for (const source of reviewSources.sources) {
  if (!source?.id || lexicalSources.has(source.id)) fail(`invalid/duplicate lexical source ${source?.id ?? "<missing>"}`)
  if (!source.repository || !source.path || !/^[0-9a-f]{40}$/i.test(source.blobSha ?? "") || !source.license) fail(`incomplete lexical source ${source.id}`)
  lexicalSources.set(source.id, source)
}

const findings = []
const reviewQueue = []
const KNOWN_RULES = [
  { original: "λεγιών", forbidden: /(?:legiune\s*[—:-]\s*(?:o\s+)?cohort|(?:este|înseamnă)\s+(?:o\s+)?cohort)/i, reason: "legiunea nu este cohortă" },
  { original: "ὀργή", forbidden: /(?:înseamnă|este|=)[^.!?]{0,40}\bdurere\b|\bdurere curată\b/i, reason: "ὀργή este mânie/indignare; mâhnirea este o idee distinctă în context" },
  { original: "βαπτίζω", forbidden: /(?:botezul nu este|stropire|romani\s+6)/i, reason: "câmpul lexical trebuie separat de concluzia doctrinară" },
]
const DOCTRINAL_IN_LEXICON = /\b(?:singura interpretare|dovedește că|botezul nu este|răpirea|premilen|complementarian|femeile nu|prezbiterii trebuie)\b/i

let entries = 0
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        entries += 1
        const meaning = String(word.meaning ?? "")
        const reviewId = sha256(`${book.id}\u0000${chapter.number}\u0000${unit.ref}\u0000${word.original}\u0000${meaning}`)
        reviewQueue.push({
          reviewId,
          bookId: book.id,
          chapter: chapter.number,
          ref: unit.ref,
          original: word.original,
          meaning,
          meaningSha256: `sha256:${sha256(meaning)}`,
        })
        if (!meaning.trim()) findings.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original, kind: "empty-meaning" })
        for (const rule of KNOWN_RULES) {
          if (word.original === rule.original && rule.forbidden.test(meaning)) findings.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original, kind: "known-lexical-error", reason: rule.reason, meaning })
        }
        if (DOCTRINAL_IN_LEXICON.test(meaning)) findings.push({ bookId: book.id, chapter: chapter.number, ref: unit.ref, original: word.original, kind: "lexical-doctrinal-category-mix", meaning })
      }
    }
  }
}

fs.writeFileSync(reviewQueuePath, JSON.stringify({
  schema: "emanus-nt-lexicon-review-queue-v2",
  policy: "Every lexical entry must receive explicit lexical review. reviewId binds the book/chapter/unit/original/meaning snapshot; meaningSha256 prevents a stale approval from surviving an edit. Approval additionally requires a pinned sourceId/sourceBlobSha and a non-empty sourceLocator from nt-lexicon-review-sources.json.",
  count: reviewQueue.length,
  allowedSourceIds: [...lexicalSources.keys()],
  entries: reviewQueue,
}, null, 2) + "\n", "utf8")

let reviewed = 0
let reviewLedgerStatus = "missing"
const reviewProblems = []
if (fs.existsSync(reviewLedgerPath)) {
  const ledger = JSON.parse(fs.readFileSync(reviewLedgerPath, "utf8"))
  reviewLedgerStatus = "present"
  if (ledger.schema !== "emanus-nt-lexicon-review-ledger-v2" || !Array.isArray(ledger.decisions)) {
    reviewProblems.push({ kind: "invalid-review-ledger-schema", expected: "emanus-nt-lexicon-review-ledger-v2" })
  } else {
    const decisions = new Map()
    for (const decision of ledger.decisions) {
      if (!decision?.reviewId || decisions.has(decision.reviewId)) {
        reviewProblems.push({ kind: "duplicate-or-missing-review-id", reviewId: decision?.reviewId ?? null })
        continue
      }
      decisions.set(decision.reviewId, decision)
    }
    for (const entry of reviewQueue) {
      const decision = decisions.get(entry.reviewId)
      if (!decision) {
        reviewProblems.push({ kind: "missing-review", reviewId: entry.reviewId, bookId: entry.bookId, chapter: entry.chapter, ref: entry.ref, original: entry.original })
        continue
      }
      if (decision.meaningSha256 !== entry.meaningSha256) {
        reviewProblems.push({ kind: "stale-review", reviewId: entry.reviewId, bookId: entry.bookId, chapter: entry.chapter, ref: entry.ref, original: entry.original })
        continue
      }
      if (decision.status !== "approved" || typeof decision.rationale !== "string" || !decision.rationale.trim()) {
        reviewProblems.push({ kind: "review-not-approved", reviewId: entry.reviewId, bookId: entry.bookId, chapter: entry.chapter, ref: entry.ref, original: entry.original })
        continue
      }
      const source = lexicalSources.get(decision.sourceId)
      if (!source) {
        reviewProblems.push({ kind: "unknown-lexical-source", reviewId: entry.reviewId, sourceId: decision.sourceId ?? null })
        continue
      }
      if (decision.sourceBlobSha !== source.blobSha) {
        reviewProblems.push({ kind: "stale-lexical-source", reviewId: entry.reviewId, sourceId: source.id, expectedBlobSha: source.blobSha, actualBlobSha: decision.sourceBlobSha ?? null })
        continue
      }
      if (typeof decision.sourceLocator !== "string" || !decision.sourceLocator.trim()) {
        reviewProblems.push({ kind: "missing-source-locator", reviewId: entry.reviewId, sourceId: source.id })
        continue
      }
      reviewed += 1
    }
    for (const reviewId of decisions.keys()) if (!reviewQueue.some((entry) => entry.reviewId === reviewId)) reviewProblems.push({ kind: "orphan-review", reviewId })
  }
}

const unresolvedManualReview = Math.max(0, entries - reviewed)
const status = findings.length
  ? "manual-source-check-required"
  : reviewProblems.length || unresolvedManualReview
    ? "manual-review-required"
    : "clean"
const count = findings.length || reviewProblems.length || unresolvedManualReview
const report = {
  schema: "emanus-nt-lexicon-audit-v3",
  status,
  policy: "Automated rules catch known lexical/category errors, but publication is clean only after every current Greek/Hebrew entry is explicitly reviewed against a pinned lexical source snapshot. Each approval must carry sourceId, exact sourceBlobSha and sourceLocator. Poonen/Emanus doctrinal conclusions remain in teaching, not disguised as uncontested lexical meaning.",
  entries,
  lexicalSources: [...lexicalSources.values()].map((source) => ({ id: source.id, repository: source.repository, path: source.path, blobSha: source.blobSha, license: source.license })),
  automatedFindingCount: findings.length,
  reviewLedgerStatus,
  reviewedEntries: reviewed,
  unresolvedManualReview,
  reviewProblemCount: reviewProblems.length,
  count,
  findings,
  reviewProblems,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT lexicon audit: ${entries} entries / ${findings.length} automated findings / ${reviewed} source-backed reviewed / ${unresolvedManualReview} awaiting review.`)
