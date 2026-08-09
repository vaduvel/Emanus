import type { ExplainedBookOverlay } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/job.txt"
const source = {
  kind: "poonen" as const,
  transcript,
  anchor:
    "Job 26-31 ... all self-justification ... extremely helpful man ... spiritual pride ... pride in his godliness ... he was godly and proud of it",
}

export function restoreIov29FinalPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number !== 29) return chapter

      return {
        ...chapter,
        title: "Iov 29 — Un om evlavios care era mândru de evlavia lui",
        summary:
          "Iov își amintește binele real pe care îl făcuse și respectul de care se bucurase. Poonen vede însă în discursurile din Iov 26–31 autojustificarea unui om cu adevărat evlavios care încă nu vedea mândria spirituală — mândria în propria lui evlavie și dreptate.",
        units: chapter.units.map((unit) => {
          if (unit.from === 1 && unit.to === 11) {
            return {
              ...unit,
              teaching:
                `${unit.teaching}\n\nPoonen numește direct problema ascunsă aici «mândria spirituală»: Iov era un om evlavios, dar era mândru de evlavia lui. Discursurile din capitolele 26–31 devin autojustificare tocmai fiindcă Iov este foarte conștient de binele real pe care îl făcuse.`,
              source,
              explanationKind: "exposition" as const,
            }
          }

          if (unit.from === 12 && unit.to === 25) {
            return {
              ...unit,
              teaching:
                `${unit.teaching}\n\nDiagnosticul lui Poonen nu este că binele lui Iov ar fi fost fals. El spune că Iov avea «mândrie în propria lui evlavie»: era evlavios și mândru de aceasta, iar conștiința propriei dreptăți îi alimenta autojustificarea.`,
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
