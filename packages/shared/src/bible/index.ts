export * from "./types.js"
export { BIBLE_CATALOG } from "./catalog.generated.js"
export {
  loadAllBibleChapters,
  loadBibleBookChapters,
  loadBibleChapter,
} from "./loaders.js"

import { BIBLE_CATALOG } from "./catalog.generated.js"

export function findBibleBook(id: string) {
  return BIBLE_CATALOG.find((book) => book.id === id)
}

export function findBibleChapterSummary(bookId: string, number: number) {
  return findBibleBook(bookId)?.chapters.find(
    (chapter) => chapter.number === number,
  )
}
