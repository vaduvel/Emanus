import type { BibleStatus } from "./types.js"

export const FILIPENI_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
  2: "in_review",
  3: "in_review",
  4: "in_review",
}

export function filipeniStatus(chapter: number): BibleStatus {
  return FILIPENI_STATUSES[chapter] ?? "draft"
}
