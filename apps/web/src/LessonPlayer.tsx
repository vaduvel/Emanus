import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen, Brain, Footprints, Frown, HandHeart, HeartCrack, Laugh,
  Lightbulb, Meh, MessageCircle, MessageSquare, NotebookPen, Smile, Sunrise,
} from "lucide-react"
import type { ChoiceOption, Lesson, LessonStep } from "@emanus/shared"
import { privateWritingNotice, truthfulPrivacyCopy } from "./privacy"

export interface LessonResult { choicesMade: Record<string, string>; journal: string }
const GUIDE_NAME = "Emanus"
const INTERACTION_TYPES = new Set<LessonStep["type"]>(["choice", "check_in", "journal", "prayer", "step"])
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

export function LessonPlayer({ lesson, onComplete, submitting = false }: {
  lesson: Lesson; onComplete: (result: LessonResult) => void; submitting?: boolean
}) {
  const { mainSteps, stepById } = useMemo(() => {
    const branchTargetIds = new Set<string>()
    for (const s of lesson.steps) for (const o of s.choice?.options ?? []) if (o.branchStepId) branchTargetIds.add(o.branchStepId)
    return {
      mainSteps: lesson.steps.filter((s) => !branchTargetIds.has(s.id)).sort((a, b) => a.order - b.order),
      stepById: new Map(lesson.steps.map((s) => [s.id, s] as const)),
    }
  }, [lesson])
  const [revealed, setRevealed] = useState<LessonStep[]>(() => mainSteps.length ? [mainSteps[0]] : [])
  const [mainIdx, setMainIdx] = useState(0)
  const [choices, setChoices] = useState<Record<string, string>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [checkIns, setCheckIns] = useState<Record<string, string>>({})
  const [bubbleCounts, setBubbleCounts] = useState<Record<string, number>>({})
  const [journal, setJournal] = useState("")
  const [autoPaused, setAutoPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }) }, [revealed.length, bubbleCounts, quizAnswers, checkIns])

  const current = revealed[revealed.length - 1]
  const inBranch = current ? !mainSteps.includes(current) : false
  const atLastMain = mainIdx >= mainSteps.length - 1
  function toNextMain(nextChoices = choices, nextJournal = journal) {
    if (atLastMain) { onComplete({ choicesMade: nextChoices, journal: nextJournal }); return }
    const ni = mainIdx + 1
    const nextStep = mainSteps[ni]
    if (!nextStep) { onComplete({ choicesMade: nextChoices, journal: nextJournal }); return }
    setMainIdx(ni)
    setRevealed((r) => [...r, nextStep])
  }
  function advance() { toNextMain() }
  function pickChoice(step: LessonStep, opt: ChoiceOption) {
    if (choices[step.id]) return
    const next = { ...choices, [step.id]: opt.id }
    setChoices(next)
    const branchStepId = opt.branchStepId
    const branchStep = branchStepId ? stepById.get(branchStepId) : undefined
    if (branchStep) { setRevealed((r) => [...r, branchStep]); return }
    toNextMain(next)
  }
  function pickMood(step: LessonStep, mood: string) {
    if (!checkIns[step.id]) setCheckIns((s) => ({ ...s, [step.id]: mood }))
  }
  function finishJournal(skip = false) { if (skip) setJournal(""); toNextMain(choices, skip ? "" : journal) }

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
    if (INTERACTION_TYPES.has(current.type)) return
    const timer = window.setTimeout(advance, readingDelay(stepText(current)))
    return () => window.clearTimeout(timer)
  }, [current, autoPaused, submitting, bubbleCounts, quizAnswers, checkIns])

  if (!current) return <section className="player"><p className="muted">Lecția nu are pași încă.</p></section>
  const total = Math.max(1, mainSteps.length)
  const stepNo = Math.min(mainIdx + 1, total)
  const progressStyle: CSSProperties = { width: `${(stepNo / total) * 100}%` }
  const visibleBubbleCount = bubbleCounts[current.id] ?? Math.min(1, current.bubbles?.length ?? 0)
  const interactionReady = visibleBubbleCount >= (current.bubbles?.length ?? 0)
  return <section className="player">
    <header className="player__head"><h1>{lesson.title}</h1><p className="muted">{lesson.memoryVerseRef} · ~{lesson.estMinutes} min</p><div className="progress" aria-hidden="true"><span style={progressStyle} /></div></header>
    <div className="chat" ref={scrollRef} aria-live="polite">
      {revealed.map((s, i) => <Turn key={`${s.id}@${i}`} step={s} lesson={lesson} isCurrent={i === revealed.length - 1}
        visibleBubbleCount={s.id === current.id ? visibleBubbleCount : (s.bubbles?.length ?? 0)} interactionReady={i !== revealed.length - 1 || interactionReady}
        pickedOptionId={choices[s.id]} pickedMoodId={checkIns[s.id]} quizAnswerIdx={quizAnswers[s.id]} journal={journal} onJournal={setJournal}
        onJournalDone={finishJournal} onExerciseDone={advance} onQuiz={(idx) => setQuizAnswers((q) => ({ ...q, [s.id]: idx }))}
        onMood={(m) => pickMood(s, m)} onPick={(o) => pickChoice(s, o)} />)}
    </div>
    <footer className="player__foot"><span className="muted">{inBranch ? "↪ răspuns pentru alegerea ta" : `Pas ${stepNo}/${total}`}</span><button type="button" className="ghost" onClick={() => setAutoPaused((p) => !p)}>{autoPaused ? "Continuă conversația" : "Pauză"}</button></footer>
  </section>
}

