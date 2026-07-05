import { useState } from "react"

export interface Mood {
  id: string
  emoji: string
  label: string
}

const DEFAULT_MOODS: Mood[] = [
  { id: "calm", emoji: "😌", label: "calm" },
  { id: "anxious", emoji: "😟", label: "anxios" },
  { id: "grateful", emoji: "🙏", label: "recunoscător" },
  { id: "tired", emoji: "😴", label: "obosit" },
  { id: "joyful", emoji: "😄", label: "bucuros" },
]

export function CheckIn({
  moods = DEFAULT_MOODS,
  onPick,
}: {
  moods?: Mood[]
  onPick?: (moodId: string) => void
}) {
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <section className="tile checkin">
      <h2 className="tile__title">Cum ești azi?</h2>
      <div className="checkin__moods">
        {moods.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`checkin__mood${picked === m.id ? " picked" : ""}`}
            onClick={() => {
              setPicked(m.id)
              onPick?.(m.id)
            }}
          >
            <span className="emo">{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>
    </section>
  )
}
