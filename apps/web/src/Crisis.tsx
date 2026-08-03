import type { CSSProperties } from "react"
import { ArrowLeft, LifeBuoy, Phone, ShieldAlert } from "lucide-react"
import { CRISIS_RESOURCES } from "@emanus/shared"

const headIconStyle: CSSProperties = { color: "var(--bad)" }
const disclaimerStyle: CSSProperties = { display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.45 }
const disclaimerIconStyle: CSSProperties = { flex: "0 0 auto", marginTop: 2, color: "var(--bad)" }
const numStyle: CSSProperties = { fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700 }
const labelStyle: CSSProperties = { fontWeight: 600 }
const callBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  flex: "0 0 auto",
  background: "var(--accent)",
  color: "var(--on-accent)",
  borderRadius: "var(--radius-pill)",
  padding: "10px 16px",
  fontWeight: 700,
  textDecoration: "none",
  whiteSpace: "nowrap",
}
const footStyle: CSSProperties = { lineHeight: 1.5 }

export function Crisis({ onBack }: { onBack: () => void }) {
  return (
    <section className="prayer">
      <div className="prayer__head">
        <div>
          <h1 className="title-icon">
            <LifeBuoy size={22} strokeWidth={1.8} style={headIconStyle} aria-hidden />
            Ai nevoie de ajutor acum?
          </h1>
          <span className="muted">Numerele sunt primele. Nu trebuie să explici aplicației ce s-a întâmplat.</span>
        </div>
        <button type="button" className="ghost" onClick={onBack} aria-label="Înapoi">
          <ArrowLeft size={20} aria-hidden />
        </button>
      </div>

      <div className="notice notice--warn" style={disclaimerStyle}>
        <ShieldAlert size={18} aria-hidden style={disclaimerIconStyle} />
        <span>
          Emanus nu înlocuiește medicul, psihologul, poliția sau 112. Dacă există pericol imediat,
          sună la 112 acum.
        </span>
      </div>

      <ul className="eb-list">
        {CRISIS_RESOURCES.map((resource) => (
          <li className="eb-item" key={resource.id}>
            <div className="eb-item__body">
              <p style={numStyle}>{resource.phone}</p>
              <p style={labelStyle}>{resource.label}</p>
              <p className="muted">{resource.availability} · {resource.note}</p>
            </div>
            <a href={`tel:${resource.phone.replace(/\s/g, "")}`} style={callBtnStyle}>
              <Phone size={16} aria-hidden />
              Sună
            </a>
          </li>
        ))}
      </ul>

      <p className="muted" style={footStyle}>
        Nu ești singur. Sună. Ne întoarcem la drum când ești în siguranță.
      </p>
    </section>
  )
}
