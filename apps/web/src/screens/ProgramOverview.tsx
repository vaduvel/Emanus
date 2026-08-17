import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Compass,
  Footprints,
  Hourglass,
  LifeBuoy,
  LockKeyhole,
  Play,
  RotateCcw,
  Share2,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { LearningProgram } from "../learningPrograms"
import {
  getLearningProgram,
  learningLessonUrl,
  learningProgramUrl,
  programDurationMinutes,
  programResumeIndex,
} from "../learningPrograms"
import { getProgramProgress } from "../learningProgress"
import { chooseDoor, load, plan, switchPath } from "../journey"
import { navigate } from "../router"
import "../program.css"

type SessionStatus = "completed" | "current" | "available" | "locked" | "waiting-for-practice"

interface ProgramViewState {
  completedIds: Set<string>
  completedCount: number
  currentIndex: number
  waitingForPractice: boolean
  practiceText?: string
  complete: boolean
  selectedGatePath: boolean
  started: boolean
}

function viewState(program: LearningProgram): ProgramViewState {
  if (program.kind === "course") {
    const progress = getProgramProgress(program.id)
    const completedIds = new Set(progress.completedLessonIds)
    const completedCount = program.lessons.filter((lesson) => completedIds.has(lesson.id)).length
    const currentIndex = programResumeIndex(program, completedIds, progress.lastLessonId)
    const hasDraft = Boolean(progress.lastLessonId && progress.drafts?.[progress.lastLessonId])
    return {
      completedIds,
      completedCount,
      currentIndex,
      waitingForPractice: false,
      complete: program.lessons.length > 0 && currentIndex === -1,
      selectedGatePath: false,
      started: completedCount > 0 || hasDraft,
    }
  }

  const journey = load()
  const selectedGatePath = journey.pathId === program.sourceId
  const completedCount = selectedGatePath
    ? Math.min(Math.max(journey.lessonsDone, 0), program.lessons.length)
    : 0
  const todayPlan = selectedGatePath ? plan() : null
  const waitingForPractice = todayPlan?.kind === "practice" || todayPlan?.kind === "done_today"
  const complete = selectedGatePath && todayPlan?.kind === "path_complete"
  const currentIndex = complete
    ? -1
    : todayPlan?.kind === "lesson"
      ? todayPlan.lessonIndex
      : completedCount

  return {
    completedIds: new Set(program.lessons.slice(0, completedCount).map((lesson) => lesson.id)),
    completedCount,
    currentIndex,
    waitingForPractice,
    practiceText: waitingForPractice ? todayPlan?.practiceText : undefined,
    complete,
    selectedGatePath,
    started: selectedGatePath,
  }
}

function sessionStatus(program: LearningProgram, state: ProgramViewState, index: number): SessionStatus {
  const lesson = program.lessons[index]
  if (lesson && state.completedIds.has(lesson.id)) return "completed"
  if (index === state.currentIndex && state.waitingForPractice) return "waiting-for-practice"
  if (index === state.currentIndex) return "current"
  if (program.kind === "course" && program.unlockPolicy === "open") return "available"
  return "locked"
}

function activateGateProgram(program: LearningProgram): void {
  const journey = load()
  if (journey.pathId === program.sourceId) return
  if (journey.pathId) switchPath(program.sourceId)
  else chooseDoor(program.sourceId)
}

