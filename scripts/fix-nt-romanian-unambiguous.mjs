#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { UNAMBIGUOUS_ROMANIAN_DIACRITICS as REPLACEMENTS } from "./nt-romanian-diacritics.mjs"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-fix-ledger.json")

// Automatic Romanian edits are intentionally limited to context-free corruptions
// and forms whose diacritized spelling is unambiguous in reader-facing Romanian.
// Context-sensitive forms (credinta -> credință/credința, viata -> viață/viața,
// curata -> curată/curăță, arata -> arată/arăta etc.) remain in the reviewed
// contextual normalizer and publication audit.

function fail(message) { console.error(`[NT Romanian fixes] ${message}`); process.exit(1) }
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
      ledger.push({ location, before: match, after: replacement })
      return replacement
    })
  }
  return out
}

if (!fs.existsSync(dir)) fail("missing nt-audited-recovered-refined")
const ledger = []
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  const beforeCount = ledger.length
  for (const chapter of book.chapters ?? []) {
    const prefix = `${book.id}.${chapter.number}`
    for (const key of ["title", "summary", "literaryContext", "historicalContext", "prayer"]) {
      if (typeof chapter[key] === "string") chapter[key] = fixString(chapter[key], `${prefix}.${key}`, ledger)
    }
    for (let unitIndex = 0; unitIndex < (chapter.units ?? []).length; unitIndex += 1) {
      const unit = chapter.units[unitIndex]
      for (const key of ["heading", "teaching", "forYourHeart"]) {
        if (typeof unit[key] === "string") unit[key] = fixString(unit[key], `${prefix}.units[${unitIndex}].${key}`, ledger)
      }
      for (let wordIndex = 0; wordIndex < (unit.words ?? []).length; wordIndex += 1) {
        const word = unit.words[wordIndex]
        if (typeof word.meaning === "string") word.meaning = fixString(word.meaning, `${prefix}.units[${unitIndex}].words[${wordIndex}].meaning`, ledger)
      }
    }
  }
  if (ledger.length !== beforeCount) fs.writeFileSync(full, JSON.stringify(book, null, 2) + "\n", "utf8")
}
fs.writeFileSync(ledgerPath, JSON.stringify({ schema: "emanus-nt-romanian-fix-ledger-v5", policy: "context-free-corruptions-and-unambiguous-diacritics-only; shared registry; Unicode-aware token boundaries; context-sensitive inflections remain reviewed separately", count: ledger.length, fixes: ledger }, null, 2) + "\n", "utf8")
console.log(`NT Romanian safe fixes applied: ${ledger.length}.`)
