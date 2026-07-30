import { useEffect, useState } from "react"
import type { Lesson } from "@emanus/shared/domain"
import { loadLesson } from "./content"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import { completeLesson, plan } from "./journey"
import { navigate } from "./router"

export function LessonView({ lessonId }: { lessonId?: string }) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let active = true
    setLesson(null)
    setDone(false)
    setFailed(false)

    if (!lessonId) {
      setLoading(false)
      setFailed(true)
      return () => {
        active = false
      }
    }

    setLoading(true)
    void loadLesson(lessonId)
      .then((value) => {
        if (active) setLesson(value)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [lessonId, attempt])

  if (loading) {
    return (
      <section className="player">
        <p className="muted">Se deschide lecția…</p>
      </section>
    )
  }

  if (failed || !lesson) {
    return (
      <section className="player">
        <div className="tile">
          <h2>Lecția nu s-a putut deschide</h2>
          <p className="muted">
            Verifică legătura la internet. Dacă ai deschis lecția înainte, ea rămâne
            disponibilă și offline.
          </p>
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>
            Încearcă din nou
          </button>
          <button type="button" className="ghost" onClick={() => navigate("/")}>
            Înapoi la Azi
          </button>
        </div>
      </section>
    )
  }

  function onComplete(result: LessonResult) {
    if (!lesson) return
    completeLesson(lesson.id, result.journal)
    setDone(true)
  }

  if (done) {
    const next = plan()
    const finished = next?.kind === "path_complete"
    return (
      <section className="player player--done">
        <div className="tile">
          <h2>Gata pe azi</h2>
          <p>
            Nu îți dau niciun punct și nicio insignă. Ai auzit ceva adevărat — asta
            rămâne oricum.
          </p>
          <p className="muted">
            {finished
              ? "Ai terminat drumul. Hai să-ți arăt ceva."
              : "Mâine e ziua de pus în practică. Lecția următoare vine poimâine."}
          </p>
          <button type="button" onClick={() => navigate(finished ? "/final" : "/")}>
            {finished ? "Vezi" : "Înapoi la Azi"}
          </button>
        </div>
      </section>
    )
  }

  return <LessonPlayer lesson={lesson} onComplete={onComplete} />
}
