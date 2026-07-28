import { useState } from "react"
import { Check, HandHeart, Plus, Trash2 } from "lucide-react"
import type { Prayer } from "../journey"
import { addPrayer, daysAgo, listPrayers, markAnswered, removePrayer } from "../journey"

/*
 * "Rugăciunile mele" — memorialul. (docs/20; cârligul de retentie pe termen lung)
 *
 * Omul nu se întoarce pentru că-l aduce aplicația. Se întoarce pentru că are
 * dovadă că Dumnezeu i-a răspuns. Noi doar ținem minte în locul lui.
 * Nu numărăm nimic și nu arătăm procente de "rugăciuni împlinite".
 */
export function Prayers() {
  const [items, setItems] = useState<Prayer[]>(() => listPrayers())
  const [draft, setDraft] = useState("")
  const [answering, setAnswering] = useState<string | null>(null)
  const [note, setNote] = useState("")

  const open = items.filter((p) => p.answeredAt === null)
  const answered = items.filter((p) => p.answeredAt !== null)

  function add() {
    if (!draft.trim()) return
    setItems(addPrayer(draft))
    setDraft("")
  }

  function confirmAnswer(id: string) {
    setItems(markAnswered(id, note))
    setAnswering(null)
    setNote("")
  }

  return (
    <section className="prayers">
      <header className="today__head">
        <HandHeart size={22} strokeWidth={1.7} aria-hidden />
        <h1>Rugăciunile mele</h1>
      </header>
      <p className="muted">
        Scrie ce ceri. Nu uităm noi în locul tău. Când vine răspunsul, îl însemnezi aici.
      </p>

      <div className="tile">
        <textarea
          className="journal"
          rows={3}
          placeholder="Pentru ce te rogi?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="button" onClick={add} disabled={!draft.trim()}>
          <Plus size={16} aria-hidden /> Adaugă
        </button>
      </div>

      {open.length > 0 && (
        <>
          <h2 className="prayers__section">Ce aștept</h2>
          <ul className="prayers__list">
            {open.map((p) => (
              <li key={p.id} className="tile prayer">
                <p className="prayer__text">{p.text}</p>
                <p className="muted prayer__meta">
                  {daysAgo(p.createdAt) === 0
                    ? "de azi"
                    : `de ${daysAgo(p.createdAt)} ${daysAgo(p.createdAt) === 1 ? "zi" : "de zile"}`}
                </p>
                {answering === p.id ? (
                  <div className="prayer__answer">
                    <textarea
                      className="journal"
                      rows={2}
                      placeholder="Cum a răspuns? (opțional)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <button type="button" onClick={() => confirmAnswer(p.id)}>
                      Salvează
                    </button>
                    <button type="button" className="ghost" onClick={() => setAnswering(null)}>
                      Renunță
                    </button>
                  </div>
                ) : (
                  <div className="prayer__actions">
                    <button type="button" onClick={() => setAnswering(p.id)}>
                      <Check size={15} aria-hidden /> A răspuns
                    </button>
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => setItems(removePrayer(p.id))}
                      aria-label="Șterge"
                    >
                      <Trash2 size={15} aria-hidden />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {answered.length > 0 && (
        <>
          <h2 className="prayers__section">Ce a făcut El</h2>
          <p className="muted">
            În Biblie, oamenii puneau o piatră acolo unde Dumnezeu îi ajutase, ca să nu uite.
            Îî spuneau Eben-Ezer: „Până aici Domnul ne-a ajutat.”
          </p>
          <ul className="prayers__list">
            {answered.map((p) => (
              <li key={p.id} className="tile prayer prayer--answered">
                <p className="prayer__text">{p.text}</p>
                {p.answerNote && <p className="prayer__note">{p.answerNote}</p>}
                <p className="muted prayer__meta">
                  cerută {p.createdAt} · răspuns {p.answeredAt}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      {items.length === 0 && (
        <p className="muted">
          Încă nimic aici. Prima pe care o scrii o să ți-o aduc aminte peste câteva săptămâni.
        </p>
      )}
    </section>
  )
}
