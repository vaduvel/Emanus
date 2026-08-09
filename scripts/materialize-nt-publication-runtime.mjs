#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const bindingPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-canonical-binding.json")
const generatedDir = path.join(ROOT, "packages", "shared", "src", "bible", "generated", "ntExplained")
const generatedIndex = path.join(ROOT, "packages", "shared", "src", "bible", "generated", "ntExplained.ts")
const generatedBinding = path.join(ROOT, "packages", "shared", "src", "bible", "generated", "ntExplainedBinding.ts")
const runtimePath = path.join(ROOT, "packages", "shared", "src", "bible", "ntPublicationBible.ts")

const EXPECTED = { books: 27, chapters: 260, verseEntries: 7941 }

function fail(message) {
  console.error(`[NT runtime materializer] ${message}`)
  process.exit(1)
}
function q(value) { return JSON.stringify(value) }
function ident(index) { return `NT_BOOK_${String(index).padStart(2, "0")}` }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function tsValue(value, indent = 0) {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => index === 0 ? line : `${" ".repeat(indent)}${line}`)
    .join("\n")
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

if (!fs.existsSync(bindingPath)) fail("missing nt-canonical-binding.json; run materialize-nt-canonical-binding.mjs first")
const canonicalBinding = JSON.parse(fs.readFileSync(bindingPath, "utf8"))
if (canonicalBinding.schema !== "emanus-nt-canonical-binding-v1") fail("invalid canonical binding schema")
if (canonicalBinding.counts?.books !== EXPECTED.books || canonicalBinding.counts?.chapters !== EXPECTED.chapters || canonicalBinding.counts?.verseEntries !== EXPECTED.verseEntries) fail("canonical binding totals mismatch")
if (!canonicalBinding.canonicalTextVersion || !canonicalBinding.corpusSha256) fail("canonical binding version/hash missing")
const bindingByChapter = new Map(canonicalBinding.chapters.map((entry) => [`${entry.bookId}.${entry.chapter}`, entry]))

