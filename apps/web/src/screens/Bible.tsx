import { useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  NotebookPen,
  Search,
  Send,
  Trash2,
} from "lucide-react"
import type { BibleChapter, BibleUnit } from "@emanus/shared/bible"
import {
  DEFAULT_BIBLE_TRANSLATION,
  loadBibleCatalog,
  loadBibleChapter,
  searchBible,
  searchBibleTerms,
  type BibleCatalogBook,
  type BibleCatalogChapter,
  type BibleSearchHit,
} from "../bibleContent"
import {
  addBibleNote,
  deleteBibleNote,
  refreshSavedMetadata,
  setBibleProgress,
  setBibleUnitSaved,
  updateBibleNote,
  type BibleNote,
  type BibleSourceSnapshot,
} from "../biblePersonal"
import { navigate } from "../router"
import { useBiblePersonal } from "../useBiblePersonal"
import { Skeleton } from "../ds"
import "../bible.css"
import "../bible-expand.css"
import "../needs.css"

function paragraphs(text: string): string[] {
  return text.split("\n\n").map((paragraph) => paragraph.trim()).filter(Boolean)
}

type Need = { label: string; terms: string[] }

const NEEDS: Need[] = [
  { label: "Mi-a murit cineva", terms: ["a murit", "jelit", "mormant", "ingropat", "doliu"] },
  { label: "Boală și spital", terms: ["bolnav", "boala", "neputinta trupului"] },
  { label: "S-a rupt casa mea", terms: ["casnicie", "despartit", "nevasta", "barbatul ei"] },
  { label: "Bani și datorii", terms: ["foamete", "saracie", "argint", "nu mai aveau ce manca"] },
  { label: "Sunt departe de ai mei", terms: ["strain", "instrainat", "tara straina", "pribeag"] },
  { label: "Beau. Nu mă pot opri", terms: ["vin", "beat", "s-a imbatat", "patima"] },
  { label: "Pofta care mă ține", terms: ["pofta", "curvie", "desfranare", "culca-te cu mine"] },
  { label: "Nu pot să iert în familie", terms: ["ura", "iertare", "razbunare", "fratii lui"] },
  { label: "Mi-e rușine de ce am făcut", terms: ["rusine", "vinovat", "pacatul meu", "s-a ascuns"] },
  { label: "Mi-e frică de moarte", terms: ["nu te teme", "frica", "moartea", "mor"] },
  { label: "Mă rog și nu simt nimic", terms: ["s-a rugat", "tacere", "nu a raspuns"] },
  { label: "De ce a îngăduit Dumnezeu", terms: ["de ce", "incercare", "a ingaduit", "sa-mi faceti rau"] },
  { label: "Am umblat cu descântece", terms: ["idoli", "ghicire", "vraji", "dumnezei straini"] },
  { label: "Copilul meu s-a depărtat", terms: ["fiul meu", "copilul", "s-a dus de la", "tatal lui"] },
]

function BibleLoading({ rows = 3 }: { rows?: number }) {
  return <div className="bloading" aria-label="Se încarcă Biblia">
    {Array.from({ length: rows }, (_, index) => <div key={index} className="bloading__row">
      <Skeleton variant="text" width="38%" />
      <Skeleton variant="text" width="86%" />
    </div>)}
  </div>
}

function HitList({ hits, empty }: { hits: BibleSearchHit[]; empty: string }) {
  if (hits.length === 0) return <p className="muted bfound__empty">{empty}</p>
  return <div className="bfound__results">
    {hits.map((hit) => <button
      key={hit.unitId}
      type="button"
      className="bfound__item"
      onClick={() => navigate(`/biblia/${hit.bookId}/${hit.chapter}`)}
    >
      <span className="bfound__ref">{hit.ref}</span>
      <span className="bfound__heading">{hit.heading}</span>
      {hit.excerpt && <span className="bfound__excerpt">{hit.excerpt}</span>}
    </button>)}
  </div>
}

