import type { BibleChapter, BibleUnit, WordStudy } from "./types.js"
import { exodPassage, exodVerseCount } from "./exodText.js"
import { exodStatus } from "./exodPublication.js"

/*
 * Helperi pentru cartea Exod.
 * Textul biblic vine din exodText.ts și nu se scrie de mână în fișierele de capitol.
 * Helperul verifică acoperirea: unitățile trebuie să meargă din verset în verset,
 * fără goluri și fără suprapuneri, până la ultimul verset al capitolului.
 */

export type ExodUnitInput = {
  verses: readonly [number, number]
  heading: string
  teaching: string
  words?: readonly WordStudy[]
  crossRefs?: readonly string[]
  forYourHeart?: string
}

export type ExodChapterInput = {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: readonly ExodUnitInput[]
  prayer: string
}

/** Leagă paragrafele explicației cu rând liber între ele. */
export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function exodChapter(input: ExodChapterInput): BibleChapter {
  const expectedLast = exodVerseCount(input.number)
  let expectedNext = 1

  const units: BibleUnit[] = input.units.map((unit) => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > expectedLast) {
      throw new Error(
        `[Exod ${input.number}] interval invalid ${from}-${to}; se aștepta de la ${expectedNext} până la ${expectedLast}.`,
      )
    }
    expectedNext = to + 1
    return {
      id: `exod-${input.number}-${from}-${to}`,
      ref:
        from === to
          ? `Exod ${input.number}:${from}`
          : `Exod ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: exodPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words ? [...unit.words] : undefined,
      crossRefs: unit.crossRefs ? [...unit.crossRefs] : undefined,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext - 1 !== expectedLast) {
    throw new Error(
      `[Exod ${input.number}] capitol incomplet; acoperirea se oprește la versetul ${expectedNext - 1} din ${expectedLast}.`,
    )
  }

  return {
    id: `exod-${input.number}`,
    bookId: "exod",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: exodStatus(input.number),
  }
}
