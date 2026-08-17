#!/usr/bin/env node

import { readFile } from "node:fs/promises"

import {
  BIBLIA_EMANUS_TRANSLATION,
  PUBLICATION_BIBLE_BOOKS,
  PUBLISHED_EMANUS_OT_TEXT_BY_ORDER,
} from "../packages/shared/dist/bible/publicationBibleFinal.js"
import { BIBLIA_EMANUS_NT_BOOKS } from "../packages/shared/dist/bible/bibliaEmanusNtCatalog.generated.js"

const EXPECTED = {
  books: 66,
  chapters: 1189,
  verses: 31086,
  vtBooks: 39,
  vtChapters: 929,
  vtVerses: 23145,
  ntBooks: 27,
  ntChapters: 260,
  ntVerses: 7941,
  ntUnits: 970,
}

function need(condition, message) {
  if (!condition) throw new Error(`[Biblia explicată runtime] ${message}`)
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right)
}

function publicPassage(verses, from, to) {
  return verses
    .filter((verse) => verse.number >= from && verse.number <= to)
    .map((verse) => verse.text)
    .join(" ")
}

const ntCanonicalById = new Map(BIBLIA_EMANUS_NT_BOOKS.map((book) => [book.id, book]))
const publicCatalog = JSON.parse(
  await readFile(new URL("../apps/web/public/biblia-emanus/catalog.json", import.meta.url), "utf8"),
)
const unitIds = new Set()
const totals = {
  chapters: 0,
  verses: 0,
  units: 0,
  vtBooks: 0,
  vtChapters: 0,
  vtVerses: 0,
  vtUnits: 0,
  ntBooks: 0,
  ntChapters: 0,
  ntVerses: 0,
  ntUnits: 0,
}

need(PUBLICATION_BIBLE_BOOKS.length === EXPECTED.books, `cărți ${PUBLICATION_BIBLE_BOOKS.length}/${EXPECTED.books}`)
need(publicCatalog.bookCount === EXPECTED.books, `catalog public ${publicCatalog.bookCount}/${EXPECTED.books} cărți`)
need(
  publicCatalog.translation === BIBLIA_EMANUS_TRANSLATION,
  "catalogul public nu declară traducerea Biblia Emanus",
)

