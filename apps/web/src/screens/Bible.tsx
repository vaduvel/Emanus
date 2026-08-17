import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Eraser,
  Heart,
  HandHeart,
  Info,
  Languages,
  Link2,
  MapPin,
  PenLine,
  Quote,
  Search,
  Share2,
  Sparkles,
  Star,
  X,
} from "lucide-react"
import type { BibleBook, BibleChapter, BibleStatus, BibleUnit, BibleVerse } from "@emanus/shared/bible-types"
import { BIBLIA_EMANUS_TRANSLATION } from "@emanus/shared/bible-types"
import needs from "../data/bible-needs.json"
import {
  explanationRanges,
  resolveVerseExplanation,
  resolveVerseExplanationSelection,
} from "../bible/explanationMapping"
import {
  loadAllBibleBooks,
  loadBibleBook,
  loadBibleCatalog,
  loadBibleNeeds,
  type BibleBookSummary,
  type BibleNeedResult,
} from "../bibleReader"
import { navigate } from "../router"
import "../bible.css"

const LAST_KEY = "emanus.bible.last"
const SAVED_CHAPTERS_KEY = "emanus.bible.saved.chapters.v2"
const MODE_KEY = "emanus.bible.reader.mode"
const VERSE_HIGHLIGHTS_KEY = "emanus.bible.verse.highlights.v1"
const FAVORITE_VERSES_KEY = "emanus.bible.verse.favorites.v1"
const SHOW_EDITORIAL = import.meta.env.DEV

type ReaderMode = "scripture" | "understand"
type HighlightColor = "gold" | "sage" | "sky" | "rose"
type SearchFilter = "all" | "verses" | "explanations" | "books"
type SavedTab = "favorites" | "highlights" | "continue"
type Overlay = "search" | "saved" | "needs" | null
type LastRead = { bookId: string; bookName?: string; chapter: number; title: string; verse?: number; mode?: ReaderMode }
type SearchHit = {
  kind: "verse" | "explanation"
  bookId: string
  bookName: string
  chapter: number
  title: string
  excerpt: string
  verse?: number
}

type ChapterTarget = { bookId: string; chapter: number; verse?: number; mode?: ReaderMode }

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function readArray(key: string): string[] {
  const value = readJson<unknown>(key, [])
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []
}

function readHighlights(): Record<string, HighlightColor> {
  const value = readJson<unknown>(VERSE_HIGHLIGHTS_KEY, {})
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, HighlightColor] =>
    typeof entry[0] === "string" && ["gold", "sage", "sky", "rose"].includes(String(entry[1]))))
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Biblia rămâne utilizabilă când stocarea locală este blocată.
  }
}

function readLast(): LastRead | null {
  const value = readJson<unknown>(LAST_KEY, null)
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const candidate = value as Partial<LastRead>
  if (typeof candidate.bookId !== "string" || candidate.bookId.trim().length === 0) return null
  if (!Number.isInteger(candidate.chapter) || (candidate.chapter ?? 0) < 1) return null
  if (typeof candidate.title !== "string" || candidate.title.trim().length === 0) return null
  if (candidate.bookName !== undefined && typeof candidate.bookName !== "string") return null
  if (candidate.verse !== undefined && (!Number.isInteger(candidate.verse) || candidate.verse < 1)) return null
  if (candidate.mode !== undefined && candidate.mode !== "scripture" && candidate.mode !== "understand") return null
  return {
    bookId: candidate.bookId,
    bookName: candidate.bookName,
    chapter: candidate.chapter as number,
    title: candidate.title,
    verse: candidate.verse,
    mode: candidate.mode,
  }
}

function readSavedChapters(): string[] {
  return readArray(SAVED_CHAPTERS_KEY)
}

function chapterKey(bookId: string, chapter: number): string {
  return `${bookId}:${chapter}`
}

function verseKey(bookId: string, chapter: number, verse: number): string {
  return `${bookId}:${chapter}:${verse}`
}

function chooserUrl(testament?: "vt" | "nt", bookId?: string): string {
  const params = new URLSearchParams()
  if (testament) params.set("testament", testament)
  if (bookId) params.set("carte", bookId)
  const query = params.toString()
  return `/biblia/alege${query ? `?${query}` : ""}`
}

function chapterUrl({ bookId, chapter, verse }: ChapterTarget): string {
  return `/biblia/${bookId}/${chapter}${verse ? `?verset=${verse}` : ""}`
}

function paragraphs(text: string): string[] {
  return text.split("\n\n").map((part) => part.trim()).filter(Boolean)
}

