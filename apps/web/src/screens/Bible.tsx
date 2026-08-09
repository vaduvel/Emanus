import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, BookmarkCheck, HelpCircle, Search, Send } from "lucide-react"
import type { BibleBook, BibleChapter, BibleStatus, BibleUnit } from "@emanus/shared/bible-types"
import { BIBLE_TRANSLATION } from "@emanus/shared/bible-types"
import needs from "../data/bible-needs.json"
import {
  loadAllBibleBooks,
  loadBibleBook,
  loadBibleCatalog,
  loadBibleNeeds,
  type BibleBookSummary,
  type BibleChapterSummary,
  type BibleNeedResult,
} from "../bibleReader"
import { navigate } from "../router"
import "../bible.css"
import "../needs.css"

/*
 * Biblia explicată păstrează textul biblic separat de explicație. Traducerea
 * este etichetată per carte; un text editorial provizoriu nu este prezentat
 * drept Biblia Emanus. Capitolele in_review sunt vizibile numai în development.
 *
 * Intrarea nu este numai pe carti si capitole, ci si pe durere: "cand te
 * doare, citeste". Omul care sufera nu stie sa caute Geneza 37; stie sa spuna
 * ca l-a lasat cineva.
 */

const LAST_KEY = "emanus.bible.last"
const SAVED_KEY = "emanus.bible.saved"

const SHOW_EDITORIAL = import.meta.env.DEV

type LastRead = { bookId: string; chapter: number; title: string }