function loadBe(bookId, chapter) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`missing ${bookId}.${chapter}.json`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not public/published at data layer`)
  const bound = bindingByChapter.get(`${bookId}.${chapter}`)
  if (!bound) fail(`${bookId}.${chapter}: canonical binding entry missing`)
  const digest = sha256(JSON.stringify(canonicalPayload(be)))
  if (digest !== bound.canonicalTextSha256) fail(`${bookId}.${chapter}: BE text changed after canonical binding (${digest} != ${bound.canonicalTextSha256})`)
  if (typeof be.audit?.textDigest !== "string" || be.audit.textDigest !== bound.sourceAuditTextDigest) fail(`${bookId}.${chapter}: BE audit textDigest changed after binding`)
  return be
}

function passage(be, from, to) {
  const verses = be.verses.filter((verse) => verse.number >= from && verse.number <= to)
  if (!verses.length) fail(`${be.bookId}.${be.chapter}:${from}-${to}: no BE verse entries in unit`)
  return verses.map((verse) => verse.text).join(" ")
}

if (!fs.existsSync(corpusDir)) fail("missing final source-first corpus")
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
if (files.length !== EXPECTED.books) fail(`books ${files.length}/${EXPECTED.books}`)

fs.rmSync(generatedDir, { recursive: true, force: true })
fs.mkdirSync(generatedDir, { recursive: true })

let totalChapters = 0
let totalVerseEntries = 0
const indexLines = [
  `import type { BibleBook } from "../types.js"`,
]
const bookIdentifiers = []

for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
  const file = files[fileIndex]
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  const variable = ident(fileIndex + 1)
  const moduleName = file.replace(/\.json$/, ".ts")
  const importName = moduleName.replace(/\.ts$/, ".js")
  indexLines.push(`import { ${variable} } from "./ntExplained/${importName}"`)
  bookIdentifiers.push(variable)

  const runtimeChapters = book.chapters.map((chapter) => {
    const be = loadBe(book.bookId, chapter.number)
    totalVerseEntries += be.verses.length
    totalChapters += 1
    const units = chapter.units.map((unit) => ({
      id: unit.id,
      ref: unit.ref,
      heading: unit.heading,
      text: passage(be, unit.verseStart, unit.verseEnd),
      teaching: unit.teaching,
      ...(Array.isArray(unit.words) && unit.words.length ? { words: unit.words } : {}),
      ...(Array.isArray(unit.crossRefs) && unit.crossRefs.length ? { crossRefs: unit.crossRefs } : {}),
      ...(typeof unit.forYourHeart === "string" && unit.forYourHeart.trim() ? { forYourHeart: unit.forYourHeart } : {}),
    }))
    return {
      id: `${book.id}-${chapter.number}`,
      bookId: book.id,
      number: chapter.number,
      title: chapter.title,
      summary: chapter.summary,
      literaryContext: chapter.literaryContext ?? "",
      historicalContext: chapter.historicalContext ?? "",
      units,
      prayer: chapter.prayer ?? "",
      status: "in_review",
    }
  })

  const runtimeBook = {
    id: book.id,
    name: book.name,
    testament: "nt",
    order: book.order,
    blurb: book.chapters[0]?.summary ?? `Biblia Emanus explicată — ${book.name}.`,
    chapters: runtimeChapters,
  }
  const output = `import type { BibleBook } from "../../types.js"\n\nexport const ${variable}: BibleBook = ${tsValue(runtimeBook)}\n`
  fs.writeFileSync(path.join(generatedDir, moduleName), output, "utf8")
}

if (totalChapters !== EXPECTED.chapters || totalVerseEntries !== EXPECTED.verseEntries) {
  fail(`totals ${totalChapters}/${EXPECTED.chapters} chapters, ${totalVerseEntries}/${EXPECTED.verseEntries} BE verse entries`)
}

indexLines.push("")
indexLines.push(`export const NT_EXPLAINED_BOOKS: BibleBook[] = [${bookIdentifiers.join(", ")}]`)
indexLines.push(`export const NT_EXPLAINED_TRANSLATION = "Biblia Emanus"`)
indexLines.push(`export const NT_EXPLAINED_STATUS = "in_review" as const`)
indexLines.push("")
indexLines.push(`export function findNtExplainedBook(id: string): BibleBook | undefined {`)
indexLines.push(`  return NT_EXPLAINED_BOOKS.find((book) => book.id === id)`)
indexLines.push(`}`)
indexLines.push(`export function findNtExplainedChapter(bookId: string, number: number) {`)
indexLines.push(`  return findNtExplainedBook(bookId)?.chapters.find((chapter) => chapter.number === number)`)
indexLines.push(`}`)
fs.writeFileSync(generatedIndex, indexLines.join("\n") + "\n", "utf8")

const bindingModule = `export const NT_EXPLAINED_CANONICAL_VERSION = ${q(canonicalBinding.canonicalTextVersion)} as const\nexport const NT_EXPLAINED_CANONICAL_STATE = ${q(canonicalBinding.releaseState)} as const\nexport const NT_EXPLAINED_CANONICAL_SHA256 = ${q(canonicalBinding.corpusSha256)} as const\nexport const NT_EXPLAINED_CANONICAL_PUBLICATION_READY = ${canonicalBinding.publicationReady === true ? "true" : "false"} as const\nexport const NT_EXPLAINED_CANONICAL_CHAPTERS = ${tsValue(canonicalBinding.chapters)} as const\n`
fs.writeFileSync(generatedBinding, bindingModule, "utf8")

const runtime = `export {\n  NT_EXPLAINED_BOOKS,\n  NT_EXPLAINED_TRANSLATION,\n  NT_EXPLAINED_STATUS,\n  findNtExplainedBook,\n  findNtExplainedChapter,\n} from "./generated/ntExplained.js"\nexport {\n  NT_EXPLAINED_CANONICAL_VERSION,\n  NT_EXPLAINED_CANONICAL_STATE,\n  NT_EXPLAINED_CANONICAL_SHA256,\n  NT_EXPLAINED_CANONICAL_PUBLICATION_READY,\n  NT_EXPLAINED_CANONICAL_CHAPTERS,\n} from "./generated/ntExplainedBinding.js"\n`
fs.writeFileSync(runtimePath, runtime, "utf8")
console.log(`NT runtime materialized: ${files.length} books / ${totalChapters} chapters / ${totalVerseEntries} Biblia Emanus verse entries.`)
console.log(`Canonical binding: ${canonicalBinding.canonicalTextVersion} / ${canonicalBinding.releaseState} / sha256:${canonicalBinding.corpusSha256}.`)
