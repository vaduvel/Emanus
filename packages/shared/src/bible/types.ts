// Model de conținut pentru „Biblia explicată".
//
// Regula editorială: textul biblic stă separat de explicația redactată pe baza
// studiilor Zac Poonen. Starea `in_review` înseamnă că Daniel poate parcurge
// capitolul în aplicație, dar încă nu l-a aprobat pentru lansarea publică.

export type Testament = "vt" | "nt"
export type BibleStatus = "draft" | "in_review" | "published"
export type OriginalLanguage = "ebraica" | "aramaica" | "greaca"

export interface WordStudy {
  original: string
  transliteration: string
  language: OriginalLanguage
  meaning: string
}

export interface BibleTextNote {
  verse: number
  kind: "absent-from-critical-main-text" | "textual-variant" | "alternate-ending"
  note: string
  reason?: string
  traditionalReading?: string
}

export interface BibleUnit {
  id: string
  ref: string
  heading: string
  /** Textul biblic BE sigilat; rămâne separat de explicația editorială. */
  text: string
  /** Note critice provenite din corpusul Biblia Emanus, separate de text. */
  textNotes?: BibleTextNote[]
  /** Explicația redactată în română din sursele Poonen, distinctă de Scriptură. */
  teaching: string
  words?: WordStudy[]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface BibleChapter {
  id: string
  bookId: string
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: BibleUnit[]
  prayer: string
  status: BibleStatus
}

export interface BibleBook {
  id: string
  name: string
  testament: Testament
  order: number
  blurb: string
  chapters: BibleChapter[]
}

/** Ediția proprie afișată după trecerea porții automate de publicare. */
export const BIBLE_TRANSLATION = "Biblia Emanus (BE)"

/** Disponibil publicului după aprobarea finală a proprietarului. */
export function chapterIsPublic(chapter: BibleChapter): boolean {
  return chapter.status === "published"
}

/** Disponibil proprietarului pentru parcurgere și revizie în aplicație. */
export function chapterIsReviewable(chapter: BibleChapter): boolean {
  return chapter.status === "published" || chapter.status === "in_review"
}

/** Alias păstrat pentru compatibilitate: „open" înseamnă public. */
export const chapterIsOpen = chapterIsPublic

export function openChapters(book: BibleBook): BibleChapter[] {
  return book.chapters.filter(chapterIsPublic)
}

export function reviewableChapters(book: BibleBook): BibleChapter[] {
  return book.chapters.filter(chapterIsReviewable)
}

export function countUnits(book: BibleBook): number {
  return book.chapters.reduce((sum, chapter) => sum + chapter.units.length, 0)
}
