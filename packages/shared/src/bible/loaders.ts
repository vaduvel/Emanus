import type { BibleChapter } from "./types.js"

type ChapterLoader = () => Promise<BibleChapter>

const GENEZA_LOADERS: Record<number, ChapterLoader> = {
  1: () => import("./geneza.js").then((module) => module.GENEZA.chapters[0]!),
  2: () => import("./geneza2.js").then((module) => module.GENEZA_2),
  3: () => import("./geneza3.js").then((module) => module.GENEZA_3),
  4: () => import("./geneza4.js").then((module) => module.GENEZA_4),
  5: () => import("./geneza5.js").then((module) => module.GENEZA_5),
  6: () => import("./geneza6.js").then((module) => module.GENEZA_6),
  7: () => import("./geneza7.js").then((module) => module.GENEZA_7),
  8: () => import("./geneza8.js").then((module) => module.GENEZA_8),
  9: () => import("./geneza9.js").then((module) => module.GENEZA_9),
  10: () => import("./geneza10.js").then((module) => module.GENEZA_10),
  11: () => import("./geneza11.js").then((module) => module.GENEZA_11),
  12: () => import("./geneza12.js").then((module) => module.GENEZA_12),
  13: () => import("./geneza13.js").then((module) => module.GENEZA_13),
  14: () => import("./geneza14.js").then((module) => module.GENEZA_14),
  15: () => import("./geneza15.js").then((module) => module.GENEZA_15),
  16: () => import("./geneza16.js").then((module) => module.GENEZA_16),
  17: () => import("./geneza17.js").then((module) => module.GENEZA_17),
  18: () => import("./geneza18.js").then((module) => module.GENEZA_18),
  19: () => import("./geneza19.js").then((module) => module.GENEZA_19),
  20: () => import("./geneza20.js").then((module) => module.GENEZA_20),
  21: () => import("./geneza21.js").then((module) => module.GENEZA_21),
  22: () => import("./geneza22.js").then((module) => module.GENEZA_22),
  23: () => import("./geneza23.js").then((module) => module.GENEZA_23),
  24: () => import("./geneza24.js").then((module) => module.GENEZA_24),
  25: () => import("./geneza25.js").then((module) => module.GENEZA_25),
  26: () => import("./geneza26.js").then((module) => module.GENEZA_26),
  27: () => import("./geneza27.js").then((module) => module.GENEZA_27),
  28: () => import("./geneza28.js").then((module) => module.GENEZA_28),
  29: () => import("./geneza29.js").then((module) => module.GENEZA_29),
  30: () => import("./geneza30.js").then((module) => module.GENEZA_30),
  31: () => import("./geneza31.js").then((module) => module.GENEZA_31),
  32: () => import("./geneza32.js").then((module) => module.GENEZA_32),
  33: () => import("./geneza33.js").then((module) => module.GENEZA_33),
  34: () => import("./geneza34.js").then((module) => module.GENEZA_34),
  35: () => import("./geneza35.js").then((module) => module.GENEZA_35),
  36: () => import("./geneza36.js").then((module) => module.GENEZA_36),
  37: () => import("./geneza37.js").then((module) => module.GENEZA_37),
  38: () => import("./geneza38.js").then((module) => module.GENEZA_38),
  39: () => import("./geneza39.js").then((module) => module.GENEZA_39),
  40: () => import("./geneza40.js").then((module) => module.GENEZA_40),
  41: () => import("./geneza41.js").then((module) => module.GENEZA_41),
  42: () => import("./geneza42.js").then((module) => module.GENEZA_42),
  43: () => import("./geneza43.js").then((module) => module.GENEZA_43),
  44: () => import("./geneza44.js").then((module) => module.GENEZA_44),
  45: () => import("./geneza45.js").then((module) => module.GENEZA_45),
  46: () => import("./geneza46.js").then((module) => module.GENEZA_46),
  47: () => import("./geneza47.js").then((module) => module.GENEZA_47),
  48: () => import("./geneza48.js").then((module) => module.GENEZA_48),
  49: () => import("./geneza49.js").then((module) => module.GENEZA_49),
  50: () => import("./geneza50.js").then((module) => module.GENEZA_50),
}

const BOOK_LOADERS: Record<string, Record<number, ChapterLoader>> = {
  geneza: GENEZA_LOADERS,
}

const loadedChapters = new Map<string, Promise<BibleChapter | undefined>>()

export function loadBibleChapter(
  bookId: string,
  chapter: number,
): Promise<BibleChapter | undefined> {
  const key = `${bookId}:${chapter}`
  const existing = loadedChapters.get(key)
  if (existing) return existing
  const loader = BOOK_LOADERS[bookId]?.[chapter]
  if (!loader) return Promise.resolve(undefined)
  const request = loader()
    .then((value) =>
      value.bookId === bookId && value.number === chapter ? value : undefined,
    )
    .catch((error: unknown) => {
      loadedChapters.delete(key)
      throw error
    })
  loadedChapters.set(key, request)
  return request
}

export async function loadBibleBookChapters(
  bookId: string,
): Promise<BibleChapter[]> {
  const chapters = BOOK_LOADERS[bookId]
  if (!chapters) return []
  const loaded = await Promise.all(
    Object.keys(chapters).map((number) =>
      loadBibleChapter(bookId, Number(number)),
    ),
  )
  return loaded.filter(
    (chapter): chapter is BibleChapter => chapter !== undefined,
  )
}

export async function loadAllBibleChapters(): Promise<BibleChapter[]> {
  const books = await Promise.all(
    Object.keys(BOOK_LOADERS).map(loadBibleBookChapters),
  )
  return books.flat()
}
