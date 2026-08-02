import { useState } from "react"
import { ArrowLeft, CheckCircle2, HelpCircle, Send } from "lucide-react"
import { queueBibleQuestion, syncBiblePersonal, type BibleSourceSnapshot } from "../biblePersonal"
import { navigate } from "../router"
import { useBiblePersonal } from "../useBiblePersonal"
import "../ask.css"

const HARD_QUESTIONS = [
  "De ce a îngăduit Dumnezeu să mi se întâmple asta?",
  "Mă rog și nu simt nimic. Înseamnă că nu mă aude?",
  "Se poate ierta și ce am făcut eu?",
  "Trebuie să aleg între știință și Geneza?",
  "De ce sunt în Vechiul Testament lucruri atât de aspre?",
  "Ce fac cu un om care nu mi-a cerut iertare niciodată?",
  "Dacă m-am rugat pentru cineva și a murit?",
]

export function Ask({ source = {} }: { source?: BibleSourceSnapshot }) {
  const { state } = useBiblePersonal()
  const [text, setText] = useState("")
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<"delivered" | "local" | null>(null)

  async function submit(question: string): Promise<void> {
    const clean = question.trim()
    if (!clean || busy) return
    const entry = queueBibleQuestion(clean, source)
    if (!entry) return
    setText("")
    setBusy(true)
    const delivered = await syncBiblePersonal()
    setBusy(false)
    setNotice(delivered ? "delivered" : "local")
  }

  const questions = [...state.questions].sort((left, right) => right.createdAt.localeCompare(left.createdAt)).slice(0, 5)

  return <section className="ask">
    <button type="button" className="ghost ask__back" onClick={() => navigate(source.bookId && source.chapter ? `/biblia/${source.bookId}/${source.chapter}` : "/")}>
      <ArrowLeft size={16} aria-hidden /> {source.ref ? "Înapoi la pasaj" : "Azi"}
    </button>
    <header className="ask__head"><HelpCircle size={22} strokeWidth={1.7} aria-hidden /><h1>Întreabă</h1></header>
    <p className="ask__intro">Aici poți pune întrebările pe care nu le spui cu glas tare. Nu primești un răspuns automat: întrebarea ajunge la un om autorizat să o citească și să răspundă pastoral.</p>
    {source.ref && <p className="ask__despre">Întrebi despre: <strong>{source.ref}</strong></p>}

    <label className="ask__field">
      <span className="today__kicker">Întrebarea ta</span>
      <textarea
        value={text}
        rows={5}
        maxLength={10000}
        placeholder="Scrie cum îți vine. Nu trebuie să sune frumos."
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <small>Prin trimitere, întrebarea și referința biblică devin vizibile personalului pastoral autorizat.</small>
    </label>
    <button type="button" className="tile ask__send" onClick={() => void submit(text)} disabled={busy || text.trim().length === 0}>
      <Send size={16} aria-hidden /> {busy ? "Se trimite…" : "Trimite întrebarea"}
    </button>

    {notice === "delivered" && <p className="ask__gata" role="status"><CheckCircle2 size={17} aria-hidden /> Întrebarea a ajuns în inboxul pastoral. Răspunsul va apărea în „Biblia mea”.</p>}
    {notice === "local" && <p className="ask__gata ask__gata--local" role="status">Întrebarea este păstrată pe dispozitiv. Va fi trimisă automat când conexiunea și serviciul cloud sunt disponibile.</p>}

    <section className="ask__grele">
      <h2>Întrebări pe care le pun mulți</h2>
      <div className="ask__lista">{HARD_QUESTIONS.map((question) => <button key={question} type="button" className="ask__grea" onClick={() => setText(question)}>{question}</button>)}</div>
    </section>

    {questions.length > 0 && <section className="ask__mele">
      <div className="ask__mele-head"><h2>Ce ai întrebat</h2><button type="button" className="ghost" onClick={() => navigate("/biblia-mea")}>Vezi toate</button></div>
      {questions.map((question) => <article key={question.id} className="ask__mea">
        <p>{question.question}</p>
        <span className="muted">{question.answer ? "Răspuns primit" : question.status === "in_review" ? "Este citită" : "Trimisă"}</span>
      </article>)}
    </section>}
  </section>
}
