#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const originalDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered")
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined-manifest.json")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-audited-recovered-refined-ledger.json")
const EXPECTED = { books: 15, chapters: 191, units: 762 }

function fail(message) {
  console.error(`[NT refined recovery gate] ${message}`)
  process.exit(1)
}
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function norm(value) { return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ") }

const FORBIDDEN = [
  /\b112\b/, /\bpolitie\b|\bpolitiei\b/,
  /\bajutor (?:sigur|profesionist|specializat|competent|imediat)\b/,
  /\bcauta (?:ajutor|sprijin|protectie|siguranta)\b/,
  /\blimite (?:sanatoase|personale)\b/, /\bspatiu sigur\b|\bmediu sigur\b/,
  /\b(?:control|controleze|controlul).{0,90}\b(?:constiint|bani|finante|relatii|accesul|viata altuia)\b/,
  /\b(?:presiune|manipulare|exploatare) financiara\b/,
  /\b(?:tratament|ingrijire|evaluare|ajutor|sprijin).{0,50}\b(?:medical|psihologic|psihiatric|clinic|neurologic)\b/,
  /\b(?:terapeut|psiholog|psihiatru|specialist medical|servicii medicale)\b/,
  /\bconsimtamant\b/, /\batingere sexuala\b|\bcontact sexual\b/,
  /\bantisemitism\b/, /\b(?:rasism|superioritate etnica|dispret etnic)\b/,
  /\btulburari alimentare\b|\bfoamete fortata\b/,
]

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath) || !fs.existsSync(ledgerPath)) fail("refined outputs missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
if (manifest.status !== "in_review" || manifest.publicationReady !== false) fail("refined corpus must remain in_review")
for (const [key, value] of Object.entries(EXPECTED)) if (manifest.counts?.[key] !== value) fail(`${key} ${manifest.counts?.[key]}/${value}`)
if (!Array.isArray(ledger.changes) || manifest.counts.removals !== ledger.changes.length) fail("refinement ledger count mismatch")

const originalById = new Map()
for (const file of fs.readdirSync(originalDir).filter((name) => name.endsWith(".json"))) {
  const book = JSON.parse(fs.readFileSync(path.join(originalDir, file), "utf8"))
  originalById.set(book.id, book)
}
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`files ${files.length}/${EXPECTED.books}`)
let chapters = 0
let units = 0
let beforeChars = 0
let afterChars = 0
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8")
  const book = JSON.parse(raw)
  const original = originalById.get(book.id)
  if (!original) fail(`${book.id}: original audited book missing`)
  const manifestBook = manifest.books.find((entry) => entry.id === book.id)
  if (!manifestBook || manifestBook.sha256 !== hash(raw)) fail(`${book.id}: digest mismatch`)
  if (book.schema !== "emanus-nt-audited-recovered-refined-v1") fail(`${book.id}: schema invalid`)
  if (book.chapters.length !== original.chapters.length) fail(`${book.id}: chapter count changed`)
  for (let ci = 0; ci < book.chapters.length; ci += 1) {
    chapters += 1
    const chapter = book.chapters[ci]
    const originalChapter = original.chapters[ci]
    if (chapter.reviewState !== "source-first-refined-recovery" || chapter.provenance?.subtleEditorialRefined !== true) fail(`${book.id} ${chapter.number}: refined provenance missing`)
    if (chapter.emanusTextBinding?.bookId !== originalChapter.emanusTextBinding?.bookId || chapter.emanusTextBinding?.chapter !== originalChapter.emanusTextBinding?.chapter) fail(`${book.id} ${chapter.number}: BE binding changed`)
    if (chapter.units.length !== originalChapter.units.length) fail(`${book.id} ${chapter.number}: unit count changed`)
    for (let ui = 0; ui < chapter.units.length; ui += 1) {
      units += 1
      const unit = chapter.units[ui]
      const before = originalChapter.units[ui]
      if (unit.ref !== before.ref || unit.verseStart !== before.verseStart || unit.verseEnd !== before.verseEnd || JSON.stringify(unit.criticalReferenceNumbers ?? []) !== JSON.stringify(before.criticalReferenceNumbers ?? [])) fail(`${book.id} ${chapter.number}: unit structure changed ${unit.ref}`)
      if (typeof unit.teaching !== "string" || unit.teaching.length < 80) fail(`${book.id} ${chapter.number}: teaching over-thinned ${unit.ref}`)
      beforeChars += before.teaching.length
      afterChars += unit.teaching.length
      const ratio = unit.teaching.length / before.teaching.length
      if (before.teaching.length >= 180 && ratio < 0.35) fail(`${book.id} ${chapter.number}: excessive second-pass removal ${unit.ref} ${(ratio * 100).toFixed(1)}%`)
      for (const text of [unit.heading, unit.teaching, unit.forYourHeart]) {
        const n = norm(text)
        for (const pattern of FORBIDDEN) if (pattern.test(n)) fail(`${book.id} ${chapter.number}: high-confidence modern editorial signature remains ${pattern}`)
      }
    }
  }
}
if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${chapters}/${EXPECTED.chapters}, ${units}/${EXPECTED.units}`)
const retention = afterChars / beforeChars
if (retention < 0.85) fail(`second-pass global retention too low ${(retention * 100).toFixed(2)}%`)
console.log(`NT refined recovery gate OK: ${files.length} books / ${chapters} chapters / ${units} units.`)
console.log(`Second-pass teaching retention: ${(retention * 100).toFixed(2)}%; explicit additional removals: ${ledger.changes.length}.`)
