import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen, Brain, Footprints, Frown, HandHeart, HeartCrack, Laugh,
  LifeBuoy, Lightbulb, Meh, MessageCircle, MessageSquare, NotebookPen, Smile, Sunrise,
} from "lucide-react"
import type { ChoiceOption, Lesson, LessonStep } from "@emanus/shared"
import { ScriptureReveal } from "./components/ScriptureReveal"
import { navigate } from "./router"

export interface LessonResult {
  choicesMade: Record<string, string>
  multiChoicesMade: Record<string, string[]>
  textResponses: Record<string, string>
  journal: string
}
export interface LessonPlayerState {
  mainStepId: string
  mainStepIndex: number
  revealedStepIds: string[]
  choices: Record<string, string>
  multiChoices: Record<string, string[]>
  textResponses: Record<string, string>
  quizAnswers: Record<string, number>
  checkIns: Record<string, string>
  journal: string
}

interface RestoredLessonState extends LessonPlayerState {
  revealed: LessonStep[]
}

const GUIDE_NAME = "Emanus"
const INTERACTION_TYPES = new Set<LessonStep["type"]>([
  "choice", "multi_choice", "check_in", "reflection", "declaration",
  "name_struggle", "journal", "memory_verse", "prayer", "step",
])
const MOOD_IDS = new Set(["great", "good", "meh", "down", "hard"])
function stepIcon(type: LessonStep["type"]): LucideIcon {
  switch (type) {
    case "scripture": return BookOpen
    case "memory_verse": return Brain
    case "prayer": return HandHeart
    case "step": return Footprints
    case "journal": return NotebookPen
    case "reward": return Sunrise
    default: return MessageCircle
  }
}
function readingDelay(text: string) { return Math.max(900, Math.min(6500, 650 + text.length * 28)) }
function stepText(step: LessonStep) {
  if (step.scripture) return `${step.scripture.text} ${step.scripture.ref}`
  if (step.quiz) return `${step.quiz.question} ${step.quiz.explanation}`
  return (step.bubbles ?? []).map((b) => b.text).join(" ")
}

function stringRecord(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  )
}

function numberRecord(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, number] => (
      typeof entry[1] === "number" && Number.isInteger(entry[1]) && entry[1] >= 0
    )),
  )
}

function stringArrayRecord(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  const result: Record<string, string[]> = {}
  for (const [key, candidate] of Object.entries(value)) {
    if (!Array.isArray(candidate)) continue
    result[key] = [...new Set(candidate.filter((item): item is string => typeof item === "string"))]
  }
  return result
}

