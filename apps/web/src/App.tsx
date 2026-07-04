import { useState } from "react"
import { Community } from "./Community"
import { Dashboard } from "./Dashboard"
import { LessonView } from "./LessonView"
import { Onboarding } from "./Onboarding"
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
            navigate("/dashboard")
          }}
        />
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
        <Community onBack={() => navigate(onboarded ? "/dashboard" : "/")} />
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

  // home
  if (onboarded) {
    return (
      <main className="app">
        <Dashboard onBack={() => navigate("/lesson/teens_m1_c1_l1")} />
      </main>
    )
  }
  return (
    <main className="app">
      <Landing />
    </main>
  )
}
