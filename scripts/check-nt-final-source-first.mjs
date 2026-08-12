#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const EXPECTED = { books: 27, chapters: 260, verseEntries: 7941, criticalReferenceSlots: 16 }

const CANON = [
  ["matei", "MAT", 28], ["marcu", "MRK", 16], ["luca", "LUK", 24], ["ioan", "JHN", 21], ["fapte", "ACT", 28],
  ["romani", "ROM", 16], ["1-corinteni", "1CO", 16], ["2-corinteni", "2CO", 13], ["galateni", "GAL", 6], ["efeseni", "EPH", 6],
  ["filipeni", "PHP", 4], ["coloseni", "COL", 4], ["1-tesaloniceni", "1TH", 5], ["2-tesaloniceni", "2TH", 3], ["1-timotei", "1TI", 6],
  ["2-timotei", "2TI", 4], ["tit", "TIT", 3], ["filimon", "PHM", 1], ["evrei", "HEB", 13], ["iacov", "JAS", 5],
  ["1-petru", "1PE", 5], ["2-petru", "2PE", 3], ["1-ioan", "1JN", 5], ["2-ioan", "2JN", 1], ["3-ioan", "3JN", 1],
  ["iuda", "JUD", 1], ["apocalipsa", "REV", 22],
]

const FORBIDDEN_PUBLIC = [
  /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|Allen Nolan|Nolan|Robert Breaker|Breaker|Mohler)\b/i,
  /\bRCCV\b/i,
  /\b(?:o posibilă lectură|o interpretare posibilă|poate fi interpretat|creștinii interpretează diferit|există mai multe interpretări|nu impunem această interpretare)\b/i,
  /\b(?:overlay|reader|transcrierea brută|această unitate editorială|în această explicație)\b/i,
  /O citire verset cu verset nu urmărește doar acumularea de informații/i,
  /Sensul fiecărei afirmații trebuie păstrat în curgerea capitolului/i,
  /Aplicația rămâne sub caracterul lui Isus/i,
  /Deschiderea pasajului/i,
  /Adevărul pus în lumină/i,
  /Chemarea inimii/i,
]

