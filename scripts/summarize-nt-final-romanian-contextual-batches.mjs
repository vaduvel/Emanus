#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const input = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-romanian-contextual-review.json")
const outDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-romanian-contextual-batches")
if (!fs.existsSync(input)) throw new Error("missing contextual review")
const report = JSON.parse(fs.readFileSync(input, "utf8"))
fs.mkdirSync(outDir, { recursive: true })
const BATCHES = [
  ["01-core-verbs", ["sta","intra","afla","transforma","ridica","refuza","exista","judeca","asculta","vindeca"]],
  ["02-core-verbs", ["lucreaza","ajuta","cauta","cheama","considera","explica","leaga","schimba","aduna","bucura"]],
  ["03-core-verbs", ["declara","continua","masoara","umbla","arunca","compara","exprima","ignora","mira","preda"]],
  ["04-core-verbs", ["prefera","repeta","accepta","acuza","capata","confirma","confrunta","creste","cufunda","evita"]],
  ["05-core-verbs", ["foloseste","invoca","mustra","ocupa","pleaca","priveste","ramana","striga","suna"]],
  ["06-nouns", ["persoana","dorinta"]],
]
const byToken = new Map((report.entries ?? []).map((entry) => [entry.token, entry]))
for (const [name, tokens] of BATCHES) {
  const lines = [`batch\t${name}`]
  let count = 0
  for (const token of tokens) {
    const entry = byToken.get(token)
    if (!entry) continue
    lines.push(`\nTOKEN\t${token}\t${entry.count}`)
    for (const [index, occ] of (entry.occurrences ?? []).entries()) {
      count += 1
      lines.push(`${index + 1}\t${occ.bookId}\t${occ.chapter}\t${occ.field}\t${occ.context}`)
    }
  }
  lines.splice(1, 0, `occurrences\t${count}`)
  fs.writeFileSync(path.join(outDir, `${name}.txt`), lines.join("\n") + "\n", "utf8")
}
console.log(`NT final Romanian contextual batches materialized: ${BATCHES.length}.`)
