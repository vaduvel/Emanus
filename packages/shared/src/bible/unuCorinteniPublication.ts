import type { BibleStatus } from "./types.js"

export const UNU_CORINTENI_STATUSES: Record<number, BibleStatus> = {
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
  14: "in_review",
  15: "in_review",
  16: "in_review",
}

export function unuCorinteniStatus(chapter: number): BibleStatus { return UNU_CORINTENI_STATUSES[chapter] ?? "draft" }