function plain(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function concise(text: string, limit = 150): string {
  const normalized = paragraphs(text)[0]?.replace(/\s+/gu, " ").trim() ?? ""
  if (normalized.length <= limit) return normalized
  const excerpt = normalized.slice(0, limit)
  const lastSpace = excerpt.lastIndexOf(" ")
  return `${excerpt.slice(0, lastSpace > limit * 0.7 ? lastSpace : limit).trim()}…`
}

function chapterIsOpen(chapter: { status: BibleStatus }): boolean {
  return chapter.status === "published"
}

function visibleChapters<T extends { status: BibleStatus }>(chapters: T[]): T[] {
  return SHOW_EDITORIAL ? chapters : chapters.filter(chapterIsOpen)
}

function BrandMark() {
  return <div className="bible-brand" aria-label="Emanus">
    <img src="/emanus-mark.svg" alt="" aria-hidden />
    <span>emanus</span>
  </div>
}

function IconButton({ label, onClick, active = false, children }: {
  label: string
  onClick: () => void
  active?: boolean
  children: ReactNode
}) {
  return <button
    type="button"
    className={active ? "bible-icon-button is-active" : "bible-icon-button"}
    aria-label={label}
    aria-pressed={active || undefined}
    onClick={onClick}
  >{children}</button>
}

function BibleDialog({ open, title, onClose, children, immersive = false }: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  immersive?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return <dialog
    ref={ref}
    className={immersive ? "bible-sheet bible-sheet--immersive" : "bible-sheet"}
    aria-label={title === "Biblia mea" ? "Salvate" : undefined}
    aria-labelledby={title === "Biblia mea" ? undefined : titleId}
    onCancel={(event) => {
      event.preventDefault()
      onClose()
    }}
    onClick={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}
  >
    <div className="bible-sheet__surface">
      <header className="bible-sheet__head">
        <h2 id={titleId}>{title}</h2>
        <IconButton label="Închide" onClick={onClose}><X size={21} aria-hidden /></IconButton>
      </header>
      {children}
    </div>
  </dialog>
}

function BookTile({ book, onClick }: { book: BibleBookSummary; onClick: () => void }) {
  return <button type="button" className="bible-book-tile" onClick={onClick}>
    <span className="bible-book-tile__sigil" aria-hidden>{book.order}</span>
    <strong>{book.name}</strong>
    <span>{visibleChapters(book.chapters).length} capitole</span>
  </button>
}

function BookRail({ id, title, books, onAll, onBook }: {
  id: string
  title: string
  books: BibleBookSummary[]
  onAll: () => void
  onBook: (book: BibleBookSummary) => void
}) {
  return <section className="bible-shelf" aria-labelledby={id}>
    <header className="bible-shelf__head">
      <h2 id={id}><BookMarked size={21} aria-hidden /> {title}</h2>
      <button type="button" className="bible-link" onClick={onAll}>Vezi toate <ArrowRight size={16} aria-hidden /></button>
    </header>
    <div className="bible-shelf__rail">
      {books.slice(0, 5).map((book) => <BookTile key={book.id} book={book} onClick={() => onBook(book)} />)}
    </div>
  </section>
}

function SearchExperience({ catalog, onOpen, onBook }: {
  catalog: BibleBookSummary[]
  onOpen: (target: ChapterTarget) => void
  onBook: (book: BibleBookSummary) => void
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<SearchFilter>("all")
  const [books, setBooks] = useState<BibleBook[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2 || books || filter === "books") return
    let active = true
    const timer = window.setTimeout(() => {
      setLoading(true)
      void loadAllBibleBooks(catalog)
        .then((value) => { if (active) setBooks(value) })
        .catch(() => { if (active) setFailed(true) })
        .finally(() => { if (active) setLoading(false) })
    }, 250)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [books, catalog, filter, query])

  const hits = useMemo<SearchHit[]>(() => {
    const needle = plain(query.trim())
    if (needle.length < 2 || !books) return []
    const results: SearchHit[] = []
    for (const book of books) {
      for (const chapter of visibleChapters(book.chapters)) {
        const verse = chapter.verses?.find((candidate) => plain(candidate.text).includes(needle))
        const unit = chapter.units.find((candidate) => plain(`${candidate.heading} ${candidate.teaching}`).includes(needle))
        if (verse && (filter === "all" || filter === "verses")) results.push({
          kind: "verse", bookId: book.id, bookName: book.name, chapter: chapter.number,
          title: chapter.title, excerpt: verse.text, verse: verse.number,
        })
        if (unit && (filter === "all" || filter === "explanations")) results.push({
          kind: "explanation", bookId: book.id, bookName: book.name, chapter: chapter.number,
          title: unit.heading, excerpt: unit.teaching, verse: unit.verseStart,
        })
        if (results.length >= 40) return results
      }
    }
    return results
  }, [books, filter, query])

  const bookHits = useMemo(() => {
    const needle = plain(query.trim())
    if (needle.length < 2 || (filter !== "all" && filter !== "books")) return []
    return catalog.filter((book) => plain(`${book.name} ${book.blurb}`).includes(needle)).slice(0, 12)
  }, [catalog, filter, query])

  return <div className="bible-search-experience">
    <label className="bible-search-field">
      <Search size={20} aria-hidden />
      <input
        autoFocus
        type="search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Caută un cuvânt, un verset sau o carte"
        aria-label="Caută în Biblia Emanus"
      />
    </label>
    <div className="bible-filter-bar" aria-label="Filtrează căutarea">
      {([[
        "all", "Toate"], ["verses", "Versete"], ["explanations", "Explicații"], ["books", "Cărți"],
      ] as Array<[SearchFilter, string]>).map(([value, label]) => <button
        key={value}
        type="button"
        className={filter === value ? "is-active" : ""}
        aria-pressed={filter === value}
        onClick={() => setFilter(value)}
      >{label}</button>)}
    </div>
    {query.trim().length < 2 && <p className="bible-sheet__hint">Scrie cel puțin două litere. Căutarea verifică textul complet și explicațiile disponibile.</p>}
    {loading && <p className="bible-sheet__hint">Se deschide corpusul complet…</p>}
    {failed && <p className="bible-sheet__hint">Căutarea nu s-a putut încărca. Încearcă din nou.</p>}
    {!loading && query.trim().length >= 2 && hits.length === 0 && bookHits.length === 0 && (books || filter === "books") && <p className="bible-sheet__hint">Nu am găsit acest cuvânt.</p>}
    <div className="bible-result-list">
      {bookHits.map((book) => <button key={book.id} type="button" className="bible-result bible-result--book" onClick={() => onBook(book)}>
        <span className="bible-result__ref">{book.testament === "vt" ? "Vechiul Testament" : "Noul Testament"}</span>
        <strong>{book.name}</strong><span>{book.blurb}</span><ChevronRight size={18} aria-hidden />
      </button>)}
      {hits.map((hit) => <button
        key={`${hit.kind}-${hit.bookId}-${hit.chapter}-${hit.verse ?? 0}`}
        type="button"
        className="bible-result"
        onClick={() => onOpen({ bookId: hit.bookId, chapter: hit.chapter, verse: hit.verse, mode: hit.kind === "explanation" ? "understand" : "scripture" })}
      >
        <span className="bible-result__ref">{hit.kind === "verse" ? "Text biblic" : "Explicație"} · {hit.bookName} {hit.chapter}{hit.verse ? `:${hit.verse}` : ""}</span>
        <strong>{hit.title}</strong>
        <span>{hit.excerpt}</span>
        <ChevronRight size={18} aria-hidden />
      </button>)}
    </div>
  </div>
}

type Need = (typeof needs)[number]

function NeedsExperience({ onOpen }: { onOpen: (target: ChapterTarget) => void }) {
  const [selected, setSelected] = useState<Need | null>(null)
  const [index, setIndex] = useState<Record<string, BibleNeedResult[]> | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    void loadBibleNeeds()
      .then((value) => { if (active) setIndex(value.results) })
      .catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [])

  const results = selected && index ? (index[selected.id] ?? []) : []

  return <div className="bible-needs-experience">
    <div className="bible-needs-hero">
      <img src="/bible-pain-light.svg" alt="O persoană privind spre lumina care se deschide peste drum" />
      <div><span>Scriptura în locul în care ești</span><strong>Nu primești o frază izolată, ci un pasaj întreg.</strong></div>
    </div>
    <p className="bible-sheet__lead">Alege ce porți acum. Deschidem pasaje întregi, nu versete scoase din context.</p>
    <div className="bible-need-grid">
      {needs.map((need) => <button
        key={need.id}
        type="button"
        className={selected?.id === need.id ? "bible-need is-selected" : "bible-need"}
        aria-pressed={selected?.id === need.id}
        onClick={() => setSelected(need)}
      ><Heart size={17} aria-hidden /> {need.label}</button>)}
    </div>
    {selected && <section className="bible-need-results" aria-live="polite">
      <h3>{selected.label}</h3>
      {!index && !failed && <p className="bible-sheet__hint">Căutăm pasajele potrivite…</p>}
      {failed && <p className="bible-sheet__hint">Pasajele nu s-au putut încărca.</p>}
      {index && results.length === 0 && <p className="bible-sheet__hint">Nu avem încă un pasaj indexat pentru această nevoie.</p>}
      {results.map((result) => <button
        key={`${result.bookId}-${result.chapter}-${result.ref}`}
        type="button"
        className="bible-result"
        onClick={() => onOpen({ bookId: result.bookId, chapter: result.chapter })}
      >
        <span className="bible-result__ref">{result.ref}</span>
        <strong>{result.heading}</strong>
        <span>Deschide pasajul în context</span>
        <ChevronRight size={18} aria-hidden />
      </button>)}
    </section>}
  </div>
}

