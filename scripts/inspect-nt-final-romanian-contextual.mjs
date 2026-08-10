#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-romanian-contextual-review.json")
const TOKENS = [
  "persoana", "transforma", "sta", "ridica", "intra", "lucreaza", "refuza", "exista", "judeca", "asculta",
  "ajuta", "cauta", "cheama", "considera", "vindeca", "explica", "leaga", "schimba", "aduna", "afla",
  "bucura", "declara", "continua", "masoara", "umbla", "arunca", "compara", "dorinta", "exprima", "ignora",
  "mira", "preda", "prefera", "repeta", "accepta", "acuza", "capata", "confirma", "confrunta", "creste",
  "cufunda", "evita", "foloseste", "invoca", "mustra", "ocupa", "pleaca", "priveste", "ramana", "striga", "suna"
]
function fields(chapter) {
  const out = [["title", chapter.title], ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer]]
  for (const unit of chapter.units ?? []) out.push([`${unit.id}.heading`, unit.heading], [`${unit.id}.teaching`, unit.teaching], [`${unit.id}.forYourHeart`, unit.forYourHeart])
  return out.filter(([, value]) => typeof value === "string" && value.trim())
}
function context(value, index, length) {
  const start = Math.max(0, index - 95)
  const end = Math.min(value.length, index + length + 95)
  return `${start > 0 ? "…" : ""}${value.slice(start, end).replace(/\s+/g, " ").trim()}${end < value.length ? "…" : ""}`
}
if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")
const byToken = Object.fromEntries(TOKENS.map((token) => [token, []]))
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const [field, value] of fields(chapter)) {
      for (const token of TOKENS) {
        const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu")
        for (const match of value.matchAll(regex)) byToken[token].push({ bookId: book.id, chapter: chapter.number, field, matched: match[0], context: context(value, match.index ?? 0, match[0].length) })
      }
    }
  }
}
const entries = TOKENS.map((token) => ({ token, count: byToken[token].length, occurrences: byToken[token] })).filter((item) => item.count)
fs.writeFileSync(outputPath, JSON.stringify({ schema: "emanus-nt-final-romanian-contextual-review-v1", tokenClasses: entries.length, occurrences: entries.reduce((sum,item)=>sum+item.count,0), entries }, null, 2) + "\n", "utf8")
console.log(`NT final Romanian contextual inspection: ${entries.reduce((sum,item)=>sum+item.count,0)} occurrences across ${entries.length}/${TOKENS.length} selected classes.`)
