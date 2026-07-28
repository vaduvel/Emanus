import { useEffect, useState } from "react"
import { Award, LockOpen, Medal, Sparkles } from "lucide-react"
import type { Lesson } from "@emanus/shared"
import { mohlerNotForMe } from "@emanus/shared"
import { getFirstLesson, getLesson, submitProgress } from "./api"
import type { ProgressResult } from "./api"
import { LessonPlayer } from "./LessonPlayer"
import type { LessonResult } from "./LessonPlayer"
import { navigate } from "./router"

/*
 * Lecții pilot: se încarcă direct din pachetul partajat, nu prin API.
 * Motivul: pot fi testate cap-coadă fără DATABASE_URL și fără seed în Supabase.
 * La final NU se trimite progres — sunt pentru validare de conținut și de ton.
 */
const PILOT_LESSONS = new Map<string, Lesson>(
  mohlerNotForMe.lessons.map((l) => [l.id, l] as const),
)

export function LessonView({ lessonId }: { lessonId?: string }) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProgressResult | null>(null)
  const [pilotDone, setPilotDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const pilot = lessonId ? PILOT_LESSONS.get(lessonId) : undefined

  useEffect(() => {
    setLesson(null)
    setResult(null)
    setPilotDone(false)
    setError(null)

    if (pilot) {
      setLesson(pilot)
      return
    }
    const p = lessonId ? getLesson(lessonId) : getFirstLesson()
    p.then(setLesson).catch((e: unknown) =>
      setError(e instanceof Error ? e.message : String(e)),
    )
  }, [lessonId, pilot])

  if (error) return <p className="error">{error}</p>
  if (!lesson) return <p className="muted">Se încarcă…</p>

  if (pilotDone) {
    return (
      <div className="card reward-card">
        <div className="reward-card__icon">
          <Sparkles size={40} strokeWidth={1.6} aria-hidden />
        </div>
        <h2>Ai ajuns la capăt.</h2>
        <p>
          Lecția <strong>„{lesson.title}”</strong> — versiune pilot, pentru testare.
        </p>
        <blockquote className="scripture">
          Nu mai trăiesc eu, ci Hristos trăiește în mine.
          <cite>{lesson.memoryVerseRef}</cite>
        </blockquote>
        <p className="muted">Progresul nu s-a salvat. E o lecție de probă.</p>
        <div className="reward-card__actions">
          <button type="button" onClick={() => window.location.reload()}>
            Reia lecția
          </button>
          <button type="button" className="ghost" onClick={() => navigate("/")}>
            Înapoi acasă
          </button>
        </div>
      </div>
    )
  }

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
        if (pilot) {
          setPilotDone(true)
          return
        }
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
