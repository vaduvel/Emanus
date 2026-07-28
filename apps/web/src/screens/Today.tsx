import { useMemo, useState } from "react"
import { ArrowRight, HandHeart, Sunrise } from "lucide-react"
import type { Lesson } from "@emanus/shared"
import { currentPath, daysAgo, oldestUnanswered, plan } from "../journey"
import { navigate } from "../router"

/*
 * "Azi" — singurul ecran principal. (docs/20 §8)
 *
 * Ce NU are voie să apară aici, niciodată:
 * serie de zile, XP, nivel, procent, "ziua 4 din 7", clasament.
 * Dacă aplicația măsoară ceva, devine obicei. (docs/20 §1)
 */

function memoryVerse(lesson: Lesson): { text: string; ref: string } | null {
  const s = lesson.steps.find((x) => x.type === "memory_verse" && x.scripture)
  return s?.scripture ?? null
}

export function Today() {
  const path = currentPath()
  const dayPlan = useMemo(() => plan(), [])
  const memorial = useMemo(() => oldestUnanswered(), [])
  const [yesterday, setYesterday] = useState<string | null>(null)

  if (!path || !dayPlan) return null

  if (dayPlan.kind === "path_complete") {
    navigate("/final")
    return null
  }

  const lastLesson = path.lessons[dayPlan.lessonIndex]
  const verse = lastLesson ? memoryVerse(lastLesson) : null
  const isFirstEver = dayPlan.kind === "lesson" && dayPlan.lessonIndex === 0

  return (
    <section className="today">
      <header className="today__head">
        <Sunrise size={22} strokeWidth={1.7} aria-hidden />
        <h1>Bine că ești aici</h1>
      </header>

      {/* "Cum a fost ieri?" — o singură atingere, nu chestionar. Nu se salvează. */}
      {!isFirstEver && dayPlan.kind === "lesson" && (
        <div className="tile today__yesterday">
          <p className="today__q">Pasul de data trecut — cum a fost?</p>
          {yesterday === null ? (
            <div className="today__chips">
              <button type="button" onClick={() => setYesterday("da")}>
                L-am făcut
              </button>
              <button type="button" onClick={() => setYesterday("nu")}>
                N-am reușit
              </button>
              <button type="button" onClick={() => setYesterday("uitat")}>
                Am uitat
              </button>
            </div>
          ) : (
            <p className="muted">
              {yesterday === "da"
                ? "Bine. Mergem mai departe."
                : "Nu s-a stricat nimic. Continuăm de unde am rămas."}
            </p>
          )}
        </div>
      )}

      {dayPlan.kind === "lesson" && dayPlan.lesson && (
        <div className="tile today__main">
          <p className="today__kicker">{path.title}</p>
          <h2>{dayPlan.lesson.title}</h2>
          <p className="muted">
            {dayPlan.lesson.estMinutes} minute. Un singur lucru azi.
          </p>
          <button
            type="button"
            className="today__cta"
            onClick={() => navigate(`/lesson/${dayPlan.lesson?.id ?? ""}`)}
          >
            Începe <ArrowRight size={18} aria-hidden />
          </button>
          {isFirstEver && <p className="muted today__promise">{path.promise}</p>}
        </div>
      )}

      {dayPlan.kind === "practice" && (
        <div className="tile today__main">
          <p className="today__kicker">Ziua dintre</p>
          <h2>Azi nu înveți nimic nou</h2>
          <p>{dayPlan.practiceText}</p>
          <p className="muted today__promise">
            Lecția următoare te așteaptă mâine. Nu se pierde.
          </p>
        </div>
      )}

      {dayPlan.kind === "done_today" && (
        <div className="tile today__main">
          <h2>Ai fost azi aici</h2>
          <p>{dayPlan.practiceText}</p>
          <p className="muted today__promise">Ne vedem mâine.</p>
        </div>
      )}

      {verse && (
        <blockquote className="scripture today__verse">
          {verse.text}
          <cite>{verse.ref}</cite>
        </blockquote>
      )}

      {/* Cârligul lung: aplicația ține minte ce a cerut. Întreabă o singură dată. */}
      {memorial && (
        <div className="tile today__memorial">
          <p className="today__kicker">
            <HandHeart size={15} aria-hidden /> Acum {daysAgo(memorial.createdAt)} de zile te rugai
            pentru:
          </p>
          <p className="today__prayer-text">„{memorial.text}”</p>
          <button type="button" className="ghost" onClick={() => navigate("/rugaciuni")}>
            Unde e acum?
          </button>
        </div>
      )}
    </section>
  )
}
