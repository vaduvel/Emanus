import { useEffect, useState } from "react"
import { Award, LockOpen, Medal, Sparkles } from "lucide-react"
import type { Lesson } from "@emanus/shared"
import { getFirstLesson, getLesson, submitProgress } from "./api"
import type { ProgressResult } from "./api"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import { navigate } from "./router"

export function LessonView({ lessonId }: { lessonId?: string }) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProgressResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const p = lessonId ? getLesson(lessonId) : getFirstLesson()
    p.then(setLesson).catch((e: unknown) =>
      setError(e instanceof Error ? e.message : String(e)),
    )
  }, [lessonId])

  if (error) return <p className="error">{error}</p>
  if (!lesson) return <p className="muted">Se încarcă…</p>

  if (result) {
    return (
      <div className="card reward-card">
        <div className="reward-card__icon">
          <Sparkles size={40} strokeWidth={1.6} aria-hidden />
        </div>
        <h2>Bravo! +{result.reward.xp} XP</h2>
        <p>
          Ai terminat lecția <strong>„{lesson.title}”</strong>.
        </p>
        {result.reward.badgeId && (
          <p className="muted title-icon">
            <Medal size={16} strokeWidth={1.9} aria-hidden /> Insignă: {result.reward.badgeId}
          </p>
        )}
        <blockquote className="scripture">
          Verset de memorat
          <cite>{lesson.memoryVerseRef}</cite>
        </blockquote>
        {result.reward.certificateId && (
          <p className="muted title-icon">
            <Award size={16} strokeWidth={1.9} aria-hidden /> Certificat: {result.reward.certificateId}
          </p>
        )}
        {result.reward.unlocksModuleId && (
          <p className="muted title-icon">
            <LockOpen size={16} strokeWidth={1.9} aria-hidden /> Ai deblocat un modul nou!
          </p>
        )}
        <div className="reward-card__actions">
          <button type="button" onClick={() => navigate("/dashboard")}>
            Vezi parcursul meu
          </button>
          <button type="button" className="ghost" onClick={() => window.location.reload()}>
            Reia lecția
          </button>
        </div>
      </div>
    )
  }

  return (
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
  )
}
