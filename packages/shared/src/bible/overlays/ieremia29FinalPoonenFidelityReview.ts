import type { ExplainedBookOverlay } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/jeremiah-lamentations.txt"

export function restoreIeremia29FinalPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number !== 29) return chapter

      return {
        ...chapter,
        units: chapter.units.map((unit) => {
          if (unit.from !== 10 || unit.to !== 14) return unit

          return {
            ...unit,
            teaching:
              `${unit.teaching}\n\nPoonen formulează chemarea direct: caută pe Dumnezeu din toată inima. Dacă nu-L cauți din toată inima, nu-L vei găsi; ieșirea spirituală din Babilon spre Ierusalim și spre biserica adevărată începe cu această căutare fără rezervă.`,
            source: {
              kind: "poonen" as const,
              transcript,
              anchor:
                "Jeremiah 29 ... movement from Babylon to Jerusalem to the true church ... seek Me with all your heart ... If you don't seek Me wholeheartedly, you will not find Me",
            },
            explanationKind: "exposition" as const,
          }
        }),
      }
    }),
  }
}
