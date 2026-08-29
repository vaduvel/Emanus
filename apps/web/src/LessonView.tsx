import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Footprints, HandHeart, LifeBuoy } from "lucide-react"
import { quizOptionRotation } from "@emanus/shared"
import type { ChoiceOption, Lesson, LessonStep } from "@emanus/shared/domain"
import { safetyPolicyForLesson } from "@emanus/shared/lesson-safety"
import { DOCTRINE_LESSONS, getDoorEntry } from "@emanus/shared/paths"
import { mohlerNotForMe } from "@emanus/shared/lesson-mohler"
import {
  activeGateProgramId,
  findProgramForLesson,
  getLearningProgram,
  learningLessonUrl,
  learningProgramCompletionUrl,
  learningProgramUrl,
  programResumeIndex,
  programSessionIndex,
} from "./learningPrograms"
import type { LearningProgram } from "./learningPrograms"
import {
  completeProgramLesson,
  getLessonDraft,
  getProgramProgress,
  saveLessonDraft,
} from "./learningProgress"
import type { LessonProgressDraft } from "./learningProgress"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import { completeLesson, load, plan } from "./journey"
import { navigate } from "./router"

const EXTRA: Map<string, Lesson> = new Map(
  [...mohlerNotForMe.lessons, ...DOCTRINE_LESSONS].map((lesson) => [lesson.id, lesson] as const),
)

function legacyProgram(lessonId: string | undefined): LearningProgram | undefined {
  const journey = load()
  const activeProgram = journey.pathId
    ? getLearningProgram(activeGateProgramId(journey.pathId, journey.doorId))
    : undefined
  if (lessonId && activeProgram?.lessons.some((lesson) => lesson.id === lessonId)) return activeProgram
  const found = findProgramForLesson(lessonId)
  // Lecțiile de doctrină pot apărea ca supliment în alt traseu. În acel caz
  // rămân în contextul Azi, nu mută omul în programul „De la zero”.
  if (lessonId?.startsWith("doctrina_") && found?.sourceId !== journey.pathId) return undefined
  return found
}

function routedProgram(programId: string | undefined): LearningProgram | undefined {
  const requested = getLearningProgram(programId)
  if (!requested || requested.kind !== "gate_path" || requested.doorId) return requested
  const journey = load()
  if (journey.pathId !== requested.sourceId || !journey.doorId) return requested
  return getLearningProgram(activeGateProgramId(journey.pathId, journey.doorId)) ?? requested
}

function lessonHasSafety(lesson: Lesson | undefined): boolean {
  return Boolean(lesson && (lesson.safety ?? safetyPolicyForLesson(lesson.id)))
}

function completionJournal(result: LessonResult): string {
  const entries = [...Object.values(result.textResponses), result.journal]
    .map((entry) => entry.trim())
    .filter(Boolean)
  return [...new Set(entries)].join("\n\n")
}

function sessionWasCompleted(program: LearningProgram | undefined, lessonId: string | undefined): boolean {
  if (!program || !lessonId) return false
  if (program.kind === "course") return getProgramProgress(program.id).completedLessonIds.includes(lessonId)
  const journey = load()
  const index = programSessionIndex(program, lessonId)
  const selected = journey.pathId === program.sourceId && (
    program.doorId ? journey.doorId === program.doorId : journey.doorId === null
  )
  return selected && index >= 0 && index < journey.lessonsDone
}

function sessionCanOpen(program: LearningProgram | undefined, lessonId: string | undefined): boolean {
  if (!program || !lessonId) return true
  const index = programSessionIndex(program, lessonId)
  if (index < 0) return false

  if (program.kind === "course") {
    if (program.unlockPolicy === "open") return true
    const completed = new Set(getProgramProgress(program.id).completedLessonIds)
    if (completed.has(lessonId)) return true
    return index === program.lessons.findIndex((lesson) => !completed.has(lesson.id))
  }

  const journey = load()
  const selected = journey.pathId === program.sourceId && (
    program.doorId ? journey.doorId === program.doorId : journey.doorId === null
  )
  if (!selected) return false
  if (index < journey.lessonsDone) return true
  const todayPlan = plan()
  return todayPlan?.kind === "lesson" && todayPlan.lessonIndex === index
}

