import { assertCompleteOverlay, type ExplainedBookOverlay } from "../explainedOverlay.js"
import { CANTAREA_CANTARILOR_EXPLAINED as POONEN_BASE } from "./cantareaCantarilorOverlay.js"
import { CANTAREA_TEXTUAL_CHAPTERS } from "./cantareaTextualChapters.js"

const chapters = POONEN_BASE.chapters.map((chapter) => {
  if (chapter.units.length > 0) return chapter
  const textual = CANTAREA_TEXTUAL_CHAPTERS[chapter.number]
  if (!textual) {
    throw new Error(`[Cântarea Cântărilor ${chapter.number}] lipsește explicația textuală directă.`)
  }
  return textual
})

const CANTAREA_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const CANTAREA_EDITORIAL_EXPLAINED = assertCompleteOverlay(CANTAREA_EDITORIAL_BASE, 8)
