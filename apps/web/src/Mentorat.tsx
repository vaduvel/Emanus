import { useEffect, useState } from "react"
import type { CSSProperties, FormEvent } from "react"
import { CalendarClock, CalendarPlus, Clock, Trash2, X } from "lucide-react"
import type { MentorSlot, MentoratView, MentorStatus } from "@emanus/shared"
import {
  bookMentorSession,
  cancelMentorSession,
  getMentor,
  getMentorat,
  offerMentorSlot,
  withdrawMentorSlot,
} from "./api"
import { navigate } from "./router"
import { Avatar, Button } from "./ds"

const dayFmt = new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long" })
const timeFmt = new Intl.DateTimeFormat("ro-RO", { hour: "2-digit", minute: "2-digit" })

function formatWhen(iso: string): string {
  const d = new Date(iso)
  return `${dayFmt.format(d)} · ${timeFmt.format(d)}`
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
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
const slotWhenStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.8rem",
}
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
const bookedTagStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  background: "var(--surface-3)",
  color: "var(--text-muted)",
  borderRadius: "var(--radius-pill)",
  padding: "6px 12px",
  fontSize: "0.8rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
}
const offerFormStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 8,
}
const fieldStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 4 }
const fieldRowStyle: CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap" }
const labelStyle: CSSProperties = { fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }
const inputStyle: CSSProperties = {
  padding: "10px 12px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border)",
  background: "var(--surface)",
  color: "var(--text)",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  width: "100%",
}
const flexColStyle: CSSProperties = {
  flex: 1,
  minWidth: 140,
  display: "flex",
  flexDirection: "column",
  gap: 4,
}
const mentorHintStyle: CSSProperties = { fontSize: "0.8rem" }

const DURATIONS = [30, 45, 60]

export function Mentorat() {
  const [view, setView] = useState<MentoratView | null>(null)
  const [mentor, setMentor] = useState<MentorStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  // Formular „oferă un slot” (doar pentru mentori)
  const [mentorName, setMentorName] = useState("")
  const [topic, setTopic] = useState("")
  const [startsAt, setStartsAt] = useState("")
  const [durationMin, setDurationMin] = useState(30)
  const [offering, setOffering] = useState(false)

  function load() {
    getMentorat()
      .then(setView)
      .catch((e: unknown) => setError(msg(e)))
  }

  useEffect(() => {
    load()
    getMentor()
      .then(setMentor)
      .catch(() => setMentor(null))
  }, [])

  async function book(id: string) {
    setBusyId(id)
    try {
      await bookMentorSession(id)
      load()
    } catch (e: unknown) {
      setError(msg(e))
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
      setError(msg(e))
    } finally {
      setBusyId(null)
    }
  }

  async function withdraw(id: string) {
    setBusyId(id)
    try {
      await withdrawMentorSlot(id)
      load()
    } catch (e: unknown) {
      setError(msg(e))
    } finally {
      setBusyId(null)
    }
  }

  async function offer(e: FormEvent) {
    e.preventDefault()
    if (!topic.trim() || !startsAt) return
    setOffering(true)
    setError(null)
    try {
      await offerMentorSlot({
        mentorName: mentorName.trim() || "Mentor",
        topic: topic.trim(),
        startsAt: new Date(startsAt).toISOString(),
        durationMin,
      })
      setTopic("")
      setStartsAt("")
      load()
    } catch (err: unknown) {
      setError(msg(err))
    } finally {
      setOffering(false)
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
                  <span className="muted" style={slotWhenStyle}>
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
                    <span className="muted" style={slotWhenStyle}>
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

      {view && mentor?.isMentor && (
        <section className="tile">
          <h2 className="tile__title">Oferă mentorat</h2>
          <p className="muted" style={mentorHintStyle}>
            Ești mentor — poți deschide sloturi pe care alții le pot programa.
          </p>

          {view.myOfferedSlots.length > 0 && (
            <ul className="slot-list">
              {view.myOfferedSlots.map((s: MentorSlot) => (
                <li key={s.id} style={slotRowStyle}>
                  <Avatar name={s.mentorName} size="sm" />
                  <div style={slotBodyStyle}>
                    <span style={slotTopicStyle}>{s.topic}</span>
                    <span className="muted" style={slotMetaStyle}>
                      {s.mentorName}
                    </span>
                    <span className="muted" style={slotWhenStyle}>
                      <CalendarClock size={13} aria-hidden /> {formatWhen(s.startsAt)} · {s.durationMin}
                      {" "}min
                    </span>
                  </div>
                  {s.status === "booked" ? (
                    <span style={bookedTagStyle}>Rezervat</span>
                  ) : (
                    <button
                      type="button"
                      style={cancelBtnStyle}
                      disabled={busyId === s.id}
                      onClick={() => withdraw(s.id)}
                    >
                      <Trash2 size={13} aria-hidden />
                      Retrage
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          <form style={offerFormStyle} onSubmit={offer}>
            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="m-name">
                Numele afișat
              </label>
              <input
                id="m-name"
                style={inputStyle}
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder="ex. Frate Ilie"
                maxLength={40}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle} htmlFor="m-topic">
                Subiectul sesiunii
              </label>
              <input
                id="m-topic"
                style={inputStyle}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ex. Cum să începi rugăciunea"
                maxLength={120}
              />
            </div>
            <div style={fieldRowStyle}>
              <div style={flexColStyle}>
                <label style={labelStyle} htmlFor="m-when">
                  Data și ora
                </label>
                <input
                  id="m-when"
                  type="datetime-local"
                  style={inputStyle}
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                />
              </div>
              <div style={flexColStyle}>
                <label style={labelStyle} htmlFor="m-dur">
                  Durată
                </label>
                <select
                  id="m-dur"
                  style={inputStyle}
                  value={durationMin}
                  onChange={(e) => setDurationMin(Number(e.target.value))}
                >
                  {DURATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d} min
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              variant="primary"
              block
              type="submit"
              disabled={offering || !topic.trim() || !startsAt}
            >
              <CalendarPlus size={16} aria-hidden />
              {offering ? "Se publică…" : "Oferă slotul"}
            </Button>
          </form>
        </section>
      )}

      <Button variant="secondary" block onClick={() => navigate("/dashboard")}>
        Înapoi la parcursul meu
      </Button>
    </section>
  )
}
