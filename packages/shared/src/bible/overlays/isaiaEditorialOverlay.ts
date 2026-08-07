import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { ISAIA_EXPLAINED as POONEN_BASE } from "./isaiaOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.isaia
const chapters = POONEN_BASE.chapters.map((chapter) =>
  chapter.units.length > 0 ? chapter : textualChapter("Isaia", data, chapter.number),
)

const ISAIA_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const ISAIA_EDITORIAL_EXPLAINED = assertCompleteOverlay(ISAIA_EDITORIAL_BASE, 66)
