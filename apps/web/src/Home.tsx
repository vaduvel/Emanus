import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { LifeBuoy } from "lucide-react"
import type { DailyView, DashboardView, GrowthAxisId } from "@emanus/shared"
import { getDaily, getDashboard } from "./api"
import { navigate } from "./router"
import { CheckIn, GrowthRadar, Hero, JourneyPath } from "./components"
import type { NextLesson } from "./components"
import { Avatar } from "./ds"

const AXIS_LABEL: Record<GrowthAxisId, string> = {
  identity: "Identitate",
  emotional_peace: "Pace",
  relationships: "Relații",
  living_faith: "Credință",
  character: "Caracter",
  freedom: "Libertate",
}

const moreBtnStyle = { marginTop: 10 }
const verseStyle = { cursor: "pointer" } as const
const sosStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  background: "var(--danger-soft)",
  color: "var(--bad)",
  border: "1px solid var(--bad)",
  borderRadius: "var(--radius-pill)",
  padding: "8px 14px",
  fontSize: "0.85rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
}

export function Home() {
  const [dash, setDash] = useState<DashboardView | null>(null)
  const [daily, setDaily] = useState<DailyView | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboard()
      .then(setDash)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
    getDaily()
      .then(setDaily)
      .catch(() => {
        /* versetul e opțional pentru Acasă */
      })
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!dash) return <p className="muted">Se încarcă…</p>

  const { gam, growth, modules, next } = dash
  const currentModule = modules.find((m) => !m.locked && m.lessonsCompleted < m.lessonsTotal)
  const nextLesson: NextLesson | null = next
    ? {
        lessonId: next.lessonId,
        title: next.title,
        lessonsCompleted: currentModule?.lessonsCompleted,
        lessonsTotal: currentModule?.lessonsTotal,
      }
    : null

  const byScore = [...growth].sort((a, b) => a.current - b.current)
  const weakest = byScore[0]
  const strongest = byScore[byScore.length - 1]

  return (
    <section className="home">
      <Hero gam={gam} next={nextLesson} onContinue={(id) => navigate(`/lesson/${id}`)} />

      <button type="button" style={sosStyle} onClick={() => navigate("/crisis")}>
        <LifeBuoy size={16} aria-hidden />
        Ai nevoie de ajutor acum?
      </button>

      <CheckIn />

      <section className="tile">
        <h2 className="tile__title">
          Creșterea ta
          <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
            Detalii
          </button>
        </h2>
        <div className="growth-mini">
          <GrowthRadar scores={growth} size={150} showLabels={false} />
          <div className="growth-mini__side">
            {strongest && weakest ? (
              <p className="growth-mini__cap">
                Cel mai mult crești la <b>{AXIS_LABEL[strongest.axis]}</b>. Zona ta de sprijin acum:{" "}
                <b>{AXIS_LABEL[weakest.axis]}</b>.
              </p>
            ) : (
              <p className="growth-mini__cap">Începe o lecție ca să-ți vezi radarul de creștere.</p>
            )}
          </div>
        </div>
      </section>

      <section className="tile">
        <h2 className="tile__title">
          Parcursul tău
          <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
            Tot parcursul
          </button>
        </h2>
        <JourneyPath
          modules={modules}
          nextLessonId={next?.lessonId ?? null}
          onSelect={(id) => navigate(`/lesson/${id}`)}
        />
      </section>

      <section className="tile">
        <h2 className="tile__title">Din comunitate</h2>
        <div className="social-strip">
          <div className="social-strip__avatars">
            <Avatar name="Andrei M" size="sm" />
            <Avatar name="Maria I" size="sm" />
            <Avatar name="David P" size="sm" />
            <Avatar name="Ioana R" size="sm" />
          </div>
          <span className="social-strip__text">Alți frați cresc alături de tine chiar acum.</span>
        </div>
        <button type="button" className="ghost" style={moreBtnStyle} onClick={() => navigate("/community")}>
          Vezi comunitatea →
        </button>
      </section>

      {daily && (
        <div
          className="verse-strip"
          role="button"
          tabIndex={0}
          style={verseStyle}
          onClick={() => navigate("/daily")}
        >
          <span className="verse-strip__q">„{daily.ritual.verseText}”</span>
          <span className="verse-strip__ref">{daily.ritual.verseRef} · Timp cu Dumnezeu →</span>
        </div>
      )}
    </section>
  )
}
