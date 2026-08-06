import type { BibleStatus } from "./types.js"

const JUDECATORI_STATUSES: Record<number, BibleStatus> = {
  1: "in_review",
}

export function judecatoriStatus(chapter: number): BibleStatus {
  const status = JUDECATORI_STATUSES[chapter]
  if (!status) throw new Error(`[Judecători ${chapter}] lipsește starea editorială.`)
  return status
}

export { JUDECATORI_STATUSES }
