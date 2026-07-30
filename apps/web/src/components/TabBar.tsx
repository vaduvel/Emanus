import {
  BookOpen,
  CircleHelp,
  Sunrise,
  UserRound,
  UsersRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { navigate } from "../router"

export interface TabItem {
  key: string
  label: string
  icon: LucideIcon
  route: string
}

export const EMANUS_TABS: TabItem[] = [
  { key: "today", label: "Azi", icon: Sunrise, route: "/" },
  { key: "bible", label: "Biblia", icon: BookOpen, route: "/biblia" },
  { key: "ask", label: "Întreabă", icon: CircleHelp, route: "/intreaba" },
  { key: "people", label: "Ai mei", icon: UsersRound, route: "/ai-mei" },
  { key: "profile", label: "Eu", icon: UserRound, route: "/eu" },
]

export function TabBar({
  active,
  items = EMANUS_TABS,
  onNavigate = navigate,
}: {
  active: string
  items?: TabItem[]
  onNavigate?: (route: string) => void
}) {
  return (
    <nav className="tabbar" aria-label="Navigare principală">
      {items.map((t) => {
        const Glyph = t.icon
        return (
          <button
            key={t.key}
            type="button"
            className={`tabbar__item${active === t.key ? " active" : ""}`}
            aria-current={active === t.key ? "page" : undefined}
            onClick={() => onNavigate(t.route)}
          >
            <span className="ic">
              <Glyph size={22} strokeWidth={1.8} aria-hidden />
            </span>
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}