export function ProgramOverview({ programId, showCompletion = false }: { programId: string; showCompletion?: boolean }) {
  const [shareStatus, setShareStatus] = useState("")
  const completionSectionRef = useRef<HTMLElement>(null)
  const completionTitleRef = useRef<HTMLHeadingElement>(null)
  const program = getLearningProgram(programId)
  const resolvedState = program?.lessons.length ? viewState(program) : undefined
  const isGate = program?.kind === "gate_path"
  const completion = program && resolvedState?.complete && !isGate
    ? program.completion ?? {
      eyebrow: "Curs parcurs",
      title: `Ai ajuns la capătul cursului „${program.title}”`,
      body: "Poți reveni oricând la ideile și pașii care ți-au rămas aproape. Cursul rămâne deschis pentru recitire.",
      nextSteps: [
        "Recitește sesiunea care ți-a rămas cel mai aproape.",
        "Păstrează un singur pas concret pentru săptămâna aceasta.",
        "Întoarce-te la curs când ai nevoie să reașezi acel adevăr.",
      ],
      shareText: `Îți trimit cursul „${program.title}” din Biblioteca Emanus.`,
    }
    : undefined
  const completionAvailable = Boolean(completion)

  useEffect(() => {
    if (!showCompletion || !completionAvailable) return
    const frame = window.requestAnimationFrame(() => {
      completionSectionRef.current?.scrollIntoView({ block: "start" })
      completionTitleRef.current?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [completionAvailable, programId, showCompletion])

  if (!program || !resolvedState) {
    return (
      <section className="program-empty experience-shell">
        <h1>Programul nu este disponibil încă</h1>
        <p>Conținutul lui este în pregătire.</p>
        <button type="button" className="experience-cta" onClick={() => navigate("/biblioteca")}>Înapoi la Bibliotecă</button>
      </section>
    )
  }

  const state = resolvedState
  const totalMinutes = programDurationMinutes(program)
  const progressPercent = program.lessons.length
    ? Math.round((state.completedCount / program.lessons.length) * 100)
    : 0
  const backUrl = isGate ? (state.selectedGatePath ? "/" : "/intrare") : "/biblioteca"
  const cadence = isGate
    ? "Ritm ghidat · între sesiuni există timp de aplicare"
    : program.unlockPolicy === "open"
      ? "Ritm personal · ordinea te ajută, dar poți deschide orice sesiune"
      : "Ritm personal · poți continua imediat"
  const activeProgram = program
  const showSafetyHelp = program.kind === "course" && program.sourceId === "comun_c5_siguranta"

  function openSession(index: number) {
    const lesson = activeProgram.lessons[index]
    if (!lesson) return
    if (isGate) activateGateProgram(activeProgram)
    navigate(learningLessonUrl(activeProgram.id, lesson.id))
  }

  function primaryAction() {
    if (state.complete) {
      if (isGate) navigate("/final")
      else completionSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    if (state.waitingForPractice) {
      navigate("/")
      return
    }
    openSession(Math.max(0, state.currentIndex))
  }

  async function shareProgram() {
    if (!completion) return
    const url = new URL(window.location.href)
    url.hash = learningProgramUrl(activeProgram.id)
    const shareData = {
      title: activeProgram.title,
      text: completion.shareText,
      url: url.toString(),
    }
    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData)
        setShareStatus("Cursul este gata de trimis.")
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
        setShareStatus("Linkul a fost copiat.")
      } else {
        const field = document.createElement("textarea")
        field.value = `${shareData.text}\n${shareData.url}`
        field.setAttribute("readonly", "")
        field.style.position = "fixed"
        field.style.opacity = "0"
        document.body.appendChild(field)
        field.select()
        const copied = document.execCommand("copy")
        field.remove()
        if (!copied) throw new Error("copy-not-supported")
        setShareStatus("Linkul a fost copiat.")
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      setShareStatus("Nu am putut deschide distribuirea. Poți copia adresa paginii.")
    }
  }

  const primaryLabel = state.complete
    ? isGate ? "Vezi încheierea drumului" : "Vezi cursul parcurs"
    : state.waitingForPractice
      ? "Vezi practica de azi"
      : state.started
        ? `Continuă cu sesiunea ${state.currentIndex + 1}`
        : "Începe prima sesiune"

  return (
    <section className={`program-overview experience-shell ${isGate ? "program-overview--path" : "program-overview--course"}`}>
      <header className="experience-header program-overview__header">
        <button type="button" className="experience-back" onClick={() => navigate(backUrl)} aria-label="Înapoi"><ArrowLeft aria-hidden /></button>
        <div className="experience-brand"><img src="/emanus-mark.svg" alt="" aria-hidden /><span>Emanus</span></div>
        {showSafetyHelp ? <button type="button" className="experience-back program-overview__safety" aria-label="Am nevoie de ajutor acum" onClick={() => navigate("/criza")}><LifeBuoy size={19} aria-hidden /></button> : <span className="experience-header__space" />}
      </header>

      <div className="program-hero">
        <img src="/bible-road-hero.svg" alt={isGate ? "Un drum luminat care urcă spre cetate" : "Un drum luminat prin ținutul biblic"} />
        <span className="program-hero__type">{isGate ? <Footprints size={17} aria-hidden /> : <BookOpen size={17} aria-hidden />}{program.sourceLabel}</span>
      </div>

      <div className="program-intro">
        <p className="experience-eyebrow">{isGate ? "Drumul tău" : "Curs din Bibliotecă"}</p>
        <h1>{program.title}</h1>
        <p className="program-intro__promise">{program.promise}</p>
        <div className="program-meta" aria-label="Detalii program">
          <span><BookOpen size={17} aria-hidden /> {program.lessons.length} sesiuni</span>
          <span><Clock3 size={17} aria-hidden /> aproximativ {totalMinutes} min</span>
        </div>
        <p className="program-intro__cadence">{cadence}</p>
      </div>

      <div className="program-progress">
        <div className="program-progress__copy">
          <span>{state.complete ? "Program încheiat" : "Progres"}</span>
          <strong>{state.completedCount} din {program.lessons.length} sesiuni</strong>
        </div>
        <div className="program-progress__track" role="progressbar" aria-label="Progresul programului" aria-valuemin={0} aria-valuemax={program.lessons.length} aria-valuenow={state.completedCount}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {completion ? (
        <section ref={completionSectionRef} className="program-completion" aria-labelledby="program-completion-title">
          <div className="program-completion__mark"><CheckCircle2 size={25} aria-hidden /></div>
          <p className="experience-eyebrow">{completion.eyebrow}</p>
          <h2 id="program-completion-title" ref={completionTitleRef} tabIndex={-1}>{completion.title}</h2>
          <p>{completion.body}</p>
          <ol className="program-completion__steps">
            {completion.nextSteps.map((step, index) => (
              <li key={step}><span aria-hidden>{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
          <button type="button" className="experience-cta program-completion__share" onClick={shareProgram}>
            <Share2 size={18} aria-hidden /> Dă-l mai departe
          </button>
          <p className="program-completion__status" aria-live="polite">{shareStatus}</p>
        </section>
      ) : program.outcomes?.length ? (
        <section className="program-outcomes" aria-labelledby="program-outcomes-title">
          <div className="program-outcomes__heading"><Compass size={21} aria-hidden /><h2 id="program-outcomes-title">Ce vei așeza</h2></div>
          <ul>{program.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
        </section>
      ) : null}

      {state.waitingForPractice ? (
        <aside className="program-practice">
          <div className="program-practice__icon"><Hourglass size={20} aria-hidden /></div>
          <div><p className="experience-eyebrow">În aplicare acum</p><p>{state.practiceText}</p></div>
        </aside>
      ) : null}

      <div className="program-sessions">
        <div className="program-sessions__heading">
          <p className="experience-eyebrow">{isGate ? "Pașii drumului" : "Structura cursului"}</p>
          <h2>Sesiuni</h2>
        </div>
        <ol className="program-session-list">
          {program.lessons.map((lesson, index) => {
            const status = sessionStatus(program, state, index)
            const enabled = status === "completed" || status === "current" || status === "available"
            const statusText = status === "completed"
              ? "Încheiată · poți reciti"
              : status === "current"
                ? state.started ? "Reia de aici" : "Începe aici"
                : status === "available"
                  ? "Poți deschide oricând"
                : status === "waiting-for-practice"
                  ? "Se deschide după timpul de aplicare"
                  : "Se deschide în ordine"
            return (
              <li key={lesson.id} className={`program-session program-session--${status}`}>
                <span className="program-session__node" aria-hidden>
                  {status === "completed" ? <Check size={18} /> : status === "current" ? <Play size={17} /> : status === "available" ? <BookOpen size={16} /> : status === "waiting-for-practice" ? <Hourglass size={17} /> : <LockKeyhole size={16} />}
                </span>
                <button type="button" className="program-session__card" disabled={!enabled} onClick={() => openSession(index)} aria-current={status === "current" ? "step" : undefined}>
                  <span className="program-session__number">Sesiunea {index + 1}</span>
                  <strong>{lesson.title}</strong>
                  <span className="program-session__details"><span>{lesson.estMinutes} min</span><span>{statusText}</span></span>
                  {enabled ? <ArrowRight className="program-session__arrow" size={19} aria-hidden /> : null}
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="program-actions">
        <button type="button" className="experience-cta" onClick={primaryAction}>
          {state.complete && !isGate ? <CheckCircle2 size={18} aria-hidden /> : null}
          {primaryLabel}
          {!state.complete || isGate ? <ArrowRight size={18} aria-hidden /> : null}
        </button>
        {state.complete && !isGate ? <button type="button" className="experience-link" onClick={() => openSession(0)}><RotateCcw size={16} aria-hidden /> Recitește prima sesiune</button> : null}
        <button type="button" className="experience-link" onClick={() => navigate(backUrl)}>{isGate ? "Înapoi la Azi" : "Înapoi la Bibliotecă"}</button>
      </div>
    </section>
  )
}
