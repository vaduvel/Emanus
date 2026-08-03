import type { BibleChapter, BibleUnit } from "./types.js"
import { galateniPassage, galateniVerseCount } from "./galateniText.js"
import { galateniStatus } from "./galateniPublication.js"

export interface GalateniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface GalateniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: GalateniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function galateniChapter(input: GalateniChapterInput): BibleChapter {
  const last = galateniVerseCount(input.number)
  if (!last) throw new Error(`[Galateni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[Galateni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `galateni-${input.number}-${from}-${to}`,
      ref: `Galateni ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: galateniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[Galateni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `galateni-${input.number}`,
    bookId: "galateni",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: galateniStatus(input.number),
  }
}
