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

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex")
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
  if (JSON.stringify(data).includes('"text":')) fail(`${fileName}: conține text biblic legacy; recuperarea trebuie să fie explanation-only`)
  if (/RCCV/i.test(JSON.stringify(data))) fail(`${fileName}: marker RCCV detectat în payloadul recuperat`)

  const isRecovered = data.recoveryClass === "recovered-needs-source-audit"
  const isQuarantined = data.recoveryClass === "quarantined-generic-completion"
  if (!isRecovered && !isQuarantined) fail(`${fileName}: recoveryClass invalid`)
  if (isRecovered) recoverableBooks += 1
  if (isQuarantined) quarantinedBooks += 1

  for (let index = 0; index < data.chapters.length; index += 1) {
    const chapter = data.chapters[index]
    const number = index + 1
    if (chapter.number !== number) fail(`${fileName}: capitole necontinue la ${number}`)
    if (chapter.emanusTextBinding?.translation !== "BE") fail(`${fileName} ${number}: binding != BE`)
    if (chapter.emanusTextBinding?.bookId !== data.bookId) fail(`${fileName} ${number}: bookId binding invalid`)
    if (chapter.emanusTextBinding?.chapter !== number) fail(`${fileName} ${number}: chapter binding invalid`)
    if (!Number.isInteger(chapter.emanusTextBinding?.verseCount) || chapter.emanusTextBinding.verseCount < 1) fail(`${fileName} ${number}: verseCount invalid`)
    const bePath = path.join(emanusDir, `${data.bookId}.${number}.json`)
    if (!fs.existsSync(bePath)) fail(`${fileName} ${number}: lipsește ${data.bookId}.${number}.json din Biblia Emanus`)
    const be = JSON.parse(fs.readFileSync(bePath, "utf8"))
    if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${fileName} ${number}: sursa BE nu este publicată`)
    if (be.verses?.length !== chapter.emanusTextBinding.verseCount) fail(`${fileName} ${number}: verseCount nu corespunde BE`)

    if (isRecovered && chapter.status !== "in_review") fail(`${fileName} ${number}: conținutul recuperat trebuie să rămână in_review`)
    if (isQuarantined && chapter.status !== "quarantined") fail(`${fileName} ${number}: completion generic trebuie să rămână quarantined`)
    if (!Array.isArray(chapter.units) || !chapter.units.length) fail(`${fileName} ${number}: units gol`)

    let expectedNext = 1
    for (const unit of chapter.units) {
      if (unit.verseStart !== expectedNext) fail(`${fileName} ${number}: gap/overlap la versetul ${expectedNext}`)
      if (!Number.isInteger(unit.verseEnd) || unit.verseEnd < unit.verseStart || unit.verseEnd > be.verses.length) fail(`${fileName} ${number}: interval invalid`)
      if (typeof unit.teaching !== "string" || !unit.teaching.trim()) fail(`${fileName} ${number}: teaching gol`)
      expectedNext = unit.verseEnd + 1
    }
    if (expectedNext !== be.verses.length + 1) fail(`${fileName} ${number}: acoperire incompletă ${expectedNext - 1}/${be.verses.length}`)

    chapters += 1
    verses += be.verses.length
    if (isRecovered) recoverableChapters += 1
    else quarantinedChapters += 1
  }
}

const actual = { chapters, verses, recoverableBooks, recoverableChapters, quarantinedBooks, quarantinedChapters }
for (const [key, value] of Object.entries(actual)) {
  if (value !== EXPECTED[key]) fail(`${key} ${value}/${EXPECTED[key]}`)
}

console.log(`NT recovery gate OK: 27 books / ${chapters} chapters / ${verses} Biblia Emanus verses`)
console.log(`Recovered for source audit: ${recoverableBooks} books / ${recoverableChapters} chapters`)
console.log(`Quarantined generic completion: ${quarantinedBooks} books / ${quarantinedChapters} chapters`)
console.log("Publication remains blocked until source-first review reaches 27/27 and 260/260.")
