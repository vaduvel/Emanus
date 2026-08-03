import type { BibleStatus } from "./types.js"

export const COLOSENI_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
  2: "in_review",
  3: "in_review",
  4: "in_review",
}

export function coloseniStatus(chapter: number): BibleStatus {
  return COLOSENI_STATUSES[chapter] ?? "draft"
}
