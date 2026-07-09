import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Baby,
  BookOpen,
  Crown,
  Feather,
  Flame,
  Flower2,
  Headphones,
  Heart,
  Home,
  Leaf,
  Mountain,
  Palette,
  ScrollText,
  Sprout,
  Star,
  Swords,
} from "lucide-react"
import type { DiagnosticQuestion, FaithStage } from "@emanus/shared"
import { FAITH_STAGES } from "@emanus/shared"
import { createUser, getDiagnostic, submitDiagnostic } from "./api"
import { setCategory, setFaithStage, setOnboarded, setUserId } from "./session"

const CATEGORIES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "kids0_5", label: "Copii 0–5", icon: Baby },
  { id: "kids6_11", label: "Copii 6–11", icon: Palette },
  { id: "teens12_18", label: "Adolescenți 12–18", icon: Flame },
  { id: "women", label: "Femei", icon: Flower2 },
  { id: "men", label: "Bărbați", icon: Swords },
  { id: "parents", label: "Părinți", icon: Home },
  { id: "grandparents", label: "Bunici", icon: Leaf },
  { id: "couples", label: "Soț-Soție", icon: Heart },
  { id: "doctrine", label: "Doctrină", icon: ScrollText },
]

const AVATARS: { key: string; icon: LucideIcon }[] = [
  { key: "sprout", icon: Sprout },
  { key: "feather", icon: Feather },
  { key: "crown", icon: Crown },
  { key: "star", icon: Star },
  { key: "flame", icon: Flame },
  { key: "headphones", icon: Headphones },
  { key: "book", icon: BookOpen },
  { key: "mountain", icon: Mountain },
]

const LIKERT = [1, 2, 3, 4, 5]

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [categoryId, setCategoryId] = useState("teens12_18")
  const [faith, setFaith] = useState<FaithStage>("seeking")
  const [anonName, setAnonName] = useState("")
  const [avatar, setAvatar] = useState("sprout")
  const [consent, setConsent] = useState(false)
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (step === 4 && questions.length === 0) {
      getDiagnostic(categoryId)
        .then((d) => setQuestions(d.questions))
        .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
    }
  }, [step, categoryId, questions.length])

  const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id] !== undefined)

  async function finish() {
    setBusy(true)
    setError(null)
    try {
      const user = await createUser({
        anonName: anonName.trim(),
        avatar,
        categoryId,
        consent: { accepted: true, at: new Date().toISOString() },
      })
      setUserId(user.id)
      setCategory(categoryId)
      setFaithStage(faith)
      await submitDiagnostic(categoryId, answers)
      setOnboarded()
      onDone()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setBusy(false)
    }
  }

  return (
    <section className="onboarding">
      <div className="onboarding__progress">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={i <= step ? "on" : ""} />
        ))}
      </div>

      {error && <p className="error">{error}</p>}

      {step === 0 && (
        <div className="onboarding__step">
          <h1>Bine ai venit</h1>
          <p className="muted">Pentru cine este călătoria aceasta?</p>
          <div className="chips">
            {CATEGORIES.map((c) => {
              const Glyph = c.icon
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`chip${categoryId === c.id ? " picked" : ""}`}
                  onClick={() => setCategoryId(c.id)}
                >
                  <span className="chip__emoji">
                    <Glyph size={18} strokeWidth={1.8} aria-hidden />
                  </span>
                  {c.label}
                </button>
              )
            })}
          </div>
          <button type="button" onClick={() => setStep(1)}>
            Continuă
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="onboarding__step">
          <h1>Unde ești cu Dumnezeu acum?</h1>
          <p className="muted">
            Nu contează de unde pornești — aceeași ușă, pentru oricine. Așa știm cum să-ți vorbim.
          </p>
          <div className="faith-list">
            {FAITH_STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`faith-opt${faith === s.id ? " picked" : ""}`}
                onClick={() => setFaith(s.id)}
              >
                <span>
                  <span className="faith-opt__label">{s.label}</span>
                  <span className="faith-opt__blurb">{s.blurb}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="onboarding__nav">
            <button type="button" className="ghost" onClick={() => setStep(0)}>
              Înapoi
            </button>
            <button type="button" onClick={() => setStep(2)}>
              Continuă
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="onboarding__step">
          <h1>Cum să-ți spunem?</h1>
          <p className="muted">Un nume (poate fi anonim) și un avatar.</p>
          <input
            className="text-input"
            value={anonName}
            onChange={(e) => setAnonName(e.target.value)}
            placeholder="Numele tău sau o poreclă"
            maxLength={24}
          />
          <div className="avatars">
            {AVATARS.map((a) => {
              const Glyph = a.icon
              return (
                <button
                  key={a.key}
                  type="button"
                  className={`avatar${avatar === a.key ? " picked" : ""}`}
                  onClick={() => setAvatar(a.key)}
                  aria-label={a.key}
                >
                  <Glyph size={22} strokeWidth={1.8} aria-hidden />
                </button>
              )
            })}
          </div>
          <div className="onboarding__nav">
            <button type="button" className="ghost" onClick={() => setStep(1)}>
              Înapoi
            </button>
            <button type="button" disabled={!anonName.trim()} onClick={() => setStep(3)}>
              Continuă
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="onboarding__step">
          <h1>Un spațiu sigur</h1>
          <p className="muted">
            Jurnalul tău e privat. Nu afișăm reclame și nu urmărim minorii. Poți pleca oricând.
          </p>
          <label className="consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>Sunt de acord cu termenii și cu prelucrarea datelor pentru contul meu.</span>
          </label>
          <div className="onboarding__nav">
            <button type="button" className="ghost" onClick={() => setStep(2)}>
              Înapoi
            </button>
            <button type="button" disabled={!consent} onClick={() => setStep(4)}>
              Continuă
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="onboarding__step">
          <h1>Unde ești acum?</h1>
          <p className="muted">
            Fără răspunsuri corecte sau greșite — doar punctul tău de plecare. Așa vezi mai târziu
            cât ai crescut.
          </p>
          {questions.length === 0 && !error && <p className="muted">Se încarcă…</p>}
          <div className="diagnostic">
            {questions.map((q) => (
              <div key={q.id} className="diag-q">
                <p>{q.prompt}</p>
                <div className="likert">
                  {LIKERT.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`likert__dot${answers[q.id] === v ? " picked" : ""}`}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="likert__legend muted">
                  <span>Deloc</span>
                  <span>Total</span>
                </div>
              </div>
            ))}
          </div>
          <div className="onboarding__nav">
            <button type="button" className="ghost" onClick={() => setStep(3)}>
              Înapoi
            </button>
            <button type="button" disabled={!allAnswered || busy} onClick={finish}>
              {busy ? "Se pregătește…" : "Începe călătoria"}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