function Needs() {
  const [selected, setSelected] = useState<Need | null>(null)
  const [hits, setHits] = useState<BibleSearchHit[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let alive = true
    if (!selected) {
      setHits([])
      setLoading(false)
      return () => { alive = false }
    }
    setLoading(true)
    void searchBibleTerms(selected.terms).then((result) => {
      if (!alive) return
      setHits(result)
      setLoading(false)
    })
    return () => { alive = false }
  }, [selected])

  return <section className="bneeds">
    <h2 className="bneeds__title">Când te doare, citește</h2>
    <p className="bneeds__intro">Spune ce te apasă acum. Îți arătăm locurile unde Scriptura tratează acel lucru în context, nu versete rupte din întâmplarea lor.</p>
    <div className="bneeds__list">
      {NEEDS.map((need) => <button
        key={need.label}
        type="button"
        className={selected?.label === need.label ? "bneed is-on" : "bneed"}
        aria-pressed={selected?.label === need.label}
        onClick={() => setSelected(selected?.label === need.label ? null : need)}
      >{need.label}</button>)}
    </div>
    {selected && <div className="bfound" aria-live="polite">
      <div className="bfound__head">
        <h3>{selected.label}</h3>
        <button type="button" className="ghost" onClick={() => setSelected(null)}>Închide</button>
      </div>
      {loading
        ? <BibleLoading rows={2} />
        : <HitList hits={hits} empty="Nu am găsit încă un loc vizibil pentru contul acesta. Contul de reviewer vede și conținutul în revizie; publicul vede numai capitolele aprobate." />}
    </div>}
  </section>
}

function ChapterLink({ book, chapter }: { book: BibleCatalogBook; chapter: BibleCatalogChapter }) {
  const review = chapter.status !== "published"
  return <button type="button" className="bchap" onClick={() => navigate(`/biblia/${book.id}/${chapter.number}`)}>
    <span className="bchap__no">{chapter.number}</span>
    <span className="bchap__main">
      <span className="bchap__title">{chapter.title}</span>
      <span className="bchap__sum">{chapter.summary}</span>
    </span>
    {review && <span className="bchap__flag" title="Vizibil contului de reviewer înainte de publicarea finală">în revizie</span>}
  </button>
}

function Book({ book }: { book: BibleCatalogBook }) {
  return <section className="bbook">
    <header className="bbook__head">
      <h2>{book.name}</h2>
      <p className="muted">{book.blurb}</p>
      <p className="bbook__count">{book.chapters.length} capitole vizibile pentru acest cont</p>
    </header>
    <div className="bbook__list">
      {book.chapters.map((chapter) => <ChapterLink key={chapter.id} book={book} chapter={chapter} />)}
    </div>
  </section>
}

export function Bible() {
  const { state } = useBiblePersonal()
  const [books, setBooks] = useState<BibleCatalogBook[] | null>(null)
  const [query, setQuery] = useState("")
  const [hits, setHits] = useState<BibleSearchHit[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    let alive = true
    void loadBibleCatalog().then((catalog) => {
      if (alive) setBooks(catalog)
    })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    let alive = true
    const clean = query.trim()
    if (clean.length < 2) {
      setHits([])
      setSearching(false)
      return () => { alive = false }
    }
    setSearching(true)
    const timer = window.setTimeout(() => {
      void searchBible(clean).then((result) => {
        if (!alive) return
        setHits(result)
        setSearching(false)
      })
    }, 250)
    return () => {
      alive = false
      window.clearTimeout(timer)
    }
  }, [query])

  const translation = books?.[0]?.translation ?? DEFAULT_BIBLE_TRANSLATION
  const last = state.progress

  return <section className="bible">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/")}><ArrowLeft size={16} aria-hidden /> Azi</button>
    <header className="bible__head">
      <BookOpen size={22} strokeWidth={1.7} aria-hidden />
      <h1>Biblia explicată</h1>
    </header>
    <p className="bible__intro">Textul Scripturii și explicația lui vers cu vers stau separat. Explicația te ajută să vezi contextul; nu ia locul Cuvântului.</p>

    <div className="bible__quick">
      {last && <button type="button" className="tile bible__resume" onClick={() => navigate(`/biblia/${last.bookId}/${last.chapter}`)}>
        <span className="today__kicker">Unde ai rămas</span>
        <span className="bible__resume-title">{last.bookName} {last.chapter} · {last.chapterTitle}</span>
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
      </button>}
      <button type="button" className="tile bible__mine" onClick={() => navigate("/biblia-mea")}>
        <BookMarked size={18} strokeWidth={1.8} aria-hidden />
        <span><strong>Biblia mea</strong><small>Salvări, notițe și întrebări</small></span>
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
      </button>
    </div>

    <Needs />

    <label className="bsearch">
      <Search size={16} strokeWidth={1.9} aria-hidden />
      <input
        type="search"
        value={query}
        placeholder="Caută un nume, un loc sau un cuvânt"
        onChange={(event) => setQuery(event.currentTarget.value)}
        aria-label="Caută în Biblia explicată"
      />
    </label>

    {query.trim().length >= 2
      ? <section className="bsearch-results" aria-live="polite">
          <h2>Rezultate</h2>
          {searching ? <BibleLoading rows={3} /> : <HitList hits={hits} empty="Nu am găsit acest cuvânt în capitolele vizibile pentru contul tău." />}
        </section>
      : books === null
        ? <BibleLoading rows={4} />
        : books.length > 0
          ? books.map((book) => <Book key={book.id} book={book} />)
          : <div className="bible__empty">
              <BookOpen size={24} strokeWidth={1.6} aria-hidden />
              <p>Niciun capitol nu este vizibil pentru acest cont. Pentru revizia internă, autentifică-te cu contul căruia i-a fost acordat rolul de admin.</p>
            </div>}

    <p className="muted bible__note">Traducere: {translation}. Explicațiile sunt redactate în română pe baza studiilor verse-by-verse ale lui Zac Poonen, păstrând sensul doctrinar și separarea clară față de textul Scripturii. Folosirea ediției biblice trebuie autorizată înainte de lansarea publică.</p>
  </section>
}

