import type { BibleChapter, BibleUnit } from "./types.js"
import { lucaPassage, lucaVerseCount } from "./lucaText.js"
import { lucaStatus } from "./lucaPublication.js"

export interface LucaUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface LucaChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: LucaUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function lucaChapter(input: LucaChapterInput): BibleChapter {
  const last = lucaVerseCount(input.number)
  if (!last) throw new Error(`[Luca] capitol inexistent: ${input.number}.`)

  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(
        `[Luca] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`,
      )
    }
    expectedNext = to + 1

    return {
      id: `luca-${input.number}-${from}-${to}`,
      ref: `Luca ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: lucaPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== last + 1) {
    throw new Error(
      `[Luca] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`,
    )
  }

  return {
    id: `luca-${input.number}`,
    bookId: "luca",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: lucaStatus(input.number),
  }
}
