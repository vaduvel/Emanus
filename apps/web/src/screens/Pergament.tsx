// Pergamentul de dimineata (docs/27 §4.3-4.4).
//
// Nu e borcan si nu e random (docs/27 §4.1): intrebam intai ce duci azi, apoi
// deschidem sertarul potrivit. Un obiect de raft da un verset la nimereala;
// aici versetul vine dupa ce omul a fost ascultat (docs/00-DIRECTIE §14).
import { useMemo, useState } from "react"
import {
  SCROLL_SECTIONS,
  drawScrollVerse,
  type ScrollSectionId,
  type ScrollVerse,
} from "@emanus/shared"
import { ScriptureReveal } from "../components/ScriptureReveal"
import { recentVerseIds, rememberVerse, setLastMood } from "../dailyGifts"
import { navigate } from "../router"

export default function Pergament() {
  const [section, setSection] = useState<ScrollSectionId | null>(null)
  const [verse, setVerse] = useState<ScrollVerse | null>(null)
  const recent = useMemo(() => recentVerseIds(), [])

  function open(id: ScrollSectionId) {
    const drawn = drawScrollVerse({ section: id, recentIds: recent })
    const mood = SCROLL_SECTIONS.find((s) => s.id === id)?.mood ?? null
    setLastMood(mood)
    rememberVerse(drawn.id)
    setSection(id)
    setVerse(drawn)
  }

  if (verse) {
    return (
      <section className="today">
        <button className="today__back ghost" onClick={() => navigate("/")}>
          ← Azi
        </button>

        <ScriptureReveal variant="scroll" verseText={verse.text} verseRef={verse.ref} />

        <div className="today__extra">
          <button className="ghost" onClick={() => navigate(`/biblia`)}>
            Citeste in context
          </button>
          <button className="ghost" onClick={() => navigate("/mesaj")}>
            Trimite cuiva
          </button>
        </div>

        {/* Un singur verset pe zi. Nu se trage pana iese unul care place. */}
        <p className="muted">
          Sulul se strange acum. Maine dimineata il desfacem din nou.
        </p>
      </section>
    )
  }

  return (
    <section className="today">
      <button className="today__back ghost" onClick={() => navigate("/")}>
        ← Azi
      </button>

      <p className="today__kicker">Pergamentul de dimineata</p>
      <h1>Ce duci azi?</h1>
      <p className="muted">
        Alege si desfasurem sulul la locul potrivit. Nu e la nimereala: Scriptura
        are un raspuns anume pentru fiecare dintre ele.
      </p>

      <div className="today__chips">
        {SCROLL_SECTIONS.map((s) => (
          <button key={s.id} className="tile" onClick={() => open(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      {section ? null : (
        <p className="muted today__promise">
          Sulul este forma in care Isus a citit Scriptura (Luca 4:17).
        </p>
      )}
    </section>
  )
}
