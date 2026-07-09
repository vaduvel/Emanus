import type { CSSProperties } from "react"
import { ArrowLeft, LifeBuoy, Phone, ShieldAlert } from "lucide-react"

type Hotline = { dial: string; display: string; label: string; note: string }

// Linii de urgență din România (verificate). Conținut canonic, independent de backend.
const HOTLINES: Hotline[] = [
  {
    dial: "112",
    display: "112",
    label: "Urgențe · Ambulanță și Poliție",
    note: "Non-stop și gratuit. Sună dacă viața ta sau a cuiva este în pericol imediat.",
  },
  {
    dial: "116111",
    display: "116 111",
    label: "Telefonul Copilului",
    note: "Consiliere gratuită și confidențială pentru copii și adolescenți.",
  },
  {
    dial: "0800801200",
    display: "0800 801 200",
    label: "Linie de sprijin Antisuicid",
    note: "Sprijin emoțional în momente de criză. Cineva te ascultă.",
  },
]

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
          <span className="muted">Nu ești singur. Iată la cine poți apela imediat.</span>
        </div>
        <button type="button" className="ghost" onClick={onBack} aria-label="Înapoi">
          <ArrowLeft size={20} aria-hidden />
        </button>
      </div>

      <div className="notice notice--warn" style={disclaimerStyle}>
        <ShieldAlert size={18} aria-hidden style={disclaimerIconStyle} />
        <span>
          Emanus nu înlocuiește ajutorul profesionist. Dacă ești în pericol, contactează imediat
          serviciile de urgență.
        </span>
      </div>

      <ul className="eb-list">
        {HOTLINES.map((h) => (
          <li className="eb-item" key={h.dial}>
            <div className="eb-item__body">
              <p style={numStyle}>{h.display}</p>
              <p style={labelStyle}>{h.label}</p>
              <p className="muted">{h.note}</p>
            </div>
            <a href={`tel:${h.dial}`} style={callBtnStyle}>
              <Phone size={16} aria-hidden />
              Sună
            </a>
          </li>
        ))}
      </ul>

      <p className="muted" style={footStyle}>
        Poți reveni oricând la aplicație. Suntem alături de tine, pas cu pas.
      </p>
    </section>
  )
}
