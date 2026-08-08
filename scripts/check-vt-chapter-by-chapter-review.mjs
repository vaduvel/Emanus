#!/usr/bin/env node

import { BIBLE_BOOKS } from "../packages/shared/dist/bible/index.js"
import { IMPARATI1 } from "../packages/shared/dist/bible/imparati1.js"
import { VT_EXPLAINED_FULL_OVERLAYS } from "../packages/shared/dist/bible/overlays/fullCoverage.js"

const EXPECTED_BOOKS = 39
const EXPECTED_CHAPTERS = 929
const EXPECTED_LEGACY_BOOKS = 10
const EXPECTED_LEGACY_CHAPTERS = 292
const EXPECTED_OVERLAY_BOOKS = 29
const EXPECTED_OVERLAY_CHAPTERS = 637

function need(condition, message) {
  if (!condition) throw new Error(`[VT chapter review] ${message}`)
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
}

function checkLegacyUnit(book, chapter, unit) {
  need(text(unit.heading), `${book.name} ${chapter.number}: heading gol în ${unit.id ?? "unitate"}`)
  need(text(unit.teaching), `${book.name} ${chapter.number}: teaching gol în ${unit.id ?? "unitate"}`)
  need(
    unit.explanationKind === "exposition" || unit.explanationKind === "textual-overview",
    `${book.name} ${chapter.number}: explanationKind invalid/lipsă în ${unit.id ?? "unitate"}`,
  )
  need(text(unit.explanationSource), `${book.name} ${chapter.number}: explanationSource lipsă în ${unit.id ?? "unitate"}`)

  if (unit.explanationKind === "textual-overview") {
    need(!text(unit.forYourHeart), `${book.name} ${chapter.number}: textual-overview are forYourHeart în ${unit.id ?? "unitate"}`)
    need(!(unit.words?.length > 0), `${book.name} ${chapter.number}: textual-overview are studiu lexical în ${unit.id ?? "unitate"}`)
  }

  for (const word of unit.words ?? []) {
    need(text(word.original), `${book.name} ${chapter.number}: cuvânt lexical fără original`)
    need(text(word.meaning), `${book.name} ${chapter.number}: cuvânt lexical fără sens`)
    need(
      unit.wordSource === "WLC-OSHB",
      `${book.name} ${chapter.number}: notă ebraică fără wordSource=WLC-OSHB în ${unit.id ?? "unitate"}`,
    )
  }
}

function checkLegacyBook(book) {
  need(book.testament === "vt", `${book.name}: nu este VT`)
  need(book.chapters.length > 0, `${book.name}: zero capitole`)

  book.chapters.forEach((chapter, index) => {
    need(chapter.number === index + 1, `${book.name}: capitol discontinuu la poziția ${index + 1}`)
    need(text(chapter.title), `${book.name} ${chapter.number}: titlu gol`)
    need(text(chapter.summary), `${book.name} ${chapter.number}: rezumat gol`)
    need(chapter.units.length > 0, `${book.name} ${chapter.number}: zero unități explicative`)
    chapter.units.forEach((unit) => checkLegacyUnit(book, chapter, unit))
    console.log(`[VT chapter review] OK legacy ${book.order}. ${book.name} ${chapter.number}`)
  })
}

function checkOverlaySource(book, chapter, unit) {
  need(unit.source && typeof unit.source === "object", `${book.name} ${chapter.number}: source lipsă`)

  if (unit.source.kind === "poonen") {
    need(text(unit.source.transcript), `${book.name} ${chapter.number}: transcript Poonen lipsă`)
    need(text(unit.source.anchor), `${book.name} ${chapter.number}: anchor Poonen lipsă`)
    return
  }

  if (unit.source.kind === "poonen-official") {
    need(text(unit.source.sourceUrl), `${book.name} ${chapter.number}: URL CFC lipsă`)
    need(text(unit.source.section), `${book.name} ${chapter.number}: secțiune CFC lipsă`)
    return
  }

  if (unit.source.kind === "canonical-exegesis") {
    need(Array.isArray(unit.source.sources) && unit.source.sources.length > 0, `${book.name} ${chapter.number}: canonical-exegesis fără surse`)
    need(unit.source.sources.every((item) => text(item)), `${book.name} ${chapter.number}: canonical-exegesis cu sursă goală`)
    need(text(unit.source.note), `${book.name} ${chapter.number}: canonical-exegesis fără notă`)
    return
  }

  if (unit.source.kind === "biblia-emanus") {
    need(
      unit.source.note === "rezumat narativ fără doctrină adăugată" ||
        unit.source.note === "rezumat textual fără doctrină adăugată",
      `${book.name} ${chapter.number}: note biblia-emanus invalidă`,
    )
    return
  }

  throw new Error(`[VT chapter review] ${book.name} ${chapter.number}: source.kind necunoscut ${unit.source.kind}`)
}

