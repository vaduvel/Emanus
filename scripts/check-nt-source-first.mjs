#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first-manifest.json")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry", "source-first-12.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const EXPECTED = { books: 12, chapters: 69, units: 69 }

const forbiddenReaderPatterns = [
  /\bPoonen\b/i,
  /\bCFC\b/i,
  /SermonIndex/i,
  /o posibilă lectură/i,
  /poate fi interpretat/i,
  /creștinii interpretează diferit/i,
  /nu obligă o victimă/i,
  /protecția, raportarea/i,
  /îngrijirea medicală/i,
  /teorii conspiraționiste/i,
  /în centrul Evangheliei și în lumina caracterului/i,
  /ce trebuie să crezi, să părăsești sau să practici/i,
  /Deschiderea pasajului/i,
  /Adevărul pus în lumină/i,
  /Chemarea inimii/i,
  /Viața comunității/i,
]
const genericMarkers = [
  "O citire verset cu verset nu urmărește doar acumularea de informații",
  "Sensul fiecărei afirmații trebuie păstrat în curgerea capitolului",
  "Aplicația rămâne sub caracterul lui Isus",
]

function fail(message) {
  console.error(`[NT source-first gate] ${message}`)
  process.exit(1)
}
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function inspectBe(bookId, number) {
  const file = path.join(beDir, `${bookId}.${number}.json`)
  if (!fs.existsSync(file)) fail(`${bookId}.${number}: BE missing`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${number}: BE not published/public`)
  const nums = be.verses.map((verse) => verse.number)
  const main = new Set(nums)
  const critical = (be.referenceNotes ?? [])
    .filter((note) => Number.isInteger(note?.number) && !main.has(note.number))
    .map((note) => {
      if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") fail(`${bookId}.${number}:${note.number}: unresolved critical slot`)
      return note.number
    })
    .sort((a, b) => a - b)
  return { verseEntryCount: be.verses.length, lastVerseNumber: Math.max(...nums, ...critical), criticalReferenceNumbers: critical }
}

if (!fs.existsSync(manifestPath)) fail("missing source-first manifest")
if (!fs.existsSync(registryPath)) fail("missing source registry")
if (!fs.existsSync(dir)) fail("missing source-first directory")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const sourceIds = new Set(registry.sources.map((source) => source.id))
if (manifest.publicationReady !== false || manifest.status !== "in_review" || manifest.genericCompletionAllowed !== false) fail("manifest publication/generic policy invalid")
for (const [key, value] of Object.entries(EXPECTED)) if (manifest.counts?.[key] !== value) fail(`manifest ${key} ${manifest.counts?.[key]}/${value}`)

const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`files ${files.length}/${EXPECTED.books}`)
let chapters = 0
let units = 0
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8")
  const book = JSON.parse(raw)
  const manifestBook = manifest.books.find((entry) => entry.id === book.id)
  if (!manifestBook) fail(`${file}: not in manifest`)
  if (manifestBook.sha256 !== hash(raw)) fail(`${file}: digest mismatch`)
  if (book.schema !== "emanus-nt-source-first-v1") fail(`${file}: schema invalid`)
  if (book.status !== "in_review" || book.publicationReady !== false) fail(`${file}: must remain in_review/non-public`)
  if (book.replacementFor !== "quarantined-generic-completion") fail(`${file}: replacement marker missing`)
  if (!Array.isArray(book.chapters) || book.chapters.length !== manifestBook.chapters) fail(`${file}: chapter count mismatch`)

  for (const chapter of book.chapters) {
    chapters += 1
    if (chapter.status !== "in_review" || chapter.reviewState !== "source-first-rebuilt") fail(`${file} ${chapter.number}: review state invalid`)
    if (chapter.provenance?.legacyGenericContentUsed !== false) fail(`${file} ${chapter.number}: generic content not explicitly rejected`)
    if (chapter.provenance?.sourcePolicy !== "poonen-source-first") fail(`${file} ${chapter.number}: source policy invalid`)
    if (!Array.isArray(chapter.provenance?.sourceIds) || !chapter.provenance.sourceIds.length) fail(`${file} ${chapter.number}: no source ids`)
    for (const sourceId of chapter.provenance.sourceIds) if (!sourceIds.has(sourceId)) fail(`${file} ${chapter.number}: unknown source ${sourceId}`)

    const canonical = inspectBe(book.bookId, chapter.number)
    const binding = chapter.emanusTextBinding
    if (!binding || binding.translation !== "BE" || binding.bookId !== book.bookId || binding.chapter !== chapter.number) fail(`${file} ${chapter.number}: BE binding invalid`)
    if (binding.verseEntryCount !== canonical.verseEntryCount || binding.lastVerseNumber !== canonical.lastVerseNumber) fail(`${file} ${chapter.number}: BE counts mismatch`)
    if (JSON.stringify(binding.criticalReferenceNumbers ?? []) !== JSON.stringify(canonical.criticalReferenceNumbers)) fail(`${file} ${chapter.number}: critical slots mismatch`)

    if (!Array.isArray(chapter.units) || chapter.units.length !== 1) fail(`${file} ${chapter.number}: expected one chapter-wide source-first unit`)
    const unit = chapter.units[0]
    units += 1
    if (unit.verseStart !== 1 || unit.verseEnd !== canonical.lastVerseNumber) fail(`${file} ${chapter.number}: unit does not cover full chapter`)
    if (unit.sourceKind !== "poonen-source-first") fail(`${file} ${chapter.number}: sourceKind invalid`)
    if (JSON.stringify(unit.sourceIds) !== JSON.stringify(chapter.provenance.sourceIds)) fail(`${file} ${chapter.number}: source ids diverge`)
    if (typeof unit.heading !== "string" || !unit.heading.trim() || typeof unit.teaching !== "string" || unit.teaching.trim().length < 220) fail(`${file} ${chapter.number}: explanation too thin`)
    if (typeof chapter.summary !== "string" || chapter.summary.trim().length < 80) fail(`${file} ${chapter.number}: summary too thin`)

    const publicCopy = [chapter.title, chapter.summary, unit.heading, unit.teaching].join("\n")
    for (const pattern of forbiddenReaderPatterns) if (pattern.test(publicCopy)) fail(`${file} ${chapter.number}: forbidden/diluting reader pattern ${pattern}`)
    for (const marker of genericMarkers) if (publicCopy.includes(marker)) fail(`${file} ${chapter.number}: legacy generic marker remains`)
    if (Object.prototype.hasOwnProperty.call(unit, "text")) fail(`${file} ${chapter.number}: legacy Bible text copied into explanation unit`)
  }
}
if (chapters !== EXPECTED.chapters || units !== EXPECTED.units) fail(`totals ${chapters} chapters / ${units} units`)
console.log(`NT source-first gate OK: ${files.length} rebuilt books / ${chapters} chapters / ${units} source-first units.`)
console.log("Legacy generic completion is absent from the rebuilt corpus. Publication remains blocked pending audit of all 27 NT books.")
