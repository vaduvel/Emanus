import type { BibleChapter, BibleUnit } from "./types.js"
import { coloseniPassage, coloseniVerseCount } from "./coloseniText.js"
import { coloseniStatus } from "./coloseniPublication.js"

export interface ColoseniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface ColoseniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: ColoseniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function coloseniChapter(input: ColoseniChapterInput): BibleChapter {
  const last = coloseniVerseCount(input.number)
  if (!last) throw new Error(`[Coloseni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[Coloseni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `coloseni-${input.number}-${from}-${to}`,
      ref: `Coloseni ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: coloseniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[Coloseni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `coloseni-${input.number}`,
    bookId: "coloseni",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: coloseniStatus(input.number),
  }
}
