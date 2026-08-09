#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-fix-ledger.json")

const REPLACEMENTS = new Map([
  ["cuvant", "cuvânt"], ["cuvantul", "cuvântul"], ["tatal", "tatăl"],
  ["intai", "întâi"], ["intaia", "întâia"], ["invatator", "învățător"], ["invatatura", "învățătură"],
  ["imparatie", "împărăție"], ["imparatia", "împărăția"], ["credinta", "credință"], ["pacat", "păcat"],
  ["pacate", "păcate"], ["mantuire", "mântuire"], ["mantuit", "mântuit"], ["inceput", "început"],
  ["vesnic", "veșnic"], ["vesnicia", "veșnicia"], ["adevar", "adevăr"], ["adevarat", "adevărat"],
  ["nastere", "naștere"], ["sange", "sânge"], ["pamant", "pământ"], ["pamantesc", "pământesc"],
  ["ramane", "rămâne"], ["raman", "rămân"], ["raspuns", "răspuns"], ["fara", "fără"],
  ["inainte", "înainte"], ["inapoi", "înapoi"], ["intelege", "înțelege"], ["intelegere", "înțelegere"],
  ["marturisire", "mărturisire"], ["marturie", "mărturie"], ["marturia", "mărturia"],
  ["botezatorul", "botezătorul"], ["fagaduise", "făgăduise"], ["fagaduit", "făgăduit"],
  ["fagaduinta", "făgăduință"], ["curata", "curată"],
  ["mangaie-re", "mângâiere"], ["mangaere", "mângâiere"], ["omensec", "omenesc"],
])

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
    const regex = new RegExp(`\\b${escaped}\\b`, "giu")
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
fs.writeFileSync(ledgerPath, JSON.stringify({ schema: "emanus-nt-romanian-fix-ledger-v1", count: ledger.length, fixes: ledger }, null, 2) + "\n", "utf8")
console.log(`NT Romanian unambiguous fixes applied: ${ledger.length}.`)