function restoreLessonState(
  initialState: LessonPlayerState | undefined,
  mainSteps: LessonStep[],
  stepById: Map<string, LessonStep>,
): RestoredLessonState {
  const fallback = mainSteps[0]
  if (!initialState || !fallback) return {
    mainStepId: fallback?.id ?? "",
    mainStepIndex: 0,
    revealedStepIds: fallback ? [fallback.id] : [],
    revealed: fallback ? [fallback] : [],
    choices: {},
    multiChoices: {},
    textResponses: {},
    quizAnswers: {},
    checkIns: {},
    journal: "",
  }

  const idIndex = mainSteps.findIndex((step) => step.id === initialState.mainStepId)
  // ID-ul este ancora editorială stabilă. Dacă a dispărut după o revizie a
  // lecției, reluăm sigur de la început în loc să avem încredere într-un index
  // care ar putea indica acum un pas cu totul diferit.
  const index = idIndex >= 0 ? idIndex : 0
  const current = mainSteps[index] ?? fallback
  const choices = Object.fromEntries(
    Object.entries(stringRecord(initialState.choices)).filter(([stepId, optionId]) => (
      stepById.get(stepId)?.type === "choice"
      && stepById.get(stepId)?.choice?.options.some((option) => option.id === optionId)
    )),
  )
  const checkIns = Object.fromEntries(
    Object.entries(stringRecord(initialState.checkIns)).filter(([stepId, optionId]) => {
      const step = stepById.get(stepId)
      if (step?.type !== "check_in") return false
      const options = step.choice?.options
      return options?.length ? options.some((option) => option.id === optionId) : MOOD_IDS.has(optionId)
    }),
  )
  const multiChoices = Object.fromEntries(
    Object.entries(stringArrayRecord(initialState.multiChoices)).flatMap(([stepId, optionIds]) => {
      const step = stepById.get(stepId)
      if (step?.type !== "multi_choice") return []
      const allowed = new Set(step.multiChoice?.options.map((option) => option.id) ?? [])
      const valid = optionIds.filter((optionId) => allowed.has(optionId))
      const max = step.multiChoice?.maxSelections
      return [[stepId, max === undefined ? valid : valid.slice(0, max)] as const]
    }),
  )
  const textResponses = Object.fromEntries(
    Object.entries(stringRecord(initialState.textResponses)).filter(([stepId]) => {
      const type = stepById.get(stepId)?.type
      return type === "reflection" || type === "declaration" || type === "name_struggle"
    }),
  )
  const quizAnswers = Object.fromEntries(
    Object.entries(numberRecord(initialState.quizAnswers)).filter(([stepId, optionIndex]) => {
      const step = stepById.get(stepId)
      return step?.type === "quiz" && optionIndex < (step.quiz?.options.length ?? 0)
    }),
  )
  const revealed: LessonStep[] = []
  for (const mainStep of mainSteps.slice(0, index + 1)) {
    revealed.push(mainStep)
    const option = mainStep.choice?.options.find((candidate) => candidate.id === choices[mainStep.id])
    const branch = option?.branchStepId ? stepById.get(option.branchStepId) : undefined
    if (branch) revealed.push(branch)
  }

  return {
    mainStepId: current.id,
    mainStepIndex: index,
    revealedStepIds: revealed.map((step) => step.id),
    revealed,
    choices,
    multiChoices,
    textResponses,
    quizAnswers,
    checkIns,
    journal: typeof initialState.journal === "string" ? initialState.journal : "",
  }
}

