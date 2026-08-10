#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-audit.json")
const reviewLedgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-review-ledger.json")

function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function norm(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[„”«»"'’.,;:!?()[\]{}—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
function words(value) { return norm(value).split(" ").filter(Boolean) }
function textFields(chapter) {
  return [
    ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
    ...(chapter.units ?? []).flatMap((unit, index) => [[`units[${index}].teaching`, unit.teaching], [`units[${index}].forYourHeart`, unit.forYourHeart]]),
  ].filter(([, value]) => typeof value === "string" && value.trim())
}
function extractQuotes(value) {
  const out = []
  const patterns = [/„([^”]+)”/gu, /«([^»]+)»/gu, /"([^"]+)"/gu]
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(value))) {
      const quote = match[1].trim()
      if (words(quote).length >= 5) out.push(quote)
    }
  }
  return [...new Set(out)]
}
function makeReviewId(bookId, chapter, field, quote) {
  return sha256(`${bookId}\u0000${chapter}\u0000${field}\u0000${quote}`)
}

if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")

const reviewDecisions = new Map()
const ledgerProblems = []
if (fs.existsSync(reviewLedgerPath)) {
  const ledger = JSON.parse(fs.readFileSync(reviewLedgerPath, "utf8"))
  if (ledger.schema !== "emanus-nt-embedded-quote-review-ledger-v1" || !Array.isArray(ledger.decisions)) {
    ledgerProblems.push({ kind: "invalid-review-ledger-schema" })
  } else {
    for (const decision of ledger.decisions) {
      if (!decision?.reviewId || reviewDecisions.has(decision.reviewId)) {
        ledgerProblems.push({ kind: "duplicate-or-missing-review-id", reviewId: decision?.reviewId ?? null })
        continue
      }
      reviewDecisions.set(decision.reviewId, decision)
    }
  }
}

const beChapterTexts = []
for (const file of fs.readdirSync(beDir).filter((name) => /^[A-Z0-9]{3}\.\d+\.json$/.test(name))) {
  const be = JSON.parse(fs.readFileSync(path.join(beDir, file), "utf8"))
  if (be.translation !== "BE" || !Array.isArray(be.verses)) continue
  beChapterTexts.push({ bookId: be.bookId, chapter: be.chapter, text: norm(be.verses.map((verse) => verse.text).join(" ")) })
}

const beChapterByKey = new Map(beChapterTexts.map((entry) => [`${entry.bookId}.${entry.chapter}`, entry]))
const findings = []
const seenReviewIds = new Set()
let quotedFragments = 0
let exactMatches = 0
let reviewedNonBibleQuotes = 0

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    const expectedBeChapter = beChapterByKey.get(`${book.bookId}.${chapter.number}`)
    if (!expectedBeChapter) throw new Error(`missing BE chapter for quote audit: ${book.bookId}.${chapter.number}`)
    for (const [field, value] of textFields(chapter)) {
      for (const quote of extractQuotes(value)) {
        quotedFragments += 1
        const q = norm(quote)
        if (expectedBeChapter.text.includes(q)) {
          exactMatches += 1
          continue
        }

        const reviewId = makeReviewId(book.id, chapter.number, field, quote)
        const quoteSha256 = `sha256:${sha256(quote)}`
        seenReviewIds.add(reviewId)
        const decision = reviewDecisions.get(reviewId)
        if (decision) {
          if (decision.quoteSha256 !== quoteSha256) {
            findings.push({
              bookId: book.id, canonicalBookId: book.bookId, book: book.name, chapter: chapter.number, field, quote,
              wordCount: words(quote).length, reviewId, quoteSha256, reviewProblem: "stale-quote-hash",
            })
            continue
          }
          if (decision.classification !== "non-bible-quotation" || typeof decision.rationale !== "string" || !decision.rationale.trim()) {
            findings.push({
              bookId: book.id, canonicalBookId: book.bookId, book: book.name, chapter: chapter.number, field, quote,
              wordCount: words(quote).length, reviewId, quoteSha256, reviewProblem: "decision-does-not-clear-biblical-paraphrase",
            })
            continue
          }
          reviewedNonBibleQuotes += 1
          continue
        }

        const elsewhere = beChapterTexts
          .filter((entry) => entry.text.includes(q))
          .map((entry) => `${entry.bookId}.${entry.chapter}`)
        findings.push({
          bookId: book.id,
          canonicalBookId: book.bookId,
          book: book.name,
          chapter: chapter.number,
          field,
          quote,
          wordCount: words(quote).length,
          reviewId,
          quoteSha256,
          ...(elsewhere.length ? { exactMatchElsewhere: elsewhere } : {}),
        })
      }
    }
  }
}

for (const [reviewId, decision] of reviewDecisions.entries()) {
  if (!seenReviewIds.has(reviewId)) ledgerProblems.push({ kind: "orphan-review", reviewId, classification: decision.classification ?? null })
}

const count = findings.length + ledgerProblems.length
const report = {
  schema: "emanus-nt-embedded-quote-audit-v2",
  status: count ? "manual-source-check-required" : "clean",
  policy: "Quoted spans of at least five words are checked against the exact current Biblia Emanus text in the same canonical book and chapter. A match elsewhere in the NT does not clear the finding. Non-matches that intend to quote Scripture must be replaced with exact BE wording or rewritten without quotation marks. Only explicitly reviewed spans that do not claim to quote Scripture may be cleared by the hash-bound non-bible-quotation ledger classification.",
  quotedFragments,
  exactMatches,
  reviewedNonBibleQuotes,
  reviewLedgerStatus: fs.existsSync(reviewLedgerPath) ? "present" : "missing",
  reviewLedgerProblems: ledgerProblems.length,
  count,
  findings,
  ledgerProblems,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT embedded quote audit: ${quotedFragments} quoted fragments; ${exactMatches} exact same-chapter BE matches; ${reviewedNonBibleQuotes} explicitly reviewed non-Bible quotations; ${count} unresolved/review problems.`)
