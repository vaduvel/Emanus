import type { ExplainedOverlayChapter, ExplainedOverlayUnit } from "../explainedOverlay.js"
import { VT_WISDOM_FULL } from "../vtFullNarrativesWisdom.js"

const source = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const verseCounts: Readonly<Record<number, number>> = VT_WISDOM_FULL.psalmi.verseCounts
const narratives: Readonly<Record<number, { title: string; summary: string }>> = VT_WISDOM_FULL.psalmi.narratives

export interface TextualPsalmSection {
  from: number
  to: number
  heading: string
  teaching: string
}

function metadata(number: number) {
  const verseCount = verseCounts[number]
  const narrative = narratives[number]
  if (!verseCount || !narrative) {
    throw new Error(`[Psalm textual] lipsesc metadatele pentru Psalmul ${number}`)
  }
  return { verseCount, narrative }
}

export function textualPsalm(number: number, heading: string, teaching: string): ExplainedOverlayChapter {
  const { verseCount, narrative } = metadata(number)
  return {
    number,
    title: narrative.title,
    summary: narrative.summary,
    units: [{ from: 1, to: verseCount, heading, teaching, source }],
  }
}

/**
 * Materializează un psalm în unități textuale mai mici fără a inventa doctrină.
 * Secțiunile trebuie să acopere exact toate versetele, în ordine, fără goluri
 * sau suprapuneri. Asta împiedică o explicație „mai detaliată” să piardă text.
 */
export function sectionedPsalm(
  number: number,
  sections: readonly TextualPsalmSection[],
): ExplainedOverlayChapter {
  const { verseCount, narrative } = metadata(number)
  if (!sections.length) {
    throw new Error(`[Psalm textual ${number}] nu există secțiuni.`)
  }

  let expectedFrom = 1
  const units: ExplainedOverlayUnit[] = sections.map((section) => {
    if (section.from !== expectedFrom) {
      throw new Error(
        `[Psalm textual ${number}] acoperire discontinuă: așteptat ${expectedFrom}, găsit ${section.from}.`,
      )
    }
    if (section.to < section.from || section.to > verseCount) {
      throw new Error(
        `[Psalm textual ${number}] interval invalid ${section.from}-${section.to}; psalmul are ${verseCount} versete.`,
      )
    }
    expectedFrom = section.to + 1
    return { ...section, source }
  })

  if (expectedFrom !== verseCount + 1) {
    throw new Error(
      `[Psalm textual ${number}] acoperirea se oprește la ${expectedFrom - 1}/${verseCount}.`,
    )
  }

  return {
    number,
    title: narrative.title,
    summary: narrative.summary,
    units,
  }
}
