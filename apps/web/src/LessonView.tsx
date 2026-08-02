import { useEffect, useMemo, useState } from "react"
import type { Lesson } from "@emanus/shared/domain"
import { crisisResources } from "@emanus/shared"
import { findLessonAnywhere } from "@emanus/shared/paths"
import { getLibraryCourse, LIBRARY_LESSONS, nextCourseLesson } from "@emanus/shared/library"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import {
  completeLesson,
  completeLibraryLesson,
  libraryCompletedLessonIds,
  plan,
} from "./journey"
import { safetyGateForLesson } from "./lessonSafety"
import { navigate } from "./router"

// Lecția-pilot Mohler rămâne în sursă numai ca material intern cu drepturi
// nerezolvate. Nu este expusă prin runtime-ul aplicației.
const LIBRARY_MAP: Map<string, Lesson> = new Map(
  LIBRARY_LESSONS.map((lesson) => [lesson.id, lesson] as const),
)

export function LessonView({ lessonId }: { lessonId?: string }) {
  const lesson = useMemo<Lesson | undefined>(() => {
    if (!lessonId) return undefined
    return findLessonAnywhere(lessonId) ?? LIBRARY_MAP.get(lessonId)
  }, [lessonId])
  const libraryCourse = lesson ? getLibraryCourse(lesson.courseId) : undefined
  const safetyGate = lesson ? safetyGateForLesson(lesson) : null
  const [gateAccepted, setGateAccepted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setGateAccepted(false)
    setDone(false)
  }, [lessonId])

  if (!lesson) return <section className="player"><p className="muted">Lecția asta nu există (încă).</p><button type="button" onClick={() => navigate("/")}>Înapoi la Azi</button></section>

  if (safetyGate && !gateAccepted) {
    const resources = crisisResources(safetyGate.resources)
    return <section className="player player--done">
      <div className="tile">
        <p className="today__kicker">Înainte să continui</p>
        <h2>Ce urmează atinge {safetyGate.topic}</h2>
        <p>{safetyGate.message}</p>
        <p className="muted">Poți opri oricând și poți reveni. Emanus nu înlocuiește medicul, psihologul, poliția sau 112.</p>
        <div className="choice__opts">
          <button type="button" onClick={() => setGateAccepted(true)}>Continuă</button>
          <button type="button" className="ghost" onClick={() => navigate("/criza")}>Am nevoie de ajutor acum</button>
        </div>
        <div className="notice notice--warn">
          {resources.map((resource) => <p key={resource.id}>
            <strong>{resource.phone}</strong> · {resource.label} · {resource.availability}
          </p>)}
        </div>
      </div>
    </section>
  }

  function onComplete(result: LessonResult) {
    if (libraryCourse) completeLibraryLesson(lesson.id, libraryCourse.id, result.journal)
    else completeLesson(lesson.id, result.journal)
    setDone(true)
  }

  if (done && libraryCourse) {
    const completed = libraryCompletedLessonIds()
    const nextId = nextCourseLesson(libraryCourse, completed)
    return <section className="player player--done"><div className="tile">
      <h2>Lecția este terminată</h2>
      <p>Progresul acestui curs este separat de drumul tău zilnic.</p>
      <p className="muted">{nextId ? "Poți continua acum sau poți reveni când dorești." : "Ai terminat cursul."}</p>
      <div className="choice__opts">
        {nextId && <button type="button" onClick={() => navigate(`/lesson/${nextId}`)}>Lecția următoare</button>}
        <button type="button" className="ghost" onClick={() => navigate("/biblioteca")}>Înapoi la Bibliotecă</button>
      </div>
    </div></section>
  }

  if (done) {
    const next = plan()
    const finished = next?.kind === "path_complete"
    return <section className="player player--done"><div className="tile"><h2>Gata pe azi</h2><p>Nu îți dau niciun punct și nicio insignă. Ai auzit ceva adevărat — asta rămâne oricum.</p><p className="muted">{finished ? "Ai terminat drumul. Hai să-ți arăt ceva." : "Mâine e ziua de pus în practică. Lecția următoare vine poimâine."}</p><button type="button" onClick={() => navigate(finished ? "/final" : "/")}>{finished ? "Vezi" : "Înapoi la Azi"}</button></div></section>
  }

  return <LessonPlayer lesson={lesson} onComplete={onComplete} />
}
