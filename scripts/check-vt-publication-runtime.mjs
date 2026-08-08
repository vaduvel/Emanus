#!/usr/bin/env node

import { VT_EXPLAINED_OVERLAYS } from "../packages/shared/dist/bible/overlays/index.js"
import { PUBLICATION_BIBLE_BOOKS } from "../packages/shared/dist/bible/publicationBible.js"
import { VT_EXPLAINED_COVERAGE } from "../packages/shared/dist/bible/vtExplainedCoverage.js"
import {
  VT_CANONICAL_TEXT_BOOKS,
  VT_TEMPORARY_TEXT_BOOKS,
} from "../packages/shared/dist/bible/generated/vtCanonicalText/index.js"

const EXPECTED_OVERLAY_BOOKS = 29
const EXPECTED_OVERLAY_CHAPTERS = 637
const EXPECTED_OT_BOOKS = 39
const EXPECTED_OT_CHAPTERS = 929
const PLACEHOLDERS = [
  "Transcriptul Poonen nu îl dezvoltă separat",
  "Sursa Poonen folosită în acest val nu îl dezvoltă separat",
]
const TEMP_LABEL = "Text biblic provizoriu pentru lucru editorial — de înlocuit cu Biblia Emanus"
const TEXTUAL_TRUTH_GUARDS = new Set([
  "rezumat narativ fără doctrină adăugată",
  "rezumat textual fără doctrină adăugată",
])
const FORBIDDEN_READER_ATTRIBUTION = /\b(?:Zac\s+)?Poonen\b|\bAllen\b|\bNolan\b|\bCFC India\b|\bThrough The Bible\b/iu
const FORBIDDEN_READER_RESEARCH_META = /\btranscript(?:ul|ului|e)?\b/iu

function need(condition, message) {
  if (!condition) throw new Error(`[VT publication] ${message}`)
}

function hasPlaceholder(value) {
  return PLACEHOLDERS.some((placeholder) => value.includes(placeholder))
}

function assertReaderText(value, where) {
  if (typeof value !== "string" || value.length === 0) return
  need(!FORBIDDEN_READER_ATTRIBUTION.test(value), `atribuire nominală vizibilă în ${where}`)
  need(!FORBIDDEN_READER_RESEARCH_META.test(value), `limbaj intern de cercetare vizibil în ${where}`)
}

need(VT_EXPLAINED_COVERAGE.length === EXPECTED_OT_BOOKS, `coverage manifest ${VT_EXPLAINED_COVERAGE.length}/${EXPECTED_OT_BOOKS}`)
for (const book of VT_EXPLAINED_COVERAGE) {
  need(book.coverage === "full", `${book.name}: coverage manifest nu este full`)
  need(book.status === "published", `${book.name}: explicația nu este aprobată pentru publicare`)
}

need(VT_EXPLAINED_OVERLAYS.length === EXPECTED_OVERLAY_BOOKS, `registry ${VT_EXPLAINED_OVERLAYS.length}/${EXPECTED_OVERLAY_BOOKS} overlay-uri`)
need(VT_CANONICAL_TEXT_BOOKS.length === EXPECTED_OVERLAY_BOOKS, `texte de lucru ${VT_CANONICAL_TEXT_BOOKS.length}/${EXPECTED_OVERLAY_BOOKS}`)