function LessonNavigation({ programUrl, backLabel, position, showSafetyHelp }: {
  programUrl: string
  backLabel: string
  position?: string | null
  showSafetyHelp: boolean
}) {
  return <header className="lesson-shell__nav">
    <button type="button" className="lesson-shell__back" onClick={() => navigate(programUrl)}><ArrowLeft size={17} aria-hidden /> {backLabel}</button>
    {showSafetyHelp ? <button type="button" className="lesson-shell__help" onClick={() => navigate("/criza")}><LifeBuoy size={17} aria-hidden /> Ajutor acum</button> : null}
    {position ? <span className="lesson-shell__position">{position}</span> : null}
  </header>
}

export function LessonView({ lessonId, programId }: { lessonId?: string; programId?: string }) {
  const program = useMemo(
    () => programId ? routedProgram(programId) : legacyProgram(lessonId),
    [lessonId, programId],
  )
  const lesson = useMemo<Lesson | undefined>(() => {
    if (!lessonId) return undefined
    if (programId) return program?.lessons.find((candidate) => candidate.id === lessonId)
    return program?.lessons.find((candidate) => candidate.id === lessonId)
      ?? EXTRA.get(lessonId)
  }, [lessonId, program, programId])
  const replaying = useRef(sessionWasCompleted(program, lessonId))
  const initialDraft = useRef(
    program?.kind === "course" && lessonId && !replaying.current
      ? getLessonDraft(program.id, lessonId)
      : undefined,
  )
  const skippedInitialDraftWrite = useRef(false)
  const [done, setDone] = useState(false)
  const [foundationAccepted, setFoundationAccepted] = useState(
    initialDraft.current?.choices.fl7_choice === "fl7c_1",
  )
  const programUrl = program ? learningProgramUrl(program.id) : "/"
  const showSafetyHelp = lessonHasSafety(lesson)
  const doorEntry = program?.kind === "gate_path" ? getDoorEntry(program.doorId) : undefined
  const initialChoices = doorEntry && doorEntry.lessonId === lessonId
    ? { [doorEntry.stepId]: doorEntry.optionId }
    : undefined

  const saveDraft = useCallback((draft: LessonProgressDraft) => {
    if (program?.kind === "course" && lessonId && !replaying.current) {
      if (!initialDraft.current && !skippedInitialDraftWrite.current && draft.mainStepIndex === 0) {
        skippedInitialDraftWrite.current = true
        return
      }
      saveLessonDraft(program.id, lessonId, draft)
    }
  }, [lessonId, program])

  const handleChoice = useCallback((step: LessonStep, option: ChoiceOption) => {
    if (lessonId !== "fund_l7" || step.id !== "fl7_choice") return
    if (option.id === "fl7c_1") {
      setFoundationAccepted(true)
      return
    }
    if (option.id === "fl7c_2") {
      if (program?.kind === "course") completeProgramLesson(program.id, lessonId, "")
      const returnTo = program ? learningProgramUrl(program.id) : "/biblioteca"
      navigate(`/intreaba?despre=${encodeURIComponent("Ce înseamnă să-L urmez pe Iisus?")}&intoarcere=${encodeURIComponent(returnTo)}`)
      return false
    }
    if (option.id === "fl7c_3") {
      if (program?.kind === "course") completeProgramLesson(program.id, lessonId, "")
      navigate(program ? learningProgramUrl(program.id) : "/biblioteca")
      return false
    }
  }, [lessonId, program])

  if (!lesson) {
    return <section className="lesson-shell">
      <LessonNavigation programUrl={programUrl} backLabel={program ? "Program" : "Azi"} showSafetyHelp={showSafetyHelp} />
      <section className="player program-empty lesson-shell__empty"><p className="muted">Lecția aceasta nu este disponibilă încă.</p><button type="button" onClick={() => navigate(programUrl)}>Înapoi</button></section>
    </section>
  }

  const index = program ? programSessionIndex(program, lesson.id) : -1
  const position = program && index >= 0 ? `Sesiunea ${index + 1} din ${program.lessons.length}` : null
  const quizRotationKey = program?.id ?? lesson.courseId
  let quizSequenceIndex = program && index >= 0 ? 0 : Math.max(0, lesson.order - 1)
  let quizPreviousCorrectPosition = -1
  if (program && index >= 0) {
    for (const candidate of program.lessons.slice(0, index)) {
      for (const step of [...candidate.steps].sort((left, right) => left.order - right.order)) {
        if (!step.quiz || step.quiz.options.length === 0) continue
        const correctOptionIndex = step.quiz.options.findIndex((option) => option.correct)
        const rotation = quizOptionRotation(
          quizRotationKey,
          quizSequenceIndex,
          correctOptionIndex,
          step.quiz.options.length,
          quizPreviousCorrectPosition,
        )
        quizPreviousCorrectPosition = (
          correctOptionIndex - rotation + step.quiz.options.length
        ) % step.quiz.options.length
        quizSequenceIndex += 1
      }
    }
  }

  if (!sessionCanOpen(program, lesson.id)) {
    return (
      <section className="lesson-shell">
        <LessonNavigation programUrl={programUrl} backLabel="Program" position={position} showSafetyHelp={showSafetyHelp} />
        <section className="program-empty experience-shell lesson-shell__empty">
          <p className="experience-eyebrow">Sesiune blocată</p>
          <h1>Acest pas se deschide în ordinea programului</h1>
          <p>Revino la hartă pentru a continua de la sesiunea activă.</p>
          <button type="button" className="experience-cta" onClick={() => navigate(programUrl)}>Înapoi la program</button>
        </section>
      </section>
    )
  }

  function onComplete(result: LessonResult) {
    if (!lesson) return
    const journal = completionJournal(result)
    if (program?.kind === "course") completeProgramLesson(program.id, lesson.id, journal)
    else completeLesson(lesson.id, journal)
    setDone(true)
  }

  if (done) {
    return <LessonCompletion lesson={lesson} program={program} index={index} replaying={replaying.current} foundationAccepted={foundationAccepted} />
  }

  return (
    <section className="lesson-shell">
      <LessonNavigation programUrl={programUrl} backLabel={program ? "Program" : "Azi"} position={position} showSafetyHelp={showSafetyHelp} />
      <LessonPlayer
        lesson={lesson}
        onComplete={onComplete}
        initialState={initialDraft.current}
        initialChoices={initialChoices}
        quizRotationKey={quizRotationKey}
        quizSequenceIndex={quizSequenceIndex}
        quizPreviousCorrectPosition={quizPreviousCorrectPosition}
        onProgress={program?.kind === "course" && !replaying.current ? saveDraft : undefined}
        onChoice={handleChoice}
      />
    </section>
  )
}

