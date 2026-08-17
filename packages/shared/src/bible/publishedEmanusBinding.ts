import type { BibleBook, BibleUnit } from "./types.js"
import { BIBLIA_EMANUS_TRANSLATION } from "./types.js"
import { PUBLISHED_EMANUS_OT_TEXT_BY_ORDER } from "./generated/publishedEmanusOtText.js"

function parseVerseRange(unit: BibleUnit): readonly [number, number] {
  if (Number.isInteger(unit.verseStart) && Number.isInteger(unit.verseEnd)) {
    return [unit.verseStart as number, unit.verseEnd as number]
  }

  const match = unit.ref.match(/:(\d+)(?:-(\d+))?$/u)
  if (!match) {
    throw new Error(`[Biblia explicată] nu pot determina intervalul de versete pentru ${unit.ref}`)
  }

  const start = Number(match[1])
  const end = Number(match[2] ?? match[1])
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
    throw new Error(`[Biblia explicată] interval invalid pentru ${unit.ref}`)
  }
  return [start, end]
}

export function bindBookToPublishedEmanusText(book: BibleBook): BibleBook {
  if (book.testament !== "vt") return book

  const textBook = PUBLISHED_EMANUS_OT_TEXT_BY_ORDER.get(book.order)
  if (!textBook) {
    throw new Error(`[Biblia explicată] lipsește textul Biblia Emanus pentru ordinea canonică ${book.order} (${book.name}).`)
  }

  const chapters = book.chapters.map((chapter) => {
    const verses = textBook.chapters[chapter.number]
    if (!verses) {
      throw new Error(`[Biblia explicată] lipsește textul Biblia Emanus pentru ${book.name} ${chapter.number}.`)
    }

    return {
      ...chapter,
      status: "published" as const,
      units: chapter.units.map((unit) => {
        const [verseStart, verseEnd] = parseVerseRange(unit)
        if (verseEnd > verses.length) {
          throw new Error(
            `[Biblia explicată] ${unit.ref}: explicația cere v.${verseStart}-${verseEnd}, dar Biblia Emanus are ${verses.length} versete în capitol.`,
          )
        }
        return {
          ...unit,
          verseStart,
          verseEnd,
          text: verses.slice(verseStart - 1, verseEnd).join(" "),
        }
      }),
    }
  })

  return {
    ...book,
    translation: BIBLIA_EMANUS_TRANSLATION,
    chapters,
  }
}
