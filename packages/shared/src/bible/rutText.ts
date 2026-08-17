import RUT_1 from "./data/rut/RUT.1.json" with { type: "json" }
import RUT_2 from "./data/rut/RUT.2.json" with { type: "json" }
import RUT_3 from "./data/rut/RUT.3.json" with { type: "json" }
import RUT_4 from "./data/rut/RUT.4.json" with { type: "json" }

type RawRutChapter = {
  translation: string
  bookId: string
  chapter: number
  verses: Array<{ number: number; text: string }>
}

const RAW_CHAPTERS: RawRutChapter[] = [RUT_1, RUT_2, RUT_3, RUT_4]

const RUT_TEXT: Record<number, readonly string[]> = Object.fromEntries(
  RAW_CHAPTERS.map((chapter, index) => {
    const expectedChapter = index + 1
    if (chapter.translation !== "BE" || chapter.bookId !== "RUT") {
      throw new Error(`[Rut ${expectedChapter}] sursa nu este Biblia Emanus.`)
    }
    if (chapter.chapter !== expectedChapter) {
      throw new Error(
        `[Rut] capitol cablat greșit: se aștepta ${expectedChapter}, dar fișierul declară ${chapter.chapter}.`,
      )
    }

    chapter.verses.forEach((verse, verseIndex) => {
      if (verse.number !== verseIndex + 1 || !verse.text.trim()) {
        throw new Error(`[Rut ${chapter.chapter}] verset invalid la poziția ${verseIndex + 1}.`)
      }
    })

    return [chapter.chapter, chapter.verses.map((verse) => verse.text)]
  }),
)

export function rutVerseCount(chapter: number): number {
  const verses = RUT_TEXT[chapter]
  if (!verses) throw new Error(`[Rut ${chapter}] lipsește textul biblic.`)
  return verses.length
}

export function rutPassage(chapter: number, from: number, to: number): string {
  const verses = RUT_TEXT[chapter]
  if (!verses) throw new Error(`[Rut ${chapter}] lipsește textul biblic.`)
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(`[Rut ${chapter}] interval invalid ${from}-${to}; capitolul are ${verses.length} versete.`)
  }
  return verses.slice(from - 1, to).join(" ")
}

export { RUT_TEXT }
