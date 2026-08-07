import { assertCompleteOverlay, type ExplainedBookOverlay, type ExplainedOverlayChapter } from "../explainedOverlay.js"
import { PSALMI_EXPLAINED as POONEN_BASE } from "./psalmiOverlay.js"
import { PSALMI_TEXTUAL_1_25 } from "./psalmiTextual1_25.js"
import { PSALMI_TEXTUAL_26_50 } from "./psalmiTextual26_50.js"
import { PSALMI_TEXTUAL_51_75 } from "./psalmiTextual51_75.js"
import { PSALMI_TEXTUAL_76_100 } from "./psalmiTextual76_100.js"
import { PSALMI_TEXTUAL_101_125 } from "./psalmiTextual101_125.js"
import { PSALMI_TEXTUAL_126_150 } from "./psalmiTextual126_150.js"

const TEXTUAL: Readonly<Record<number, ExplainedOverlayChapter>> = {
  ...PSALMI_TEXTUAL_1_25,
  ...PSALMI_TEXTUAL_26_50,
  ...PSALMI_TEXTUAL_51_75,
  ...PSALMI_TEXTUAL_76_100,
  ...PSALMI_TEXTUAL_101_125,
  ...PSALMI_TEXTUAL_126_150,
}

const chapters = POONEN_BASE.chapters.map((chapter) => {
  // Expunerea Poonen are prioritate. Numai capitolele pe care transcriptul nu le
  // dezvoltă separat sunt înlocuite cu explicația textuală Emanus scrisă direct.
  if (chapter.units.length > 0) return chapter
  const textual = TEXTUAL[chapter.number]
  if (!textual) {
    throw new Error(`[Psalmii ${chapter.number}] lipsește explicația textuală directă.`)
  }
  return textual
})

const PSALMI_EDITORIAL_BASE: ExplainedBookOverlay = {
  ...POONEN_BASE,
  coverageMode: "full",
  chapters,
}

export const PSALMI_EDITORIAL_EXPLAINED = assertCompleteOverlay(PSALMI_EDITORIAL_BASE, 150)
