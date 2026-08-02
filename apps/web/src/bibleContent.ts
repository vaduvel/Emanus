import { BIBLE_TRANSLATION } from "@emanus/shared/bible/types"
import type { BibleBook, BibleChapter, BibleStatus, BibleUnit, Testament, WordStudy } from "@emanus/shared/bible/types"
import { readBibleCache, writeBibleCache } from "./bibleCache"
import { getSupabase } from "./supabase"

export const DEFAULT_BIBLE_TRANSLATION = BIBLE_TRANSLATION

export interface BibleCatalogChapter {
  id: string
  bookId: string
  number: number
  title: string
  summary: string
  status: BibleStatus
}

export interface BibleCatalogBook {
  id: string
  name: string
  testament: Testament
  order: number
  blurb: string
  translation: string
  chapters: BibleCatalogChapter[]
}

export interface BibleSearchHit {
  unitId: string
  bookId: string
  bookName: string
  chapter: number
  ref: string
  heading: string
  excerpt: string
}

const editorial = import.meta.env.DEV
  ? () => import("@emanus/shared/bible")
  : null

let catalogMemory: BibleCatalogBook[] | null = null
let catalogRequest: Promise<BibleCatalogBook[]> | null = null
const chapterMemory = new Map<string, BibleChapter>()

function cachePrefix(): string {
  return import.meta.env.DEV ? "editorial" : "public"
}

function chapterKey(bookId: string, chapter: number): string {
  return `${cachePrefix()}:chapter:${bookId}:${chapter}`
}

export function normalizeBibleSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function online(): boolean {
  return typeof navigator === "undefined" || navigator.onLine
}

async function editorialBooks(): Promise<BibleBook[]> {
  if (!editorial) return []
  const module = await editorial()
  return module.BIBLE_BOOKS
}

function editorialCatalog(books: BibleBook[]): BibleCatalogBook[] {
  return books.map((book) => ({
    id: book.id,
    name: book.name,
    testament: book.testament,
    order: book.order,
    blurb: book.blurb,
    translation: DEFAULT_BIBLE_TRANSLATION,
    chapters: book.chapters.map((chapter) => ({
      id: chapter.id,
      bookId: chapter.bookId,
      number: chapter.number,
      title: chapter.title,
      summary: chapter.summary,
      status: chapter.status,
    })),
  }))
}

async function fetchCatalog(): Promise<BibleCatalogBook[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const chaptersPromise = (async () => {
    const rows: Record<string, unknown>[] = []
    const pageSize = 500
    for (let offset = 0; ; offset += pageSize) {
      const { data, error } = await supabase
        .from("bible_chapters")
        .select("id,book_id,chapter_number,title,summary,status")
        .order("book_id")
        .order("chapter_number")
        .range(offset, offset + pageSize - 1)
      if (error) throw error
      const page = (data ?? []) as Record<string, unknown>[]
      rows.push(...page)
      if (page.length < pageSize) return rows
    }
  })()
  const [booksResult, chapterRows] = await Promise.all([
    supabase
      .from("bible_books")
      .select("id,name,testament,book_order,blurb,translation")
      .order("book_order"),
    chaptersPromise,
  ])
  if (booksResult.error) throw booksResult.error
  return (booksResult.data ?? []).map((book) => ({
    id: String(book.id),
    name: String(book.name),
    testament: String(book.testament) as Testament,
    order: Number(book.book_order),
    blurb: String(book.blurb),
    translation: String(book.translation),
    chapters: chapterRows
      .filter((chapter) => chapter.book_id === book.id)
      .map((chapter) => ({
        id: String(chapter.id),
        bookId: String(chapter.book_id),
        number: Number(chapter.chapter_number),
        title: String(chapter.title),
        summary: String(chapter.summary),
        status: String(chapter.status) as BibleStatus,
      })),
  }))
}

export async function loadBibleCatalog(force = false): Promise<BibleCatalogBook[]> {
  if (!force && catalogMemory) return catalogMemory
  if (!force && catalogRequest) return catalogRequest
  catalogRequest = (async () => {
    const cacheKey = `${cachePrefix()}:catalog`
    if (import.meta.env.DEV) {
      const local = editorialCatalog(await editorialBooks())
      catalogMemory = local
      await writeBibleCache(cacheKey, local)
      return local
    }
    const cached = await readBibleCache<BibleCatalogBook[]>(cacheKey)
    if (!online() && cached) {
      catalogMemory = cached
      return cached
    }
    try {
      const remote = await fetchCatalog()
      if (remote.length > 0 || !import.meta.env.DEV) {
        catalogMemory = remote
        await writeBibleCache(cacheKey, remote)
        return remote
      }
    } catch {
      if (!import.meta.env.DEV && cached) {
        catalogMemory = cached
        return cached
      }
    }
    catalogMemory = cached ?? []
    return catalogMemory
  })()
  try {
    return await catalogRequest
  } finally {
    catalogRequest = null
  }
}

function mapWords(value: unknown): WordStudy[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value as WordStudy[]
}

