#!/usr/bin/env node

import { VT_EXPLAINED_OVERLAYS } from "../packages/shared/dist/bible/overlays/index.js"
import {
  VT_CANONICAL_TEXT_BOOKS,
  VT_TEMPORARY_TEXT_BOOKS,
} from "../packages/shared/dist/bible/generated/vtCanonicalText/index.js"

const EXPECTED_BOOKS = 29
const EXPECTED_CHAPTERS = 637
const EXPECTED_BE_TEXT_BOOKS = 17
const EXPECTED_TEMP_TEXT_BOOKS = 12
const PLACEHOLDER = "Transcriptul Poonen nu îl dezvoltă separat"
const TEMP_LABEL = "Text biblic provizoriu pentru lucru editorial — de înlocuit cu Biblia Emanus"

function need(condition, message) {
  if (!condition) throw new Error(`[VT publication] ${message}`)
}

need(VT_EXPLAINED_OVERLAYS.length === EXPECTED_BOOKS, `registry ${VT_EXPLAINED_OVERLAYS.length}/${EXPECTED_BOOKS} overlay-uri`)
need(VT_CANONICAL_TEXT_BOOKS.length === EXPECTED_BOOKS, `texte de lucru ${VT_CANONICAL_TEXT_BOOKS.length}/${EXPECTED_BOOKS}`)
need(VT_TEMPORARY_TEXT_BOOKS.length === EXPECTED_TEMP_TEXT_BOOKS, `texte provizorii ${VT_TEMPORARY_TEXT_BOOKS.length}/${EXPECTED_TEMP_TEXT_BOOKS}`)
need(
  VT_CANONICAL_TEXT_BOOKS.filter((book) => book.textStage === "biblia-emanus").length === EXPECTED_BE_TEXT_BOOKS,
  `texte Biblia Emanus trebuie să fie ${EXPECTED_BE_TEXT_BOOKS}`,
)

const textByBook = new Map(VT_CANONICAL_TEXT_BOOKS.map((book) => [book.bookId, book]))
let textChapters = 0
for (const textBook of VT_CANONICAL_TEXT_BOOKS) {
  textChapters += textBook.chapterCount
  need(Object.keys(textBook.chapters).length === textBook.chapterCount, `${textBook.name}: matricea de text nu are toate capitolele`)
  if (textBook.textStage === "biblia-emanus") {
    need(textBook.translationLabel === "Biblia Emanus", `${textBook.name}: etichetă BE invalidă`)
  } else {
    need(textBook.textStage === "temporary-editorial", `${textBook.name}: textStage necunoscut`)
    need(textBook.translationLabel === TEMP_LABEL, `${textBook.name}: textul provizoriu nu este marcat explicit`)
  }
}
need(textChapters === EXPECTED_CHAPTERS, `capitole text ${textChapters}/${EXPECTED_CHAPTERS}`)

let chapters = 0
let units = 0
let expositionUnits = 0
let overviewUnits = 0
let hebrewNotes = 0

