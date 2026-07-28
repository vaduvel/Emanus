import { useEffect, useState } from "react"
import { BookOpen, HandHeart, HelpCircle, Landmark, Lightbulb, Users } from "lucide-react"
import type { DailyView } from "@emanus/shared"
import { getDaily } from "./api"
import { navigate } from "./router"

/*
 * Timp cu Dumnezeu (docs/19-decizii-ui.md).
 *
 * Două corecții făcute aici:
 *  1. Flacăra cu `rhythmDays` a fost scoasă — nicio cifră care măsoară un om.
 *     `graceMessage` rămâne: el spune ce trebuie spus, fără să numere.
 *  2. Butonul de rezervă trimitea toată lumea la `teens_m1_c1_l1` — lecția 1
 *     pentru adolescenți — indiferent de cine era omul. Era un bug, nu o
 *     decizie. Dacă nu există o lecție următoare, înseamnă că omul nu a ales
 *     încă de unde începe, deci mergem la "Ce te-a adus aici?".
 */

export function Daily() {
  const [data, setData] = useState<DailyView | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [prayerOpen, setPrayerOpen] = useState(false)

  useEffect(() => {
    getDaily()
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!data) return <p className="muted">Se încarcă…</p>

  const { ritual, nextLesson, graceMessage } = data

  return (
    <section className="daily">
      <header className="daily__head">
        <div>
          <h1>Timp cu Dumnezeu</h1>
          <p className="muted">{graceMessage}</p>
        </div>
      </header>

      <article className="daily__card">
        <span className="daily__kicker">
          <BookOpen size={16} strokeWidth={1.8} aria-hidden /> Cuvântul de azi
        </span>
        <blockquote className="daily__verse">“{ritual.verseText}”</blockquote>
        <cite className="daily__ref">{ritual.verseRef}</cite>
      </article>

      <article className="daily__card">
        <span className="daily__kicker">
          <Lightbulb size={16} strokeWidth={1.8} aria-hidden /> Pentru viața ta
        </span>
        <p>{ritual.forYourLife}</p>
        <p className="daily__q">
          <HelpCircle size={15} strokeWidth={1.8} aria-hidden /> {ritual.reflectionQuestion}
        </p>
      </article>

      <article className="daily__card">
        <span className="daily__kicker">
          <HandHeart size={16} strokeWidth={1.8} aria-hidden /> Roagă-te
        </span>
        {prayerOpen ? (
          <p className="daily__prayer">{ritual.prayer}</p>
        ) : (
          <button type="button" onClick={() => setPrayerOpen(true)}>
            Deschide rugăciunea
          </button>
        )}
        <button type="button" className="ghost title-icon" onClick={() => navigate("/prayer")}>
          <HandHeart size={16} strokeWidth={1.8} aria-hidden /> Învață să te rogi
        </button>
      </article>

      <div className="daily__nav">
        {nextLesson ? (
          <button type="button" onClick={() => navigate(`/lesson/${nextLesson.lessonId}`)}>
            Continuă: {nextLesson.title}
          </button>
        ) : (
          <button type="button" onClick={() => navigate("/onboarding")}>
            Alege de unde începi
          </button>
        )}
        <div className="daily__links">
          <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
            Parcursul meu
          </button>
          <button type="button" className="ghost title-icon" onClick={() => navigate("/family")}>
            <Users size={16} strokeWidth={1.8} aria-hidden /> Familie
          </button>
          <button type="button" className="ghost title-icon" onClick={() => navigate("/ebenezer")}>
            <Landmark size={16} strokeWidth={1.8} aria-hidden /> Ebenezer
          </button>
          <button type="button" className="ghost" onClick={() => navigate("/community")}>
            Comunitate
          </button>
        </div>
      </div>
    </section>
  )
}
