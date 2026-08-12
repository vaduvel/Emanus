#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const CORPUS = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const LEDGER = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-fix-ledger.json")
const OUT = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-postquote-rebind-conservative.json")

function fail(message) {
  console.error(`[semantic conservative quote rebind] ${message}`)
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

if (!fs.existsSync(CORPUS)) fail("final corpus missing")
if (!fs.existsSync(LEDGER)) fail("conservative quote-fix ledger missing")
const payload = JSON.parse(fs.readFileSync(LEDGER, "utf8"))
if (!String(payload.schema ?? "").startsWith("emanus-nt-embedded-quote-fix-ledger-v")) fail(`unexpected ledger schema ${payload.schema}`)
const fixes = payload.fixes
if (!Array.isArray(fixes)) fail("ledger fixes missing")

const byUnit = new Map()
for (const fix of fixes) {
  if (!fix.unitId) continue
  if (!/^units\[\d+\]\.(teaching|forYourHeart)$/.test(String(fix.fieldPath ?? ""))) {
    fail(`${fix.bookId} ${fix.chapter} ${fix.unitId}: invalid fieldPath ${fix.fieldPath}`)
  }
  if (typeof fix.before !== "string" || typeof fix.after !== "string") fail(`${fix.unitId}: before/after missing`)
  const key = `${fix.bookId}\u0000${fix.chapter}\u0000${fix.unitId}`
  if (!byUnit.has(key)) byUnit.set(key, [])
  byUnit.get(key).push(fix)
}

const files = fs.readdirSync(CORPUS).filter((name) => name.endsWith(".json")).sort()
const cache = new Map()
const changes = []

for (const [key, ops] of byUnit) {
  const [bookId, chapterText, unitId] = key.split("\u0000")
  const chapterNo = Number(chapterText)
  const file = files.find((name) => name.endsWith(`-${bookId}.json`))
  if (!file) fail(`${bookId}: final book file missing`)
  const full = path.join(CORPUS, file)
  let book = cache.get(full)
  if (!book) {
    book = JSON.parse(fs.readFileSync(full, "utf8"))
    cache.set(full, book)
  }
  const chapter = (book.chapters ?? []).find((item) => item.number === chapterNo)
  const unit = (chapter?.units ?? []).find((item) => item.id === unitId)
  if (!unit) fail(`${unitId}: final unit missing`)
  const semantic = unit.sourceFidelity?.semanticReview
  if (semantic?.status !== "approved-against-transcript") continue
  if (!Array.isArray(semantic.transcriptEvidence) || semantic.transcriptEvidence.length < 1) fail(`${unitId}: transcript evidence missing`)
  const preQuoteSha = String(semantic.reviewedTeachingSha256 ?? "")
  if (!/^sha256:[0-9a-f]{64}$/i.test(preQuoteSha)) fail(`${unitId}: invalid reviewedTeachingSha256`)
  const currentSha = sha(snapshot(unit))
  if (currentSha === preQuoteSha) continue

  const reconstructed = {
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  }
  for (const op of [...ops].reverse()) {
    const match = /^units\[\d+\]\.(teaching|forYourHeart)$/.exec(op.fieldPath)
    const field = match?.[1]
    if (!field) fail(`${unitId}: invalid reversible field ${op.fieldPath}`)
    const text = reconstructed[field]
    const count = text.split(op.after).length - 1
    if (count !== 1) fail(`${unitId}: cannot uniquely reverse '${op.after}' in ${field}; occurrences=${count}`)
    reconstructed[field] = text.replace(op.after, op.before)
  }
  const reconstructedSha = sha(snapshot(unit, reconstructed))
  if (reconstructedSha !== preQuoteSha) {
    fail(`${unitId}: conservative quote inverse does not recover reviewed hash; ${reconstructedSha} != ${preQuoteSha}`)
  }

  semantic.reviewedTeachingSha256 = currentSha
  changes.push({
    bookId,
    chapter: chapterNo,
    unitId,
    action: "rebind-after-reversible-conservative-same-chapter-biblia-emanus-quote-fix",
    preQuoteSemanticSha256: preQuoteSha,
    finalQuoteNormalizedSha256: currentSha,
    operations: ops.map((op) => ({ fieldPath: op.fieldPath, before: op.before, after: op.after })),
  })
}

for (const [full, book] of cache) fs.writeFileSync(full, JSON.stringify(book, null, 2) + "\n", "utf8")
fs.writeFileSync(OUT, JSON.stringify({
  schema: "emanus-nt-semantic-postquote-rebind-conservative-v1",
  policy: "No reader copy is changed here. A semantic hash is rebound only when reversing the exact unit-level conservative Biblia Emanus quote-fix ledger operations recreates the manually reviewed pre-quote snapshot hash byte-for-byte.",
  conservativeFixes: fixes.length,
  semanticRebinds: changes.length,
  changes,
}, null, 2) + "\n", "utf8")
console.log(`Semantic conservative quote rebind: ${changes.length} transcript-reviewed unit hashes proven and rebound from ${fixes.length} conservative quote fixes.`)
