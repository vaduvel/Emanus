import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Brain,
  Check,
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
  ShieldCheck,
  Smile,
  Sunrise,
} from "lucide-react"
import type {
  ChoiceOption,
  Lesson,
  LessonAnswers,
  LessonStep,
} from "@emanus/shared/domain"
import type { LessonDraft } from "./journey"
import { privateTextNotice } from "./privacy"
import { navigate } from "./router"

export type LessonResult = LessonAnswers

const GUIDE_NAME = "Emanus"
const INTERACTION_TYPES = new Set<LessonStep["type"]>([
  "choice",
  "multi_choice",
  "reflection",
  "declaration",
  "check_in",
  "journal",
  "prayer",
  "step",
])

function emptyAnswers(): LessonAnswers {
  return {
    choicesMade: {},
    multiChoicesMade: {},
    checkIns: {},
    quizAnswers: {},
    textResponses: {},
  }
}

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
    case "reflection":
    case "declaration":
      return NotebookPen
    case "reward":
      return Sunrise
    default:
      return MessageCircle
  }
}

function readingDelay(text: string): number {
  return Math.max(700, Math.min(3600, 500 + text.length * 18))
}

function stepText(step: LessonStep): string {
  if (step.scripture) return `${step.scripture.text} ${step.scripture.ref}`
  if (step.quiz) return `${step.quiz.question} ${step.quiz.explanation}`
  return (step.bubbles ?? []).map((bubble) => bubble.text).join(" ")
}

function initialRevealed(
  draft: LessonDraft | undefined,
  stepById: Map<string, LessonStep>,
  first: LessonStep | undefined,
): LessonStep[] {
  const restored = (draft?.revealedStepIds ?? [])
    .map((id) => stepById.get(id))
    .filter((step): step is LessonStep => Boolean(step))
  if (restored.length > 0) return restored
  return first ? [first] : []
}

