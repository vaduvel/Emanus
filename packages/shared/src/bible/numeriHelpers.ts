import { BibleUnit, BibleChapter } from "./types.js"

/*
 * Ajutoarele cărții Numeri.
 *
 * Spre deosebire de Levitic/Exod, numeriChapter() primește units gata
 * construite (BibleUnit[]); fiecare fișier numeriN.ts își calculează singur
 * `text` cu numeriPassage() din numeriText.ts și `status` din numeriPublication.ts.
 */

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
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
    units: input.units,
    prayer: input.prayer,
    status: input.status,
  }
}

export { teaching }
