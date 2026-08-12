#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")

function fail(message) {
  console.error(`[NT fidelity Romanian] ${message}`)
  process.exit(1)
}

if (!fs.existsSync(corpusDir)) fail("reviewed recovered corpus missing")

const readerKeys = new Set(["title", "summary", "literaryContext", "historicalContext", "heading", "teaching", "forYourHeart", "prayer", "meaning"])
const forbiddenSourceName = /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|Allen Nolan|Nolan|Robert Breaker|Breaker|Mohler)\b/iu
const approvedReaderReplacements = [
  {
    before: "sunt tratate de Poonen ca lucrări supranaturale reale ale Duhului",
    after: "sunt tratate în această expunere ca lucrări supranaturale reale ale Duhului",
  },
]

// Romanian `doua` is contextual, not globally corrupt. The feminine ordinal
// is correctly written `a doua` (including compounds such as `de-a doua`),
// while the cardinal is `două`. The fidelity pass therefore repairs only a
// standalone cardinal occurrence that is not immediately governed by `a`.
const CARDINAL_DOUA = /(?<!\ba\s)\bdoua\b/gu
const ORDINAL_A_DOUA = /\ba\s+doua\b/gu

let romanianReplacements = 0
let preservedOrdinals = 0
let sourceAttributionReplacements = 0
const touched = []

function visit(value, key, trace) {
  if (typeof value === "string") {
    if (!readerKeys.has(key)) return value
    let next = value

    const ordinalCount = [...next.matchAll(ORDINAL_A_DOUA)].length
    if (ordinalCount) preservedOrdinals += ordinalCount

    const cardinalCount = [...next.matchAll(CARDINAL_DOUA)].length
    if (cardinalCount) {
      next = next.replace(CARDINAL_DOUA, "două")
      romanianReplacements += cardinalCount
      touched.push({ trace, kind: "romanian-diacritic-cardinal-doua", count: cardinalCount })
    }

    for (const replacement of approvedReaderReplacements) {
      const count = next.split(replacement.before).length - 1
      if (!count) continue
      next = next.split(replacement.before).join(replacement.after)
      sourceAttributionReplacements += count
      touched.push({ trace, kind: "reader-source-attribution", count })
    }

    const forbidden = next.match(forbiddenSourceName)
    if (forbidden) fail(`${trace}: modern source name remains in reader copy: ${forbidden[0]}`)
    return next
  }
  if (Array.isArray(value)) return value.map((item, index) => visit(item, key, `${trace}[${index}]`))
  if (value && typeof value === "object") {
    const output = {}
    for (const [childKey, childValue] of Object.entries(value)) {
      output[childKey] = visit(childValue, childKey, `${trace}.${childKey}`)
    }
    return output
  }
  return value
}

for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(corpusDir, file)
  const before = JSON.parse(fs.readFileSync(full, "utf8"))
  const after = visit(before, "root", file)
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    fs.writeFileSync(full, JSON.stringify(after, null, 2) + "\n", "utf8")
  }
}

// Fail closed on the exact current corpus partition. Before the context-free
// fixer was corrected, most cardinals were already changed upstream and this
// stage saw only 3 residues. With the homograph handled correctly, the corpus
// exposes all 21 raw `doua` tokens here: 12 true cardinals + 9 correct feminine
// ordinals `a doua`. These counts are now the deterministic invariant.
if (romanianReplacements !== 12) fail(`expected exactly 12 post-fidelity cardinal 'doua' fixes, found ${romanianReplacements}; preserved ordinals=${preservedOrdinals}`)
if (preservedOrdinals !== 9) fail(`expected exactly 9 correct 'a doua' ordinals to be preserved, found ${preservedOrdinals}`)
if (sourceAttributionReplacements !== 1) fail(`expected exactly 1 approved reader-source attribution rewrite, found ${sourceAttributionReplacements}`)
console.log(`NT fidelity reader normalization: ${romanianReplacements} cardinal Romanian fixes; ${preservedOrdinals} correct 'a doua' ordinals preserved; ${sourceAttributionReplacements} source-attribution rewrite; no forbidden modern source names remain.`)