export function LessonPlayer({
  lesson,
  onComplete,
  onProgress,
  initialDraft,
  submitting = false,
}: {
  lesson: Lesson
  onComplete: (result: LessonResult) => void
  onProgress?: (draft: LessonDraft) => void
  initialDraft?: LessonDraft
  submitting?: boolean
}) {
  const { mainSteps, stepById } = useMemo(() => {
    const branchTargetIds = new Set<string>()
    for (const step of lesson.steps) {
      for (const option of step.choice?.options ?? []) {
        if (option.branchStepId) branchTargetIds.add(option.branchStepId)
      }
    }
    return {
      mainSteps: lesson.steps
        .filter((step) => !branchTargetIds.has(step.id))
        .sort((a, b) => a.order - b.order),
      stepById: new Map(lesson.steps.map((step) => [step.id, step] as const)),
    }
  }, [lesson])

  const restoredMainIdx = Math.max(
    0,
    mainSteps.findIndex((step) => step.id === initialDraft?.mainStepId),
  )
  const restoredAnswers = initialDraft ?? emptyAnswers()
  const [revealed, setRevealed] = useState<LessonStep[]>(() =>
    initialRevealed(initialDraft, stepById, mainSteps[0]),
  )
  const [mainIdx, setMainIdx] = useState(restoredMainIdx)
  const [choices, setChoices] = useState(restoredAnswers.choicesMade)
  const [multiChoices, setMultiChoices] = useState(restoredAnswers.multiChoicesMade)
  const [quizAnswers, setQuizAnswers] = useState(restoredAnswers.quizAnswers)
  const [checkIns, setCheckIns] = useState(restoredAnswers.checkIns)
  const [textResponses, setTextResponses] = useState(restoredAnswers.textResponses)
  const [bubbleCounts, setBubbleCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      (initialDraft?.revealedStepIds ?? []).map((id) => [
        id,
        stepById.get(id)?.bubbles?.length ?? 0,
      ]),
    ),
  )
  const [autoPaused, setAutoPaused] = useState(false)
  const [safetyAccepted, setSafetyAccepted] = useState(!lesson.safety)
  const scrollRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [revealed.length, bubbleCounts, quizAnswers, checkIns, textResponses])

  const current = revealed[revealed.length - 1]
  const inBranch = current ? !mainSteps.includes(current) : false
  const atLastMain = mainIdx >= mainSteps.length - 1

  const answers = useMemo<LessonAnswers>(
    () => ({
      choicesMade: choices,
      multiChoicesMade: multiChoices,
      checkIns,
      quizAnswers,
      textResponses,
    }),
    [choices, multiChoices, checkIns, quizAnswers, textResponses],
  )

  useEffect(() => {
    if (!onProgress || !current || completedRef.current) return
    const timer = window.setTimeout(() => {
      onProgress({
        ...answers,
        mainStepId: mainSteps[mainIdx]?.id ?? current.id,
        revealedStepIds: revealed.map((step) => step.id),
        updatedAt: new Date().toISOString(),
      })
    }, 500)
    return () => window.clearTimeout(timer)
  }, [answers, current, mainIdx, mainSteps, onProgress, revealed])

  const finishLesson = useCallback(
    (nextAnswers: LessonAnswers) => {
      completedRef.current = true
      onComplete(nextAnswers)
    },
    [onComplete],
  )

  const toNextMain = useCallback(
    (nextAnswers: LessonAnswers = answers) => {
      if (atLastMain) {
        finishLesson(nextAnswers)
        return
      }
      const nextIndex = mainIdx + 1
      const nextStep = mainSteps[nextIndex]
      if (!nextStep) {
        finishLesson(nextAnswers)
        return
      }
      setMainIdx(nextIndex)
      setRevealed((steps) => [...steps, nextStep])
    },
    [answers, atLastMain, finishLesson, mainIdx, mainSteps],
  )

  const advance = useCallback(() => toNextMain(), [toNextMain])

  function pickChoice(step: LessonStep, option: ChoiceOption) {
    if (choices[step.id]) return
    const nextChoices = { ...choices, [step.id]: option.id }
    const nextAnswers = { ...answers, choicesMade: nextChoices }
    setChoices(nextChoices)
    const branchStep = option.branchStepId
      ? stepById.get(option.branchStepId)
      : undefined
    if (branchStep) {
      setRevealed((steps) => [...steps, branchStep])
      return
    }
    toNextMain(nextAnswers)
  }

  function pickMood(step: LessonStep, mood: string) {
    if (checkIns[step.id]) return
    setCheckIns((values) => ({ ...values, [step.id]: mood }))
  }

  function toggleMultiChoice(step: LessonStep, optionId: string) {
    const picked = multiChoices[step.id] ?? []
    const max = step.multiChoice?.maxSelections
    const next = picked.includes(optionId)
      ? picked.filter((id) => id !== optionId)
      : max && picked.length >= max
        ? picked
        : [...picked, optionId]
    setMultiChoices((values) => ({ ...values, [step.id]: next }))
  }

  function confirmMultiChoice(step: LessonStep) {
    const picked = multiChoices[step.id] ?? []
    toNextMain({
      ...answers,
      multiChoicesMade: { ...multiChoices, [step.id]: picked },
    })
  }

  function finishText(step: LessonStep, skip = false) {
    const nextText = skip
      ? Object.fromEntries(
          Object.entries(textResponses).filter(([stepId]) => stepId !== step.id),
        )
      : textResponses
    if (skip) setTextResponses(nextText)
    toNextMain({ ...answers, textResponses: nextText })
  }

  useEffect(() => {
    if (!current || autoPaused || submitting || !safetyAccepted) return
    const bubbles = current.bubbles ?? []
    const shown = bubbleCounts[current.id] ?? (bubbles.length ? 1 : 0)
    if (shown < bubbles.length) {
      const previous = bubbles[Math.max(0, shown - 1)]?.text ?? ""
      const timer = window.setTimeout(
        () =>
          setBubbleCounts((counts) => ({
            ...counts,
            [current.id]: shown + 1,
          })),
        readingDelay(previous),
      )
      return () => window.clearTimeout(timer)
    }
    if (current.type === "quiz") {
      if (quizAnswers[current.id] === undefined) return
      const timer = window.setTimeout(
        advance,
        readingDelay(current.quiz?.explanation ?? ""),
      )
      return () => window.clearTimeout(timer)
    }
    if (current.type === "check_in") {
      if (!checkIns[current.id]) return
      const timer = window.setTimeout(advance, 650)
      return () => window.clearTimeout(timer)
    }
    if (INTERACTION_TYPES.has(current.type)) return
    const timer = window.setTimeout(advance, readingDelay(stepText(current)))
    return () => window.clearTimeout(timer)
  }, [
    advance,
    autoPaused,
    bubbleCounts,
    checkIns,
    current,
    quizAnswers,
    safetyAccepted,
    submitting,
  ])

  if (!safetyAccepted && lesson.safety) {
    return (
      <SafetyGate
        notice={lesson.safety.notice}
        onContinue={() => setSafetyAccepted(true)}
      />
    )
  }

  if (!current) {
    return (
      <section className="player">
        <p className="muted">Lecția nu are pași încă.</p>
      </section>
    )
  }

  const visibleBubbleCount =
    bubbleCounts[current.id] ?? Math.min(1, current.bubbles?.length ?? 0)
  const interactionReady =
    visibleBubbleCount >= (current.bubbles?.length ?? 0)

  return (
    <section className="player">
      <header className="player__head">
        <div>
          <p className="player__eyebrow">Conversație ghidată</p>
          <h1>{lesson.title}</h1>
          <p className="muted">
            {lesson.memoryVerseRef} · aproximativ {lesson.estMinutes} min
          </p>
        </div>
      </header>

      <div className="chat" ref={scrollRef} aria-live="polite">
        {revealed.map((step, index) => (
          <Turn
            key={`${step.id}@${index}`}
            step={step}
            lesson={lesson}
            isCurrent={index === revealed.length - 1}
            visibleBubbleCount={
              step.id === current.id
                ? visibleBubbleCount
                : (step.bubbles?.length ?? 0)
            }
            interactionReady={
              index !== revealed.length - 1 || interactionReady
            }
            pickedOptionId={choices[step.id]}
            pickedMultiOptionIds={multiChoices[step.id] ?? []}
            pickedMoodId={checkIns[step.id]}
            quizAnswerIdx={quizAnswers[step.id]}
            textResponse={textResponses[step.id] ?? ""}
            onText={(value) =>
              setTextResponses((values) => ({
                ...values,
                [step.id]: value,
              }))
            }
            onTextDone={(skip) => finishText(step, skip)}
            onExerciseDone={advance}
            onQuiz={(answerIndex) =>
              setQuizAnswers((values) => ({
                ...values,
                [step.id]: answerIndex,
              }))
            }
            onMood={(mood) => pickMood(step, mood)}
            onPick={(option) => pickChoice(step, option)}
            onMultiPick={(optionId) => toggleMultiChoice(step, optionId)}
            onMultiDone={() => confirmMultiChoice(step)}
          />
        ))}
      </div>

      <footer className="player__foot">
        <span className="muted">
          {inBranch ? "Un răspuns pentru alegerea ta" : "Ia-ți timpul de care ai nevoie"}
        </span>
        <button
          type="button"
          className="ghost player__pause"
          onClick={() => setAutoPaused((paused) => !paused)}
        >
          {autoPaused ? "Continuă conversația" : "Pauză"}
        </button>
      </footer>
    </section>
  )
}

