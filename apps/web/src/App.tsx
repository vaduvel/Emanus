import { useState } from "react"
import { Feather } from "lucide-react"
import { Community } from "./Community"
import { Crisis } from "./Crisis"
import { Daily } from "./Daily"
import { Dashboard } from "./Dashboard"
import { Ebenezer } from "./Ebenezer"
import { Family } from "./Family"
import { GrowthOnboarding } from "./GrowthOnboarding"
import { Home } from "./Home"
import { LessonView } from "./LessonView"
import { Onboarding } from "./Onboarding"
import { PrayerCoach } from "./PrayerCoach"
import { Recommendation } from "./Recommendation"
import { TabBar } from "./components"
import { Button } from "./ds"
import { Gallery } from "./ds/Gallery"
import { navigate, useHashRoute } from "./router"
import { isOnboarded } from "./session"

function Landing() {
  return (
    <section className="landing">
      <div className="landing__icon">
        <Feather size={40} strokeWidth={1.6} aria-hidden />
      </div>
      <h1>Emanus</h1>
      <p className="landing__tag">Dumnezeu cu tine, pas cu pas.</p>
      <p className="muted">Lеcții scurte, ca o conversație. Descoperă cine ești, cu adevărat.</p>
      <div className="landing__actions">
        <Button variant="primary" block onClick={() => navigate("/lesson/teens_m1_c1_l1")}>
          Încearcă prima lecție
        </Button>
        <Button variant="secondary" block onClick={() => navigate("/onboarding")}>
          Începe călătoria mea
        </Button>
      </div>
    </section>
  )
}

export default function App() {
  const route = useHashRoute()
  const [onboarded, setOnb] = useState(isOnboarded())

  // DS gallery is standalone (no shell, no onboarding gate).
  if (route.name === "ds") {
    return <Gallery />
  }

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
    case "growth":
      screen = <GrowthOnboarding />
      tab = "journey"
      break
    case "crisis":
      screen = <Crisis onBack={() => navigate("/")} />
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
