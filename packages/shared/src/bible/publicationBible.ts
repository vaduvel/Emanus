import type { BibleBook } from "./types.js"
import { BIBLE_BOOKS } from "./index.js"
import { IMPARATI1 } from "./imparati1.js"
import {
  VT_OVERLAY_BIBLE_BOOKS,
  VT_OVERLAY_TEMPORARY_TEXTS,
  VT_OVERLAY_TRANSLATION_BLOCKERS,
} from "./overlayBibleBooks.js"

/**
 * Sursele editoriale rămân în metadata internă pentru audit, dar cititorul
 * primește explicația direct, fără atribuirea ei unui autor modern.
 */
function directReaderText(value: string): string {
  return value
    .replace(/\bAceasta este interpretarea lui (?:Zac\s+)?Poonen\b/giu, "Aceasta este o interpretare")
    .replace(/\bAceasta este schema lui (?:Zac\s+)?Poonen\b/giu, "Aceasta este o schemă")
    .replace(/\binterpretarea lui (?:Zac\s+)?Poonen\b/giu, "această interpretare")
    .replace(/\blectura lui (?:Zac\s+)?Poonen\b/giu, "această lectură")
    .replace(/\bschema lui (?:Zac\s+)?Poonen\b/giu, "această schemă")
    .replace(/\bpredica lui (?:Zac\s+)?Poonen\b/giu, "expunerea")
    .replace(/\baplicația lui (?:Zac\s+)?Poonen\b/giu, "această aplicație")
    .replace(/\bteologia lui (?:Zac\s+)?Poonen\b/giu, "această formulare teologică")
    .replace(/\bsursa (?:lui )?(?:Zac\s+)?Poonen\b/giu, "sursa editorială")
    .replace(/\bmaterialul (?:lui )?(?:Zac\s+)?Poonen\b/giu, "materialul sursă")
    .replace(/\bÎn lectura lui (?:Zac\s+)?Poonen,\s*/giu, "")
    .replace(/\bPentru (?:Zac\s+)?Poonen,\s*/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen spune direct că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen spune că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen subliniază că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen insistă că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen observă că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen explică că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen arată că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen amintește că\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen se oprește la\s+/giu, "Accentul cade pe ")
    .replace(/\b(?:Zac\s+)?Poonen pornește de la\s+/giu, "Punctul de plecare este ")
    .replace(/\b(?:Zac\s+)?Poonen citește\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen urmărește\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen vede\s+/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen aplică\s+/giu, "Aplicația este ")
    .replace(/\b(?:Zac\s+)?Poonen numește\s+/giu, "")
    .replace(/\bTranscriptul lui (?:Zac\s+)?Poonen\s+/giu, "Sursa editorială ")
    .replace(/\bTranscriptul (?:Zac\s+)?Poonen\s+/giu, "Sursa editorială ")
    .replace(/\blui (?:Zac\s+)?Poonen\b/giu, "")
    .replace(/\b(?:Zac\s+)?Poonen\b/giu, "")
    .replace(/\bAceasta este interpretarea lui escatologică\b/giu, "Aceasta este o interpretare escatologică")
    .replace(/\bîn interpretarea lui escatologică\b/giu, "în această interpretare escatologică")
    .replace(/\bAllen\s+Nolan\b/giu, "")
    .replace(/\bAllen\b/giu, "")
    .replace(/\bNolan\b/giu, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim()
}

function withoutNamedAttribution(book: BibleBook): BibleBook {
  return {
    ...book,
    blurb: directReaderText(book.blurb),
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      title: directReaderText(chapter.title),
      summary: directReaderText(chapter.summary),
      literaryContext: directReaderText(chapter.literaryContext),
      historicalContext: directReaderText(chapter.historicalContext),
      prayer: directReaderText(chapter.prayer),
      units: chapter.units.map((unit) => ({
        ...unit,
        heading: directReaderText(unit.heading),
        teaching: directReaderText(unit.teaching),
        words: unit.words?.map((word) => ({
          ...word,
          meaning: directReaderText(word.meaning),
        })),
        forYourHeart: unit.forYourHeart ? directReaderText(unit.forYourHeart) : undefined,
        // Proveniența nominală este internă; cititorul nu afișează numele autorului.
        explanationSource: undefined,
      })),
    })),
  }
}

