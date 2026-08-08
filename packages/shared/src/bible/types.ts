// Model de continut pentru „Biblia explicata". Sursa de adevar: docs/21-biblia-explicata.md
//
// Regula editoriala de baza: textul biblic ramane neatins, integral, in campul
// text. Explicatia Emanus sta separat, in campuri proprii, ca sa nu poata fi
// niciodata confundata cu Scriptura.

export type Testament = "vt" | "nt"

export type BibleStatus = "draft" | "in_review" | "published"

export type OriginalLanguage = "ebraica" | "aramaica" | "greaca"

/** Identitatea unei traduceri afişate în catalog. */
export interface BibleTranslation {
  id: string
  name: string
  attribution?: string
}

/** Un verset dintr-un capitol publicat fără comentariu Emanus ataşat. */
export interface BibleVerse {
  number: number
  text: string
  /** De exemplu, o marcă pentru un loc absent din textul critic principal. */
  textualStatus?: string
}

export type BibleTextualNoteKind = "absent-from-critical-main-text" | "textual-variant"

/** O notă textuală afişată separat de textul versetului. */
export interface BibleTextualNote {
  verse: number
  kind: BibleTextualNoteKind
  note: string
  traditionalReading?: string
  reason?: string
}

/** Un final alternativ nenumerotat, păstrat separat de textul principal. */
export interface BibleAlternateEnding {
  status: string
  text: string
  sourceNote?: string
}

/**
 * Poarta de publicare a corpusului NT Biblia Emanus.
 *
 * Nu este suficient ca fişierele sursă să pretindă `published`: catalogul
 * runtime acceptă corpusul numai după ce registrul canonic per-verset trece
 * din nou şi artefactul livrat corespunde exact materializării acelui corpus.
 */
export type BibliaEmanusNtRuntimeGate =
  | {
      status: "withheld"
      reason: string
      approval: null
    }
  | {
      status: "approved"
      reason: string
      approval: {
        releaseId: string
        approvedAt: string
        approvedBy: string[]
        corpusSha256: string
        /** Digestul per-verset validat de NT-EDITORIAL-APPROVAL.json. */
        editorialCorpusDigest: string
        evidence: Array<{ kind: string; path: string; sha256: string }>
        reviewScope: { books: 27; chapters: 260; verses: 7941 }
      }
    }

/** Un cuvant din limba originala, explicat pe intelesul cititorului. */
export interface WordStudy {
  original: string
  transliteration: string
  language: OriginalLanguage
  meaning: string
}

/** O unitate de sens: un verset sau un grup mic de versete, explicat. */
export interface BibleUnit {
  id: string
  /** Referinta exacta, de exemplu Geneza 1:1 sau Geneza 1:3-5. */
  ref: string
  heading: string
  /** Textul biblic, nemodificat. Cornilescu 1924, editia originala. */
  text: string
  /** Invatatura Emanus. Markdown. */
  teaching: string
  words?: WordStudy[]
  crossRefs?: string[]
  /** Aplicatia pastorala, adresata direct cititorului. */
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
  /**
   * Text biblic simplu, pentru traduceri care nu au încă explicaţii Emanus.
   * Rămâne separat de `units`, pentru ca explicaţia să nu fie confundată cu
   * Scriptura şi pentru ca fiecare fel de conţinut să fie redat onest în UI.
   */
  verses?: BibleVerse[]
  textualNotes?: BibleTextualNote[]
  alternateEndings?: BibleAlternateEnding[]
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
  translation?: BibleTranslation
}

/** Traducerea afisata. Editia originala 1924 este in domeniul public. */
export const BIBLE_TRANSLATION = "Cornilescu 1924, editia originala"

export function translationForBook(book: BibleBook): string {
  return book.translation?.name ?? BIBLE_TRANSLATION
}

/** Un capitol se deschide cititorului doar dupa revizie umana. */
export function chapterIsOpen(chapter: BibleChapter): boolean {
  return chapter.status === "published"
}

export function openChapters(book: BibleBook): BibleChapter[] {
  return book.chapters.filter(chapterIsOpen)
}

export function countUnits(book: BibleBook): number {
  return book.chapters.reduce((sum, c) => sum + c.units.length, 0)
}
