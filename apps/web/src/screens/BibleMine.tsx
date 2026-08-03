import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, BookMarked, CircleHelp, Cloud, CloudOff, Inbox, NotebookPen, RefreshCw, Trash2 } from "lucide-react"
import {
  deleteBibleNote,
  setBibleUnitSaved,
  syncBiblePersonal,
  updateBibleNote,
  type BibleNote,
  type BibleQuestionStatus,
  type BibleSavedUnit,
  type BibleSyncStatus,
} from "../biblePersonal"
import { getBibleStaffRole, type BibleStaffRole } from "../bibleInbox"
import { getEmail } from "../session"
import { navigate } from "../router"
import { useBiblePersonal } from "../useBiblePersonal"
import "../bible.css"

const STATUS_LABEL: Record<BibleQuestionStatus, string> = {
  queued: "Trimisă",
  in_review: "Este citită",
  answered: "Răspuns primit",
  closed: "Închisă",
}

const SYNC_LABEL: Record<BibleSyncStatus, string> = {
  local: "Doar pe acest dispozitiv",
  syncing: "Se sincronizează",
  synced: "Sincronizat",
  offline: "Offline · se va sincroniza",
  error: "Sincronizarea așteaptă",
}

function NoteCard({ note }: { note: BibleNote }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note.body)
  const [confirming, setConfirming] = useState(false)

  return <article className="bmine-card">
    <button type="button" className="bmine-card__place" onClick={() => navigate(`/biblia/${note.bookId}/${note.chapter}`)}>
      <span>{note.ref}</span><ArrowRight size={15} aria-hidden />
    </button>
    {editing
      ? <div className="bnote-editor">
          <textarea rows={5} maxLength={10000} value={draft} aria-label={`Nota pentru ${note.ref}`} onChange={(event) => setDraft(event.currentTarget.value)} />
          <div className="bnote-editor__actions">
            <button type="button" className="ghost" onClick={() => { setEditing(false); setDraft(note.body) }}>Renunță</button>
            <button type="button" disabled={!draft.trim()} onClick={() => { updateBibleNote(note.id, draft); setEditing(false) }}>Salvează</button>
          </div>
        </div>
      : <p className="bmine-card__body">{note.body}</p>}
    {!editing && <div className="bnote__actions">
      <button type="button" className="ghost" onClick={() => setEditing(true)}>Editează</button>
      {confirming
        ? <span className="bnote__confirm" role="group" aria-label="Confirmă ștergerea notei">
            <button type="button" className="ghost" onClick={() => setConfirming(false)}>Păstrează</button>
            <button type="button" className="bnote__delete" onClick={() => deleteBibleNote(note.id)}>Șterge nota</button>
          </span>
        : <button type="button" className="ghost" onClick={() => setConfirming(true)}><Trash2 size={14} aria-hidden /> Șterge</button>}
    </div>}
  </article>
}

function SavedCard({ item }: { item: BibleSavedUnit }) {
  return <article className="bmine-card bmine-card--saved">
    <button type="button" className="bmine-card__open" onClick={() => navigate(`/biblia/${item.bookId}/${item.chapter}`)}>
      <span className="today__kicker">{item.ref}</span>
      <strong>{item.heading}</strong>
      <small>{item.bookName} {item.chapter}</small>
    </button>
    <button
      type="button"
      className="ghost bmine-card__remove"
      aria-label={`Elimină ${item.ref} din salvări`}
      onClick={() => setBibleUnitSaved({
        unitId: item.unitId,
        bookId: item.bookId,
        bookName: item.bookName,
        chapter: item.chapter,
        ref: item.ref,
        heading: item.heading,
      }, false)}
    >Elimină</button>
  </article>
}

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
  } catch {
    return ""
  }
}

