import type { ExplainedBookOverlay } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/job.txt"
const source = {
  kind: "poonen" as const,
  transcript,
  anchor:
    "Job 26-31 ... all self-justification ... spiritual pride ... pride in his godliness ... chapter 31 ... conscious of all these things ... pride in his righteousness",
}

export function restoreIov31FinalPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number !== 31) return chapter

      return {
        ...chapter,
        units: chapter.units.map((unit) => {
          if (unit.from === 1 && unit.to === 12) {
            return {
              ...unit,
              teaching:
                `${unit.teaching}\n\nPoonen numește aceasta mândrie spirituală: mândrie în faptul că ești un om bun și curat. Curăția lui Iov era reală, dar el devenise conștient de propria evlavie și se sprijinea pe dosarul ei.`,
              source,
              explanationKind: "exposition" as const,
            }
          }

          if ((unit.from === 13 && unit.to === 28) || (unit.from === 29 && unit.to === 40)) {
            return {
              ...unit,
              teaching:
                `${unit.teaching}\n\nÎn lectura lui Poonen, discursurile lui devin autojustificare: Iov enumeră binele real pe care l-a făcut, dar încă nu vede mândria din propria lui dreptate. Dumnezeu îl va smeri prin revelația măreției Sale, nu prin acuzațiile false ale prietenilor.`,
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