function SavedExperience({ favorites, chapters, highlights, last, onOpen }: {
  favorites: Array<{ book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number]; verse: number }>
  chapters: Array<{ book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number] }>
  highlights: Array<{ book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number]; verse: number; color: HighlightColor }>
  last: LastRead | null
  onOpen: (target: ChapterTarget) => void
}) {
  const [tab, setTab] = useState<SavedTab>("favorites")
  const items = tab === "favorites" ? favorites : highlights
  return <div className="bible-mine">
    <div className="bible-filter-bar bible-filter-bar--wide" aria-label="Biblia mea">
      <button type="button" className={tab === "favorites" ? "is-active" : ""} aria-pressed={tab === "favorites"} onClick={() => setTab("favorites")}>Salvate</button>
      <button type="button" className={tab === "highlights" ? "is-active" : ""} aria-pressed={tab === "highlights"} onClick={() => setTab("highlights")}>Marcaje</button>
      <button type="button" className={tab === "continue" ? "is-active" : ""} aria-pressed={tab === "continue"} onClick={() => setTab("continue")}>Continui</button>
    </div>
    {tab !== "continue" && <section className="bible-saved-section">
      <h3>{tab === "favorites" ? <><Star size={18} aria-hidden /> Versete favorite</> : <><PenLine size={18} aria-hidden /> Versete marcate</>}</h3>
      {items.length === 0 && <p className="bible-sheet__empty"><Bookmark size={24} aria-hidden /> Nu ai încă nimic aici.</p>}
      <div className="bible-result-list">{items.map(({ book, chapter, verse, ...item }) => <button
        key={`${book.id}-${chapter.number}-${verse}`}
        type="button"
        className="bible-result"
        onClick={() => onOpen({ bookId: book.id, chapter: chapter.number, verse, mode: "scripture" })}
      >
        <span className="bible-result__ref">{book.name} {chapter.number}:{verse}</span>
        <strong>{chapter.title}</strong>
        <span>{"color" in item ? `Marcaj ${item.color}` : "Deschide versetul în context"}</span>
        <ChevronRight size={18} aria-hidden />
      </button>)}</div>
      {tab === "favorites" && chapters.length > 0 && <>
        <h3><Bookmark size={18} aria-hidden /> Capitole salvate</h3>
        <div className="bible-result-list">{chapters.map(({ book, chapter }) => <button
          key={`${book.id}-${chapter.number}`}
          type="button"
          className="bible-result"
          onClick={() => onOpen({ bookId: book.id, chapter: chapter.number })}
        >
          <span className="bible-result__ref">{book.name} {chapter.number}</span>
          <strong>{chapter.title}</strong>
          <span>{chapter.summary}</span>
          <ChevronRight size={18} aria-hidden />
        </button>)}</div>
      </>}
    </section>}
    {tab === "continue" && <section className="bible-saved-section">
      <h3><MapPin size={18} aria-hidden /> Unde ai rămas</h3>
      {last ? <button type="button" className="bible-resume-card" onClick={() => onOpen({ bookId: last.bookId, chapter: last.chapter, verse: last.verse, mode: last.mode })}>
        <img src="/bible-road-hero.svg" alt="Drumul spre Emaus" />
        <span><strong>{last.bookName} {last.chapter}</strong><span>{last.title}</span><span>Continuă lectura <ArrowRight size={16} aria-hidden /></span></span>
      </button> : <p className="bible-sheet__empty">Începe un capitol și îl vom păstra aici.</p>}
    </section>}
  </div>
}

export function Bible() {
  const [catalog, setCatalog] = useState<BibleBookSummary[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const last = readLast()
  const saved = readSavedChapters()
  const favoriteVerseKeys = readArray(FAVORITE_VERSES_KEY)
  const highlightMap = readHighlights()

  useEffect(() => {
    let active = true
    void loadBibleCatalog()
      .then((value) => { if (active) setCatalog(value.books) })
      .catch(() => { if (active) setLoadError(true) })
    return () => { active = false }
  }, [])

  const oldTestament = catalog?.filter((book) => book.testament === "vt") ?? []
  const newTestament = catalog?.filter((book) => book.testament === "nt") ?? []
  const resumeBook = last ? catalog?.find((book) => book.id === last.bookId) : undefined
  const resumeChapter = resumeBook?.chapters.find((chapter) => chapter.number === last?.chapter && chapterIsOpen(chapter))
  const resumeTitle = resumeChapter?.title ?? last?.title
  const validLast = last && resumeBook && resumeChapter
    ? { ...last, bookName: resumeBook.name, title: resumeChapter.title }
    : null

  function openBook(book: BibleBookSummary): void {
    navigate(chooserUrl(book.testament, book.id))
  }

  function openChapter(target: ChapterTarget): void {
    setOverlay(null)
    if (target.mode) writeJson(MODE_KEY, target.mode)
    navigate(chapterUrl(target))
  }

  const savedEntries = saved.map((key) => {
    const [bookId, rawChapter] = key.split(":")
    const book = catalog?.find((candidate) => candidate.id === bookId)
    const chapter = book?.chapters.find((candidate) => candidate.number === Number(rawChapter))
    return book && chapter ? { book, chapter } : null
  }).filter((entry): entry is { book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number] } => Boolean(entry))

  const favoriteEntries = favoriteVerseKeys.map((key) => {
    const [bookId, rawChapter, rawVerse] = key.split(":")
    const book = catalog?.find((candidate) => candidate.id === bookId)
    const chapter = book?.chapters.find((candidate) => candidate.number === Number(rawChapter))
    const verse = Number(rawVerse)
    return book && chapter && Number.isInteger(verse) ? { book, chapter, verse } : null
  }).filter((entry): entry is { book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number]; verse: number } => Boolean(entry))

  const highlightEntries = Object.entries(highlightMap).map(([key, color]) => {
    const [bookId, rawChapter, rawVerse] = key.split(":")
    const book = catalog?.find((candidate) => candidate.id === bookId)
    const chapter = book?.chapters.find((candidate) => candidate.number === Number(rawChapter))
    const verse = Number(rawVerse)
    return book && chapter && Number.isInteger(verse) ? { book, chapter, verse, color } : null
  }).filter((entry): entry is { book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number]; verse: number; color: HighlightColor } => Boolean(entry))

  return <section className="bible-home">
    <header className="bible-home__topbar">
      <BrandMark />
      <div className="bible-home__actions">
        <IconButton label="Caută în Biblie" onClick={() => setOverlay("search")}><Search size={22} aria-hidden /></IconButton>
        <IconButton label="Capitole și versete salvate" onClick={() => setOverlay("saved")} active={saved.length > 0 || favoriteVerseKeys.length > 0 || Object.keys(highlightMap).length > 0}><Bookmark size={22} aria-hidden /></IconButton>
      </div>
    </header>

    <div className="bible-home__intro">
      <p className="bible-eyebrow">Biblia Emanus</p>
      <h1>Biblia</h1>
      <p>Biblioteca Scripturii</p>
    </div>

    {resumeBook && resumeChapter && <button
      type="button"
      className="bible-continue"
      onClick={() => openChapter({ bookId: resumeBook.id, chapter: resumeChapter.number, verse: last?.verse, mode: last?.mode })}
    >
      <img src="/bible-road-hero.svg" alt="Un drum luminat care străbate valea spre cetate" />
      <span className="bible-continue__shade" aria-hidden />
      <span className="bible-continue__content">
        <span className="bible-continue__kicker"><BookOpen size={18} aria-hidden /> Continuă lectura</span>
        <strong>{resumeBook.name} {resumeChapter.number}</strong>
        <span className="bible-continue__title">{resumeTitle}</span>
        <span className="bible-continue__meta"><Clock3 size={16} aria-hidden /> Biblia Emanus · text și explicație</span>
        <span className="bible-continue__cta">Deschide pasajul <ArrowRight size={19} aria-hidden /></span>
      </span>
    </button>}

    {!catalog && !loadError && <p className="bible-loading">Se deschide biblioteca…</p>}
    {loadError && <p className="bible-loading">Biblioteca nu s-a putut încărca. Verifică legătura și încearcă din nou.</p>}

    {catalog && <>
      <BookRail id="bible-shelf-vt" title="Vechiul Testament" books={oldTestament} onAll={() => navigate(chooserUrl("vt"))} onBook={openBook} />
      <BookRail id="bible-shelf-nt" title="Noul Testament" books={newTestament} onAll={() => navigate(chooserUrl("nt"))} onBook={openBook} />
    </>}

    <button type="button" className="bible-pain-card" onClick={() => setOverlay("needs")}>
      <img src="/bible-pain-light.svg" alt="O persoană privind spre lumina care se deschide peste drum" />
      <span>
        <span className="bible-pain-card__icon"><Sparkles size={21} aria-hidden /></span>
        <strong>Când te doare, citește</strong>
        <span>Găsește pasaje întregi pentru teamă, pierdere, rușine sau neliniște.</span>
        <span className="bible-link">Vezi Scriptura pentru ce trăiești <ArrowRight size={16} aria-hidden /></span>
      </span>
    </button>

    <p className="bible-home__edition">{BIBLIA_EMANUS_TRANSLATION}</p>

    <BibleDialog immersive open={overlay === "search"} title="Căutare în Biblie" onClose={() => setOverlay(null)}>
      {catalog && <SearchExperience catalog={catalog} onOpen={openChapter} onBook={openBook} />}
    </BibleDialog>

    <BibleDialog immersive open={overlay === "saved"} title="Biblia mea" onClose={() => setOverlay(null)}>
      <SavedExperience favorites={favoriteEntries} chapters={savedEntries} highlights={highlightEntries} last={validLast} onOpen={openChapter} />
    </BibleDialog>

    <BibleDialog immersive open={overlay === "needs"} title="Când te doare, citește" onClose={() => setOverlay(null)}>
      <NeedsExperience onOpen={openChapter} />
    </BibleDialog>

  </section>
}

