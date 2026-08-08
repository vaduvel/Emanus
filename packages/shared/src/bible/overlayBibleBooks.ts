import type { BibleBook, BibleChapter, BibleUnit, WordStudy } from "./types.js"
import { VT_EXPLAINED_OVERLAYS } from "./overlays/index.js"
import {
  VT_CANONICAL_TEXT_BY_BOOK,
  VT_TEMPORARY_TEXT_BOOKS,
} from "./generated/vtCanonicalText/index.js"
import type { ExplainedOverlayUnit } from "./explainedOverlay.js"

function sourceLabel(unit: ExplainedOverlayUnit): string {
  switch (unit.source.kind) {
    case "poonen":
      return "Zac Poonen — transcript"
    case "poonen-official":
      return "Zac Poonen — CFC"
    case "canonical-exegesis":
      return "Emanus — exegeza canonică verificată"
    case "biblia-emanus":
      return "Emanus — rezumat textual"
  }
}

function words(unit: ExplainedOverlayUnit): WordStudy[] | undefined {
  if (!unit.words?.length) return undefined
  return unit.words.map((word) => ({
    original: word.original,
    transliteration: word.transliteration,
    language: word.language,
    meaning: word.meaning,
  }))
}

function unitText(verses: readonly string[], from: number, to: number): string {
  return verses.slice(from - 1, to).join(" ")
}

function toReaderUnit(
  bookName: string,
  bookId: string,
  chapterNumber: number,
  verseTexts: readonly string[],
  unit: ExplainedOverlayUnit,
  index: number,
): BibleUnit {
  const suffix = unit.from === unit.to ? `${unit.from}` : `${unit.from}-${unit.to}`
  return {
    id: `${bookId}-${chapterNumber}-${index + 1}`,
    ref: `${bookName} ${chapterNumber}:${suffix}`,
    heading: unit.heading,
    text: unitText(verseTexts, unit.from, unit.to),
    teaching: unit.teaching,
    words: words(unit),
    forYourHeart: unit.forYourHeart,
    explanationKind: unit.explanationKind,
    explanationSource: sourceLabel(unit),
  }
}

export const VT_OVERLAY_BIBLE_BOOKS: BibleBook[] = VT_EXPLAINED_OVERLAYS.map((overlay) => {
  const textBook = VT_CANONICAL_TEXT_BY_BOOK.get(overlay.bookId)
  if (!textBook) {
    throw new Error(`[${overlay.name}] lipsește textul biblic de lucru materializat.`)
  }

  const temporary = textBook.textStage === "temporary-editorial"
  const chapters: BibleChapter[] = overlay.chapters.map((chapter) => {
    const verseTexts = textBook.chapters[chapter.number]
    if (!verseTexts) {
      throw new Error(`[${overlay.name} ${chapter.number}] lipsește textul biblic de lucru.`)
    }

    return {
      id: `${overlay.bookId}-${chapter.number}`,
      bookId: overlay.bookId,
      number: chapter.number,
      title: chapter.title,
      summary: chapter.summary,
      literaryContext: "",
      historicalContext: "",
      units: chapter.units.map((unit, index) =>
        toReaderUnit(overlay.name, overlay.bookId, chapter.number, verseTexts, unit, index),
      ),
      prayer: "",
      // Explicația poate fi editorial `published`, dar un text biblic de lucru
      // provizoriu nu trebuie deschis în ediția publică. Când Biblia Emanus
      // înlocuiește acel text, statusul explicației se propagă automat aici.
      status: temporary ? "in_review" : overlay.status,
    }
  })

  return {
    id: overlay.bookId,
    name: overlay.name,
    testament: "vt" as const,
    order: overlay.order,
    blurb: temporary
      ? "Text biblic provizoriu pentru lucru editorial, separat de explicație și marcat pentru înlocuire cu Biblia Emanus. Explicația este revizuită separat și nu depinde editorial de această traducere de lucru."
      : "Text Biblia Emanus cu explicația separată de Scriptură. Explicația a fost revizuită editorial independent de textul biblic afișat.",
    chapters,
    translation: textBook.translationLabel,
  }
})

/** Cărți al căror strat explicativ este gata, dar textul biblic trebuie schimbat cu BE înainte de deschiderea publică a capitolului. */
export const VT_OVERLAY_TEMPORARY_TEXTS = VT_TEMPORARY_TEXT_BOOKS

/** Explicațiile nu sunt blocate editorial de traducerea finală. */
export const VT_OVERLAY_TRANSLATION_BLOCKERS = [] as const
