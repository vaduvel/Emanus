import type { GamState } from "@emanus/shared"
import type { CSSProperties } from "react"
import { BookOpen, Feather } from "lucide-react"

/*
 * Hero — "un singur lucru azi".
 *
 * docs/19-decizii-ui.md: nicio cifra care masoara un om. Flacara de streak,
 * inelul de nivel si chip-ul de XP au fost eliminate. O relatie nu se numara.
 * Propul `gam` ramane in semnatura pentru compatibilitate cu apelantii
 * existenti, dar nu se mai randeaza nimic din el.
 */

export interface NextLesson {
  lessonId: string
  title: string
  lessonsCompleted?: number
  lessonsTotal?: number
}

function timeGreeting(d = new Date()): string {
  const h = d.getHours()
  if (h < 12) return "Bună dimineața"
  if (h < 18) return "Bună ziua"
  return "Bună seara"
}

function lessonPct(n: NextLesson): number {
  const total = n.lessonsTotal ?? 0
  if (total <= 0) return 0
  return Math.round(((n.lessonsCompleted ?? 0) / total) * 100)
}

export function Hero({
  next,
  userName = "prieten",
  greeting,
  onContinue,
}: {
  /** Păstrat pentru compatibilitate. Nu se afișează — vezi docs/19. */
  gam?: GamState
  next?: NextLesson | null
  userName?: string
  greeting?: string
  onContinue?: (lessonId: string) => void
}) {
  const hi = greeting ?? timeGreeting()
  const barStyle: CSSProperties | undefined = next ? { width: `${lessonPct(next)}%` } : undefined

  return (
    <div className="hero">
      <div className="hero-head">
        <div className="hero-head__avatar">
          <Feather size={22} strokeWidth={1.8} aria-hidden />
        </div>
        <div className="hero-head__hi">
          <b>
            {hi}, {userName}
          </b>
          <span>Bine că ești aici</span>
        </div>
      </div>

      {next && (
        <button type="button" className="continue-card" onClick={() => onContinue?.(next.lessonId)}>
          <span className="continue-card__thumb">
            <BookOpen size={22} strokeWidth={1.8} aria-hidden />
          </span>
          <span className="continue-card__body">
            <span className="continue-card__kicker">Continuă</span>
            <span className="continue-card__title">{next.title}</span>
            {typeof next.lessonsTotal === "number" && next.lessonsTotal > 0 && (
              <>
                <span className="continue-card__bar">
                  <span style={barStyle} />
                </span>
                <span className="continue-card__meta">
                  Lecția {(next.lessonsCompleted ?? 0) + 1} din {next.lessonsTotal}
                </span>
              </>
            )}
          </span>
        </button>
      )}
    </div>
  )
}