export function LessonPlayer({ lesson, onComplete, submitting = false, initialState, onProgress, onChoice }: {
  lesson: Lesson
  onComplete: (result: LessonResult) => void
  submitting?: boolean
  initialState?: LessonPlayerState
  onProgress?: (state: LessonPlayerState) => void
  onChoice?: (step: LessonStep, option: ChoiceOption) => boolean | void
}) {
  const { mainSteps, stepById } = useMemo(() => {
    const branchTargetIds = new Set<string>()
    for (const s of lesson.steps) for (const o of s.choice?.options ?? []) if (o.branchStepId) branchTargetIds.add(o.branchStepId)
    return {
      mainSteps: lesson.steps.filter((s) => !branchTargetIds.has(s.id)).sort((a, b) => a.order - b.order),
      stepById: new Map(lesson.steps.map((s) => [s.id, s] as const)),
    }
  }, [lesson])
  const restored = useMemo(
    () => restoreLessonState(initialState, mainSteps, stepById),
    [initialState, mainSteps, stepById],
  )
  const [revealed, setRevealed] = useState<LessonStep[]>(() => restored.revealed)
  const [mainIdx, setMainIdx] = useState(restored.mainStepIndex)
  const [choices, setChoices] = useState<Record<string, string>>(() => restored.choices)
  const [multiChoices, setMultiChoices] = useState<Record<string, string[]>>(() => restored.multiChoices)
  const [textResponses, setTextResponses] = useState<Record<string, string>>(() => restored.textResponses)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() => restored.quizAnswers)
  const [checkIns, setCheckIns] = useState<Record<string, string>>(() => restored.checkIns)
  const [bubbleCounts, setBubbleCounts] = useState<Record<string, number>>({})
  const [journal, setJournal] = useState(restored.journal)
  const [autoPaused, setAutoPaused] = useState(false)
  const [safetyCleared, setSafetyCleared] = useState(() => !lesson.safety)
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentTurnRef = useRef<HTMLDivElement>(null)
  const focusNextStep = useRef(false)
  const current = revealed[revealed.length - 1]
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }) }, [revealed.length, bubbleCounts, quizAnswers, checkIns])
  useEffect(() => {
    if (!focusNextStep.current) return
    if (!current || (!INTERACTION_TYPES.has(current.type) && current.type !== "quiz")) return
    const frame = window.requestAnimationFrame(() => {
      currentTurnRef.current?.focus({ preventScroll: true })
      focusNextStep.current = false
    })
    return () => window.cancelAnimationFrame(frame)
  }, [current, mainIdx, revealed.length])

  const inBranch = current ? !mainSteps.includes(current) : false
  const atLastMain = mainIdx >= mainSteps.length - 1
  function toNextMain(
    nextChoices = choices,
    nextJournal = journal,
    nextMultiChoices = multiChoices,
    nextTextResponses = textResponses,
  ) {
    if (atLastMain) { onComplete({ choicesMade: nextChoices, multiChoicesMade: nextMultiChoices, textResponses: nextTextResponses, journal: nextJournal }); return }
    const ni = mainIdx + 1
    const nextStep = mainSteps[ni]
    if (!nextStep) { onComplete({ choicesMade: nextChoices, multiChoicesMade: nextMultiChoices, textResponses: nextTextResponses, journal: nextJournal }); return }
    setMainIdx(ni)
    setRevealed((r) => [...r, nextStep])
  }
  function advance() { toNextMain() }
  function pickChoice(step: LessonStep, opt: ChoiceOption) {
    if (choices[step.id]) return
    if (onChoice?.(step, opt) === false) return
    focusNextStep.current = true
    const next = { ...choices, [step.id]: opt.id }
    setChoices(next)
    const branchStepId = opt.branchStepId
    const branchStep = branchStepId ? stepById.get(branchStepId) : undefined
    if (branchStep) { setRevealed((r) => [...r, branchStep]); return }
    toNextMain(next)
  }
  function pickMood(step: LessonStep, mood: string) {
    if (!checkIns[step.id]) {
      focusNextStep.current = true
      setCheckIns((s) => ({ ...s, [step.id]: mood }))
    }
  }
  function finishJournal(skip = false) {
    focusNextStep.current = true
    if (skip) setJournal("")
    toNextMain(choices, skip ? "" : journal)
  }
  function finishExercise() {
    focusNextStep.current = true
    advance()
  }
  function answerQuiz(index: number) {
    focusNextStep.current = true
    setQuizAnswers((answers) => ({ ...answers, [current.id]: index }))
  }

  function toggleMulti(step: LessonStep, optionId: string) {
    const currentValues = multiChoices[step.id] ?? []
    const selected = currentValues.includes(optionId)
    const max = step.multiChoice?.maxSelections ?? Number.POSITIVE_INFINITY
    const next = selected
      ? currentValues.filter((id) => id !== optionId)
      : currentValues.length < max ? [...currentValues, optionId] : currentValues
    setMultiChoices((values) => ({ ...values, [step.id]: next }))
  }

  function finishMulti() {
    focusNextStep.current = true
    advance()
  }

  function finishText(step: LessonStep, skip = false) {
    focusNextStep.current = true
    const nextTextResponses = skip ? { ...textResponses, [step.id]: "" } : textResponses
    if (skip) setTextResponses(nextTextResponses)
    toNextMain(choices, journal, multiChoices, nextTextResponses)
  }

  useEffect(() => {
    const mainStep = mainSteps[mainIdx]
    if (!mainStep) return
    onProgress?.({
      mainStepId: mainStep.id,
      mainStepIndex: mainIdx,
      revealedStepIds: revealed.map((step) => step.id),
      choices,
      multiChoices,
      textResponses,
      quizAnswers,
      checkIns,
      journal,
    })
  }, [mainIdx, revealed, choices, multiChoices, textResponses, quizAnswers, checkIns, journal, mainSteps, onProgress])

  useEffect(() => {
    if (!current || autoPaused || submitting) return
    const bubbles = current.bubbles ?? []
    const shown = bubbleCounts[current.id] ?? (bubbles.length ? 1 : 0)
    if (shown < bubbles.length) {
      const previous = bubbles[Math.max(0, shown - 1)]?.text ?? ""
      const timer = window.setTimeout(() => setBubbleCounts((c) => ({ ...c, [current.id]: shown + 1 })), readingDelay(previous))
      return () => window.clearTimeout(timer)
    }
    if (current.type === "quiz") {
      if (quizAnswers[current.id] === undefined) return
      const timer = window.setTimeout(advance, readingDelay(current.quiz?.explanation ?? ""))
      return () => window.clearTimeout(timer)
    }
    if (current.type === "check_in") {
      if (!checkIns[current.id]) return
      const timer = window.setTimeout(advance, 650)
      return () => window.clearTimeout(timer)
    }
    if (current.type === "choice") {
      if (!choices[current.id]) return
      const timer = window.setTimeout(advance, 0)
      return () => window.clearTimeout(timer)
    }
    if (INTERACTION_TYPES.has(current.type)) return
    const timer = window.setTimeout(advance, readingDelay(stepText(current)))
    return () => window.clearTimeout(timer)
  }, [current, autoPaused, submitting, bubbleCounts, quizAnswers, checkIns, choices])

  if (lesson.safety && !safetyCleared) return <section className="player"><div className="tile"><LifeBuoy size={26} aria-hidden /><p className="today__kicker">Înainte de lecție</p><h1>Siguranța vine prima</h1><p>{lesson.safety.notice}</p><p className="muted">Alegerea de aici este efemeră: nu intră în progres, jurnal sau cloud.</p><button type="button" onClick={() => navigate("/criza")}>Am nevoie de ajutor acum</button><button type="button" className="ghost" onClick={() => setSafetyCleared(true)}>Sunt în siguranță acum și continui</button></div></section>
  if (!current) return <section className="player"><p className="muted">Lecția nu are pași încă.</p></section>
  const total = Math.max(1, mainSteps.length)
  const stepNo = Math.min(mainIdx + 1, total)
  const progressStyle: CSSProperties = { width: `${(stepNo / total) * 100}%` }
  const visibleBubbleCount = bubbleCounts[current.id] ?? Math.min(1, current.bubbles?.length ?? 0)
  const interactionReady = visibleBubbleCount >= (current.bubbles?.length ?? 0)
  return <section className="player">
    <header className="player__head"><h1>{lesson.title}</h1><p className="muted">{lesson.memoryVerseRef} · ~{lesson.estMinutes} min</p><div className="progress" role="progressbar" aria-label="Progresul sesiunii" aria-valuemin={1} aria-valuemax={total} aria-valuenow={stepNo}><span style={progressStyle} /></div></header>
    <div className="chat" ref={scrollRef} aria-live="polite">
      {revealed.map((s, i) => {
        const isCurrent = i === revealed.length - 1
        return <div key={`${s.id}@${i}`} ref={isCurrent ? currentTurnRef : undefined} className="lesson-turn" tabIndex={isCurrent ? -1 : undefined}>
          <Turn step={s} lesson={lesson} isCurrent={isCurrent}
            visibleBubbleCount={s.id === current.id ? visibleBubbleCount : (s.bubbles?.length ?? 0)} interactionReady={!isCurrent || interactionReady}
            pickedOptionId={choices[s.id]} pickedMoodId={checkIns[s.id]} quizAnswerIdx={quizAnswers[s.id]} journal={journal} onJournal={setJournal}
            onJournalDone={finishJournal} onExerciseDone={finishExercise} onQuiz={answerQuiz}
            selectedMulti={multiChoices[s.id] ?? []} onToggleMulti={(id) => toggleMulti(s, id)} onMultiDone={finishMulti}
            textResponse={textResponses[s.id] ?? ""} onTextResponse={(value) => setTextResponses((values) => ({ ...values, [s.id]: value }))} onTextDone={(skip) => finishText(s, skip)}
            onMood={(m) => pickMood(s, m)} onPick={(o) => pickChoice(s, o)} />
        </div>
      })}
    </div>
    <footer className="player__foot"><span className="muted">{inBranch ? "↪ răspuns pentru alegerea ta" : `Pas ${stepNo}/${total}`}</span><button type="button" className="ghost" aria-pressed={autoPaused} onClick={() => setAutoPaused((p) => !p)}>{autoPaused ? "Continuă conversația" : "Pauză"}</button></footer>
  </section>
}

