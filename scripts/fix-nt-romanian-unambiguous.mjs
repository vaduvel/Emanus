#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { UNAMBIGUOUS_ROMANIAN_DIACRITICS as REPLACEMENTS } from "./nt-romanian-diacritics.mjs"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-fix-ledger.json")

// Historical registry entries `in` and `doua` are NOT context-free:
// - `in` is the Romanian noun for flax/linen (e.g. `în in curat`) as well as a
//   raw spelling of the preposition `în`;
// - `doua` is correct in the feminine ordinal `a doua`, but cardinal `două`
//   needs the diacritic.
const CONTEXT_SENSITIVE_SHARED_KEYS = new Set(["in", "doua"])

// This is the same conservative predicate used by the final audit. It catches
// the preposition `in` but deliberately leaves demonstrated linen/flax noun
// contexts such as `în in curat`, `de in`, and `din in` untouched.
const PREPOSITION_IN = /(?<!\bîn\s)(?<!\bde\s)(?<!\bdin\s)\bin\b/giu

// Exact corpus phrases for the five remaining `viata` tokens. They are kept
// explicit because `viata` can mean either indefinite `viață` or definite
// `viața`; a global replacement would be linguistically unsafe.
const VIATA_CONTEXTUAL = [
  ["In El era viata", "În El era viața"],
  ["are viata in Sine", "are viața în Sine"],
  ["in viata, ci pe El", "în viață, ci pe El"],
  ["in viata noastră", "în viața noastră"],
  ["in viata de zi cu zi", "în viața de zi cu zi"],
]

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
    if (CONTEXT_SENSITIVE_SHARED_KEYS.has(wrong.toLowerCase())) continue
    const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
    out = out.replace(regex, (match) => {
      const replacement = preserveCase(match, expected)
      ledger.push({ location, kind: "context-free", before: match, after: replacement })
      return replacement
    })
  }

  out = out.replace(PREPOSITION_IN, (match) => {
    const replacement = preserveCase(match, "în")
    ledger.push({ location, kind: "contextual-preposition-in", before: match, after: replacement })
    return replacement
  })

  for (const [before, after] of VIATA_CONTEXTUAL) {
    const count = out.split(before).length - 1
    if (!count) continue
    out = out.split(before).join(after)
    for (let index = 0; index < count; index += 1) {
      ledger.push({ location, kind: "contextual-viata", before, after })
    }
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
const prepositionCount = ledger.filter((item) => item.kind === "contextual-preposition-in").length
const viataCount = ledger.filter((item) => item.kind === "contextual-viata").length
fs.writeFileSync(ledgerPath, JSON.stringify({
  schema: "emanus-nt-romanian-fix-ledger-v6",
  policy: "Context-free fixes plus explicit contextual handling for the Romanian in/în homograph and the five audited viata inflections; Unicode-aware boundaries; demonstrated flax/linen noun contexts remain untouched.",
  count: ledger.length,
  contextualPrepositionIn: prepositionCount,
  contextualViata: viataCount,
  fixes: ledger,
}, null, 2) + "\n", "utf8")
console.log(`NT Romanian fixes applied: ${ledger.length}; contextual preposition in=${prepositionCount}; contextual viata=${viataCount}.`)
