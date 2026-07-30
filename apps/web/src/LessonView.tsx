import { useEffect, useState } from "react"
import type { Lesson } from "@emanus/shared/domain"
import { loadLesson } from "./content"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import {
  completeLesson,
  lessonDraft,
  plan,
  saveLessonDraft,
} from "./journey"
import type { LessonDraft } from "./journey"
import { navigate } from "./router"

export function LessonView({ lessonId }: { lessonId?: string }) {
  const preview =
    new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("preview") === "1"
  const previewStepId = new URLSearchParams(
    window.location.hash.split("?")[1] ?? "",
  ).get("step")
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
      <section className="player player--status">
        <p className="muted">Se deschide lecția…</p>
      </section>
    )
  }

  if (failed || !lesson) {
    return (
      <section className="player player--status">
        <div className="tile">
          <h2>Lecția nu s-a putut deschide</h2>
          <p className="muted">
            Verifică legătura la internet. Lecțiile deschise anterior rămân
            disponibile și offline.
          </p>
          <div className="choice__opts">
            <button
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Încearcă din nou
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => navigate("/")}
            >
              Înapoi la Azi
            </button>
          </div>
        </div>
      </section>
    )
  }

  function onComplete(result: LessonResult) {
    if (!lesson) return
    if (!preview) completeLesson(lesson.id, result)
    setDone(true)
  }

  if (done) {
    const next = plan()
    const finished = next?.kind === "path_complete"
    return (
      <section className="player player--done player--status">
        <div className="tile">
          <p className="player__eyebrow">Pentru azi este destul</p>
          <h2>Conversația rămâne cu tine</h2>
          <p>
            Nu primești puncte și nu pierzi nimic dacă iei o pauză. Important
            este pasul pe care l-ai înțeles și îl poți trăi.
          </p>
          <p className="muted">
            {finished
              ? "Ai ajuns la capătul acestui drum."
              : "Următoarea zi este pentru practică, nu pentru încă o lecție."}
          </p>
          <button
            type="button"
            onClick={() => navigate(finished ? "/final" : "/")}
          >
            {finished ? "Vezi ce urmează" : "Înapoi la Azi"}
          </button>
        </div>
      </section>
    )
  }

  const previewDraft: LessonDraft | undefined =
    preview && previewStepId && lesson.steps.some((step) => step.id === previewStepId)
      ? {
          mainStepId: previewStepId,
          revealedStepIds: [previewStepId],
          choicesMade: {},
          multiChoicesMade: {},
          checkIns: {},
          quizAnswers: {},
          textResponses: {},
          updatedAt: new Date().toISOString(),
        }
      : undefined

  return (
    <LessonPlayer
      key={`${lesson.id}:${previewStepId ?? "start"}`}
      lesson={lesson}
      initialDraft={preview ? previewDraft : lessonDraft(lesson.id)}
      onProgress={
        preview ? undefined : (draft) => saveLessonDraft(lesson.id, draft)
      }
      onComplete={onComplete}
    />
  )
}
