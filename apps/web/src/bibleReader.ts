import type { BibleBook, BibleStatus, Testament } from "@emanus/shared/bible-types"

export interface BibleChapterSummary {
  id: string
  bookId: string
  number: number
  title: string
  summary: string
  status: BibleStatus
}

export interface BibleBookSummary {
  id: string
  name: string
  testament: Testament
  order: number
  blurb: string
  translation?: string
  chapters: BibleChapterSummary[]
}

export interface BibleCatalog {
  schemaVersion: number
  translation: string
  bookCount: number
  chapterCount: number
  books: BibleBookSummary[]
}

export interface BibleNeedResult {
  bookId: string
  bookName: string
  chapter: number
  ref: string
  heading: string
}

interface BibleNeedsIndex {
  schemaVersion: number
  results: Record<string, BibleNeedResult[]>
}

const base = `${import.meta.env.BASE_URL}biblia-emanus`
const bookCache = new Map<string, Promise<BibleBook>>()
let catalogRequest: Promise<BibleCatalog> | undefined
let needsRequest: Promise<BibleNeedsIndex> | undefined

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Nu am putut deschide Biblia Emanus (${response.status}).`)
  return response.json() as Promise<T>
}

export function loadBibleCatalog(): Promise<BibleCatalog> {
  catalogRequest ??= fetchJson<BibleCatalog>(`${base}/catalog.json`).catch((error: unknown) => {
    catalogRequest = undefined
    throw error
  })
  return catalogRequest
}

export function loadBibleNeeds(): Promise<BibleNeedsIndex> {
  needsRequest ??= fetchJson<BibleNeedsIndex>(`${base}/needs.json`).catch((error: unknown) => {
    needsRequest = undefined
    throw error
  })
  return needsRequest
}

export function loadBibleBook(bookId: string): Promise<BibleBook> {
  const safeId = encodeURIComponent(bookId)
  let request = bookCache.get(safeId)
  if (!request) {
    request = fetchJson<BibleBook>(`${base}/books/${safeId}.json`).catch((error: unknown) => {
      bookCache.delete(safeId)
      throw error
    })
    bookCache.set(safeId, request)
  }
  return request
}

export async function loadAllBibleBooks(books: readonly BibleBookSummary[]): Promise<BibleBook[]> {
  return Promise.all(books.map((book) => loadBibleBook(book.id)))
}