function NoteEditor({ source, notes }: { source: Required<BibleSourceSnapshot>; notes: BibleNote[] }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [editing, setEditing] = useState<string | null>(null)
  const [confirming, setConfirming] = useState<string | null>(null)

  function save(): void {
    if (!draft.trim()) return
    if (editing) updateBibleNote(editing, draft)
    else addBibleNote(source, draft)
    setDraft("")
    setEditing(null)
    setOpen(false)
  }

  return <div className="bnotes">
    {notes.map((note) => <div key={note.id} className="bnote">
      <p>{note.body}</p>
      <div className="bnote__actions">
        <button type="button" className="ghost" onClick={() => {
          setDraft(note.body)
          setEditing(note.id)
          setOpen(true)
        }}>Editează</button>
        {confirming === note.id
          ? <span className="bnote__confirm" role="group" aria-label="Confirmă ștergerea notei">
              <button type="button" className="ghost" onClick={() => setConfirming(null)}>Păstrează</button>
              <button type="button" className="bnote__delete" onClick={() => {
                deleteBibleNote(note.id)
                setConfirming(null)
              }}>Șterge nota</button>
            </span>
          : <button type="button" className="ghost" onClick={() => setConfirming(note.id)}><Trash2 size={14} aria-hidden /> Șterge</button>}
      </div>
    </div>)}

    {open ? <div className="bnote-editor">
      <label htmlFor={`note-${source.unitId}`}>{editing ? "Editează nota" : "Nota ta"}</label>
      <textarea
        id={`note-${source.unitId}`}
        rows={4}
        maxLength={10000}
        value={draft}
        placeholder="Scrie ce ai înțeles, ce te cercetează sau ce vrei să ții minte."
        onChange={(event) => setDraft(event.currentTarget.value)}
      />
      <div className="bnote-editor__actions">
        <button type="button" className="ghost" onClick={() => {
          setOpen(false)
          setDraft("")
          setEditing(null)
        }}>Renunță</button>
        <button type="button" disabled={!draft.trim()} onClick={save}>Salvează nota</button>
      </div>
    </div> : <button type="button" className="ghost bnote-add" onClick={() => setOpen(true)}>
      <NotebookPen size={16} aria-hidden /> Notează pentru tine
    </button>}
  </div>
}

