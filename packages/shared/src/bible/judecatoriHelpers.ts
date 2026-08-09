import type { BibleChapter, BibleUnit, WordStudy } from "./types.js"
import { judecatoriPassage, judecatoriVerseCount } from "./judecatoriText.js"

export type JudecatoriUnitInput = {
  verses: readonly [number, number]
  heading: string
  teaching: string
  words?: readonly WordStudy[]
  crossRefs?: readonly string[]
  forYourHeart?: string
}

export type JudecatoriChapterInput = {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: readonly JudecatoriUnitInput[]
  prayer: string
  status: "draft" | "in_review" | "published"
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function judecatoriChapter(input: JudecatoriChapterInput): BibleChapter {
  const expectedLast = judecatoriVerseCount(input.number)
  let expectedNext = 1

  const units: BibleUnit[] = input.units.map((unit) => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > expectedLast) {
      throw new Error(
        `[Judecători ${input.number}] interval invalid ${from}-${to}; se aștepta ${expectedNext}-${expectedLast}.`,
      )
    }
    expectedNext = to + 1
    return {
      id: `judecatori-${input.number}-${from}-${to}`,
      ref: from === to ? `Judecători ${input.number}:${from}` : `Judecători ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: judecatoriPassage(input.number, from, to),
      teaching: unit.teaching,
      words: unit.words ? [...unit.words] : undefined,
      crossRefs: unit.crossRefs ? [...unit.crossRefs] : undefined,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== expectedLast + 1) {
    throw new Error(
      `[Judecători ${input.number}] capitol incomplet; acoperirea se oprește la ${expectedNext - 1} din ${expectedLast}.`,
    )
  }

  return {
    id: `judecatori-${input.number}`,
    bookId: "judecatori",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: input.status,
  }
}
