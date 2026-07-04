import { useEffect, useState } from "react"
import type { PrayerLevel } from "@emanus/shared"
import { suggestedPrayerLevel } from "@emanus/shared"
import { addPrayerRequest, getPrayerLevels } from "./api"
import { navigate } from "./router"
import { getCategory } from "./session"

export function PrayerCoach() {
  const [levels, setLevels] = useState<PrayerLevel[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState<number>(suggestedPrayerLevel(getCategory()))
  const [request, setRequest] = useState("")
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getPrayerLevels()
      .then((r) => setLevels(r.levels))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!levels) return <p className="muted">Se încarcă…</p>

  const level = levels.find((l) => l.id === active) ?? levels[0]

  async function saveRequest() {
    const text = request.trim()
    if (!text) return
    setSaving(true)
    try {
      await addPrayerRequest(text)
      setRequest("")
      setSaved(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="prayer">
      <header className="prayer__head">
        <div>
          <h1>🙏 Învață să te rogi</h1>
          <p className="muted">Te învață pas cu pas, apoi te lasă liber.</p>
        </div>
        <button type="button" className="ghost" onClick={() => navigate("/daily")}>
          Înapoi
        </button>
      </header>

      <div className="prayer__levels">
        {levels.map((l) => (
          <button
            key={l.id}
            type="button"
            className={`prayer__lvl${l.id === active ? " picked" : ""}`}
            onClick={() => setActive(l.id)}
          >
            {l.id}
          </button>
        ))}
      </div>

      <article className="prayer__card">
        <span className="prayer__badge">
          Nivel {level.id} · {level.subtitle}
        </span>
        <h2>{level.title}</h2>
        <p className="muted">Pentru: {level.forWho}</p>
        <p className="prayer__intro">{level.intro}</p>

        {level.prompts.length > 0 ? (
          <div className="prayer__prompts">
            {level.prompts.map((p, i) => (
              <label key={i} className="prayer__prompt">
                <span>{p}</span>
                <textarea className="text-input" rows={2} placeholder="…" />
              </label>
            ))}
          </div>
        ) : (
          <textarea
            className="text-input"
            rows={6}
            placeholder="Spune-I tot ce e pe inima ta…"
          />
        )}
      </article>

      <article className="prayer__ebenezer">
        <span className="daily__kicker">🪨 Ai o cerere anume?</span>
        <p className="muted">
          Pune-o pe Zidul Ebenezer și marcheaz-o când Dumnezeu răspunde.
        </p>
        <textarea
          className="text-input"
          rows={2}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Doamne, mă rog pentru…"
        />
        {saved && <p className="notice">Adăugată pe Zidul Ebenezer. 🙏</p>}
        <div className="prayer__actions">
          <button type="button" onClick={saveRequest} disabled={saving || !request.trim()}>
            Adaugă pe Zid
          </button>
          <button type="button" className="ghost" onClick={() => navigate("/ebenezer")}>
            Vezi Zidul Ebenezer
          </button>
        </div>
      </article>
    </section>
  )
}
