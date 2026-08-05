import { BibleUnit, BibleChapter } from "./types"

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

export function deuteronomChapter(input: {
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
    id: `deuteronom-${input.number}`,
    bookId: "deuteronom",
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
