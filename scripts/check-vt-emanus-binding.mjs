import {
  BIBLIA_EMANUS_TRANSLATION,
  PUBLICATION_BIBLE_BOOKS,
  PUBLISHED_EMANUS_OT_TEXT_BY_ORDER,
  PUBLISHED_EMANUS_OT_BOOK_COUNT,
  PUBLISHED_EMANUS_OT_CHAPTER_COUNT,
  PUBLISHED_EMANUS_OT_VERSE_COUNT,
} from "../packages/shared/dist/bible/publicationBibleFinal.js"

const EXPECTED_BOOKS = 39
const EXPECTED_CHAPTERS = 929
const EXPECTED_VERSES = 23145
const FORBIDDEN_READER_ATTRIBUTION = /\b(?:Zac\s+)?Poonen\b|\bAllen\b|\bNolan\b|\bCFC India\b|\bThrough The Bible\b/iu
const FORBIDDEN_READER_RESEARCH_META = /\btranscript(?:ul|ului|e)?\b/iu

function need(condition, message) {
  if (!condition) throw new Error(`[VT Emanus binding] ${message}`)
}

function assertReaderText(value, where) {
  if (typeof value !== "string" || value.length === 0) return
  need(!FORBIDDEN_READER_ATTRIBUTION.test(value), `atribuire nominală vizibilă în ${where}`)
  need(!FORBIDDEN_READER_RESEARCH_META.test(value), `limbaj intern de cercetare vizibil în ${where}`)
}

need(PUBLISHED_EMANUS_OT_BOOK_COUNT === EXPECTED_BOOKS, `materializare cărți ${PUBLISHED_EMANUS_OT_BOOK_COUNT}/${EXPECTED_BOOKS}`)
need(PUBLISHED_EMANUS_OT_CHAPTER_COUNT === EXPECTED_CHAPTERS, `materializare capitole ${PUBLISHED_EMANUS_OT_CHAPTER_COUNT}/${EXPECTED_CHAPTERS}`)
need(PUBLISHED_EMANUS_OT_VERSE_COUNT === EXPECTED_VERSES, `materializare versete ${PUBLISHED_EMANUS_OT_VERSE_COUNT}/${EXPECTED_VERSES}`)

const vtBooks = PUBLICATION_BIBLE_BOOKS.filter((book) => book.testament === "vt")
need(vtBooks.length === EXPECTED_BOOKS, `reader cărți ${vtBooks.length}/${EXPECTED_BOOKS}`)

let chapters = 0
let verses = 0
let units = 0

for (const book of vtBooks) {
  const canonical = PUBLISHED_EMANUS_OT_TEXT_BY_ORDER.get(book.order)
  need(canonical, `${book.name}: lipsește corpusul canonic pentru order=${book.order}`)
  need(book.translation === BIBLIA_EMANUS_TRANSLATION, `${book.name}: translation=${book.translation ?? "missing"}`)
  need(book.chapters.length === Object.keys(canonical.chapters).length, `${book.name}: număr capitole diferit de corpus`)
  assertReaderText(book.blurb, `${book.name} blurb`)

  for (const chapter of book.chapters) {
    chapters += 1
    const canonicalVerses = canonical.chapters[chapter.number]
    need(canonicalVerses, `${book.name} ${chapter.number}: lipsește capitolul canonic`)
    verses += canonicalVerses.length
    need(chapter.status === "published", `${book.name} ${chapter.number}: status=${chapter.status}`)
    assertReaderText(chapter.title, `${book.name} ${chapter.number} titlu`)
    assertReaderText(chapter.summary, `${book.name} ${chapter.number} rezumat`)
    assertReaderText(chapter.literaryContext, `${book.name} ${chapter.number} context literar`)
    assertReaderText(chapter.historicalContext, `${book.name} ${chapter.number} context istoric`)
    assertReaderText(chapter.prayer, `${book.name} ${chapter.number} rugăciune`)

    for (const unit of chapter.units) {
      units += 1
      need(Number.isInteger(unit.verseStart), `${unit.ref}: verseStart lipsă`)
      need(Number.isInteger(unit.verseEnd), `${unit.ref}: verseEnd lipsă`)
      need(unit.verseStart >= 1, `${unit.ref}: verseStart invalid`)
      need(unit.verseEnd >= unit.verseStart, `${unit.ref}: verseEnd invalid`)
      need(unit.verseEnd <= canonicalVerses.length, `${unit.ref}: interval depășește capitolul`)
      const expectedText = canonicalVerses.slice(unit.verseStart - 1, unit.verseEnd).join(" ")
      need(unit.text === expectedText, `${unit.ref}: unit.text nu este textul publicat Biblia Emanus`)
      need(!unit.explanationSource, `${unit.ref}: explanationSource nu trebuie expus cititorului`)
      assertReaderText(unit.heading, `${unit.ref} heading`)
      assertReaderText(unit.teaching, `${unit.ref} teaching`)
      assertReaderText(unit.forYourHeart, `${unit.ref} pentru inima ta`)
      for (const word of unit.words ?? []) {
        assertReaderText(word.meaning, `${unit.ref} explicație lexicală ${word.transliteration}`)
      }
    }
  }
}

need(chapters === EXPECTED_CHAPTERS, `reader capitole ${chapters}/${EXPECTED_CHAPTERS}`)
need(verses === EXPECTED_VERSES, `reader versete ${verses}/${EXPECTED_VERSES}`)
need(units > 0, "nu există unități explicative")

console.log(
  `VT Emanus binding OK: ${vtBooks.length}/${EXPECTED_BOOKS} books, ${chapters}/${EXPECTED_CHAPTERS} chapters, ` +
  `${verses}/${EXPECTED_VERSES} canonical verses, ${units} explanation units bound by verseStart/verseEnd; zero public source attribution.`,
)
