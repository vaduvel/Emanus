import type { BibleStatus } from "./types.js"

export const EFESENI_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
  2: "in_review",
  3: "in_review",
  4: "in_review",
  5: "in_review",
  6: "in_review",
}

export function efeseniStatus(chapter: number): BibleStatus {
  return EFESENI_STATUSES[chapter] ?? "draft"
}
