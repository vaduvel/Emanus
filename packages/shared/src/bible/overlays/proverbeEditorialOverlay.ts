import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { PROVERBE_EXPLAINED as POONEN_BASE } from "./proverbeOverlay.js"
import { PROVERBE_DEEPENED_11_20 } from "./proverbeDeepened11_20.js"
import { PROVERBE_DEEPENED_21_30 } from "./proverbeDeepened21_30.js"
import { PROVERBE_TEXTUAL_CHAPTERS } from "./proverbeTextualChapters.js"

const chapters = POONEN_BASE.chapters.map((chapter) => {
  // Expunerea Poonen are prioritate oriunde transcriptul tratează capitolul.
  if (chapter.units.length > 0) return chapter

  const deepened =
    PROVERBE_DEEPENED_11_20[chapter.number] ??
    PROVERBE_DEEPENED_21_30[chapter.number]
  if (deepened) return deepened

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
