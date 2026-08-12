#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const input = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-diacritic-candidate-inventory.json")
const output = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-diacritic-candidate-top.json")
if (!fs.existsSync(input)) throw new Error("missing Romanian diacritic candidate inventory")
const report = JSON.parse(fs.readFileSync(input, "utf8"))
const top = (report.candidates ?? []).slice(0, 120).map((entry) => ({
  token: entry.token,
  possibleDiacritizedForms: entry.possibleDiacritizedForms,
  occurrences: entry.occurrences,
  samples: (entry.samples ?? []).slice(0, 6),
}))
const compact = {
  schema: "emanus-nt-romanian-diacritic-candidate-top-v1",
  totalCandidateTokenClasses: report.candidateTokenClasses,
  totalCandidateOccurrences: report.candidateOccurrences,
  shownClasses: top.length,
  candidates: top,
}
fs.writeFileSync(output, JSON.stringify(compact, null, 2) + "\n", "utf8")
console.log(`NT Romanian diacritic compact review: top ${top.length}/${report.candidateTokenClasses} classes (${report.candidateOccurrences} total occurrences).`)
