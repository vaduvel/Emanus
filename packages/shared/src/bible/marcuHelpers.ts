import type { BibleChapter, BibleUnit } from "./types.js"
import { marcuPassage, marcuVerseCount } from "./marcuText.js"
import { marcuStatus } from "./marcuPublication.js"

export interface MarcuUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface MarcuChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: MarcuUnitInput[]
  prayer: string
}

/** Unește paragrafele explicației fără să amestece textul biblic cu comentariul. */
export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

/**
 * Construiește un capitol din intervale de versete și oprește imediat orice
 * gol, suprapunere sau verset în afara capitolului.
 */
export function marcuChapter(input: MarcuChapterInput): BibleChapter {
  const expectedLast = marcuVerseCount(input.number)
  let expectedNext = 1

  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > expectedLast) {
      throw new Error(
        `[Marcu ${input.number}] interval invalid ${from}-${to}; se aștepta de la ${expectedNext} până la ${expectedLast}.`,
      )
    }
    expectedNext = to + 1

    return {
      id: `marcu-${input.number}-${from}-${to}`,
      ref: from === to ? `Marcu ${input.number}:${from}` : `Marcu ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: marcuPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== expectedLast + 1) {
    throw new Error(
      `[Marcu ${input.number}] capitol incomplet; acoperirea se oprește la versetul ${expectedNext - 1} din ${expectedLast}.`,
    )
  }

  return {
    id: `marcu-${input.number}`,
    bookId: "marcu",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: marcuStatus(input.number),
  }
}
