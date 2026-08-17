import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { PLANGERILE_DEEPENED } from "./plangerileDeepened.js"
import { PLANGERILE_EXPLAINED as POONEN_BASE } from "./plangerileOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.plangerile
const chapters = POONEN_BASE.chapters.map((chapter) => {
  const hasExposition = chapter.units.some((unit) => unit.source.kind !== "biblia-emanus")
  if (hasExposition) return chapter

  const deepened = PLANGERILE_DEEPENED[chapter.number]
  if (deepened) return deepened

  return textualChapter("Plângerile", data, chapter.number)
})

const PLANGERILE_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const PLANGERILE_EDITORIAL_EXPLAINED = assertCompleteOverlay(PLANGERILE_EDITORIAL_BASE, 5)
