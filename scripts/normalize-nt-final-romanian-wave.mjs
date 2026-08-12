#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { FINAL_ROMANIAN_SAFE_REPLACEMENTS as REPLACEMENTS } from "./nt-final-romanian-wave.mjs"

const ROOT = process.cwd()
const dirs = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-romanian-wave-ledger.json")
function fail(message) { console.error(`[NT final Romanian wave] ${message}`); process.exit(1) }
function preserveCase(match, replacement) {
  if (match === match.toUpperCase()) return replacement.toUpperCase()
  if (match[0] === match[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1)
  return replacement
}
function fixString(value, location, ledger) {
  if (typeof value !== "string" || !value) return value
  let out = value
  for (const [wrong, expected] of REPLACEMENTS) {
    const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
    out = out.replace(regex, (match) => {
      const replacement = preserveCase(match, expected)
      if (replacement !== match) ledger.push({ location, before: match, after: replacement })
      return replacement
    })
  }
  return out
}
function fixBook(book, ledger) {
  for (const chapter of book.chapters ?? []) {
    const prefix = `${book.id}.${chapter.number}`
    for (const key of ["title", "summary", "literaryContext", "historicalContext", "prayer"]) {
      if (typeof chapter[key] === "string") chapter[key] = fixString(chapter[key], `${prefix}.${key}`, ledger)
    }
    for (let ui = 0; ui < (chapter.units ?? []).length; ui += 1) {
      const unit = chapter.units[ui]
      for (const key of ["heading", "teaching", "forYourHeart"]) {
        if (typeof unit[key] === "string") unit[key] = fixString(unit[key], `${prefix}.units[${ui}].${key}`, ledger)
      }
      // words[].meaning is deliberately excluded here. Lexical Romanian is
      // normalized inside the lexical review pipeline because each meaning is
      // reviewId/meaningSha256-bound in the frozen source-backed ledger.
    }
  }
}

const ledger = []
let filesChanged = 0
for (const dir of dirs) {
  if (!fs.existsSync(dir)) fail(`missing corpus ${path.relative(ROOT, dir)}`)
  for (const name of fs.readdirSync(dir).filter((item) => item.endsWith(".json")).sort()) {
    const full = path.join(dir, name)
    const book = JSON.parse(fs.readFileSync(full, "utf8"))
    const before = ledger.length
    fixBook(book, ledger)
    if (ledger.length > before) {
      fs.writeFileSync(full, JSON.stringify(book, null, 2) + "\n", "utf8")
      filesChanged += 1
    }
  }
}
fs.writeFileSync(ledgerPath, JSON.stringify({
  schema: "emanus-nt-final-romanian-wave-ledger-v2",
  policy: "Final reader-copy pass after source fidelity. Only corpus-mined, context-free Romanian diacritic restorations are automatic. Hash-bound words[].meaning is excluded and remains under the lexical review pipeline.",
  replacementClasses: REPLACEMENTS.size,
  filesChanged,
  count: ledger.length,
  fixes: ledger,
}, null, 2) + "\n", "utf8")
console.log(`NT final Romanian reader-copy wave: ${ledger.length} safe fixes across ${filesChanged} source-generation files / ${REPLACEMENTS.size} classes.`)