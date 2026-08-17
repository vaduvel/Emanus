import type { BibleBook } from "./types.js"
import { PUBLICATION_BIBLE_BOOKS as BASE_PUBLICATION_BIBLE_BOOKS } from "./publicationBible.js"
import { bindBookToPublishedEmanusText } from "./publishedEmanusBinding.js"
import {
  BIBLIA_EMANUS_NT_BOOKS,
  BIBLIA_EMANUS_NT_RUNTIME_GATE,
} from "./bibliaEmanusNtCatalog.generated.js"
import { NT_EXPLAINED_SOURCE_BOOKS } from "./generated/ntExplainedSource.js"
import { bindNtBooksToExplainedContent } from "./ntExplainedBinding.js"

export { BIBLIA_EMANUS_TRANSLATION } from "./types.js"
export {
  PUBLISHED_EMANUS_OT_BOOK_COUNT,
  PUBLISHED_EMANUS_OT_CHAPTER_COUNT,
  PUBLISHED_EMANUS_OT_VERSE_COUNT,
  PUBLISHED_EMANUS_OT_TEXT_BY_ORDER,
} from "./generated/publishedEmanusOtText.js"

/**
 * Catalogul final pentru reader. Ambele testamente păstrează Scriptura şi
 * explicaţia în câmpuri distincte ale aceluiaşi capitol. VT este legat de textul
 * BE publicat, iar NT rebindează corpusul explicativ aprobat la versetele
 * canonice curente înainte ca readerul să-l poată materializa.
 */
const OLD_TESTAMENT_BOOKS = BASE_PUBLICATION_BIBLE_BOOKS.map(bindBookToPublishedEmanusText)

if (BIBLIA_EMANUS_NT_RUNTIME_GATE.status !== "approved") {
  throw new Error("[Biblia Emanus] Noul Testament nu a trecut poarta finală de publicare.")
}

const NEW_TESTAMENT_BOOKS = bindNtBooksToExplainedContent(
  BIBLIA_EMANUS_NT_BOOKS,
  NT_EXPLAINED_SOURCE_BOOKS,
)

export const PUBLICATION_BIBLE_BOOKS: BibleBook[] = [
  ...OLD_TESTAMENT_BOOKS,
  ...NEW_TESTAMENT_BOOKS,
].sort((a, b) => a.order - b.order)

if (PUBLICATION_BIBLE_BOOKS.length !== 66) {
  throw new Error(`[Biblia Emanus] catalog incomplet: ${PUBLICATION_BIBLE_BOOKS.length}/66 cărți.`)
}

export { BIBLIA_EMANUS_NT_RUNTIME_GATE }

export function findPublicationBook(id: string): BibleBook | undefined {
  return PUBLICATION_BIBLE_BOOKS.find((book) => book.id === id)
}

export function findPublicationChapter(bookId: string, number: number) {
  return findPublicationBook(bookId)?.chapters.find((chapter) => chapter.number === number)
}
