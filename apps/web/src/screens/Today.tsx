import { useEffect, useMemo, useState } from "react"
import { ArrowRight, BookOpen, HandHeart, Sunrise } from "lucide-react"
import type { Lesson } from "@emanus/shared"
import { currentPath, daysAgo, doctrineAvailable, oldestUnanswered, plan } from "../journey"
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
  const doctrine = useMemo(() => doctrineAvailable(), [])
  const [yesterday, setYesterday] = useState<string | null>(null)

  const complete = dayPlan?.kind === "path_complete"
  useEffect(() => {
    if (complete) navigate("/final")
  }, [complete])

  if (!path || !dayPlan || complete) return null

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
          <p className="today__q">Pasul de data trecută — cum a fost?</p>
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

      {/*
        Doctrina generală — se deschide abia după lecția 5 din parcurs. (docs/20 §6)
        Nu înlocuiește ziua de azi, stă alături și e opțională.
      */}
      {doctrine && (
        <div className="tile today__extra">
          <p className="today__kicker">
            <BookOpen size={15} aria-hidden /> Dacă vrei și limpezime, nu doar vindecare
          </p>
          <h3>{doctrine.title}</h3>
          <p className="muted">{doctrine.estMinutes} minute. Când ai chef, nu azi obligatoriu.</p>
          <button
            type="button"
            className="ghost"
            onClick={() => navigate(`/lesson/${doctrine.id}`)}
          >
            Deschide
          </button>
        </div>
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
