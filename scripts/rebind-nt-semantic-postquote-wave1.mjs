#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const CORPUS = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const OUT = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-postquote-rebind-wave1.json")

const TARGETS = [
  {
    bookFile: "06-romani.json",
    bookId: "romani",
    chapter: 11,
    unitId: "romani-11-17-24",
    preQuoteSemanticSha256: "sha256:e22c02e9c4f0aba2a479d9a7afbc31dbe9b6c8324969f902efc25bfe4ed9dc0e",
    finalQuoteNormalizedSha256: "sha256:02d10182bb5f6a348506fed6ba9929d1b809697fefebe77f61d0ac14102051c8",
  },
  {
    bookFile: "07-1-corinteni.json",
    bookId: "1-corinteni",
    chapter: 12,
    unitId: "1-corinteni-12-12-21",
    preQuoteSemanticSha256: "sha256:e06ef50939cf02c992be8f08cbc6d40e5431d710275b310944c628d7fe1e0482",
    finalQuoteNormalizedSha256: "sha256:4616aa8f3112242d02aa0457ca28665276627a5dfb1f5fa16e644329bfb76fb3",
  },
  {
    bookFile: "07-1-corinteni.json",
    bookId: "1-corinteni",
    chapter: 14,
    unitId: "1-corinteni-14-26-33",
    preQuoteSemanticSha256: "sha256:54dd5e405b7b0e638d9b77cb3916b57980200f164835668a9e744d7864686f57",
    finalQuoteNormalizedSha256: "sha256:fd5637c0d994591bdc0611366ea21f90fa7148a822ffbd270c568354eab03ca9",
  },
  {
    bookFile: "07-1-corinteni.json",
    bookId: "1-corinteni",
    chapter: 16,
    unitId: "1-corinteni-16-13-24",
    preQuoteSemanticSha256: "sha256:4bb2cd3144d0d8ba746a7f2e4c6c26b41320c7df82e3274cc3c8a8228394d420",
    finalQuoteNormalizedSha256: "sha256:176a2285a12f4293c5bf7385cd0a09c6ebe59643f3d5f3140118eb4228e1a4a9",
  },
]

function sha256(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function snapshot(unit) {
  return JSON.stringify({
    heading: String(unit.heading ?? ""),
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  })
}
function fail(message) {
  console.error(`[semantic post-quote rebind wave1] ${message}`)
  process.exit(1)
}

if (!fs.existsSync(CORPUS)) fail("final corpus missing")
const changes = []
const cache = new Map()

for (const target of TARGETS) {
  const full = path.join(CORPUS, target.bookFile)
  if (!fs.existsSync(full)) fail(`${target.bookFile}: missing final book`)
  let book = cache.get(full)
  if (!book) {
    book = JSON.parse(fs.readFileSync(full, "utf8"))
    cache.set(full, book)
  }
  if (book.id !== target.bookId) fail(`${target.bookFile}: expected ${target.bookId}, got ${book.id}`)
  const chapter = (book.chapters ?? []).find((item) => item.number === target.chapter)
  const unit = (chapter?.units ?? []).find((item) => item.id === target.unitId)
  if (!unit) fail(`${target.unitId}: final unit missing`)
  const semantic = unit.sourceFidelity?.semanticReview
  if (!semantic || semantic.status !== "approved-against-transcript") fail(`${target.unitId}: semantic approval missing`)
  if (!Array.isArray(semantic.transcriptEvidence) || semantic.transcriptEvidence.length < 1) fail(`${target.unitId}: transcript evidence missing`)
  if (typeof semantic.rationale !== "string" || !semantic.rationale.trim()) fail(`${target.unitId}: rationale missing`)

  const currentSha = sha256(snapshot(unit))
  if (currentSha !== target.finalQuoteNormalizedSha256) {
    fail(`${target.unitId}: final quote-normalized snapshot drifted; ${currentSha} != ${target.finalQuoteNormalizedSha256}`)
  }

  const before = semantic.reviewedTeachingSha256
  if (before === target.preQuoteSemanticSha256) {
    semantic.reviewedTeachingSha256 = target.finalQuoteNormalizedSha256
    changes.push({
      bookId: target.bookId,
      chapter: target.chapter,
      unitId: target.unitId,
      action: "rebind-after-reviewed-exact-biblia-emanus-quote-normalization",
      preQuoteSemanticSha256: target.preQuoteSemanticSha256,
      finalQuoteNormalizedSha256: target.finalQuoteNormalizedSha256,
    })
  } else if (before === target.finalQuoteNormalizedSha256) {
    changes.push({
      bookId: target.bookId,
      chapter: target.chapter,
      unitId: target.unitId,
      action: "already-rebound-after-reviewed-exact-biblia-emanus-quote-normalization",
      preQuoteSemanticSha256: target.preQuoteSemanticSha256,
      finalQuoteNormalizedSha256: target.finalQuoteNormalizedSha256,
    })
  } else {
    fail(`${target.unitId}: semantic hash is neither approved pre-quote nor known final quote hash; ${before}`)
  }
}

for (const [full, book] of cache) {
  fs.writeFileSync(full, JSON.stringify(book, null, 2) + "\n", "utf8")
}
fs.writeFileSync(OUT, JSON.stringify({
  schema: "emanus-nt-semantic-postquote-rebind-wave1-v1",
  policy: "The base semantic ledger remains bound to the manually reviewed pre-quote reader copy. After deterministic exact Biblia Emanus quote normalization, only these four explicitly reviewed SHA transitions may rebind semanticReview metadata in the final corpus. No teaching text is changed here.",
  count: changes.length,
  changes,
}, null, 2) + "\n", "utf8")
console.log(`Semantic post-quote rebind wave1: ${changes.length}/4 exact reviewed transitions.`)
