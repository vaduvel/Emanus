#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const REVIEW = path.join(DATA, "nt-embedded-quote-final-review.json")
const CORPUS = path.join(DATA, "nt-final-source-first")
const MANIFEST = path.join(DATA, "nt-final-source-first-manifest.json")
const OUT = path.join(DATA, "nt-semantic-postquote-rebind-final-review.json")

function fail(message) {
  console.error(`[final embedded quote review apply] ${message}`)
  process.exit(1)
}
function sha(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function snapshot(unit, overrides = {}) {
  return JSON.stringify({
    heading: String(overrides.heading ?? unit.heading ?? ""),
    teaching: String(overrides.teaching ?? unit.teaching ?? ""),
    forYourHeart: String(overrides.forYourHeart ?? unit.forYourHeart ?? ""),
  })
}
function parseUnitField(field) {
  const match = /^units\[(\d+)\]\.(teaching|forYourHeart)$/.exec(String(field ?? ""))
  return match ? { unitIndex: Number(match[1]), key: match[2] } : null
}
function bookPath(bookId) {
  for (const file of fs.readdirSync(CORPUS).filter((name) => name.endsWith(".json"))) {
    const full = path.join(CORPUS, file)
    const data = JSON.parse(fs.readFileSync(full, "utf8"))
    if (data.id === bookId) return { full, data }
  }
  fail(`book not found: ${bookId}`)
}

// The review artifact is produced independently. Until it exists there is
// intentionally nothing to apply. This module is imported from a larger
// orchestrator, so a missing optional artifact must be a true no-op rather
// than process.exit(0), which would terminate the parent before semantic hash
// consistency and manifest-digest regeneration can run.
const reviewPresent = fs.existsSync(REVIEW)
if (!reviewPresent) {
  console.log("Final embedded quote review artifact not present; no final-review unquotes to apply.")
}
const review = reviewPresent
  ? JSON.parse(fs.readFileSync(REVIEW, "utf8"))
  : { schema: "emanus-nt-embedded-quote-final-review-v1", unquoteCount: 0, unquotes: [] }

if (review.schema !== "emanus-nt-embedded-quote-final-review-v1" || !Array.isArray(review.unquotes)) {
  fail("unexpected review artifact schema")
}
if (Number(review.unquoteCount) !== review.unquotes.length) fail("unquoteCount drift")

const cache = new Map()
const semanticRebinds = []
const applied = []

for (const op of review.unquotes) {
  if (op.action !== "unquote-biblical-paraphrase-without-wording-change") fail(`${op.reviewId}: invalid action`)
  if (!/^[0-9a-f]{64}$/i.test(String(op.reviewId ?? ""))) fail(`invalid reviewId ${op.reviewId}`)
  if (!/^sha256:[0-9a-f]{64}$/i.test(String(op.quoteSha256 ?? ""))) fail(`${op.reviewId}: invalid quote SHA`)
  if (sha(op.quote) !== op.quoteSha256) fail(`${op.reviewId}: quote SHA mismatch`)
  if (typeof op.rationale !== "string" || !op.rationale.trim()) fail(`${op.reviewId}: rationale missing`)

  let holder = cache.get(op.bookId)
  if (!holder) {
    holder = bookPath(op.bookId)
    cache.set(op.bookId, holder)
  }
  const book = holder.data
  if (book.bookId !== op.canonicalBookId) fail(`${op.reviewId}: canonical book id drift`)
  const chapter = (book.chapters ?? []).find((item) => Number(item.number) === Number(op.chapter))
  if (!chapter) fail(`${op.reviewId}: chapter ${op.chapter} missing`)

  const parsed = parseUnitField(op.field)
  let target
  let unit = null
  let key
  if (parsed) {
    unit = chapter.units?.[parsed.unitIndex]
    if (!unit) fail(`${op.reviewId}: unit index ${parsed.unitIndex} missing`)
    if (op.unitId && unit.id !== op.unitId) fail(`${op.reviewId}: unit identity drift ${unit.id} != ${op.unitId}`)
    key = parsed.key
    target = unit
  } else {
    if (op.unitId) fail(`${op.reviewId}: non-unit field unexpectedly declares unitId`)
    key = op.field
    target = chapter
  }
  if (typeof target?.[key] !== "string") fail(`${op.reviewId}: target field is not text`)

  const wrappers = [`„${op.quote}”`, `«${op.quote}»`, `"${op.quote}"`]
  const wrapperCounts = wrappers.map((wrapper) => target[key].split(wrapper).length - 1)
  const wrapperTotal = wrapperCounts.reduce((a, b) => a + b, 0)
  const bareCount = target[key].split(op.quote).length - 1

  let semanticBefore = null
  if (unit) {
    const semantic = unit.sourceFidelity?.semanticReview
    if (semantic?.status === "approved-against-transcript") {
      if (!/^sha256:[0-9a-f]{64}$/i.test(String(semantic.reviewedTeachingSha256 ?? ""))) {
        fail(`${op.reviewId}: ${unit.id} semantic reviewed hash invalid`)
      }
      semanticBefore = semantic.reviewedTeachingSha256
      const currentBefore = sha(snapshot(unit))
      if (currentBefore !== semanticBefore) {
        fail(`${op.reviewId}: ${unit.id} semantic hash is not bound to current pre-unquote copy; ${currentBefore} != ${semanticBefore}`)
      }
    }
  }

  if (wrapperTotal === 1) {
    const wrapper = wrappers[wrapperCounts.findIndex((count) => count === 1)]
    target[key] = target[key].replace(wrapper, op.quote)
  } else if (wrapperTotal === 0 && bareCount === 1) {
    // Idempotence within an already-applied working tree. For semantic units,
    // the hash must already reflect the unquoted reader copy below.
  } else {
    fail(`${op.reviewId}: expected exactly one quote wrapper (or one already-unquoted occurrence); wrappers=${wrapperTotal}, bare=${bareCount}`)
  }

  if (unit && semanticBefore) {
    const semantic = unit.sourceFidelity.semanticReview
    const semanticAfter = sha(snapshot(unit))
    if (semanticAfter === semanticBefore && wrapperTotal === 1) {
      fail(`${op.reviewId}: unquote did not change semantic snapshot as expected`)
    }
    if (wrapperTotal === 1) {
      semantic.reviewedTeachingSha256 = semanticAfter
      semanticRebinds.push({
        reviewId: op.reviewId,
        bookId: op.bookId,
        chapter: Number(op.chapter),
        unitId: unit.id,
        field: op.field,
        action: op.action,
        preUnquoteSemanticSha256: semanticBefore,
        finalUnquotedSemanticSha256: semanticAfter,
        quoteSha256: op.quoteSha256,
      })
    } else if (semantic.reviewedTeachingSha256 !== semanticAfter) {
      fail(`${op.reviewId}: already-unquoted semantic copy is not hash-bound`)
    }
  }

  applied.push({
    reviewId: op.reviewId,
    bookId: op.bookId,
    chapter: Number(op.chapter),
    field: op.field,
    unitId: op.unitId ?? null,
    quoteSha256: op.quoteSha256,
    action: op.action,
  })
}

const renderedBooks = new Map()
for (const { full, data } of cache.values()) {
  const rendered = JSON.stringify(data, null, 2) + "\n"
  fs.writeFileSync(full, rendered, "utf8")
  renderedBooks.set(data.id, rendered)
}
if (reviewPresent) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"))
  if (manifest.schema !== "emanus-nt-final-source-first-manifest-v1" || !Array.isArray(manifest.books)) {
    fail("unexpected final source-first manifest schema")
  }
  for (const [bookId, rendered] of renderedBooks) {
    const entry = manifest.books.find((item) => item.id === bookId)
    if (!entry) fail(`manifest book missing: ${bookId}`)
    entry.sha256 = sha(rendered).slice("sha256:".length)
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8")
  fs.writeFileSync(OUT, JSON.stringify({
    schema: "emanus-nt-semantic-postquote-rebind-final-review-v1",
    policy: "Only quotation wrappers are removed. Wording is byte-preserved. For transcript-approved units, the pre-unquote semantic hash must equal the exact current snapshot and is moved only to the exact wrapper-only result.",
    appliedCount: applied.length,
    semanticRebindCount: semanticRebinds.length,
    applied,
    semanticRebinds,
  }, null, 2) + "\n", "utf8")
  console.log(`Final embedded quote review applied: ${applied.length} exact unquotes; ${semanticRebinds.length} semantic hash rebinds.`)
}
