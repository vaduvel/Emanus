import type { ExplainedBookOverlay } from "../explainedOverlay.js"

export function clarifyEzechiel36LexicalPublication(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => {
      if (chapter.number !== 36) return chapter

      return {
        ...chapter,
        units: chapter.units.map((unit) => ({
          ...unit,
          words: unit.words?.map((word) =>
            word.original === "לֵב חָדָשׁ"
              ? { ...word, meaning: "literal: «inimă nouă»" }
              : word,
          ),
        })),
      }
    }),
  }
}
