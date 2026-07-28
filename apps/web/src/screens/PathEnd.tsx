import { useEffect } from "react"
import { HandHeart } from "lucide-react"
import { currentPath, firstJournalEntry, load, markPathSeen, resetJourney } from "../journey"
import { navigate } from "../router"

/*
 * Finalul parcursului. (docs/20 §"ce se întâmplă la final")
 *
 * FăRĂ certificat, fără confetti, fără insignă, fără punctaj.
 * I se arată ce a scris EL în ziua întâi. Singura dovadă de schimbare care
 * contează vine de la el, nu de la noi.
 */
export function PathEnd() {
  const path = currentPath()
  const first = firstJournalEntry()
  const state = load()
  const last = state.journal[state.journal.length - 1]

  useEffect(() => {
    markPathSeen()
  }, [])

  if (!path) return null

  return (
    <section className="pathend">
      <h1>Ai mers până la capăt</h1>
      <p className="muted">„{path.title}” — șapte lecții. N-ai fugit.</p>

      {first ? (
        <div className="tile pathend__then">
          <p className="today__kicker">Asta ai scris în prima zi, pe {first.date}:</p>
          <blockquote className="pathend__quote">{first.text}</blockquote>
        </div>
      ) : (
        <div className="tile">
          <p className="muted">
            În prima zi n-ai scris nimic. E în regulă — uneori nu sunt cuvinte la început.
          </p>
        </div>
      )}

      {last && last.lessonId !== first?.lessonId && (
        <div className="tile pathend__now">
          <p className="today__kicker">Iar asta ai scris ieri:</p>
          <blockquote className="pathend__quote">{last.text}</blockquote>
        </div>
      )}

      <p className="pathend__line">Nu-ți spun eu ce s-a schimbat. Citește-le încă o dată.</p>

      <div className="pathend__actions">
        <button type="button" onClick={() => navigate("/rugaciuni")}>
          <HandHeart size={16} aria-hidden /> Scrie o rugăciune pentru ce urmează
        </button>
        <button
          type="button"
          className="ghost"
          onClick={() => {
            resetJourney()
            navigate("/intrare")
          }}
        >
          Alege alt drum
        </button>
      </div>
    </section>
  )
}