for (const book of PUBLICATION_BIBLE_BOOKS) {
  const isNt = book.testament === "nt"
  const canonicalNt = isNt ? ntCanonicalById.get(book.id) : undefined
  const canonicalOt = isNt ? undefined : PUBLISHED_EMANUS_OT_TEXT_BY_ORDER.get(book.order)

  need(isNt ? canonicalNt : canonicalOt, `${book.name}: lipsește corpusul canonic`)
  need(book.translation === BIBLIA_EMANUS_TRANSLATION, `${book.name}: traducerea publică este invalidă`)
  need(book.id !== "fapte", "aliasul editorial `fapte` a ajuns în runtime")
  const publicBook = JSON.parse(
    await readFile(
      new URL(`../apps/web/public/biblia-emanus/books/${book.id}.json`, import.meta.url),
      "utf8",
    ),
  )
  need(sameJson(publicBook, book), `${book.name}: artefactul JSON al readerului diferă de catalogul final`)

  if (isNt) totals.ntBooks += 1
  else totals.vtBooks += 1

  const canonicalChapterCount = isNt
    ? canonicalNt.chapters.length
    : Object.keys(canonicalOt.chapters).length
  need(
    book.chapters.length === canonicalChapterCount,
    `${book.name}: ${book.chapters.length}/${canonicalChapterCount} capitole canonice`,
  )

  for (const chapter of book.chapters) {
    totals.chapters += 1
    if (isNt) totals.ntChapters += 1
    else totals.vtChapters += 1

    const canonicalNtChapter = isNt
      ? canonicalNt.chapters.find((candidate) => candidate.number === chapter.number)
      : undefined
    const canonicalOtTexts = isNt ? undefined : canonicalOt.chapters[chapter.number]
    need(
      isNt ? canonicalNtChapter : canonicalOtTexts,
      `${book.name} ${chapter.number}: capitolul canonic lipsește`,
    )

    const canonicalVerses = isNt
      ? canonicalNtChapter.verses
      : canonicalOtTexts.map((text, index) => ({ number: index + 1, text }))

    need(chapter.status === "published", `${book.name} ${chapter.number}: status=${chapter.status}`)
    need(
      sameJson(chapter.verses, canonicalVerses),
      `${book.name} ${chapter.number}: textul/numerele versetelor diferă de corpusul canonic`,
    )
    if (isNt) {
      need(
        sameJson(chapter.textualNotes, canonicalNtChapter.textualNotes),
        `${book.name} ${chapter.number}: notele textuale canonice au fost modificate`,
      )
      need(
        sameJson(chapter.alternateEndings, canonicalNtChapter.alternateEndings),
        `${book.name} ${chapter.number}: finalurile alternative canonice au fost modificate`,
      )
    }

    totals.verses += canonicalVerses.length
    if (isNt) totals.ntVerses += canonicalVerses.length
    else totals.vtVerses += canonicalVerses.length

    need(chapter.units.length > 0, `${book.name} ${chapter.number}: nu are explicații`)
    const owners = new Map(canonicalVerses.map((verse) => [verse.number, []]))

    for (const unit of chapter.units) {
      totals.units += 1
      if (isNt) totals.ntUnits += 1
      else totals.vtUnits += 1

      need(!unitIds.has(unit.id), `${unit.id}: id de unitate duplicat`)
      unitIds.add(unit.id)
      need(Number.isInteger(unit.verseStart), `${unit.ref}: verseStart nu este normalizat`)
      need(Number.isInteger(unit.verseEnd), `${unit.ref}: verseEnd nu este normalizat`)
      need(unit.verseStart >= 1, `${unit.ref}: verseStart invalid`)
      need(unit.verseEnd >= unit.verseStart, `${unit.ref}: verseEnd invalid`)
      need(
        typeof unit.teaching === "string" && unit.teaching.trim().length > 0,
        `${unit.ref}: teaching gol`,
      )
      need(!unit.explanationSource, `${unit.ref}: explanationSource intern expus public`)
      if (isNt) need(!unit.wordSource, `${unit.ref}: wordSource intern NT expus public`)
      need(unit.id !== "fapte" && !unit.id.startsWith("fapte-"), `${unit.id}: alias NT nenormalizat`)

      const expectedText = publicPassage(canonicalVerses, unit.verseStart, unit.verseEnd)
      need(expectedText.length > 0, `${unit.ref}: interval fără verset public`)
      need(unit.text === expectedText, `${unit.ref}: unit.text nu este reconstruit din versetele canonice`)

      for (const verse of canonicalVerses) {
        if (verse.number < unit.verseStart || verse.number > unit.verseEnd) continue
        owners.get(verse.number).push(unit.id)
      }
    }

    for (const verse of canonicalVerses) {
      const matches = owners.get(verse.number)
      need(
        matches.length === 1,
        `${book.name} ${chapter.number}:${verse.number} are ${matches.length} explicații (${matches.join(", ") || "niciuna"})`,
      )
    }
  }
}

need(totals.chapters === EXPECTED.chapters, `capitole ${totals.chapters}/${EXPECTED.chapters}`)
need(totals.verses === EXPECTED.verses, `versete ${totals.verses}/${EXPECTED.verses}`)
need(totals.vtBooks === EXPECTED.vtBooks, `cărți VT ${totals.vtBooks}/${EXPECTED.vtBooks}`)
need(totals.vtChapters === EXPECTED.vtChapters, `capitole VT ${totals.vtChapters}/${EXPECTED.vtChapters}`)
need(totals.vtVerses === EXPECTED.vtVerses, `versete VT ${totals.vtVerses}/${EXPECTED.vtVerses}`)
need(totals.ntBooks === EXPECTED.ntBooks, `cărți NT ${totals.ntBooks}/${EXPECTED.ntBooks}`)
need(totals.ntChapters === EXPECTED.ntChapters, `capitole NT ${totals.ntChapters}/${EXPECTED.ntChapters}`)
need(totals.ntVerses === EXPECTED.ntVerses, `versete NT ${totals.ntVerses}/${EXPECTED.ntVerses}`)
need(totals.ntUnits === EXPECTED.ntUnits, `unități NT ${totals.ntUnits}/${EXPECTED.ntUnits}`)
need(ntCanonicalById.has("faptele-apostolilor"), "lipsește id-ul canonic faptele-apostolilor")

console.log(
  `Biblia explicată runtime OK: ${EXPECTED.books} cărți, ${totals.chapters} capitole, ` +
    `${totals.verses} versete canonice și ${totals.units} unități; fiecare verset public are exact o explicație. ` +
    `NT: ${totals.ntBooks} cărți / ${totals.ntChapters} capitole / ${totals.ntVerses} versete / ${totals.ntUnits} unități.`,
)
