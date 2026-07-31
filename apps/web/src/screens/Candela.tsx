// Candela de seara (docs/27 §4.6).
//
// Psalmul 119:105: „Cuvantul Tau este o candela pentru PICIOARELE mele”. De aceea
// animatia are pasi si drum, nu doar text: lumina cade jos, pe piatra urmatoare.
// Lumina nu dezvaluie niciodata tot drumul — asta e chiar teologia versetului.
import { useMemo, useState } from "react"
import { drawScrollVerse, sectionForMood } from "@emanus/shared"
import { ScriptureReveal } from "../components/ScriptureReveal"
import {
  eveningNoteSavedToday,
  lastMood,
  recentVerseIds,
  rememberVerse,
  saveEveningNote,
  walkedDays,
} from "../dailyGifts"
import { navigate } from "../router"

export default function Candela() {
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(() => eveningNoteSavedToday())

  // Acelasi verset toata seara: nu se trage din nou pana iese unul mai frumos.
  const verse = useMemo(() => {
    const mood = lastMood()
    const drawn = drawScrollVerse({
      section: mood ? sectionForMood(mood) : undefined,
      recentIds: recentVerseIds(),
    })
    rememberVerse(drawn.id)
    return drawn
  }, [])

  const behind = useMemo(() => walkedDays(), [])

  function save() {
    saveEveningNote(note)
    setSaved(true)
    setNote("")
  }

  return (
    <section className="today">
      <button className="today__back ghost" onClick={() => navigate("/")}>
        ← Azi
      </button>

      <p className="today__kicker">Candela de seara</p>

      <ScriptureReveal
        variant="lamp"
        verseText={verse.text}
        verseRef={verse.ref}
        stepText={verse.step}
        walkedDays={behind}
      />

      <p className="muted today__promise">
        Candela lumineaza un pas, nu tot drumul. Atat ti-a promis (Psalmul 119:105).
      </p>

      {/* Jurnal de seara: doua randuri, nu un formular. */}
      {saved ? (
        <p className="today__memorial">Notat. Stinge lumina liniStit.</p>
      ) : (
        <div className="journal">
          <label htmlFor="candela-note">Unde a fost Dumnezeu azi?</label>
          <textarea
            id="candela-note"
            rows={2}
            value={note}
            placeholder="Doua randuri sunt destul."
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="today__invite-actions">
            <button className="today__cta" disabled={!note.trim()} onClick={save}>
              Pun deoparte
            </button>
            <button className="ghost" onClick={() => navigate("/")}>
              Nu acum
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
