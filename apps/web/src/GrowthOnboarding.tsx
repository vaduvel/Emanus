import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { Sparkles } from "lucide-react"
import { GROWTH_AXIS_LABELS_RO } from "@emanus/shared"
import { getGrowthProfile, saveGrowthProfile } from "./api"
import type { GrowthProfileResult } from "./api"
import { navigate } from "./router"
import { getCategory } from "./session"
import { Button } from "./ds"

const MAX_LEN = 2000

const chipRowStyle: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }
const axisChipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  border: "1px solid var(--accent)",
  borderRadius: "var(--radius-pill)",
  padding: "4px 12px",
  fontSize: "0.8rem",
  fontWeight: 600,
}
const needAxisStyle: CSSProperties = { marginLeft: 6 }
const arrowStyle: CSSProperties = { color: "var(--accent)", fontWeight: 700 }
const moreBtnStyle: CSSProperties = { marginTop: 12 }
const introIconStyle: CSSProperties = { color: "var(--accent)", verticalAlign: "middle", marginRight: 6 }

export function GrowthOnboarding() {
  const category = getCategory()
  const [text, setText] = useState("")
  const [result, setResult] = useState<GrowthProfileResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getGrowthProfile()
      .then((r) => {
        if (r.profile) {
          setText(r.profile.text)
          setResult({ profile: r.profile, adaptive: null })
        }
      })
      .catch(() => {
        /* profilul e opțional la încărcare */
      })
  }, [])

  async function submit() {
    if (!text.trim()) return
    setBusy(true)
    setError(null)
    try {
      const res = await saveGrowthProfile(text.trim(), category)
      setResult(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const needs = result?.profile.needs ?? []
  const topAxes = result?.profile.topAxes ?? []

  return (
    <section className="growth-onb">
      <header className="dashboard__head">
        <h1>Creșterea mea</h1>
        <button type="button" className="ghost" onClick={() => navigate("/")}>
          ← Acasă
        </button>
      </header>
      <p className="muted">
        <Sparkles size={16} aria-hidden style={introIconStyle} />
        Scrie cu cuvintele tale ce te frământă sau la ce vrei să crești. Nu există răspuns
        greșit — te ascultăm și îți pregătim un parcurs pe măsură.
      </p>

      <div className="composer">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_LEN}
          rows={5}
          placeholder="De exemplu: «Mă lupt cu anxietatea și îmi e greu să iert pe cineva apropiat»…"
        />
        <div className="composer__foot">
          <span className="muted">
            {text.length}/{MAX_LEN}
          </span>
          <button type="button" disabled={!text.trim() || busy} onClick={submit}>
            {busy ? "Se analizează…" : result ? "Actualizează" : "Vezi ce ți se potrivește"}
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {result && needs.length === 0 && (
        <div className="notice">
          Încă nu am identificat teme clare. Încearcă să scrii câteva cuvinte în plus despre ce
          simți sau trăiești acum.
        </div>
      )}

      {result && needs.length > 0 && (
        <section className="tile">
          <h2 className="tile__title">Ce am înțeles</h2>
          <p className="muted">Zonele tale de creștere acum:</p>
          <div style={chipRowStyle}>
            {topAxes.map((a) => (
              <span key={a} style={axisChipStyle}>
                {GROWTH_AXIS_LABELS_RO[a]}
              </span>
            ))}
          </div>
          <ul className="eb-list">
            {needs.slice(0, 5).map((n) => (
              <li key={n.id} className="eb-item">
                <span>{n.label}</span>
                <span className="muted" style={needAxisStyle}>
                  · {GROWTH_AXIS_LABELS_RO[n.axis]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {result?.adaptive && (
        <section className="tile">
          <h2 className="tile__title">Pentru tine acum</h2>
          <p className="growth-mini__cap">
            <b>{result.adaptive.title}</b>
          </p>
          <p className="muted">
            {result.adaptive.struggle} <span style={arrowStyle}>→</span> {result.adaptive.truth}
          </p>
          <Button
            variant="primary"
            block
            onClick={() =>
              result.adaptive?.firstLessonId
                ? navigate(`/lesson/${result.adaptive.firstLessonId}`)
                : navigate("/dashboard")
            }
          >
            Începe
          </Button>
        </section>
      )}

      {result && (
        <button
          type="button"
          className="ghost"
          style={moreBtnStyle}
          onClick={() => navigate("/dashboard")}
        >
          Vezi radarul complet →
        </button>
      )}
    </section>
  )
}
