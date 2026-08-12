#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-fidelity-audit.json")

function sha256(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function stableTeachingSnapshot(unit) {
  return JSON.stringify({
    heading: String(unit.heading ?? ""),
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  })
}
function fail(message) {
  console.error(`[NT semantic fidelity] ${message}`)
  process.exit(1)
}

if (!fs.existsSync(corpusDir)) fail("missing final NT corpus")
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== 27) fail(`expected 27 final NT books, found ${files.length}`)

const findings = []
const counts = {
  books: files.length,
  units: 0,
  rawTranscriptReviewed: 0,
  semanticTranscriptReviewed: 0,
  pendingSemanticReview: 0,
  staleSemanticReview: 0,
  malformedSemanticEvidence: 0,
}
const byBook = {}

for (const file of files) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  const bookCounts = { units: 0, rawTranscriptReviewed: 0, semanticTranscriptReviewed: 0, pendingSemanticReview: 0 }
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      counts.units += 1
      bookCounts.units += 1
      const location = `${unit.ref} [${unit.id}]`
      const state = unit.sourceFidelity?.reviewState
      if (state === "reviewed-against-raw-transcript") {
        counts.rawTranscriptReviewed += 1
        bookCounts.rawTranscriptReviewed += 1
        continue
      }

      const semantic = unit.sourceFidelity?.semanticReview
      if (!semantic || semantic.status !== "approved-against-transcript") {
        counts.pendingSemanticReview += 1
        bookCounts.pendingSemanticReview += 1
        findings.push({
          severity: "blocker",
          code: "semantic-transcript-review-missing",
          bookId: book.id,
          chapter: chapter.number,
          unitId: unit.id,
          ref: unit.ref,
          currentReviewState: state ?? null,
          message: "Source provenance/locator evidence exists, but sentence-level semantic fidelity has not been approved against transcript content.",
        })
        continue
      }

      const expectedSnapshot = sha256(stableTeachingSnapshot(unit))
      if (semantic.reviewedTeachingSha256 !== expectedSnapshot) {
        counts.staleSemanticReview += 1
        counts.pendingSemanticReview += 1
        bookCounts.pendingSemanticReview += 1
        findings.push({
          severity: "blocker",
          code: "semantic-transcript-review-stale",
          bookId: book.id,
          chapter: chapter.number,
          unitId: unit.id,
          ref: unit.ref,
          expectedReviewedTeachingSha256: expectedSnapshot,
          actualReviewedTeachingSha256: semantic.reviewedTeachingSha256 ?? null,
          message: "Teaching/application changed after semantic transcript approval.",
        })
        continue
      }

      const evidence = Array.isArray(semantic.transcriptEvidence) ? semantic.transcriptEvidence : []
      const evidenceValid = evidence.length > 0 && evidence.every((item) =>
        typeof item?.officialSourceUrl === "string" && /^https:\/\//.test(item.officialSourceUrl) &&
        typeof item?.transcriptSourceUrl === "string" && /^https:\/\//.test(item.transcriptSourceUrl) &&
        typeof item?.sourceRange === "string" && item.sourceRange.trim() &&
        typeof item?.transcriptSha256 === "string" && /^sha256:[0-9a-f]{64}$/i.test(item.transcriptSha256) &&
        typeof item?.evidenceSha256 === "string" && /^sha256:[0-9a-f]{64}$/i.test(item.evidenceSha256)
      )
      if (!evidenceValid || typeof semantic.rationale !== "string" || !semantic.rationale.trim()) {
        counts.malformedSemanticEvidence += 1
        counts.pendingSemanticReview += 1
        bookCounts.pendingSemanticReview += 1
        findings.push({
          severity: "blocker",
          code: "semantic-transcript-evidence-malformed",
          bookId: book.id,
          chapter: chapter.number,
          unitId: unit.id,
          ref: unit.ref,
          message: "Semantic approval exists but is not backed by complete transcript evidence metadata and rationale.",
        })
        continue
      }

      counts.semanticTranscriptReviewed += 1
      bookCounts.semanticTranscriptReviewed += 1
    }
  }
  byBook[book.id] = bookCounts
}

const status = counts.pendingSemanticReview === 0 ? "clean" : "blocked"
const report = {
  schema: "emanus-nt-semantic-source-fidelity-audit-v1",
  status,
  policy: "Source anchors and source-derived legacy provenance are necessary but do not prove semantic fidelity. Publication requires either direct raw-transcript review or a hash-bound approved-against-transcript semantic review containing transcript evidence for the current reader teaching/application snapshot.",
  counts,
  byBook,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT semantic fidelity: ${counts.rawTranscriptReviewed} raw-transcript + ${counts.semanticTranscriptReviewed} semantic-transcript approved / ${counts.pendingSemanticReview} pending.`)

if (process.argv.includes("--strict") && status !== "clean") process.exit(1)
