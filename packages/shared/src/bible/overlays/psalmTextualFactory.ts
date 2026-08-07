import type { ExplainedOverlayChapter } from "../explainedOverlay.js"
import { VT_WISDOM_FULL } from "../vtFullNarrativesWisdom.js"

const source = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const verseCounts: Readonly<Record<number, number>> = VT_WISDOM_FULL.psalmi.verseCounts
const narratives: Readonly<Record<number, { title: string; summary: string }>> = VT_WISDOM_FULL.psalmi.narratives

export function textualPsalm(number: number, heading: string, teaching: string): ExplainedOverlayChapter {
  const verseCount = verseCounts[number]
  const narrative = narratives[number]
  if (!verseCount || !narrative) {
    throw new Error(`[Psalm textual] lipsesc metadatele pentru Psalmul ${number}`)
  }
  return {
    number,
    title: narrative.title,
    summary: narrative.summary,
    units: [{ from: 1, to: verseCount, heading, teaching, source }],
  }
}