export function BibleChooser({ testament: initialTestament, bookId: initialBookId }: {
  testament?: "vt" | "nt"
  bookId?: string
}) {
  const [catalog, setCatalog] = useState<BibleBookSummary[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [query, setQuery] = useState("")
  const [testament, setTestament] = useState<"vt" | "nt">(initialTestament ?? "vt")
  const [selectedBookId, setSelectedBookId] = useState(initialBookId ?? "")
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const last = readLast()

  useEffect(() => {
    let active = true
    void loadBibleCatalog()
      .then((value) => { if (active) setCatalog(value.books) })
      .catch(() => { if (active) setLoadError(true) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!catalog) return
    const requested = initialBookId ? catalog.find((book) => book.id === initialBookId) : undefined
    if (requested) {
      setTestament(requested.testament)
      setSelectedBookId(requested.id)
      const available = visibleChapters(requested.chapters)
      const remembered = last?.bookId === requested.id
        ? available.find((chapter) => chapter.number === last.chapter)
        : undefined
      setSelectedChapter(remembered?.number ?? available[0]?.number ?? null)
      return
    }
    const nextTestament = initialTestament ?? "vt"
    setTestament(nextTestament)
    const books = catalog.filter((book) => book.testament === nextTestament)
    setSelectedBookId(books[0]?.id ?? "")
    setSelectedChapter(null)
  }, [catalog, initialBookId, initialTestament])

  const testamentBooks = catalog?.filter((book) => book.testament === testament) ?? []
  const filteredBooks = testamentBooks.filter((book) => plain(book.name).includes(plain(query.trim())))
  const selectedBook = testamentBooks.find((book) => book.id === selectedBookId) ?? testamentBooks[0]
  const chapters = selectedBook ? visibleChapters(selectedBook.chapters) : []
  const selectedChapterData = chapters.find((chapter) => chapter.number === selectedChapter) ?? chapters[0]

  function chooseTestament(next: "vt" | "nt"): void {
    setTestament(next)
    setQuery("")
    const first = catalog?.find((book) => book.testament === next)
    setSelectedBookId(first?.id ?? "")
    setSelectedChapter(null)
  }

  function chooseBook(book: BibleBookSummary): void {
    setSelectedBookId(book.id)
    const available = visibleChapters(book.chapters)
    const remembered = last?.bookId === book.id
      ? available.find((chapter) => chapter.number === last.chapter)
      : undefined
    setSelectedChapter(remembered?.number ?? available[0]?.number ?? null)
  }

  return <section className="bible-chooser" aria-labelledby="bible-chooser-title">
    <header className="bible-chooser__header">
      <IconButton label="Înapoi la pagina Biblia" onClick={() => navigate("/biblia")}><ArrowLeft size={23} aria-hidden /></IconButton>
      <div>
        <h1 id="bible-chooser-title">Alege cartea și capitolul</h1>
        <p>Biblia Emanus</p>
      </div>
      <span className="bible-chooser__header-space" aria-hidden />
    </header>

    <label className="bible-search-field bible-chooser__search">
      <Search size={20} aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Caută o carte a Bibliei"
        aria-label="Caută o carte a Bibliei"
      />
    </label>

    <div className="bible-chooser__testaments" aria-label="Alege testamentul">
      <button type="button" className={testament === "vt" ? "is-selected" : ""} aria-pressed={testament === "vt"} onClick={() => chooseTestament("vt")}>Vechiul Testament</button>
      <button type="button" className={testament === "nt" ? "is-selected" : ""} aria-pressed={testament === "nt"} onClick={() => chooseTestament("nt")}>Noul Testament</button>
    </div>

    {!catalog && !loadError && <p className="bible-loading">Se deschide biblioteca…</p>}
    {loadError && <p className="bible-loading">Biblioteca nu s-a putut încărca. Întoarce-te și încearcă din nou.</p>}

    {catalog && <>
      <div className="bible-chooser__layout">
        <nav className="bible-chooser__books" aria-label={`Cărțile din ${testament === "vt" ? "Vechiul Testament" : "Noul Testament"}`}>
          {filteredBooks.map((book) => <button
            key={book.id}
            type="button"
            className={selectedBook?.id === book.id ? "is-selected" : ""}
            aria-current={selectedBook?.id === book.id ? "true" : undefined}
            onClick={() => chooseBook(book)}
          >{book.name}</button>)}
          {filteredBooks.length === 0 && <p>Nu am găsit această carte.</p>}
        </nav>

        {selectedBook && <div className="bible-chooser__selection">
          <div className="bible-book-lead">
            <span className="bible-book-lead__sigil" aria-hidden><BookOpen size={22} /></span>
            <span>
              <small>{selectedBook.testament === "vt" ? "Vechiul Testament" : "Noul Testament"}</small>
              <strong>{selectedBook.name}</strong>
              <span>{concise(selectedBook.blurb)}</span>
            </span>
          </div>

          <div className="bible-chooser__chapter-heading">
            <h2>Capitole</h2>
            <span>{chapters.length} {chapters.length === 1 ? "capitol" : "capitole"}</span>
          </div>
          <div className="bible-chapter-grid" aria-label={`Capitole din ${selectedBook.name}`}>
            {chapters.map((chapter) => <button
              key={chapter.id}
              type="button"
              className={selectedChapterData?.number === chapter.number ? "is-selected" : ""}
              aria-pressed={selectedChapterData?.number === chapter.number}
              aria-label={`${selectedBook.name} ${chapter.number}: ${chapter.title}`}
              onClick={() => setSelectedChapter(chapter.number)}
            >{chapter.number}</button>)}
          </div>

          {selectedChapterData && <div className="bible-chooser__chapter-card" aria-live="polite">
            <Quote size={24} aria-hidden />
            <div className="bible-chooser__chapter-copy">
              <span>Capitol selectat</span>
              <strong>{selectedBook.name} {selectedChapterData.number}</strong>
              <p>{selectedChapterData.title === `${selectedBook.name} ${selectedChapterData.number}`
                ? selectedChapterData.summary
                : selectedChapterData.title}</p>
            </div>
          </div>}
        </div>}
      </div>

      {selectedBook && selectedChapterData && <button
        type="button"
        className="bible-primary-button bible-chooser__open"
        onClick={() => navigate(`/biblia/${selectedBook.id}/${selectedChapterData.number}`)}
      >
        Deschide {selectedBook.name} {selectedChapterData.number} <ArrowRight size={18} aria-hidden />
      </button>}
    </>}
  </section>
}

const HIGHLIGHT_COLORS: Array<{ color: HighlightColor; label: string }> = [
  { color: "gold", label: "auriu" },
  { color: "sage", label: "verde" },
  { color: "sky", label: "albastru" },
  { color: "rose", label: "roz" },
]

function VerseActions({ book, chapter, verses, highlights, favorites, autoFocus, onHighlight, onFavorite, onUnderstand, onDone }: {
  book: BibleBook
  chapter: BibleChapter
  verses: BibleVerse[]
  highlights: Record<string, HighlightColor>
  favorites: string[]
  autoFocus: boolean
  onHighlight: (color: HighlightColor | null) => void
  onFavorite: () => void
  onUnderstand: () => void
  onDone: () => void
}) {
  const [copied, setCopied] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const sortedNumbers = verses.map((verse) => verse.number).sort((a, b) => a - b)
  const groups = sortedNumbers.reduce<number[][]>((result, number) => {
    const current = result.at(-1)
    if (current && current.at(-1) === number - 1) current.push(number)
    else result.push([number])
    return result
  }, [])
  const verseReference = groups.map((group) => group.length === 1 ? `${group[0]}` : `${group[0]}–${group.at(-1)}`).join(", ")
  const references = `${book.name} ${chapter.number}:${verseReference}`
  const sortedVerses = [...verses].sort((a, b) => a.number - b.number)
  const payload = `${sortedVerses.map((verse) => `${verse.number} ${verse.text}`).join("\n")}\n${references} · Biblia Emanus`
  const keys = verses.map((verse) => verseKey(book.id, chapter.number, verse.number))
  const allFavorite = keys.every((key) => favorites.includes(key))

  useEffect(() => {
    if (autoFocus) toolbarRef.current?.querySelector<HTMLButtonElement>("button")?.focus()
  }, [autoFocus])

  function copy(): void {
    void window.navigator.clipboard?.writeText(payload).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }).catch(() => undefined)
  }

  function share(): void {
    const navigatorWithShare = window.navigator as Navigator & { share?: (value: { title: string; text: string }) => Promise<void> }
    if (navigatorWithShare.share) {
      void navigatorWithShare.share({ title: references, text: payload }).catch(() => undefined)
      return
    }
    copy()
  }

  return <div
    ref={toolbarRef}
    className="bible-verse-actions"
    role="toolbar"
    aria-label={`Acțiuni pentru ${verses.length} ${verses.length === 1 ? "verset" : "versete"}`}
  >
    <div className="bible-verse-actions__summary">
      <strong>{verses.length}</strong>
      <span>{verses.length === 1 ? "verset selectat" : "versete selectate"}</span>
    </div>
    <div className="bible-verse-actions__colors" aria-label="Culoarea marcajului">
      {HIGHLIGHT_COLORS.map(({ color, label }) => <button
        key={color}
        type="button"
        className={`bible-highlight-swatch is-${color}`}
        aria-label={`Marchează cu ${label}`}
        aria-pressed={keys.every((key) => highlights[key] === color)}
        onClick={() => onHighlight(color)}
      ><span aria-hidden /></button>)}
      <button type="button" className="bible-verse-action" onClick={() => onHighlight(null)} aria-label="Șterge marcajul"><Eraser size={18} aria-hidden /></button>
    </div>
    <div className="bible-verse-actions__buttons">
      <button type="button" className="bible-verse-action" onClick={onFavorite} aria-pressed={allFavorite}>
        <Star size={18} fill={allFavorite ? "currentColor" : "none"} aria-hidden />
        <span>{allFavorite ? "Salvat" : "Favorit"}</span>
      </button>
      <button type="button" className="bible-verse-action" onClick={copy}>{copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}<span>{copied ? "Copiat" : "Copiază"}</span></button>
      <button type="button" className="bible-verse-action" onClick={share}><Share2 size={18} aria-hidden /><span>Trimite</span></button>
      <button type="button" className="bible-verse-action" onClick={onUnderstand}><Sparkles size={18} aria-hidden /><span>Înțelege</span></button>
      <button type="button" className="bible-verse-action" onClick={onDone} aria-label="Închide acțiunile"><X size={19} aria-hidden /></button>
    </div>
  </div>
}

