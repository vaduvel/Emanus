#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
const ROOT = process.cwd()
const input = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-diacritic-candidate-inventory.json")
const output = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-diacritic-token-list.txt")
if (!fs.existsSync(input)) throw new Error("missing candidate inventory")
const report = JSON.parse(fs.readFileSync(input, "utf8"))
const lines = [
  `totalClasses\t${report.candidateTokenClasses}`,
  `totalOccurrences\t${report.candidateOccurrences}`,
  "rank\ttoken\toccurrences\tpossibleDiacritizedForms",
]
for (const [index, item] of (report.candidates ?? []).slice(0, 400).entries()) {
  lines.push(`${index + 1}\t${item.token}\t${item.occurrences}\t${(item.possibleDiacritizedForms ?? []).join("|")}`)
}
fs.writeFileSync(output, lines.join("\n") + "\n", "utf8")
console.log(`NT Romanian diacritic token index: ${Math.min(400, report.candidateTokenClasses)}/${report.candidateTokenClasses} classes.`)
