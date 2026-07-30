export * from "./types.js"

import type { BibleBook } from "./types.js"
import { GENEZA as GENEZA_BASE } from "./geneza.js"
import { GENEZA_2 } from "./geneza2.js"
import { GENEZA_3 } from "./geneza3.js"

/** Geneza, cu toate capitolele scrise pana acum. */
export const GENEZA: BibleBook = {
  ...GENEZA_BASE,
  chapters: [...GENEZA_BASE.chapters, GENEZA_2, GENEZA_3],
}

/** Cartile scrise pana acum. Se adauga pe rand, dupa revizie. */
export const BIBLE_BOOKS: BibleBook[] = [GENEZA]

export function findBook(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id)
}

export function findChapter(bookId: string, number: number) {
  return findBook(bookId)?.chapters.find((c) => c.number === number)
}
