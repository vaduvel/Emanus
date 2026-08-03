import type { BibleStatus } from "./types.js"

export const UNU_TESALONICENI_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
  2: "in_review",
  3: "in_review",
  4: "in_review",
  5: "in_review",
}

export function unuTesaloniceniStatus(chapter: number): BibleStatus {
  return UNU_TESALONICENI_STATUSES[chapter] ?? "draft"
}
