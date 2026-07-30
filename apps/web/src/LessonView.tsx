import { useMemo, useState } from "react"
import type { Lesson } from "@emanus/shared/domain"
import { findLessonAnywhere } from "@emanus/shared/paths"
import { LIBRARY_LESSONS } from "@emanus/shared/library"
import { mohlerNotForMe } from "@emanus/shared/lesson-mohler"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import { completeLesson, plan } from "./journey"
import { navigate } from "./router"

const EXTRA: Map<string, Lesson> = new Map(
  [...mohlerNotForMe.lessons, ...LIBRARY_LESSONS].map((l) => [l.id, l] as const),
)

export function LessonView({ lessonId }: { lessonId?: string }) {
  const lesson = useMemo<Lesson | undefined>(() => {
    if (!lessonId) return undefined
    return findLessonAnywhere(lessonId) ?? EXTRA.get(lessonId)
  }, [lessonId])
  const [done, setDone] = useState(false)
  if (!lesson) return <section className="player"><p className="muted">Lecția asta nu există (încă).</p><button type="button" onClick={() => navigate("/")}>Înapoi la Azi</button></section>
  function onComplete(result: LessonResult) { if (!lesson) return; completeLesson(lesson.id, result.journal); setDone(true) }
  if (done) {
    const next = plan()
    const finished = next?.kind === "path_complete"
    return <section className="player player--done"><div className="tile"><h2>Gata pe azi</h2><p>Nu îți dau niciun punct și nicio insignă. Ai auzit ceva adevărat — asta rămâne oricum.</p><p className="muted">{finished ? "Ai terminat drumul. Hai să-ți arăt ceva." : "Mâine e ziua de pus în practică. Lecția următoare vine poimâine."}</p><button type="button" onClick={() => navigate(finished ? "/final" : "/")}>{finished ? "Vezi" : "Înapoi la Azi"}</button></div></section>
  }
  return <LessonPlayer lesson={lesson} onComplete={onComplete} />
}
