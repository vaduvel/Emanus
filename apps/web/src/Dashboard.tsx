import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { Award, CalendarClock, Flame, GraduationCap, Lock } from "lucide-react"
import { GROWTH_AXES } from "@emanus/shared"
import type { DashboardView, GrowthAxisId, GrowthScore, MentorStatus } from "@emanus/shared"
import { getDashboard, getMentor } from "./api"
import { navigate } from "./router"

const AXIS_LABEL: Record<GrowthAxisId, string> = {
  identity: "Identitate",
  emotional_peace: "Pace",
  relationships: "Relații",
  living_faith: "Credință",
  character: "Caracter",
  freedom: "Libertate",
}

const mentorCardStyle: CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-sm)",
  padding: 16,
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}
const mentorHeadStyle: CSSProperties = { display: "flex", alignItems: "center", gap: 8 }
const mentorTitleStyle: CSSProperties = { fontWeight: 700, fontSize: "1rem", margin: 0 }
const mentorIconStyle: CSSProperties = { color: "var(--accent)" }
const mentorIconGoldStyle: CSSProperties = { color: "var(--gold)" }
const barTrackStyle: CSSProperties = {
  height: 8,
  background: "var(--border)",
  borderRadius: 999,
  overflow: "hidden",
}
const mentorBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  alignSelf: "flex-start",
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  border: "1px solid var(--accent)",
  borderRadius: "var(--radius-pill)",
  padding: "7px 14px",
  fontSize: "0.85rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
}

export function Dashboard({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<DashboardView | null>(null)
  const [mentor, setMentor] = useState<MentorStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
    getMentor()
      .then(setMentor)
      .catch(() => {
        /* statutul de mentor e opțional */
      })
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!data) return <p className="muted">Se încarcă…</p>

  const { gam, growth, modules, next } = data

  return (
    <section className="dashboard">
      <header className="dashboard__head">
        <h1>Parcursul meu</h1>
        <button type="button" className="ghost" onClick={onBack}>
          ← Înapoi
        </button>
      </header>

      <div className="stats">
        <Stat label="XP" value={gam.xp} />
        <Stat label="Nivel" value={gam.level} />
        <Stat
          label="Streak"
          value={
            <span className="stat-streak">
              <Flame size={16} strokeWidth={2} aria-hidden /> {gam.streakDays}
            </span>
          }
        />
        <Stat label="Insigne" value={gam.badgeIds.length} />
      </div>

      <div className="radar-wrap">
        <h2 className="section-title">Creșterea mea</h2>
        <RadarChart scores={growth} />
        <p className="muted legend">
          <span className="dot dot--base" /> Înainte · <span className="dot dot--now" /> Acum
        </p>
      </div>

      {mentor &&
        (() => {
          const barFillStyle: CSSProperties = {
            width: `${mentor.progressPercent}%`,
            height: "100%",
            display: "block",
            background: "var(--accent)",
          }
          return (
            <section style={mentorCardStyle}>
              <div style={mentorHeadStyle}>
                <GraduationCap
                  size={20}
                  aria-hidden
                  style={mentor.isMentor ? mentorIconGoldStyle : mentorIconStyle}
                />
                <h2 style={mentorTitleStyle}>{mentor.isMentor ? "Ești Mentor" : "Devino Mentor"}</h2>
              </div>
              {mentor.isMentor ? (
                <>
                  <p className="muted">
                    Ai crescut destul cât să însoțești alți frați. Fii prezent, ascultă și roagă-te
                    alături de ei.
                  </p>
                  <button
                    type="button"
                    style={mentorBtnStyle}
                    onClick={() => navigate("/mentorat")}
                  >
                    <CalendarClock size={15} aria-hidden />
                    Deschide mentoratul
                  </button>
                </>
              ) : (
                <>
                  <p className="muted">
                    Continuă să crești ca să poți însoți alți frați pe drumul lor.
                  </p>
                  <div style={barTrackStyle}>
                    <span style={barFillStyle} />
                  </div>
                  <p className="muted">
                    {mentor.levelsRemaining > 0 &&
                      `Încă ${mentor.levelsRemaining} ${
                        mentor.levelsRemaining === 1 ? "nivel" : "niveluri"
                      }`}
                    {mentor.levelsRemaining > 0 && mentor.certificatesRemaining > 0 && " · "}
                    {mentor.certificatesRemaining > 0 &&
                      `${mentor.certificatesRemaining} ${
                        mentor.certificatesRemaining === 1 ? "modul absolvit" : "module absolvite"
                      }`}
                    {mentor.levelsRemaining === 0 &&
                      mentor.certificatesRemaining === 0 &&
                      "Ești aproape acolo!"}
                  </p>
                  <button
                    type="button"
                    style={mentorBtnStyle}
                    onClick={() => navigate("/mentorat")}
                  >
                    <CalendarClock size={15} aria-hidden />
                    Ai nevoie de un mentor? Programează
                  </button>
                </>
              )}
            </section>
          )
        })()}

      <div className="modules">
        <h2 className="section-title">Modulele mele</h2>
        {modules.map((m) => {
          const modBarStyle: CSSProperties = { width: `${m.percent}%` }
          return (
            <div key={m.id} className={`mod${m.locked ? " locked" : ""}`}>
              <div className="mod__top">
                <span className="mod__title">
                  {m.locked ? <Lock size={14} strokeWidth={1.9} aria-hidden /> : null} {m.title}
                </span>
                <span className="muted">
                  {m.lessonsCompleted}/{m.lessonsTotal}
                </span>
              </div>
              <div className="mod__bar">
                <span style={modBarStyle} />
              </div>
            </div>
          )
        })}
      </div>

      {gam.certificateIds.length > 0 && (
        <p className="muted">
          <Award size={16} strokeWidth={1.9} aria-hidden /> Certificate: {gam.certificateIds.join(", ")}
        </p>
      )}

      <div className="dash-nav">
        {next && (
          <button type="button" onClick={() => navigate(`/lesson/${next.lessonId}`)}>
            Continuă: {next.title}
          </button>
        )}
        <button type="button" className="ghost" onClick={() => navigate("/community")}>
          Comunitate
        </button>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="stat">
      <b>{value}</b>
      <span className="muted">{label}</span>
    </div>
  )
}

