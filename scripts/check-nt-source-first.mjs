#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const dir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-first-manifest.json")
const registryPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-registry", "source-first-12.json")
const evidencePath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-source-evidence.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const EXPECTED = { books: 12, chapters: 69 }

const forbiddenReaderPatterns = [
  /\bPoonen\b/i, /\bCFC\b/i, /SermonIndex/i, /o posibilă lectură/i, /poate fi interpretat/i, /creștinii interpretează diferit/i,
  /nu obligă o victimă/i, /protecția, raportarea/i, /îngrijirea medicală/i, /teorii conspiraționiste/i,
  /în centrul Evangheliei și în lumina caracterului/i, /ce trebuie să crezi, să părăsești sau să practici/i,
  /Deschiderea pasajului/i, /Adevărul pus în lumină/i, /Chemarea inimii/i, /Viața comunității/i,
]
const genericMarkers = [
  "O citire verset cu verset nu urmărește doar acumularea de informații",
  "Sensul fiecărei afirmații trebuie păstrat în curgerea capitolului",
  "Aplicația rămâne sub caracterul lui Isus",
]

function fail(message) { console.error(`[NT source-first gate] ${message}`); process.exit(1) }
function hash(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function inspectBe(bookId, number) {
  const file = path.join(beDir, `${bookId}.${number}.json`)
  if (!fs.existsSync(file)) fail(`${bookId}.${number}: BE missing`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${number}: BE not published/public at data layer`)
  const nums = be.verses.map((verse) => verse.number)
  const main = new Set(nums)
  const critical = (be.referenceNotes ?? [])
    .filter((note) => Number.isInteger(note?.number) && !main.has(note.number))
    .map((note) => {
      if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") fail(`${bookId}.${number}:${note.number}: unresolved critical slot`)
      return note.number
    }).sort((a, b) => a - b)
  return { verseEntryCount: be.verses.length, lastVerseNumber: Math.max(...nums, ...critical), criticalReferenceNumbers: critical, criticalSet: new Set(critical) }
}

for (const required of [manifestPath, registryPath, evidencePath]) if (!fs.existsSync(required)) fail(`missing ${path.basename(required)}`)
if (!fs.existsSync(dir)) fail("missing source-first directory")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"))
const evidenceRegistry = JSON.parse(fs.readFileSync(evidencePath, "utf8"))
const sourceIds = new Set(registry.sources.map((source) => source.id))
const evidenceById = new Map((evidenceRegistry.records ?? []).map((record) => [record.id, record]))
if (manifest.schema !== "emanus-nt-source-first-manifest-v2") fail(`manifest schema ${manifest.schema}`)
if (manifest.publicationReady !== false || manifest.status !== "in_review" || manifest.genericCompletionAllowed !== false) fail("manifest publication/generic policy invalid")
if (manifest.counts?.books !== EXPECTED.books || manifest.counts?.chapters !== EXPECTED.chapters) fail("manifest book/chapter totals invalid")
if (!Number.isInteger(manifest.counts?.units) || manifest.counts.units < EXPECTED.chapters) fail("manifest unit total invalid")
if (manifest.counts.passageRebuiltChapters + manifest.counts.chapterSummaryOnlyChapters !== EXPECTED.chapters) fail("manifest rebuild-class totals invalid")

const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`files ${files.length}/${EXPECTED.books}`)
let chapters = 0
let units = 0
let passageRebuiltChapters = 0
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8")
  const book = JSON.parse(raw)
  const manifestBook = manifest.books.find((entry) => entry.id === book.id)
  if (!manifestBook || manifestBook.sha256 !== hash(raw)) fail(`${file}: manifest/digest mismatch`)
  if (book.schema !== "emanus-nt-source-first-v2") fail(`${file}: schema invalid`)
  if (book.status !== "in_review" || book.publicationReady !== false || book.replacementFor !== "quarantined-generic-completion") fail(`${file}: publication/replacement state invalid`)

  for (const chapter of book.chapters ?? []) {
    chapters += 1
    if (chapter.status !== "in_review" || !["source-first-rebuilt", "source-first-passage-rebuilt"].includes(chapter.reviewState)) fail(`${file} ${chapter.number}: review state invalid`)
    if (chapter.provenance?.legacyGenericContentUsed !== false || chapter.provenance?.sourcePolicy !== "poonen-source-first") fail(`${file} ${chapter.number}: provenance invalid`)
    for (const sourceId of chapter.provenance?.sourceIds ?? []) if (!sourceIds.has(sourceId)) fail(`${file} ${chapter.number}: unknown source ${sourceId}`)
    const canonical = inspectBe(book.bookId, chapter.number)
    const binding = chapter.emanusTextBinding
    if (!binding || binding.translation !== "BE" || binding.bookId !== book.bookId || binding.chapter !== chapter.number) fail(`${file} ${chapter.number}: BE binding invalid`)
    if (binding.verseEntryCount !== canonical.verseEntryCount || binding.lastVerseNumber !== canonical.lastVerseNumber || JSON.stringify(binding.criticalReferenceNumbers ?? []) !== JSON.stringify(canonical.criticalReferenceNumbers)) fail(`${file} ${chapter.number}: BE binding mismatch`)

    if (!Array.isArray(chapter.units) || !chapter.units.length) fail(`${file} ${chapter.number}: no units`)
    let expectedNext = 1
    for (const unit of chapter.units) {
      units += 1
      if (!Number.isInteger(unit.verseStart) || !Number.isInteger(unit.verseEnd) || unit.verseStart !== expectedNext || unit.verseEnd < unit.verseStart || unit.verseEnd > canonical.lastVerseNumber) fail(`${file} ${chapter.number}: invalid/gapped unit ${unit.ref}`)
      expectedNext = unit.verseEnd + 1
      if (unit.sourceKind !== "poonen-source-first") fail(`${file} ${chapter.number}: sourceKind invalid`)
      if (!Array.isArray(unit.sourceIds) || !unit.sourceIds.length) fail(`${file} ${chapter.number}: unit sourceIds missing`)
      for (const sourceId of unit.sourceIds) if (!sourceIds.has(sourceId)) fail(`${file} ${chapter.number}: unknown unit source ${sourceId}`)
      if (typeof unit.heading !== "string" || !unit.heading.trim() || typeof unit.teaching !== "string" || unit.teaching.trim().length < 220) fail(`${file} ${chapter.number}: explanation too thin ${unit.ref}`)
      if (Object.prototype.hasOwnProperty.call(unit, "text")) fail(`${file} ${chapter.number}: legacy Bible text copied into explanation unit`)

      if (chapter.reviewState === "source-first-passage-rebuilt") {
        if (!Array.isArray(unit.sourceAnchors) || !unit.sourceAnchors.length) fail(`${file} ${chapter.number}: passage unit missing sourceAnchors`)
        for (const anchor of unit.sourceAnchors) {
          const evidence = evidenceById.get(anchor.evidenceId)
          if (!evidence) fail(`${file} ${chapter.number}: unknown evidence ${anchor.evidenceId}`)
          if (anchor.sourceId !== evidence.sourceId || anchor.locator !== evidence.locator || anchor.evidenceSha256 !== evidence.evidenceSha256 || anchor.verificationLevel !== evidence.verificationLevel) fail(`${file} ${chapter.number}: source anchor/evidence mismatch ${anchor.evidenceId}`)
        }
      }
      const publicCopy = [unit.heading, unit.teaching].join("\n")
      for (const pattern of forbiddenReaderPatterns) if (pattern.test(publicCopy)) fail(`${file} ${chapter.number}: forbidden/diluting reader pattern ${pattern}`)
      for (const marker of genericMarkers) if (publicCopy.includes(marker)) fail(`${file} ${chapter.number}: legacy generic marker remains`)
    }
    if (expectedNext !== canonical.lastVerseNumber + 1) fail(`${file} ${chapter.number}: coverage ${expectedNext - 1}/${canonical.lastVerseNumber}`)
    if (typeof chapter.summary !== "string" || chapter.summary.trim().length < 80) fail(`${file} ${chapter.number}: summary too thin`)
    if (chapter.reviewState === "source-first-passage-rebuilt") passageRebuiltChapters += 1
  }
}
if (chapters !== EXPECTED.chapters || units !== manifest.counts.units || passageRebuiltChapters !== manifest.counts.passageRebuiltChapters) fail(`totals mismatch: ${chapters} chapters / ${units} units / ${passageRebuiltChapters} passage rebuilt`)
console.log(`NT source-first gate OK: ${files.length} rebuilt books / ${chapters} chapters / ${units} source-first units.`)
console.log(`Passage rebuilt chapters: ${passageRebuiltChapters}; chapter-summary only: ${manifest.counts.chapterSummaryOnlyChapters}.`)
