import { useEffect, useState } from "react"
import { ArrowLeft, HelpCircle, Send } from "lucide-react"
import { navigate } from "../router"
import "../ask.css"

/*
 * Intreaba. Locul intrebarilor grele, cele pe care omul nu le pune cu glas tare
 * in biserica. Astazi ecranul nu da raspuns pe loc: primeste intrebarea, o
 * tine langa el si spune limpede ca o va citi un om. Nu ne prefacem ca avem un
 * raspuns automat cand nu il avem.
 */

const KEY = "emanus.ask.trimise"

type Trimisa = { text: string; despre?: string; cand: string }

function citeste(): Trimisa[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as Trimisa[]) : []
  } catch {
    return []
  }
}

function scrie(lista: Trimisa[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lista))
  } catch {
    /* stocarea poate fi oprita; nu e o problema */
  }
}

const GRELE: string[] = [
  "De ce a ingaduit Dumnezeu sa mi se intample asta?",
  "Ma rog si nu simt nimic. Inseamna ca nu ma aude?",
  "Se poate ierta si ce am facut eu?",
  "Trebuie sa aleg intre stiinta si Geneza?",
  "De ce sunt in Vechiul Testament lucruri atat de aspre?",
  "Ce fac cu un om care nu mi-a cerut iertare niciodata?",
  "Daca m-am rugat pentru cineva si a murit?",
]

export function Ask({ despre }: { despre?: string }) {
  const [text, setText] = useState("")
  const [trimise, setTrimise] = useState<Trimisa[]>([])
  const [tocmai, setTocmai] = useState(false)

  useEffect(() => {
    setTrimise(citeste())
  }, [])

  function trimite(intrebare: string): void {
    const curat = intrebare.trim()
    if (curat.length === 0) return
    const noua: Trimisa = { text: curat, despre, cand: new Date().toISOString() }
    const lista = [noua, ...citeste()].slice(0, 50)
    scrie(lista)
    setTrimise(lista)
    setText("")
    setTocmai(true)
  }

  return <section className="ask">
    <button type="button" className="ghost ask__back" onClick={() => navigate(despre ? "/biblia" : "/")}>
      <ArrowLeft size={16} aria-hidden /> {despre ? "Biblia" : "Azi"}
    </button>

    <header className="ask__head">
      <HelpCircle size={22} strokeWidth={1.7} aria-hidden />
      <h1>Întreabă</h1>
    </header>
    <p className="ask__intro">Aici se pun întrebările grele, cele pe care nu le pui cu glas tare. Nimeni nu te judecă pentru ele. Îndoiala pusă în cuvinte nu este necredinţă; este începutul unui răspuns.</p>

    {despre && <p className="ask__despre">Întrebi despre: <strong>{despre}</strong></p>}

    <label className="ask__field">
      <span className="today__kicker">Întrebarea ta</span>
      <textarea
        value={text}
        rows={4}
        placeholder="Scrie cum îţi vine. Nu trebuie să sune frumos."
        onChange={(e) => setText(e.currentTarget.value)}
      />
    </label>
    <button type="button" className="tile ask__send" onClick={() => trimite(text)} disabled={text.trim().length === 0}>
      <Send size={16} aria-hidden /> Trimite întrebarea
    </button>

    {tocmai && <p className="ask__gata">Am primit-o. Nu-ţi răspunde o maşină pe loc: o citeşte un om. Până atunci, întrebarea rămâne aici, la tine.</p>}

    <section className="ask__grele">
      <h2>Întrebări pe care le pun mulţi</h2>
      <div className="ask__lista">
        {GRELE.map((g) => <button key={g} type="button" className="ask__grea" onClick={() => setText(g)}>{g}</button>)}
      </div>
    </section>

    {trimise.length > 0 && <section className="ask__mele">
      <h2>Ce ai întrebat</h2>
      {trimise.map((t) => <p key={t.cand} className="ask__mea">
        <span>{t.text}</span>
        {t.despre && <span className="muted"> · {t.despre}</span>}
      </p>)}
    </section>}
  </section>
}
