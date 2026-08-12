#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const distModule = path.join(ROOT, "packages", "shared", "dist", "bible", "ntPublicationBible.js")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const bindingPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-canonical-binding.json")
const finalManifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const EXPECTED = { books: 27, chapters: 260, verseEntries: 7941 }

const FORBIDDEN = [
  /\b(?:Zac\s+Poonen|Poonen|CFC|Christian Fellowship|SermonIndex|Allen Nolan|Robert Breaker|Mohler)\b/i,
  /\bRCCV\b/i,
  /\b(?:o posibilă lectură|poate fi interpretat|creștinii interpretează diferit)\b/i,
]

function fail(message) {
  console.error(`[NT runtime gate] ${message}`)
  process.exit(1)
}
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function parseRange(ref, chapterNumber) {
  const match = String(ref).match(/\b(\d+):(\d+)(?:-(\d+))?\s*$/)
  if (!match) fail(`cannot parse ref ${ref}`)
  if (Number(match[1]) !== chapterNumber) fail(`ref chapter mismatch ${ref}`)
  return [Number(match[2]), Number(match[3] ?? match[2])]
}
function canonicalPayload(be) {
  const main = be.verses.map((verse) => ({ number: verse.number, text: verse.text }))
  const mainNumbers = new Set(main.map((verse) => verse.number))
  const critical = (be.referenceNotes ?? [])
    .filter((note) => Number.isInteger(note?.number) && !mainNumbers.has(note.number))
    .map((note) => ({
      number: note.number,
      status: note.status,
      resolutionStatus: note.resolutionStatus,
      traditionalReading: typeof note.traditionalReading === "string" ? note.traditionalReading : undefined,
    }))
    .sort((a, b) => a.number - b.number)
  return { bookId: be.bookId, chapter: be.chapter, verses: main, criticalReferences: critical }
}
function loadBe(bookId, chapter, bound) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`missing ${bookId}.${chapter}.json`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not public/published at data layer`)
  const digest = sha256(JSON.stringify(canonicalPayload(be)))
  if (digest !== bound.canonicalTextSha256) fail(`${bookId}.${chapter}: canonical text hash mismatch`)
  if (be.audit?.textDigest !== bound.sourceAuditTextDigest) fail(`${bookId}.${chapter}: source audit textDigest mismatch`)
  return be
}
function expectedPassage(be, from, to) {
  return be.verses.filter((verse) => verse.number >= from && verse.number <= to).map((verse) => verse.text).join(" ")
}

if (!fs.existsSync(distModule)) fail("shared runtime not built; run materializer and shared build first")
if (!fs.existsSync(bindingPath)) fail("canonical binding missing")
if (!fs.existsSync(finalManifestPath)) fail("final source-first manifest missing")
const binding = JSON.parse(fs.readFileSync(bindingPath, "utf8"))
const finalManifest = JSON.parse(fs.readFileSync(finalManifestPath, "utf8"))
if (!["in_review", "published"].includes(finalManifest.status) || typeof finalManifest.publicationReady !== "boolean") fail("invalid final source-first publication state")
const expectedRuntimeStatus = finalManifest.status === "published" && finalManifest.publicationReady === true ? "published" : "in_review"
const bindingByChapter = new Map((binding.chapters ?? []).map((entry) => [`${entry.bookId}.${entry.chapter}`, entry]))
const runtime = await import(pathToFileURL(distModule).href + `?t=${Date.now()}`)
const books = runtime.NT_EXPLAINED_BOOKS
if (!Array.isArray(books) || books.length !== EXPECTED.books) fail(`books ${books?.length ?? 0}/${EXPECTED.books}`)
if (runtime.NT_EXPLAINED_TRANSLATION !== "Biblia Emanus") fail("runtime translation is not Biblia Emanus")
if (runtime.NT_EXPLAINED_STATUS !== expectedRuntimeStatus) fail(`runtime status ${runtime.NT_EXPLAINED_STATUS} does not match manifest ${expectedRuntimeStatus}`)
if (runtime.NT_EXPLAINED_CANONICAL_VERSION !== binding.canonicalTextVersion) fail("runtime canonical version mismatch")
if (runtime.NT_EXPLAINED_CANONICAL_STATE !== binding.releaseState) fail("runtime canonical state mismatch")
if (runtime.NT_EXPLAINED_CANONICAL_SHA256 !== binding.corpusSha256) fail("runtime canonical corpus hash mismatch")
if (runtime.NT_EXPLAINED_CANONICAL_PUBLICATION_READY !== binding.publicationReady) fail("runtime canonical publication flag mismatch")
if (!Array.isArray(runtime.NT_EXPLAINED_CANONICAL_CHAPTERS) || runtime.NT_EXPLAINED_CANONICAL_CHAPTERS.length !== EXPECTED.chapters) fail("runtime canonical chapter bindings missing")

let chapters = 0
let verseEntries = 0
for (const book of books) {
  if (book.testament !== "nt") fail(`${book.id}: testament != nt`)
  const seenBookChapter = new Set()
  for (const chapter of book.chapters) {
    chapters += 1
    if (chapter.status !== expectedRuntimeStatus) fail(`${book.id} ${chapter.number}: runtime status does not match manifest`)
    if (seenBookChapter.has(chapter.number)) fail(`${book.id}: duplicate chapter ${chapter.number}`)
    seenBookChapter.add(chapter.number)
    const beBookId = {
      matei:"MAT", marcu:"MRK", luca:"LUK", ioan:"JHN", fapte:"ACT", romani:"ROM", "1-corinteni":"1CO", "2-corinteni":"2CO",
      galateni:"GAL", efeseni:"EPH", filipeni:"PHP", coloseni:"COL", "1-tesaloniceni":"1TH", "2-tesaloniceni":"2TH", "1-timotei":"1TI",
      "2-timotei":"2TI", tit:"TIT", filimon:"PHM", evrei:"HEB", iacov:"JAS", "1-petru":"1PE", "2-petru":"2PE", "1-ioan":"1JN",
      "2-ioan":"2JN", "3-ioan":"3JN", iuda:"JUD", apocalipsa:"REV",
    }[book.id]
    if (!beBookId) fail(`${book.id}: no BE mapping`)
    const bound = bindingByChapter.get(`${beBookId}.${chapter.number}`)
    if (!bound) fail(`${beBookId}.${chapter.number}: canonical binding entry missing`)
    const be = loadBe(beBookId, chapter.number, bound)
    verseEntries += be.verses.length

    let expectedNext = 1
    for (const unit of chapter.units) {
      const [from, to] = parseRange(unit.ref, chapter.number)
      if (from !== expectedNext || to < from) fail(`${book.id} ${chapter.number}: runtime unit coverage gap at ${expectedNext}`)
      expectedNext = to + 1
      const expected = expectedPassage(be, from, to)
      if (unit.text !== expected) fail(`${book.id} ${chapter.number} ${unit.ref}: runtime Bible text diverges from bound BE`)
      if (typeof unit.teaching !== "string" || unit.teaching.trim().length < 80) fail(`${book.id} ${chapter.number} ${unit.ref}: thin explanation`)
      const publicCopy = [unit.heading, unit.teaching, unit.forYourHeart ?? ""].join("\n")
      for (const pattern of FORBIDDEN) if (pattern.test(publicCopy)) fail(`${book.id} ${chapter.number}: forbidden public runtime copy ${pattern}`)
    }
    const maxNumber = Math.max(...be.verses.map((verse) => verse.number), ...(be.referenceNotes ?? []).filter((note) => Number.isInteger(note?.number) && note.status === "not-in-critical-main-text" && note.resolutionStatus === "resolved").map((note) => note.number))
    if (expectedNext !== maxNumber + 1) fail(`${book.id} ${chapter.number}: runtime coverage ${expectedNext - 1}/${maxNumber}`)
  }
}
if (chapters !== EXPECTED.chapters || verseEntries !== EXPECTED.verseEntries) fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${verseEntries}/${EXPECTED.verseEntries} BE entries`)
console.log(`NT publication runtime gate OK: ${books.length} books / ${chapters} chapters / ${verseEntries} bound Biblia Emanus verse entries.`)
console.log(`Canonical text: ${binding.canonicalTextVersion} / ${binding.releaseState} / sha256:${binding.corpusSha256}.`)
console.log(`Runtime publication status: ${expectedRuntimeStatus}.`)
