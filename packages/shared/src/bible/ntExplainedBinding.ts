import type {
  BibleBook,
  BibleChapter,
  BibleExplanationKind,
  BibleUnit,
  WordStudy,
} from "./types.js"

export interface NtExplainedUnitSource {
  id: string
  ref: string
  verseStart: number
  verseEnd: number
  heading: string
  teaching: string
  explanationKind: BibleExplanationKind
  words?: WordStudy[]
  crossRefs?: string[]
  forYourHeart?: string
}

export interface NtExplainedChapterSource {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  prayer: string
  units: NtExplainedUnitSource[]
}

export interface NtExplainedSourceBook {
  id: string
  sourceId: string
  name: string
  order: number
  blurb: string
  chapters: NtExplainedChapterSource[]
}

/**
 * Corpusul explicativ folosește încă id-ul editorial istoric `fapte`, în timp ce
 * readerul public a stabilizat ruta la `faptele-apostolilor`.
 */
export function normalizeNtExplainedBookId(id: string): string {
  return id === "fapte" ? "faptele-apostolilor" : id
}

function canonicalPassage(chapter: BibleChapter, from: number, to: number): string {
  return (chapter.verses ?? [])
    .filter((verse) => verse.number >= from && verse.number <= to)
    .map((verse) => verse.text)
    .join(" ")
}

function bindChapter(
  book: BibleBook,
  canonical: BibleChapter,
  explained: NtExplainedChapterSource,
): BibleChapter {
  if (canonical.number !== explained.number) {
    throw new Error(
      `[Biblia explicată NT] ${book.name}: capitol canonic ${canonical.number}, explicație ${explained.number}.`,
    )
  }

  const verses = canonical.verses ?? []
  if (verses.length === 0) {
    throw new Error(`[Biblia explicată NT] ${book.name} ${canonical.number}: text canonic lipsă.`)
  }

  const coverage = new Map<number, string[]>()
  const units: BibleUnit[] = explained.units.map((unit) => {
    if (
      !Number.isInteger(unit.verseStart) ||
      !Number.isInteger(unit.verseEnd) ||
      unit.verseStart < 1 ||
      unit.verseEnd < unit.verseStart
    ) {
      throw new Error(`[Biblia explicată NT] ${unit.ref}: interval canonic invalid.`)
    }
    if (!unit.teaching.trim()) {
      throw new Error(`[Biblia explicată NT] ${unit.ref}: explicație goală.`)
    }

    for (const verse of verses) {
      if (verse.number < unit.verseStart || verse.number > unit.verseEnd) continue
      const owners = coverage.get(verse.number) ?? []
      owners.push(unit.id)
      coverage.set(verse.number, owners)
    }

    const text = canonicalPassage(canonical, unit.verseStart, unit.verseEnd)
    if (!text) {
      throw new Error(`[Biblia explicată NT] ${unit.ref}: intervalul nu conține text canonic public.`)
    }

    return {
      id: unit.id,
      ref: unit.ref,
      verseStart: unit.verseStart,
      verseEnd: unit.verseEnd,
      heading: unit.heading,
      text,
      teaching: unit.teaching,
      explanationKind: unit.explanationKind,
      words: unit.words,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  for (const verse of verses) {
    const owners = coverage.get(verse.number) ?? []
    if (owners.length !== 1) {
      throw new Error(
        `[Biblia explicată NT] ${book.name} ${canonical.number}:${verse.number} are ${owners.length} explicații (${owners.join(", ") || "niciuna"}).`,
      )
    }
  }

  return {
    ...canonical,
    title: explained.title,
    summary: explained.summary,
    literaryContext: explained.literaryContext,
    historicalContext: explained.historicalContext,
    units,
    prayer: explained.prayer,
  }
}

export function bindNtBooksToExplainedContent(
  canonicalBooks: readonly BibleBook[],
  explainedBooks: readonly NtExplainedSourceBook[],
): BibleBook[] {
  const explainedById = new Map(
    explainedBooks.map((book) => [normalizeNtExplainedBookId(book.id), book]),
  )

  const bound = canonicalBooks.map((book) => {
    if (book.testament !== "nt") {
      throw new Error(`[Biblia explicată NT] ${book.name} nu este carte NT.`)
    }
    const explained = explainedById.get(book.id)
    if (!explained) {
      throw new Error(`[Biblia explicată NT] lipsește corpusul explicativ pentru ${book.name} (${book.id}).`)
    }
    if (explained.order !== book.order || explained.sourceId.length === 0) {
      throw new Error(`[Biblia explicată NT] metadate canonice invalide pentru ${book.name}.`)
    }
    if (explained.chapters.length !== book.chapters.length) {
      throw new Error(
        `[Biblia explicată NT] ${book.name}: ${explained.chapters.length}/${book.chapters.length} capitole explicate.`,
      )
    }

    const chaptersByNumber = new Map(explained.chapters.map((chapter) => [chapter.number, chapter]))
    return {
      ...book,
      blurb: explained.blurb,
      chapters: book.chapters.map((chapter) => {
        const source = chaptersByNumber.get(chapter.number)
        if (!source) {
          throw new Error(`[Biblia explicată NT] ${book.name} ${chapter.number}: explicație lipsă.`)
        }
        return bindChapter(book, chapter, source)
      }),
    }
  })

  if (bound.length !== explainedBooks.length) {
    const canonicalIds = new Set(bound.map((book) => book.id))
    const extras = explainedBooks
      .map((book) => normalizeNtExplainedBookId(book.id))
      .filter((id) => !canonicalIds.has(id))
    throw new Error(`[Biblia explicată NT] corpusuri fără carte canonică: ${extras.join(", ") || "număr invalid"}.`)
  }

  return bound
}
