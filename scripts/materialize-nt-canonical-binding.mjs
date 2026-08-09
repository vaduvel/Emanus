#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const releasePath = path.join(beDir, "nt-canonical-release.json")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-canonical-binding.json")

const CANON = [
  ["MAT", 28], ["MRK", 16], ["LUK", 24], ["JHN", 21], ["ACT", 28], ["ROM", 16], ["1CO", 16], ["2CO", 13],
  ["GAL", 6], ["EPH", 6], ["PHP", 4], ["COL", 4], ["1TH", 5], ["2TH", 3], ["1TI", 6], ["2TI", 4],
  ["TIT", 3], ["PHM", 1], ["HEB", 13], ["JAS", 5], ["1PE", 5], ["2PE", 3], ["1JN", 5], ["2JN", 1],
  ["3JN", 1], ["JUD", 1], ["REV", 22],
]

function fail(message) {
  console.error(`[NT canonical binding] ${message}`)
  process.exit(1)
}
function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex")
}
function stable(value) {
  return JSON.stringify(value, null, 2) + "\n"
}
function canonicalPayload(be) {
  const main = be.verses.map((verse) => ({ number: verse.number, text: verse.text }))
  const critical = (be.referenceNotes ?? [])
    .filter((note) => Number.isInteger(note?.number) && !main.some((verse) => verse.number === note.number))
    .map((note) => ({
      number: note.number,
      status: note.status,
      resolutionStatus: note.resolutionStatus,
      traditionalReading: typeof note.traditionalReading === "string" ? note.traditionalReading : undefined,
    }))
    .sort((a, b) => a.number - b.number)
  return { bookId: be.bookId, chapter: be.chapter, verses: main, criticalReferences: critical }
}

if (!fs.existsSync(releasePath)) fail("missing docs/data/biblia-emanus/nt-canonical-release.json")
const release = JSON.parse(fs.readFileSync(releasePath, "utf8"))
if (release.schema !== "emanus-nt-canonical-release-v1") fail("invalid release marker schema")
if (!release.canonicalTextVersion || !["provisional", "final"].includes(release.releaseState)) fail("invalid canonical release marker")
if (release.releaseState === "final" && release.publicationReady !== true) fail("final canonical text must explicitly set publicationReady=true")
if (release.releaseState !== "final" && release.publicationReady !== false) fail("provisional canonical text must keep publicationReady=false")

const chapters = []
let totalVerseEntries = 0
let totalChapters = 0
for (const [bookId, chapterCount] of CANON) {
  for (let chapter = 1; chapter <= chapterCount; chapter += 1) {
    const file = path.join(beDir, `${bookId}.${chapter}.json`)
    if (!fs.existsSync(file)) fail(`missing ${bookId}.${chapter}.json`)
    const be = JSON.parse(fs.readFileSync(file, "utf8"))
    if (be.translation !== "BE" || be.bookId !== bookId || be.chapter !== chapter) fail(`${bookId}.${chapter}: canonical metadata mismatch`)
    if (be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE chapter not public/published at data layer`)
    if (!Array.isArray(be.verses) || !be.verses.length) fail(`${bookId}.${chapter}: verses missing`)
    if (typeof be.audit?.textDigest !== "string" || !be.audit.textDigest.startsWith("sha256:")) fail(`${bookId}.${chapter}: audit.textDigest missing`)

    let previous = 0
    for (const verse of be.verses) {
      if (!Number.isInteger(verse?.number) || verse.number <= previous || typeof verse.text !== "string" || !verse.text.trim()) fail(`${bookId}.${chapter}: invalid verse sequence`)
      previous = verse.number
    }
    const mainNumbers = new Set(be.verses.map((verse) => verse.number))
    const criticalReferenceNumbers = (be.referenceNotes ?? [])
      .filter((note) => Number.isInteger(note?.number) && !mainNumbers.has(note.number))
      .map((note) => {
        if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") fail(`${bookId}.${chapter}:${note.number}: unresolved critical reference`)
        return note.number
      })
      .sort((a, b) => a - b)
    const lastVerseNumber = Math.max(...mainNumbers, ...criticalReferenceNumbers)
    for (let number = 1; number <= lastVerseNumber; number += 1) {
      if (!mainNumbers.has(number) && !criticalReferenceNumbers.includes(number)) fail(`${bookId}.${chapter}:${number}: unexplained numbering gap`)
    }

    const canonicalTextSha256 = sha256(JSON.stringify(canonicalPayload(be)))
    chapters.push({
      bookId,
      chapter,
      verseEntryCount: be.verses.length,
      lastVerseNumber,
      criticalReferenceNumbers,
      canonicalTextSha256,
      sourceAuditTextDigest: be.audit.textDigest,
    })
    totalVerseEntries += be.verses.length
    totalChapters += 1
  }
}

if (totalChapters !== 260) fail(`chapters ${totalChapters}/260`)
const corpusSha256 = sha256(chapters.map((entry) => `${entry.bookId}.${entry.chapter}:${entry.canonicalTextSha256}`).join("\n"))
const output = {
  schema: "emanus-nt-canonical-binding-v1",
  canonicalTextVersion: release.canonicalTextVersion,
  releaseState: release.releaseState,
  publicationReady: release.publicationReady,
  counts: { books: CANON.length, chapters: totalChapters, verseEntries: totalVerseEntries },
  corpusSha256,
  chapters,
}
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, stable(output), "utf8")
console.log(`NT canonical binding: ${CANON.length} books / ${totalChapters} chapters / ${totalVerseEntries} verse entries / ${release.releaseState}.`)
console.log(`NT canonical corpus sha256: ${corpusSha256}`)