for (const book of VT_EXPLAINED_OVERLAYS) {
  need(book.testament === "vt", `${book.name}: testament invalid`)
  need(book.coverageMode === "full", `${book.name}: coverageMode trebuie să fie full`)
  need(book.status === "in_review", `${book.name}: release candidate trebuie să rămână in_review până la aprobarea umană`)
  need(book.bibleEmanusBookId?.trim(), `${book.name}: lipsește bibleEmanusBookId`)
  need(book.chapters.length > 0, `${book.name}: fără capitole`)

  const textBook = textByBook.get(book.bookId)
  need(textBook, `${book.name}: nu există text de lucru asociat`)
  need(textBook.chapterCount === book.chapters.length, `${book.name}: numărul de capitole text/explicație diferă`)

  let bookExposition = 0

  book.chapters.forEach((chapter, index) => {
    chapters += 1
    need(chapter.number === index + 1, `${book.name}: capitol discontinuu ${chapter.number}`)
    need(chapter.title?.trim().length >= 8, `${book.name} ${chapter.number}: titlu prea scurt`)
    need(chapter.summary?.trim().length >= 60, `${book.name} ${chapter.number}: explicația de capitol este prea scurtă`)
    need(!chapter.summary.includes(PLACEHOLDER), `${book.name} ${chapter.number}: placeholder de transcript rămas în registry-ul final`)
    need(chapter.units.length > 0, `${book.name} ${chapter.number}: fără unități explicative`)

    const sorted = [...chapter.units].sort((a, b) => a.from - b.from || a.to - b.to)
    const expectedVerseCount = Math.max(...sorted.map((unit) => unit.to))
    const verseTexts = textBook.chapters[chapter.number]
    need(verseTexts, `${book.name} ${chapter.number}: lipsește capitolul din textul de lucru`)
    need(
      verseTexts.length === expectedVerseCount,
      `${book.name} ${chapter.number}: versificația textului de lucru are ${verseTexts.length} versete, explicația așteaptă ${expectedVerseCount}`,
    )

    let cursor = 1
    for (const unit of sorted) {
      units += 1
      need(Number.isInteger(unit.from) && Number.isInteger(unit.to), `${book.name} ${chapter.number}: interval nenumeric`)
      need(unit.from >= 1 && unit.to >= unit.from, `${book.name} ${chapter.number}: interval invalid ${unit.from}-${unit.to}`)
      need(unit.from <= cursor, `${book.name} ${chapter.number}: gol înainte de versetul ${unit.from}`)
      cursor = Math.max(cursor, unit.to + 1)
      need(unit.heading?.trim().length >= 8, `${book.name} ${chapter.number}:${unit.from}-${unit.to}: heading prea scurt`)
      need(unit.teaching?.trim().length >= 60, `${book.name} ${chapter.number}:${unit.from}-${unit.to}: explicație prea scurtă`)
      need(!unit.teaching.includes(PLACEHOLDER), `${book.name} ${chapter.number}:${unit.from}-${unit.to}: placeholder rămas`)
      need(unit.explanationKind === "exposition" || unit.explanationKind === "textual-overview", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: explanationKind lipsă`)

      if (unit.source.kind === "biblia-emanus") {
        overviewUnits += 1
        need(unit.explanationKind === "textual-overview", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: overview-ul editorial trebuie etichetat textual-overview`)
        need(unit.source.note === "rezumat narativ fără doctrină adăugată", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: truth-guard overview invalid`)
        need(!unit.forYourHeart, `${book.name} ${chapter.number}:${unit.from}-${unit.to}: overview-ul textual nu poate inventa aplicație pastorală`)
        need(!unit.words?.length, `${book.name} ${chapter.number}:${unit.from}-${unit.to}: overview-ul textual nu poate inventa studiu lexical`)
      } else {
        expositionUnits += 1
        bookExposition += 1
        need(unit.explanationKind === "exposition", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: sursa doctrinară trebuie etichetată exposition`)

        if (unit.source.kind === "poonen") {
          need(unit.source.transcript?.endsWith(".txt"), `${book.name} ${chapter.number}: transcript Poonen invalid`)
          need(unit.source.anchor?.trim().length >= 12, `${book.name} ${chapter.number}: ancora Poonen este prea slabă`)
        } else if (unit.source.kind === "poonen-official") {
          need(unit.source.sourceUrl?.startsWith("https://"), `${book.name} ${chapter.number}: URL oficial Poonen invalid`)
          need(unit.source.section?.trim().length >= 3, `${book.name} ${chapter.number}: secțiune oficială Poonen lipsă`)
        } else {
          throw new Error(`[VT publication] ${book.name} ${chapter.number}: sursă necunoscută ${unit.source.kind}`)
        }
      }

      for (const word of unit.words ?? []) {
        hebrewNotes += 1
        need(word.original?.trim(), `${book.name} ${chapter.number}: termen ebraic gol`)
        need(word.transliteration?.trim(), `${book.name} ${chapter.number}: transliterare lipsă`)
        need(word.meaning?.trim().length >= 15, `${book.name} ${chapter.number}: explicație lexicală prea scurtă`)
        need(word.verseRef?.trim(), `${book.name} ${chapter.number}: verseRef lexical lipsă`)
        need(word.lexicalSource === "WLC-OSHB", `${book.name} ${chapter.number}: sursa lexicală trebuie să fie WLC-OSHB`)
      }
    }
  })

  need(bookExposition > 0, `${book.name}: cartea nu are nicio unitate de expunere Poonen`)
}

need(chapters === EXPECTED_CHAPTERS, `capitole runtime ${chapters}/${EXPECTED_CHAPTERS}`)
need(expositionUnits > 0, "nu există unități doctrinare Poonen")
need(overviewUnits > 0, "nu există unități textuale editoriale")

console.log(
  `VT publication runtime OK: ${EXPECTED_BOOKS}/29 overlay-uri, ${chapters}/637 capitole, ` +
  `${EXPECTED_BE_TEXT_BOOKS} cărți cu text Biblia Emanus + ${EXPECTED_TEMP_TEXT_BOOKS} cu text provizoriu marcat, ` +
  `${units} unități (${expositionUnits} expuneri Poonen/CFC + ${overviewUnits} overview-uri editoriale), ` +
  `${hebrewNotes} note ebraice WLC-OSHB. Versificația textului de lucru corespunde exact explicațiilor.`,
)
