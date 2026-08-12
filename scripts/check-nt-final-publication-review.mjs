#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const reportPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-publication-review.json")
function fail(message) { console.error(`[NT final publication review gate] ${message}`); process.exit(1) }
if (!fs.existsSync(reportPath)) fail("review report missing")
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"))
if (report.schema !== "emanus-nt-final-publication-review-v1") fail("unexpected review report schema")
const blockers = Number(report.counts?.blockers ?? 0)
const reviewFindings = Number(report.counts?.reviewFindings ?? 0)
if (blockers || reviewFindings || report.status !== "clean") {
  console.error(`Final NT publication review is ${report.status}: ${blockers} blocker / ${reviewFindings} review findings.`)
  for (const item of (report.findings ?? []).slice(0, 120)) {
    console.error(`- [${item.severity}] ${item.wave}/${item.code} @ ${item.location}: ${item.message}`)
    if (item.other) console.error(`  other: ${item.other}`)
    if (Array.isArray(item.locations)) console.error(`  locations: ${item.locations.join(" | ")}`)
    if (item.normalizedSentence) console.error(`  sentence: ${item.normalizedSentence}`)
  }
  fail("all final-review blocker and review findings must be resolved or encoded as explicit reviewed exceptions before canonical publication")
}
if (report.counts?.books !== 27 || report.counts?.chapters !== 260 || report.counts?.units !== 970) fail("final-review corpus counts changed unexpectedly")
if (report.counts?.anchoredUnits !== report.counts?.units) fail("final-review source-anchor coverage is incomplete")
console.log(`NT final publication review CLEAN: ${report.counts.books} books / ${report.counts.chapters} chapters / ${report.counts.units} units.`)