function LessonCompletion({ lesson, program, index, replaying, foundationAccepted }: {
  lesson: Lesson
  program?: LearningProgram
  index: number
  replaying: boolean
  foundationAccepted: boolean
}) {
  const programUrl = program ? learningProgramUrl(program.id) : "/"
  const showSafetyHelp = lessonHasSafety(lesson)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  if (!program) {
    return (
      <section className="player player--done"><div className="tile"><div className="lesson-complete__mark"><Check size={25} aria-hidden /></div><h1 ref={titleRef} tabIndex={-1} className="lesson-complete__title">Ai încheiat lecția</h1><p>Păstrează aproape adevărul pe care l-ai citit și pasul pe care l-ai ales.</p><div className="lesson-complete__actions"><button type="button" onClick={() => navigate("/")}>Înapoi la Azi</button></div></div></section>
    )
  }

  if (replaying && !foundationAccepted) {
    return (
      <section className="lesson-shell">
        <LessonNavigation programUrl={programUrl} backLabel="Program" position={`Sesiunea ${index + 1} din ${program.lessons.length}`} showSafetyHelp={showSafetyHelp} />
        <section className="player player--done"><div className="tile"><div className="lesson-complete__mark"><Check size={25} aria-hidden /></div><h1 ref={titleRef} tabIndex={-1} className="lesson-complete__title">Ai recitit sesiunea {index + 1}</h1><p>Poți reveni la această sesiune ori de câte ori ai nevoie. Progresul programului a rămas neschimbat.</p><div className="lesson-complete__actions"><button type="button" onClick={() => navigate(programUrl)}>Înapoi la program</button></div></div></section>
      </section>
    )
  }

  if (program.kind === "course") {
    const progress = getProgramProgress(program.id)
    const nextIndex = programResumeIndex(program, progress.completedLessonIds, lesson.id)
    const nextLesson = nextIndex >= 0 ? program.lessons[nextIndex] : undefined
    const courseComplete = !nextLesson
    const foundationDecision = foundationAccepted && lesson.id === "fund_l7"
    return (
      <section className="lesson-shell">
        <LessonNavigation programUrl={programUrl} backLabel="Curs" position={`Sesiunea ${index + 1} din ${program.lessons.length}`} showSafetyHelp={showSafetyHelp} />
        <section className="player player--done">
          <div className="tile">
            <div className="lesson-complete__mark">{foundationDecision ? <HandHeart size={25} aria-hidden /> : <Check size={25} aria-hidden />}</div>
            <h1 ref={titleRef} tabIndex={-1} className="lesson-complete__title">{foundationDecision ? "Nu mai mergi ca un orfan" : courseComplete ? "Ai parcurs toate sesiunile" : `Ai încheiat sesiunea ${index + 1}`}</h1>
            <p>{foundationDecision
              ? "Răspunsul tău nu este o promisiune că vei fi perfect. Sentimentele se pot schimba; faptul că Dumnezeu te primește în Hristos nu depinde de ce simți astăzi."
              : courseComplete
                ? program.completion
                  ? "Temelia rămâne un loc la care poți reveni. Încheierea cursului îți așază următorii pași."
                  : "Poți reveni oricând la ideile și pașii acestui curs. Progresul tău rămâne păstrat."
                : "Poți continua acum sau poți reveni când ești pregătit."}</p>
            {nextLesson ? <div className="lesson-complete__next"><strong>Urmează: Sesiunea {nextIndex + 1}</strong><span>{nextLesson.title} · {nextLesson.estMinutes} min</span></div> : null}
            <div className="lesson-complete__actions">
              {nextLesson ? <button type="button" onClick={() => navigate(learningLessonUrl(program.id, nextLesson.id))}>Continuă la sesiunea {nextIndex + 1} <ArrowRight size={17} aria-hidden /></button> : <button type="button" onClick={() => navigate(learningProgramCompletionUrl(program.id))}>Vezi încheierea cursului <ArrowRight size={17} aria-hidden /></button>}
              {nextLesson ? <button type="button" className="ghost" onClick={() => navigate(programUrl)}>Înapoi la curs</button> : null}
            </div>
          </div>
        </section>
      </section>
    )
  }

  const nextPlan = plan()
  const pathComplete = nextPlan?.kind === "path_complete"
  const practiceText = nextPlan?.kind === "done_today" || nextPlan?.kind === "practice" ? nextPlan.practiceText : undefined
  return (
    <section className="lesson-shell">
      <LessonNavigation programUrl={programUrl} backLabel="Drum" position={`Sesiunea ${index + 1} din ${program.lessons.length}`} showSafetyHelp={showSafetyHelp} />
      <section className="player player--done">
        <div className="tile">
          <div className="lesson-complete__mark">{pathComplete ? <Check size={25} aria-hidden /> : <Footprints size={25} aria-hidden />}</div>
          <h1 ref={titleRef} tabIndex={-1} className="lesson-complete__title">{pathComplete ? "Ai încheiat acest drum" : `Ai încheiat sesiunea ${index + 1}`}</h1>
          <p>{pathComplete ? "Privește înapoi la ce ai parcurs și alege cum continui." : "Acum urmează timpul de aplicare. Nu trebuie să grăbești următorul pas."}</p>
          {practiceText ? <div className="lesson-complete__next"><strong>De pus în practică</strong><span>{practiceText}</span></div> : null}
          <div className="lesson-complete__actions">
            <button type="button" onClick={() => navigate(pathComplete ? "/final" : "/")}>{pathComplete ? "Continuă drumul" : "Vezi practica de azi"} <ArrowRight size={17} aria-hidden /></button>
            <button type="button" className="ghost" onClick={() => navigate(programUrl)}>Înapoi la program</button>
          </div>
        </div>
      </section>
    </section>
  )
}
