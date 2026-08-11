#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const BOOK = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first", "01-matei.json")
const LEDGERS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-reviewed-fix-ledger.json"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-reviewed-fix-wave-2-ledger.json"),
]
const OUT = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-postquote-rebind-matei.json")
const EXPECTED_REBINDS = 7

function fail(message) {
  console.error(`[Matei semantic post-quote rebind] ${message}`)
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
function unitField(field) {
  const match = /^units\[(\d+)\]\.(teaching|forYourHeart)$/.exec(String(field ?? ""))
  return match ? { unitIndex: Number(match[1]), key: match[2] } : null
}

if (!fs.existsSync(BOOK)) fail("final Matei book missing")
for (const ledger of LEDGERS) if (!fs.existsSync(ledger)) fail(`quote-fix ledger missing: ${path.basename(ledger)}`)
const book = JSON.parse(fs.readFileSync(BOOK, "utf8"))
if (book.id !== "matei") fail(`expected matei, got ${book.id}`)

const operations = []
for (const ledgerPath of LEDGERS) {
  const payload = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
  const rows = payload.fixes ?? payload.changes ?? []
  if (!Array.isArray(rows)) fail(`${path.basename(ledgerPath)}: fixes/changes missing`)
  for (const row of rows) {
    if (row.bookId !== "matei") continue
    if (row.verification !== "reviewed-exact-same-chapter-biblia-emanus") continue
    const parsed = unitField(row.field)
    if (!parsed) continue
    if (typeof row.before !== "string" || typeof row.after !== "string") {
      fail(`${path.basename(ledgerPath)}: Matei unit quote operation lacks before/after`)
    }
    operations.push({
      ledger: path.basename(ledgerPath),
      chapter: row.chapter,
      field: row.field,
      unitIndex: parsed.unitIndex,
      key: parsed.key,
      before: row.before,
      after: row.after,
    })
  }
}

const groups = new Map()
for (const op of operations) {
  const key = `${op.chapter}:${op.unitIndex}`
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(op)
}

const changes = []
for (const [groupKey, ops] of groups) {
  const [chapterNoText, unitIndexText] = groupKey.split(":")
  const chapterNo = Number(chapterNoText)
  const unitIndex = Number(unitIndexText)
  const chapter = (book.chapters ?? []).find((item) => item.number === chapterNo)
  const unit = chapter?.units?.[unitIndex]
  if (!unit) fail(`${groupKey}: quote-target unit missing`)
  const semantic = unit.sourceFidelity?.semanticReview
  if (semantic?.status !== "approved-against-transcript") continue
  if (!Array.isArray(semantic.transcriptEvidence) || semantic.transcriptEvidence.length < 1) {
    fail(`${unit.id}: semantic transcript evidence missing`)
  }
  const preQuoteSha = semantic.reviewedTeachingSha256
  if (!/^sha256:[0-9a-f]{64}$/i.test(String(preQuoteSha ?? ""))) fail(`${unit.id}: invalid semantic pre-quote hash`)
  const currentSha = sha(snapshot(unit))
  if (currentSha === preQuoteSha) continue

  const reconstructed = {
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  }
  // Reconstruct the manually reviewed pre-quote snapshot by reversing only ledger-proven operations.
  for (const op of [...ops].reverse()) {
    const text = reconstructed[op.key]
    const afterCount = text.split(op.after).length - 1
    if (afterCount !== 1) {
      fail(`${unit.id}: cannot uniquely reverse ${op.ledger} ${op.field}; '${op.after}' occurrences=${afterCount}`)
    }
    reconstructed[op.key] = text.replace(op.after, op.before)
  }
  const reconstructedSha = sha(snapshot(unit, reconstructed))
  if (reconstructedSha !== preQuoteSha) {
    fail(`${unit.id}: inverse quote-only reconstruction does not recover reviewed hash; ${reconstructedSha} != ${preQuoteSha}`)
  }

  semantic.reviewedTeachingSha256 = currentSha
  changes.push({
    bookId: "matei",
    chapter: chapterNo,
    unitId: unit.id,
    action: "rebind-after-ledger-proven-exact-biblia-emanus-quote-normalization",
    preQuoteSemanticSha256: preQuoteSha,
    finalQuoteNormalizedSha256: currentSha,
    operations: ops.map((op) => ({ ledger: op.ledger, field: op.field, before: op.before, after: op.after })),
  })
}

if (changes.length !== EXPECTED_REBINDS) {
  fail(`expected ${EXPECTED_REBINDS} verified Matei quote-only rebinds, got ${changes.length}`)
}

fs.writeFileSync(BOOK, JSON.stringify(book, null, 2) + "\n", "utf8")
fs.writeFileSync(OUT, JSON.stringify({
  schema: "emanus-nt-semantic-postquote-rebind-matei-v1",
  policy: "No reader text is changed here. A semantic hash may move from its manually reviewed pre-quote snapshot to final reader copy only when inverse application of the exact, same-chapter Biblia Emanus quote-fix ledger operations reconstructs the original reviewed hash byte-for-byte.",
  count: changes.length,
  changes,
}, null, 2) + "\n", "utf8")
console.log(`Matei semantic post-quote rebind: ${changes.length}/${EXPECTED_REBINDS} exact quote-only transitions verified.`)
