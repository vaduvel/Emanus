export * from "./types.js"
export * from "./geneza.js"

import type { BibleBook } from "./types.js"
import { GENEZA } from "./geneza.js"

/** Cartile scrise pana acum. Se adauga pe rand, dupa revizie. */
export const BIBLE_BOOKS: BibleBook[] = [GENEZA]

export function findBook(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id)
}
