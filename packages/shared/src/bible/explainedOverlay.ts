import type { OriginalLanguage } from "./types.js"

export type ExplainedSource =
  | {
      kind: "poonen"
      transcript: string
      anchor: string
    }
  | {
      kind: "biblia-emanus"
      note: "rezumat narativ fără doctrină adăugată"
    }

export interface OverlayWordStudy {
  original: string
  transliteration: string
  language: OriginalLanguage
  meaning: string
  verseRef: string
  lexicalSource: "WLC-OSHB"
}

export interface ExplainedOverlayUnit {
  from: number
  to: number
  heading: string
  teaching: string
  source: ExplainedSource
  words?: OverlayWordStudy[]
  forYourHeart?: string
}

export interface ExplainedOverlayChapter {
  number: number
  title: string
  summary: string
  units: ExplainedOverlayUnit[]
}

export interface ExplainedBookOverlay {
  bookId: string
  bibleEmanusBookId: string
  name: string
  testament: "vt" | "nt"
  order: number
  transcript: string
  status: "draft" | "in_review" | "published"
  coverageMode?: "full" | "transcript-focused"
  chapters: ExplainedOverlayChapter[]
}

export function transcriptFocusedChapters(
  bookName: string,
  count: number,
  focused: Record<number, ExplainedOverlayChapter>,
): ExplainedOverlayChapter[] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1
    return (
      focused[number] ?? {
        number,
        title: `${bookName} ${number}`,
        summary:
          "Capitol păstrat în overlay pentru continuitatea cărții. Transcriptul Poonen nu îl dezvoltă separat; textul și sensul narativ rămân în Biblia Emanus, fără completare doctrinară generată.",
        units: [],
      }
    )
  })
}

export function assertCompleteOverlay(
  book: ExplainedBookOverlay,
  expectedChapters: number,
): ExplainedBookOverlay {
  if (book.chapters.length !== expectedChapters) {
    throw new Error(
      `[${book.name}] ${book.chapters.length} capitole în overlay; se așteptau ${expectedChapters}.`,
    )
  }

  book.chapters.forEach((chapter, index) => {
    if (chapter.number !== index + 1) {
      throw new Error(
        `[${book.name}] capitol discontinuu: poziția ${index + 1} declară ${chapter.number}.`,
      )
    }
    chapter.units.forEach((unit) => {
      if (unit.from < 1 || unit.to < unit.from) {
        throw new Error(
          `[${book.name} ${chapter.number}] interval invalid ${unit.from}-${unit.to}.`,
        )
      }
      if (!unit.teaching.trim()) {
        throw new Error(`[${book.name} ${chapter.number}] explicație goală.`)
      }
    })
  })

  return book
}
