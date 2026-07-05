import { Fragment } from "react"

export interface JourneyModule {
  id: string
  title: string
  locked: boolean
  lessonsCompleted: number
  lessonsTotal: number
  percent: number
}

const NODE_ICONS = ["💬", "❤️", "⭐", "🕊️", "🔥", "🌿"]

export function JourneyPath({
  modules,
  nextLessonId,
  onSelect,
}: {
  modules: JourneyModule[]
  nextLessonId?: string | null
  onSelect?: (lessonId: string) => void
}) {
  let currentPlaced = false
  return (
    <div className="journey">
      {modules.map((m) => {
        const total = Math.max(0, m.lessonsTotal)
        return (
          <div key={m.id} className={`journey__module${m.locked ? " locked" : ""}`}>
            <div className="journey__module-title">
              <span>{m.locked ? "🔒" : "📿"}</span>
              {m.title}
              <span className="muted">
                {m.lessonsCompleted}/{m.lessonsTotal}
              </span>
            </div>
            <div className="journey__track">
              {Array.from({ length: total }).map((_, i) => {
                const done = i < m.lessonsCompleted
                let state: "done" | "current" | "locked" = done ? "done" : "locked"
                if (!m.locked && !done && !currentPlaced && i === m.lessonsCompleted) {
                  state = "current"
                  currentPlaced = true
                }
                const clickable = state === "current" && !!nextLessonId
                return (
                  <Fragment key={i}>
                    {i > 0 && (
                      <span className={`jconn${i <= m.lessonsCompleted ? " jconn--done" : ""}`} />
                    )}
                    <div
                      className={`jnode jnode--${state}${clickable ? " jnode--clickable" : ""}`}
                      role={clickable ? "button" : undefined}
                      onClick={clickable ? () => onSelect?.(nextLessonId as string) : undefined}
                    >
                      <span className="jnode__circle">
                        {state === "done" ? "✓" : NODE_ICONS[i % NODE_ICONS.length]}
                      </span>
                    </div>
                  </Fragment>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
