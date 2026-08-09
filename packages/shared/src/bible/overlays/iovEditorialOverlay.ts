import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_WISDOM_FULL } from "../vtFullNarrativesWisdom.js"
import { reviewIov29_31_38_40_42Explanations } from "./iov29_31_38_40_42ExplanationReview.js"
import { restoreIov29FinalPoonenFidelity } from "./iov29FinalPoonenFidelityReview.js"
import { IOV_EXPLAINED as POONEN_BASE } from "./iovOverlay.js"
import { restoreIovPoonenFidelity } from "./iovPoonenFidelityReview.js"
import { IOV_TEXTUAL_CHAPTERS } from "./iovTextualChapters.js"
import { textualChapter } from "./textualChapterFactory.js"

const data = VT_WISDOM_FULL.iov
const chapters = POONEN_BASE.chapters.map((chapter) => {
  if (chapter.units.length > 0) return chapter
  return IOV_TEXTUAL_CHAPTERS[chapter.number] ?? textualChapter("Iov", data, chapter.number)
})

const IOV_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

const IOV_EDITORIAL_REVIEWED = restoreIov29FinalPoonenFidelity(
  restoreIovPoonenFidelity(
    reviewIov29_31_38_40_42Explanations(IOV_EDITORIAL_BASE),
  ),
)

export const IOV_EDITORIAL_EXPLAINED = assertCompleteOverlay(IOV_EDITORIAL_REVIEWED, 42)
