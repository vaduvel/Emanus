import type { BibleChapter, BibleUnit } from "./types.js"
import { unuTesaloniceniPassage, unuTesaloniceniVerseCount } from "./unuTesaloniceniText.js"
import { unuTesaloniceniStatus } from "./unuTesaloniceniPublication.js"

export interface UnuTesaloniceniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface UnuTesaloniceniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: UnuTesaloniceniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function unuTesaloniceniChapter(input: UnuTesaloniceniChapterInput): BibleChapter {
  const last = unuTesaloniceniVerseCount(input.number)
  if (!last) throw new Error(`[1 Tesaloniceni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[1 Tesaloniceni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `1-tesaloniceni-${input.number}-${from}-${to}`,
      ref: `1 Tesaloniceni ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: unuTesaloniceniPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[1 Tesaloniceni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `1-tesaloniceni-${input.number}`,
    bookId: "1-tesaloniceni",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: unuTesaloniceniStatus(input.number),
  }
}
