import type { BibleBook } from "./types.js"
import { BIBLE_BOOKS } from "./index.js"
import { IMPARATI1 } from "./imparati1.js"
import {
  VT_OVERLAY_BIBLE_BOOKS,
  VT_OVERLAY_TEMPORARY_TEXTS,
  VT_OVERLAY_TRANSLATION_BLOCKERS,
} from "./overlayBibleBooks.js"

/**
 * Catalogul consumat de cititorul Bibliei explicate în lucru editorial.
 *
 * Nu modificăm `BIBLE_BOOKS` legacy până când toate integrările vechi sunt
 * migrate. Aici adăugăm explicit 1 Împărați și toate cele 29 de cărți overlay.
 *
 * Judecători–Daniel folosesc Biblia Emanus validată. Osea–Maleahi folosesc
 * temporar text biblic de lucru, etichetat explicit ca provizoriu. Toate
 * explicațiile noi rămân `in_review`, deci textul provizoriu nu este prezentat
 * ca release final. Când BE este gata, se schimbă numai stratul de versete.
 */
const byId = new Map<string, BibleBook>()
for (const book of BIBLE_BOOKS) byId.set(book.id, book)
byId.set(IMPARATI1.id, IMPARATI1)
for (const book of VT_OVERLAY_BIBLE_BOOKS) byId.set(book.id, book)

export const PUBLICATION_BIBLE_BOOKS: BibleBook[] = [...byId.values()].sort(
  (a, b) => a.testament.localeCompare(b.testament) || a.order - b.order,
)

export function findPublicationBook(id: string): BibleBook | undefined {
  return PUBLICATION_BIBLE_BOOKS.find((book) => book.id === id)
}

export function findPublicationChapter(bookId: string, number: number) {
  return findPublicationBook(bookId)?.chapters.find((chapter) => chapter.number === number)
}

export { VT_OVERLAY_TEMPORARY_TEXTS, VT_OVERLAY_TRANSLATION_BLOCKERS }
