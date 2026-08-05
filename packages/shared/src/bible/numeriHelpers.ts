import { BibleUnit, BibleChapter } from "./types"

/*
 * Ajutoarele c\u0103r\u021bii Numeri.
 *
 * Spre deosebire de Levitic/Exod, numeriChapter() prime\u0219te units gata
 * construite (BibleUnit[]); fiecare fi\u0219ier numeriN.ts \u00ee\u0219i calculeaz\u0103 singur
 * `text` cu numeriPassage() din numeriText.ts \u0219i `status` din numeriPublication.ts.
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
