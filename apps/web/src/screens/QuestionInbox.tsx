import { useEffect, useState } from "react"
import { ArrowLeft, Check, Inbox, Send } from "lucide-react"
import { answerBibleQuestion, getBibleStaffRole, loadBibleQuestionInbox, type InboxQuestion } from "../bibleInbox"
import { navigate } from "../router"
import { Skeleton } from "../ds"
import "../bible.css"

function Question({ item, onChanged }: { item: InboxQuestion; onChanged: (next: InboxQuestion) => void }) {
  const [answer, setAnswer] = useState(item.answer ?? "")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function change(status: "in_review" | "answered" | "closed"): Promise<void> {
    setBusy(true)
    setError(null)
    try {
      const next = await answerBibleQuestion(item.id, status, answer)
      onChanged(next)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Nu am putut salva răspunsul.")
    } finally {
      setBusy(false)
    }
  }

  return <article className="qinbox-card">
    <div className="qinbox-card__meta">
      <span>{item.status === "queued" ? "Nouă" : "În lucru"}</span>
      <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleString("ro-RO")}</time>
    </div>
    {item.sourceRef && <p className="today__kicker">Despre {item.sourceRef}</p>}
    <p className="qinbox-card__question">{item.question}</p>
    {item.status === "queued" && <button type="button" className="ghost" disabled={busy} onClick={() => void change("in_review")}><Check size={15} aria-hidden /> Preiau întrebarea</button>}
    <label className="qinbox-card__answer">
      <span>Răspuns pastoral</span>
      <textarea rows={6} maxLength={20000} value={answer} onChange={(event) => setAnswer(event.currentTarget.value)} placeholder="Răspunde limpede, biblic și cu grijă față de om." />
    </label>
    {error && <p className="error" role="alert">{error}</p>}
    <div className="qinbox-card__actions">
      <button type="button" className="ghost" disabled={busy} onClick={() => void change("closed")}>Închide fără răspuns</button>
      <button type="button" disabled={busy || !answer.trim()} onClick={() => void change("answered")}><Send size={15} aria-hidden /> Trimite răspunsul</button>
    </div>
  </article>
}

export function QuestionInbox() {
  const [questions, setQuestions] = useState<InboxQuestion[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    void (async () => {
      const role = await getBibleStaffRole()
      if (!role) throw new Error("Acest cont nu are acces la inboxul pastoral.")
      return loadBibleQuestionInbox()
    })().then((items) => {
      if (alive) setQuestions(items)
    }).catch((cause) => {
      if (alive) setError(cause instanceof Error ? cause.message : "Inboxul nu este disponibil.")
    })
    return () => { alive = false }
  }, [])

  function changed(next: InboxQuestion): void {
    setQuestions((current) => {
      const items = current ?? []
      if (next.status === "answered" || next.status === "closed") return items.filter((item) => item.id !== next.id)
      return items.map((item) => item.id === next.id ? next : item)
    })
  }

  return <section className="bible qinbox">
    <button type="button" className="ghost bible__back" onClick={() => navigate("/biblia-mea")}><ArrowLeft size={16} aria-hidden /> Biblia mea</button>
    <header className="bible__head"><Inbox size={22} aria-hidden /><h1>Inbox pastoral</h1></header>
    <p className="bible__intro">Întrebările sunt confidențiale. Nu se exportă, nu se folosesc pentru profilare și nu se răspunde în numele lui Dumnezeu acolo unde Scriptura nu spune.</p>
    {error && <div className="bible__empty"><p className="error" role="alert">{error}</p><button type="button" onClick={() => navigate("/biblia-mea")}>Înapoi</button></div>}
    {!error && questions === null && <div className="bloading"><Skeleton variant="text" width="45%" /><Skeleton height={180} width="100%" /></div>}
    {questions?.length === 0 && <div className="bmine-empty"><Inbox size={22} aria-hidden /><p>Nicio întrebare nu așteaptă acum.</p><button type="button" onClick={() => navigate("/biblia-mea")}>Înapoi la Biblia mea</button></div>}
    {questions && questions.length > 0 && <div className="qinbox-list">{questions.map((item) => <Question key={item.id} item={item} onChanged={changed} />)}</div>}
  </section>
}
