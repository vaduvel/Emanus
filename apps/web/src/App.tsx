import { useEffect, useState } from "react"
import type { Lesson } from "@emanus/shared"
import { completeLesson, getFirstLesson } from "./api"
import { LessonPlayer } from "./LessonPlayer"

export default function App() {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reward, setReward] = useState<number | null>(null)

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

  if (reward !== null) {
    return (
      <main className="app">
        <div className="card">
          <h2>Bravo! ⭐ +{reward} XP</h2>
          <p className="muted">Ai terminat prima lecție.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="app">
      <LessonPlayer
        lesson={lesson}
        onComplete={async () => {
          const res = await completeLesson(lesson.id)
          setReward(res.reward.xp)
        }}
      />
    </main>
  )
}