async function fetchChapter(bookId: string, chapter: number): Promise<BibleChapter | null> {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data: chapterRow, error: chapterError } = await supabase
    .from("bible_chapters")
    .select("id,book_id,chapter_number,title,summary,literary_context,historical_context,prayer,status")
    .eq("book_id", bookId)
    .eq("chapter_number", chapter)
    .maybeSingle()
  if (chapterError) throw chapterError
  if (!chapterRow) return null
  const { data: unitRows, error: unitsError } = await supabase
    .from("bible_units")
    .select("id,ref,heading,bible_text,teaching,words,cross_refs,for_your_heart,unit_order")
    .eq("chapter_id", chapterRow.id)
    .order("unit_order")
  if (unitsError) throw unitsError
  return {
    id: String(chapterRow.id),
    bookId: String(chapterRow.book_id),
    number: Number(chapterRow.chapter_number),
    title: String(chapterRow.title),
    summary: String(chapterRow.summary),
    literaryContext: String(chapterRow.literary_context),
    historicalContext: String(chapterRow.historical_context),
    prayer: String(chapterRow.prayer),
    status: String(chapterRow.status) as BibleStatus,
    units: (unitRows ?? []).map((unit): BibleUnit => ({
      id: String(unit.id),
      ref: String(unit.ref),
      heading: String(unit.heading),
      text: String(unit.bible_text),
      teaching: String(unit.teaching),
      words: mapWords(unit.words),
      crossRefs: Array.isArray(unit.cross_refs) ? (unit.cross_refs as string[]) : undefined,
      forYourHeart: unit.for_your_heart ? String(unit.for_your_heart) : undefined,
    })),
  }
}

async function loadEditorialChapter(bookId: string, chapter: number): Promise<BibleChapter | null> {
  const books = await editorialBooks()
  return books.find((book) => book.id === bookId)?.chapters.find((item) => item.number === chapter) ?? null
}

export async function loadBibleChapter(bookId: string, chapter: number): Promise<BibleChapter | null> {
  const key = `${bookId}:${chapter}`
  const memory = chapterMemory.get(key)
  if (memory) return memory
  const cacheKey = chapterKey(bookId, chapter)
  if (import.meta.env.DEV) {
    const local = await loadEditorialChapter(bookId, chapter)
    if (local) {
      chapterMemory.set(key, local)
      await writeBibleCache(cacheKey, local)
    }
    return local
  }
  const cached = await readBibleCache<BibleChapter>(cacheKey)
  if (!online() && cached) {
    chapterMemory.set(key, cached)
    return cached
  }
  try {
    const remote = await fetchChapter(bookId, chapter)
    if (remote) {
      chapterMemory.set(key, remote)
      await writeBibleCache(cacheKey, remote)
      return remote
    }
    // Un raspuns gol primit online inseamna ca RLS nu mai publica acel capitol.
    // Nu reinviem din cache un continut retras editorial.
    if (online()) return null
  } catch {
    if (cached) {
      chapterMemory.set(key, cached)
      return cached
    }
  }
  return cached
}

function searchEditorial(books: BibleBook[], query: string, limit: number): BibleSearchHit[] {
  const needle = normalizeBibleSearch(query)
  const hits: BibleSearchHit[] = []
  for (const book of books) {
    for (const chapter of book.chapters) {
      for (const unit of chapter.units) {
        const haystack = normalizeBibleSearch(
          `${book.name} ${chapter.title} ${chapter.summary} ${unit.ref} ${unit.heading} ${unit.text} ${unit.teaching} ${unit.forYourHeart ?? ""}`,
        )
        if (!haystack.includes(needle)) continue
        hits.push({
          unitId: unit.id,
          bookId: book.id,
          bookName: book.name,
          chapter: chapter.number,
          ref: unit.ref,
          heading: unit.heading,
          excerpt: unit.teaching.slice(0, 220),
        })
        if (hits.length >= limit) return hits
      }
    }
  }
  return hits
}

export async function searchBible(query: string, limit = 20): Promise<BibleSearchHit[]> {
  const normalized = normalizeBibleSearch(query)
  if (normalized.length < 2) return []
  if (import.meta.env.DEV) return searchEditorial(await editorialBooks(), normalized, limit)
  const supabase = getSupabase()
  if (supabase && online()) {
    const { data, error } = await supabase.rpc("search_bible_content", {
      p_query: normalized,
      p_limit: limit,
    })
    if (!error) {
      const hits = (data ?? []).map((row: Record<string, unknown>): BibleSearchHit => ({
        unitId: String(row.unit_id),
        bookId: String(row.book_id),
        bookName: String(row.book_name),
        chapter: Number(row.chapter_number),
        ref: String(row.ref),
        heading: String(row.heading),
        excerpt: String(row.excerpt),
      }))
      return hits
    }
  }
  return []
}

export async function searchBibleTerms(terms: string[], limit = 12): Promise<BibleSearchHit[]> {
  const groups = await Promise.all(terms.slice(0, 8).map((term) => searchBible(term, limit)))
  const unique = new Map<string, BibleSearchHit>()
  for (const hit of groups.flat()) {
    if (!unique.has(hit.unitId)) unique.set(hit.unitId, hit)
    if (unique.size >= limit) break
  }
  return [...unique.values()].slice(0, limit)
}
