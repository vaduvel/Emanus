import type { BibleBook, BibleChapter, BibleUnit, WordStudy } from "./types.js"
import { BIBLIA_EMANUS_TRANSLATION } from "./types.js"
import { VT_EXPLAINED_OVERLAYS } from "./overlays/index.js"
import { PUBLISHED_EMANUS_OT_TEXT_BY_ORDER } from "./generated/publishedEmanusOtText.js"
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
    verseStart: unit.from,
    verseEnd: unit.to,
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
  const textBook = PUBLISHED_EMANUS_OT_TEXT_BY_ORDER.get(overlay.order)
  if (!textBook) {
    throw new Error(`[${overlay.name}] lipsește textul publicat Biblia Emanus.`)
  }

  const chapters: BibleChapter[] = overlay.chapters.map((chapter) => {
    const verseTexts = textBook.chapters[chapter.number]
    if (!verseTexts) {
      throw new Error(`[${overlay.name} ${chapter.number}] lipsește textul publicat Biblia Emanus.`)
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

  return {
    id: overlay.bookId,
    name: overlay.name,
    testament: "vt" as const,
    order: overlay.order,
    blurb:
      "Text Biblia Emanus publicat, cu explicația separată de Scriptură. Explicația a fost revizuită editorial independent și este legată de intervalele canonice de versete.",
    chapters,
    translation: BIBLIA_EMANUS_TRANSLATION,
  }
})

/** Nu mai există texte VT provizorii în catalogul final al Bibliei explicate. */
export const VT_OVERLAY_TEMPORARY_TEXTS = [] as const

/** Explicațiile nu mai au blocker de traducere pentru VT: Biblia Emanus este publicată. */
export const VT_OVERLAY_TRANSLATION_BLOCKERS = [] as const
