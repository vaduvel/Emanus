import type { ExplainedBookOverlay } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/job.txt"
const source = {
  kind: "poonen" as const,
  transcript,
  anchor:
    "Job 42 ... zero point ... prayed for his friends ... Lord blessed him double ... Pray for those who persecute you. Love those who are your enemies.",
}

export function restoreIov42FinalPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number !== 42) return chapter

      return {
        ...chapter,
        units: chapter.units.map((unit) => {
          if (unit.from === 1 && unit.to === 6) {
            return {
              ...unit,
              teaching:
                `${unit.teaching}\n\nÎn formularea lui Poonen, Iov a ajuns acum la zero în propriii ochi. Acesta este punctul la care Dumnezeu voia să-l aducă, după ce mândria spirituală și autojustificarea ieșiseră la suprafață.`,
              source,
              explanationKind: "exposition" as const,
            }
          }

          if (unit.from === 10 && unit.to === 17) {
            return {
              ...unit,
              teaching:
                `${unit.teaching}\n\nPoonen aplică finalul direct: Dumnezeu îl binecuvântează dublu pe Iov după ce acesta se roagă pentru oamenii care îl acuzaseră. «Vrei ca Domnul să te binecuvânteze dublu? Roagă-te pentru cei care te persecută. Iubește-ți vrăjmașii.»`,
              source,
              explanationKind: "exposition" as const,
            }
          }

          return unit
        }),
      }
    }),
  }
}
