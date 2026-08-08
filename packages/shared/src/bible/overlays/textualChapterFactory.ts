import type { ExplainedOverlayChapter, ExplainedOverlayUnit } from "../explainedOverlay.js"

const source = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

export type TextualBookData = {
  verseCounts: Readonly<Record<number, number>>
  narratives: Readonly<Record<number, { title: string; summary: string }>>
}

export interface TextualChapterSection {
  from: number
  to: number
  heading: string
  teaching: string
}

function metadata(bookName: string, data: TextualBookData, number: number) {
  const verseCount = data.verseCounts[number]
  const narrative = data.narratives[number]
  if (!verseCount || !narrative) {
    throw new Error(`[${bookName} ${number}] lipsesc metadatele textuale.`)
  }
  return { verseCount, narrative }
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
  const { verseCount, narrative } = metadata(bookName, data, number)
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

/**
 * Variantă aprofundată pentru capitolele pe care transcriptul doctrinar nu le
 * dezvoltă separat. Secțiunile sunt strict descriptive și trebuie să acopere
 * exact toate versetele capitolului, în ordine, fără goluri sau suprapuneri.
 */
export function sectionedTextualChapter(
  bookName: string,
  data: TextualBookData,
  number: number,
  sections: readonly TextualChapterSection[],
): ExplainedOverlayChapter {
  const { verseCount, narrative } = metadata(bookName, data, number)
  if (!sections.length) {
    throw new Error(`[${bookName} ${number}] nu există secțiuni textuale.`)
  }

  let expectedFrom = 1
  const units: ExplainedOverlayUnit[] = sections.map((section) => {
    if (section.from !== expectedFrom) {
      throw new Error(
        `[${bookName} ${number}] acoperire discontinuă: așteptat ${expectedFrom}, găsit ${section.from}.`,
      )
    }
    if (section.to < section.from || section.to > verseCount) {
      throw new Error(
        `[${bookName} ${number}] interval invalid ${section.from}-${section.to}; capitolul are ${verseCount} versete.`,
      )
    }
    expectedFrom = section.to + 1
    return { ...section, source }
  })

  if (expectedFrom !== verseCount + 1) {
    throw new Error(
      `[${bookName} ${number}] acoperirea se oprește la ${expectedFrom - 1}/${verseCount}.`,
    )
  }

  return {
    number,
    title: narrative.title,
    summary: narrative.summary,
    units,
  }
}
