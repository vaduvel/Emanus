import type { BibleChapter, BibleUnit } from "./types.js"

const IOSUA_LEGACY_EXPLANATION_SOURCE =
  "Emanus legacy synthesis — Zac Poonen, Through The Bible: Joshua + biblical text/cross-references"
const HEBREW_WORD_SOURCE = "WLC-OSHB"

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function normalizeUnit(unit: BibleUnit): BibleUnit {
  return {
    ...unit,
    explanationKind: unit.explanationKind ?? "exposition",
    explanationSource: unit.explanationSource ?? IOSUA_LEGACY_EXPLANATION_SOURCE,
    wordSource:
      unit.words && unit.words.length > 0
        ? unit.wordSource ?? HEBREW_WORD_SOURCE
        : unit.wordSource,
  }
}

export function iosuaChapter(input: {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: BibleUnit[]
  prayer: string
  status: "draft" | "in_review" | "published"
}): BibleChapter {
  return {
    id: `iosua-${input.number}`,
    bookId: "iosua",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext: input.historicalContext,
    units: input.units.map(normalizeUnit),
    prayer: input.prayer,
    status: input.status,
  }
}

export { teaching }
