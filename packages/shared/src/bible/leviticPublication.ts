import type { BibleStatus } from "./types.js"

/*
 * Starea editorială a capitolelor din Levitic.
 * Se trece pe "published" numai după ce capitolul a fost citit și curățat.
 */

export const LEVITIC_STATUSES: Record<number, BibleStatus> = {
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
  17: "in_review",
  18: "in_review",
  19: "in_review",
  20: "in_review",
  21: "in_review",
  22: "in_review",
  23: "in_review",
  24: "in_review",
  25: "in_review",
  26: "in_review",
  27: "in_review",
}

export function leviticStatus(chapter: number): BibleStatus {
  const status = LEVITIC_STATUSES[chapter]
  if (!status) {
    throw new Error(`[Levitic ${chapter}] lipsește starea editorială.`)
  }
  return status
}
