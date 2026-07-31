export * from "./types.js"

import type { BibleBook } from "./types.js"
import { GENEZA as GENEZA_BASE } from "./geneza.js"
import { GENEZA_2 } from "./geneza2.js"
import { GENEZA_3 } from "./geneza3.js"
import { GENEZA_4 } from "./geneza4.js"
import { GENEZA_5 } from "./geneza5.js"
import { GENEZA_6 } from "./geneza6.js"
import { GENEZA_7 } from "./geneza7.js"
import { GENEZA_8 } from "./geneza8.js"
import { GENEZA_9 } from "./geneza9.js"
import { GENEZA_10 } from "./geneza10.js"
import { GENEZA_11 } from "./geneza11.js"
import { GENEZA_12 } from "./geneza12.js"
import { GENEZA_13 } from "./geneza13.js"
import { GENEZA_14 } from "./geneza14.js"
import { GENEZA_15 } from "./geneza15.js"
import { GENEZA_16 } from "./geneza16.js"
import { GENEZA_17 } from "./geneza17.js"
import { GENEZA_18 } from "./geneza18.js"
import { GENEZA_19 } from "./geneza19.js"
import { GENEZA_20 } from "./geneza20.js"
import { GENEZA_21 } from "./geneza21.js"
import { GENEZA_22 } from "./geneza22.js"
import { GENEZA_23 } from "./geneza23.js"
import { GENEZA_24 } from "./geneza24.js"
import { GENEZA_25 } from "./geneza25.js"
import { GENEZA_26 } from "./geneza26.js"
import { GENEZA_27 } from "./geneza27.js"
import { GENEZA_28 } from "./geneza28.js"
import { GENEZA_29 } from "./geneza29.js"
import { GENEZA_30 } from "./geneza30.js"
import { GENEZA_31 } from "./geneza31.js"
import { GENEZA_32 } from "./geneza32.js"
import { GENEZA_33 } from "./geneza33.js"
import { GENEZA_34 } from "./geneza34.js"
import { GENEZA_35 } from "./geneza35.js"
import { GENEZA_36 } from "./geneza36.js"
import { GENEZA_37 } from "./geneza37.js"
import { GENEZA_38 } from "./geneza38.js"
import { GENEZA_39 } from "./geneza39.js"
import { GENEZA_40 } from "./geneza40.js"
import { GENEZA_41 } from "./geneza41.js"
import { GENEZA_42 } from "./geneza42.js"
import { GENEZA_43 } from "./geneza43.js"
import { GENEZA_44 } from "./geneza44.js"

/** Geneza, cu toate capitolele scrise pana acum. */
export const GENEZA: BibleBook = {
  ...GENEZA_BASE,
  chapters: [
    ...GENEZA_BASE.chapters,
    GENEZA_2,
    GENEZA_3,
    GENEZA_4,
    GENEZA_5,
    GENEZA_6,
    GENEZA_7,
    GENEZA_8,
    GENEZA_9,
    GENEZA_10,
    GENEZA_11,
    GENEZA_12,
    GENEZA_13,
    GENEZA_14,
    GENEZA_15,
    GENEZA_16,
    GENEZA_17,
    GENEZA_18,
    GENEZA_19,
    GENEZA_20,
    GENEZA_21,
    GENEZA_22,
    GENEZA_23,
    GENEZA_24,
    GENEZA_25,
    GENEZA_26,
    GENEZA_27,
    GENEZA_28,
    GENEZA_29,
    GENEZA_30,
    GENEZA_31,
    GENEZA_32,
    GENEZA_33,
    GENEZA_34,
    GENEZA_35,
    GENEZA_36,
    GENEZA_37,
    GENEZA_38,
    GENEZA_39,
    GENEZA_40,
    GENEZA_41,
    GENEZA_42,
    GENEZA_43,
    GENEZA_44,
  ],
}

/** Cartile scrise pana acum. Se adauga pe rand, dupa revizie. */
export const BIBLE_BOOKS: BibleBook[] = [GENEZA]

export function findBook(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id)
}

export function findChapter(bookId: string, number: number) {
  return findBook(bookId)?.chapters.find((c) => c.number === number)
}
