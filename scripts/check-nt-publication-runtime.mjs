#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const distModule = path.join(ROOT, "packages", "shared", "dist", "bible", "ntPublicationBible.js")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
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
function parseRange(ref, chapterNumber) {
  const match = String(ref).match(/\b(\d+):(\d+)(?:-(\d+))?\s*$/)
  if (!match) fail(`cannot parse ref ${ref}`)
  if (Number(match[1]) !== chapterNumber) fail(`ref chapter mismatch ${ref}`)
  return [Number(match[2]), Number(match[3] ?? match[2])]
}
function loadBe(bookId, chapter) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`missing ${bookId}.${chapter}.json`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not published`)
  return be
}
function expectedPassage(be, from, to) {
  return be.verses.filter((verse) => verse.number >= from && verse.number <= to).map((verse) => verse.text).join(" ")
}

if (!fs.existsSync(distModule)) fail("shared runtime not built; run materializer and shared build first")
const runtime = await import(pathToFileURL(distModule).href + `?t=${Date.now()}`)
const books = runtime.NT_EXPLAINED_BOOKS
if (!Array.isArray(books) || books.length !== EXPECTED.books) fail(`books ${books?.length ?? 0}/${EXPECTED.books}`)
if (runtime.NT_EXPLAINED_TRANSLATION !== "Biblia Emanus") fail("runtime translation is not Biblia Emanus")
if (runtime.NT_EXPLAINED_STATUS !== "in_review") fail("runtime must remain in_review until final release review")

let chapters = 0
let verseEntries = 0
for (const book of books) {
  if (book.testament !== "nt") fail(`${book.id}: testament != nt`)
  const seenBookChapter = new Set()
  for (const chapter of book.chapters) {
    chapters += 1
    if (chapter.status !== "in_review") fail(`${book.id} ${chapter.number}: runtime prematurely published`)
    if (seenBookChapter.has(chapter.number)) fail(`${book.id}: duplicate chapter ${chapter.number}`)
    seenBookChapter.add(chapter.number)
    const beBookId = {
      matei:"MAT", marcu:"MRK", luca:"LUK", ioan:"JHN", fapte:"ACT", romani:"ROM", "1-corinteni":"1CO", "2-corinteni":"2CO",
      galateni:"GAL", efeseni:"EPH", filipeni:"PHP", coloseni:"COL", "1-tesaloniceni":"1TH", "2-tesaloniceni":"2TH", "1-timotei":"1TI",
      "2-timotei":"2TI", tit:"TIT", filimon:"PHM", evrei:"HEB", iacov:"JAS", "1-petru":"1PE", "2-petru":"2PE", "1-ioan":"1JN",
      "2-ioan":"2JN", "3-ioan":"3JN", iuda:"JUD", apocalipsa:"REV",
    }[book.id]
    if (!beBookId) fail(`${book.id}: no BE mapping`)
    const be = loadBe(beBookId, chapter.number)
    verseEntries += be.verses.length

    let expectedNext = 1
    for (const unit of chapter.units) {
      const [from, to] = parseRange(unit.ref, chapter.number)
      if (from !== expectedNext || to < from) fail(`${book.id} ${chapter.number}: runtime unit coverage gap at ${expectedNext}`)
      expectedNext = to + 1
      const expected = expectedPassage(be, from, to)
      if (unit.text !== expected) fail(`${book.id} ${chapter.number} ${unit.ref}: runtime Bible text diverges from BE`)
      if (typeof unit.teaching !== "string" || unit.teaching.trim().length < 80) fail(`${book.id} ${chapter.number} ${unit.ref}: thin explanation`)
      const publicCopy = [unit.heading, unit.teaching, unit.forYourHeart ?? ""].join("\n")
      for (const pattern of FORBIDDEN) if (pattern.test(publicCopy)) fail(`${book.id} ${chapter.number}: forbidden public runtime copy ${pattern}`)
    }
    const maxNumber = Math.max(...be.verses.map((verse) => verse.number), ...(be.referenceNotes ?? []).filter((note) => Number.isInteger(note?.number) && note.status === "not-in-critical-main-text" && note.resolutionStatus === "resolved").map((note) => note.number))
    if (expectedNext !== maxNumber + 1) fail(`${book.id} ${chapter.number}: runtime coverage ${expectedNext - 1}/${maxNumber}`)
  }
}
if (chapters !== EXPECTED.chapters || verseEntries !== EXPECTED.verseEntries) fail(`totals ${chapters}/${EXPECTED.chapters} chapters, ${verseEntries}/${EXPECTED.verseEntries} BE entries`)
console.log(`NT publication runtime gate OK: ${books.length} books / ${chapters} chapters / ${verseEntries} Biblia Emanus verse entries.`)
console.log("Every runtime Bible passage matches the published BE text exactly; explanations remain in_review pending final release review.")
