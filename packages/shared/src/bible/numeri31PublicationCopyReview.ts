import type { BibleChapter } from "./types.js"

export function normalizeNumeri31PublicationCopy(chapter: BibleChapter): BibleChapter {
  if (chapter.number !== 31) return chapter

  return {
    ...chapter,
    units: chapter.units.map((unit) => {
      if (unit.id !== "numeri-31-13-18") return unit

      return {
        ...unit,
        teaching: unit.teaching
          .replace(
            "legătura pe care Poonen o dezvoltă în predica lui despre Balaam",
            "legătura dezvoltată în expunerea despre Balaam",
          )
          .replace(
            "Poonen însuși spune, când vorbește despre sabia leviților",
            "Expunerea spune, când vorbește despre sabia leviților",
          ),
      }
    }),
  }
}
