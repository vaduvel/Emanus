import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, BookmarkCheck, Search, Send } from "lucide-react"
import type { BibleBook, BibleChapter, BibleUnit } from "@emanus/shared/bible"
import { BIBLE_BOOKS, BIBLE_TRANSLATION, findChapter } from "@emanus/shared/bible"
import { navigate } from "../router"
import "../bible.css"

/*
 * Biblia explicata. Textul (Cornilescu 1924, editia originala) sta intr-un
 * strat vizual separat de explicatie: cine vrea numai textul il poate citi
 * fara sa treaca prin comentariu.
 *
 * Capitolele cu status "in_review" se deschid, dar poarta un semn: nu au fost
 * inca citite de un om.
 */

const LAST_KEY = "emanus.bible.last"
const SAVED_KEY = "emanus.bible.saved"

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

/* ---------------------------------------------------------------- Acasa */

function ChapterLink({ book, chapter }: { book: BibleBook; chapter: BibleChapter }) {
  const review = chapter.status !== "published"
  return <button type="button" className="bchap" onClick={() => navigate(`/biblia/${book.id}/${chapter.number}`)}>
    <span className="bchap__no">{chapter.number}</span>
    <span className="bchap__main">
      <span className="bchap__title">{chapter.title}</span>
      <span className="bchap__sum">{chapter.summary}</span>
    </span>
    {review && <span className="bchap__flag" title="Scris, dar necitit inca de un om">în revizie</span>}
  </button>
}

function Book({ book, query }: { book: BibleBook; query: string }) {
  const q = query.trim().toLowerCase()
  const chapters = useMemo(() => {
    if (q.length === 0) return book.chapters
    return book.chapters.filter((c) => {
      const hay = `${c.number} ${c.title} ${c.summary}`.toLowerCase()
      if (hay.includes(q)) return true
      return c.units.some((u) => `${u.heading} ${u.ref} ${u.text}`.toLowerCase().includes(q))
    })
  }, [book, q])

  return <section className="bbook">
    <header className="bbook__head">
      <h2>{book.name}</h2>
      <p className="muted">{book.blurb}</p>
      <p className="bbook__count">{book.chapters.length} capitole scrise</p>
    </header>
    {chapters.length === 0
      ? <p className="muted bbook__none">Nimic cu cuvântul acesta în {book.name}.</p>
      : <div className="bbook__list">{chapters.map((c) => <ChapterLink key={c.id} book={book} chapter={c} />)}</div>}
  </section>
}

export function Bible() {
  const [query, setQuery] = useState("")
  const last = readLast()

  return <section className="bible">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/")}><ArrowLeft size={16} aria-hidden /> Azi</button>

    <header className="bible__head">
      <BookOpen size={22} strokeWidth={1.7} aria-hidden />
      <h1>Biblia explicată</h1>
    </header>
    <p className="bible__intro">Textul întreg, aşa cum este scris, şi lângă el explicaţia verset cu verset. Nu ca să treci peste Scriptură, ci ca să nu rămâi în faţa ei fără să înţelegi.</p>

    {last && <button type="button" className="tile bible__resume" onClick={() => navigate(`/biblia/${last.bookId}/${last.chapter}`)}>
      <span className="today__kicker">Unde ai rămas</span>
      <span className="bible__resume-title">{last.title}</span>
      <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
    </button>}

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

    {BIBLE_BOOKS.map((b) => <Book key={b.id} book={b} query={query} />)}

    <p className="muted bible__note">Traducere: {BIBLE_TRANSLATION}. Explicaţiile sunt scrise pentru Emanus.</p>
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
    </div>
  </article>
}

export function BibleChapterScreen({ bookId, chapter }: { bookId: string; chapter: number }) {
  const found = findChapter(bookId, chapter)
  const book = BIBLE_BOOKS.find((b) => b.id === bookId)

  useEffect(() => {
    if (found) writeLast({ bookId, chapter, title: found.title })
  }, [bookId, chapter, found])

  if (!found || !book) {
    return <section className="bible">
      <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
      <p className="muted">Capitolul acesta nu este încă scris. Nu-l punem pe jumătate.</p>
    </section>
  }

  const numbers = book.chapters.map((c) => c.number).sort((a, b) => a - b)
  const at = numbers.indexOf(chapter)
  const prev = at > 0 ? numbers[at - 1] : undefined
  const next = at >= 0 && at < numbers.length - 1 ? numbers[at + 1] : undefined

  return <section className="bible bible--chapter">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>

    <header className="bchead">
      <p className="today__kicker">{book.name} {found.number}</p>
      <h1>{found.title}</h1>
      <p className="bchead__sum">{found.summary}</p>
      {found.status !== "published" && <p className="bchead__flag">Scris, dar necitit încă de un om. Dacă vezi ceva greşit, spune-ne.</p>}
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

    <p className="muted bible__note">{BIBLE_TRANSLATION}</p>
  </section>
}
