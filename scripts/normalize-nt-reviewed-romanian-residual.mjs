#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-reviewed-recovered-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-romanian-residual-fix-ledger.json")

function fail(message) { console.error(`[NT Romanian residual] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

// Exact reviewed constructions remaining after the general deterministic and
// contextual passes. No fallback replaces bare `viata`, `credinta` or
// `adevarata`; each rule fixes only a grammatically resolved local form.
const RULES = [
  [/În El era viata/gu, "În El era viața", "ioan-life-subject"],
  [/ci viata dinlăuntru/giu, "ci viață dinlăuntru", "ioan-life-indefinite"],
  [/apoi viata vesnica/giu, "apoi viața veșnică", "ioan-eternal-life-definite"],
  [/are viata vesnica/giu, "are viață veșnică", "ioan-eternal-life-indefinite"],
  [/să dea viata/giu, "să dea viață", "ioan-give-life"],
  [/sa dea viata/giu, "să dea viață", "ioan-give-life-ascii-sa"],
  [/a te tine în viata/giu, "a te ține în viață", "ioan-keep-alive"],
  [/din moarte la viata/giu, "din moarte la viață", "ioan-death-to-life"],
  [/viata nu vine/giu, "viața nu vine", "ioan-life-subject"],
  [/și viata pentru om/giu, "și viață pentru om", "ioan-life-indefinite"],
  [/în viata noastră/giu, "în viața noastră", "ioan-life-possessive"],
  [/despre viata data cu belșug/giu, "despre viața dată cu belșug", "ioan-life-given"],
  [/în viata de zi cu zi/giu, "în viața de zi cu zi", "ioan-life-daily"],
  [/Ți-ai dat viata/gu, "Ți-ai dat viața", "ioan-gave-life"],
  [/ti-ai dat viata/giu, "ți-ai dat viața", "ioan-gave-life-lower"],
  [/viata data acum/giu, "viață dată acum", "ioan-lexical-life"],
  [/viata data/giu, "viața dată", "ioan-life-given-generic"],
  [/viata în Sine/giu, "viață în Sine", "ioan-life-in-self"],
  [/viata neîmprumutată/giu, "viață neîmprumutată", "ioan-life-unborrowed"],
  [/viata deplină/giu, "viață deplină", "ioan-life-full"],
  [/viata pentru noi/giu, "viața pentru noi", "ioan-life-object"],
  [/viata pentru om/giu, "viață pentru om", "ioan-life-indefinite-2"],
  [/viata care curge/giu, "viața care curge", "ioan-life-relative"],
  [/izvor de viata/giu, "izvor de viață", "ioan-source-of-life"],
  [/pentru viata veșnică/giu, "pentru viața veșnică", "ioan-eternal-life-object"],
  [/viața și viata/giu, "viața și viața", "ioan-coordinate-life"],

  [/între credinta și împotrivire/giu, "între credință și împotrivire", "ioan-faith-contrast"],
  [/leagă iarăși credinta de/giu, "leagă iarăși credința de", "ioan-faith-object"],
  [/legătura dintre credinta și/giu, "legătura dintre credință și", "ioan-faith-coordinate"],
  [/credinta sub apăsarea/giu, "credința sub apăsarea", "ioan-faith-subject"],

  [/setea noastră adevarata/giu, "setea noastră adevărată", "ioan-true-thirst"],
  [/adevarata mărime/giu, "adevărata mărime", "ioan-true-greatness"],
]

const ledger = []
function normalize(value, location) {
  if (typeof value !== "string" || !value) return value
  let out = value
  for (const [pattern, replacement, rule] of RULES) {
    out = out.replace(pattern, (match) => {
      if (match !== replacement) ledger.push({ location, rule, before: match, after: replacement })
      return replacement
    })
  }
  return out
}
function normalizeChapter(bookId, chapter) {
  const prefix = `${bookId}.${chapter.number}`
  for (const key of ["title", "summary", "literaryContext", "historicalContext", "prayer"]) {
    if (typeof chapter[key] === "string") chapter[key] = normalize(chapter[key], `${prefix}.${key}`)
  }
  for (let i = 0; i < (chapter.units ?? []).length; i += 1) {
    const unit = chapter.units[i]
    for (const key of ["heading", "teaching", "forYourHeart"]) {
      if (typeof unit[key] === "string") unit[key] = normalize(unit[key], `${prefix}.units[${i}].${key}`)
    }
    for (let wi = 0; wi < (unit.words ?? []).length; wi += 1) {
      if (typeof unit.words[wi].meaning === "string") unit.words[wi].meaning = normalize(unit.words[wi].meaning, `${prefix}.units[${i}].words[${wi}].meaning`)
    }
  }
}

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath)) fail("reviewed recovered corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const manifestBooks = []
let books = 0
let chapters = 0
let units = 0
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()) {
  const full = path.join(dir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  for (const chapter of book.chapters ?? []) {
    normalizeChapter(book.id, chapter)
    chapters += 1
    units += chapter.units?.length ?? 0
  }
  const rendered = stable(book)
  fs.writeFileSync(full, rendered, "utf8")
  books += 1
  manifestBooks.push({ id: book.id, bookId: book.bookId, name: book.name, chapters: book.chapters.length, units: book.chapters.reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0), sha256: sha256(rendered) })
}
if (books !== manifest.counts?.books || chapters !== manifest.counts?.chapters || units !== manifest.counts?.units) fail(`manifest totals changed unexpectedly: ${books}/${chapters}/${units}`)
manifest.books = manifestBooks
manifest.counts = { ...manifest.counts, romanianResidualFixes: ledger.length }
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({ schema: "emanus-nt-romanian-residual-fix-ledger-v1", policy: "exact reviewed grammatical constructions only; no bare ambiguous-token fallback", count: ledger.length, fixes: ledger }), "utf8")
console.log(`NT Romanian residual normalization: ${ledger.length} reviewed replacements.`)
