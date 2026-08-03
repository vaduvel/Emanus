import type { BibleStatus } from "./types.js"

export const DOI_CORINTENI_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
  2: "in_review",
  3: "in_review",
  4: "in_review",
  5: "in_review",
  6: "in_review",
  7: "in_review",
  8: "in_review",
  9: "in_review",
  10: "in_review",
  11: "in_review",
  12: "in_review",
  13: "in_review",
}

export function doiCorinteniStatus(chapter: number): BibleStatus {
  return DOI_CORINTENI_STATUSES[chapter] ?? "draft"
}
