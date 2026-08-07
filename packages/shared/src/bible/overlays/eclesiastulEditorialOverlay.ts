import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { ECLESIASTUL_EXPLAINED as POONEN_BASE } from "./eclesiastulOverlay.js"
import { ECLESIASTUL_TEXTUAL_CHAPTERS } from "./eclesiastulTextualChapters.js"

const chapters = POONEN_BASE.chapters.map((chapter) => {
  if (chapter.units.length > 0) return chapter
  const textual = ECLESIASTUL_TEXTUAL_CHAPTERS[chapter.number]
  if (!textual) {
    throw new Error(`[Eclesiastul ${chapter.number}] lipsește explicația textuală directă.`)
  }
  return textual
})

const ECLESIASTUL_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const ECLESIASTUL_EDITORIAL_EXPLAINED = assertCompleteOverlay(ECLESIASTUL_EDITORIAL_BASE, 12)
