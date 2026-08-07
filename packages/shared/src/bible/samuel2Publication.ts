import type { BibleStatus } from "./types.js"

export const SAMUEL2_STATUSES: Record<number, BibleStatus> = Object.fromEntries(
  Array.from({ length: 24 }, (_, index) => [index + 1, "in_review" as BibleStatus]),
)