function Unit({ unit, book, chapter, notes, saved, open, onToggle }: {
  unit: BibleUnit
  book: BibleCatalogBook
  chapter: BibleChapter
  notes: BibleNote[]
  saved: boolean
  open: boolean
  onToggle: () => void
}) {
  const [copied, setCopied] = useState(false)
  const source: Required<BibleSourceSnapshot> = {
    unitId: unit.id,
    bookId: book.id,
    bookName: book.name,
    chapter: chapter.number,
    ref: unit.ref,
    heading: unit.heading,
  }

  useEffect(() => {
    refreshSavedMetadata(source)
  }, [source.unitId])

  function share(): void {
    const text = `${unit.ref} — ${unit.heading}\n\n${unit.text}`
    const navigatorWithShare = window.navigator as Navigator & { share?: (data: { title: string; text: string }) => Promise<void> }
    if (navigatorWithShare.share) {
      void navigatorWithShare.share({ title: unit.ref, text }).catch(() => undefined)
      return
    }
    void window.navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }).catch(() => undefined)
  }

  const askParams = new URLSearchParams({
    despre: unit.ref,
    carte: book.id,
    numeCarte: book.name,
    capitol: String(chapter.number),
    unitate: unit.id,
  })
  const teachingParagraphs = paragraphs(unit.teaching)
  const bodyId = `bunit-body-${unit.id}`

  return <article className="bunit" id={unit.id}>
    <p className="bunit__ref">{unit.ref}</p>
    <h3 className="bunit__heading">{unit.heading}</h3>
    <blockquote className="bunit__text">{unit.text}</blockquote>

    {unit.textNotes && unit.textNotes.length > 0 && <aside className="bunit__text-notes" aria-label="Note textuale">
      {unit.textNotes.map((note, index) => <div key={`${note.verse}-${note.kind}-${index}`} className="bunit__text-note">
        <strong>{unit.ref.split(":")[0]}:{note.verse} · Notă textuală</strong>
        <p>{note.note}</p>
        {note.traditionalReading && <p><em>Lectură tradițională:</em> {note.traditionalReading}</p>}
      </div>)}
    </aside>}

    {teachingParagraphs.length > 0 && <div className="bunit__teaching">
      <p>{teachingParagraphs[0]}</p>
      <div id={bodyId} hidden={!open}>
        {teachingParagraphs.slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>}

    {teachingParagraphs.length > 1 && <button
      type="button"
      className={open ? "bunit__toggle is-open" : "bunit__toggle"}
      aria-expanded={open}
      aria-controls={bodyId}
      onClick={onToggle}
    >
      {open
        ? <><ChevronUp size={15} aria-hidden /> Închide explicația</>
        : <><ChevronDown size={15} aria-hidden /> Citește explicația completă</>}
    </button>}

    {open && unit.words && unit.words.length > 0 && <div className="bwords">
      {unit.words.map((word) => <p key={`${word.language}-${word.transliteration}`} className="bword">
        <span className="bword__orig" lang={word.language === "greaca" ? "el" : "he"}>{word.original}</span>
        <span className="bword__tr">{word.transliteration}</span>
        <span className="bword__mean">{word.meaning}</span>
      </p>)}
    </div>}

    {open && unit.crossRefs && unit.crossRefs.length > 0 && <p className="brefs">{unit.crossRefs.join(" · ")}</p>}
    {open && unit.forYourHeart && <div className="bheart">
      <p className="today__kicker">Pentru inima ta</p>
      <p>{unit.forYourHeart}</p>
    </div>}

    <div className="bactions">
      <button type="button" className="ghost" onClick={() => setBibleUnitSaved(source, !saved)} aria-pressed={saved}>
        {saved ? <BookmarkCheck size={16} aria-hidden /> : <Bookmark size={16} aria-hidden />}
        {saved ? "Salvat" : "Salvează"}
      </button>
      <button type="button" className="ghost" onClick={share}><Send size={16} aria-hidden /> {copied ? "Copiat" : "Trimite"}</button>
      <button type="button" className="ghost" onClick={() => navigate(`/intreaba?${askParams.toString()}`)}><HelpCircle size={16} aria-hidden /> Întreabă</button>
    </div>
    <NoteEditor source={source} notes={notes} />
  </article>
}

