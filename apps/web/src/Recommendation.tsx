import { useEffect, useState } from "react"
import type { RecommendationView } from "@emanus/shared"
import { getRecommendation } from "./api"
import { navigate } from "./router"
import { getCategory, getFaithStage } from "./session"

export function Recommendation() {
  const [rec, setRec] = useState<RecommendationView | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getRecommendation(getCategory(), getFaithStage())
      .then(setRec)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  return (
    <section className="recommend">
      <div className="recommend__badge">✨ Parcursul tău</div>

      {error && <p className="error">{error}</p>}
      {!rec && !error && <p className="muted">Îți pregătim parcursul…</p>}

      {rec && (
        <>
          <p className="recommend__welcome">{rec.welcome}</p>

          <div className="recommend__focus">
            <span className="recommend__focus-kicker">Începem cu</span>
            <b>{rec.focusAxisLabel}</b>
          </div>

          {rec.course ? (
            <div className="recommend__course">
              <h1>{rec.course.title}</h1>
              <p className="recommend__struggle">„{rec.course.struggle}”</p>
              <p className="recommend__truth">{rec.course.truth}</p>
              <p className="muted">{rec.reason}</p>
            </div>
          ) : (
            <p className="muted">{rec.reason}</p>
          )}

          <div className="recommend__nav">
            {rec.course?.firstLessonId && (
              <button
                type="button"
                onClick={() => navigate(`/lesson/${rec.course?.firstLessonId}`)}
              >
                Începe primul pas
              </button>
            )}
            <button type="button" className="ghost" onClick={() => navigate("/daily")}>
              Mergi la ritualul zilnic
            </button>
            <button type="button" className="ghost" onClick={() => navigate("/dashboard")}>
              Vezi parcursul complet
            </button>
          </div>
        </>
      )}
    </section>
  )
}
