import { useState } from "react"
import { Community } from "./Community"
import { Daily } from "./Daily"
import { Dashboard } from "./Dashboard"
import { Ebenezer } from "./Ebenezer"
import { Family } from "./Family"
import { Home } from "./Home"
import { LessonView } from "./LessonView"
import { Onboarding } from "./Onboarding"
import { PrayerCoach } from "./PrayerCoach"
import { Recommendation } from "./Recommendation"
import { TabBar } from "./components"
import { navigate, useHashRoute } from "./router"
import { isOnboarded } from "./session"

function Landing() {
  return (
    <section className="landing">
      <div className="landing__icon">🕊️</div>
      <h1>Emanus</h1>
      <p className="landing__tag">Dumnezeu cu tine, pas cu pas.</p>
      <p className="muted">
        Lecții scurte, ca o conversație. Descoperă cine ești, cu adevărat.
      </p>
      <div className="landing__actions">
        <button type="button" onClick={() => navigate("/lesson/teens_m1_c1_l1")}>
          Încearcă prima lecție
        </button>
        <button type="button" className="ghost" onClick={() => navigate("/onboarding")}>
          Începe călătoria mea
        </button>
      </div>
    </section>
  )
}

export default function App() {
  const route = useHashRoute()
  const [onboarded, setOnb] = useState(isOnboarded())

  if (route.name === "onboarding" || (!onboarded && route.name === "dashboard")) {
    return (
      <main className="app">
        <Onboarding
          onDone={() => {
            setOnb(true)
            navigate("/recommendation")
          }}
        />
      </main>
    )
  }

  let screen: JSX.Element
  let tab: string | null = null

  switch (route.name) {
    case "recommendation":
      screen = <Recommendation />
      break
    case "prayer":
      screen = <PrayerCoach />
      tab = "prayer"
      break
    case "ebenezer":
      screen = <Ebenezer />
      break
    case "family":
      screen = <Family />
      tab = "family"
      break
    case "lesson":
      screen = <LessonView lessonId={route.id} />
      break
    case "community":
      screen = <Community onBack={() => navigate("/")} />
      tab = "community"
      break
    case "dashboard":
      screen = <Dashboard onBack={() => navigate("/")} />
      tab = "journey"
      break
    case "daily":
      screen = <Daily />
      break
    default:
      if (onboarded) {
        screen = <Home />
        tab = "home"
      } else {
        screen = <Landing />
      }
  }

  const tabbed = tab !== null && tab !== "home"

  return (
    <main className={`app${tabbed ? " app--tabbed" : ""}`}>
      {screen}
      {tab && <TabBar active={tab} />}
    </main>
  )
}
