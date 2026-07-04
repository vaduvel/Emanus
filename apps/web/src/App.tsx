import { useEffect, useState } from "react"
import type { Lesson } from "@emanus/shared"
import { getFirstLesson, submitProgress } from "./api"
import type { ProgressResult } from "./api"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"

export default function App() {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProgressResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getFirstLesson()
      .then(setLesson)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  if (error) {
    return (
      <main className="app">
        <p className="error">{error}</p>
      </main>
    )
  }

  if (!lesson) {
    return (
      <main className="app">
        <p className="muted">Se încarcă…</p>
      </main>
    )
  }

  if (result) {
    return (
      <main className="app">
        <div className="card reward-card">
          <div className="reward-card__icon">✨</div>
          <h2>Bravo! +{result.reward.xp} XP</h2>
          <p>
            Ai terminat lecția <strong>„{lesson.title}”</strong>.
          </p>
          {result.reward.badgeId && (
            <p className="muted">🎖️ Insignă: {result.reward.badgeId}</p>
          )}
          <blockquote className="scripture">
            Verset de memorat
            <cite>{lesson.memoryVerseRef}</cite>
          </blockquote>
          {result.reward.certificateId && (
            <p className="muted">🏅 Certificat: {result.reward.certificateId}</p>
          )}
          {result.reward.unlocksModuleId && (
            <p className="muted">🔓 Ai deblocat un modul nou!</p>
          )}
          <button type="button" onClick={() => window.location.reload()}>
            Reia lecția
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="app">
      <LessonPlayer
        lesson={lesson}
        submitting={submitting}
        onComplete={async (r: LessonResult) => {
          setSubmitting(true)
          try {
            const res = await submitProgress(lesson.id, r.choicesMade)
            setResult(res)
          } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e))
          } finally {
            setSubmitting(false)
          }
        }}
      />
    </main>
  )
}
