#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { FINAL_ROMANIAN_SAFE_REPLACEMENTS as REPLACEMENTS } from "./nt-final-romanian-wave.mjs"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-romanian-wave-audit.json")
function fields(chapter) {
  const out = [["title", chapter.title], ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer]]
  for (const unit of chapter.units ?? []) {
    out.push([`${unit.id}.heading`, unit.heading], [`${unit.id}.teaching`, unit.teaching], [`${unit.id}.forYourHeart`, unit.forYourHeart])
  }
  return out.filter(([, value]) => typeof value === "string" && value.trim())
}
function contextFor(value, index, length) {
  const start = Math.max(0, index - 60)
  const end = Math.min(value.length, index + length + 60)
  return `${start > 0 ? "…" : ""}${value.slice(start, end).replace(/\s+/g, " ").trim()}${end < value.length ? "…" : ""}`
}

if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")
const findings = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const [field, value] of fields(chapter)) {
      for (const [wrong, expected] of REPLACEMENTS) {
        const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
        for (const match of value.matchAll(regex)) findings.push({ bookId: book.id, chapter: chapter.number, field, token: match[0], expected, context: contextFor(value, match.index ?? 0, match[0].length) })
      }
    }
  }
}
const report = {
  schema: "emanus-nt-final-romanian-wave-audit-v2",
  scope: "Non-lexical reader copy only. words[].meaning stays under the source-backed lexical review/hash pipeline.",
  status: findings.length ? "blocked" : "clean",
  replacementClasses: REPLACEMENTS.size,
  count: findings.length,
  findings,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT final Romanian reader-copy audit: ${findings.length} unresolved occurrences across ${REPLACEMENTS.size} safe classes.`)
if (findings.length) {
  for (const item of findings.slice(0, 100)) console.error(`- ${item.bookId} ${item.chapter} ${item.field}: ${item.token} -> ${item.expected} :: ${item.context}`)
  process.exit(1)
}