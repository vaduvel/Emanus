import type { BibleStatus } from "./types.js"

export const IMPARATI1_STATUSES: Record<number, BibleStatus> = Object.fromEntries(
  Array.from({ length: 22 }, (_, index) => [index + 1, "in_review" as BibleStatus]),
)
