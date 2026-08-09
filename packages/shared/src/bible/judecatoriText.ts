import JDG_1 from "./data/judecatori/JDG.1.json" with { type: "json" }
import JDG_2 from "./data/judecatori/JDG.2.json" with { type: "json" }
import JDG_3 from "./data/judecatori/JDG.3.json" with { type: "json" }
import JDG_4 from "./data/judecatori/JDG.4.json" with { type: "json" }
import JDG_5 from "./data/judecatori/JDG.5.json" with { type: "json" }
import JDG_6 from "./data/judecatori/JDG.6.json" with { type: "json" }
import JDG_7 from "./data/judecatori/JDG.7.json" with { type: "json" }
import JDG_8 from "./data/judecatori/JDG.8.json" with { type: "json" }
import JDG_9 from "./data/judecatori/JDG.9.json" with { type: "json" }
import JDG_10 from "./data/judecatori/JDG.10.json" with { type: "json" }
import JDG_11 from "./data/judecatori/JDG.11.json" with { type: "json" }
import JDG_12 from "./data/judecatori/JDG.12.json" with { type: "json" }
import JDG_13 from "./data/judecatori/JDG.13.json" with { type: "json" }
import JDG_14 from "./data/judecatori/JDG.14.json" with { type: "json" }
import JDG_15 from "./data/judecatori/JDG.15.json" with { type: "json" }
import JDG_16 from "./data/judecatori/JDG.16.json" with { type: "json" }
import JDG_17 from "./data/judecatori/JDG.17.json" with { type: "json" }
import JDG_18 from "./data/judecatori/JDG.18.json" with { type: "json" }
import JDG_19 from "./data/judecatori/JDG.19.json" with { type: "json" }
import JDG_20 from "./data/judecatori/JDG.20.json" with { type: "json" }
import JDG_21 from "./data/judecatori/JDG.21.json" with { type: "json" }

type RawJudecatoriChapter = {
  chapter: number
  verses: Array<{ number: number; text: string }>
}

const RAW_CHAPTERS: RawJudecatoriChapter[] = [
  JDG_1,
  JDG_2,
  JDG_3,
  JDG_4,
  JDG_5,
  JDG_6,
  JDG_7,
  JDG_8,
  JDG_9,
  JDG_10,
  JDG_11,
  JDG_12,
  JDG_13,
  JDG_14,
  JDG_15,
  JDG_16,
  JDG_17,
  JDG_18,
  JDG_19,
  JDG_20,
  JDG_21,
]

const JUDECATORI_TEXT: Record<number, readonly string[]> = Object.fromEntries(
  RAW_CHAPTERS.map((chapter) => {
    const expectedChapter = RAW_CHAPTERS.indexOf(chapter) + 1
    if (chapter.chapter !== expectedChapter) {
      throw new Error(
        `[Judecători] capitol cablat greșit: se aștepta ${expectedChapter}, dar fișierul declară ${chapter.chapter}.`,
      )
    }

    chapter.verses.forEach((verse, index) => {
      if (verse.number !== index + 1 || !verse.text.trim()) {
        throw new Error(
          `[Judecători ${chapter.chapter}] verset invalid la poziția ${index + 1}.`,
        )
      }
    })

    return [chapter.chapter, chapter.verses.map((verse) => verse.text)]
  }),
)

export function judecatoriVerseCount(chapter: number): number {
  const verses = JUDECATORI_TEXT[chapter]
  if (!verses) throw new Error(`[Judecători ${chapter}] lipsește textul biblic.`)
  return verses.length
}

export function judecatoriPassage(chapter: number, from: number, to: number): string {
  const verses = JUDECATORI_TEXT[chapter]
  if (!verses) throw new Error(`[Judecători ${chapter}] lipsește textul biblic.`)
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(
      `[Judecători ${chapter}] interval invalid ${from}-${to}; capitolul are ${verses.length} versete.`,
    )
  }
  return verses.slice(from - 1, to).join(" ")
}

export { JUDECATORI_TEXT }
