import { JUDECATORI_TEXT_1 } from "./judecatoriText1.js"

const JUDECATORI_TEXT: Record<number, readonly string[]> = {
  ...JUDECATORI_TEXT_1,
}

export function judecatoriVerseCount(chapter: number): number {
  const verses = JUDECATORI_TEXT[chapter]
  if (!verses) throw new Error(`[Judecători ${chapter}] lipsește textul biblic.`)
  return verses.length
}

export function judecatoriPassage(chapter: number, from: number, to: number): string {
  const verses = JUDECATORI_TEXT[chapter]
  if (!verses) throw new Error(`[Judecători ${chapter}] lipsește textul biblic.`)
  if (from < 1 || to > verses.length || to < from) {
    throw new Error(`[Judecători ${chapter}] interval invalid ${from}-${to}; capitolul are ${verses.length} versete.`)
  }
  return verses.slice(from - 1, to).join(" ")
}

export { JUDECATORI_TEXT }
