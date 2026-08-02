import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, BookmarkCheck, HelpCircle, Search, Send } from "lucide-react"
import type { BibleBook, BibleChapter, BibleUnit } from "@emanus/shared/bible"
import { BIBLE_BOOKS, BIBLE_TRANSLATION, findChapter } from "@emanus/shared/bible"
import { navigate } from "../router"
import "../bible.css"
import "../needs.css"

/*
 * Biblia explicata. Textul (Cornilescu 1924, editia originala) sta intr-un
 * strat vizual separat de explicatie: cine vrea numai textul il poate citi
 * fara sa treaca prin comentariu.
 *
 * Capitolele cu status "in_review" se deschid, dar poarta un semn: nu au fost
 * inca citite de un om.
 *
 * Intrarea nu este numai pe carti si capitole, ci si pe durere: "cand te
 * doare, citeste". Omul care sufera nu stie sa caute Geneza 37; stie sa spuna
 * ca l-a lasat cineva.
 *
 * ORTOGRAFIE. In tot ce se vede pe ecran folosim s si t cu virgula dedesubt
 * (U+0219 / U+021B), nu cu sedila (U+015F / U+0163).
 *
 * ATENTIE LA UNIRE. Versiunea buna a acestui ecran este cea de pe ramura
 * codex/matei-verse-by-verse: acolo explicatia se deschide la cerere si exista
 * un navigator de pasaje. Fisierul de fata este cel vechi, indreptat numai la
 * ortografie. La unirea ramurilor se pastreaza versiunea de acolo.
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

/* Textul biblic are diacritice, explicatiile inca nu. Cautarea le pune la fel. */
function plat(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

/* ------------------------------------------------- Cand te doare, citeste */

type Nevoie = { eticheta: string; cuvinte: string[] }

const NEVOI: Nevoie[] = [
  { eticheta: "Mi-a murit cineva", cuvinte: ["a murit", "jelit", "mormant", "ingropat", "plans dupa", "doliu"] },
  { eticheta: "Boal\u0103 \u0219i spital", cuvinte: ["bolnav", "boala", "s-a imbolnavit", "neputinta trupului"] },
  { eticheta: "S-a rupt casa mea", cuvinte: ["nevasta", "barbatul ei", "casnicie", "despartit", "s-a dus de langa"] },
  { eticheta: "Bani \u0219i datorii", cuvinte: ["foamete", "argint", "grau", "saracie", "nu mai aveau ce manca"] },
  { eticheta: "Sunt departe de ai mei", cuvinte: ["strain", "instrainat", "tara straina", "departe de casa", "pribeag"] },
  { eticheta: "Beau. Nu m\u0103 pot opri", cuvinte: ["vin", "beat", "s-a imbatat", "patima"] },
  { eticheta: "Pofta care m\u0103 \u021bine", cuvinte: ["pofta", "curvie", "a poftit", "desfranare", "culca-te cu mine"] },
  { eticheta: "Nu pot s\u0103 iert \u00een familie", cuvinte: ["fratii lui", "ura", "il urau", "iertare", "a iertat", "razbunare"] },
  { eticheta: "Mi-e ru\u0219ine de ce am f\u0103cut", cuvinte: ["rusine", "s-a ascuns", "vinovat", "pacatul meu"] },
  { eticheta: "Mi-e fric\u0103 de moarte", cuvinte: ["frica", "nu te teme", "moartea", "mor"] },
  { eticheta: "M\u0103 rog \u0219i nu simt nimic", cuvinte: ["s-a rugat", "a strigat catre Domnul", "tacere", "nu a raspuns"] },
  { eticheta: "De ce a \u00eeng\u0103duit Dumnezeu", cuvinte: ["de ce", "ai avut in gand sa-mi faceti rau", "incercare", "a ingaduit"] },
  { eticheta: "Am umblat cu desc\u00e2ntece", cuvinte: ["idoli", "ghicire", "vraji", "dumnezei straini"] },
  { eticheta: "Copilul meu s-a dep\u0103rtat", cuvinte: ["fiul meu", "copilul", "s-a dus de la", "tatal lui plangea"] },
]

type Gasit = { bookId: string; bookName: string; chapter: number; ref: string; heading: string }

function cauta(nevoie: Nevoie): Gasit[] {
  const out: Gasit[] = []
  for (const book of BIBLE_BOOKS) {
    for (const ch of book.chapters) {
      for (const u of ch.units) {
        const fan = plat(`${u.heading} ${u.text} ${u.teaching} ${u.forYourHeart ?? ""}`)
        if (nevoie.cuvinte.some((c) => fan.includes(plat(c)))) {
          out.push({ bookId: book.id, bookName: book.name, chapter: ch.number, ref: u.ref, heading: u.heading })
        }
      }
    }
  }
  return out.slice(0, 12)
}

function Nevoi() {
  const [aleasa, setAleasa] = useState<Nevoie | null>(null)
  const gasite = useMemo(() => (aleasa ? cauta(aleasa) : []), [aleasa])

  return <section className="bneeds">
    <h2 className="bneeds__title">C\u00e2nd te doare, cite\u0219te</h2>
    <p className="bneeds__intro">Spune ce te apas\u0103 acum. \u00ce\u021bi ar\u0103t\u0103m locurile din Scriptur\u0103 unde se vorbe\u0219te despre asta \u2014 nu versete rupte, ci \u00eent\u00e2mpl\u0103ri \u00eentregi, cu explica\u021bie.</p>

    <div className="bneeds__list">
      {NEVOI.map((n) => <button
        key={n.eticheta}
        type="button"
        className={aleasa?.eticheta === n.eticheta ? "bneed is-on" : "bneed"}
        onClick={() => setAleasa(aleasa?.eticheta === n.eticheta ? null : n)}
      >{n.eticheta}</button>)}
    </div>

    {aleasa && <div className="bfound">
      <div className="bfound__head">
        <h3>{aleasa.eticheta}</h3>
        <button type="button" className="ghost" onClick={() => setAleasa(null)}>\u00cenchide</button>
      </div>
      {gasite.length === 0
        ? <p className="muted">Deocamdat\u0103 n-avem scris nimic pe durerea aceasta. Vine \u0219i restul.</p>
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

function ChapterLink({ book, chapter }: { book: BibleBook; chapter: BibleChapter }) {
  const review = chapter.status !== "published"
  return <button type="button" className="bchap" onClick={() => navigate(`/biblia/${book.id}/${chapter.number}`)}>
    <span className="bchap__no">{chapter.number}</span>
    <span className="bchap__main">
      <span className="bchap__title">{chapter.title}</span>
      <span className="bchap__sum">{chapter.summary}</span>
    </span>
    {review && <span className="bchap__flag" title="Scris, dar necitit inca de un om">\u00een revizie</span>}
  </button>
}

function Book({ book, query }: { book: BibleBook; query: string }) {
  const q = query.trim().toLowerCase()
  const chapters = useMemo(() => {
    if (q.length === 0) return book.chapters
    return book.chapters.filter((c) => {
      const hay = plat(`${c.number} ${c.title} ${c.summary}`)
      if (hay.includes(plat(q))) return true
      return c.units.some((u) => plat(`${u.heading} ${u.ref} ${u.text}`).includes(plat(q)))
    })
  }, [book, q])

  return <section className="bbook">
    <header className="bbook__head">
      <h2>{book.name}</h2>
      <p className="muted">{book.blurb}</p>
      <p className="bbook__count">{book.chapters.length} capitole scrise</p>
    </header>
    {chapters.length === 0
      ? <p className="muted bbook__none">Nimic cu cuv\u00e2ntul acesta \u00een {book.name}.</p>
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
      <h1>Biblia explicat\u0103</h1>
    </header>
    <p className="bible__intro">Textul \u00eentreg, a\u0219a cum este scris, \u0219i l\u00e2ng\u0103 el explica\u021bia verset cu verset. Nu ca s\u0103 treci peste Scriptur\u0103, ci ca s\u0103 nu r\u0103m\u00e2i \u00een fa\u021ba ei f\u0103r\u0103 s\u0103 \u00een\u021belegi.</p>

    {last && <button type="button" className="tile bible__resume" onClick={() => navigate(`/biblia/${last.bookId}/${last.chapter}`)}>
      <span className="today__kicker">Unde ai r\u0103mas</span>
      <span className="bible__resume-title">{last.title}</span>
      <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
    </button>}

    <Nevoi />

    <label className="bsearch">
      <Search size={16} strokeWidth={1.9} aria-hidden />
      <input
        type="search"
        value={query}
        placeholder="Caut\u0103 un capitol, un nume, o vorb\u0103"
        onChange={(e) => setQuery(e.currentTarget.value)}
        aria-label="Caut\u0103 \u00een Biblia explicat\u0103"
      />
    </label>

    {BIBLE_BOOKS.map((b) => <Book key={b.id} book={b} query={query} />)}

    <p className="muted bible__note">Traducere: {BIBLE_TRANSLATION}. Explica\u021biile sunt scrise pentru Emanus.</p>
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
    const payload = `${unit.ref} \u2014 ${unit.heading}\n\n${unit.text}`
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

    {unit.crossRefs && unit.crossRefs.length > 0 && <p className="brefs">{unit.crossRefs.join(" \u00b7 ")}</p>}

    {unit.forYourHeart && <div className="bheart">
      <p className="today__kicker">Pentru inima ta</p>
      <p>{unit.forYourHeart}</p>
    </div>}

    <div className="bactions">
      <button type="button" className="ghost" onClick={onSave} aria-pressed={saved}>
        {saved ? <BookmarkCheck size={16} aria-hidden /> : <Bookmark size={16} aria-hidden />}
        {saved ? "Salvat" : "Salveaz\u0103"}
      </button>
      <button type="button" className="ghost" onClick={onSend}><Send size={16} aria-hidden /> Trimite</button>
      <button type="button" className="ghost" onClick={onAsk}><HelpCircle size={16} aria-hidden /> \u00centreab\u0103</button>
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
      <p className="muted">Capitolul acesta nu este \u00eenc\u0103 scris. Nu-l punem pe jum\u0103tate.</p>
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
      {found.status !== "published" && <p className="bchead__flag">Scris, dar necitit \u00eenc\u0103 de un om. Dac\u0103 vezi ceva gre\u0219it, spune-ne.</p>}
    </header>

    <details className="bctx">
      <summary>Unde suntem \u00een carte</summary>
      <p>{found.literaryContext}</p>
    </details>
    <details className="bctx">
      <summary>Cum era pe atunci</summary>
      <p>{found.historicalContext}</p>
    </details>

    {found.units.map((u) => <Unit key={u.id} unit={u} />)}

    <div className="bprayer">
      <p className="today__kicker">Rug\u0103ciune</p>
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
