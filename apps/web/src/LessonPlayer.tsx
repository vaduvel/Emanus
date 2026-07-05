import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Brain,
  Flame,
  Footprints,
  Frown,
  HandHeart,
  HeartCrack,
  Laugh,
  Lightbulb,
  Meh,
  MessageCircle,
  MessageSquare,
  NotebookPen,
  PartyPopper,
  Smile,
} from "lucide-react"
import type { ChoiceOption, Lesson, LessonStep } from "@emanus/shared"

export interface LessonResult {
  choicesMade: Record<string, string>
  journal: string
}

const GUIDE_NAME = "Daniel"

/** Icon pe tip de beat (workbook §1): conversație cu bule tipizate. */
function stepIcon(type: LessonStep["type"]): LucideIcon {
  switch (type) {
    case "scripture":
      return BookOpen
    case "memory_verse":
      return Brain
    case "prayer":
      return HandHeart
    case "step":
      return Footprints
    case "journal":
      return NotebookPen
    case "reward":
      return Flame
    default:
      return MessageCircle
  }
}

/**
 * Player de lecție conversațional (workbook §1 + §6).
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
    for (const s of lesson.steps)
      for (const o of s.choice?.options ?? [])
        if (o.branchStepId) branchTargetIds.add(o.branchStepId)
    const byId = new Map(lesson.steps.map((s) => [s.id, s] as const))
    const main = lesson.steps
      .filter((s) => !branchTargetIds.has(s.id))
      .sort((a, b) => a.order - b.order)
    return { mainSteps: main, stepById: byId }
  }, [lesson])

  const [revealed, setRevealed] = useState<LessonStep[]>(() =>
    mainSteps.length ? [mainSteps[0]] : [],
  )
  const [mainIdx, setMainIdx] = useState(0)
  const [choices, setChoices] = useState<Record<string, string>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [journal, setJournal] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [revealed.length])

  const current: LessonStep | undefined = revealed[revealed.length - 1]
  const inBranch = current ? !mainSteps.includes(current) : false
  const atLastMain = mainIdx >= mainSteps.length - 1

  function toNextMain(nextChoices = choices) {
    if (atLastMain) {
      onComplete({ choicesMade: nextChoices, journal })
      return
    }
    const ni = mainIdx + 1
    setMainIdx(ni)
    setRevealed((r) => [...r, mainSteps[ni]])
  }

  function advance() {
    toNextMain()
  }

  function pickChoice(step: LessonStep, opt: ChoiceOption) {
    if (choices[step.id]) return
    const next = { ...choices, [step.id]: opt.id }
    setChoices(next)
    if (opt.branchStepId && stepById.has(opt.branchStepId)) {
      const branch = stepById.get(opt.branchStepId)!
      setRevealed((r) => [...r, branch])
      return
    }
    toNextMain(next)
  }

  if (!current) {
    return (
      <section className="player">
        <p className="muted">Lecția nu are pași încă.</p>
      </section>
    )
  }

  const total = Math.max(1, mainSteps.length)
  const stepNo = Math.min(mainIdx + 1, total)
  const progressStyle: CSSProperties = { width: `${(stepNo / total) * 100}%` }
  const quizAnswered = current.type !== "quiz" || quizAnswers[current.id] !== undefined
  const showContinue = current.type !== "choice" && quizAnswered
  const continueLabel = atLastMain && !inBranch ? "Termină lecția" : "Continuă"

  return (
    <section className="player">
      <header className="player__head">
        <h1>{lesson.title}</h1>
        <p className="muted">
          {lesson.memoryVerseRef} · ~{lesson.estMinutes} min
        </p>
        <div className="progress" aria-hidden="true">
          <span style={progressStyle} />
        </div>
      </header>

      <div className="chat" ref={scrollRef}>
        {revealed.map((s, i) => (
          <Turn
            key={`${s.id}@${i}`}
            step={s}
            lesson={lesson}
            isCurrent={i === revealed.length - 1}
            pickedOptionId={choices[s.id]}
            quizAnswerIdx={quizAnswers[s.id]}
            journal={journal}
            onJournal={setJournal}
            onQuiz={(idx) => setQuizAnswers((q) => ({ ...q, [s.id]: idx }))}
            onPick={(opt) => pickChoice(s, opt)}
          />
        ))}
      </div>

      <footer className="player__foot">
        <span className="muted">
          {inBranch ? "↪ un gând în plus" : `Pas ${stepNo}/${total}`}
        </span>
        {showContinue && (
          <button onClick={advance} disabled={submitting}>
            {submitting ? "Se salvează…" : continueLabel}
          </button>
        )}
      </footer>
    </section>
  )
}

function GuideMsg({ icon: Glyph, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="msg msg--guide">
      <div className="msg__avatar">
        <Glyph size={18} strokeWidth={1.8} aria-hidden />
      </div>
      <div className="msg__body">
        <span className="msg__name">{GUIDE_NAME}</span>
        <div className="bubble">{text}</div>
      </div>
    </div>
  )
}

function Turn({
  step,
  lesson,
  isCurrent,
  pickedOptionId,
  quizAnswerIdx,
  onQuiz,
  journal,
  onJournal,
  onPick,
}: {
  step: LessonStep
  lesson: Lesson
  isCurrent: boolean
  pickedOptionId?: string
  quizAnswerIdx?: number
  onQuiz: (idx: number) => void
  journal: string
  onJournal: (v: string) => void
  onPick: (opt: ChoiceOption) => void
}) {
  switch (step.type) {
    case "scripture":
    case "memory_verse":
      return (
        <div className="msg msg--guide">
          <div className="msg__avatar">
            {step.type === "memory_verse" ? (
              <Brain size={18} strokeWidth={1.8} aria-hidden />
            ) : (
              <BookOpen size={18} strokeWidth={1.8} aria-hidden />
            )}
          </div>
          <blockquote className="scripture">
            {step.scripture ? `„${step.scripture.text}”` : `„${lesson.memoryVerseRef}”`}
            <cite>{step.scripture?.ref ?? lesson.memoryVerseRef}</cite>
          </blockquote>
        </div>
      )

    case "prayer":
      return (
        <div className="msg msg--guide">
          <div className="msg__avatar">
            <HandHeart size={18} strokeWidth={1.8} aria-hidden />
          </div>
          <div className="bubble">
            {(step.bubbles ?? []).map((b) => b.text).join(" ") || "Rugăciune"}
          </div>
        </div>
      )

    case "check_in":
      return (
        <>
          {(step.bubbles ?? []).map((b, k) => (
            <GuideMsg key={k} icon={MessageCircle} text={b.text} />
          ))}
          {isCurrent && <MoodChips />}
        </>
      )

    case "choice": {
      const picked = step.choice?.options.find((o) => o.id === pickedOptionId)
      return (
        <>
          {step.choice?.prompt && <GuideMsg icon={MessageSquare} text={step.choice.prompt} />}
          {picked ? (
            <div className="msg msg--me">
              <div className="bubble bubble--me">{picked.label}</div>
            </div>
          ) : (
            <div className="choice__opts">
              {step.choice?.options.map((o) => (
                <button key={o.id} className="ghost" onClick={() => onPick(o)}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </>
      )
    }

    case "quiz": {
      const answered = quizAnswerIdx !== undefined
      return (
        <>
          <GuideMsg icon={MessageCircle} text={step.quiz?.question ?? ""} />
          <div className="quiz">
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
          </div>
          {answered && step.quiz?.explanation && (
            <div className="msg msg--guide">
              <div className="msg__avatar">
                <Lightbulb size={18} strokeWidth={1.8} aria-hidden />
              </div>
              <div className="bubble">{step.quiz.explanation}</div>
            </div>
          )}
        </>
      )
    }

    case "journal":
      return (
        <>
          <GuideMsg icon={NotebookPen} text={step.journalPrompt ?? ""} />
          {isCurrent ? (
            <div className="journal">
              <textarea
                value={journal}
                onChange={(e) => onJournal(e.target.value)}
                placeholder="Scrie aici… (privat, doar pentru tine)"
                rows={4}
              />
            </div>
          ) : journal ? (
            <div className="msg msg--me">
              <div className="bubble bubble--me">{journal}</div>
            </div>
          ) : null}
        </>
      )

    case "reward":
      return (
        <div className="msg msg--guide">
          <div className="msg__avatar">
            <Flame size={18} strokeWidth={1.8} aria-hidden />
          </div>
          <div className="bubble title-icon">
            <PartyPopper size={16} strokeWidth={1.8} aria-hidden />{" "}
            {step.reward ? `+${step.reward.xp} XP` : "Recompensă"}
            {step.reward?.badgeId ? " · insignă nouă" : ""}
          </div>
        </div>
      )

    default:
      return (
        <>
          {(step.bubbles ?? []).map((b, k) => (
            <GuideMsg key={k} icon={stepIcon(step.type)} text={b.text} />
          ))}
        </>
      )
  }
}

function MoodChips() {
  const MOODS: { key: string; icon: LucideIcon; label: string }[] = [
    { key: "great", icon: Laugh, label: "grozav" },
    { key: "good", icon: Smile, label: "bine" },
    { key: "meh", icon: Meh, label: "așa și așa" },
    { key: "down", icon: Frown, label: "trist" },
    { key: "hard", icon: HeartCrack, label: "greu" },
  ]
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <div className="moods">
      {MOODS.map((m) => {
        const Glyph = m.icon
        return (
          <button
            key={m.key}
            type="button"
            className={`mood${picked === m.key ? " picked" : ""}`}
            onClick={() => setPicked(m.key)}
            aria-label={`stare ${m.label}`}
          >
            <Glyph size={22} strokeWidth={1.8} aria-hidden />
          </button>
        )
      })}
    </div>
  )
}
