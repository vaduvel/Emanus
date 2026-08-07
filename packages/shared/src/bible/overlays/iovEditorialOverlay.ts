import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { IOV_EXPLAINED as POONEN_BASE } from "./iovOverlay.js"
import { IOV_TEXTUAL_CHAPTERS } from "./iovTextualChapters.js"

const chapters = POONEN_BASE.chapters.map((chapter) => {
  if (chapter.units.length > 0) return chapter
  const textual = IOV_TEXTUAL_CHAPTERS[chapter.number]
  if (!textual) {
    throw new Error(`[Iov ${chapter.number}] lipsește explicația textuală directă.`)
  }
  return textual
})

const IOV_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const IOV_EDITORIAL_EXPLAINED = assertCompleteOverlay(IOV_EDITORIAL_BASE, 42)
