import type { BibleChapter, BibleUnit } from "./types.js"
import { doiCorinteniPassage, doiCorinteniVerseCount } from "./doiCorinteniText.js"
import { doiCorinteniStatus } from "./doiCorinteniPublication.js"

export interface DoiCorinteniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface DoiCorinteniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: DoiCorinteniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function doiCorinteniChapter(input: DoiCorinteniChapterInput): BibleChapter {
  const last = doiCorinteniVerseCount(input.number)
  if (!last) throw new Error(`[2 Corinteni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[2 Corinteni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `2-corinteni-${input.number}-${from}-${to}`,
      ref: `2 Corinteni ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: doiCorinteniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[2 Corinteni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `2-corinteni-${input.number}`,
    bookId: "2-corinteni",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: doiCorinteniStatus(input.number),
  }
}