function EmanusAvatar() {
  return (
    <span className="msg__avatar" aria-hidden>
      <img src="/favicon.svg" alt="" />
    </span>
  )
}

function GuideMsg({
  icon: Glyph,
  text,
}: {
  icon?: LucideIcon
  text: string
}) {
  return (
    <div className="msg msg--guide">
      <EmanusAvatar />
      <div className="msg__body">
        <span className="msg__name">{GUIDE_NAME}</span>
        <div className="bubble">
          {Glyph ? <Glyph className="bubble__icon" size={16} aria-hidden /> : null}
          <span>{text}</span>
        </div>
      </div>
    </div>
  )
}

function Turn({
  step,
  lesson,
  isCurrent,
  visibleBubbleCount,
  interactionReady,
  pickedOptionId,
  pickedMultiOptionIds,
  pickedMoodId,
  quizAnswerIdx,
  onQuiz,
  textResponse,
  onText,
  onTextDone,
  onExerciseDone,
  onMood,
  onPick,
  onMultiPick,
  onMultiDone,
}: {
  step: LessonStep
  lesson: Lesson
  isCurrent: boolean
  visibleBubbleCount: number
  interactionReady: boolean
  pickedOptionId?: string
  pickedMultiOptionIds: string[]
  pickedMoodId?: string
  quizAnswerIdx?: number
  onQuiz: (index: number) => void
  textResponse: string
  onText: (value: string) => void
  onTextDone: (skip?: boolean) => void
  onExerciseDone: () => void
  onMood: (mood: string) => void
  onPick: (option: ChoiceOption) => void
  onMultiPick: (optionId: string) => void
  onMultiDone: () => void
}) {
  const bubbles = (step.bubbles ?? []).slice(0, visibleBubbleCount)

  if (step.type === "scripture" || step.type === "memory_verse") {
    return (
      <>
        <div className="msg msg--guide">
          <EmanusAvatar />
          <blockquote className="scripture">
            „{step.scripture?.text ?? lesson.memoryVerseRef}”
            <cite>{step.scripture?.ref ?? lesson.memoryVerseRef}</cite>
          </blockquote>
        </div>
        {bubbles.map((bubble, index) => (
          <GuideMsg key={index} text={bubble.text} />
        ))}
      </>
    )
  }

  if (step.type === "prayer" || step.type === "step") {
    const Glyph = step.type === "prayer" ? HandHeart : Footprints
    return (
      <>
        {bubbles.map((bubble, index) => (
          <GuideMsg key={index} icon={Glyph} text={bubble.text} />
        ))}
        {isCurrent && interactionReady ? (
          <div className="choice__opts choice__opts--indented">
            <button type="button" onClick={onExerciseDone}>
              {step.type === "prayer" ? "Am terminat rugăciunea" : "Am făcut pasul"}
            </button>
            {step.type === "step" ? (
              <button type="button" className="ghost" onClick={onExerciseDone}>
                Revin la pas mai târziu
              </button>
            ) : null}
          </div>
        ) : null}
      </>
    )
  }

  if (step.type === "check_in") {
    const moodLabel = pickedMoodId
      ? {
          great: "Foarte bine",
          good: "Bine",
          meh: "Așa și așa",
          down: "Trist",
          hard: "Greu",
        }[pickedMoodId]
      : undefined
    return (
      <>
        {bubbles.map((bubble, index) => (
          <GuideMsg key={index} text={bubble.text} />
        ))}
        {!isCurrent && moodLabel ? <UserMsg text={moodLabel} /> : null}
        {isCurrent && interactionReady ? (
          <MoodChips picked={pickedMoodId} onPick={onMood} />
        ) : null}
      </>
    )
  }

  if (step.type === "choice") {
    const picked = step.choice?.options.find(
      (option) => option.id === pickedOptionId,
    )
    return (
      <>
        {bubbles.map((bubble, index) => (
          <GuideMsg key={index} text={bubble.text} />
        ))}
        {step.choice?.prompt ? (
          <GuideMsg icon={MessageSquare} text={step.choice.prompt} />
        ) : null}
        {picked ? (
          <>
            <UserMsg text={picked.label} />
            {picked.feedback ? <GuideMsg text={picked.feedback} /> : null}
          </>
        ) : isCurrent && interactionReady ? (
          <div className="choice__opts choice__opts--indented">
            {step.choice?.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="ghost"
                onClick={() => onPick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </>
    )
  }

  if (step.type === "multi_choice") {
    const spec = step.multiChoice
    const min = spec?.minSelections ?? 1
    const pickedLabels = (spec?.options ?? [])
      .filter((option) => pickedMultiOptionIds.includes(option.id))
      .map((option) => option.label)
    return (
      <>
        {bubbles.map((bubble, index) => (
          <GuideMsg key={index} text={bubble.text} />
        ))}
        {spec?.prompt ? <GuideMsg icon={Check} text={spec.prompt} /> : null}
        {!isCurrent && pickedLabels.length > 0 ? (
          <UserMsg text={pickedLabels.join(" · ")} />
        ) : null}
        {isCurrent && interactionReady ? (
          <div className="choice__opts choice__opts--indented">
            {spec?.options.map((option) => {
              const picked = pickedMultiOptionIds.includes(option.id)
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`ghost multi-option${picked ? " picked" : ""}`}
                  aria-pressed={picked}
                  onClick={() => onMultiPick(option.id)}
                >
                  <span className="multi-option__mark" aria-hidden>
                    {picked ? <Check size={15} /> : null}
                  </span>
                  {option.label}
                </button>
              )
            })}
            <button
              type="button"
              disabled={pickedMultiOptionIds.length < min}
              onClick={onMultiDone}
            >
              Continuă
            </button>
          </div>
        ) : null}
      </>
    )
  }

  if (step.type === "quiz") {
    const answered = quizAnswerIdx !== undefined
    return (
      <>
        <GuideMsg text={step.quiz?.question ?? ""} />
        <div className="quiz choice__opts--indented">
          {step.quiz?.options.map((option, index) => {
            let className = ""
            if (answered) {
              if (option.correct) className = " correct"
              else if (quizAnswerIdx === index) className = " wrong"
            }
            return (
              <button
                key={index}
                type="button"
                className={`ghost${className}`}
                disabled={answered}
                onClick={() => onQuiz(index)}
              >
                {option.text}
              </button>
            )
          })}
        </div>
        {answered && step.quiz?.explanation ? (
          <GuideMsg icon={Lightbulb} text={step.quiz.explanation} />
        ) : null}
      </>
    )
  }

  if (
    step.type === "journal" ||
    step.type === "reflection" ||
    step.type === "declaration"
  ) {
    const spec = step.response
    const prompt = spec?.prompt ?? step.journalPrompt ?? ""
    const minLength = spec?.minLength ?? (spec?.required ? 2 : 0)
    const canSubmit = textResponse.trim().length >= minLength
    if (!isCurrent) {
      return (
        <>
          <GuideMsg icon={NotebookPen} text={prompt} />
          {textResponse ? <UserMsg text="Am notat un răspuns privat." /> : null}
        </>
      )
    }
    return (
      <>
        {bubbles.map((bubble, index) => (
          <GuideMsg key={index} text={bubble.text} />
        ))}
        <GuideMsg icon={NotebookPen} text={prompt} />
        {interactionReady ? (
          <div className="journal choice__opts--indented">
            <label htmlFor={`response-${step.id}`}>Răspunsul tău</label>
            <textarea
              id={`response-${step.id}`}
              value={textResponse}
              onChange={(event) => onText(event.target.value)}
              placeholder={spec?.placeholder ?? "Scrie aici…"}
              rows={4}
              maxLength={4000}
            />
            <p className="privacy-note">
              <ShieldCheck size={15} aria-hidden />
              {privateTextNotice()}
            </p>
            <div className="choice__opts">
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => onTextDone(false)}
              >
                {step.type === "declaration" ? "Îmi asum declarația" : "Am terminat"}
              </button>
              {!spec?.required ? (
                <button
                  type="button"
                  className="ghost"
                  onClick={() => onTextDone(true)}
                >
                  Trec peste acum
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </>
    )
  }

  if (step.type === "reward") {
    return (
      <GuideMsg
        icon={Sunrise}
        text={
          bubbles.map((bubble) => bubble.text).join(" ") ||
          "Atât pentru azi. Revino când ești pregătit."
        }
      />
    )
  }

  return (
    <>
      {bubbles.map((bubble, index) => (
        <GuideMsg key={index} icon={stepIcon(step.type)} text={bubble.text} />
      ))}
    </>
  )
}

function UserMsg({ text }: { text: string }) {
  return (
    <div className="msg msg--me">
      <div className="bubble bubble--me">{text}</div>
    </div>
  )
}

function MoodChips({
  picked,
  onPick,
}: {
  picked?: string
  onPick: (mood: string) => void
}) {
  const moods: { key: string; icon: LucideIcon; label: string }[] = [
    { key: "great", icon: Laugh, label: "foarte bine" },
    { key: "good", icon: Smile, label: "bine" },
    { key: "meh", icon: Meh, label: "așa și așa" },
    { key: "down", icon: Frown, label: "trist" },
    { key: "hard", icon: HeartCrack, label: "greu" },
  ]
  return (
    <div className="moods choice__opts--indented">
      {moods.map((mood) => {
        const Glyph = mood.icon
        return (
          <button
            key={mood.key}
            type="button"
            className={`mood${picked === mood.key ? " picked" : ""}`}
            onClick={() => onPick(mood.key)}
            disabled={Boolean(picked)}
            aria-label={`Mă simt ${mood.label}`}
            title={mood.label}
          >
            <Glyph size={22} strokeWidth={1.8} aria-hidden />
          </button>
        )
      })}
    </div>
  )
}

function SafetyGate({
  notice,
  onContinue,
}: {
  notice: string
  onContinue: () => void
}) {
  return (
    <section className="player player--safety">
      <div className="safety-gate">
        <ShieldCheck size={30} aria-hidden />
        <p className="player__eyebrow">Înainte să continuăm</p>
        <h1>Siguranța ta este mai importantă decât lecția</h1>
        <p>{notice}</p>
        <p className="muted">
          Emanus nu înlocuiește medicul, psihologul, poliția sau serviciul 112.
        </p>
        <div className="choice__opts">
          <button type="button" onClick={onContinue}>
            Pot continua în siguranță
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => navigate("/criza")}
          >
            Am nevoie de ajutor acum
          </button>
        </div>
      </div>
    </section>
  )
}
