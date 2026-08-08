// Legamantul familiei (docs/27 §6, faza G).
//
// Nu e un formular de aplicatie religioasa: patru pasi scurti, un text care se
// citeste cu voce tare si se pune pe frigider. Nu se numara zilele, nu exista
// serie si nimeni nu e mustrat daca familia uita o zi — de aceea pasul patru
// intreaba dinainte ce faceti cand cadeti (docs/20 §1).
import { useState } from "react"
import {
  FAMILY_COVENANT_STEPS,
  FAMILY_COVENANT_VERSE_REF,
  FAMILY_COVENANT_VERSE_TEXT,
  FAMILY_THEMES,
  familyCovenantIssues,
  familyCovenantText,
  getFamilyTheme,
  type FamilyCovenantDraft,
} from "@emanus/shared"
import { ScriptureReveal } from "../components/ScriptureReveal"
import {
  clearFamilyCovenant,
  familyCovenant,
  familyCovenantDraft,
  saveFamilyCovenant,
} from "../dailyGifts"
import { navigate } from "../router"

export default function Legamant() {
  const [saved, setSaved] = useState(() => familyCovenant())
  const [draft, setDraft] = useState<FamilyCovenantDraft>(() => familyCovenantDraft())
  const [tried, setTried] = useState(false)

  const issues = familyCovenantIssues(draft)
  const theme = getFamilyTheme(draft.themeId)

  function setName(i: number, value: string) {
    const names = [...draft.names]
    names[i] = value
    setDraft({ ...draft, names })
  }

  function addName() {
    setDraft({ ...draft, names: [...draft.names, ""] })
  }

  function save() {
    setTried(true)
    if (issues.length > 0) return
    const text = familyCovenantText(draft, theme)
    saveFamilyCovenant(draft, text)
    setSaved({ draft, text, at: new Date().toISOString() })
  }

  function rescrie() {
    clearFamilyCovenant()
    setSaved(null)
    setTried(false)
  }

  if (saved) {
    return (
      <section className="today">
        <button className="today__back ghost" onClick={() => navigate("/devotional")}>
          ← Devotional
        </button>
        <p className="today__kicker">Legamantul familiei</p>

        <ScriptureReveal
          variant="scroll"
          verseText={FAMILY_COVENANT_VERSE_TEXT}
          verseRef={FAMILY_COVENANT_VERSE_REF}
        />

        <div className="today__main">
          {saved.text.split("\n").map((line, i) => (
            <p key={i} className={i === 0 ? "today__promise" : undefined}>
              {line}
            </p>
          ))}
        </div>

        <p className="muted">
          Cititi-l cu voce tare, o data, impreuna. Apoi puneti-l undeva la vedere.
        </p>

        <div className="today__invite-actions">
          <button className="ghost" onClick={rescrie}>
            Il rescriem
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="today">
      <button className="today__back ghost" onClick={() => navigate("/devotional")}>
        ← Devotional
      </button>
      <p className="today__kicker">Legamantul familiei</p>
      <p className="today__invite">
        Patru raspunsuri scurte. Se face in zece minute, la masa.
      </p>

      {/* 1. Cine suntem */}
      <div className="today__main">
        <h2>{FAMILY_COVENANT_STEPS[0].title}</h2>
        <p className="muted">{FAMILY_COVENANT_STEPS[0].body}</p>
        {draft.names.map((name, i) => (
          <input
            key={i}
            className="journal"
            value={name}
            placeholder="Nume"
            onChange={(e) => setName(i, e.target.value)}
          />
        ))}
        <button className="ghost" onClick={addName}>
          Mai adaug pe cineva
        </button>

        {/* 2. Ce alegem */}
        <h2>{FAMILY_COVENANT_STEPS[1].title}</h2>
        <p className="muted">{FAMILY_COVENANT_STEPS[1].body}</p>
        <div className="today__chips">
          {FAMILY_THEMES.map((t) => (
            <button
              key={t.id}
              className={t.id === draft.themeId ? "today__switch today__switch--on" : "today__switch"}
              onClick={() => setDraft({ ...draft, themeId: t.id })}
            >
              {t.title}
            </button>
          ))}
        </div>
        {theme ? (
          <p className="scripture">
            „{theme.verseText}” ({theme.verseRef}) — {theme.focus}
          </p>
        ) : null}

        {/* 3. Ce promitem */}
        <h2>{FAMILY_COVENANT_STEPS[2].title}</h2>
        <p className="muted">{FAMILY_COVENANT_STEPS[2].body}</p>
        <textarea
          className="journal"
          rows={2}
          value={draft.promise}
          placeholder="Ex.: In fiecare seara citim un verset si spunem un multumesc."
          onChange={(e) => setDraft({ ...draft, promise: e.target.value })}
        />

        {/* 4. Ce facem cand cadem */}
        <h2>{FAMILY_COVENANT_STEPS[3].title}</h2>
        <p className="muted">{FAMILY_COVENANT_STEPS[3].body}</p>
        <textarea
          className="journal"
          rows={2}
          value={draft.onFall}
          onChange={(e) => setDraft({ ...draft, onFall: e.target.value })}
        />
      </div>

      {tried && issues.length > 0 ? (
        <ul className="muted">
          {issues.map((issue) => (
            <li key={issue.field}>{issue.message}</li>
          ))}
        </ul>
      ) : null}

      <button className="today__cta" onClick={save}>
        Facem legamantul
      </button>
    </section>
  )
}