const beTextBooks = VT_CANONICAL_TEXT_BOOKS.filter((book) => book.textStage === "biblia-emanus")
const temporaryTextBooks = VT_CANONICAL_TEXT_BOOKS.filter((book) => book.textStage === "temporary-editorial")
need(
  beTextBooks.length + temporaryTextBooks.length === EXPECTED_OVERLAY_BOOKS,
  `stări text invalide: ${beTextBooks.length} BE + ${temporaryTextBooks.length} provizorii != ${EXPECTED_OVERLAY_BOOKS}`,
)
need(
  VT_TEMPORARY_TEXT_BOOKS.length === temporaryTextBooks.length,
  `registry-ul textelor provizorii nu corespunde stării materializate: ${VT_TEMPORARY_TEXT_BOOKS.length}/${temporaryTextBooks.length}`,
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
need(textChapters === EXPECTED_OVERLAY_CHAPTERS, `capitole text ${textChapters}/${EXPECTED_OVERLAY_CHAPTERS}`)

let chapters = 0
let units = 0
let expositionUnits = 0
let poonenUnits = 0
let officialUnits = 0
let canonicalExegesisUnits = 0
let overviewUnits = 0
let hebrewNotes = 0

for (const book of VT_EXPLAINED_OVERLAYS) {
  need(book.testament === "vt", `${book.name}: testament invalid`)
  need(book.coverageMode === "full", `${book.name}: coverageMode trebuie să fie full`)
  need(book.status === "published", `${book.name}: stratul explicativ final trebuie să fie published`)
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
    need(!hasPlaceholder(chapter.summary), `${book.name} ${chapter.number}: placeholder de transcript rămas în registry-ul final`)
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
      need(!hasPlaceholder(unit.teaching), `${book.name} ${chapter.number}:${unit.from}-${unit.to}: placeholder rămas`)
      need(unit.explanationKind === "exposition" || unit.explanationKind === "textual-overview", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: explanationKind lipsă`)

      if (unit.source.kind === "biblia-emanus") {
        overviewUnits += 1
        need(unit.explanationKind === "textual-overview", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: overview-ul editorial trebuie etichetat textual-overview`)
        need(TEXTUAL_TRUTH_GUARDS.has(unit.source.note), `${book.name} ${chapter.number}:${unit.from}-${unit.to}: truth-guard overview invalid`)
        need(!unit.forYourHeart, `${book.name} ${chapter.number}:${unit.from}-${unit.to}: overview-ul textual nu poate inventa aplicație pastorală`)
        need(!unit.words?.length, `${book.name} ${chapter.number}:${unit.from}-${unit.to}: overview-ul textual nu poate inventa studiu lexical`)
      } else {
        expositionUnits += 1
        bookExposition += 1
        need(unit.explanationKind === "exposition", `${book.name} ${chapter.number}:${unit.from}-${unit.to}: sursa explicativă trebuie etichetată exposition`)

        if (unit.source.kind === "poonen") {
          poonenUnits += 1
          need(unit.source.transcript?.endsWith(".txt"), `${book.name} ${chapter.number}: transcript intern invalid`)
          need(unit.source.anchor?.trim().length >= 12, `${book.name} ${chapter.number}: ancora internă este prea slabă`)
        } else if (unit.source.kind === "poonen-official") {
          officialUnits += 1
          need(unit.source.sourceUrl?.startsWith("https://"), `${book.name} ${chapter.number}: URL oficial invalid`)
          need(unit.source.section?.trim().length >= 3, `${book.name} ${chapter.number}: secțiune oficială lipsă`)
        } else if (unit.source.kind === "canonical-exegesis") {
          canonicalExegesisUnits += 1
          need(Array.isArray(unit.source.sources) && unit.source.sources.length > 0, `${book.name} ${chapter.number}: exegeza canonică nu are surse`)
          need(unit.source.sources.every((source) => typeof source === "string" && source.trim().length >= 3), `${book.name} ${chapter.number}: sursă canonică invalidă`)
          need(unit.source.note?.trim().length >= 12, `${book.name} ${chapter.number}: nota de exegeză canonică este prea slabă`)
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

  need(bookExposition > 0, `${book.name}: cartea nu are nicio unitate de expunere verificată`)
}

need(chapters === EXPECTED_OVERLAY_CHAPTERS, `capitole runtime ${chapters}/${EXPECTED_OVERLAY_CHAPTERS}`)
need(expositionUnits > 0, "nu există unități de expunere")
need(poonenUnits + officialUnits > 0, "nu există nicio unitate ancorată în sursa editorială principală")
need(overviewUnits > 0, "nu există unități textuale editoriale")

const readerOtBooks = PUBLICATION_BIBLE_BOOKS.filter((book) => book.testament === "vt")
need(readerOtBooks.length === EXPECTED_OT_BOOKS, `catalog cititor VT ${readerOtBooks.length}/${EXPECTED_OT_BOOKS} cărți`)
let readerChapters = 0
for (const book of readerOtBooks) {
  assertReaderText(book.blurb, `${book.name} blurb`)
  readerChapters += book.chapters.length

  const overlayText = textByBook.get(book.id)
  const expectedOverlayReaderStatus = overlayText
    ? overlayText.textStage === "temporary-editorial"
      ? "in_review"
      : "published"
    : null

  for (const chapter of book.chapters) {
    if (expectedOverlayReaderStatus) {
      need(
        chapter.status === expectedOverlayReaderStatus,
        `${book.name} ${chapter.number}: status reader ${chapter.status}, așteptat ${expectedOverlayReaderStatus} după stadiul textului`,
      )
    }
    assertReaderText(chapter.title, `${book.name} ${chapter.number} titlu`)
    assertReaderText(chapter.summary, `${book.name} ${chapter.number} rezumat`)
    assertReaderText(chapter.literaryContext, `${book.name} ${chapter.number} context literar`)
    assertReaderText(chapter.historicalContext, `${book.name} ${chapter.number} context istoric`)
    assertReaderText(chapter.prayer, `${book.name} ${chapter.number} rugăciune`)
    for (const unit of chapter.units) {
      assertReaderText(unit.heading, `${unit.ref} heading`)
      assertReaderText(unit.teaching, `${unit.ref} teaching`)
      assertReaderText(unit.forYourHeart, `${unit.ref} pentru inima ta`)
      need(!unit.explanationSource, `${unit.ref}: explanationSource nu trebuie expus cititorului`)
      for (const word of unit.words ?? []) {
        assertReaderText(word.meaning, `${unit.ref} explicație lexicală ${word.transliteration}`)
      }
    }
  }
}
need(readerChapters === EXPECTED_OT_CHAPTERS, `catalog cititor VT ${readerChapters}/${EXPECTED_OT_CHAPTERS} capitole`)

console.log(
  `VT explanation publication OK: ${EXPECTED_OT_BOOKS}/39 explicații de carte aprobate; ` +
  `${EXPECTED_OVERLAY_BOOKS}/29 overlay-uri published și ${chapters}/637 capitole overlay; ` +
  `${readerChapters}/929 capitole prezente în catalog, cu textele provizorii ținute separat în review; ` +
  `${units} unități (${poonenUnits} transcript intern + ${officialUnits} sursă oficială internă + ${canonicalExegesisUnits} exegeze canonice + ${overviewUnits} overview-uri textuale); ` +
  `${hebrewNotes} note ebraice WLC-OSHB; zero atribuiri nominale în copy-ul cititorului.`,
)
