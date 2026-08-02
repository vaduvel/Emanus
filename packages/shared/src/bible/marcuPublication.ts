import type { BibleStatus } from "./types.js"

/**
 * Capitolele scrise sunt vizibile direct în aplicație, ca proprietarul să le
 * poată parcurge și revizui în interfața reală. Conținutul respins se corectează
 * sau se retrage după revizia proprietarului.
 */
export const MARCU_STATUSES: Record<number, BibleStatus> = {
  1: "published",
  2: "published",
  3: "published",
  4: "published",
  5: "published",
  6: "published",
  7: "published",
  8: "published",
  9: "published",
  10: "published",
  11: "published",
  12: "published",
  13: "published",
  14: "published",
  15: "published",
  16: "published",
}

export function marcuStatus(chapter: number): BibleStatus {
  const status = MARCU_STATUSES[chapter]
  if (!status) throw new Error(`[Marcu ${chapter}] lipsește starea editorială.`)
  return status
}
