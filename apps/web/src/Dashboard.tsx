import { useEffect, useState } from "react"
import { GROWTH_AXES } from "@emanus/shared"
import type { DashboardView, GrowthAxisId, GrowthScore } from "@emanus/shared"
import { getDashboard } from "./api"

const AXIS_LABEL: Record<GrowthAxisId, string> = {
  identity: "Identitate",
  emotional_peace: "Pace",
  relationships: "Relații",
  living_faith: "Credință",
  character: "Caracter",
  freedom: "Libertate",
}

export function Dashboard({ onBack }: { onBack: () => void }) {
  const [data, setData] = useState<DashboardView | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
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
        <Stat label="Streak" value={`${gam.streakDays}🔥`} />
        <Stat label="Insigne" value={gam.badgeIds.length} />
      </div>

      <div className="radar-wrap">
        <h2 className="section-title">Creșterea mea</h2>
        <RadarChart scores={growth} />
        <p className="muted legend">
          <span className="dot dot--base" /> Înainte · <span className="dot dot--now" /> Acum
        </p>
      </div>

      <div className="modules">
        <h2 className="section-title">Modulele mele</h2>
        {modules.map((m) => (
          <div key={m.id} className={`mod${m.locked ? " locked" : ""}`}>
            <div className="mod__top">
              <span>
                {m.locked ? "🔒 " : ""}
                {m.title}
              </span>
              <span className="muted">
                {m.lessonsCompleted}/{m.lessonsTotal}
              </span>
            </div>
            <div className="mod__bar">
              <span style={{ width: `${m.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      {gam.certificateIds.length > 0 && (
        <p className="muted">🏅 Certificate: {gam.certificateIds.join(", ")}</p>
      )}

      {next && (
        <button type="button" onClick={onBack}>
          Continuă: {next.title}
        </button>
      )}
    </section>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
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
