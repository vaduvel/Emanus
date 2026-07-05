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

  if (route.name === "recommendation") {
    return (
      <main className="app">
        <Recommendation />
      </main>
    )
  }

  if (route.name === "prayer") {
    return (
      <main className="app">
        <PrayerCoach />
      </main>
    )
  }

  if (route.name === "ebenezer") {
    return (
      <main className="app">
        <Ebenezer />
      </main>
    )
  }

  if (route.name === "family") {
    return (
      <main className="app">
        <Family />
      </main>
    )
  }

  if (route.name === "lesson") {
    return (
      <main className="app">
        <LessonView lessonId={route.id} />
      </main>
    )
  }

  if (route.name === "community") {
    return (
      <main className="app">
        <Community onBack={() => navigate("/")} />
      </main>
    )
  }

  if (route.name === "dashboard") {
    return (
      <main className="app">
        <Dashboard onBack={() => navigate("/")} />
      </main>
    )
  }

  if (route.name === "daily") {
    return (
      <main className="app">
        <Daily />
      </main>
    )
  }

  // home
  if (onboarded) {
    return (
      <main className="app">
        <Home />
      </main>
    )
  }
  return (
    <main className="app">
      <Landing />
    </main>
  )
}
