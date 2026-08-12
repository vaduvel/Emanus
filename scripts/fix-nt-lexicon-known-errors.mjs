#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-lexicon-fix-ledger.json")

function fail(message) {
  console.error(`[NT lexicon fixes] ${message}`)
  process.exit(1)
}
if (!fs.existsSync(dir)) fail("missing nt-audited-recovered-refined")

const FIXES = new Map([
  ["λεγιών", "legiune — unitate militară romană de ordinul miilor de soldați. Termenul nu este sinonim cu «cohortă»; în Marcu 5 numele subliniază numărul foarte mare al duhurilor."],
  ["ὀργή", "mânie, indignare. În Marcu 3:5 termenul denumește mânia lui Isus; mâhnirea față de împietrirea inimii este exprimată separat în propoziție."],
  ["βαπτίζω", "a cufunda, a scufunda; în uzul Noului Testament, a boteza. Câmpul lexical descrie sensul cuvântului; aplicația doctrinară a botezului rămâne în explicația pasajului."],
])

const ledger = []
const found = new Set()
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  let changed = false
  for (const chapter of book.chapters ?? []) {
    for (const unit of chapter.units ?? []) {
      for (const word of unit.words ?? []) {
        const replacement = FIXES.get(word.original)
        if (!replacement) continue
        found.add(word.original)
        if (word.meaning !== replacement) {
          ledger.push({ bookId: book.id, chapter: chapter.number, unit: unit.ref, original: word.original, before: word.meaning, after: replacement })
          word.meaning = replacement
          changed = true
        }
      }
    }
  }
  if (changed) fs.writeFileSync(full, JSON.stringify(book, null, 2) + "\n", "utf8")
}

for (const original of FIXES.keys()) if (!found.has(original)) fail(`expected lexeme not found: ${original}`)
fs.writeFileSync(ledgerPath, JSON.stringify({ schema: "emanus-nt-lexicon-fix-ledger-v1", count: ledger.length, fixes: ledger }, null, 2) + "\n", "utf8")
console.log(`NT lexicon corrections applied: ${ledger.length}.`)
