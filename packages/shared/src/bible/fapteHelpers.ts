import type { BibleChapter, BibleUnit } from "./types.js"
import { faptePassage, fapteVerseCount } from "./fapteText.js"
import { fapteStatus } from "./faptePublication.js"

export interface FapteUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface FapteChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: FapteUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function fapteChapter(input: FapteChapterInput): BibleChapter {
  const last = fapteVerseCount(input.number)
  if (!last) throw new Error(`[Fapte] capitol inexistent: ${input.number}.`)

  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(
        `[Fapte] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`,
      )
    }
    expectedNext = to + 1

    return {
      id: `fapte-${input.number}-${from}-${to}`,
      ref: `Fapte ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: faptePassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== last + 1) {
    throw new Error(
      `[Fapte] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`,
    )
  }

  return {
    id: `fapte-${input.number}`,
    bookId: "fapte",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: fapteStatus(input.number),
  }
}
