// Devotionalul de un an (docs/27 §2).
//
// Regula manei (Exod 16, docs/27 §4.5): ziua ta, nu ziua din calendar. Cine a
// lipsit nu are zile restante si nu poate citi inainte. De aceea aici NU apare
// niciodata „ziua 12 din 365”, nici procent, nici serie (docs/20 §1).
//
// Faza G: se poate citi impreuna cu un copil sau cu un adolescent. Textul de
// baza ramane cel scris; varianta apare doar unde a fost scrisa de om.
import { useMemo, useState } from "react"
import {
  DEVOTIONAL_AGE_MODES,
  devotionalDayForAge,
  devotionalHasAgeVariant,
  type DevotionalAgeMode,
} from "@emanus/shared"
import { ScriptureReveal } from "../components/ScriptureReveal"
import {
  devotionalAgeMode,
  devotionalToday,
  devotionalWelcomeBack,
  markDevotionalRead,
  setDevotionalAgeMode,
} from "../dailyGifts"
import { navigate } from "../router"

export default function Devotional() {
  const base = useMemo(() => devotionalToday(), [])
  const welcomeBack = useMemo(() => devotionalWelcomeBack(), [])
  const [mode, setMode] = useState<DevotionalAgeMode>(() => devotionalAgeMode())
  const [done, setDone] = useState(false)

  if (!base) {
    return (
      <section className="today">
        <button className="today__back ghost" onClick={() => navigate("/")}>
          ← Azi
        </button>
        <p>Devotionalul se scrie. Revenim cu urmatoarele zile.</p>
      </section>
    )
  }

  const day = devotionalDayForAge(base, mode)
  const hasVariant = devotionalHasAgeVariant(base, mode)

  function chooseMode(next: DevotionalAgeMode) {
    setMode(next)
    setDevotionalAgeMode(next)
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

      <div className="today__chips">
        {DEVOTIONAL_AGE_MODES.map((m) => (
          <button
            key={m.id}
            className={m.id === mode ? "today__switch today__switch--on" : "today__switch"}
            onClick={() => chooseMode(m.id)}
            title={m.hint}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ScriptureReveal variant="scroll" verseText={day.verseText} verseRef={day.verseRef} />

      {!hasVariant ? (
        <p className="muted">
          Ziua asta n-are inca o varianta scrisa pentru varsta aleasa. Cititi
          textul de mai jos impreuna, cu vocea voastra.
        </p>
      ) : null}

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
