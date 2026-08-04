import type { BibleBook, BibleTextNote, BibleUnit } from "./types.js"

export interface BibliaEmanusSourceNote {
  verse: number
  kind: "absent-from-critical-main-text" | "textual-variant"
  note: string
  reason?: string
  traditionalReading?: string
}

export interface BibliaEmanusChapterText {
  verses: Readonly<Record<string, string>>
  textualStatuses: Readonly<Record<string, string>>
  notes: readonly BibliaEmanusSourceNote[]
  alternateEndings: readonly Readonly<Record<string, unknown>>[]
}

export type BibliaEmanusCorpus = Readonly<
  Record<string, Readonly<Record<string, BibliaEmanusChapterText>>>
>

const BOOK_TO_USFM: Readonly<Record<string, string>> = {
  matei: "MAT",
  marcu: "MRK",
  luca: "LUK",
  ioan: "JHN",
  fapte: "ACT",
  romani: "ROM",
  "1-corinteni": "1CO",
  "2-corinteni": "2CO",
  galateni: "GAL",
  efeseni: "EPH",
  filipeni: "PHP",
  coloseni: "COL",
  "1-tesaloniceni": "1TH",
  "2-tesaloniceni": "2TH",
  "1-timotei": "1TI",
  "2-timotei": "2TI",
  tit: "TIT",
  filimon: "PHM",
  evrei: "HEB",
  iacov: "JAS",
  "1-petru": "1PE",
  "2-petru": "2PE",
  "1-ioan": "1JN",
  "2-ioan": "2JN",
  "3-ioan": "3JN",
  iuda: "JUD",
  apocalipsa: "REV",
}

const UNIT_RANGE = /(\d+):(\d+)(?:[-–](\d+))?$/

function materializeUnit(
  unit: BibleUnit,
  chapterNumber: number,
  chapter: BibliaEmanusChapterText,
): BibleUnit {
  const range = UNIT_RANGE.exec(unit.ref)
  if (!range || Number(range[1]) !== chapterNumber) {
    throw new Error(`[Biblia Emanus] referință de unitate invalidă: ${unit.ref}`)
  }
  const from = Number(range[2])
  const to = Number(range[3] ?? range[2])
  const text: string[] = []
  for (let verse = from; verse <= to; verse += 1) {
    const value = chapter.verses[String(verse)]
    if (value) text.push(value)
  }
  if (text.length === 0) {
    throw new Error(`[Biblia Emanus] unitatea ${unit.ref} nu are text principal`)
  }

  const notes: BibleTextNote[] = chapter.notes
    .filter((note) => note.verse >= from && note.verse <= to)
    .map((note) => ({ ...note }))
  if (to === Math.max(...Object.keys(chapter.verses).map(Number))) {
    for (const ending of chapter.alternateEndings) {
      const alternateText = ending.text
      const sourceNote = ending.sourceNote
      if (typeof alternateText !== "string" || typeof sourceNote !== "string") continue
      notes.push({
        verse: to,
        kind: "alternate-ending",
        note: sourceNote,
        traditionalReading: alternateText,
      })
    }
  }
  return { ...unit, text: text.join(" "), textNotes: notes.length > 0 ? notes : undefined }
}

/** Applies the sealed BE text without mixing it into the explanatory commentary. */
export function applyBibliaEmanusNewTestament(
  books: readonly BibleBook[],
  corpus: BibliaEmanusCorpus,
): BibleBook[] {
  return books.map((book) => {
    const usfm = BOOK_TO_USFM[book.id]
    if (!usfm) return book
    const sourceBook = corpus[usfm]
    if (!sourceBook) throw new Error(`[Biblia Emanus] lipsește cartea ${usfm}`)
    return {
      ...book,
      chapters: book.chapters.map((chapter) => {
        const sourceChapter = sourceBook[String(chapter.number)]
        if (!sourceChapter) {
          throw new Error(`[Biblia Emanus] lipsește capitolul ${usfm}.${chapter.number}`)
        }
        return {
          ...chapter,
          status: "published",
          units: chapter.units.map((unit) => materializeUnit(unit, chapter.number, sourceChapter)),
        }
      }),
    }
  })
}
