import { Home, Footprints, HandHeart, MessagesSquare, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { navigate } from "../router"

export interface TabItem {
  key: string
  label: string
  icon: LucideIcon
  route: string
}

export const EMANUS_TABS: TabItem[] = [
  { key: "home", label: "Acasă", icon: Home, route: "/" },
  { key: "journey", label: "Parcurs", icon: Footprints, route: "/dashboard" },
  { key: "prayer", label: "Rugăc.", icon: HandHeart, route: "/prayer" },
  { key: "community", label: "Comun.", icon: MessagesSquare, route: "/community" },
  { key: "family", label: "Familie", icon: Users, route: "/family" },
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
