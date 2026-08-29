// Animatia de dezvaluire a versetului (docs/27 §4.4, §4.6, §4.7).
//
// Trei variante, o singura componenta:
//   scroll  — dimineata: sulul se desfasoara si versetul apare rand cu rand
//   lamp    — seara: candela lumineaza DOAR pasul urmator (Psalmul 119:105)
//   lesson  — beat-ul 6 din lectie (scripture), fara ornamente
//
// Reguli tehnice (docs/27 §4.7): doar CSS + SVG, fara Lottie / video / WebGL,
// fara transformari 3D. Textul este text real, selectabil, nu imagine.
// A11y (docs/27 §4.8): prefers-reduced-motion sare direct la final, tap oriunde
// scurteaza animatia, versetul e anuntat cu aria-live.
import { useEffect, useRef, useState } from "react"
import "./scripture-reveal.css"

export type ScriptureRevealVariant = "scroll" | "lamp" | "lesson"

export interface ScriptureRevealProps {
  verseText: string
  verseRef: string
  variant?: ScriptureRevealVariant
  /** Doar pentru varianta lamp: pasul de azi, luminat de candela. */
  stepText?: string
  /** Doar pentru varianta lamp: pietre deja calcate, afisate la ~15% opacitate. */
  walkedDays?: number
  autoPlay?: boolean
  onRevealed?: () => void
}

type Phase = "idle" | "opening" | "revealing" | "done"

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Randurile se aprind pe rand, cu decalaj de 90 ms (docs/27 §4.4). */
const LINE_STAGGER_MS = 90

export function ScriptureReveal({
  verseText,
  verseRef,
  variant = "scroll",
  stepText,
  walkedDays = 0,
  autoPlay = true,
  onRevealed,
}: ScriptureRevealProps) {
  const reduced = prefersReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduced || !autoPlay ? "done" : "idle")
  const timers = useRef<number[]>([])
  const announced = useRef(false)

  useEffect(() => {
    if (phase === "done") {
      if (!announced.current) {
        announced.current = true
        onRevealed?.()
      }
      return
    }
    if (phase !== "idle") return

    const openMs = variant === "lesson" ? 320 : 900
    const revealMs = variant === "lesson" ? 520 : 1400
    timers.current.push(window.setTimeout(() => setPhase("revealing"), openMs))
    timers.current.push(window.setTimeout(() => setPhase("done"), openMs + revealMs))
    setPhase("opening")
  }, [phase, variant, onRevealed])

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
    },
    [],
  )

  /** Tap oriunde: sare la final. Nimeni nu trebuie sa astepte o animatie. */
  function skip() {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setPhase("done")
  }

  const words = verseText.trim().split(/\s+/)
  const perLine = Math.max(5, Math.ceil(words.length / 3))
  const lines: string[] = []
  for (let i = 0; i < words.length; i += perLine) {
    lines.push(words.slice(i, i + perLine).join(" "))
  }

  const revealed = phase === "revealing" || phase === "done"

  return (
    <div
      className={`reveal reveal--${variant} reveal--${phase}`}
      onClick={phase === "done" ? undefined : skip}
      role={phase === "done" ? undefined : "button"}
      tabIndex={phase === "done" ? undefined : 0}
      onKeyDown={(e) => {
        if (phase !== "done" && (e.key === "Enter" || e.key === " ")) skip()
      }}
      aria-label={phase === "done" ? undefined : "Arată versetul acum"}
    >
      {variant === "scroll" && <ScrollStage phase={phase} />}
      {variant === "lamp" && <LampStage phase={phase} walkedDays={walkedDays} />}

      <div className="reveal__text" aria-live="polite">
        <p className="reveal__verse scripture">
          {lines.map((line, i) => (
            <span
              key={i}
              className={`reveal__line ${revealed ? "is-in" : ""}`}
              style={{ animationDelay: `${i * LINE_STAGGER_MS}ms` }}
            >
              {line}{" "}
            </span>
          ))}
        </p>
        <p className={`reveal__ref ${revealed ? "is-in" : ""}`}>{verseRef}</p>

        {variant === "lamp" && stepText ? (
          <p className={`reveal__step ${phase === "done" ? "is-in" : ""}`}>
            <span className="reveal__step-label">Pasul de azi</span>
            {stepText}
          </p>
        ) : null}
      </div>

      {phase !== "done" ? <span className="reveal__hint muted">atinge ecranul</span> : null}
    </div>
  )
}

