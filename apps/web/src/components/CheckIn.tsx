import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { CloudRain, Heart, Laugh, Moon, Smile } from "lucide-react"

export interface Mood {
  id: string
  icon: LucideIcon
  label: string
}

const DEFAULT_MOODS: Mood[] = [
  { id: "calm", icon: Smile, label: "calm" },
  { id: "anxious", icon: CloudRain, label: "anxios" },
  { id: "grateful", icon: Heart, label: "recunoscător" },
  { id: "tired", icon: Moon, label: "obosit" },
  { id: "joyful", icon: Laugh, label: "bucuros" },
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
        {moods.map((m) => {
          const Glyph = m.icon
          return (
            <button
              key={m.id}
              type="button"
              className={`checkin__mood${picked === m.id ? " picked" : ""}`}
              onClick={() => {
                setPicked(m.id)
                onPick?.(m.id)
              }}
            >
              <span className="emo">
                <Glyph size={22} strokeWidth={1.8} aria-hidden />
              </span>
              {m.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
