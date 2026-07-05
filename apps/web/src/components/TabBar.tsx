import { navigate } from "../router"

export interface TabItem {
  key: string
  label: string
  icon: string
  route: string
}

export const EMANUS_TABS: TabItem[] = [
  { key: "home", label: "Acasă", icon: "🏠", route: "/" },
  { key: "journey", label: "Parcurs", icon: "📿", route: "/dashboard" },
  { key: "prayer", label: "Rugăc.", icon: "🙏", route: "/prayer" },
  { key: "community", label: "Comun.", icon: "👥", route: "/community" },
  { key: "family", label: "Familie", icon: "👪", route: "/family" },
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
      {items.map((t) => (
        <button
          key={t.key}
          type="button"
          className={`tabbar__item${active === t.key ? " active" : ""}`}
          aria-current={active === t.key ? "page" : undefined}
          onClick={() => onNavigate(t.route)}
        >
          <span className="ic">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
