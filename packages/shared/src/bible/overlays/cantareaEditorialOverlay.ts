import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { reviewCantarea01_02_04_05_08Explanations } from "./cantarea01_02_04_05_08ExplanationReview.js"
import { restoreCantarea1FinalPoonenFidelity } from "./cantarea1FinalPoonenFidelityReview.js"
import { CANTAREA_DEEPENED } from "./cantareaDeepened.js"
import { CANTAREA_CANTARILOR_EXPLAINED as POONEN_BASE } from "./cantareaCantarilorOverlay.js"
import { restoreCantareaPoonenFidelity } from "./cantareaPoonenFidelityReview.js"
import { CANTAREA_TEXTUAL_CHAPTERS } from "./cantareaTextualChapters.js"

const chapters = POONEN_BASE.chapters.map((chapter) => {
  if (chapter.units.length > 0) return chapter

  const deepened = CANTAREA_DEEPENED[chapter.number]
  if (deepened) return deepened

  const textual = CANTAREA_TEXTUAL_CHAPTERS[chapter.number]
  if (!textual) {
    throw new Error(`[Cântarea Cântărilor ${chapter.number}] lipsește explicația textuală directă.`)
  }
  return textual
})

const CANTAREA_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

const CANTAREA_EDITORIAL_REVIEWED = restoreCantarea1FinalPoonenFidelity(
  restoreCantareaPoonenFidelity(
    reviewCantarea01_02_04_05_08Explanations(CANTAREA_EDITORIAL_BASE),
  ),
)

export const CANTAREA_EDITORIAL_EXPLAINED = assertCompleteOverlay(CANTAREA_EDITORIAL_REVIEWED, 8)