function RadarChart({ scores }: { scores: GrowthScore[] }) {
  const ordered = GROWTH_AXES.map((ax) => scores.find((s) => s.axis === ax)).filter(
    (s): s is GrowthScore => Boolean(s),
  )
  const n = ordered.length || 1
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const r = 88
  const ang = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2
  const at = (i: number, val: number): [number, number] => {
    const rr = (r * Math.max(0, Math.min(100, val))) / 100
    return [cx + rr * Math.cos(ang(i)), cy + rr * Math.sin(ang(i))]
  }
  const poly = (key: "baseline" | "current") =>
    ordered.map((s, i) => at(i, s[key]).join(",")).join(" ")
  const rings = [25, 50, 75, 100]

  return (
    <svg className="radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar de creștere">
      {rings.map((rg) => (
        <polygon
          key={rg}
          className="radar__ring"
          points={ordered.map((_, i) => at(i, rg).join(",")).join(" ")}
        />
      ))}
      {ordered.map((_, i) => {
        const [x, y] = at(i, 100)
        return <line key={i} className="radar__spoke" x1={cx} y1={cy} x2={x} y2={y} />
      })}
      <polygon className="radar__baseline" points={poly("baseline")} />
      <polygon className="radar__current" points={poly("current")} />
      {ordered.map((s, i) => {
        const [x, y] = at(i, 122)
        return (
          <text
            key={s.axis}
            className="radar__label"
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {AXIS_LABEL[s.axis]}
          </text>
        )
      })}
    </svg>
  )
}
