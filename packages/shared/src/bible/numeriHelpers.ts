import type { BibleChapter, BibleUnit } from "./types.js"

/*
 * Ajutoarele cărții Numeri.
 *
 * Spre deosebire de Levitic/Exod, numeriChapter() primește units gata
 * construite (BibleUnit[]); fiecare fișier numeriN.ts își calculează singur
 * `text` cu numeriPassage() din numeriText.ts și `status` din numeriPublication.ts.
 *
 * Normalizarea completează numai metadatele legacy lipsă. Clasificările
 * explicite (de exemplu Numeri 31 = textual-overview) au prioritate și nu sunt
 * suprascrise.
 */

const NUMERI_LEGACY_EXPLANATION_SOURCE =
  "Emanus legacy synthesis — Zac Poonen, Through The Bible: Numbers + biblical text/cross-references"
const HEBREW_WORD_SOURCE = "WLC-OSHB"

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function normalizeUnit(unit: BibleUnit): BibleUnit {
  return {
    ...unit,
    explanationKind: unit.explanationKind ?? "exposition",
    explanationSource: unit.explanationSource ?? NUMERI_LEGACY_EXPLANATION_SOURCE,
    wordSource:
      unit.words && unit.words.length > 0
        ? unit.wordSource ?? HEBREW_WORD_SOURCE
        : unit.wordSource,
  }
}

export function numeriChapter(input: {
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
    id: `numeri-${input.number}`,
    bookId: "numeri",
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
