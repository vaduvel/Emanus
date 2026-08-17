import type { ExplainedBookOverlay } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/song-of-solomon.txt"

export function restoreCantarea1FinalPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number !== 1) return chapter

      return {
        ...chapter,
        units: chapter.units.map((unit) => {
          if (unit.from !== 1 || unit.to !== 4) return unit

          return {
            ...unit,
            teaching:
              `${unit.teaching}\n\nPoonen cere ca această carte să fie citită și în cheia relației Hristos și Biserica: iubirea miresei pentru mire devine imagine a devoțiunii Bisericii față de Hristos.`,
            source: {
              kind: "poonen" as const,
              transcript,
              anchor:
                "Song of Solomon ... basically teaches two things ... sexual relationship and marriage ... Christ and the church",
            },
            explanationKind: "exposition" as const,
          }
        }),
      }
    }),
  }
}
