#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const LEDGER = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-ledger.json")
const FINAL_ARTIFACT = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-manual/23-1-ioan.json")
const BOOK_ID = "1-ioan"

const fail = (message) => {
  console.error(`[1 Ioan semantic ledger replacement] ${message}`)
  process.exit(1)
}
const stable = (value) => JSON.stringify(value, Object.keys(value ?? {}).sort())
const sortDecisions = (items) => [...items].sort((a, b) =>
  String(a.bookId).localeCompare(String(b.bookId)) ||
  Number(a.chapter) - Number(b.chapter) ||
  String(a.unitId).localeCompare(String(b.unitId)),
)

for (const filePath of [LEDGER, FINAL_ARTIFACT]) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(ROOT, filePath)}`)
}

const ledger = JSON.parse(fs.readFileSync(LEDGER, "utf8"))
const artifact = JSON.parse(fs.readFileSync(FINAL_ARTIFACT, "utf8"))
if (ledger.schema !== "emanus-nt-semantic-review-ledger-v1" || !Array.isArray(ledger.decisions)) fail("unexpected ledger schema")
if (artifact.schema !== "emanus-nt-semantic-review-book-v1" || artifact.bookId !== BOOK_ID || !Array.isArray(artifact.decisions)) fail("unexpected final 1 Ioan artifact schema")

const existing = sortDecisions(ledger.decisions.filter((d) => d.bookId === BOOK_ID))
const target = sortDecisions(artifact.decisions)
if (target.length !== 14) fail(`expected 14 final 1 Ioan decisions, got ${target.length}`)
const targetRewrite = target.filter((d) => d.action === "rewrite").length
const targetKeep = target.filter((d) => d.action === "keep").length
if (targetRewrite !== 11 || targetKeep !== 3) fail(`expected final 11 rewrite / 3 keep, got ${targetRewrite} / ${targetKeep}`)

if (JSON.stringify(existing) === JSON.stringify(target)) {
  console.log("1 Ioan semantic ledger already matches strict final artifact; no replacement needed.")
  process.exit(0)
}

if (existing.length !== 14) fail(`expected either final match or 14 legacy 1 Ioan decisions, found ${existing.length}`)
const oldRewrite = existing.filter((d) => d.action === "rewrite").length
const oldKeep = existing.filter((d) => d.action === "keep").length
if (oldRewrite !== 10 || oldKeep !== 4) fail(`legacy replacement guard failed: expected 10 rewrite / 4 keep, got ${oldRewrite} / ${oldKeep}`)

const byUnit = new Map(existing.map((d) => [d.unitId, d]))
const oldLove = byUnit.get("1-ioan-4-7-21-source-first")
const oldPrayer = byUnit.get("1-ioan-5-13-17-source-first")
const oldKeeping = byUnit.get("1-ioan-5-18-21-source-first")
if (!oldLove?.revisedTeaching?.includes("«Cum este El, așa suntem și noi în lumea aceasta»")) fail("legacy 4:7-21 signature not found")
if (oldPrayer?.action !== "keep") fail("legacy 5:13-17 keep signature not found")
if (oldKeeping?.action !== "rewrite") fail("legacy 5:18-21 rewrite signature not found")
if (!oldKeeping?.transcriptEvidence?.some((e) => e.transcriptSourceUrl === "https://sermonindex.net/speakers/zac-poonen/through-the-bible-1-john/")) {
  fail("legacy 5:18-21 TTB evidence signature not found")
}

ledger.decisions = ledger.decisions.filter((d) => d.bookId !== BOOK_ID)
ledger.count = ledger.decisions.length
fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n", "utf8")
console.log(`Removed ${existing.length} superseded 1 Ioan semantic decisions after strict legacy-signature verification; merge will install the final artifact.`)
