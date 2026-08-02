import type { BibleChapter, BibleUnit } from "./types.js"
import { filimonPassage, filimonVerseCount } from "./filimonText.js"
import { filimonStatus } from "./filimonPublication.js"

export interface FilimonUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  words?: BibleUnit["words"]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface FilimonChapterInput {
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: FilimonUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function filimonChapter(input: FilimonChapterInput): BibleChapter {
  const last = filimonVerseCount()
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[Filimon] interval invalid ${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `filimon-1-${from}-${to}`,
      ref: `Filimon 1:${from}-${to}`,
      heading: unit.heading,
      text: filimonPassage(from, to),
      teaching: unit.teaching,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[Filimon] capitol incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: "filimon-1",
    bookId: "filimon",
    number: 1,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: filimonStatus(1),
  }
}
