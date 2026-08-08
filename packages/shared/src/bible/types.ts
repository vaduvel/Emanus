// Model de continut pentru „Biblia explicata". Sursa de adevar: docs/21-biblia-explicata.md
//
// Regula editoriala de baza: textul biblic ramane neatins, integral, in campul
// text. Explicatia Emanus sta separat, in campuri proprii, ca sa nu poata fi
// niciodata confundata cu Scriptura.

export type Testament = "vt" | "nt"

export type BibleStatus = "draft" | "in_review" | "published"

export type OriginalLanguage = "ebraica" | "aramaica" | "greaca"

export type BibleExplanationKind = "exposition" | "textual-overview"

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
  /** Textul biblic al traducerii asociate cărții, păstrat separat de explicație. */
  text: string
  /** Invatatura Emanus. Markdown. */
  teaching: string
  /** Tipul explicației: expunere din sursa editorială sau overview textual de completare. */
  explanationKind?: BibleExplanationKind
  /** Eticheta scurtă a provenienței explicației, folosită numai intern de gate-urile editoriale. */
  explanationSource?: string
  words?: WordStudy[]
  /** Proveniența separată a notelor lexicale; nu este confundată cu sursa doctrinei. */
  wordSource?: string
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
  prayer: string
  status: BibleStatus
}

export interface BibleBook {
  id: string
  name: string
  testament: Testament
  order: number
  blurb: string
  /** Eticheta traducerii biblice folosite de această carte în cititor. */
  translation?: string
  chapters: BibleChapter[]
}

export const BIBLIA_EMANUS_TRANSLATION = "Biblia Emanus"

/** Traducerea afisata. Editia originala 1924 este in domeniul public. */
export const BIBLE_TRANSLATION = "Cornilescu 1924, editia originala"

/**
 * Un capitol se deschide cititorului numai când artefactul afișat este gata
 * editorial pentru ediția publică. Review-ul explicației și stadiul textului
 * biblic sunt verificate separat înainte ca statusul final să ajungă aici.
 */
export function chapterIsOpen(chapter: BibleChapter): boolean {
  return chapter.status === "published"
}

export function openChapters(book: BibleBook): BibleChapter[] {
  return book.chapters.filter(chapterIsOpen)
}

export function countUnits(book: BibleBook): number {
  return book.chapters.reduce((sum, c) => sum + c.units.length, 0)
}
