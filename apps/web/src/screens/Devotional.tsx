// Devotionalul de un an (docs/27 §2).
//
// Regula manei (Exod 16, docs/27 §4.5): ziua ta, nu ziua din calendar. Cine a
// lipsit nu are zile restante si nu poate citi inainte. De aceea aici NU apare
// niciodata „ziua 12 din 365”, nici procent, nici serie (docs/20 §1).
//
// UN SINGUR TEXT, PENTRU TOTI (decizie de produs, 2 aug): devotionalul,
// mesajul zilei si pergamentul se citesc la fel de oricine. Impartirea pe
// varste ramane acolo unde chiar conteaza — cursurile si traseele de lectii.
// De aceea nu exista aici comutator „pentru mine / cu copilul”.
import { useMemo, useState } from "react"
import { ScriptureReveal } from "../components/ScriptureReveal"
import {
  devotionalToday,
  devotionalWelcomeBack,
  markDevotionalRead,
} from "../dailyGifts"
import { navigate } from "../router"

export default function Devotional() {
  const day = useMemo(() => devotionalToday(), [])
  const welcomeBack = useMemo(() => devotionalWelcomeBack(), [])
  const [done, setDone] = useState(false)

  if (!day) {
    return (
      <section className="today">
        <button className="today__back ghost" onClick={() => navigate("/")}>
          ← Azi
        </button>
        <p>Devotionalul se scrie. Revenim cu urmatoarele zile.</p>
      </section>
    )
  }

  function finish() {
    markDevotionalRead()
    setDone(true)
  }

  return (
    <section className="today">
      <button className="today__back ghost" onClick={() => navigate("/")}>
        ← Azi
      </button>

      <p className="today__kicker">{day.theme}</p>

      {/* Mesajul de revenire nu numara ce s-a pierdut, pentru ca nu s-a pierdut. */}
      {welcomeBack ? <p className="today__yesterday muted">{welcomeBack}</p> : null}

      <ScriptureReveal variant="scroll" verseText={day.verseText} verseRef={day.verseRef} />

      <div className="today__main">
        <p>{day.meditation}</p>

        <h2>Intrebarea de azi</h2>
        <p>{day.question}</p>

        <h2>Rugaciune</h2>
        <p className="scripture">{day.prayer}</p>

        <h2>Pasul</h2>
        <p>{day.step}</p>
      </div>

      {done ? (
        <div className="today__extra">
          <p className="today__memorial">
            Ajunge pentru azi. Mana de maine se strange maine.
          </p>
          <button className="ghost" onClick={() => navigate("/candela")}>
            Aprinde candela seara
          </button>
          <button className="ghost" onClick={() => navigate("/legamant")}>
            Legamantul familiei
          </button>
        </div>
      ) : (
        <button className="today__cta" onClick={finish}>
          Am citit
        </button>
      )}
    </section>
  )
}
