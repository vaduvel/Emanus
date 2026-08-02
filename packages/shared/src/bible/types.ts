// Model de conținut pentru „Biblia explicată".
//
// Regula editorială: textul biblic stă separat de explicația Emanus. Starea
// `in_review` nu înseamnă „ascuns de proprietar"; înseamnă că Daniel îl poate
// parcurge în aplicație și încă nu l-a aprobat pentru lansarea publică.

export type Testament = "vt" | "nt"
export type BibleStatus = "draft" | "in_review" | "published"
export type OriginalLanguage = "ebraica" | "aramaica" | "greaca"

export interface WordStudy {
  original: string
  transliteration: string
  language: OriginalLanguage
  meaning: string
}

export interface BibleUnit {
  id: string
  ref: string
  heading: string
  /** Textul biblic RCCV; nu se modifică în tăcere de editorii Emanus. */
  text: string
  /** Explicația Emanus, distinctă de Scriptură. */
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

/**
 * Ediția afișată. Folosirea RCCV este supusă clarificării și permisiunii
 * titularului drepturilor; etichetele „public domain" din API-uri terțe nu sunt
 * tratate de Emanus ca dovadă suficientă pentru România.
 */
export const BIBLE_TRANSLATION = "Cornilescu, ediția corectată (RCCV)"

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
