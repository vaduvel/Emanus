#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-thin-unit-audit.json")

function fail(message) { console.error(`[NT thin-unit audit] ${message}`); process.exit(1) }
function wordCount(value) { return String(value ?? "").trim().split(/\s+/u).filter(Boolean).length }

if (!fs.existsSync(corpusDir)) fail("missing final NT corpus")
const findings = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (let unitIndex = 0; unitIndex < (chapter.units ?? []).length; unitIndex += 1) {
      const unit = chapter.units[unitIndex]
      const words = wordCount(unit.teaching)
      if (words >= 45) continue
      findings.push({
        bookId: book.id,
        bookName: book.name,
        chapter: chapter.number,
        unitIndex,
        unitId: unit.id,
        ref: unit.ref,
        verseStart: unit.verseStart,
        verseEnd: unit.verseEnd,
        heading: unit.heading ?? "",
        teaching: unit.teaching ?? "",
        forYourHeart: unit.forYourHeart ?? null,
        words,
        sourceKind: unit.sourceKind ?? null,
        sourceIds: unit.sourceIds ?? [],
        sourceAnchors: unit.sourceAnchors ?? [],
      })
    }
  }
}
const report = {
  schema: "emanus-nt-thin-unit-audit-v1",
  status: findings.length ? "manual-source-expansion-required" : "clean",
  thresholdWords: 45,
  count: findings.length,
  policy: "Thin units are expanded only from their passage and reviewed source context. No generic filler is allowed merely to cross the threshold.",
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT thin-unit audit: ${findings.length} units under ${report.thresholdWords} words.`)
