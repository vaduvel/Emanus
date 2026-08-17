import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { reviewEzechiel14And18Explanations } from "./ezechiel14And18ExplanationReview.js"
import { reviewEzechiel16And28Explanations } from "./ezechiel16And28ExplanationReview.js"
import { reviewEzechiel36_43_47_48Explanations } from "./ezechiel36_43_47_48ExplanationReview.js"
import { clarifyEzechiel36LexicalPublication } from "./ezechiel36LexicalPublicationReview.js"
import { restoreEzechiel14PoonenFidelity } from "./ezechiel14PoonenFidelityReview.js"
import { restoreEzechiel36_43_47_48PoonenFidelity } from "./ezechiel36_43_47_48PoonenFidelityReview.js"
import { restoreEzechielPoonenFidelity } from "./ezechielPoonenFidelityReview.js"
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

const EZECHIEL_EDITORIAL_REVIEWED = clarifyEzechiel36LexicalPublication(
  restoreEzechiel14PoonenFidelity(
    restoreEzechiel36_43_47_48PoonenFidelity(
      restoreEzechielPoonenFidelity(
        reviewEzechiel36_43_47_48Explanations(
          reviewEzechiel16And28Explanations(
            reviewEzechiel14And18Explanations(EZECHIEL_EDITORIAL_BASE),
          ),
        ),
      ),
    ),
  ),
)

export const EZECHIEL_EDITORIAL_EXPLAINED = assertCompleteOverlay(EZECHIEL_EDITORIAL_REVIEWED, 48)
