import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
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
  Heart,
  Info,
  Languages,
  Link2,
  List,
  Quote,
  Search,
  Share2,
  Sparkles,
  X,
} from "lucide-react"
import type { BibleBook, BibleChapter, BibleStatus, BibleUnit, BibleVerse } from "@emanus/shared/bible-types"
import { BIBLIA_EMANUS_TRANSLATION } from "@emanus/shared/bible-types"
import needs from "../data/bible-needs.json"
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
const SHOW_EDITORIAL = import.meta.env.DEV

type ReaderMode = "scripture" | "understand"
type Overlay = "search" | "saved" | "needs" | "all-vt" | "all-nt" | "book" | null
type LastRead = { bookId: string; bookName?: string; chapter: number; title: string }
type SearchHit = {
  bookId: string
  bookName: string
  chapter: number
  title: string
  excerpt: string
  verse?: number
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Biblia rămâne utilizabilă când stocarea locală este blocată.
  }
}

function readLast(): LastRead | null {
  return readJson<LastRead | null>(LAST_KEY, null)
}

function readSavedChapters(): string[] {
  return readJson<string[]>(SAVED_CHAPTERS_KEY, [])
}

function chapterKey(bookId: string, chapter: number): string {
  return `${bookId}:${chapter}`
}

function paragraphs(text: string): string[] {
  return text.split("\n\n").map((part) => part.trim()).filter(Boolean)
}

function plain(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
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

function BibleDialog({ open, title, onClose, children }: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
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
    className="bible-sheet"
    aria-labelledby={titleId}
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

function BookRail({ title, books, onAll, onBook }: {
  title: string
  books: BibleBookSummary[]
  onAll: () => void
  onBook: (book: BibleBookSummary) => void
}) {
  return <section className="bible-shelf" aria-labelledby={`shelf-${title}`}>
    <header className="bible-shelf__head">
      <h2 id={`shelf-${title}`}><BookMarked size={21} aria-hidden /> {title}</h2>
      <button type="button" className="bible-link" onClick={onAll}>Vezi toate <ArrowRight size={16} aria-hidden /></button>
    </header>
    <div className="bible-shelf__rail">
      {books.slice(0, 5).map((book) => <BookTile key={book.id} book={book} onClick={() => onBook(book)} />)}
    </div>
  </section>
}

function SearchExperience({ catalog, onOpen }: {
  catalog: BibleBookSummary[]
  onOpen: (bookId: string, chapter: number) => void
}) {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BibleBook[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2 || books) return
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
  }, [books, catalog, query])

  const hits = useMemo<SearchHit[]>(() => {
    const needle = plain(query.trim())
    if (needle.length < 2 || !books) return []
    const results: SearchHit[] = []
    for (const book of books) {
      for (const chapter of visibleChapters(book.chapters)) {
        const verse = chapter.verses?.find((candidate) => plain(candidate.text).includes(needle))
        const unit = chapter.units.find((candidate) => plain(`${candidate.heading} ${candidate.teaching}`).includes(needle))
        const chapterMatch = plain(`${book.name} ${chapter.number} ${chapter.title} ${chapter.summary}`).includes(needle)
        if (!verse && !unit && !chapterMatch) continue
        results.push({
          bookId: book.id,
          bookName: book.name,
          chapter: chapter.number,
          title: chapter.title,
          excerpt: verse?.text ?? unit?.teaching ?? chapter.summary,
          verse: verse?.number ?? unit?.verseStart,
        })
        if (results.length >= 40) return results
      }
    }
    return results
  }, [books, query])

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
    {query.trim().length < 2 && <p className="bible-sheet__hint">Scrie cel puțin două litere. Căutarea verifică textul complet și explicațiile disponibile.</p>}
    {loading && <p className="bible-sheet__hint">Se deschide corpusul complet…</p>}
    {failed && <p className="bible-sheet__hint">Căutarea nu s-a putut încărca. Încearcă din nou.</p>}
    {!loading && books && query.trim().length >= 2 && hits.length === 0 && <p className="bible-sheet__hint">Nu am găsit acest cuvânt.</p>}
    <div className="bible-result-list">
      {hits.map((hit) => <button
        key={`${hit.bookId}-${hit.chapter}-${hit.verse ?? 0}`}
        type="button"
        className="bible-result"
        onClick={() => onOpen(hit.bookId, hit.chapter)}
      >
        <span className="bible-result__ref">{hit.bookName} {hit.chapter}{hit.verse ? `:${hit.verse}` : ""}</span>
        <strong>{hit.title}</strong>
        <span>{hit.excerpt}</span>
        <ChevronRight size={18} aria-hidden />
      </button>)}
    </div>
  </div>
}

