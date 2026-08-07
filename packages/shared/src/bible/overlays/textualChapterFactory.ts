import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const source = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

type TextualBookData = {
  verseCounts: Readonly<Record<number, number>>
  narratives: Readonly<Record<number, { title: string; summary: string }>>
}

/**
 * Materializează explicit un capitol pe baza textului/rezumatului editorial al cărții.
 * Nu introduce doctrină, aplicație pastorală sau studiu lexical.
 */
export function textualChapter(
  bookName: string,
  data: TextualBookData,
  number: number,
): ExplainedOverlayChapter {
  const verseCount = data.verseCounts[number]
  const narrative = data.narratives[number]
  if (!verseCount || !narrative) {
    throw new Error(`[${bookName} ${number}] lipsesc metadatele textuale.`)
  }
  return {
    number,
    title: narrative.title,
    summary: narrative.summary,
    units: [
      {
        from: 1,
        to: verseCount,
        heading: narrative.title,
        teaching: narrative.summary,
        source,
      },
    ],
  }
}
