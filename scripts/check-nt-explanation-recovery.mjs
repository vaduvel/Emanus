#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovery-manifest.json")
const recoveredDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-recovered")
const emanusDir = path.join(ROOT, "docs", "data", "biblia-emanus")

const EXPECTED = {
  books: 27,
  chapters: 260,
  verses: 7941,
  recoverableBooks: 15,
  recoverableChapters: 191,
  quarantinedBooks: 12,
  quarantinedChapters: 69,
}

function fail(message) {
  console.error(`[NT recovery gate] ${message}`)
  process.exit(1)
}
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }

function inspectBeChapter(be, label) {
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${label}: sursa BE nu este publicată`)
  if (!Array.isArray(be.verses) || !be.verses.length) fail(`${label}: verses BE lipsă`)

  const mainNumbers = new Set()
  let previous = 0
  for (const verse of be.verses) {
    if (!Number.isInteger(verse?.number) || verse.number <= previous) fail(`${label}: numerotare BE invalidă`)
    if (typeof verse.text !== "string" || !verse.text.trim()) fail(`${label}:${verse.number}: text BE gol`)
    previous = verse.number
    mainNumbers.add(verse.number)
  }

  const critical = []
  for (const note of Array.isArray(be.referenceNotes) ? be.referenceNotes : []) {
    if (!Number.isInteger(note?.number) || note.number < 1 || mainNumbers.has(note.number)) continue
    if (note.status !== "not-in-critical-main-text" || note.resolutionStatus !== "resolved") {
      fail(`${label}:${note.number}: slot absent fără rezoluție critică`)
    }
    critical.push(note.number)
  }
  critical.sort((a, b) => a - b)
  const criticalSet = new Set(critical)
  const lastVerseNumber = Math.max(...mainNumbers, ...critical)
  for (let number = 1; number <= lastVerseNumber; number += 1) {
    if (!mainNumbers.has(number) && !criticalSet.has(number)) fail(`${label}:${number}: gol numeric fără referenceNote critic`)
  }
  return { verseEntryCount: be.verses.length, lastVerseNumber, criticalReferenceNumbers: critical, criticalSet }
}

if (!fs.existsSync(manifestPath)) fail("lipsește nt-recovery-manifest.json")
if (!fs.existsSync(recoveredDir)) fail("lipsește directorul nt-recovered")

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
if (manifest.publicationBlocked !== true) fail("publicationBlocked trebuie să rămână true în faza de recuperare")
if (manifest.status !== "in_review") fail("manifestul de recuperare trebuie să rămână in_review")
for (const [key, value] of Object.entries(EXPECTED)) {
  if (manifest.counts?.[key] !== value) fail(`counts.${key} = ${manifest.counts?.[key]}; așteptat ${value}`)
}

const files = fs.readdirSync(recoveredDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`fișiere recuperate ${files.length}/${EXPECTED.books}`)

let chapters = 0
let verses = 0
let recoverableBooks = 0
let recoverableChapters = 0
let quarantinedBooks = 0
let quarantinedChapters = 0
let criticalReferenceSlots = 0

for (const fileName of files) {
  const fullPath = path.join(recoveredDir, fileName)
  const raw = fs.readFileSync(fullPath, "utf8")
  const data = JSON.parse(raw)
  const manifestBook = manifest.books.find((book) => book.id === data.id)
  if (!manifestBook) fail(`${fileName}: lipsește din manifest`)
  if (manifestBook.sha256 !== sha256(raw)) fail(`${fileName}: digest diferit de manifest`)
  if (data.schema !== "emanus-nt-explanation-recovery-v1") fail(`${fileName}: schema invalidă`)
  if (data.testament !== "nt") fail(`${fileName}: testament != nt`)
  if (!Array.isArray(data.chapters) || data.chapters.length !== manifestBook.chapters) fail(`${fileName}: număr capitole invalid`)

  // Snapshot-ul este explanation-only. Orice cheie exactă `text` ar însemna că vechiul text biblic a fost copiat.
  const stack = [data]
  while (stack.length) {
    const current = stack.pop()
    if (!current || typeof current !== "object") continue
    if (Object.prototype.hasOwnProperty.call(current, "text")) fail(`${fileName}: conține cheia text; recuperarea trebuie să fie explanation-only`)
    for (const value of Object.values(current)) {
      if (value && typeof value === "object") stack.push(value)
    }
  }

  const isRecovered = data.recoveryClass === "recovered-needs-source-audit"
  const isQuarantined = data.recoveryClass === "quarantined-generic-completion"
  if (!isRecovered && !isQuarantined) fail(`${fileName}: recoveryClass invalid`)
  if (isRecovered) recoverableBooks += 1
  if (isQuarantined) quarantinedBooks += 1

  for (let index = 0; index < data.chapters.length; index += 1) {
    const chapter = data.chapters[index]
    const number = index + 1
    if (chapter.number !== number) fail(`${fileName}: capitole necontinue la ${number}`)
    const binding = chapter.emanusTextBinding
    if (binding?.translation !== "BE") fail(`${fileName} ${number}: binding != BE`)
    if (binding?.bookId !== data.bookId || binding?.chapter !== number) fail(`${fileName} ${number}: binding metadata invalid`)

    const bePath = path.join(emanusDir, `${data.bookId}.${number}.json`)
    if (!fs.existsSync(bePath)) fail(`${fileName} ${number}: lipsește ${data.bookId}.${number}.json din Biblia Emanus`)
    const be = JSON.parse(fs.readFileSync(bePath, "utf8"))
    const canonical = inspectBeChapter(be, `${data.bookId}.${number}`)

    if (binding.verseEntryCount !== canonical.verseEntryCount) fail(`${fileName} ${number}: verseEntryCount nu corespunde BE`)
    if (binding.lastVerseNumber !== canonical.lastVerseNumber) fail(`${fileName} ${number}: lastVerseNumber nu corespunde BE`)
    if (JSON.stringify(binding.criticalReferenceNumbers ?? []) !== JSON.stringify(canonical.criticalReferenceNumbers)) {
      fail(`${fileName} ${number}: criticalReferenceNumbers nu corespund BE`)
    }

    if (isRecovered && chapter.status !== "in_review") fail(`${fileName} ${number}: conținutul recuperat trebuie să rămână in_review`)
    if (isQuarantined && chapter.status !== "quarantined") fail(`${fileName} ${number}: completion generic trebuie să rămână quarantined`)
    if (!Array.isArray(chapter.units) || !chapter.units.length) fail(`${fileName} ${number}: units gol`)

    let expectedNext = 1
    for (const unit of chapter.units) {
      if (unit.verseStart !== expectedNext) fail(`${fileName} ${number}: gap/overlap la slotul ${expectedNext}`)
      if (!Number.isInteger(unit.verseEnd) || unit.verseEnd < unit.verseStart || unit.verseEnd > canonical.lastVerseNumber) {
        fail(`${fileName} ${number}: interval invalid`)
      }
      if (typeof unit.teaching !== "string" || !unit.teaching.trim()) fail(`${fileName} ${number}: teaching gol`)

      const expectedCritical = []
      for (let slot = unit.verseStart; slot <= unit.verseEnd; slot += 1) {
        if (canonical.criticalSet.has(slot)) expectedCritical.push(slot)
      }
      if (JSON.stringify(unit.criticalReferenceNumbers ?? []) !== JSON.stringify(expectedCritical)) {
        fail(`${fileName} ${number}: unit criticalReferenceNumbers incorect la ${unit.ref}`)
      }
      expectedNext = unit.verseEnd + 1
    }
    if (expectedNext !== canonical.lastVerseNumber + 1) fail(`${fileName} ${number}: acoperire numerică incompletă ${expectedNext - 1}/${canonical.lastVerseNumber}`)

    chapters += 1
    verses += canonical.verseEntryCount
    criticalReferenceSlots += canonical.criticalReferenceNumbers.length
    if (isRecovered) recoverableChapters += 1
    else quarantinedChapters += 1
  }
}

const actual = { chapters, verses, recoverableBooks, recoverableChapters, quarantinedBooks, quarantinedChapters }
for (const [key, value] of Object.entries(actual)) {
  if (value !== EXPECTED[key]) fail(`${key} ${value}/${EXPECTED[key]}`)
}
if (manifest.counts?.criticalReferenceSlots !== criticalReferenceSlots) fail(`criticalReferenceSlots ${manifest.counts?.criticalReferenceSlots}/${criticalReferenceSlots}`)

console.log(`NT recovery gate OK: 27 books / ${chapters} chapters / ${verses} Biblia Emanus verse entries`)
console.log(`Resolved critical-number slots preserved without inventing verses: ${criticalReferenceSlots}`)
console.log(`Recovered for source audit: ${recoverableBooks} books / ${recoverableChapters} chapters`)
console.log(`Quarantined generic completion: ${quarantinedBooks} books / ${quarantinedChapters} chapters`)
console.log("Publication remains blocked until source-first review reaches 27/27 and 260/260.")