type Need = (typeof needs)[number]

function NeedsExperience({ onOpen }: { onOpen: (bookId: string, chapter: number) => void }) {
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
        onClick={() => onOpen(result.bookId, result.chapter)}
      >
        <span className="bible-result__ref">{result.ref}</span>
        <strong>{result.heading}</strong>
        <span>Deschide pasajul în context</span>
        <ChevronRight size={18} aria-hidden />
      </button>)}
    </section>}
  </div>
}

export function Bible() {
  const [catalog, setCatalog] = useState<BibleBookSummary[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [selectedBook, setSelectedBook] = useState<BibleBookSummary | null>(null)
  const last = readLast()
  const saved = readSavedChapters()

  useEffect(() => {
    let active = true
    void loadBibleCatalog()
      .then((value) => { if (active) setCatalog(value.books) })
      .catch(() => { if (active) setLoadError(true) })
    return () => { active = false }
  }, [])

  const oldTestament = catalog?.filter((book) => book.testament === "vt") ?? []
  const newTestament = catalog?.filter((book) => book.testament === "nt") ?? []
  const fallback = catalog?.find((book) => book.id === "luca") ?? newTestament[0] ?? oldTestament[0]
  const resumeBook = catalog?.find((book) => book.id === last?.bookId) ?? fallback
  const resumeChapter = resumeBook?.chapters.find((chapter) => chapter.number === last?.chapter)
    ?? resumeBook?.chapters.find(chapterIsOpen)
  const resumeTitle = last?.title ?? resumeChapter?.title ?? "Deschide Scriptura"

  function openBook(book: BibleBookSummary): void {
    setSelectedBook(book)
    setOverlay("book")
  }

  function openChapter(bookId: string, chapter: number): void {
    setOverlay(null)
    navigate(`/biblia/${bookId}/${chapter}`)
  }

  const savedEntries = saved.map((key) => {
    const [bookId, rawChapter] = key.split(":")
    const book = catalog?.find((candidate) => candidate.id === bookId)
    const chapter = book?.chapters.find((candidate) => candidate.number === Number(rawChapter))
    return book && chapter ? { book, chapter } : null
  }).filter((entry): entry is { book: BibleBookSummary; chapter: BibleBookSummary["chapters"][number] } => Boolean(entry))

  return <section className="bible-home">
    <header className="bible-home__topbar">
      <BrandMark />
      <div className="bible-home__actions">
        <IconButton label="Caută în Biblie" onClick={() => setOverlay("search")}><Search size={22} aria-hidden /></IconButton>
        <IconButton label="Capitole salvate" onClick={() => setOverlay("saved")} active={saved.length > 0}><Bookmark size={22} aria-hidden /></IconButton>
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
      onClick={() => openChapter(resumeBook.id, resumeChapter.number)}
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
      <BookRail title="Vechiul Testament" books={oldTestament} onAll={() => setOverlay("all-vt")} onBook={openBook} />
      <BookRail title="Noul Testament" books={newTestament} onAll={() => setOverlay("all-nt")} onBook={openBook} />
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

    <BibleDialog open={overlay === "search"} title="Căutare în Biblie" onClose={() => setOverlay(null)}>
      {catalog && <SearchExperience catalog={catalog} onOpen={openChapter} />}
    </BibleDialog>

    <BibleDialog open={overlay === "saved"} title="Capitole salvate" onClose={() => setOverlay(null)}>
      {savedEntries.length === 0
        ? <p className="bible-sheet__empty"><Bookmark size={24} aria-hidden /> Nu ai salvat încă niciun capitol.</p>
        : <div className="bible-result-list">{savedEntries.map(({ book, chapter }) => <button
            key={`${book.id}-${chapter.number}`}
            type="button"
            className="bible-result"
            onClick={() => openChapter(book.id, chapter.number)}
          >
            <span className="bible-result__ref">{book.name} {chapter.number}</span>
            <strong>{chapter.title}</strong>
            <span>{chapter.summary}</span>
            <ChevronRight size={18} aria-hidden />
          </button>)}</div>}
    </BibleDialog>

    <BibleDialog open={overlay === "needs"} title="Când te doare, citește" onClose={() => setOverlay(null)}>
      <NeedsExperience onOpen={openChapter} />
    </BibleDialog>

    <BibleDialog
      open={overlay === "all-vt" || overlay === "all-nt"}
      title={overlay === "all-vt" ? "Vechiul Testament" : "Noul Testament"}
      onClose={() => setOverlay(null)}
    >
      <div className="bible-book-grid">
        {(overlay === "all-vt" ? oldTestament : newTestament).map((book) => <BookTile key={book.id} book={book} onClick={() => openBook(book)} />)}
      </div>
    </BibleDialog>

    <BibleDialog open={overlay === "book" && Boolean(selectedBook)} title={selectedBook?.name ?? "Alege capitolul"} onClose={() => setOverlay(null)}>
      {selectedBook && <>
        <p className="bible-sheet__lead">{selectedBook.blurb}</p>
        <p className="bible-sheet__hint">Alege capitolul</p>
        <div className="bible-chapter-grid">
          {visibleChapters(selectedBook.chapters).map((chapter) => <button
            key={chapter.id}
            type="button"
            aria-label={`${selectedBook.name} ${chapter.number}: ${chapter.title}`}
            onClick={() => openChapter(selectedBook.id, chapter.number)}
          >{chapter.number}</button>)}
        </div>
      </>}
    </BibleDialog>
  </section>
}

function VerseActions({ book, chapter, verse, onDone }: {
  book: BibleBook
  chapter: BibleChapter
  verse: BibleVerse
  onDone: () => void
}) {
  const [copied, setCopied] = useState(false)
  const payload = `„${verse.text}”\n${book.name} ${chapter.number}:${verse.number} · Biblia Emanus`

  function copy(): void {
    void window.navigator.clipboard?.writeText(payload).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }).catch(() => undefined)
  }

  function share(): void {
    const navigatorWithShare = window.navigator as Navigator & { share?: (value: { title: string; text: string }) => Promise<void> }
    if (navigatorWithShare.share) {
      void navigatorWithShare.share({ title: `${book.name} ${chapter.number}:${verse.number}`, text: payload }).catch(() => undefined)
      return
    }
    copy()
  }

  return <div className="bible-verse-actions" aria-label={`Acțiuni pentru versetul ${verse.number}`}>
    <button type="button" onClick={copy}>{copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}{copied ? "Copiat" : "Copiază"}</button>
    <button type="button" onClick={share}><Share2 size={16} aria-hidden /> Trimite</button>
    <button type="button" onClick={() => navigate(`/intreaba?despre=${encodeURIComponent(`${book.name} ${chapter.number}:${verse.number}`)}`)}>Întreabă</button>
    <button type="button" onClick={onDone} aria-label="Închide acțiunile"><X size={16} aria-hidden /></button>
  </div>
}

