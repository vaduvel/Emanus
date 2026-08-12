#!/usr/bin/env node

import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const CORPUS = path.join(DATA, "nt-final-source-first")
const MANIFEST = path.join(DATA, "nt-final-source-first-manifest.json")
const SEMANTIC_LEDGER = path.join(DATA, "nt-semantic-review-ledger.json")
const WAVE3 = path.join(DATA, "nt-embedded-quote-reviewed-fix-wave-3-ledger.json")
const DIACRITICS = path.join(DATA, "nt-final-reader-diacritic-rebind.previous.json")
const OUT = path.join(DATA, "nt-semantic-final-reader-snapshot-rebind.json")

const TARGETS = [
  { bookFile: "03-luca.json", bookId: "luca", chapter: 1, unitId: "luca-1-26-38", wave3: "exact-be-rewrite", reason: "reviewed-wave3-exact-biblia-emanus-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 3, unitId: "luca-3-15-20", wave3: "remove-quotation-marks-from-paraphrase", reason: "reviewed-final-unquote-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 7, unitId: "luca-7-36-50", wave3: "remove-quotation-marks-from-paraphrase", reason: "reviewed-final-unquote-plus-diacritic-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 8, unitId: "luca-8-49-56", wave3: "remove-quotation-marks-from-paraphrase", reason: "reviewed-final-unquote-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 9, unitId: "luca-9-1-17", wave3: "remove-quotation-marks-from-paraphrase", reason: "reviewed-final-unquote-plus-diacritic-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 9, unitId: "luca-9-28-36", wave3: "exact-be-rewrite", reason: "reviewed-wave3-exact-biblia-emanus-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 17, unitId: "luca-17-26-37", wave3: "exact-be-rewrite", reason: "reviewed-wave3-exact-biblia-emanus-normalization" },
  { bookFile: "03-luca.json", bookId: "luca", chapter: 23, unitId: "luca-23-26-43", wave3: "exact-be-rewrite", reason: "reviewed-wave3-exact-biblia-emanus-plus-diacritic-normalization" },
  { bookFile: "05-fapte.json", bookId: "fapte", chapter: 18, unitId: "fapte-18-1-11", wave3: "remove-quotation-marks-from-paraphrase", reason: "reviewed-final-unquote-normalization" },
  { bookFile: "11-filipeni.json", bookId: "filipeni", chapter: 1, unitId: "filipeni-1-19-26", wave3: "remove-quotation-marks-from-paraphrase", reason: "reviewed-final-unquote-normalization" },
  { bookFile: "12-coloseni.json", bookId: "coloseni", chapter: 2, unitId: "coloseni-2-20-23", wave3: "exact-be-rewrite", reason: "reviewed-wave3-exact-biblia-emanus-normalization" },
]

