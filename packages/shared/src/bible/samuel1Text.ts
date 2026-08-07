import SA_1 from "./data/1-samuel/1SA.1.json" with { type: "json" }
import SA_2 from "./data/1-samuel/1SA.2.json" with { type: "json" }
import SA_3 from "./data/1-samuel/1SA.3.json" with { type: "json" }
import SA_4 from "./data/1-samuel/1SA.4.json" with { type: "json" }
import SA_5 from "./data/1-samuel/1SA.5.json" with { type: "json" }
import SA_6 from "./data/1-samuel/1SA.6.json" with { type: "json" }
import SA_7 from "./data/1-samuel/1SA.7.json" with { type: "json" }
import SA_8 from "./data/1-samuel/1SA.8.json" with { type: "json" }
import SA_9 from "./data/1-samuel/1SA.9.json" with { type: "json" }
import SA_10 from "./data/1-samuel/1SA.10.json" with { type: "json" }
import SA_11 from "./data/1-samuel/1SA.11.json" with { type: "json" }
import SA_12 from "./data/1-samuel/1SA.12.json" with { type: "json" }
import SA_13 from "./data/1-samuel/1SA.13.json" with { type: "json" }
import SA_14 from "./data/1-samuel/1SA.14.json" with { type: "json" }
import SA_15 from "./data/1-samuel/1SA.15.json" with { type: "json" }
import SA_16 from "./data/1-samuel/1SA.16.json" with { type: "json" }
import SA_17 from "./data/1-samuel/1SA.17.json" with { type: "json" }
import SA_18 from "./data/1-samuel/1SA.18.json" with { type: "json" }
import SA_19 from "./data/1-samuel/1SA.19.json" with { type: "json" }
import SA_20 from "./data/1-samuel/1SA.20.json" with { type: "json" }
import SA_21 from "./data/1-samuel/1SA.21.json" with { type: "json" }
import SA_22 from "./data/1-samuel/1SA.22.json" with { type: "json" }
import SA_23 from "./data/1-samuel/1SA.23.json" with { type: "json" }
import SA_24 from "./data/1-samuel/1SA.24.json" with { type: "json" }
import SA_25 from "./data/1-samuel/1SA.25.json" with { type: "json" }
import SA_26 from "./data/1-samuel/1SA.26.json" with { type: "json" }
import SA_27 from "./data/1-samuel/1SA.27.json" with { type: "json" }
import SA_28 from "./data/1-samuel/1SA.28.json" with { type: "json" }
import SA_29 from "./data/1-samuel/1SA.29.json" with { type: "json" }
import SA_30 from "./data/1-samuel/1SA.30.json" with { type: "json" }
import SA_31 from "./data/1-samuel/1SA.31.json" with { type: "json" }

type RawChapter = {
  translation: string
  bookId: string
  chapter: number
  verses: Array<{ number: number; text: string }>
}

const RAW_CHAPTERS: RawChapter[] = [
  SA_1, SA_2, SA_3, SA_4, SA_5, SA_6, SA_7, SA_8, SA_9, SA_10,
  SA_11, SA_12, SA_13, SA_14, SA_15, SA_16, SA_17, SA_18, SA_19, SA_20,
  SA_21, SA_22, SA_23, SA_24, SA_25, SA_26, SA_27, SA_28, SA_29, SA_30, SA_31,
]

const SAMUEL1_TEXT: Record<number, readonly string[]> = Object.fromEntries(
  RAW_CHAPTERS.map((chapter, index) => {
    const expected = index + 1
    if (chapter.translation !== "BE" || chapter.bookId !== "1SA" || chapter.chapter !== expected) {
      throw new Error(`[1 Samuel ${expected}] sursă Biblia Emanus cablată greșit.`)
    }
    chapter.verses.forEach((verse, verseIndex) => {
      if (verse.number !== verseIndex + 1 || !verse.text.trim()) {
        throw new Error(`[1 Samuel ${expected}] verset invalid la poziția ${verseIndex + 1}.`)
      }
    })
    return [expected, chapter.verses.map((verse) => verse.text)]
  }),
)

export function samuel1VerseCount(chapter: number): number {
  const verses = SAMUEL1_TEXT[chapter]
  if (!verses) throw new Error(`[1 Samuel ${chapter}] lipsește textul biblic.`)
  return verses.length
}

export function samuel1Passage(chapter: number, from: number, to: number): string {
  const verses = SAMUEL1_TEXT[chapter]
  if (!verses) throw new Error(`[1 Samuel ${chapter}] lipsește textul biblic.`)
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(`[1 Samuel ${chapter}] interval invalid ${from}-${to}; capitolul are ${verses.length} versete.`)
  }
  return verses.slice(from - 1, to).join(" ")
}

export function samuel1WholeChapter(chapter: number): string {
  return samuel1Passage(chapter, 1, samuel1VerseCount(chapter))
}

export { SAMUEL1_TEXT }
