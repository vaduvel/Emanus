#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-diacritic-candidate-inventory.json")

function strip(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s").replace(/Ș/g, "S")
    .replace(/ț/g, "t").replace(/Ț/g, "T")
    .replace(/ă/g, "a").replace(/Ă/g, "A")
    .replace(/â/g, "a").replace(/Â/g, "A")
    .replace(/î/g, "i").replace(/Î/g, "I")
}
function hasRomanianDiacritic(value) { return /[ăâîșțĂÂÎȘȚ]/u.test(value) }
function tokenize(value) {
  return [...String(value ?? "").matchAll(/[\p{L}]+(?:[-’'][\p{L}]+)*/gu)].map((match) => ({ token: match[0], index: match.index ?? 0 }))
}
function context(value, index, token) {
  const start = Math.max(0, index - 70)
  const end = Math.min(value.length, index + token.length + 70)
  return `${start > 0 ? "…" : ""}${value.slice(start, end).replace(/\s+/g, " ").trim()}${end < value.length ? "…" : ""}`
}
function fields(book, chapter) {
  const out = [
    ["title", chapter.title], ["summary", chapter.summary], ["literaryContext", chapter.literaryContext],
    ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
  ]
  for (const unit of chapter.units ?? []) {
    out.push([`${unit.id}.heading`, unit.heading], [`${unit.id}.teaching`, unit.teaching], [`${unit.id}.forYourHeart`, unit.forYourHeart])
    for (let i = 0; i < (unit.words ?? []).length; i += 1) out.push([`${unit.id}.words[${i}].meaning`, unit.words[i].meaning])
  }
  return out.filter(([, value]) => typeof value === "string" && value.trim())
}

if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")
const rows = []
const variantsByAscii = new Map()
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    for (const [field, value] of fields(book, chapter)) {
      rows.push({ bookId: book.id, chapter: chapter.number, field, value })
      for (const { token } of tokenize(value)) {
        if (!hasRomanianDiacritic(token)) continue
        const key = strip(token).toLowerCase()
        const variants = variantsByAscii.get(key) ?? new Set()
        variants.add(token.toLowerCase())
        variantsByAscii.set(key, variants)
      }
    }
  }
}

const byToken = new Map()
for (const row of rows) {
  for (const { token, index } of tokenize(row.value)) {
    if (hasRomanianDiacritic(token)) continue
    const key = token.toLowerCase()
    const variants = variantsByAscii.get(key)
    if (!variants?.size) continue
    const entry = byToken.get(key) ?? { token: key, possibleDiacritizedForms: [...variants].sort((a,b)=>a.localeCompare(b,"ro")), occurrences: 0, samples: [] }
    entry.occurrences += 1
    if (entry.samples.length < 20) entry.samples.push({ bookId: row.bookId, chapter: row.chapter, field: row.field, context: context(row.value, index, token) })
    byToken.set(key, entry)
  }
}

const candidates = [...byToken.values()].sort((a,b) => b.occurrences - a.occurrences || a.token.localeCompare(b.token,"ro"))
const report = {
  schema: "emanus-nt-romanian-diacritic-candidate-inventory-v1",
  policy: "Candidate mining only. An ASCII token is listed when the same diacritic-stripped spelling also occurs elsewhere in the final reader corpus with Romanian diacritics. Candidates are NOT auto-corrected because some ASCII forms are grammatically valid homographs.",
  corpusFields: rows.length,
  candidateTokenClasses: candidates.length,
  candidateOccurrences: candidates.reduce((sum, item) => sum + item.occurrences, 0),
  candidates,
}
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8")
console.log(`NT Romanian diacritic candidate inventory: ${report.candidateOccurrences} occurrences across ${candidates.length} ASCII token classes / ${rows.length} reader fields.`)