function checkOverlayBook(book) {
  need(book.testament === "vt", `${book.name}: overlay-ul nu este VT`)
  need(book.coverageMode === "full", `${book.name}: overlay-ul nu este full`)
  need(book.status === "published", `${book.name}: explicația overlay nu este published`)
  need(book.chapters.length > 0, `${book.name}: zero capitole overlay`)

  book.chapters.forEach((chapter, index) => {
    need(chapter.number === index + 1, `${book.name}: capitol discontinuu la poziția ${index + 1}`)
    need(text(chapter.title), `${book.name} ${chapter.number}: titlu gol`)
    need(text(chapter.summary), `${book.name} ${chapter.number}: rezumat gol`)
    need(chapter.units.length > 0, `${book.name} ${chapter.number}: zero unități explicative`)

    let previousTo = 0
    for (const unit of chapter.units) {
      need(Number.isInteger(unit.from) && Number.isInteger(unit.to), `${book.name} ${chapter.number}: interval non-integer`)
      need(unit.from === previousTo + 1, `${book.name} ${chapter.number}: gol/suprapunere înainte de ${unit.from}-${unit.to}`)
      need(unit.to >= unit.from, `${book.name} ${chapter.number}: interval invalid ${unit.from}-${unit.to}`)
      need(text(unit.heading), `${book.name} ${chapter.number}: heading gol ${unit.from}-${unit.to}`)
      need(text(unit.teaching), `${book.name} ${chapter.number}: teaching gol ${unit.from}-${unit.to}`)
      need(
        unit.explanationKind === "exposition" || unit.explanationKind === "textual-overview",
        `${book.name} ${chapter.number}: explanationKind invalid ${unit.from}-${unit.to}`,
      )
      checkOverlaySource(book, chapter, unit)

      if (unit.explanationKind === "textual-overview") {
        need(unit.source.kind === "biblia-emanus", `${book.name} ${chapter.number}: textual-overview nu folosește biblia-emanus`)
        need(!text(unit.forYourHeart), `${book.name} ${chapter.number}: textual-overview are forYourHeart`)
        need(!(unit.words?.length > 0), `${book.name} ${chapter.number}: textual-overview are studiu lexical`)
      }

      for (const word of unit.words ?? []) {
        need(word.lexicalSource === "WLC-OSHB", `${book.name} ${chapter.number}: lexicalSource nu este WLC-OSHB`)
        need(text(word.original) && text(word.meaning) && text(word.verseRef), `${book.name} ${chapter.number}: notă lexicală incompletă`)
      }

      previousTo = unit.to
    }

    console.log(`[VT chapter review] OK overlay ${book.order}. ${book.name} ${chapter.number} (1-${previousTo})`)
  })
}

const legacyBooks = [...BIBLE_BOOKS, IMPARATI1].sort((a, b) => a.order - b.order)
const overlayBooks = [...VT_EXPLAINED_FULL_OVERLAYS].sort((a, b) => a.order - b.order)

need(legacyBooks.length === EXPECTED_LEGACY_BOOKS, `legacy books ${legacyBooks.length}/${EXPECTED_LEGACY_BOOKS}`)
need(overlayBooks.length === EXPECTED_OVERLAY_BOOKS, `overlay books ${overlayBooks.length}/${EXPECTED_OVERLAY_BOOKS}`)

legacyBooks.forEach(checkLegacyBook)
overlayBooks.forEach(checkOverlayBook)

const legacyChapterCount = legacyBooks.reduce((sum, book) => sum + book.chapters.length, 0)
const overlayChapterCount = overlayBooks.reduce((sum, book) => sum + book.chapters.length, 0)
const allBooks = [...legacyBooks, ...overlayBooks].sort((a, b) => a.order - b.order)

need(legacyChapterCount === EXPECTED_LEGACY_CHAPTERS, `legacy chapters ${legacyChapterCount}/${EXPECTED_LEGACY_CHAPTERS}`)
need(overlayChapterCount === EXPECTED_OVERLAY_CHAPTERS, `overlay chapters ${overlayChapterCount}/${EXPECTED_OVERLAY_CHAPTERS}`)
need(allBooks.length === EXPECTED_BOOKS, `books ${allBooks.length}/${EXPECTED_BOOKS}`)
need(legacyChapterCount + overlayChapterCount === EXPECTED_CHAPTERS, `chapters ${legacyChapterCount + overlayChapterCount}/${EXPECTED_CHAPTERS}`)

const seenOrders = new Set()
const seenIds = new Set()
for (const book of allBooks) {
  need(!seenOrders.has(book.order), `ordine VT duplicată: ${book.order}`)
  need(!seenIds.has(book.bookId ?? book.id), `book id duplicat: ${book.bookId ?? book.id}`)
  seenOrders.add(book.order)
  seenIds.add(book.bookId ?? book.id)
}
for (let order = 1; order <= EXPECTED_BOOKS; order += 1) {
  need(seenOrders.has(order), `lipsește cartea VT de pe poziția canonică ${order}`)
}

console.log(
  `[VT chapter review] PASS — ${allBooks.length}/${EXPECTED_BOOKS} cărți, ${legacyChapterCount + overlayChapterCount}/${EXPECTED_CHAPTERS} capitole; ` +
    `${legacyChapterCount} legacy + ${overlayChapterCount} overlay. Fiecare capitol are explicație finală, provenance și truth-guards valide.`,
)