function readLast(): LastRead | null {
  try {
    const raw = window.localStorage.getItem(LAST_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LastRead
  } catch {
    return null
  }
}

function writeLast(value: LastRead): void {
  try {
    window.localStorage.setItem(LAST_KEY, JSON.stringify(value))
  } catch {
    /* stocarea poate fi oprita; nu e o problema */
  }
}

function readSaved(): string[] {
  try {
    const raw = window.localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

function writeSaved(ids: string[]): void {
  try {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(ids))
  } catch {
    /* stocarea poate fi oprita; nu e o problema */
  }
}

function paragraphs(text: string): string[] {
  return text.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 0)
}

/* Textul biblic are diacritice, explicatiile inca nu. Cautarea le pune la fel. */
function plat(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function chapterIsOpen(chapter: { status: BibleStatus }): boolean {
  return chapter.status === "published"
}

function visibleChapters<T extends { status: BibleStatus }>(chapters: T[]): T[] {
  return SHOW_EDITORIAL ? chapters : chapters.filter(chapterIsOpen)
}

/* ------------------------------------------------- Cand te doare, citeste */

type Nevoie = (typeof needs)[number]

function Nevoi() {
  const [aleasa, setAleasa] = useState<Nevoie | null>(null)
  const [index, setIndex] = useState<Record<string, BibleNeedResult[]> | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    void loadBibleNeeds()
      .then((value) => { if (active) setIndex(value.results) })
      .catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [])

  const gasite = aleasa && index ? (index[aleasa.id] ?? []) : []

  return <section className="bneeds">
    <h2 className="bneeds__title">Când te doare, citește</h2>
    <p className="bneeds__intro">Spune ce te apasă acum. Îți arătăm locurile din Scriptură unde se vorbește despre asta — nu versete rupte, ci întâmplări întregi, cu explicație.</p>

    <div className="bneeds__list">
      {needs.map((n) => <button
        key={n.id}
        type="button"
        className={aleasa?.id === n.id ? "bneed is-on" : "bneed"}
        onClick={() => setAleasa(aleasa?.id === n.id ? null : n)}
      >{n.label}</button>)}
    </div>

    {aleasa && <div className="bfound">
      <div className="bfound__head">
        <h3>{aleasa.label}</h3>
        <button type="button" className="ghost" onClick={() => setAleasa(null)}>Închide</button>
      </div>
      {!index && !failed
        ? <p className="muted">Căutăm pasajele potrivite…</p>
        : failed
          ? <p className="muted">Pasajele nu s-au putut încărca. Verifică legătura și încearcă din nou.</p>
          : gasite.length === 0
        ? <p className="muted">Deocamdată nu avem un pasaj disponibil pentru această căutare.</p>
        : gasite.map((g) => <button
            key={`${g.ref}-${g.heading}`}
            type="button"
            className="bfound__item"
            onClick={() => navigate(`/biblia/${g.bookId}/${g.chapter}`)}
          >
            <span className="bfound__ref">{g.ref}</span>
            <span className="bfound__heading">{g.heading}</span>
          </button>)}
    </div>}
  </section>
}

/* ---------------------------------------------------------------- Acasa */

type ListedBook = BibleBook | BibleBookSummary
type ListedChapter = BibleChapter | BibleChapterSummary

function isFullChapter(chapter: ListedChapter): chapter is BibleChapter {
  return "units" in chapter && Array.isArray(chapter.units)
}

function ChapterLink({ book, chapter }: { book: ListedBook; chapter: ListedChapter }) {
  const review = chapter.status !== "published"
  return <button type="button" className="bchap" onClick={() => navigate(`/biblia/${book.id}/${chapter.number}`)}>
    <span className="bchap__no">{chapter.number}</span>
    <span className="bchap__main">
      <span className="bchap__title">{chapter.title}</span>
      <span className="bchap__sum">{chapter.summary}</span>
    </span>
    {review && SHOW_EDITORIAL && <span className="bchap__flag" title="Scris, dar necitit încă de un om">în revizie</span>}
  </button>
}

function Book({ book, query }: { book: ListedBook; query: string }) {
  const q = query.trim().toLowerCase()
  const [expanded, setExpanded] = useState(book.order === 1)
  const chapters = useMemo(() => {
    const available = visibleChapters(book.chapters)
    if (q.length === 0) return available
    return available.filter((c) => {
      const hay = plat(`${c.number} ${c.title} ${c.summary}`)
      if (hay.includes(plat(q))) return true
      return isFullChapter(c) && c.units.some((u) => plat(`${u.heading} ${u.ref} ${u.text}`).includes(plat(q)))
    })
  }, [book, q])
  const showChapters = expanded || q.length > 0

  return <section className="bbook">
    <header className="bbook__head">
      <button
        type="button"
        className="bbook__toggle"
        aria-expanded={showChapters}
        aria-label={`${showChapters ? "Închide" : "Deschide"} ${book.name}`}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="bbook__meta">
          <span className="bbook__name">{book.name}</span>
          <span className="muted">{book.blurb}</span>
          {book.translation && <span className="muted">{book.translation}</span>}
          <span className="bbook__count">{visibleChapters(book.chapters).length} capitole disponibile</span>
        </span>
        <ArrowRight className={showChapters ? "bbook__arrow is-open" : "bbook__arrow"} size={18} aria-hidden />
      </button>
    </header>
    {showChapters && (chapters.length === 0
      ? <p className="muted bbook__none">Nimic cu cuvântul acesta în {book.name}.</p>
      : <div className="bbook__list">{chapters.map((c) => <ChapterLink key={c.id} book={book} chapter={c} />)}</div>)}
  </section>
}

export function Bible() {
  const [query, setQuery] = useState("")
  const [catalog, setCatalog] = useState<BibleBookSummary[] | null>(null)
  const [searchBooks, setSearchBooks] = useState<BibleBook[] | null>(null)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const last = readLast()

  useEffect(() => {
    let active = true
    void loadBibleCatalog()
      .then((value) => { if (active) setCatalog(value.books) })
      .catch(() => { if (active) setLoadError(true) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    const term = query.trim()
    if (!catalog || term.length === 0) {
      setSearchBooks(null)
      setLoadingSearch(false)
      return
    }

    let active = true
    const timer = window.setTimeout(() => {
      setLoadingSearch(true)
      void loadAllBibleBooks(catalog)
        .then((books) => { if (active) setSearchBooks(books) })
        .catch(() => { if (active) setLoadError(true) })
        .finally(() => { if (active) setLoadingSearch(false) })
    }, 250)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [catalog, query])

  const listedBooks: ListedBook[] = query.trim() ? (searchBooks ?? []) : (catalog ?? [])

  return <section className="bible">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/")}><ArrowLeft size={16} aria-hidden /> Azi</button>

    <header className="bible__head">
      <BookOpen size={22} strokeWidth={1.7} aria-hidden />
      <h1>Biblia explicată</h1>
    </header>
    <p className="bible__intro">Textul întreg, așa cum este scris, și lângă el explicația verset cu verset. Nu ca să treci peste Scriptură, ci ca să nu rămâi în fața ei fără să înțelegi.</p>

    {last && <button type="button" className="tile bible__resume" onClick={() => navigate(`/biblia/${last.bookId}/${last.chapter}`)}>
      <span className="today__kicker">Unde ai rămas</span>
      <span className="bible__resume-title">{last.title}</span>
      <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
    </button>}

    <Nevoi />

    <label className="bsearch">
      <Search size={16} strokeWidth={1.9} aria-hidden />
      <input
        type="search"
        value={query}
        placeholder="Caută un capitol, un nume, o vorbă"
        onChange={(e) => setQuery(e.currentTarget.value)}
        aria-label="Caută în Biblia explicată"
      />
    </label>

    {!catalog && !loadError && <p className="muted">Se deschide catalogul Bibliei Emanus…</p>}
    {loadingSearch && <p className="muted">Căutăm în textul întreg…</p>}
    {loadError && <p className="muted">Biblia Emanus nu s-a putut încărca. Verifică legătura și încearcă din nou.</p>}
    {listedBooks.map((b) => <Book key={b.id} book={b} query={query} />)}

    <p className="muted bible__note">Traducerea este indicată separat pentru fiecare carte. Explicațiile sunt scrise pentru Emanus.</p>
  </section>
}

/* -------------------------------------------------------------- Capitol */

function Unit({ unit }: { unit: BibleUnit }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(readSaved().includes(unit.id))
  }, [unit.id])

  function onSave(): void {
    const current = readSaved()
    const next = current.includes(unit.id) ? current.filter((x) => x !== unit.id) : [...current, unit.id]
    writeSaved(next)
    setSaved(next.includes(unit.id))
  }

  function onSend(): void {
    const payload = `${unit.ref} — ${unit.heading}\n\n${unit.text}`
    const nav = window.navigator as Navigator & { share?: (d: { title: string; text: string }) => Promise<void> }
    if (typeof nav.share === "function") {
      void nav.share({ title: unit.ref, text: payload }).catch(() => undefined)
      return
    }
    void window.navigator.clipboard?.writeText(payload).catch(() => undefined)
  }

  function onAsk(): void {
    navigate(`/intreaba?despre=${encodeURIComponent(unit.ref)}`)
  }

  return <article className="bunit">
    <p className="bunit__ref">{unit.ref}</p>
    <h3 className="bunit__heading">{unit.heading}</h3>

    <blockquote className="bunit__text">{unit.text}</blockquote>

    <div className="bunit__teaching">{paragraphs(unit.teaching).map((p, i) => <p key={i}>{p}</p>)}</div>

    {unit.words && unit.words.length > 0 && <div className="bwords">
      {unit.words.map((w) => <p key={w.transliteration} className="bword">
        <span className="bword__orig" lang="he">{w.original}</span>
        <span className="bword__tr">{w.transliteration}</span>
        <span className="bword__mean">{w.meaning}</span>
      </p>)}
    </div>}

    {unit.crossRefs && unit.crossRefs.length > 0 && <p className="brefs">{unit.crossRefs.join(" · ")}</p>}

    {unit.forYourHeart && <div className="bheart">
      <p className="today__kicker">Pentru inima ta</p>
      <p>{unit.forYourHeart}</p>
    </div>}

    <div className="bactions">
      <button type="button" className="ghost" onClick={onSave} aria-pressed={saved}>
        {saved ? <BookmarkCheck size={16} aria-hidden /> : <Bookmark size={16} aria-hidden />}
        {saved ? "Salvat" : "Salvează"}
      </button>
      <button type="button" className="ghost" onClick={onSend}><Send size={16} aria-hidden /> Trimite</button>
      <button type="button" className="ghost" onClick={onAsk}><HelpCircle size={16} aria-hidden /> Întreabă</button>
    </div>
  </article>
}

export function BibleChapterScreen({ bookId, chapter }: { bookId: string; chapter: number }) {
  const [book, setBook] = useState<BibleBook | null>(null)
  const [failed, setFailed] = useState(false)
  const found = book?.chapters.find((candidate) => candidate.number === chapter)
  const canRead = Boolean(found && (SHOW_EDITORIAL || chapterIsOpen(found)))

  useEffect(() => {
    let active = true
    setBook(null)
    setFailed(false)
    void loadBibleBook(bookId)
      .then((value) => { if (active) setBook(value) })
      .catch(() => { if (active) setFailed(true) })
    return () => { active = false }
  }, [bookId])

  useEffect(() => {
    if (found && canRead) writeLast({ bookId, chapter, title: found.title })
  }, [bookId, chapter, found, canRead])

  if (!book && !failed) {
    return <section className="bible">
      <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
      <p className="muted">Se deschide cartea…</p>
    </section>
  }

  if (failed) {
    return <section className="bible">
      <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
      <p className="muted">Cartea nu s-a putut încărca. Verifică legătura și încearcă din nou.</p>
    </section>
  }

  if (!found || !book || !canRead) {
    return <section className="bible">
      <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
      <p className="muted">Capitolul acesta nu este încă scris. Nu-l punem pe jumătate.</p>
    </section>
  }

  const numbers = visibleChapters(book.chapters).map((c) => c.number).sort((a, b) => a - b)
  const at = numbers.indexOf(chapter)
  const prev = at > 0 ? numbers[at - 1] : undefined
  const next = at >= 0 && at < numbers.length - 1 ? numbers[at + 1] : undefined

  return <section className="bible bible--chapter">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>

    <header className="bchead">
      <p className="today__kicker">{book.name} {found.number}</p>
      <h1>{found.title}</h1>
      <p className="bchead__sum">{found.summary}</p>
      {SHOW_EDITORIAL && found.status !== "published" && <p className="bchead__flag">Scris, dar necitit încă de un om. Dacă vezi ceva greșit, spune-ne.</p>}
    </header>

    <details className="bctx">
      <summary>Unde suntem în carte</summary>
      <p>{found.literaryContext}</p>
    </details>
    <details className="bctx">
      <summary>Cum era pe atunci</summary>
      <p>{found.historicalContext}</p>
    </details>

    {found.units.map((u) => <Unit key={u.id} unit={u} />)}

    <div className="bprayer">
      <p className="today__kicker">Rugăciune</p>
      {paragraphs(found.prayer).map((p, i) => <p key={i}>{p}</p>)}
    </div>

    <nav className="bnav" aria-label="Capitole">
      {prev !== undefined
        ? <button type="button" className="ghost" onClick={() => navigate(`/biblia/${book.id}/${prev}`)}><ArrowLeft size={16} aria-hidden /> {book.name} {prev}</button>
        : <span />}
      {next !== undefined
        ? <button type="button" className="ghost" onClick={() => navigate(`/biblia/${book.id}/${next}`)}>{book.name} {next} <ArrowRight size={16} aria-hidden /></button>
        : <span />}
    </nav>

    <p className="muted bible__note">{book.translation ?? BIBLE_TRANSLATION}</p>
  </section>
}
