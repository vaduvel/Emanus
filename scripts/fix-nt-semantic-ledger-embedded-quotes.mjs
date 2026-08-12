#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-semantic-review-ledger.json")

function fail(message) {
  console.error(`[NT semantic ledger quote fix] ${message}`)
  process.exit(1)
}
function sha256(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}
function snapshot(heading, teaching, forYourHeart = "") {
  return JSON.stringify({ heading: String(heading ?? ""), teaching: String(teaching ?? ""), forYourHeart: String(forYourHeart ?? "") })
}

if (!fs.existsSync(ledgerPath)) {
  console.log("NT semantic ledger quote fix: ledger absent; nothing to do.")
  process.exit(0)
}

const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
const decision = (ledger.decisions ?? []).find((item) => item.unitId === "2-tesaloniceni-3-6-12-source-first")
if (!decision) fail("missing reviewed 2 Tesaloniceni 3:6-12 decision")

const before = "Porunca „dacă cineva nu vrea să lucreze, nici să nu mănânce” îi vizează pe cei care refuză voit munca, nu pe cei incapabili să muncească."
const after = "Porunca din versetul 10 îi vizează pe cei care refuză voit munca, nu pe cei incapabili să muncească."

if (decision.revisedTeaching.includes(before)) {
  decision.revisedTeaching = decision.revisedTeaching.replace(before, after)
} else if (!decision.revisedTeaching.includes(after)) {
  fail("reviewed teaching is neither the expected pre-fix nor post-fix copy")
}

const expectedHeading = "Munca lui Pavel ca model și porunca împotriva leneviei"
const expectedHash = sha256(snapshot(expectedHeading, decision.revisedTeaching, decision.revisedForYourHeart ?? ""))
if (expectedHash !== "sha256:55fca6b3971d43c4b813822975f1623abb0a508629fc52b51ad5af15ad170d26") {
  fail(`unexpected post-fix teaching hash ${expectedHash}`)
}
decision.reviewedTeachingSha256 = expectedHash

fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + "\n", "utf8")
console.log(`NT semantic ledger quote fix: 2 Tesaloniceni 3:6-12 normalized and rebound to ${expectedHash}.`)
