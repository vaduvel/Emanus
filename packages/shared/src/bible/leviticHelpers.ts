import type { BibleChapter, BibleUnit, WordStudy } from "./types.js"
import { leviticPassage, leviticVerseCount } from "./leviticText.js"
import { leviticStatus } from "./leviticPublication.js"

/*
 * Ajutoarele cărții Levitic.
 *
 * Același tipar ca la Exod: textul biblic stă separat, în leviticText.ts
 * (fișierele leviticTextN.ts), iar aici se adună unitățile de sens și se
 * verifică să acopere capitolul de la primul până la ultimul verset.
 */

export type LeviticUnitInput = {
  verses: [number, number]
  heading: string
  teaching: string
  words?: WordStudy[]
  crossRefs?: string[]
  forYourHeart?: string
}

export type LeviticChapterInput = {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: LeviticUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function leviticChapter(input: LeviticChapterInput): BibleChapter {
  const expectedLast = leviticVerseCount(input.number)
  let expectedNext = 1

  const units: BibleUnit[] = input.units.map((unit) => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > expectedLast) {
      throw new Error(
        `[Levitic ${input.number}] interval invalid ${from}-${to}; se aștepta de la ${expectedNext} până la ${expectedLast}.`,
      )
    }
    expectedNext = to + 1

    return {
      id: `levitic-${input.number}-${from}-${to}`,
      ref: `Levitic ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: leviticPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== expectedLast + 1) {
    throw new Error(
      `[Levitic ${input.number}] capitol incomplet; acoperirea se oprește la versetul ${expectedNext - 1} din ${expectedLast}.`,
    )
  }

  return {
    id: `levitic-${input.number}`,
    bookId: "levitic",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: leviticStatus(input.number),
  }
}
