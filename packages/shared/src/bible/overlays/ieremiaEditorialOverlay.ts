import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { IEREMIA_DEEPENED_08_22 } from "./ieremiaDeepened08_22.js"
import { IEREMIA_DEEPENED_24_40 } from "./ieremiaDeepened24_40.js"
import { IEREMIA_DEEPENED_41_52 } from "./ieremiaDeepened41_52.js"
import { reviewIeremia23_29_31Explanations } from "./ieremia23_29_31ExplanationReview.js"
import { IEREMIA_EXPLAINED as POONEN_BASE } from "./ieremiaOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.ieremia
const chapters = POONEN_BASE.chapters.map((chapter) => {
  // Expunerea Poonen are prioritate oriunde transcriptul tratează capitolul.
  if (chapter.units.length > 0) return chapter

  const deepened =
    IEREMIA_DEEPENED_08_22[chapter.number] ??
    IEREMIA_DEEPENED_24_40[chapter.number] ??
    IEREMIA_DEEPENED_41_52[chapter.number]
  if (deepened) return deepened

  return textualChapter("Ieremia", data, chapter.number)
})

const IEREMIA_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

const IEREMIA_EDITORIAL_REVIEWED = reviewIeremia23_29_31Explanations(IEREMIA_EDITORIAL_BASE)

export const IEREMIA_EDITORIAL_EXPLAINED = assertCompleteOverlay(IEREMIA_EDITORIAL_REVIEWED, 52)
