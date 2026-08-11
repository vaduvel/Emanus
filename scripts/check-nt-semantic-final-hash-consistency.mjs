#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const CORPUS = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const LEDGER = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-review-ledger.json")

function fail(message) {
  console.error(`[NT semantic final hash consistency] ${message}`)
  process.exit(1)
}
function sha(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function snapshot(unit) {
  return JSON.stringify({
    heading: String(unit.heading ?? ""),
    teaching: String(unit.teaching ?? ""),
    forYourHeart: String(unit.forYourHeart ?? ""),
  })
}

if (!fs.existsSync(CORPUS) || !fs.existsSync(LEDGER)) fail("corpus or semantic ledger missing")
const ledger = JSON.parse(fs.readFileSync(LEDGER, "utf8"))
const decisions = Array.isArray(ledger.decisions) ? ledger.decisions : []
if (!decisions.length) fail("semantic ledger decisions missing")
const ledgerIds = new Set(decisions.map((item) => `${item.bookId}\u0000${item.chapter}\u0000${item.unitId}`))
if (ledgerIds.size !== decisions.length) fail(`semantic ledger contains duplicate identities: ${decisions.length - ledgerIds.size}`)

let approved = 0
const corpusIds = new Set()
const stale = []
for (const file of fs.readdirSync(CORPUS).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(CORPUS, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      const semantic = unit.sourceFidelity?.semanticReview
      if (semantic?.status !== "approved-against-transcript") continue
      approved += 1
      const identity = `${book.id}\u0000${chapter.number}\u0000${unit.id}`
      corpusIds.add(identity)
      const current = sha(snapshot(unit))
      const reviewed = String(semantic.reviewedTeachingSha256 ?? "")
      if (current !== reviewed) stale.push({ bookId: book.id, chapter: chapter.number, unitId: unit.id, reviewed, current })
    }
  }
}

const missingFromCorpus = [...ledgerIds].filter((id) => !corpusIds.has(id))
const extraInCorpus = [...corpusIds].filter((id) => !ledgerIds.has(id))
if (missingFromCorpus.length || extraInCorpus.length || approved !== decisions.length || stale.length) {
  fail(
    `ledger=${decisions.length} approved=${approved} stale=${stale.length} ` +
    `missing=${missingFromCorpus.length} extra=${extraInCorpus.length}; ` +
    `staleSample=${JSON.stringify(stale.slice(0, 12))} ` +
    `missingSample=${JSON.stringify(missingFromCorpus.slice(0, 8))} extraSample=${JSON.stringify(extraInCorpus.slice(0, 8))}`
  )
}
console.log(`NT semantic final hash consistency OK: ${approved}/${decisions.length} approved units exactly match final reader-copy snapshots; 0 stale.`)
