import type {
  BibleAlternateEnding,
  BibleBook,
  BibleTextualNote,
  BibleVerse,
} from "./types.js"
import { BIBLIA_EMANUS_TRANSLATION } from "./types.js"

type RawNtNote = {
  verse: number
  kind: "absent-from-critical-main-text" | "textual-variant"
  note: string
  traditionalReading?: string
  reason?: string
}

type RawNtChapter = {
  verses: Record<string, string>
  textualStatuses: Record<string, string>
  notes: RawNtNote[]
  alternateEndings: Record<string, unknown>[]
}

export type BibliaEmanusNtCorpus = Record<string, Record<string, RawNtChapter>>

type NtBookDefinition = {
  sourceId: string
  id: string
  name: string
  order: number
}

/* Ordinea, numele şi id-urile publice sunt intenţionat separate de corpusul brut. */
const NT_BOOKS: NtBookDefinition[] = [
  { sourceId: "MAT", id: "matei", name: "Matei", order: 40 },
  { sourceId: "MRK", id: "marcu", name: "Marcu", order: 41 },
  { sourceId: "LUK", id: "luca", name: "Luca", order: 42 },
  { sourceId: "JHN", id: "ioan", name: "Ioan", order: 43 },
  { sourceId: "ACT", id: "faptele-apostolilor", name: "Faptele Apostolilor", order: 44 },
  { sourceId: "ROM", id: "romani", name: "Romani", order: 45 },
  { sourceId: "1CO", id: "1-corinteni", name: "1 Corinteni", order: 46 },
  { sourceId: "2CO", id: "2-corinteni", name: "2 Corinteni", order: 47 },
  { sourceId: "GAL", id: "galateni", name: "Galateni", order: 48 },
  { sourceId: "EPH", id: "efeseni", name: "Efeseni", order: 49 },
  { sourceId: "PHP", id: "filipeni", name: "Filipeni", order: 50 },
  { sourceId: "COL", id: "coloseni", name: "Coloseni", order: 51 },
  { sourceId: "1TH", id: "1-tesaloniceni", name: "1 Tesaloniceni", order: 52 },
  { sourceId: "2TH", id: "2-tesaloniceni", name: "2 Tesaloniceni", order: 53 },
  { sourceId: "1TI", id: "1-timotei", name: "1 Timotei", order: 54 },
  { sourceId: "2TI", id: "2-timotei", name: "2 Timotei", order: 55 },
  { sourceId: "TIT", id: "tit", name: "Tit", order: 56 },
  { sourceId: "PHM", id: "filimon", name: "Filimon", order: 57 },
  { sourceId: "HEB", id: "evrei", name: "Evrei", order: 58 },
  { sourceId: "JAS", id: "iacov", name: "Iacov", order: 59 },
  { sourceId: "1PE", id: "1-petru", name: "1 Petru", order: 60 },
  { sourceId: "2PE", id: "2-petru", name: "2 Petru", order: 61 },
  { sourceId: "1JN", id: "1-ioan", name: "1 Ioan", order: 62 },
  { sourceId: "2JN", id: "2-ioan", name: "2 Ioan", order: 63 },
  { sourceId: "3JN", id: "3-ioan", name: "3 Ioan", order: 64 },
  { sourceId: "JUD", id: "iuda", name: "Iuda", order: 65 },
  { sourceId: "REV", id: "apocalipsa", name: "Apocalipsa", order: 66 },
]

export const BIBLIA_EMANUS_NT_TRANSLATION = BIBLIA_EMANUS_TRANSLATION

function fail(message: string): never {
  throw new Error(`[Biblia Emanus NT] ${message}`)
}

function versesForChapter(
  book: NtBookDefinition,
  chapterNumber: number,
  chapter: RawNtChapter,
): BibleVerse[] {
  return Object.entries(chapter.verses)
    .map(([number, text]) => ({ number: Number(number), text, textualStatus: chapter.textualStatuses[number] }))
    .sort((left, right) => left.number - right.number)
    .map((verse) => {
      if (!Number.isInteger(verse.number) || verse.number < 1 || !verse.text.trim()) {
        fail(`${book.sourceId}.${chapterNumber}: verset invalid în corpusul aprobat`)
      }
      return verse.textualStatus === undefined
        ? { number: verse.number, text: verse.text }
        : verse
    })
}

function notesForChapter(
  book: NtBookDefinition,
  chapterNumber: number,
  notes: RawNtNote[],
): BibleTextualNote[] {
  return notes.map((note) => {
    if (!Number.isInteger(note.verse) || note.verse < 1 || !note.note.trim()) {
      fail(`${book.sourceId}.${chapterNumber}: notă textuală invalidă în corpusul aprobat`)
    }
    return note
  })
}

function alternateEndingsForChapter(
  book: NtBookDefinition,
  chapterNumber: number,
  endings: Record<string, unknown>[],
): BibleAlternateEnding[] {
  return endings.map((ending) => {
    const status = ending.status
    const text = ending.text
    const sourceNote = ending.sourceNote
    if (typeof status !== "string" || typeof text !== "string" || !status.trim() || !text.trim()) {
      fail(`${book.sourceId}.${chapterNumber}: final alternativ invalid în corpusul aprobat`)
    }
    if (sourceNote !== undefined && typeof sourceNote !== "string") {
      fail(`${book.sourceId}.${chapterNumber}: nota finalului alternativ este invalidă`)
    }
    return sourceNote === undefined ? { status, text } : { status, text, sourceNote }
  })
}

/**
 * Converteşte corpusul brut, deja aprobat de poarta editorială, în modelul
 * comun al aplicaţiei. Nu este importat de catalog cât timp poarta e `withheld`.
 */
export function buildBibliaEmanusNtBooks(corpus: BibliaEmanusNtCorpus): BibleBook[] {
  return NT_BOOKS.map((book) => {
    const rawChapters = corpus[book.sourceId]
    if (!rawChapters) fail(`lipseşte cartea ${book.sourceId} din corpusul aprobat`)

    const chapterNumbers = Object.keys(rawChapters).map(Number).sort((left, right) => left - right)
    if (chapterNumbers.length === 0 || chapterNumbers.some((number) => !Number.isInteger(number) || number < 1)) {
      fail(`${book.sourceId}: capitole invalide în corpusul aprobat`)
    }

    return {
      id: book.id,
      name: book.name,
      testament: "nt",
      order: book.order,
      blurb: "Textul Noului Testament în traducerea Biblia Emanus.",
      translation: BIBLIA_EMANUS_TRANSLATION,
      chapters: chapterNumbers.map((number) => {
        const rawChapter = rawChapters[String(number)]
        if (!rawChapter) fail(`${book.sourceId}.${number}: capitol lipsă din corpusul aprobat`)
        return {
          id: `${book.id}-${number}`,
          bookId: book.id,
          number,
          title: `${book.name} ${number}`,
          summary: "Text biblic în traducerea Biblia Emanus.",
          literaryContext: "",
          historicalContext: "",
          units: [],
          verses: versesForChapter(book, number, rawChapter),
          textualNotes: notesForChapter(book, number, rawChapter.notes),
          alternateEndings: alternateEndingsForChapter(book, number, rawChapter.alternateEndings),
          prayer: "",
          status: "published",
        }
      }),
    }
  })
}
