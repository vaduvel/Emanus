import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { PROVERBE_EXPLAINED as POONEN_BASE } from "./proverbeOverlay.js"
import { PROVERBE_TEXTUAL_CHAPTERS } from "./proverbeTextualChapters.js"

const chapters = POONEN_BASE.chapters.map((chapter) => {
  if (chapter.units.length > 0) return chapter
  const textual = PROVERBE_TEXTUAL_CHAPTERS[chapter.number]
  if (!textual) {
    throw new Error(`[Proverbele ${chapter.number}] lipsește explicația textuală directă.`)
  }
  return textual
})

const PROVERBE_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const PROVERBE_EDITORIAL_EXPLAINED = assertCompleteOverlay(PROVERBE_EDITORIAL_BASE, 31)
