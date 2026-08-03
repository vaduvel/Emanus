import type { BibleStatus } from "./types.js"

export const FILIMON_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
}

export function filimonStatus(chapter: number): BibleStatus {
  return FILIMON_STATUSES[chapter] ?? "draft"
}
