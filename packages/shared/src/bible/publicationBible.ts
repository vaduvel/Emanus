import type { BibleBook } from "./types.js"
import { BIBLE_BOOKS } from "./index.js"
import { IMPARATI1 } from "./imparati1.js"
import {
  VT_OVERLAY_BIBLE_BOOKS,
  VT_OVERLAY_TEMPORARY_TEXTS,
  VT_OVERLAY_TRANSLATION_BLOCKERS,
} from "./overlayBibleBooks.js"

/**
 * Proveniența rămâne în metadata internă. Cititorul primește explicația direct,
 * fără numele autorului cercetat și fără limbaj de laborator despre transcript.
 */
function directReaderText(value: string): string {
  return value
    // Dacă o propoziție îl numește pe autor/sursa de cercetare, iar următoarea
    // continuă cu „El ...”, neutralizăm mai întâi pronumele cât timp referentul
    // este încă demonstrabil. Altfel, ștergerea numelui ar lăsa un „El” fără referent.
    .replace(
      /((?:Zac\s+)?Poonen[^.!?]*[.!?]\s+)El (?=(?:nu\s+)?(?:leagă|subliniază|observă|explică|insistă|folosește|vede|citește|aplică|dezvoltă|rezumă|tratează|revine|amintește|contrastează|urmărește|numește)\b)/giu,
      "$1Explicația ",
    )
    .replace(
      /(Transcriptul(?: lui (?:Zac\s+)?Poonen)?[^.!?]*[.!?]\s+)El (?=(?:nu\s+)?(?:leagă|subliniază|observă|explică|insistă|folosește|vede|citește|aplică|dezvoltă|rezumă|tratează|revine|amintește|contrastează|urmărește|numește)\b)/giu,
      "$1Explicația ",
    )

    // Formule interpretative: păstrăm caracterul de interpretare, nu autorul.
    .replace(/\bAceasta este interpretarea lui (?:Zac\s+)?Poonen\b/giu, "Aceasta este o interpretare")
    .replace(/\bAceasta este schema lui (?:Zac\s+)?Poonen\b/giu, "Aceasta este o schemă")
    .replace(/\binterpretarea lui (?:Zac\s+)?Poonen\b/giu, "această interpretare")
    .replace(/\blectura lui (?:Zac\s+)?Poonen\b/giu, "această lectură")
    .replace(/\bschema lui (?:Zac\s+)?Poonen\b/giu, "această schemă")
    .replace(/\bpredica lui (?:Zac\s+)?Poonen\b/giu, "această expunere")
    .replace(/\baplicația lui (?:Zac\s+)?Poonen\b/giu, "această aplicație")
    .replace(/\bteologia lui (?:Zac\s+)?Poonen\b/giu, "această formulare teologică")
    .replace(/\bargumentul lui (?:Zac\s+)?Poonen\b/giu, "argumentul acestei lecturi")
    .replace(/\bimaginea folosită de (?:Zac\s+)?Poonen\b/giu, "o analogie folosită aici")
    .replace(/\bÎn lectura lui (?:Zac\s+)?Poonen,\s*/giu, "În această lectură, ")
    .replace(/\bPentru (?:Zac\s+)?Poonen,\s*/giu, "În această expunere, ")

    // Verbe de atribuire: le transformăm în propoziții neutre și gramaticale.
    .replace(/\b(?:Zac\s+)?Poonen spune foarte apăsat însă că\s+/giu, "Se subliniază însă că ")
    .replace(/\b(?:Zac\s+)?Poonen spune (?:foarte )?direct că\s+/giu, "Se spune direct că ")
    .replace(/\b(?:Zac\s+)?Poonen spune că\s+/giu, "Se subliniază că ")
    .replace(/\b(?:Zac\s+)?Poonen subliniază că\s+/giu, "Se subliniază că ")
    .replace(/\b(?:Zac\s+)?Poonen insistă că\s+/giu, "Se insistă asupra faptului că ")
    .replace(/\b(?:Zac\s+)?Poonen observă că\s+/giu, "Se observă că ")
    .replace(/\b(?:Zac\s+)?Poonen explică că\s+/giu, "Explicația arată că ")
    .replace(/\b(?:Zac\s+)?Poonen arată că\s+/giu, "Se arată că ")
    .replace(/\b(?:Zac\s+)?Poonen amintește că\s+/giu, "Se amintește că ")
    .replace(/\b(?:Zac\s+)?Poonen se oprește (?:în mod special )?la\s+/giu, "Accentul cade pe ")
    .replace(/\b(?:Zac\s+)?Poonen pornește de la\s+/giu, "Punctul de plecare este ")
    .replace(/\b(?:Zac\s+)?Poonen citește\s+/giu, "O posibilă lectură citește ")
    .replace(/\b(?:Zac\s+)?Poonen vede în\s+/giu, "O posibilă lectură vede în ")
    .replace(/\b(?:Zac\s+)?Poonen vede\s+/giu, "O posibilă lectură vede ")
    .replace(/\b(?:Zac\s+)?Poonen urmărește\s+/giu, "Explicația urmărește ")
    .replace(/\b(?:Zac\s+)?Poonen aplică\s+/giu, "Aplicația pastorală leagă ")
    .replace(/\b(?:Zac\s+)?Poonen numește\s+/giu, "Explicația numește ")
    .replace(/\b(?:Zac\s+)?Poonen leagă\s+/giu, "Explicația leagă ")
    .replace(/\b(?:Zac\s+)?Poonen tratează\s+/giu, "Explicația tratează ")
    .replace(/\b(?:Zac\s+)?Poonen dezvoltă\s+/giu, "Explicația dezvoltă ")
    .replace(/\b(?:Zac\s+)?Poonen rezumă\s+/giu, "Ideea este rezumată astfel: ")
    .replace(/\b(?:Zac\s+)?Poonen revine\s+/giu, "Explicația revine ")
    .replace(/\b(?:Zac\s+)?Poonen contrastează\s+/giu, "Explicația contrastează ")
    .replace(/\b(?:Zac\s+)?Poonen folosește\s+/giu, "O aplicație folosește ")

    // Limbaj de cercetare: în produs rămâne doar ideea explicativă.
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen aplică\s+/giu, "O aplicație pastorală leagă ")
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen contrastează\s+/giu, "Explicația contrastează ")
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen folosește\s+/giu, "O aplicație folosește ")
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen pregătește\s+/giu, "Aici se pregătește ")
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen nu dezvoltă\s+/giu, "Expunerea nu dezvoltă ")
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen nu repetă toate detaliile, ci se concentrează\s+/giu, "Accentul cade ")
    .replace(/\bTranscriptul (?:lui )?(?:Zac\s+)?Poonen\b/giu, "Explicația")
    .replace(/\bTranscriptul lui\b/giu, "Explicația")
    .replace(/\bTranscriptul\b/giu, "Explicația")
    .replace(/\bsursa (?:lui )?(?:Zac\s+)?Poonen\b/giu, "explicația")
    .replace(/\bmaterialul (?:lui )?(?:Zac\s+)?Poonen\b/giu, "explicația")
    .replace(/\b(?:Zac\s+)?Poonen\s*\/\s*CFC\b/giu, "explicația")
    .replace(/\bCFC India\b/giu, "explicația")
    .replace(/\bThrough The Bible\b/giu, "expunerea")

    // Genitiv sau apariție reziduală: păstrăm o expresie neutră, nu un gol.
    .replace(/\blui (?:Zac\s+)?Poonen\b/giu, "acestei expuneri")
    .replace(/\b(?:Zac\s+)?Poonen\b/giu, "această expunere")
    .replace(/\bAceasta este interpretarea lui escatologică\b/giu, "Aceasta este o interpretare escatologică")
    .replace(/\bîn interpretarea lui escatologică\b/giu, "în această interpretare escatologică")

    // Geneza are un flux editorial separat; numele lui rămân doar în provenance.
    .replace(/\bAllen\s*[\/]\s*Nolan\b/giu, "expunerea")
    .replace(/\bAllen\s+Nolan\b/giu, "expunerea")
    .replace(/\bAllen\b/giu, "expunerea")
    .replace(/\bNolan\b/giu, "expunerea")

    // Curățări finale după neutralizarea sursei.
    .replace(/\bExplicația lui\b/giu, "Explicația")
    .replace(/\bEl leagă\b/giu, "Explicația leagă")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\bexplicația explicația\b/giu, "explicația")
    .replace(/\bexpunerea expunerea\b/giu, "expunerea")
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
        // Proveniența nominală este exclusiv internă.
        explanationSource: undefined,
      })),
    })),
  }
}

function assertNoNamedAttribution(book: BibleBook): void {
  const forbidden = /\b(?:Zac\s+)?Poonen\b|\bAllen\b|\bNolan\b|\bCFC India\b|\bThrough The Bible\b/iu
  const researchMeta = /\btranscript(?:ul|ului|e)?\b/iu
  const danglingAttribution = /\b(?:lectura|interpretarea|schema|predica|aplicația|teologia)\s+lui(?=[,.;:!?]|\s+(?:este|rămâne|devine|despre)\b)/iu
  const check = (value: string | undefined, where: string) => {
    if (value && forbidden.test(value)) {
      throw new Error(`[Biblia explicată] atribuire nominală vizibilă în ${where}.`)
    }
    if (value && researchMeta.test(value)) {
      throw new Error(`[Biblia explicată] limbaj intern de cercetare vizibil în ${where}.`)
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
 * Catalogul consumat de reader.
 *
 * Statusul explicației și stadiul traducerii sunt independente. Un overlay
 * explicativ poate fi `published`, dar overlayBibleBooks ține capitolul închis
 * dacă textul biblic asociat este încă `temporary-editorial`. Când Biblia
 * Emanus înlocuiește textul de lucru, explicația nu mai cere un nou review.
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
