import type { BibleBook, BibleChapter, BibleUnit, WordStudy } from "./types.js"
import { BIBLIA_EMANUS_TRANSLATION } from "./types.js"
import { VT_EXPLAINED_OVERLAYS } from "./overlays/index.js"
import {
  VT_CANONICAL_TEXT_BY_BOOK,
  VT_CANONICAL_TEXT_BLOCKED,
} from "./generated/vtCanonicalText/index.js"
import type { ExplainedOverlayUnit } from "./explainedOverlay.js"

function sourceLabel(unit: ExplainedOverlayUnit): string {
  switch (unit.source.kind) {
    case "poonen":
      return "Zac Poonen — transcript"
    case "poonen-official":
      return "Zac Poonen — CFC"
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

export const VT_OVERLAY_BIBLE_BOOKS: BibleBook[] = VT_EXPLAINED_OVERLAYS.flatMap((overlay) => {
  const textBook = VT_CANONICAL_TEXT_BY_BOOK.get(overlay.bookId)
  if (!textBook) return []

  const chapters: BibleChapter[] = overlay.chapters.map((chapter) => {
    const verseTexts = textBook.chapters[chapter.number]
    if (!verseTexts) {
      throw new Error(`[${overlay.name} ${chapter.number}] lipsește textul Biblia Emanus materializat.`)
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
      status: overlay.status,
    }
  })

  return [{
    id: overlay.bookId,
    name: overlay.name,
    testament: "vt" as const,
    order: overlay.order,
    blurb:
      "Text Biblia Emanus cu explicația separată de Scriptură. Expunerea doctrinară este trasabilă la Zac Poonen; pasajele pe care sursa nu le dezvoltă primesc numai rezumat textual Emanus.",
    chapters,
    translation: BIBLIA_EMANUS_TRANSLATION,
  }]
})

export const VT_OVERLAY_TRANSLATION_BLOCKERS = VT_CANONICAL_TEXT_BLOCKED