export function BibleChapterScreen({ bookId, chapter }: { bookId: string; chapter: number }) {
  const { state } = useBiblePersonal()
  const [catalog, setCatalog] = useState<BibleCatalogBook[] | null>(null)
  const [content, setContent] = useState<BibleChapter | null | undefined>(undefined)
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let alive = true
    void Promise.all([loadBibleCatalog(), loadBibleChapter(bookId, chapter)]).then(([nextCatalog, nextContent]) => {
      if (!alive) return
      setCatalog(nextCatalog)
      setContent(nextContent)
    })
    return () => { alive = false }
  }, [bookId, chapter])

  useEffect(() => {
    setOpenUnits({})
  }, [bookId, chapter])

  const book = catalog?.find((item) => item.id === bookId)
  useEffect(() => {
    if (!content || !book) return
    setBibleProgress({
      bookId: book.id,
      bookName: book.name,
      chapter: content.number,
      chapterTitle: content.title,
      unitId: content.units[0]?.id,
    })
  }, [book?.id, content?.id])

  const activeNotes = useMemo(() => state.notes.filter((note) => note.deletedAt === null), [state.notes])

  if (content === undefined || catalog === null) {
    return <section className="bible bible--chapter">
      <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
      <BibleLoading rows={5} />
    </section>
  }

  if (!content || !book) {
    return <section className="bible">
      <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
      <div className="bible__empty">
        <BookOpen size={24} strokeWidth={1.6} aria-hidden />
        <p>Capitolul nu este disponibil pentru contul acesta sau nu a fost încă păstrat offline.</p>
        <button type="button" onClick={() => navigate("/biblia")}>Înapoi la cărți</button>
      </div>
    </section>
  }

  const units = content.units
  const chapterNumbers = book.chapters.map((item) => item.number).sort((left, right) => left - right)
  const position = chapterNumbers.indexOf(chapter)
  const previous = position > 0 ? chapterNumbers[position - 1] : undefined
  const next = position >= 0 && position < chapterNumbers.length - 1 ? chapterNumbers[position + 1] : undefined
  const allOpen = units.length > 0 && units.every((unit) => openUnits[unit.id] === true)

  function toggleUnit(id: string): void {
    setOpenUnits((current) => ({ ...current, [id]: !current[id] }))
  }

  function toggleAll(): void {
    if (allOpen) {
      setOpenUnits({})
      return
    }
    setOpenUnits(Object.fromEntries(units.map((unit) => [unit.id, true])))
  }

  return <section className="bible bible--chapter">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
    <header className="bchead">
      <p className="today__kicker">{book.name} {content.number}</p>
      <h1>{content.title}</h1>
      <p className="bchead__sum">{content.summary}</p>
      {content.status !== "published" && <p className="bchead__flag">În revizie: îl parcurgi în aplicație ca reviewer final. Publicul îl va vedea numai după aprobarea și publicarea ta.</p>}
    </header>

    <details className="bctx">
      <summary>Unde suntem în carte</summary>
      <p>{content.literaryContext}</p>
    </details>
    <details className="bctx">
      <summary>Cum era pe atunci</summary>
      <p>{content.historicalContext}</p>
    </details>

    <nav className="bunits" aria-label="Controlul explicațiilor">
      <button type="button" className="ghost bunits__all" onClick={toggleAll}>
        {allOpen
          ? <><ChevronUp size={15} aria-hidden /> Închide tot</>
          : <><ChevronDown size={15} aria-hidden /> Extinde tot</>}
      </button>
    </nav>

    {units.map((unit) => <Unit
      key={unit.id}
      unit={unit}
      book={book}
      chapter={content}
      saved={Boolean(state.saved[unit.id]?.saved)}
      notes={activeNotes.filter((note) => note.unitId === unit.id)}
      open={openUnits[unit.id] === true}
      onToggle={() => toggleUnit(unit.id)}
    />)}

    <div className="bprayer">
      <p className="today__kicker">Rugăciune</p>
      {paragraphs(content.prayer).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </div>

    <nav className="bnav" aria-label="Capitole">
      {previous !== undefined
        ? <button type="button" className="ghost" onClick={() => navigate(`/biblia/${book.id}/${previous}`)}><ArrowLeft size={16} aria-hidden /> {book.name} {previous}</button>
        : <span />}
      {next !== undefined
        ? <button type="button" className="ghost" onClick={() => navigate(`/biblia/${book.id}/${next}`)}>{book.name} {next} <ArrowRight size={16} aria-hidden /></button>
        : <span />}
    </nav>
    <p className="muted bible__note">{book.translation}</p>
  </section>
}