/** Sulul: snurul cade, sulul se desfasoara, lumina calda urca peste text. */
function ScrollStage({ phase }: { phase: Phase }) {
  return (
    <div className="reveal__stage" aria-hidden="true">
      <svg className="reveal__scroll" viewBox="0 0 320 200" role="presentation">
        <defs>
          <radialGradient id="revealGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffe9c2" stopOpacity="0" />
          </radialGradient>
          <filter id="revealBlur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* lumina calda din spatele sulului */}
        <circle
          className="reveal__glow"
          cx="160"
          cy="95"
          r="90"
          fill="url(#revealGlow)"
          filter="url(#revealBlur)"
        />

        {/* foaia care se desfasoara: masca de inaltime prin CSS */}
        <rect className="reveal__sheet" x="46" y="28" width="228" height="140" rx="4" />

        {/* rulourile de sus si de jos */}
        <rect className="reveal__rod" x="38" y="20" width="244" height="12" rx="6" />
        <rect className="reveal__rod reveal__rod--bottom" x="38" y="164" width="244" height="12" rx="6" />

        {/* snurul care cade la inceput */}
        <path className="reveal__cord" d="M160 14 C 150 30, 170 40, 160 56" fill="none" />

        {/* praf in lumina */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={i}
            className="reveal__dust"
            cx={70 + i * 26}
            cy={140 - (i % 3) * 18}
            r={1.4}
            style={{ animationDelay: `${300 + i * 120}ms` }}
          />
        ))}
      </svg>
      <span className={`reveal__shadow reveal__shadow--${phase}`} />
    </div>
  )
}

/**
 * Candela: flacara arde, cercul de lumina creste si dezvaluie DOAR piatra
 * urmatoare, cu conturul unui pas pe ea. Restul drumului ramane in intuneric —
 * lumina nu dezvaluie niciodata tot drumul (docs/27 §4.6).
 */
function LampStage({ phase, walkedDays }: { phase: Phase; walkedDays: number }) {
  const behind = Math.max(0, Math.min(5, walkedDays))
  return (
    <div className="reveal__stage" aria-hidden="true">
      <svg className="reveal__lamp" viewBox="0 0 320 200" role="presentation">
        <defs>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd89b" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#ffb865" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffb865" stopOpacity="0" />
          </radialGradient>
          <filter id="lampBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* drumul, aproape invizibil */}
        <path className="reveal__road" d="M20 178 C 110 170, 200 156, 300 132" fill="none" />

        {/* pietrele deja calcate, in urma */}
        {Array.from({ length: behind }).map((_, i) => (
          <ellipse
            key={i}
            className="reveal__stone reveal__stone--walked"
            cx={38 + i * 26}
            cy={176 - i * 2}
            rx="9"
            ry="4"
          />
        ))}

        {/* cercul de lumina al candelei */}
        <circle
          className="reveal__lampglow"
          cx="196"
          cy="156"
          r="52"
          fill="url(#lampGlow)"
          filter="url(#lampBlur)"
        />

        {/* piatra urmatoare, singura luminata, cu conturul unui pas */}
        <ellipse className="reveal__stone reveal__stone--next" cx="196" cy="158" rx="16" ry="7" />
        <path
          className="reveal__foot"
          d="M190 158 c0 -5 3 -8 6 -8 s6 3 6 8 c0 4 -3 6 -6 6 s-6 -2 -6 -6 z"
          fill="none"
        />

        {/* candela: corp, fitil, flacara din doua straturi */}
        <path className="reveal__lampbody" d="M96 152 h44 l-8 14 h-28 z" />
        <path className="reveal__wick" d="M118 152 v-8" fill="none" />
        <path className="reveal__flame reveal__flame--outer" d="M118 128 c8 8 6 16 0 16 s-8 -8 0 -16 z" />
        <path className="reveal__flame reveal__flame--inner" d="M118 134 c4 5 3 10 0 10 s-4 -5 0 -10 z" />
      </svg>
      <span className={`reveal__shadow reveal__shadow--${phase}`} />
    </div>
  )
}

export default ScriptureReveal
