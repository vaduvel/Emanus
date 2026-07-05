import { useEffect, useState } from "react"
import { Check, Clock, Landmark } from "lucide-react"
import type { PrayerRequest } from "@emanus/shared"
import { EBENEZER_VERSE } from "@emanus/shared"
import { addPrayerRequest, getEbenezer, markPrayerAnswered } from "./api"
import { navigate } from "./router"

export function Ebenezer() {
  const [items, setItems] = useState<PrayerRequest[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState("")
  const [busy, setBusy] = useState(false)

  function load() {
    getEbenezer()
      .then((r) => setItems(r.requests))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }
  useEffect(load, [])

  async function add() {
    const t = text.trim()
    if (!t) return
    setBusy(true)
    try {
      await addPrayerRequest(t)
      setText("")
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
      await markPrayerAnswered(id)
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="ebenezer">
      <header className="ebenezer__head">
        <div>
          <h1 className="title-icon">
            <Landmark size={22} strokeWidth={1.8} aria-hidden /> Zidul Ebenezer
          </h1>
          <p className="muted">
            „{EBENEZER_VERSE.text}” {EBENEZER_VERSE.ref}
          </p>
        </div>
        <button type="button" className="ghost" onClick={() => navigate("/daily")}>
          Înapoi
        </button>
      </header>

      <div className="composer">
        <textarea
          className="text-input"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Doamne, mă rog pentru…"
        />
        <div className="composer__foot">
          <span className="muted">Adaugă o rugăciune</span>
          <button type="button" onClick={add} disabled={busy || !text.trim()}>
            + Adaugă
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {!items ? (
        <p className="muted">Se încarcă…</p>
      ) : items.length === 0 ? (
        <p className="muted">Încă nimic pe zid. Prima rugăciune e la un pas.</p>
      ) : (
        <ul className="eb-list">
          {items.map((it) => (
            <li key={it.id} className={`eb-item${it.answered ? " answered" : ""}`}>
              <div className="eb-item__body">
                <p>{it.text}</p>
                <span className="muted eb-item__meta">
                  {new Date(it.createdAt).toLocaleDateString("ro-RO")}
                  {it.answered ? (
                    <>
                      {" · "}
                      <Check size={13} strokeWidth={2.2} aria-hidden /> răspuns
                    </>
                  ) : (
                    <>
                      {" · "}
                      <Clock size={13} strokeWidth={1.9} aria-hidden /> în așteptare
                    </>
                  )}
                </span>
              </div>
              {!it.answered && (
                <button
                  type="button"
                  className="ghost title-icon"
                  onClick={() => answer(it.id)}
                  disabled={busy}
                >
                  <Check size={15} strokeWidth={2.2} aria-hidden /> Răspuns
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