function fail(message) {
  console.error(`[NT final source-first gate] ${message}`)
  process.exit(1)
}
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function publicStrings(chapter) {
  const values = [chapter.title, chapter.summary, chapter.literaryContext, chapter.historicalContext, chapter.prayer]
  for (const unit of chapter.units ?? []) {
    values.push(unit.heading, unit.teaching, unit.forYourHeart)
    for (const word of unit.words ?? []) values.push(word.meaning)
  }
  return values.filter((value) => typeof value === "string")
}
function inspectBe(bookId, chapter) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`${bookId}.${chapter}: missing BE`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not published/public`)
  if (!Array.isArray(be.verses) || !be.verses.length) fail(`${bookId}.${chapter}: BE verses missing`)
  const main = new Set()
  let previous = 0
  for (const verse of be.verses) {
    if (!Number.isInteger(verse?.number) || verse.number <= previous || typeof verse.text !== "string" || !verse.text.trim()) fail(`${bookId}.${chapter}: invalid BE verse sequence`)
    previous = verse.number
    main.add(verse.number)
  }
  const critical = (be.referenceNotes ?? [])
    .filter((note) => Number.isInteger(note?.number) && !main.has(note.number))
    .map((note) => {
      if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") fail(`${bookId}.${chapter}:${note.number}: unresolved critical slot`)
      return note.number
    })
    .sort((a, b) => a - b)
  const last = Math.max(...main, ...critical)
  const criticalSet = new Set(critical)
  for (let number = 1; number <= last; number += 1) if (!main.has(number) && !criticalSet.has(number)) fail(`${bookId}.${chapter}:${number}: unexplained numbering gap`)
  return { verseEntryCount: be.verses.length, lastVerseNumber: last, criticalReferenceNumbers: critical, criticalSet }
}

if (!fs.existsSync(dir) || !fs.existsSync(manifestPath)) fail("final corpus missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const published = manifest.status === "published" && manifest.publicationReady === true
const prePublication = manifest.status === "in_review" && manifest.publicationReady === false
if (!published && !prePublication) fail(`invalid final corpus publication state: ${manifest.status}/${manifest.publicationReady}`)
const expectedStatus = published ? "published" : "in_review"
if (manifest.genericCompletionAllowed !== false || manifest.legacyBibleTextAllowed !== false) fail("manifest must reject generic completion and legacy Bible text")
for (const key of ["books", "chapters"]) if (manifest.counts?.[key] !== EXPECTED[key]) fail(`manifest ${key} ${manifest.counts?.[key]}/${EXPECTED[key]}`)
if (!Number.isInteger(manifest.counts?.units) || manifest.counts.units < EXPECTED.chapters) fail(`manifest units invalid: ${manifest.counts?.units}`)
if (manifest.counts?.auditedRecoveredBooks !== 15 || manifest.counts?.rebuiltSourceFirstBooks !== 12) fail("source layer counts invalid")

const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`files ${files.length}/${EXPECTED.books}`)
let chapters = 0
let units = 0
let verseEntries = 0
let criticalReferenceSlots = 0
const seenIds = new Set()

for (let bookIndex = 0; bookIndex < CANON.length; bookIndex += 1) {
  const [expectedId, expectedBookId, expectedChapters] = CANON[bookIndex]
  const expectedFile = `${String(bookIndex + 1).padStart(2, "0")}-${expectedId}.json`
  if (files[bookIndex] !== expectedFile) fail(`canonical file order mismatch at ${bookIndex + 1}: ${files[bookIndex]} vs ${expectedFile}`)
  const raw = fs.readFileSync(path.join(dir, expectedFile), "utf8")
  const book = JSON.parse(raw)
  if (seenIds.has(book.id)) fail(`duplicate book ${book.id}`)
  seenIds.add(book.id)
  if (book.schema !== "emanus-nt-final-source-first-v1" || book.id !== expectedId || book.bookId !== expectedBookId || book.order !== 40 + bookIndex) fail(`${expectedFile}: canonical metadata invalid`)
  if (book.status !== expectedStatus || book.publicationReady !== published) fail(`${expectedFile}: publication state invalid`)
  if (!["audited-recovered-poonen", "rebuilt-poonen-source-first"].includes(book.sourceClass)) fail(`${expectedFile}: invalid sourceClass`)
  if (!Array.isArray(book.chapters) || book.chapters.length !== expectedChapters) fail(`${expectedFile}: chapters ${book.chapters?.length ?? 0}/${expectedChapters}`)
  const manifestBook = manifest.books.find((entry) => entry.id === book.id)
  if (!manifestBook || manifestBook.sha256 !== hash(raw)) fail(`${expectedFile}: manifest/digest mismatch`)

  for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex += 1) {
    const chapter = book.chapters[chapterIndex]
    chapters += 1
    if (chapter.number !== chapterIndex + 1 || chapter.status !== expectedStatus) fail(`${book.id} ${chapterIndex + 1}: chapter state/number invalid`)
    if (chapter.finalSourceClass !== book.sourceClass) fail(`${book.id} ${chapter.number}: final source class mismatch`)
    const binding = chapter.emanusTextBinding
    const canonical = inspectBe(book.bookId, chapter.number)
    if (!binding || binding.translation !== "BE" || binding.bookId !== book.bookId || binding.chapter !== chapter.number) fail(`${book.id} ${chapter.number}: BE binding invalid`)
    if (binding.verseEntryCount !== canonical.verseEntryCount || binding.lastVerseNumber !== canonical.lastVerseNumber || JSON.stringify(binding.criticalReferenceNumbers ?? []) !== JSON.stringify(canonical.criticalReferenceNumbers)) fail(`${book.id} ${chapter.number}: BE binding mismatch`)
    verseEntries += canonical.verseEntryCount
    criticalReferenceSlots += canonical.criticalReferenceNumbers.length

    if (!Array.isArray(chapter.units) || !chapter.units.length) fail(`${book.id} ${chapter.number}: units missing`)
    let expectedNext = 1
    for (const unit of chapter.units) {
      units += 1
      if (!Number.isInteger(unit.verseStart) || !Number.isInteger(unit.verseEnd) || unit.verseStart !== expectedNext || unit.verseEnd < unit.verseStart || unit.verseEnd > canonical.lastVerseNumber) fail(`${book.id} ${chapter.number}: invalid/gapped unit ${unit.ref}`)
      const expectedCritical = []
      for (let number = unit.verseStart; number <= unit.verseEnd; number += 1) if (canonical.criticalSet.has(number)) expectedCritical.push(number)
      if (JSON.stringify(unit.criticalReferenceNumbers ?? []) !== JSON.stringify(expectedCritical)) fail(`${book.id} ${chapter.number}: unit critical slots mismatch ${unit.ref}`)
      if (typeof unit.teaching !== "string" || unit.teaching.trim().length < 80) fail(`${book.id} ${chapter.number}: thin teaching ${unit.ref}`)
      if (!Array.isArray(unit.sourceIds) || !unit.sourceIds.length || !String(unit.sourceKind ?? "").startsWith("poonen-source-first")) fail(`${book.id} ${chapter.number}: source provenance missing ${unit.ref}`)
      if (Object.prototype.hasOwnProperty.call(unit, "text")) fail(`${book.id} ${chapter.number}: legacy Bible text present`)
      expectedNext = unit.verseEnd + 1
    }
    if (expectedNext !== canonical.lastVerseNumber + 1) fail(`${book.id} ${chapter.number}: coverage incomplete ${expectedNext - 1}/${canonical.lastVerseNumber}`)

    for (const text of publicStrings(chapter)) for (const pattern of FORBIDDEN_PUBLIC) if (pattern.test(text)) fail(`${book.id} ${chapter.number}: forbidden public pattern ${pattern}`)
  }
}

if (chapters !== EXPECTED.chapters || units !== manifest.counts.units || verseEntries !== EXPECTED.verseEntries || criticalReferenceSlots !== EXPECTED.criticalReferenceSlots) {
  fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${units}/${manifest.counts.units} manifest units, ${verseEntries}/${EXPECTED.verseEntries} BE entries, ${criticalReferenceSlots}/${EXPECTED.criticalReferenceSlots} critical slots`)
}
console.log(`NT final source-first gate OK: ${files.length} books / ${chapters} chapters / ${units} explanation units.`)
console.log(`Biblia Emanus binding OK: ${verseEntries} verse entries / ${criticalReferenceSlots} resolved critical-number slots.`)
console.log(`Publication state: ${expectedStatus}. No generic completion, legacy Bible text, modern-source attribution, or relativizing reader copy detected.`)
