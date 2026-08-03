import type { BibleChapter, BibleUnit } from "./types.js"
import { unuCorinteniPassage, unuCorinteniVerseCount } from "./unuCorinteniText.js"
import { unuCorinteniStatus } from "./unuCorinteniPublication.js"

export interface UnuCorinteniUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface UnuCorinteniChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: UnuCorinteniUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string { return paragraphs.join("\n\n") }

export function unuCorinteniChapter(input: UnuCorinteniChapterInput): BibleChapter {
  const last = unuCorinteniVerseCount(input.number)
  if (!last) throw new Error(`[1 Corinteni] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) throw new Error(`[1 Corinteni] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    expectedNext = to + 1
    return { id: `1-corinteni-${input.number}-${from}-${to}`, ref: `1 Corinteni ${input.number}:${from}-${to}`, heading: unit.heading, text: unuCorinteniPassage(input.number, from, to), teaching: unit.teaching, words: unit.words, crossRefs: unit.crossRefs, forYourHeart: unit.forYourHeart }
  })
  if (expectedNext !== last + 1) throw new Error(`[1 Corinteni] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  return { id: `1-corinteni-${input.number}`, bookId: "1-corinteni", number: input.number, title: input.title, summary: input.summary, literaryContext: input.literaryContext, historicalContext: input.historicalContext, units, prayer: input.prayer, status: unuCorinteniStatus(input.number) }
}
