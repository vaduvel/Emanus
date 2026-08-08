import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { ISAIA_DEEPENED_02_20 } from "./isaiaDeepened02_20.js"
import { ISAIA_DEEPENED_21_39 } from "./isaiaDeepened21_39.js"
import { ISAIA_DEEPENED_41_65 } from "./isaiaDeepened41_65.js"
import { ISAIA_EXPLAINED as POONEN_BASE } from "./isaiaOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.isaia
const chapters = POONEN_BASE.chapters.map((chapter) => {
  // Expunerea Poonen are prioritate oriunde transcriptul tratează capitolul.
  if (chapter.units.length > 0) return chapter

  const deepened =
    ISAIA_DEEPENED_02_20[chapter.number] ??
    ISAIA_DEEPENED_21_39[chapter.number] ??
    ISAIA_DEEPENED_41_65[chapter.number]
  if (deepened) return deepened

  return textualChapter("Isaia", data, chapter.number)
})

const ISAIA_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const ISAIA_EDITORIAL_EXPLAINED = assertCompleteOverlay(ISAIA_EDITORIAL_BASE, 66)
