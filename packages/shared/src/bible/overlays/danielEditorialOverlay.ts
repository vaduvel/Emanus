import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { reviewDaniel03_07_09_10_12Explanations } from "./daniel03_07_09_10_12ExplanationReview.js"
import { reviewDaniel04And06Explanations } from "./daniel04And06ExplanationReview.js"
import { restoreDaniel04And06PoonenFidelity } from "./daniel04And06PoonenFidelityReview.js"
import { restoreDanielPoonenFidelity } from "./danielPoonenFidelityReview.js"
import { DANIEL_EXPLAINED as POONEN_BASE } from "./danielOverlay.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_MAJOR_PROPHETS_FULL.daniel
const chapters = POONEN_BASE.chapters.map((chapter) =>
  chapter.units.length > 0 ? chapter : textualChapter("Daniel", data, chapter.number),
)

const DANIEL_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

const DANIEL_EDITORIAL_REVIEWED = restoreDaniel04And06PoonenFidelity(
  restoreDanielPoonenFidelity(
    reviewDaniel04And06Explanations(
      reviewDaniel03_07_09_10_12Explanations(DANIEL_EDITORIAL_BASE),
    ),
  ),
)

export const DANIEL_EDITORIAL_EXPLAINED = assertCompleteOverlay(DANIEL_EDITORIAL_REVIEWED, 12)