function ScriptureView({ book, chapter }: { book: BibleBook; chapter: BibleChapter }) {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)
  const verses = chapter.verses ?? []

  if (verses.length === 0) {
    return <div className="bible-reader__empty"><Info size={25} aria-hidden /><h2>Textul nu este disponibil în reader.</h2><p>Capitolul rămâne închis până când textul canonic poate fi afișat integral.</p></div>
  }

  return <section className="bible-scripture" aria-label="Text biblic">
    <div className="bible-scripture__edition">
      <BookOpen size={20} aria-hidden />
      <span><strong>Text biblic</strong><small>{BIBLIA_EMANUS_TRANSLATION}</small></span>
    </div>
    <div className="bible-scripture__verses">
      {verses.map((verse) => <div key={verse.number} data-reader-anchor={verse.number}>
        <button
          type="button"
          className={selectedVerse === verse.number ? "bible-reader__verse is-selected" : "bible-reader__verse"}
          aria-pressed={selectedVerse === verse.number}
          onClick={() => setSelectedVerse((current) => current === verse.number ? null : verse.number)}
        >
          <span aria-label={`Versetul ${verse.number}`}>{verse.number}</span>
          <span>{verse.text}</span>
        </button>
        {selectedVerse === verse.number && <VerseActions book={book} chapter={chapter} verse={verse} onDone={() => setSelectedVerse(null)} />}
      </div>)}
    </div>
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