function ScriptureView({ book, chapter, targetVerse, onUnderstand }: {
  book: BibleBook
  chapter: BibleChapter
  targetVerse?: number
  onUnderstand: (verses: number[]) => void
}) {
  const [selectedVerses, setSelectedVerses] = useState<number[]>([])
  const [highlights, setHighlights] = useState<Record<string, HighlightColor>>(readHighlights)
  const [favorites, setFavorites] = useState<string[]>(() => readArray(FAVORITE_VERSES_KEY))
  const selectionByKeyboard = useRef(false)
  const selectedVersesRef = useRef<number[]>([])
  const verses = chapter.verses ?? []
  const selected = verses.filter((verse) => selectedVerses.includes(verse.number))

  useEffect(() => {
    selectedVersesRef.current = selectedVerses
  }, [selectedVerses])

  function closeActionsAndRestoreFocus(): void {
    const verse = selectedVersesRef.current[0]
    setSelectedVerses([])
    if (!verse) return
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-reader-anchor="${verse}"] button`)?.focus()
    })
  }

  useEffect(() => {
    function closeActions(event: KeyboardEvent): void {
      if (event.key === "Escape" && selectedVersesRef.current.length > 0) closeActionsAndRestoreFocus()
    }
    window.addEventListener("keydown", closeActions)
    return () => window.removeEventListener("keydown", closeActions)
  }, [])

  function applyHighlight(color: HighlightColor | null): void {
    const next = { ...highlights }
    selected.forEach((verse) => {
      const key = verseKey(book.id, chapter.number, verse.number)
      if (color) next[key] = color
      else delete next[key]
    })
    writeJson(VERSE_HIGHLIGHTS_KEY, next)
    setHighlights(next)
  }

  function toggleFavorite(): void {
    const keys = selected.map((verse) => verseKey(book.id, chapter.number, verse.number))
    const allFavorite = keys.every((key) => favorites.includes(key))
    const next = allFavorite
      ? favorites.filter((key) => !keys.includes(key))
      : [...new Set([...favorites, ...keys])]
    writeJson(FAVORITE_VERSES_KEY, next)
    setFavorites(next)
  }

  if (verses.length === 0) {
    return <div className="bible-reader__empty"><Info size={25} aria-hidden /><h2>Textul nu este disponibil în reader.</h2><p>Capitolul rămâne închis până când textul canonic poate fi afișat integral.</p></div>
  }

  return <section className={selected.length > 0 ? "bible-scripture has-verse-actions" : "bible-scripture"} aria-label="Text biblic">
    <div className="bible-reader__intro">
      <span className="bible-reader__intro-icon"><BookOpen size={21} aria-hidden /></span>
      <span>
        <small>Scriptura · {verses.length} {verses.length === 1 ? "verset" : "versete"}</small>
        <strong>{chapter.title}</strong>
        {chapter.summary && <span>{chapter.summary}</span>}
      </span>
    </div>
    <p className="bible-scripture__hint">Atinge un verset pentru marcaje, salvare sau explicație.</p>
    <div className="bible-scripture__verses">
      {verses.map((verse) => {
        const key = verseKey(book.id, chapter.number, verse.number)
        const selected = selectedVerses.includes(verse.number)
        return <div key={verse.number} data-reader-anchor={verse.number}>
        <button
          type="button"
          className={`${selected ? "bible-reader__verse is-selected" : "bible-reader__verse"}${targetVerse === verse.number ? " is-targeted" : ""}`}
          aria-pressed={selected}
          data-highlight={highlights[key]}
          data-textual-status={verse.textualStatus}
          onPointerDown={() => { selectionByKeyboard.current = false }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") selectionByKeyboard.current = true
          }}
          onClick={() => setSelectedVerses((current) => current.includes(verse.number)
            ? current.filter((number) => number !== verse.number)
            : [...current, verse.number].sort((a, b) => a - b))}
        >
          <span aria-label={`Versetul ${verse.number}`}>{verse.number}</span>
          <span>{verse.text}</span>
          {verse.textualStatus && <small className="bible-reader__textual-marker">Text cu tradiție manuscrisă discutată · vezi notele</small>}
        </button>
      </div>})}
    </div>
    {selected.length > 0 && createPortal(<VerseActions
      book={book}
      chapter={chapter}
      verses={selected}
      highlights={highlights}
      favorites={favorites}
      autoFocus={selectionByKeyboard.current}
      onHighlight={applyHighlight}
      onFavorite={toggleFavorite}
      onUnderstand={() => onUnderstand(selected.map((verse) => verse.number))}
      onDone={closeActionsAndRestoreFocus}
    />, document.body)}
  </section>
}

function WordStudy({ unit }: { unit: BibleUnit }) {
  if (!unit.words?.length) return null
  return <div className="bible-explanation__words">
    <p><Languages size={17} aria-hidden /> Cuvinte-cheie</p>
    {unit.words.map((word) => <div key={`${word.original}-${word.transliteration}`}>
      <span lang={word.language === "ebraica" ? "he" : word.language === "greaca" ? "el" : "arc"}>{word.original}</span>
      <strong>{word.transliteration}</strong>
      <p>{word.meaning}</p>
    </div>)}
  </div>
}

function ExplanationUnit({ unit, targeted, onReadScripture }: {
  unit: BibleUnit
  targeted?: boolean
  onReadScripture: (fallbackVerse: number) => void
}) {
  const range = explanationRanges([unit]).ranges[0]
  const start = range?.start ?? 1
  const end = range?.end ?? start
  return <article
    className={targeted ? "bible-explanation is-targeted" : "bible-explanation"}
    data-reader-anchor={start}
    data-reader-anchor-end={end}
    tabIndex={-1}
    aria-label={`Explicație pentru ${unit.ref}`}
  >
    <header className="bible-explanation__passage">
      <span><BookOpen size={18} aria-hidden /> Pasaj explicat</span>
      <strong>{unit.ref}</strong>
      <blockquote>{unit.text}</blockquote>
      <button type="button" onClick={() => onReadScripture(start)}>Vezi în Scriptură <ArrowRight size={15} aria-hidden /></button>
    </header>
    <p className="bible-explanation__ref">Explicație · {unit.ref}</p>
    <h2>{unit.heading}</h2>
    <div className="bible-explanation__teaching">{paragraphs(unit.teaching).map((part, index) => <p key={index}>{part}</p>)}</div>
    <WordStudy unit={unit} />
    {unit.crossRefs?.length ? <div className="bible-explanation__refs">
      <p><Link2 size={17} aria-hidden /> Conexiuni biblice</p>
      <span>{unit.crossRefs.join(" · ")}</span>
    </div> : null}
    {unit.forYourHeart && <aside className="bible-explanation__heart">
      <Sparkles size={20} aria-hidden />
      <div><strong>De ce contează</strong><p>{unit.forYourHeart}</p></div>
    </aside>}
  </article>
}

function UnderstandView({ chapter, targetVerse, onReadScripture }: {
  chapter: BibleChapter
  targetVerse?: number
  onReadScripture: (verse: number) => void
}) {
  if (chapter.units.length === 0) {
    return <div className="bible-reader__empty">
      <BookMarked size={28} aria-hidden />
      <h2>Explicația nu este încă legată de acest capitol.</h2>
      <p>Textul Biblia Emanus rămâne disponibil în modul Scriptura. Explicația va apărea aici numai după ce stratul editorial final este conectat.</p>
    </div>
  }

  const target = targetVerse
    ? resolveVerseExplanation(chapter.units, targetVerse, { allowReferenceRange: true })
    : null

  return <section className="bible-understand" aria-label="Explicația capitolului">
    <div className="bible-reader__intro bible-reader__intro--understand">
      <span className="bible-reader__intro-icon"><Sparkles size={21} aria-hidden /></span>
      <span>
        <small>Înțelege · {chapter.units.length} {chapter.units.length === 1 ? "pasaj" : "pasaje"}</small>
        <strong>{chapter.title}</strong>
        {chapter.summary && <span>{chapter.summary}</span>}
      </span>
    </div>
    {(chapter.literaryContext || chapter.historicalContext) && <details className="bible-context">
      <summary className="bible-context__kicker"><Info size={18} aria-hidden /> Contextul capitolului <ChevronRight size={17} aria-hidden /></summary>
      <div className="bible-context__grid">
        {chapter.literaryContext && <div><strong>Locul în carte</strong><p>{chapter.literaryContext}</p></div>}
        {chapter.historicalContext && <div><strong>Contextul istoric</strong><p>{chapter.historicalContext}</p></div>}
      </div>
    </details>}
    {chapter.units.map((unit) => <ExplanationUnit
      key={unit.id}
      unit={unit}
      targeted={target?.unit?.id === unit.id}
      onReadScripture={(fallbackVerse) => {
        const exactVerseExists = targetVerse ? chapter.verses?.some((verse) => verse.number === targetVerse) : false
        onReadScripture(target?.unit?.id === unit.id && targetVerse && exactVerseExists ? targetVerse : fallbackVerse)
      }}
    />)}
  </section>
}

function SelectionNotice({ chapter, verses, onSelect }: {
  chapter: BibleChapter
  verses: number[]
  onSelect: (verse: number) => void
}) {
  const selection = resolveVerseExplanationSelection(chapter.units, verses, { allowReferenceRange: true })
  if (selection.matchedUnits.length < 2) return null
  return <aside className="bible-selection-notice" aria-label="Explicațiile selecției">
    <Sparkles size={18} aria-hidden />
    <div>
      <strong>Selecția atinge {selection.matchedUnits.length} pasaje explicate</strong>
      <p>Am deschis primul pasaj. Poți continua direct cu celelalte explicații:</p>
      <div>{selection.matchedUnits.map((unit) => selection.results.find((result) => result.unit === unit)).map((result) => result?.range && <button
        key={result.unit?.id ?? result.verse}
        type="button"
        onClick={() => onSelect(result.verse)}
      >v. {result.verse} · {result.unit?.heading}</button>)}</div>
    </div>
  </aside>
}

export function BibleChapterScreen({ bookId, chapter, verse }: { bookId: string; chapter: number; verse?: number }) {
  const [book, setBook] = useState<BibleBook | null>(null)
  const [failed, setFailed] = useState(false)
  const [mode, setMode] = useState<ReaderMode>(() => readJson<unknown>(MODE_KEY, "scripture") === "understand" ? "understand" : "scripture")
  const [saved, setSaved] = useState(() => readSavedChapters().includes(chapterKey(bookId, chapter)))
  const [activeAnchor, setActiveAnchor] = useState<number | undefined>(verse)
  const [explanationSelection, setExplanationSelection] = useState<number[]>([])
  const pendingAnchor = useRef<number | null>(null)
  const found = book?.chapters.find((candidate) => candidate.number === chapter)
  const canRead = Boolean(found && (SHOW_EDITORIAL || chapterIsOpen(found)))
  const requestedVerseMissing = Boolean(verse && found && !found.verses?.some((candidate) => candidate.number === verse))
  const requestedVerseHasNote = Boolean(requestedVerseMissing && found?.textualNotes?.some((note) => note.verse === verse))

  useEffect(() => {
    let active = true
    window.scrollTo({ top: 0, behavior: "auto" })
    setActiveAnchor(verse)
    setExplanationSelection([])
    setBook(null)
    setFailed(false)
    setSaved(readSavedChapters().includes(chapterKey(bookId, chapter)))
    void loadBibleBook(bookId)
      .then((value) => { if (active) setBook(value) })
      .catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [bookId, chapter, verse])

  useEffect(() => {
    if (!book || !found || !canRead) return
    writeJson(LAST_KEY, { bookId, bookName: book.name, chapter, title: found.title, verse: activeAnchor, mode } satisfies LastRead)
  }, [activeAnchor, book, bookId, canRead, chapter, found, mode])

  useEffect(() => {
    if (requestedVerseMissing) setActiveAnchor(undefined)
  }, [requestedVerseMissing])

  useEffect(() => {
    if (!found || !activeAnchor) return
    let cancelled = false
    let frame = 0
    const scrollToVerse = () => {
      if (cancelled) return
      const resolution = mode === "understand"
        ? resolveVerseExplanation(found.units, activeAnchor, { allowReferenceRange: true })
        : null
      const anchor = resolution?.range?.start ?? activeAnchor
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-reader-anchor]")]
      const target = nodes.find((node) => {
        const start = Number(node.dataset.readerAnchor)
        const end = Number(node.dataset.readerAnchorEnd ?? start)
        return start <= anchor && anchor <= end
      })
      target?.scrollIntoView({ block: mode === "understand" ? "start" : "center" })
      if (target && mode === "understand") window.scrollBy({ top: -142 })
      const focusTarget = target?.matches("[tabindex]") ? target : target?.querySelector<HTMLElement>("button, [tabindex]")
      focusTarget?.focus({ preventScroll: true })
    }
    frame = window.requestAnimationFrame(scrollToVerse)
    void document.fonts?.ready.then(() => {
      frame = window.requestAnimationFrame(scrollToVerse)
      window.setTimeout(scrollToVerse, 120)
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
    }
  }, [activeAnchor, found, mode])

  useEffect(() => {
    const anchor = pendingAnchor.current
    if (anchor === null) return
    pendingAnchor.current = null
    window.requestAnimationFrame(() => {
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-reader-anchor]")]
      const resolution = mode === "understand" && found
        ? resolveVerseExplanation(found.units, anchor, { allowReferenceRange: true })
        : null
      if (mode === "understand" && !resolution?.range) return
      const resolvedAnchor = resolution?.range?.start ?? anchor
      const target = nodes.find((node) => {
        const start = Number(node.dataset.readerAnchor)
        const end = Number(node.dataset.readerAnchorEnd ?? start)
        return start <= resolvedAnchor && resolvedAnchor <= end
      })
      target?.scrollIntoView({ block: "start" })
      if (target) window.scrollBy({ top: -174 })
      const focusTarget = target?.matches("[tabindex]") ? target : target?.querySelector<HTMLElement>("button, [tabindex]")
      focusTarget?.focus({ preventScroll: true })
    })
  }, [mode])

  function switchMode(nextMode: ReaderMode): void {
    if (nextMode === mode) return
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reader-anchor]")]
    const nearest = nodes
      .filter((node) => node.getBoundingClientRect().top <= 220)
      .at(-1) ?? nodes[0]
    const activeNode = activeAnchor === undefined ? undefined : nodes.find((node) => {
      const start = Number(node.dataset.readerAnchor)
      const end = Number(node.dataset.readerAnchorEnd ?? start)
      return start <= activeAnchor && activeAnchor <= end
    })
    const activeRect = activeNode?.getBoundingClientRect()
    const activeStillRelevant = Boolean(activeRect && activeRect.bottom >= 142 && activeRect.top <= window.innerHeight)
    pendingAnchor.current = activeStillRelevant ? activeAnchor ?? 1 : Number(nearest?.dataset.readerAnchor ?? activeAnchor ?? 1)
    setActiveAnchor(pendingAnchor.current)
    setMode(nextMode)
    writeJson(MODE_KEY, nextMode)
  }

  function focusReaderAnchor(anchor: number, nextMode: ReaderMode): void {
    setActiveAnchor(anchor)
    pendingAnchor.current = anchor
    if (nextMode !== mode) {
      setMode(nextMode)
      writeJson(MODE_KEY, nextMode)
      return
    }
    window.requestAnimationFrame(() => {
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-reader-anchor]")]
      const resolution = nextMode === "understand" && found
        ? resolveVerseExplanation(found.units, anchor, { allowReferenceRange: true })
        : null
      const resolvedAnchor = resolution?.range?.start ?? anchor
      const target = nodes.find((node) => {
        const start = Number(node.dataset.readerAnchor)
        const end = Number(node.dataset.readerAnchorEnd ?? start)
        return start <= resolvedAnchor && resolvedAnchor <= end
      })
      target?.scrollIntoView({ block: nextMode === "understand" ? "start" : "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
      if (target && nextMode === "understand") window.scrollBy({ top: -142 })
      const focusTarget = target?.matches("[tabindex]") ? target : target?.querySelector<HTMLElement>("button, [tabindex]")
      focusTarget?.focus({ preventScroll: true })
      pendingAnchor.current = null
    })
  }

  function toggleSaved(): void {
    const key = chapterKey(bookId, chapter)
    const current = readSavedChapters()
    const next = current.includes(key) ? current.filter((value) => value !== key) : [...current, key]
    writeJson(SAVED_CHAPTERS_KEY, next)
    setSaved(next.includes(key))
  }

  if (!book && !failed) {
    return <section className="bible-reader bible-reader--state"><BrandMark /><p>Se deschide capitolul…</p></section>
  }

  if (failed || !book || !found || !canRead) {
    return <section className="bible-reader bible-reader--state">
      <BrandMark />
      <h1>Capitolul nu s-a putut deschide.</h1>
      <p>Textul nu este afișat pe jumătate. Întoarce-te la bibliotecă și încearcă din nou.</p>
      <button type="button" className="bible-primary-button" onClick={() => navigate("/biblia")}>Înapoi la Biblie</button>
    </section>
  }

  const numbers = visibleChapters(book.chapters).map((candidate) => candidate.number).sort((a, b) => a - b)
  const index = numbers.indexOf(chapter)
  const previous = index > 0 ? numbers[index - 1] : undefined
  const next = index >= 0 && index < numbers.length - 1 ? numbers[index + 1] : undefined
  const onlyOneDirection = previous === undefined || next === undefined

  return <section className="bible-reader">
    <header className="bible-reader__header">
      <IconButton label="Înapoi la alegerea capitolului" onClick={() => navigate(chooserUrl(book.testament, book.id))}><ArrowLeft size={23} aria-hidden /></IconButton>
      <button type="button" className="bible-reader__title" onClick={() => navigate(chooserUrl(book.testament, book.id))} aria-label="Alege altă carte sau alt capitol">
        <strong>{book.name} {found.number}</strong>
        <span>{found.title}</span>
      </button>
      <div className="bible-reader__actions">
        <IconButton label="Alege cartea și capitolul" onClick={() => navigate(chooserUrl(book.testament, book.id))}><Search size={22} aria-hidden /></IconButton>
        <IconButton label={saved ? "Elimină capitolul din salvate" : "Salvează capitolul"} onClick={toggleSaved} active={saved}>
          {saved ? <BookmarkCheck size={22} aria-hidden /> : <Bookmark size={22} aria-hidden />}
        </IconButton>
      </div>
    </header>

    <div className="bible-reader__switch" role="group" aria-label="Modul de citire">
      <button type="button" aria-pressed={mode === "scripture"} className={mode === "scripture" ? "is-selected" : ""} onClick={() => switchMode("scripture")}><BookOpen size={18} aria-hidden /> Scriptura</button>
      <button type="button" aria-pressed={mode === "understand"} className={mode === "understand" ? "is-selected" : ""} onClick={() => switchMode("understand")}><Sparkles size={18} aria-hidden /> Înțelege</button>
    </div>

    <div className="bible-reader__content">
      <h1 className="bible-reader__sr-title">{book.name} {found.number}: {found.title}</h1>
      {requestedVerseMissing && <aside className="bible-reader__target-notice" role="status">
        <Info size={18} aria-hidden />
        <span>{requestedVerseHasNote
          ? `Versetul ${verse} nu apare în textul critic principal. Nota despre el este păstrată mai jos.`
          : `Versetul ${verse} nu există în acest capitol. Capitolul a fost deschis de la început.`}</span>
      </aside>}
      {mode === "scripture" ? <ScriptureView
        book={book}
        chapter={found}
        targetVerse={activeAnchor}
        onUnderstand={(verses) => {
          setExplanationSelection(verses)
          focusReaderAnchor(verses[0] ?? 1, "understand")
        }}
      /> : <>
        <SelectionNotice
          chapter={found}
          verses={explanationSelection}
          onSelect={(target) => focusReaderAnchor(target, "understand")}
        />
        <UnderstandView
        chapter={found}
        targetVerse={activeAnchor ?? pendingAnchor.current ?? undefined}
        onReadScripture={(target) => {
          setExplanationSelection([])
          focusReaderAnchor(target, "scripture")
        }}
      /></>}

      {found.textualNotes?.length ? <details className="bible-textual-notes">
        <summary><Quote size={18} aria-hidden /> Note despre text și traducere ({found.textualNotes.length})</summary>
        {found.textualNotes.map((note, noteIndex) => {
          const verseExists = found.verses?.some((candidate) => candidate.number === note.verse) ?? false
          return <div className="bible-textual-note" key={`${note.verse}-${noteIndex}`}>
          {verseExists
            ? <button type="button" onClick={() => focusReaderAnchor(note.verse, "scripture")}>v. {note.verse}</button>
            : <span className="bible-textual-note__verse">v. {note.verse} · absent din textul critic</span>}
          <p>{note.note}</p>
          {note.traditionalReading && <p><strong>Lectura tradițională:</strong> {note.traditionalReading}</p>}
          {note.reason && <details><summary>De ce?</summary><p>{note.reason}</p></details>}
        </div>})}
      </details> : null}

      {found.alternateEndings?.length ? <details className="bible-textual-notes bible-alternate-endings">
        <summary><BookMarked size={18} aria-hidden /> Finaluri alternative păstrate ({found.alternateEndings.length})</summary>
        {found.alternateEndings.map((ending, endingIndex) => <div className="bible-textual-note" key={`${ending.status}-${endingIndex}`}>
          <p className="bible-alternate-endings__text">{ending.text}</p>
          {ending.sourceNote && <p>{ending.sourceNote}</p>}
        </div>)}
      </details> : null}

      {mode === "understand" && found.prayer.trim() && <section className="bible-chapter-prayer" aria-labelledby="bible-chapter-prayer-title">
        <HandHeart size={21} aria-hidden />
        <div><h2 id="bible-chapter-prayer-title">Rugăciune la finalul capitolului</h2>{paragraphs(found.prayer).map((part, partIndex) => <p key={partIndex}>{part}</p>)}</div>
      </section>}

      <nav className={`bible-reader__chapter-nav${onlyOneDirection ? " has-one-direction" : ""}`} aria-label="Navigare între capitole">
        {previous !== undefined
          ? <button type="button" onClick={() => navigate(`/biblia/${book.id}/${previous}`)}><ArrowLeft size={18} aria-hidden /><span>Anterior<small>{book.name} {previous}</small></span></button>
          : <span />}
        {next !== undefined
          ? <button type="button" onClick={() => navigate(`/biblia/${book.id}/${next}`)}><span>Următor<small>{book.name} {next}</small></span><ArrowRight size={18} aria-hidden /></button>
          : <span />}
      </nav>
      <p className="bible-reader__edition">{book.translation ?? BIBLIA_EMANUS_TRANSLATION}</p>
    </div>

  </section>
}