export function BibleMine() {
  const { state, syncStatus } = useBiblePersonal()
  const [staffRole, setStaffRole] = useState<BibleStaffRole | null>(null)
  const saved = useMemo(() => Object.values(state.saved).filter((item) => item.saved).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [state.saved])
  const notes = useMemo(() => state.notes.filter((note) => note.deletedAt === null).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [state.notes])
  const questions = useMemo(() => [...state.questions].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [state.questions])

  useEffect(() => {
    let alive = true
    void getBibleStaffRole().then((role) => { if (alive) setStaffRole(role) })
    return () => { alive = false }
  }, [syncStatus])

  const isOffline = syncStatus === "offline" || syncStatus === "local" || syncStatus === "error"

  return <section className="bible bmine">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia")}><ArrowLeft size={16} aria-hidden /> Biblia</button>
    <header className="bible__head">
      <BookMarked size={22} strokeWidth={1.7} aria-hidden />
      <h1>Biblia mea</h1>
    </header>
    <div className={`bmine-sync bmine-sync--${syncStatus}`} role="status">
      {isOffline ? <CloudOff size={16} aria-hidden /> : <Cloud size={16} aria-hidden />}
      <span>{SYNC_LABEL[syncStatus]}</span>
      {(syncStatus === "offline" || syncStatus === "error") && <button type="button" className="ghost" onClick={() => void syncBiblePersonal()}><RefreshCw size={14} aria-hidden /> Reîncearcă</button>}
    </div>

    {!getEmail() && <div className="bmine-account">
      <p><strong>Vrei Biblia ta și pe alt dispozitiv?</strong> Leagă un e-mail fără parolă. Ce ai scris rămâne al tău.</p>
      <button type="button" onClick={() => navigate("/auth")}>Leagă e-mailul</button>
    </div>}

    {staffRole && <button type="button" className="tile bmine-inbox" onClick={() => navigate("/inbox-intrebari")}>
      <Inbox size={18} aria-hidden />
      <span><strong>Inbox pastoral</strong><small>Întrebări care așteaptă un om</small></span>
      <ArrowRight size={17} aria-hidden />
    </button>}

    {state.progress && <section className="bmine-section">
      <h2>Unde ai rămas</h2>
      <button type="button" className="tile bible__resume" onClick={() => navigate(`/biblia/${state.progress?.bookId}/${state.progress?.chapter}`)}>
        <span className="today__kicker">Continuă lectura</span>
        <span className="bible__resume-title">{state.progress.bookName} {state.progress.chapter} · {state.progress.chapterTitle}</span>
        <ArrowRight size={18} aria-hidden />
      </button>
    </section>}

    <section className="bmine-section">
      <h2>Locuri salvate <span>{saved.length}</span></h2>
      {saved.length > 0
        ? <div className="bmine-list">{saved.map((item) => <SavedCard key={item.unitId} item={item} />)}</div>
        : <div className="bmine-empty"><BookMarked size={20} aria-hidden /><p>Nu ai salvat încă niciun loc.</p><button type="button" onClick={() => navigate("/biblia")}>Deschide Biblia</button></div>}
    </section>

    <section className="bmine-section">
      <h2>Notițele mele <span>{notes.length}</span></h2>
      {notes.length > 0
        ? <div className="bmine-list">{notes.map((note) => <NoteCard key={note.id} note={note} />)}</div>
        : <div className="bmine-empty"><NotebookPen size={20} aria-hidden /><p>Notele scrise lângă un pasaj vor apărea aici.</p><button type="button" onClick={() => navigate("/biblia")}>Citește un capitol</button></div>}
    </section>

    <section className="bmine-section">
      <h2>Întrebările mele <span>{questions.length}</span></h2>
      {questions.length > 0
        ? <div className="bmine-list">{questions.map((question) => <article key={question.id} className="bmine-card bmine-question">
            <div className="bmine-question__meta">
              <span className={`bmine-status bmine-status--${question.status}`}>{STATUS_LABEL[question.status]}</span>
              <time dateTime={question.createdAt}>{formatDate(question.createdAt)}</time>
            </div>
            {question.ref && <p className="today__kicker">Despre {question.ref}</p>}
            <p className="bmine-card__body">{question.question}</p>
            {question.answer && <div className="bmine-answer"><strong>Răspuns pastoral</strong><p>{question.answer}</p></div>}
          </article>)}</div>
        : <div className="bmine-empty"><CircleHelp size={20} aria-hidden /><p>Întrebările trimise vor rămâne aici împreună cu răspunsul.</p><button type="button" onClick={() => navigate("/intreaba")}>Pune o întrebare</button></div>}
    </section>
  </section>
}
