import { GROWTH_AXES } from "@emanus/shared"
import type { GrowthAxisId, GrowthScore } from "@emanus/shared"

const AXIS_LABEL: Record<GrowthAxisId, string> = {
  identity: "Identitate",
  emotional_peace: "Pace",
  relationships: "Relații",
  living_faith: "Credință",
  character: "Caracter",
  freedom: "Libertate",
}

export function GrowthRadar({
  scores,
  size = 280,
  showLabels = true,
}: {
  scores: GrowthScore[]
  size?: number
  showLabels?: boolean
}) {
  const ordered = GROWTH_AXES.map((ax) => scores.find((s) => s.axis === ax)).filter(
    (s): s is GrowthScore => Boolean(s),
  )
  const n = ordered.length || 1
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.31
  const labelR = r * 1.4
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
      {showLabels &&
        ordered.map((s, i) => {
          const lx = cx + labelR * Math.cos(ang(i))
          const ly = cy + labelR * Math.sin(ang(i))
          return (
            <text
              key={s.axis}
              className="radar__label"
              x={lx}
              y={ly}
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
