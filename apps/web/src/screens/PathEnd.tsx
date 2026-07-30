import { useMemo } from "react"
import { ArrowRight, HandHeart, Mountain } from "lucide-react"
import { otherContentPaths } from "../content"
import { currentPath, firstJournalEntry, load, markPathSeen, switchPath } from "../journey"
import { navigate } from "../router"

/*
 * Finalul unui parcurs. (docs/20 §9)
 *
 * Aici NU se dă certificat, insignă, procent sau felicitare de aplicație.
 * Singura dovadă că s-a schimbat ceva sunt propriile lui cuvinte, din prima zi
 * și din ultima. Nu-i spunem noi ce s-a schimbat — citește și vede singur.
 *
 * Și, imediat după: ce urmează. Un om care termină un drum și rămâne cu un ecran
 * gol închide aplicația și nu mai revine.
 */
export function PathEnd() {
  const path = currentPath()
  const state = load()
  const first = useMemo(() => firstJournalEntry(), [])
  const last = useMemo(() => {
    const j = load().journal
    return j[j.length - 1]
  }, [])
  const next = useMemo(() => otherContentPaths(state.pathId), [state.pathId])

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
          <p className="pathend__line">
            Nu-ți spun eu ce s-a schimbat. Citește-le încă o dată.
          </p>
          <p className="today__kicker">În prima zi ai scris:</p>
          <blockquote className="pathend__quote">{first.text}</blockquote>
          <p className="today__kicker" style={{ marginTop: 16 }}>
            Ultima dată ai scris:
          </p>
          <blockquote className="pathend__quote">{last.text}</blockquote>
        </>
      )}

      <p className="pathend__line">
        Drumul ăsta s-a terminat. Relația, nu. Mâine e tot o zi în care poți vorbi cu El.
      </p>

      {/* Ce urmează — concret, cu nume, nu „explorează”. */}
      {next.length > 0 && (
        <>
          <p className="today__kicker">De aici poți merge mai departe</p>
          <ul className="doors__list">
            {next.map((p) => (
              <li key={p.id}>
                <button type="button" className="door" onClick={() => go(p.id)}>
                  <span>
                    <strong>{p.title}</strong>
                    <br />
                    <small className="muted">{p.promise}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="pathend__actions">
        <button
          type="button"
          onClick={() => {
            markPathSeen()
            navigate("/rugaciuni")
          }}
        >
          <HandHeart size={18} aria-hidden /> Scrie o rugăciune pentru ce urmează
        </button>
        <button
          type="button"
          className="ghost"
          onClick={() => {
            markPathSeen()
            navigate("/intrare")
          }}
        >
          Vreau altă ușă
        </button>
      </div>

      <p className="muted" style={{ marginTop: 18, fontSize: "0.85rem" }}>
        Ce ai scris rămâne al tău, oricare drum alegi.
      </p>
    </section>
  )
}