function GuideMsg({ icon: Glyph, text }: { icon: LucideIcon; text: string }) {
  return <div className="msg msg--guide"><div className="msg__avatar"><Glyph size={18} strokeWidth={1.8} aria-hidden /></div><div className="msg__body"><span className="msg__name">{GUIDE_NAME}</span><div className="bubble">{truthfulPrivacyCopy(text)}</div></div></div>
}

function Turn({ step, lesson, isCurrent, visibleBubbleCount, interactionReady, pickedOptionId, pickedMoodId, quizAnswerIdx, onQuiz, journal, onJournal, onJournalDone, onExerciseDone, onMood, onPick }: {
  step: LessonStep; lesson: Lesson; isCurrent: boolean; visibleBubbleCount: number; interactionReady: boolean; pickedOptionId?: string; pickedMoodId?: string; quizAnswerIdx?: number;
  onQuiz: (idx: number) => void; journal: string; onJournal: (v: string) => void; onJournalDone: (skip?: boolean) => void; onExerciseDone: () => void; onMood: (mood: string) => void; onPick: (opt: ChoiceOption) => void
}) {
  const bubbles = (step.bubbles ?? []).slice(0, visibleBubbleCount)
  if (step.type === "scripture" || step.type === "memory_verse") return <><div className="msg msg--guide"><div className="msg__avatar">{step.type === "memory_verse" ? <Brain size={18} aria-hidden /> : <BookOpen size={18} aria-hidden />}</div><blockquote className="scripture">{step.scripture ? `„${step.scripture.text}”` : `„${lesson.memoryVerseRef}”`}<cite>{step.scripture?.ref ?? lesson.memoryVerseRef}</cite></blockquote></div>{bubbles.map((b, k) => <GuideMsg key={k} icon={MessageCircle} text={b.text} />)}</>
  if (step.type === "prayer") return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={HandHeart} text={b.text} />)}{isCurrent && interactionReady && <div className="choice__opts"><button onClick={onExerciseDone}>Am terminat rugăciunea</button></div>}</>
  if (step.type === "step") return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={Footprints} text={b.text} />)}{isCurrent && interactionReady && <div className="choice__opts"><button onClick={onExerciseDone}>Am făcut pasul</button><button className="ghost" onClick={onExerciseDone}>Sar peste acum</button></div>}</>
  if (step.type === "check_in") return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={MessageCircle} text={b.text} />)}{isCurrent && interactionReady && <MoodChips picked={pickedMoodId} onPick={onMood} />}</>
  if (step.type === "choice") {
    const picked = step.choice?.options.find((o) => o.id === pickedOptionId)
    return <>{step.choice?.prompt && <GuideMsg icon={MessageSquare} text={step.choice.prompt} />}{picked ? <div className="msg msg--me"><div className="bubble bubble--me">{picked.label}</div></div> : isCurrent ? <div className="choice__opts">{step.choice?.options.map((o) => <button key={o.id} className="ghost" onClick={() => onPick(o)}>{o.label}</button>)}</div> : null}</>
  }
  if (step.type === "quiz") {
    const answered = quizAnswerIdx !== undefined
    return <><GuideMsg icon={MessageCircle} text={step.quiz?.question ?? ""} /><div className="quiz">{step.quiz?.options.map((o, k) => {
      let cls = ""; if (answered) { if (o.correct) cls = " correct"; else if (quizAnswerIdx === k) cls = " wrong" }
      return <button key={k} className={`ghost${cls}`} disabled={answered} onClick={() => onQuiz(k)}>{o.text}</button>
    })}</div>{answered && step.quiz?.explanation && <GuideMsg icon={Lightbulb} text={step.quiz.explanation} />}</>
  }
  if (step.type === "journal") return <><GuideMsg icon={NotebookPen} text={step.journalPrompt ?? ""} />{isCurrent ? <div className="journal"><textarea value={journal} onChange={(e) => onJournal(e.target.value)} placeholder="Scrie aici…" rows={4} /><p className="muted">{privateWritingNotice()}</p><div className="choice__opts"><button onClick={() => onJournalDone(false)}>Am terminat</button><button className="ghost" onClick={() => onJournalDone(true)}>Sar peste</button></div></div> : journal ? <div className="msg msg--me"><div className="bubble bubble--me">{journal}</div></div> : null}</>
  if (step.type === "reward") return <GuideMsg icon={Sunrise} text={bubbles.map((b) => b.text).join(" ") || "Atât pentru azi. Revino când ești pregătit."} />
  return <>{bubbles.map((b, k) => <GuideMsg key={k} icon={stepIcon(step.type)} text={b.text} />)}</>
}

function MoodChips({ picked, onPick }: { picked?: string; onPick: (mood: string) => void }) {
  const moods: { key: string; icon: LucideIcon; label: string }[] = [
    { key: "great", icon: Laugh, label: "grozav" }, { key: "good", icon: Smile, label: "bine" }, { key: "meh", icon: Meh, label: "așa și așa" }, { key: "down", icon: Frown, label: "trist" }, { key: "hard", icon: HeartCrack, label: "greu" },
  ]
  return <div className="moods">{moods.map((m) => { const Glyph = m.icon; return <button key={m.key} type="button" className={`mood${picked === m.key ? " picked" : ""}`} onClick={() => onPick(m.key)} disabled={Boolean(picked)} aria-label={`stare ${m.label}`}><Glyph size={22} strokeWidth={1.8} aria-hidden /></button> })}</div>
}
