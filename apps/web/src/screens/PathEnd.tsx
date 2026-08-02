import { useMemo } from "react"
import { ArrowRight, HandHeart, Mountain } from "lucide-react"
import { otherPaths } from "@emanus/shared"
import {
  currentPath,
  firstJournalEntry,
  lastJournalEntry,
  load,
  markPathSeen,
  switchPath,
} from "../journey"
import { navigate } from "../router"

export function PathEnd() {
  const path = currentPath()
  const state = load()
  const first = useMemo(() => firstJournalEntry(state.pathId), [state.pathId])
  const last = useMemo(() => lastJournalEntry(state.pathId), [state.pathId])
  const next = useMemo(() => otherPaths(state.pathId), [state.pathId])

  function go(pathId: string) {
    switchPath(pathId)
    navigate("/")
  }

  return (
    <section className="pathend">
      <Mountain size={26} strokeWidth={1.6} aria-hidden />
      <h1>Ai mers până la capăt</h1>
      <p className="muted">{path?.title}</p>

      {first && last && first.text !== last.text && (
        <>
          <p className="pathend__line">Nu-ți spun eu ce s-a schimbat. Citește-le încă o dată.</p>
          <p className="today__kicker">În prima zi a acestui drum ai scris:</p>
          <blockquote className="pathend__quote">{first.text}</blockquote>
          <p className="today__kicker" style={{ marginTop: 16 }}>Ultima dată pe acest drum ai scris:</p>
          <blockquote className="pathend__quote">{last.text}</blockquote>
        </>
      )}

      <p className="pathend__line">Drumul ăsta s-a terminat. Relația, nu. Mâine e tot o zi în care poți vorbi cu El.</p>

      {next.length > 0 && (
        <>
          <p className="today__kicker">De aici poți merge mai departe</p>
          <ul className="doors__list">
            {next.map((p) => (
              <li key={p.id}>
                <button type="button" className="door" onClick={() => go(p.id)}>
                  <span><strong>{p.title}</strong><br /><small className="muted">{p.promise}</small></span>
                  <ArrowRight size={18} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="pathend__actions">
        <button type="button" onClick={() => { markPathSeen(); navigate("/rugaciuni") }}>
          <HandHeart size={18} aria-hidden /> Scrie o rugăciune pentru ce urmează
        </button>
        <button type="button" className="ghost" onClick={() => { markPathSeen(); navigate("/intrare") }}>
          Vreau altă ușă
        </button>
      </div>

      <p className="muted" style={{ marginTop: 18, fontSize: "0.85rem" }}>
        Ce ai scris rămâne al tău, oricare drum alegi.
      </p>
    </section>
  )
}
