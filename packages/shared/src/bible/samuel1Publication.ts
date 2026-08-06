import type { BibleStatus } from "./types.js"

export const SAMUEL1_STATUSES: Record<number, BibleStatus> = Object.fromEntries(
  Array.from({ length: 31 }, (_, index) => [index + 1, "in_review" as BibleStatus]),
)
