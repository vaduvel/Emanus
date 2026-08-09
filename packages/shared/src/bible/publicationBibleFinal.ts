import type { BibleBook } from "./types.js"
import { PUBLICATION_BIBLE_BOOKS as BASE_PUBLICATION_BIBLE_BOOKS } from "./publicationBible.js"
import { bindBookToPublishedEmanusText } from "./publishedEmanusBinding.js"

export { BIBLIA_EMANUS_TRANSLATION } from "./types.js"
export {
  PUBLISHED_EMANUS_OT_BOOK_COUNT,
  PUBLISHED_EMANUS_OT_CHAPTER_COUNT,
  PUBLISHED_EMANUS_OT_VERSE_COUNT,
  PUBLISHED_EMANUS_OT_TEXT_BY_ORDER,
} from "./generated/publishedEmanusOtText.js"

/**
 * Catalogul final pentru reader. Explicațiile vin din stratul editorial existent,
 * iar orice carte VT este legată aici de textul publicat Biblia Emanus.
 */
export const PUBLICATION_BIBLE_BOOKS: BibleBook[] = BASE_PUBLICATION_BIBLE_BOOKS.map(
  bindBookToPublishedEmanusText,
)

export function findPublicationBook(id: string): BibleBook | undefined {
  return PUBLICATION_BIBLE_BOOKS.find((book) => book.id === id)
}

export function findPublicationChapter(bookId: string, number: number) {
  return findPublicationBook(bookId)?.chapters.find((chapter) => chapter.number === number)
}
