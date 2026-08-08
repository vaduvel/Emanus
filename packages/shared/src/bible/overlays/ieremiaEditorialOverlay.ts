import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { IEREMIA_DEEPENED_08_22 } from "./ieremiaDeepened08_22.js"
import { IEREMIA_EXPLAINED as POONEN_BASE } from "./ieremiaOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.ieremia
const chapters = POONEN_BASE.chapters.map((chapter) => {
  // Expunerea Poonen are prioritate oriunde transcriptul tratează capitolul.
  if (chapter.units.length > 0) return chapter

  const deepened = IEREMIA_DEEPENED_08_22[chapter.number]
  if (deepened) return deepened

  return textualChapter("Ieremia", data, chapter.number)
})

const IEREMIA_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const IEREMIA_EDITORIAL_EXPLAINED = assertCompleteOverlay(IEREMIA_EDITORIAL_BASE, 52)
