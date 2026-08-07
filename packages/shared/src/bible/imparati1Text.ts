import KI_1 from "./data/1-imparati/1KI.1.json" with { type: "json" }
import KI_2 from "./data/1-imparati/1KI.2.json" with { type: "json" }
import KI_3 from "./data/1-imparati/1KI.3.json" with { type: "json" }
import KI_4 from "./data/1-imparati/1KI.4.json" with { type: "json" }
import KI_5 from "./data/1-imparati/1KI.5.json" with { type: "json" }
import KI_6 from "./data/1-imparati/1KI.6.json" with { type: "json" }
import KI_7 from "./data/1-imparati/1KI.7.json" with { type: "json" }
import KI_8 from "./data/1-imparati/1KI.8.json" with { type: "json" }
import KI_9 from "./data/1-imparati/1KI.9.json" with { type: "json" }
import KI_10 from "./data/1-imparati/1KI.10.json" with { type: "json" }
import KI_11 from "./data/1-imparati/1KI.11.json" with { type: "json" }
import KI_12 from "./data/1-imparati/1KI.12.json" with { type: "json" }
import KI_13 from "./data/1-imparati/1KI.13.json" with { type: "json" }
import KI_14 from "./data/1-imparati/1KI.14.json" with { type: "json" }
import KI_15 from "./data/1-imparati/1KI.15.json" with { type: "json" }
import KI_16 from "./data/1-imparati/1KI.16.json" with { type: "json" }
import KI_17 from "./data/1-imparati/1KI.17.json" with { type: "json" }
import KI_18 from "./data/1-imparati/1KI.18.json" with { type: "json" }
import KI_19 from "./data/1-imparati/1KI.19.json" with { type: "json" }
import KI_20 from "./data/1-imparati/1KI.20.json" with { type: "json" }
import KI_21 from "./data/1-imparati/1KI.21.json" with { type: "json" }
import KI_22 from "./data/1-imparati/1KI.22.json" with { type: "json" }

type RawChapter = {
  translation: string
  bookId: string
  chapter: number
  verses: Array<{ number: number; text: string }>
}

const RAW_CHAPTERS: RawChapter[] = [
  KI_1, KI_2, KI_3, KI_4, KI_5, KI_6, KI_7, KI_8, KI_9, KI_10, KI_11,
  KI_12, KI_13, KI_14, KI_15, KI_16, KI_17, KI_18, KI_19, KI_20, KI_21, KI_22,
]

const IMPARATI1_TEXT: Record<number, readonly string[]> = Object.fromEntries(
  RAW_CHAPTERS.map((chapter, index) => {
    const expected = index + 1
    if (chapter.translation !== "BE" || chapter.bookId !== "1KI" || chapter.chapter !== expected) {
      throw new Error(`[1 Împărați ${expected}] sursă Biblia Emanus cablată greșit.`)
    }
    chapter.verses.forEach((verse, verseIndex) => {
      if (verse.number !== verseIndex + 1 || !verse.text.trim()) {
        throw new Error(`[1 Împărați ${expected}] verset invalid la poziția ${verseIndex + 1}.`)
      }
    })
    return [expected, chapter.verses.map((verse) => verse.text)]
  }),
)

export function imparati1VerseCount(chapter: number): number {
  const verses = IMPARATI1_TEXT[chapter]
  if (!verses) throw new Error(`[1 Împărați ${chapter}] lipsește textul biblic.`)
  return verses.length
}

export function imparati1Passage(chapter: number, from: number, to: number): string {
  const verses = IMPARATI1_TEXT[chapter]
  if (!verses) throw new Error(`[1 Împărați ${chapter}] lipsește textul biblic.`)
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(`[1 Împărați ${chapter}] interval invalid ${from}-${to}; capitolul are ${verses.length} versete.`)
  }
  return verses.slice(from - 1, to).join(" ")
}

export { IMPARATI1_TEXT }