function assertNoNamedAttribution(book: BibleBook): void {
  const forbidden = /\b(?:Zac\s+)?Poonen\b|\bAllen\b|\bNolan\b/iu
  const danglingAttribution = /\b(?:lectura|interpretarea|schema|predica|aplicația|teologia)\s+lui(?=[,.;:!?]|\s+(?:este|rămâne|devine|despre)\b)/iu
  const check = (value: string | undefined, where: string) => {
    if (value && forbidden.test(value)) {
      throw new Error(`[Biblia explicată] atribuire nominală vizibilă în ${where}.`)
    }
    if (value && danglingAttribution.test(value)) {
      throw new Error(`[Biblia explicată] atribuire editorială incompletă în ${where}.`)
    }
  }

  check(book.blurb, `${book.name} blurb`)
  book.chapters.forEach((chapter) => {
    check(chapter.title, `${book.name} ${chapter.number} titlu`)
    check(chapter.summary, `${book.name} ${chapter.number} rezumat`)
    check(chapter.literaryContext, `${book.name} ${chapter.number} context literar`)
    check(chapter.historicalContext, `${book.name} ${chapter.number} context istoric`)
    check(chapter.prayer, `${book.name} ${chapter.number} rugăciune`)
    chapter.units.forEach((unit) => {
      check(unit.heading, `${unit.ref} titlu explicație`)
      check(unit.teaching, `${unit.ref} explicație`)
      check(unit.forYourHeart, `${unit.ref} aplicație`)
      unit.words?.forEach((word) => check(word.meaning, `${unit.ref} explicație lexicală ${word.transliteration}`))
      if (unit.explanationSource) {
        throw new Error(`[Biblia explicată] explanationSource nu trebuie expus cititorului: ${unit.ref}.`)
      }
    })
  })
}

/**
 * Catalogul consumat de cititorul Bibliei explicate în lucru editorial.
 *
 * Nu modificăm `BIBLE_BOOKS` legacy până când toate integrările vechi sunt
 * migrate. Aici adăugăm explicit 1 Împărați și toate cele 29 de cărți overlay.
 *
 * Stadiul textului este luat exclusiv din catalogul generat. După review-ul
 * final de conținut, Judecători–Daniel rămân texte editoriale din candidatul
 * istoric până la un fresh re-audit în corpusul canonic curent. Osea este
 * Biblia Emanus canonică; ceilalți profeți mici rămân provizorii până la
 * promovarea lor individuală. Explicațiile noi rămân `in_review`.
 */
const byId = new Map<string, BibleBook>()
for (const book of BIBLE_BOOKS) byId.set(book.id, book)
byId.set(IMPARATI1.id, IMPARATI1)
for (const book of VT_OVERLAY_BIBLE_BOOKS) byId.set(book.id, book)

export const PUBLICATION_BIBLE_BOOKS: BibleBook[] = [...byId.values()]
  .sort((a, b) => a.testament.localeCompare(b.testament) || a.order - b.order)
  .map(withoutNamedAttribution)

PUBLICATION_BIBLE_BOOKS.forEach(assertNoNamedAttribution)

export function findPublicationBook(id: string): BibleBook | undefined {
  return PUBLICATION_BIBLE_BOOKS.find((book) => book.id === id)
}

export function findPublicationChapter(bookId: string, number: number) {
  return findPublicationBook(bookId)?.chapters.find((chapter) => chapter.number === number)
}

export { VT_OVERLAY_TEMPORARY_TEXTS, VT_OVERLAY_TRANSLATION_BLOCKERS }
