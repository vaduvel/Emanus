import type { BibleBook } from "../types.js"
import { NT_BOOK_01 } from "./ntExplained/01-matei.js"
import { NT_BOOK_02 } from "./ntExplained/02-marcu.js"
import { NT_BOOK_03 } from "./ntExplained/03-luca.js"
import { NT_BOOK_04 } from "./ntExplained/04-ioan.js"
import { NT_BOOK_05 } from "./ntExplained/05-fapte.js"
import { NT_BOOK_06 } from "./ntExplained/06-romani.js"
import { NT_BOOK_07 } from "./ntExplained/07-1-corinteni.js"
import { NT_BOOK_08 } from "./ntExplained/08-2-corinteni.js"
import { NT_BOOK_09 } from "./ntExplained/09-galateni.js"
import { NT_BOOK_10 } from "./ntExplained/10-efeseni.js"
import { NT_BOOK_11 } from "./ntExplained/11-filipeni.js"
import { NT_BOOK_12 } from "./ntExplained/12-coloseni.js"
import { NT_BOOK_13 } from "./ntExplained/13-1-tesaloniceni.js"
import { NT_BOOK_14 } from "./ntExplained/14-2-tesaloniceni.js"
import { NT_BOOK_15 } from "./ntExplained/15-1-timotei.js"
import { NT_BOOK_16 } from "./ntExplained/16-2-timotei.js"
import { NT_BOOK_17 } from "./ntExplained/17-tit.js"
import { NT_BOOK_18 } from "./ntExplained/18-filimon.js"
import { NT_BOOK_19 } from "./ntExplained/19-evrei.js"
import { NT_BOOK_20 } from "./ntExplained/20-iacov.js"
import { NT_BOOK_21 } from "./ntExplained/21-1-petru.js"
import { NT_BOOK_22 } from "./ntExplained/22-2-petru.js"
import { NT_BOOK_23 } from "./ntExplained/23-1-ioan.js"
import { NT_BOOK_24 } from "./ntExplained/24-2-ioan.js"
import { NT_BOOK_25 } from "./ntExplained/25-3-ioan.js"
import { NT_BOOK_26 } from "./ntExplained/26-iuda.js"
import { NT_BOOK_27 } from "./ntExplained/27-apocalipsa.js"

export const NT_EXPLAINED_BOOKS: BibleBook[] = [NT_BOOK_01, NT_BOOK_02, NT_BOOK_03, NT_BOOK_04, NT_BOOK_05, NT_BOOK_06, NT_BOOK_07, NT_BOOK_08, NT_BOOK_09, NT_BOOK_10, NT_BOOK_11, NT_BOOK_12, NT_BOOK_13, NT_BOOK_14, NT_BOOK_15, NT_BOOK_16, NT_BOOK_17, NT_BOOK_18, NT_BOOK_19, NT_BOOK_20, NT_BOOK_21, NT_BOOK_22, NT_BOOK_23, NT_BOOK_24, NT_BOOK_25, NT_BOOK_26, NT_BOOK_27]
export const NT_EXPLAINED_TRANSLATION = "Biblia Emanus"
export const NT_EXPLAINED_STATUS = "published" as const

export function findNtExplainedBook(id: string): BibleBook | undefined {
  return NT_EXPLAINED_BOOKS.find((book) => book.id === id)
}
export function findNtExplainedChapter(bookId: string, number: number) {
  return findNtExplainedBook(bookId)?.chapters.find((chapter) => chapter.number === number)
}