function fail(message) {
  console.error(`[NT semantic final reader rebind] ${message}`)
  process.exit(1)
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha(value) { return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}` }
function snapshot(unit) {
  return JSON.stringify({
    heading: String(unit.heading ?? ""),
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  })
}
function readJson(file) {
  if (!fs.existsSync(file)) fail(`missing ${path.relative(ROOT, file)}`)
  return JSON.parse(fs.readFileSync(file, "utf8"))
}
function findUnit(book, target) {
  if (book.id !== target.bookId) fail(`${target.bookFile}: expected ${target.bookId}, got ${book.id}`)
  const chapter = (book.chapters ?? []).find((item) => item.number === target.chapter)
  const unit = (chapter?.units ?? []).find((item) => item.id === target.unitId)
  if (!unit) fail(`${target.unitId}: unit missing from final corpus`)
  return unit
}

const ledger = readJson(SEMANTIC_LEDGER)
const decisions = new Map((ledger.decisions ?? []).map((item) => [item.unitId, item]))
const wave3 = readJson(WAVE3)
const wave3Changes = wave3.changes ?? []
const previousDiacritics = readJson(DIACRITICS)
const diacriticOperations = previousDiacritics.operations ?? []
const touched = new Map()
const changes = []

for (const target of TARGETS) {
  const decision = decisions.get(target.unitId)
  if (!decision) fail(`${target.unitId}: semantic decision missing`)
  if (decision.bookId !== target.bookId || decision.chapter !== target.chapter) fail(`${target.unitId}: semantic decision identity mismatch`)
  if (decision.status !== "approved-against-transcript") fail(`${target.unitId}: semantic approval missing`)
  if (!Array.isArray(decision.transcriptEvidence) || !decision.transcriptEvidence.length) fail(`${target.unitId}: transcript evidence missing`)

  const matchingWave3 = wave3Changes.filter((row) => row.bookId === target.bookId && row.chapter === target.chapter && row.action === target.wave3)
  if (!matchingWave3.length) fail(`${target.unitId}: documented wave-3 transition missing`)
  if (target.wave3 === "exact-be-rewrite" && !matchingWave3.some((row) => String(row.field ?? "").includes("teaching") || String(row.field ?? "").includes("forYourHeart"))) {
    fail(`${target.unitId}: wave-3 exact rewrite does not target reader content`)
  }

  const full = path.join(CORPUS, target.bookFile)
  const book = touched.get(full) ?? readJson(full)
  touched.set(full, book)
  const unit = findUnit(book, target)
  const semantic = unit.sourceFidelity?.semanticReview
  if (semantic?.status !== "approved-against-transcript") fail(`${target.unitId}: final semantic metadata missing`)

  const before = String(decision.reviewedTeachingSha256 ?? "")
  if (!/^sha256:[0-9a-f]{64}$/i.test(before)) fail(`${target.unitId}: invalid pre-edit semantic hash`)
  const current = sha(snapshot(unit))

  if (semantic.reviewedTeachingSha256 === current) {
    changes.push({ bookId: target.bookId, chapter: target.chapter, unitId: target.unitId, action: "already-rebound", beforeSha256: before, afterSha256: current, reason: target.reason })
    continue
  }
  if (semantic.reviewedTeachingSha256 !== before) {
    fail(`${target.unitId}: semantic hash is neither ledger snapshot nor final snapshot; ${semantic.reviewedTeachingSha256}`)
  }

  const diacritic = diacriticOperations.find((row) => row.unitId === target.unitId)
  if (target.reason.includes("diacritic") && !diacritic) fail(`${target.unitId}: expected documented diacritic transition missing`)
  semantic.reviewedTeachingSha256 = current
  changes.push({
    bookId: target.bookId,
    chapter: target.chapter,
    unitId: target.unitId,
    action: "rebind-final-reader-snapshot",
    beforeSha256: before,
    afterSha256: current,
    reason: target.reason,
    wave3Evidence: matchingWave3.map((row) => ({ field: row.field, action: row.action, beforeSha256: row.beforeSha256 ?? null, afterSha256: row.afterSha256 ?? null, quoteSha256: row.quoteSha256 ?? null })),
    ...(diacritic ? { diacriticEvidence: { field: diacritic.field, beforeSha256: diacritic.beforeSha256, afterSha256: diacritic.afterSha256, counts: diacritic.counts } } : {}),
  })
}

for (const [full, book] of touched) fs.writeFileSync(full, stable(book), "utf8")

const manifest = readJson(MANIFEST)
for (const [full, book] of touched) {
  const rendered = stable(book)
  const entry = (manifest.books ?? []).find((item) => item.id === book.id)
  if (!entry) fail(`manifest book missing: ${book.id}`)
  entry.sha256 = crypto.createHash("sha256").update(rendered).digest("hex")
}
fs.writeFileSync(MANIFEST, stable(manifest), "utf8")
fs.writeFileSync(OUT, stable({
  schema: "emanus-nt-semantic-final-reader-snapshot-rebind-v1",
  policy: "The base semantic review remains bound to its reviewed pre-edit snapshot. This artifact permits only documented final-reader transitions already recorded in the exact BE quote-fix ledger and, where present, the prior diacritic rebind artifact. No text is changed by this script.",
  count: changes.length,
  changes,
}))
console.log(`NT semantic final reader rebind: ${changes.length}/${TARGETS.length} documented snapshot transitions.`)
