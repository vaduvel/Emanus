import { XP_PER_LESSON, XP_PER_LEVEL } from "@emanus/shared"
import type { GamState } from "@emanus/shared"

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
  gam,
  next,
  userName = "prieten",
  greeting,
  onContinue,
}: {
  gam: GamState
  next?: NextLesson | null
  userName?: string
  greeting?: string
  onContinue?: (lessonId: string) => void
}) {
  const hi = greeting ?? timeGreeting()
  const xpInto = gam.xp % XP_PER_LEVEL
  const pct = Math.round((xpInto / XP_PER_LEVEL) * 100)

  return (
    <div className="hero">
      <div className="hero-head">
        <div className="hero-head__avatar">🕊️</div>
        <div className="hero-head__hi">
          <b>
            {hi}, {userName}
          </b>
          <span>Bine ai revenit la parcursul tău</span>
        </div>
        <span className="streak-pill">🔥 {gam.streakDays}</span>
        <LevelRing level={gam.level} pct={pct} />
      </div>

      {next && (
        <button type="button" className="continue-card" onClick={() => onContinue?.(next.lessonId)}>
          <span className="continue-card__thumb">📖</span>
          <span className="continue-card__body">
            <span className="continue-card__kicker">Continuă lecția</span>
            <span className="continue-card__title">{next.title}</span>
            {typeof next.lessonsTotal === "number" && next.lessonsTotal > 0 && (
              <>
                <span className="continue-card__bar">
                  <span style={{ width: `${lessonPct(next)}%` }} />
                </span>
                <span className="continue-card__meta">
                  Lecția {(next.lessonsCompleted ?? 0) + 1} din {next.lessonsTotal}
                  <span className="xp-chip">+{XP_PER_LESSON} XP</span>
                </span>
              </>
            )}
          </span>
        </button>
      )}
    </div>
  )
}

function LevelRing({ level, pct }: { level: number; pct: number }) {
  const r = 18
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(100, pct))
  const off = c - (c * clamped) / 100
  return (
    <div className="level-ring" aria-label={`Nivel ${level}`}>
      <svg viewBox="0 0 44 44" width="44" height="44">
        <circle className="level-ring__track" cx="22" cy="22" r={r} />
        <circle
          className="level-ring__val"
          cx="22"
          cy="22"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <span className="level-ring__num">{level}</span>
    </div>
  )
}
