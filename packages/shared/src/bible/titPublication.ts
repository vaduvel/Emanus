import type { BibleStatus } from "./types.js"

export const TIT_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
  2: "in_review",
  3: "in_review",
}

export function titStatus(chapter: number): BibleStatus {
  return TIT_STATUSES[chapter] ?? "draft"
}
