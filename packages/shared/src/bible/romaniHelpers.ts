import type { BibleChapter, BibleUnit } from "./types.js"
import { romaniPassage, romaniVerseCount } from "./romaniText.js"
import { romaniStatus } from "./romaniPublication.js"

export interface RomaniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface RomaniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: RomaniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function romaniChapter(input: RomaniChapterInput): BibleChapter {
  const last = romaniVerseCount(input.number)
  if (!last) throw new Error(`[Romani] capitol inexistent: ${input.number}.`)

  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(
        `[Romani] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`,
      )
    }
    expectedNext = to + 1

    return {
      id: `romani-${input.number}-${from}-${to}`,
      ref: `Romani ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: romaniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== last + 1) {
    throw new Error(
      `[Romani] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`,
    )
  }

  return {
    id: `romani-${input.number}`,
    bookId: "romani",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: romaniStatus(input.number),
  }
}
