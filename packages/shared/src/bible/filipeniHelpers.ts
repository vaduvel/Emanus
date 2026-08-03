import type { BibleChapter, BibleUnit } from "./types.js"
import { filipeniPassage, filipeniVerseCount } from "./filipeniText.js"
import { filipeniStatus } from "./filipeniPublication.js"

export interface FilipeniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface FilipeniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: FilipeniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function filipeniChapter(input: FilipeniChapterInput): BibleChapter {
  const last = filipeniVerseCount(input.number)
  if (!last) throw new Error(`[Filipeni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[Filipeni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `filipeni-${input.number}-${from}-${to}`,
      ref: `Filipeni ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: filipeniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[Filipeni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `filipeni-${input.number}`,
    bookId: "filipeni",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: filipeniStatus(input.number),
  }
}
