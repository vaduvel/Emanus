import type { BibleStatus } from "./types.js"

/** Starea editorială este separată de conținut, ca aprobarea să fie auditabilă. */
export const MARCU_STATUSES: Record<number, BibleStatus> = {
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

export function marcuStatus(chapter: number): BibleStatus {
  const status = MARCU_STATUSES[chapter]
  if (!status) throw new Error(`[Marcu ${chapter}] lipsește starea editorială.`)
  return status
}
