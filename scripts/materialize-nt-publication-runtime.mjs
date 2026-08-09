#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const generatedDir = path.join(ROOT, "packages", "shared", "src", "bible", "generated", "ntExplained")
const generatedIndex = path.join(ROOT, "packages", "shared", "src", "bible", "generated", "ntExplained.ts")
const runtimePath = path.join(ROOT, "packages", "shared", "src", "bible", "ntPublicationBible.ts")

const EXPECTED = { books: 27, chapters: 260, verseEntries: 7941 }

function fail(message) {
  console.error(`[NT runtime materializer] ${message}`)
  process.exit(1)
}
function q(value) { return JSON.stringify(value) }
function ident(index) { return `NT_BOOK_${String(index).padStart(2, "0")}` }
function tsValue(value, indent = 0) {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => index === 0 ? line : `${" ".repeat(indent)}${line}`)
    .join("\n")
}

function loadBe(bookId, chapter) {
  const file = path.join(beDir, `${bookId}.${chapter}.json`)
  if (!fs.existsSync(file)) fail(`missing ${bookId}.${chapter}.json`)
  const be = JSON.parse(fs.readFileSync(file, "utf8"))
  if (be.translation !== "BE" || be.status !== "published" || be.public !== true) fail(`${bookId}.${chapter}: BE not published/public`)
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

const runtime = `export {\n  NT_EXPLAINED_BOOKS,\n  NT_EXPLAINED_TRANSLATION,\n  NT_EXPLAINED_STATUS,\n  findNtExplainedBook,\n  findNtExplainedChapter,\n} from "./generated/ntExplained.js"\n`
fs.writeFileSync(runtimePath, runtime, "utf8")
console.log(`NT runtime materialized: ${files.length} books / ${totalChapters} chapters / ${totalVerseEntries} Biblia Emanus verse entries.`)
