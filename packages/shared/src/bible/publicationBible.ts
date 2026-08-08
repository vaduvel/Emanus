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
 * Stadiul textului este luat exclusiv din catalogul generat. După review-ul
 * final de conținut, Judecători–Daniel rămân texte editoriale din candidatul
 * istoric până la un fresh re-audit în corpusul canonic curent. Osea este
 * Biblia Emanus canonică; ceilalți profeți mici rămân provizorii până la
 * promovarea lor individuală. Explicațiile noi rămân `in_review`.
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
