import { useEffect, useState } from "react"
import type { FamilyThemeOption, FamilyView } from "@emanus/shared"
import {
  addFamilyPrayer,
  createFamily,
  getFamily,
  getFamilyThemes,
  markFamilyPrayerAnswered,
} from "./api"
import { navigate } from "./router"

export function Family() {
  const [view, setView] = useState<FamilyView | null>(null)
  const [themes, setThemes] = useState<FamilyThemeOption[]>([])
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [name, setName] = useState("")
  const [themeId, setThemeId] = useState("")
  const [covenant, setCovenant] = useState("")
  const [pAuthor, setPAuthor] = useState("")
  const [pText, setPText] = useState("")

  function load() {
    Promise.all([getFamily(), getFamilyThemes()])
      .then(([v, t]) => {
        setView(v)
        setThemes(t.themes)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }
  useEffect(load, [])

  if (error) return <p className="error">{error}</p>
  if (!view) return <p className="muted">Se încarcă…</p>

  async function createCovenant() {
    if (!name.trim() || !themeId) return
    setBusy(true)
    try {
      const t = themes.find((x) => x.id === themeId)
      await createFamily({
        name: name.trim(),
        themeId,
        covenant: covenant.trim() || (t ? t.focus : ""),
      })
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  async function addPrayer() {
    if (!pText.trim()) return
    setBusy(true)
    try {
      await addFamilyPrayer(pText.trim(), pAuthor.trim() || "Familie")
      setPText("")
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  async function answer(id: string) {
    setBusy(true)
    try {
      await markFamilyPrayerAnswered(id)
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  if (!view.family) {
    const picked = themes.find((t) => t.id === themeId)
    return (
      <section className="family">
        <header className="family__head">
          <div>
            <h1>👪 Legământul familiei</h1>
            <p className="muted">O temă comună și un zid de rugăciune, pentru toată casa.</p>
          </div>
          <button type="button" className="ghost" onClick={() => navigate("/daily")}>
            Înapoi
          </button>
        </header>

        <label className="family__field">
          <span>Numele familiei</span>
          <input
            className="text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Familia Popescu"
          />
        </label>

        <div>
          <span className="section-title">Tema comună</span>
          <div className="family__themes">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`family__theme${t.id === themeId ? " picked" : ""}`}
                onClick={() => setThemeId(t.id)}
              >
                <b>{t.title}</b>
                <span className="muted">
                  „{t.verseText}” {t.verseRef}
                </span>
              </button>
            ))}
          </div>
        </div>

        <label className="family__field">
          <span>Legământul nostru</span>
          <textarea
            className="text-input"
            rows={3}
            value={covenant}
            onChange={(e) => setCovenant(e.target.value)}
            placeholder={picked ? picked.focus : "Ce ne propunem ca familie…"}
          />
        </label>

        <button type="button" onClick={createCovenant} disabled={busy || !name.trim() || !themeId}>
          Facem legământul
        </button>
      </section>
    )
  }

  const { family, theme, prayers } = view
  return (
    <section className="family">
      <header className="family__head">
        <div>
          <h1>👪 {family.name}</h1>
          <p className="muted">Legământul familiei</p>
        </div>
        <button type="button" className="ghost" onClick={() => navigate("/daily")}>
          Înapoi
        </button>
      </header>

      {theme && (
        <article className="family__covenant">
          <span className="family__badge">Tema: {theme.title}</span>
          <blockquote className="scripture">
            „{theme.verseText}”
            <cite>{theme.verseRef}</cite>
          </blockquote>
          <p>{family.covenant}</p>
        </article>
      )}

      <article className="family__wall">
        <span className="daily__kicker">🙏 Zidul de rugăciune al familiei</span>
        <input
          className="text-input"
          value={pAuthor}
          onChange={(e) => setPAuthor(e.target.value)}
          placeholder="Cine se roagă? (ex: Maria)"
        />
        <textarea
          className="text-input"
          rows={2}
          value={pText}
          onChange={(e) => setPText(e.target.value)}
          placeholder="Ne rugăm împreună pentru…"
        />
        <button type="button" onClick={addPrayer} disabled={busy || !pText.trim()}>
          + Adaugă
        </button>

        {prayers.length === 0 ? (
          <p className="muted">Încă nicio rugăciune. Începeți împreună.</p>
        ) : (
          <ul className="eb-list">
            {prayers.map((p) => (
              <li key={p.id} className={`eb-item${p.answered ? " answered" : ""}`}>
                <div className="eb-item__body">
                  <p>{p.text}</p>
                  <span className="muted">
                    {p.author} · {new Date(p.createdAt).toLocaleDateString("ro-RO")}
                    {p.answered ? " · ✓ răspuns" : ""}
                  </span>
                </div>
                {!p.answered && (
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => answer(p.id)}
                    disabled={busy}
                  >
                    ✓ Răspuns
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  )
}
