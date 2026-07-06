import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { CalendarClock, Clock, X } from "lucide-react"
import type { MentorSlot, MentoratView } from "@emanus/shared"
import { bookMentorSession, cancelMentorSession, getMentorat } from "./api"
import { navigate } from "./router"
import { Avatar, Button } from "./ds"

const dayFmt = new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long" })
const timeFmt = new Intl.DateTimeFormat("ro-RO", { hour: "2-digit", minute: "2-digit" })

function formatWhen(iso: string): string {
  const d = new Date(iso)
  return `${dayFmt.format(d)} · ${timeFmt.format(d)}`
}

const slotRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid var(--border)",
}
const slotBodyStyle: CSSProperties = { flex: 1, display: "flex", flexDirection: "column", gap: 2 }
const slotTopicStyle: CSSProperties = { fontWeight: 600, color: "var(--text)" }
const slotMetaStyle: CSSProperties = { fontSize: "0.8rem" }
const metaRowStyle: CSSProperties = { display: "inline-flex", alignItems: "center", gap: 5 }
const cancelBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  background: "var(--danger-soft)",
  color: "var(--bad)",
  border: "1px solid var(--bad)",
  borderRadius: "var(--radius-pill)",
  padding: "6px 12px",
  fontSize: "0.8rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
}
const bookBtnStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  background: "var(--accent-soft)",
  color: "var(--accent-strong)",
  border: "1px solid var(--accent)",
  borderRadius: "var(--radius-pill)",
  padding: "6px 12px",
  fontSize: "0.8rem",
  fontWeight: 600,
  boxShadow: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
}

export function Mentorat() {
  const [view, setView] = useState<MentoratView | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  function load() {
    getMentorat()
      .then(setView)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }

  useEffect(load, [])

  async function book(id: string) {
    setBusyId(id)
    try {
      await bookMentorSession(id)
      load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusyId(null)
    }
  }

  async function cancel(id: string) {
    setBusyId(id)
    try {
      await cancelMentorSession(id)
      load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <section className="mentorat">
      <header className="dashboard__head">
        <h1>Mentorat</h1>
        <button type="button" className="ghost" onClick={() => navigate("/")}>
          ← Acasă
        </button>
      </header>
      <p className="muted">
        Programează o întâlnire cu un mentor — 30-45 de minute, față în față cu cineva care te
        însoțește pe drumul tău.
      </p>

      {error && <p className="error">{error}</p>}
      {!view && !error && <p className="muted">Se încarcă…</p>}

      {view && view.mySessions.length > 0 && (
        <section className="tile">
          <h2 className="tile__title">Sesiunile mele</h2>
          <ul className="slot-list">
            {view.mySessions.map((s: MentorSlot) => (
              <li key={s.id} style={slotRowStyle}>
                <Avatar name={s.mentorName} size="sm" />
                <div style={slotBodyStyle}>
                  <span style={slotTopicStyle}>{s.topic}</span>
                  <span className="muted" style={slotMetaStyle}>
                    {s.mentorName}
                  </span>
                  <span className="muted" style= ...slotMetaStyle, ...metaRowStyle >
                    <CalendarClock size={13} aria-hidden /> {formatWhen(s.startsAt)} · {s.durationMin}
                    {" "}min
                  </span>
                </div>
                <button
                  type="button"
                  style={cancelBtnStyle}
                  disabled={busyId === s.id}
                  onClick={() => cancel(s.id)}
                >
                  <X size={13} aria-hidden />
                  Anulează
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {view && (
        <section className="tile">
          <h2 className="tile__title">Sesiuni disponibile</h2>
          {view.upcoming.length === 0 ? (
            <p className="muted">Nu sunt sloturi libere acum. Revino în curând.</p>
          ) : (
            <ul className="slot-list">
              {view.upcoming.map((s: MentorSlot) => (
                <li key={s.id} style={slotRowStyle}>
                  <Avatar name={s.mentorName} size="sm" />
                  <div style={slotBodyStyle}>
                    <span style={slotTopicStyle}>{s.topic}</span>
                    <span className="muted" style={slotMetaStyle}>
                      {s.mentorName}
                    </span>
                    <span className="muted" style= ...slotMetaStyle, ...metaRowStyle >
                      <Clock size={13} aria-hidden /> {formatWhen(s.startsAt)} · {s.durationMin} min
                    </span>
                  </div>
                  <button
                    type="button"
                    style={bookBtnStyle}
                    disabled={busyId === s.id}
                    onClick={() => book(s.id)}
                  >
                    <CalendarClock size={13} aria-hidden />
                    {busyId === s.id ? "Se programează…" : "Programează"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <Button variant="secondary" block onClick={() => navigate("/dashboard")}>
        Înapoi la parcursul meu
      </Button>
    </section>
  )
}
