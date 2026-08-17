import SA_1 from "./data/2-samuel/2SA.1.json" with { type: "json" }
import SA_2 from "./data/2-samuel/2SA.2.json" with { type: "json" }
import SA_3 from "./data/2-samuel/2SA.3.json" with { type: "json" }
import SA_4 from "./data/2-samuel/2SA.4.json" with { type: "json" }
import SA_5 from "./data/2-samuel/2SA.5.json" with { type: "json" }
import SA_6 from "./data/2-samuel/2SA.6.json" with { type: "json" }
import SA_7 from "./data/2-samuel/2SA.7.json" with { type: "json" }
import SA_8 from "./data/2-samuel/2SA.8.json" with { type: "json" }
import SA_9 from "./data/2-samuel/2SA.9.json" with { type: "json" }
import SA_10 from "./data/2-samuel/2SA.10.json" with { type: "json" }
import SA_11 from "./data/2-samuel/2SA.11.json" with { type: "json" }
import SA_12 from "./data/2-samuel/2SA.12.json" with { type: "json" }
import SA_13 from "./data/2-samuel/2SA.13.json" with { type: "json" }
import SA_14 from "./data/2-samuel/2SA.14.json" with { type: "json" }
import SA_15 from "./data/2-samuel/2SA.15.json" with { type: "json" }
import SA_16 from "./data/2-samuel/2SA.16.json" with { type: "json" }
import SA_17 from "./data/2-samuel/2SA.17.json" with { type: "json" }
import SA_18 from "./data/2-samuel/2SA.18.json" with { type: "json" }
import SA_19 from "./data/2-samuel/2SA.19.json" with { type: "json" }
import SA_20 from "./data/2-samuel/2SA.20.json" with { type: "json" }
import SA_21 from "./data/2-samuel/2SA.21.json" with { type: "json" }
import SA_22 from "./data/2-samuel/2SA.22.json" with { type: "json" }
import SA_23 from "./data/2-samuel/2SA.23.json" with { type: "json" }
import SA_24 from "./data/2-samuel/2SA.24.json" with { type: "json" }

type RawChapter = {
  translation: string
  bookId: string
  chapter: number
  verses: Array<{ number: number; text: string }>
}

const RAW_CHAPTERS: RawChapter[] = [
  SA_1, SA_2, SA_3, SA_4, SA_5, SA_6, SA_7, SA_8, SA_9, SA_10, SA_11, SA_12,
  SA_13, SA_14, SA_15, SA_16, SA_17, SA_18, SA_19, SA_20, SA_21, SA_22, SA_23, SA_24,
]

const SAMUEL2_TEXT: Record<number, readonly string[]> = Object.fromEntries(
  RAW_CHAPTERS.map((chapter, index) => {
    const expected = index + 1
    if (chapter.translation !== "BE" || chapter.bookId !== "2SA" || chapter.chapter !== expected) {
      throw new Error(`[2 Samuel ${expected}] sursă Biblia Emanus cablată greșit.`)
    }
    chapter.verses.forEach((verse, verseIndex) => {
      if (verse.number !== verseIndex + 1 || !verse.text.trim()) {
        throw new Error(`[2 Samuel ${expected}] verset invalid la poziția ${verseIndex + 1}.`)
      }
    })
    return [expected, chapter.verses.map((verse) => verse.text)]
  }),
)

export function samuel2VerseCount(chapter: number): number {
  const verses = SAMUEL2_TEXT[chapter]
  if (!verses) throw new Error(`[2 Samuel ${chapter}] lipsește textul biblic.`)
  return verses.length
}

export function samuel2Passage(chapter: number, from: number, to: number): string {
  const verses = SAMUEL2_TEXT[chapter]
  if (!verses) throw new Error(`[2 Samuel ${chapter}] lipsește textul biblic.`)
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(`[2 Samuel ${chapter}] interval invalid ${from}-${to}; capitolul are ${verses.length} versete.`)
  }
  return verses.slice(from - 1, to).join(" ")
}

export { SAMUEL2_TEXT }
