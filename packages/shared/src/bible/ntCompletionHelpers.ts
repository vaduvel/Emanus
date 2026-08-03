import type { BibleChapter, BibleUnit } from "./types.js"

export interface NtCompletionBookSpec {
  id: string
  name: string
  passage: (chapter: number, from: number, to: number) => string
  verseCount: (chapter?: number) => number
}

export interface NtCompletionUnitInput {
  verses: readonly [from: number, to: number]
  heading: string
  teaching: string
  crossRefs?: string[]
  forYourHeart?: string
}

export interface NtCompletionChapterInput {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: NtCompletionUnitInput[]
  prayer: string
}

export function ntTeaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function buildNtChapter(spec: NtCompletionBookSpec, input: NtCompletionChapterInput): BibleChapter {
  const last = spec.verseCount(input.number)
  if (!last) throw new Error(`[${spec.name}] capitol inexistent: ${input.number}.`)
  let expectedNext = 1
  const units = input.units.map((unit): BibleUnit => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > last) {
      throw new Error(`[${spec.name}] interval invalid ${input.number}:${from}-${to}; se aștepta ${expectedNext}-${last}.`)
    }
    expectedNext = to + 1
    return {
      id: `${spec.id}-${input.number}-${from}-${to}`,
      ref: `${spec.name} ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: spec.passage(input.number, from, to),
      teaching: unit.teaching,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })
  if (expectedNext !== last + 1) {
    throw new Error(`[${spec.name}] capitolul ${input.number} este incomplet; acoperirea se oprește la ${expectedNext - 1} din ${last}.`)
  }
  return {
    id: `${spec.id}-${input.number}`,
    bookId: spec.id,
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units,
    prayer: input.prayer,
    status: "in_review",
  }
}
