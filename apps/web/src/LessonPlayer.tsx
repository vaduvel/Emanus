import { useState } from "react"
import type { Lesson, LessonStep } from "@emanus/shared"

export function LessonPlayer({
  lesson,
  onComplete
}: {
  lesson: Lesson
  onComplete: () => void
}) {
  const [i, setI] = useState(0)
  const steps = lesson.steps
  const step = steps[i]
  const isLast = i >= steps.length - 1

  return (
    <section className="player">
      <header className="player__head">
        <h1>{lesson.title}</h1>
        <p className="muted">
          {lesson.memoryVerseRef} · ~{lesson.estMinutes} min
        </p>
      </header>

      <div className="stage">
        <StepView step={step} />
      </div>

      <footer className="player__foot">
        <span className="muted">
          Pas {i + 1}/{steps.length}
        </span>
        {isLast ? (
          <button onClick={onComplete}>Termină</button>
        ) : (
          <button onClick={() => setI((n) => n + 1)}>Mai departe</button>
        )}
      </footer>
    </section>
  )
}

function StepView({ step }: { step: LessonStep }) {
  switch (step.type) {
    case "scripture":
      return (
        <blockquote className="scripture">
          “{step.scripture?.text}”
          <cite>{step.scripture?.ref}</cite>
        </blockquote>
      )
    case "choice":
      return (
        <div className="choice">
          <p>{step.choice?.prompt}</p>
          <div className="choice__opts">
            {step.choice?.options.map((o) => (
              <button key={o.id} className="ghost">
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )
    case "quiz":
      return (
        <div className="quiz">
          <p>{step.quiz?.question}</p>
          {step.quiz?.options.map((o, k) => (
            <button key={k} className="ghost">
              {o.text}
            </button>
          ))}
        </div>
      )
    case "journal":
      return (
        <div className="journal">
          <p>{step.journalPrompt}</p>
          <textarea placeholder="Scrie aici… (privat)" rows={4} />
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
