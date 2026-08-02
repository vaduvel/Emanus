import { useEffect, useState } from "react"
import { ArrowLeft, HelpCircle, Save } from "lucide-react"
import { navigate } from "../router"
import "../ask.css"

/*
 * Întreabă. În main nu există încă un inbox pastoral conectat. Până când acel
 * flux este activ, întrebările se păstrează numai pe dispozitivul utilizatorului.
 * Nu spunem că a primit-o sau că o citește un om dacă nu a fost trimisă nicăieri.
 */

const KEY = "emanus.ask.saved"

type SavedQuestion = { text: string; despre?: string; cand: string }

function citeste(): SavedQuestion[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as SavedQuestion[]) : []
  } catch {
    return []
  }
}

function scrie(lista: SavedQuestion[]): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lista))
  } catch {
    /* stocarea poate fi oprită; nu blocăm ecranul */
  }
}

const GRELE: string[] = [
  "De ce a îngăduit Dumnezeu să mi se întâmple asta?",
  "Mă rog și nu simt nimic. Înseamnă că nu mă aude?",
  "Se poate ierta și ce am făcut eu?",
  "Trebuie să aleg între știință și Geneza?",
  "De ce sunt în Vechiul Testament lucruri atât de aspre?",
  "Ce fac cu un om care nu mi-a cerut iertare niciodată?",
  "Dacă m-am rugat pentru cineva și a murit?",
]

export function Ask({ despre }: { despre?: string }) {
  const [text, setText] = useState("")
  const [salvate, setSalvate] = useState<SavedQuestion[]>([])
  const [tocmai, setTocmai] = useState(false)

  useEffect(() => {
    setSalvate(citeste())
  }, [])

  function salveaza(intrebare: string): void {
    const curat = intrebare.trim()
    if (curat.length === 0) return
    const noua: SavedQuestion = { text: curat, despre, cand: new Date().toISOString() }
    const lista = [noua, ...citeste()].slice(0, 50)
    scrie(lista)
    setSalvate(lista)
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
    <p className="ask__intro">Aici poți pune în cuvinte întrebările grele, cele pe care nu le spui cu glas tare. Îndoiala formulată cinstit nu este necredință.</p>
    <p className="muted">Trimiterea către echipa Emanus nu este încă activă. Deocamdată întrebarea se păstrează numai pe dispozitivul tău, ca să nu o pierzi.</p>

    {despre && <p className="ask__despre">Întrebi despre: <strong>{despre}</strong></p>}

    <label className="ask__field">
      <span className="today__kicker">Întrebarea ta</span>
      <textarea
        value={text}
        rows={4}
        placeholder="Scrie cum îți vine. Nu trebuie să sune frumos."
        onChange={(e) => setText(e.currentTarget.value)}
      />
    </label>
    <button type="button" className="tile ask__send" onClick={() => salveaza(text)} disabled={text.trim().length === 0}>
      <Save size={16} aria-hidden /> Păstrează întrebarea
    </button>

    {tocmai && <p className="ask__gata">Întrebarea a fost păstrată pe dispozitivul tău. Nu a fost trimisă încă unei persoane.</p>}

    <section className="ask__grele">
      <h2>Întrebări pe care le pun mulți</h2>
      <div className="ask__lista">
        {GRELE.map((g) => <button key={g} type="button" className="ask__grea" onClick={() => setText(g)}>{g}</button>)}
      </div>
    </section>

    {salvate.length > 0 && <section className="ask__mele">
      <h2>Întrebările păstrate</h2>
      {salvate.map((t) => <p key={t.cand} className="ask__mea">
        <span>{t.text}</span>
        {t.despre && <span className="muted"> · {t.despre}</span>}
      </p>)}
    </section>}
  </section>
}