function GuideMsg({ icon: Glyph, text }: { icon: LucideIcon; text: string }) {
  return <div className="msg msg--guide"><div className="msg__avatar"><Glyph size={18} strokeWidth={1.8} aria-hidden /></div><div className="msg__body"><span className="msg__name">{GUIDE_NAME}</span><div className="bubble">{text}</div></div></div>
}

function Turn({ step, lesson, isCurrent, visibleBubbleCount, interactionReady, pickedOptionId, pickedMoodId, quizAnswerIdx, onQuiz, journal, onJournal, onJournalDone, onExerciseDone, selectedMulti, onToggleMulti, onMultiDone, textResponse, onTextResponse, onTextDone, onMood, onPick }: {
  step: LessonStep; lesson: Lesson; isCurrent: boolean; visibleBubbleCount: number; interactionReady: boolean; pickedOptionId?: string; pickedMoodId?: string; quizAnswerIdx?: number;
  onQuiz: (idx: number) => void; journal: string; onJournal: (v: string) => void; onJournalDone: (skip?: boolean) => void; onExerciseDone: () => void; onMood: (mood: string) => void; onPick: (opt: ChoiceOption) => void
  selectedMulti: string[]; onToggleMulti: (optionId: string) => void; onMultiDone: () => void
  textResponse: string; onTextResponse: (value: string) => void; onTextDone: (skip?: boolean) => void
}) {
  const bubbles = (step.bubbles ?? []).slice(0, visibleBubbleCount)
  /*
   * Beat-ul 6 (scripture): versetul nu mai apare dintr-o dată, ci se limpezește
   * rând cu rând — aceeași componentă ca la pergament și candelă (docs/27 §4.4),
   * dar fără scenă: în lecție versetul stă într-o conversație, nu pe un altar.
   * Versetul de memorat rămâne citație simplă: acolo omul îl recitește, nu îl primește.
   */
  if (step.type === "scripture" || step.type === "memory_verse") return <><div className="msg msg--guide"><div className="msg__avatar">{step.type === "memory_verse" ? <Brain size={18} aria-hidden /> : <BookOpen size={18} aria-hidden />}</div>{step.type === "scripture" && step.scripture ? <ScriptureReveal variant="lesson" verseText={step.scripture.text} verseRef={step.scripture.ref} /> : <blockquote className="scripture">{step.scripture ? `„${step.scripture.text}”` : `„${lesson.memoryVerseRef}”`}<cite>{step.scripture?.ref ?? lesson.memoryVerseRef}</cite></blockquote>}</div>{bubbles.map((b, k) => <GuideMsg key={k} icon={MessageCircle} text={b.text} />)}{step.type === "memory_verse" && isCurrent && interactionReady ? <div className="choice__opts"><button type="button" onClick={onExerciseDone}>Încheie sesiunea</button></div> : null}</>
  if (step.type === "prayer") return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={HandHeart} text={b.text} />)}{isCurrent && interactionReady && <div className="choice__opts"><button type="button" onClick={onExerciseDone}>Am terminat rugăciunea</button></div>}</>
  if (step.type === "step") return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={Footprints} text={b.text} />)}{isCurrent && interactionReady && <div className="choice__opts"><button type="button" onClick={onExerciseDone}>Am făcut pasul</button><button type="button" className="ghost" onClick={onExerciseDone}>Sar peste acum</button></div>}</>
  if (step.type === "check_in") {
    const options = step.choice?.options
    const picked = options?.find((option) => option.id === pickedMoodId)
    return <>{step.choice?.prompt ? <GuideMsg icon={MessageSquare} text={step.choice.prompt} /> : null}{bubbles.map((b, k) => <GuideMsg key={k} icon={MessageCircle} text={b.text} />)}{picked ? <div className="msg msg--me"><div className="bubble bubble--me">{picked.label}</div></div> : isCurrent && interactionReady ? (options?.length ? <div className="choice__opts">{options.map((option) => <button key={option.id} type="button" className="ghost" onClick={() => onMood(option.id)}>{option.label}</button>)}</div> : <MoodChips picked={pickedMoodId} onPick={onMood} />) : null}</>
  }
  if (step.type === "choice") {
    const picked = step.choice?.options.find((o) => o.id === pickedOptionId)
    return <>{step.choice?.prompt && <GuideMsg icon={MessageSquare} text={step.choice.prompt} />}{picked ? <><div className="msg msg--me"><div className="bubble bubble--me">{picked.label}</div></div>{picked.feedback && <GuideMsg icon={MessageCircle} text={picked.feedback} />}</> : isCurrent ? <div className="choice__opts">{step.choice?.options.map((o) => <button key={o.id} type="button" className="ghost" onClick={() => onPick(o)}>{o.label}</button>)}</div> : null}</>
  }
  if (step.type === "multi_choice") {
    const min = step.multiChoice?.minSelections ?? 1
    return <>{step.multiChoice?.prompt && <GuideMsg icon={MessageSquare} text={step.multiChoice.prompt} />}<div className="choice__opts">{step.multiChoice?.options.map((option) => <button key={option.id} type="button" className={selectedMulti.includes(option.id) ? "" : "ghost"} onClick={() => onToggleMulti(option.id)} disabled={!isCurrent}>{option.label}</button>)}</div>{isCurrent && <button type="button" disabled={selectedMulti.length < min} onClick={onMultiDone}>Continuă</button>}</>
  }
  if (step.type === "quiz") {
    const answered = quizAnswerIdx !== undefined
    return <><GuideMsg icon={MessageCircle} text={step.quiz?.question ?? ""} /><div className="quiz">{step.quiz?.options.map((o, k) => {
      let cls = ""; if (answered) { if (o.correct) cls = " correct"; else if (quizAnswerIdx === k) cls = " wrong" }
      return <button key={k} type="button" className={`ghost${cls}`} disabled={answered} onClick={() => onQuiz(k)}>{o.text}</button>
    })}</div>{answered && step.quiz?.explanation && <GuideMsg icon={Lightbulb} text={step.quiz.explanation} />}</>
  }
  if (step.type === "journal") return <><GuideMsg icon={NotebookPen} text={step.journalPrompt ?? ""} />{isCurrent ? <div className="journal"><textarea value={journal} onChange={(e) => onJournal(e.target.value)} placeholder="Scrie aici… (privat, doar pentru tine)" rows={4} /><div className="choice__opts"><button type="button" onClick={() => onJournalDone(false)}>Am terminat</button><button type="button" className="ghost" onClick={() => onJournalDone(true)}>Sar peste</button></div></div> : journal ? <div className="msg msg--me"><div className="bubble bubble--me">{journal}</div></div> : null}</>
  if (["reflection", "declaration", "name_struggle"].includes(step.type)) {
    const prompt = step.response?.prompt ?? (step.bubbles ?? []).map((bubble) => bubble.text).join(" ")
    const requiredLength = step.response?.required ? (step.response.minLength ?? 1) : 0
    return <>{bubbles.map((bubble, index) => <GuideMsg key={index} icon={stepIcon(step.type)} text={bubble.text} />)}{isCurrent && interactionReady && <div className="journal">{step.response && <><label htmlFor={`response-${step.id}`}>{prompt}</label><textarea id={`response-${step.id}`} value={textResponse} onChange={(event) => onTextResponse(event.target.value)} placeholder={step.response.placeholder ?? "Scrie pentru tine…"} rows={3} /></>}<div className="choice__opts"><button type="button" disabled={textResponse.trim().length < requiredLength} onClick={() => onTextDone(false)}>{step.response ? "Am terminat" : "Am răspuns pentru mine"}</button>{!step.response?.required && <button type="button" className="ghost" onClick={() => onTextDone(true)}>Sar peste</button>}</div></div>}</>
  }
  if (step.type === "reward") return <GuideMsg icon={Sunrise} text={bubbles.map((b) => b.text).join(" ") || "Atât pentru azi. Revino când ești pregătit."} />
  return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={stepIcon(step.type)} text={b.text} />)}</>
}

function MoodChips({ picked, onPick }: { picked?: string; onPick: (mood: string) => void }) {
  const moods: { key: string; icon: LucideIcon; label: string }[] = [
    { key: "great", icon: Laugh, label: "grozav" }, { key: "good", icon: Smile, label: "bine" }, { key: "meh", icon: Meh, label: "așa și așa" }, { key: "down", icon: Frown, label: "trist" }, { key: "hard", icon: HeartCrack, label: "greu" },
  ]
  return <div className="moods">{moods.map((m) => { const Glyph = m.icon; return <button key={m.key} type="button" className={`mood${picked === m.key ? " picked" : ""}`} onClick={() => onPick(m.key)} disabled={Boolean(picked)} aria-label={`stare ${m.label}`}><Glyph size={22} strokeWidth={1.8} aria-hidden /></button> })}</div>
}
