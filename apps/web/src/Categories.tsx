import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import { Baby, Check, Flame, Flower2, Home as HomeIcon, Leaf, Palette, Swords } from "lucide-react"
import type { Category } from "@emanus/shared"
import { getCategories } from "./api"
import { navigate } from "./router"
import { getCategory, setCategory } from "./session"
import { Button } from "./ds"

const ICONS: Record<string, LucideIcon> = {
  kids0_5: Baby,
  kids6_11: Palette,
  teens12_18: Flame,
  women: Flower2,
  men: Swords,
  parents: HomeIcon,
  grandparents: Leaf,
}

const iconWrapStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  flexShrink: 0,
  borderRadius: "var(--radius-lg)",
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
}
const rowBodyStyle: CSSProperties = { flex: 1, display: "flex", flexDirection: "column", gap: 2 }
const rowNameStyle: CSSProperties = { fontWeight: 600, color: "var(--text)" }
const rowMetaStyle: CSSProperties = { fontSize: "0.8rem" }
const checkStyle: CSSProperties = { color: "var(--accent)", flexShrink: 0 }
const saveWrapStyle: CSSProperties = { marginTop: 12 }

function rowStyle(active: boolean): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    textAlign: "left",
    padding: "12px 14px",
    marginBottom: 8,
    background: active ? "var(--accent-soft)" : "var(--surface)",
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-sm)",
    cursor: "pointer",
  }
}

export function Categories() {
  const [cats, setCats] = useState<Category[] | null>(null)
  const [selected, setSelected] = useState<string>(getCategory())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCategories()
      .then(setCats)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  function save() {
    setCategory(selected)
    navigate("/")
  }

  return (
    <section className="categories">
      <header className="dashboard__head">
        <h1>Vârstă & categorie</h1>
        <button type="button" className="ghost" onClick={() => navigate("/")}>
          ← Acasă
        </button>
      </header>
      <p className="muted">
        Alege pentru cine este călătoria. Conținutul, tonul și ritmul se adaptează la persoana
        aleasă.
      </p>

      {error && <p className="error">{error}</p>}
      {!cats && !error && <p className="muted">Se încarcă…</p>}

      {cats && (
        <div className="category-list">
          {cats.map((c) => {
            const Icon = ICONS[c.id] ?? Flame
            const active = selected === c.id
            const meta = c.ageRange && c.ageRange !== "\u2014" ? `${c.ageRange} · ${c.dominantFormat}` : c.dominantFormat
            return (
              <button
                key={c.id}
                type="button"
                style={rowStyle(active)}
                onClick={() => setSelected(c.id)}
              >
                <span style={iconWrapStyle}>
                  <Icon size={20} strokeWidth={1.8} aria-hidden />
                </span>
                <span style={rowBodyStyle}>
                  <span style={rowNameStyle}>{c.name}</span>
                  <span className="muted" style={rowMetaStyle}>
                    {meta}
                  </span>
                </span>
                {active && <Check size={18} style={checkStyle} aria-hidden />}
              </button>
            )
          })}
        </div>
      )}

      <div style={saveWrapStyle}>
        <Button variant="primary" block onClick={save}>
          Salvează și continuă
        </Button>
      </div>
    </section>
  )
}
