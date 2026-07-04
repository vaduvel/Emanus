import { useMemo, useState } from "react"
import type { ChoiceOption, Lesson, LessonStep } from "@emanus/shared"

export interface LessonResult {
  choicesMade: Record<string, string>
  journal: string
}

/**
 * Player de lecție (workbook §6): redă cele 12+ beat-uri în ordine.
 * `choice` poate declanșa un branch (pas în afara firului principal), apoi
 * revine pe firul principal. Robust chiar dacă `branchStepId` nu există.
 */
export function LessonPlayer({
  lesson,
  onComplete,
  submitting = false,
}: {
  lesson: Lesson
  onComplete: (result: LessonResult) => void
  submitting?: boolean
}) {
  const { mainSteps, stepById } = useMemo(() => {
    const branchTargetIds = new Set<string>()
    for (const s of lesson.steps) {
      for (const o of s.choice?.options ?? []) {
        if (o.branchStepId) branchTargetIds.add(o.branchStepId)
      }
    }
    const byId = new Map(lesson.steps.map((s) => [s.id, s] as const))
    const main = lesson.steps
      .filter((s) => !branchTargetIds.has(s.id))
      .sort((a, b) => a.order - b.order)
    return { mainSteps: main, stepById: byId }
  }, [lesson])

  const [mainIdx, setMainIdx] = useState(0)
  const [branchId, setBranchId] = useState<string | null>(null)
  const [choices, setChoices] = useState<Record<string, string>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [journal, setJournal] = useState("")

  const current: LessonStep | undefined = branchId
    ? stepById.get(branchId)
    : mainSteps[mainIdx]
  const isLastMain = mainIdx >= mainSteps.length - 1

  function goNext() {
    if (branchId) {
      setBranchId(null)
      setMainIdx((n) => n + 1)
      return
    }
    if (isLastMain) {
      onComplete({ choicesMade: choices, journal })
      return
    }
    setMainIdx((n) => n + 1)
  }

  function pickChoice(step: LessonStep, opt: ChoiceOption) {
    const next = { ...choices, [step.id]: opt.id }
    setChoices(next)
    if (opt.branchStepId && stepById.has(opt.branchStepId)) {
      setBranchId(opt.branchStepId)
      return
    }
    if (isLastMain) onComplete({ choicesMade: next, journal })
    else setMainIdx((n) => n + 1)
  }

  if (!current) {
    return (
      <section className="player">
        <p className="muted">Lecția nu are pași încă.</p>
      </section>
    )
  }

  const total = mainSteps.length
  const stepNo = Math.min(mainIdx + 1, total)
  const answeredQuiz =
    current.type !== "quiz" || quizAnswers[current.id] !== undefined
  const showNext = current.type !== "choice" && answeredQuiz
  const nextLabel = !branchId && isLastMain ? "Termină" : "Mai departe"

  return (
    <section className="player">
      <header className="player__head">
        <h1>{lesson.title}</h1>
        <p className="muted">
          {lesson.memoryVerseRef} · ~{lesson.estMinutes} min
        </p>
        <div className="progress" aria-hidden="true">
          <span style={{ width: `${(stepNo / total) * 100}%` }} />
        </div>
      </header>

      <div className="stage" key={current.id}>
        <StepView
          step={current}
          lesson={lesson}
          selectedOptionId={choices[current.id]}
          quizAnswerIdx={quizAnswers[current.id]}
          journal={journal}
          onJournal={setJournal}
          onQuiz={(idx) =>
            setQuizAnswers((q) => ({ ...q, [current.id]: idx }))
          }
          onPick={(opt) => pickChoice(current, opt)}
        />
      </div>

      <footer className="player__foot">
        <span className="muted">
          {branchId ? "↪ un gând în plus" : `Pas ${stepNo}/${total}`}
        </span>
        {showNext && (
          <button onClick={goNext} disabled={submitting}>
            {submitting ? "Se salvează…" : nextLabel}
          </button>
        )}
      </footer>
    </section>
  )
}

function StepView({
  step,
  lesson,
  selectedOptionId,
  quizAnswerIdx,
  onQuiz,
  journal,
  onJournal,
  onPick,
}: {
  step: LessonStep
  lesson: Lesson
  selectedOptionId?: string
  quizAnswerIdx?: number
  onQuiz: (idx: number) => void
  journal: string
  onJournal: (v: string) => void
  onPick: (opt: ChoiceOption) => void
}) {
  switch (step.type) {
    case "check_in":
      return (
        <div className="bubbles">
          {(step.bubbles ?? []).map((b, k) => (
            <div key={k} className="bubble">
              {b.text}
            </div>
          ))}
          <MoodChips />
        </div>
      )

    case "scripture":
    case "memory_verse":
      return (
        <blockquote className="scripture">
          {step.scripture ? `„${step.scripture.text}”` : "Verset de memorat"}
          <cite>{step.scripture?.ref ?? lesson.memoryVerseRef}</cite>
        </blockquote>
      )

    case "choice":
      return (
        <div className="choice">
          {step.choice?.prompt && <p className="prompt">{step.choice.prompt}</p>}
          <div className="choice__opts">
            {step.choice?.options.map((o) => (
              <button
                key={o.id}
                className={`ghost${selectedOptionId === o.id ? " picked" : ""}`}
                onClick={() => onPick(o)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )

    case "quiz": {
      const answered = quizAnswerIdx !== undefined
      return (
        <div className="quiz">
          <p className="prompt">{step.quiz?.question}</p>
          {step.quiz?.options.map((o, k) => {
            let cls = ""
            if (answered) {
              if (o.correct) cls = " correct"
              else if (quizAnswerIdx === k) cls = " wrong"
            }
            return (
              <button
                key={k}
                className={`ghost${cls}`}
                disabled={answered}
                onClick={() => onQuiz(k)}
              >
                {o.text}
              </button>
            )
          })}
          {answered && step.quiz?.explanation && (
            <p className="explanation">{step.quiz.explanation}</p>
          )}
        </div>
      )
    }

    case "journal":
      return (
        <div className="journal">
          <p className="prompt">{step.journalPrompt}</p>
          <textarea
            value={journal}
            onChange={(e) => onJournal(e.target.value)}
            placeholder="Scrie aici… (privat, doar pentru tine)"
            rows={4}
          />
        </div>
      )

    case "reward":
      return (
        <div className="bubbles">
          <div className="bubble">
            🎉 {step.reward ? `+${step.reward.xp} XP` : "Recompensă"}
          </div>
        </div>
      )

    default:
      return (
        <div className="bubbles">
          {(step.bubbles ?? []).map((b, k) => (
            <div key={k} className="bubble">
              {b.text}
            </div>
          ))}
        </div>
      )
  }
}

function MoodChips() {
  const moods = ["😀", "🙂", "😐", "😔", "😢"]
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <div className="moods">
      {moods.map((m) => (
        <button
          key={m}
          type="button"
          className={`mood${picked === m ? " picked" : ""}`}
          onClick={() => setPicked(m)}
          aria-label={`stare ${m}`}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