function ExplanationUnit({ unit }: { unit: BibleUnit }) {
  const start = unit.verseStart ?? Number(unit.ref.match(/:(\d+)/u)?.[1] ?? 1)
  return <article className="bible-explanation" data-reader-anchor={start}>
    <p className="bible-explanation__ref">{unit.ref}</p>
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

function UnderstandView({ chapter }: { chapter: BibleChapter }) {
  if (chapter.units.length === 0) {
    return <div className="bible-reader__empty">
      <BookMarked size={28} aria-hidden />
      <h2>Explicația nu este încă legată de acest capitol.</h2>
      <p>Textul Biblia Emanus rămâne disponibil în modul Scriptura. Explicația va apărea aici numai după ce stratul editorial final este conectat.</p>
    </div>
  }

  return <section className="bible-understand" aria-label="Explicația capitolului">
    {(chapter.literaryContext || chapter.historicalContext) && <div className="bible-context">
      <p className="bible-context__kicker"><Info size={18} aria-hidden /> Înainte să citești explicația</p>
      {chapter.literaryContext && <div><strong>Locul în carte</strong><p>{chapter.literaryContext}</p></div>}
      {chapter.historicalContext && <div><strong>Contextul istoric</strong><p>{chapter.historicalContext}</p></div>}
    </div>}
    {chapter.units.map((unit) => <ExplanationUnit key={unit.id} unit={unit} />)}
  </section>
}

function ReaderNavigator({ open, currentBookId, onClose, onOpen }: {
  open: boolean
  currentBookId: string
  onClose: () => void
  onOpen: (bookId: string, chapter: number) => void
}) {
  const [catalog, setCatalog] = useState<BibleBookSummary[] | null>(null)
  const [query, setQuery] = useState("")
  const [bookId, setBookId] = useState(currentBookId)

  useEffect(() => {
    let active = true
    void loadBibleCatalog().then((value) => { if (active) setCatalog(value.books) }).catch(() => undefined)
    return () => { active = false }
  }, [])

  useEffect(() => setBookId(currentBookId), [currentBookId, open])

  const filtered = catalog?.filter((book) => plain(book.name).includes(plain(query))) ?? []
  const selected = catalog?.find((book) => book.id === bookId)

  return <BibleDialog open={open} title="Alege cartea și capitolul" onClose={onClose}>
    <label className="bible-search-field bible-search-field--compact">
      <Search size={19} aria-hidden />
      <input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Caută o carte" aria-label="Caută o carte a Bibliei" />
    </label>
    <div className="bible-navigator">
      <div className="bible-navigator__books" aria-label="Cărți">
        {filtered.map((book) => <button key={book.id} type="button" className={bookId === book.id ? "is-selected" : ""} onClick={() => setBookId(book.id)}>{book.name}</button>)}
      </div>
      {selected && <div className="bible-chapter-grid" aria-label={`Capitole din ${selected.name}`}>
        {visibleChapters(selected.chapters).map((chapter) => <button key={chapter.id} type="button" aria-label={`${selected.name} ${chapter.number}`} onClick={() => onOpen(selected.id, chapter.number)}>{chapter.number}</button>)}
      </div>}
    </div>
  </BibleDialog>
}

export function BibleChapterScreen({ bookId, chapter }: { bookId: string; chapter: number }) {
  const [book, setBook] = useState<BibleBook | null>(null)
  const [failed, setFailed] = useState(false)
  const [mode, setMode] = useState<ReaderMode>(() => readJson<ReaderMode>(MODE_KEY, "scripture"))
  const [saved, setSaved] = useState(() => readSavedChapters().includes(chapterKey(bookId, chapter)))
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const pendingAnchor = useRef<number | null>(null)
  const found = book?.chapters.find((candidate) => candidate.number === chapter)
  const canRead = Boolean(found && (SHOW_EDITORIAL || chapterIsOpen(found)))

  useEffect(() => {
    let active = true
    setBook(null)
    setFailed(false)
    setSaved(readSavedChapters().includes(chapterKey(bookId, chapter)))
    void loadBibleBook(bookId)
      .then((value) => { if (active) setBook(value) })
      .catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [bookId, chapter])

  useEffect(() => {
    if (!book || !found || !canRead) return
    writeJson(LAST_KEY, { bookId, bookName: book.name, chapter, title: found.title } satisfies LastRead)
  }, [book, bookId, canRead, chapter, found])

  useEffect(() => {
    const anchor = pendingAnchor.current
    if (anchor === null) return
    pendingAnchor.current = null
    window.requestAnimationFrame(() => {
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-reader-anchor]")]
      const target = nodes.find((node) => Number(node.dataset.readerAnchor) >= anchor) ?? nodes.at(-1)
      target?.scrollIntoView({ block: "start" })
      if (target) window.scrollBy({ top: -174 })
    })
  }, [mode])

  function switchMode(nextMode: ReaderMode): void {
    if (nextMode === mode) return
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reader-anchor]")]
    const nearest = nodes
      .filter((node) => node.getBoundingClientRect().top <= 220)
      .at(-1) ?? nodes[0]
    pendingAnchor.current = Number(nearest?.dataset.readerAnchor ?? 1)
    setMode(nextMode)
    writeJson(MODE_KEY, nextMode)
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

  return <section className="bible-reader">
    <header className="bible-reader__header">
      <IconButton label="Înapoi la biblioteca Bibliei" onClick={() => navigate("/biblia")}><ArrowLeft size={23} aria-hidden /></IconButton>
      <button type="button" className="bible-reader__title" onClick={() => setNavigatorOpen(true)} aria-label="Alege altă carte sau alt capitol">
        <strong>{book.name} {found.number}</strong>
        <span>{found.title}</span>
      </button>
      <div className="bible-reader__actions">
        <IconButton label="Alege cartea și capitolul" onClick={() => setNavigatorOpen(true)}><Search size={22} aria-hidden /></IconButton>
        <IconButton label={saved ? "Elimină capitolul din salvate" : "Salvează capitolul"} onClick={toggleSaved} active={saved}>
          {saved ? <BookmarkCheck size={22} aria-hidden /> : <Bookmark size={22} aria-hidden />}
        </IconButton>
      </div>
    </header>

    <div className="bible-reader__switch" role="tablist" aria-label="Modul de citire">
      <button type="button" role="tab" aria-selected={mode === "scripture"} className={mode === "scripture" ? "is-selected" : ""} onClick={() => switchMode("scripture")}><BookOpen size={18} aria-hidden /> Scriptura</button>
      <button type="button" role="tab" aria-selected={mode === "understand"} className={mode === "understand" ? "is-selected" : ""} onClick={() => switchMode("understand")}><Sparkles size={18} aria-hidden /> Înțelege</button>
    </div>

    <main className="bible-reader__content">
      {mode === "scripture" ? <ScriptureView book={book} chapter={found} /> : <UnderstandView chapter={found} />}

      {found.textualNotes?.length ? <details className="bible-textual-notes">
        <summary><Quote size={18} aria-hidden /> Note textuale</summary>
        {found.textualNotes.map((note, noteIndex) => <p key={`${note.verse}-${noteIndex}`}><strong>v. {note.verse}:</strong> {note.note}</p>)}
      </details> : null}

      <nav className="bible-reader__chapter-nav" aria-label="Navigare între capitole">
        {previous !== undefined
          ? <button type="button" onClick={() => navigate(`/biblia/${book.id}/${previous}`)}><ArrowLeft size={18} aria-hidden /><span>Anterior<small>{book.name} {previous}</small></span></button>
          : <span />}
        {next !== undefined
          ? <button type="button" onClick={() => navigate(`/biblia/${book.id}/${next}`)}><span>Următor<small>{book.name} {next}</small></span><ArrowRight size={18} aria-hidden /></button>
          : <span />}
      </nav>
      <p className="bible-reader__edition">{book.translation ?? BIBLIA_EMANUS_TRANSLATION}</p>
    </main>

    <ReaderNavigator
      open={navigatorOpen}
      currentBookId={book.id}
      onClose={() => setNavigatorOpen(false)}
      onOpen={(nextBookId, nextChapter) => {
        setNavigatorOpen(false)
        navigate(`/biblia/${nextBookId}/${nextChapter}`)
      }}
    />
  </section>
}
