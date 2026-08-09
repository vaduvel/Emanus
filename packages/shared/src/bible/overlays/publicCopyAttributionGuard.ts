import type { ExplainedBookOverlay } from "../explainedOverlay.js"

function clean(value: string): string {
  return value
    .replace(
      /\b(Lectura|Interpretarea|Schema|Predica|Aplicația|Teologia) lui(?=\s+(?:este|rămâne|devine|despre)\b)/giu,
      "$1",
    )
    .replace(
      /\b(lectura|interpretarea|schema|predica|aplicația|teologia) lui(?=\s+(?:este|rămâne|devine|despre)\b)/giu,
      "$1",
    )
}

/**
 * Curăță numai atribuiri rămase fără referent după ascunderea provenance-ului.
 * Nu modifică source, explanationKind sau conținutul doctrinar al unității.
 */
export function guardOverlayPublicAttribution(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      title: clean(chapter.title),
      summary: clean(chapter.summary),
      units: chapter.units.map((unit) => ({
        ...unit,
        heading: clean(unit.heading),
        teaching: clean(unit.teaching),
        forYourHeart: unit.forYourHeart ? clean(unit.forYourHeart) : undefined,
        words: unit.words?.map((word) => ({
          ...word,
          meaning: clean(word.meaning),
        })),
      })),
    })),
  }
}
