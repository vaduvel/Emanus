import type { BibleChapter, BibleUnit } from "./types.js"
import { efeseniPassage, efeseniVerseCount } from "./efeseniText.js"
import { efeseniStatus } from "./efeseniPublication.js"

export interface EfeseniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface EfeseniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: EfeseniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function efeseniChapter(input: EfeseniChapterInput): BibleChapter {
  const last = efeseniVerseCount(input.number)
  if (!last) throw new Error(`[Efeseni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[Efeseni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `efeseni-${input.number}-${from}-${to}`,
      ref: `Efeseni ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: efeseniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[Efeseni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `efeseni-${input.number}`,
    bookId: "efeseni",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: efeseniStatus(input.number),
  }
}
