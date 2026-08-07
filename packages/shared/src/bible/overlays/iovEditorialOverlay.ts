import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { VT_WISDOM_FULL } from "../vtFullNarrativesWisdom.js"
import { IOV_EXPLAINED as POONEN_BASE } from "./iovOverlay.js"
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

export const IOV_EDITORIAL_EXPLAINED = assertCompleteOverlay(IOV_EDITORIAL_BASE, 42)
