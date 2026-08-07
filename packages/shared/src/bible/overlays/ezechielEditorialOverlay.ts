import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { EZECHIEL_EXPLAINED as POONEN_BASE } from "./ezechielOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.ezechiel
const chapters = POONEN_BASE.chapters.map((chapter) =>
  chapter.units.length > 0 ? chapter : textualChapter("Ezechiel", data, chapter.number),
)

const EZECHIEL_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const EZECHIEL_EDITORIAL_EXPLAINED = assertCompleteOverlay(EZECHIEL_EDITORIAL_BASE, 48)
