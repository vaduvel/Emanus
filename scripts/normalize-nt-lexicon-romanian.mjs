#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { UNAMBIGUOUS_ROMANIAN_DIACRITICS } from "./nt-romanian-diacritics.mjs"

const ROOT = process.cwd()
const DIRS = [
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered"),
  path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first"),
]

const EXTRA = new Map([
  ["adevarului", "adevărului"],
  ["nasterii", "nașterii"],
  ["asumata", "asumată"],
  ["asteptat", "așteptat"],
  ["invatatorule", "învățătorule"],
  ["fagaduintele", "făgăduințele"],
  ["talmacit", "tălmăcit"],
  ["lucrari", "lucrări"],
  ["cunoastere", "cunoaștere"],
  ["inaltat", "înălțat"],
  ["inaltare", "înălțare"],
  ["hotarata", "hotărâtă"],
  ["mania", "mânia"],
  ["painea", "pâinea"],
  ["asteptarile", "așteptările"],
  ["randuiala", "rânduiala"],
  ["ratacire", "rătăcire"],
  ["mangaiere", "mângâiere"],
  ["stapanitorului", "stăpânitorului"],
  ["stapanitorul", "stăpânitorul"],
  ["saraca", "săracă"],
  ["plina", "plină"],
  ["rapune", "răpune"],
  ["strangere", "strângere"],
  ["rugaminte", "rugăminte"],
  ["proslavire", "proslăvire"],
  ["proslavit", "proslăvit"],
  ["capat", "capăt"],
  ["deplinatate", "deplinătate"],
  ["dusa", "dusă"],
  ["implinirea", "împlinirea"],
  ["intreaga", "întreagă"],
  ["miscare", "mișcare"],
  ["adanca", "adâncă"],
  ["impotrivitori", "împotrivitori"],
  ["taria", "tăria"],
  ["desfiintata", "desființată"],
  ["lacrima", "lacrimă"],
  ["mortii", "morții"],
  ["conducatorilor", "conducătorilor"],
  ["curatire", "curățire"],
  ["masura", "măsura"],
  ["statornica", "statornică"],
  ["linistea", "liniștea"],
  ["intr-unul", "într-unul"],
  ["intre", "între"],
  ["raului", "răului"],
  ["frumusetea", "frumusețea"],
  ["dumnezeiasca", "dumnezeiască"],
  ["aratate", "arătate"],
  ["aratarea", "arătarea"],
  ["aratand", "arătând"],
  ["adevarul", "adevărul"],
  ["increde", "încrede"],
  ["incredea", "încredea"],
  ["incredere", "încredere"],
  ["cunoasterea", "cunoașterea"],
  ["vesnice", "veșnice"],
  ["vesnica", "veșnică"],
  ["mantuitorul", "mântuitorul"],
  ["mantuirii", "mântuirii"],
])

const PHRASES = [
  ["fata de", "față de"],
  ["în fata", "în fața"],
  ["pana la", "până la"],
  ["din mana Lui", "din mâna Lui"],
  ["în mana Lui", "în mâna Lui"],
  ["a spala", "a spăla"],
  ["a plans", "a plâns"],
  ["care refuza", "care refuză"],
  ["prezenta lui", "prezența lui"],
  ["prezenta și", "prezența și"],
  ["originea noii nasteri", "originea noii nașteri"],
]

function preserveCase(match, replacement) {
  if (match === match.toUpperCase()) return replacement.toUpperCase()
  if (match[0] === match[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1)
  return replacement
}
function applyTokenMap(value, map) {
  let out = value
  for (const [wrong, expected] of map) {
    const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
    out = out.replace(regex, (match) => preserveCase(match, expected))
  }
  return out
}

let changed = 0
for (const dir of DIRS) {
  if (!fs.existsSync(dir)) throw new Error(`missing ${path.relative(ROOT, dir)}`)
  for (const name of fs.readdirSync(dir).filter((item) => item.endsWith(".json")).sort()) {
    const full = path.join(dir, name)
    const book = JSON.parse(fs.readFileSync(full, "utf8"))
    let dirty = false
    for (const chapter of book.chapters ?? []) {
      for (const unit of chapter.units ?? []) {
        for (const word of unit.words ?? []) {
          if (typeof word.meaning !== "string") continue
          let next = applyTokenMap(word.meaning, UNAMBIGUOUS_ROMANIAN_DIACRITICS)
          next = applyTokenMap(next, EXTRA)
          for (const [before, after] of PHRASES) next = next.split(before).join(after)
          if (next !== word.meaning) {
            word.meaning = next
            dirty = true
            changed += 1
          }
        }
      }
    }
    if (dirty) fs.writeFileSync(full, JSON.stringify(book, null, 2) + "\n", "utf8")
  }
}
console.log(`NT lexical Romanian normalization: ${changed} lexical meanings changed.`)
