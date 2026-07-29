import { HandHeart, LifeBuoy, Sunrise } from "lucide-react"
import { Crisis } from "./Crisis"
import { LessonView } from "./LessonView"
import { Gallery } from "./ds/Gallery"
import { hasSeenWelcome, hasStarted } from "./journey"
import { navigate, useHashRoute } from "./router"
import { Doors } from "./screens/Doors"
import { PathEnd } from "./screens/PathEnd"
import { Prayers } from "./screens/Prayers"
import { Today } from "./screens/Today"
import { Welcome } from "./screens/Welcome"
import "./journey.css"

/*
 * Carcasa aplicației. (docs/20 §8)
 *
 * Două taburi, atât: Azi și Rugăciunile mele.
 * Butonul de ajutor stă sus, pe fiecare ecran, și nu se ascunde niciodată.
 *
 * Ordinea porților la prima deschidere:
 *   1. Welcome  — cine suntem și ce NU-ți cerem
 *   2. Doors    — ce te-a adus aici
 *   3. Today    — restul vieții aplicației
 */

function Tabs({ active }: { active: "today" | "prayers" }) {
  return (
    <nav className="tabs2" aria-label="Navigare">
      <button
        type="button"
        className={active === "today" ? "active" : ""}
        onClick={() => navigate("/")}
      >
        <Sunrise size={20} strokeWidth={1.8} aria-hidden />
        <span>Azi</span>
      </button>
      <button
        type="button"
        className={active === "prayers" ? "active" : ""}
        onClick={() => navigate("/rugaciuni")}
      >
        <HandHeart size={20} strokeWidth={1.8} aria-hidden />
        <span>Rugăciuni</span>
      </button>
    </nav>
  )
}

function HelpButton() {
  return (
    <button
      type="button"
      className="helpbar"
      onClick={() => navigate("/criza")}
      aria-label="Am nevoie de ajutor acum"
    >
      <LifeBuoy size={16} strokeWidth={1.9} aria-hidden />
      <span>Am nevoie de ajutor acum</span>
    </button>
  )
}

export default function App() {
  const route = useHashRoute()

  if (route.name === "ds") return <Gallery />
  if (route.name === "crisis") return <Crisis onBack={() => navigate("/")} />

  // Primul contact: nimeni nu ajunge la uși fără să știe unde a intrat.
  if (!hasStarted() && !hasSeenWelcome() && route.name !== "doors") {
    return (
      <main className="app route-anim">
        <Welcome />
      </main>
    )
  }

  // Poarta: nimeni nu intră în aplicație fără să spună o dată ce l-a adus.
  if (route.name === "doors" || !hasStarted()) {
    return (
      <main className="app route-anim">
        <HelpButton />
        <Doors />
      </main>
    )
  }

  if (route.name === "lesson") {
    return (
      <main className="app route-anim">
        <HelpButton />
        <LessonView lessonId={route.id} />
      </main>
    )
  }

  if (route.name === "pathend") {
    return (
      <main className="app route-anim app--tabbed">
        <HelpButton />
        <PathEnd />
        <Tabs active="today" />
      </main>
    )
  }

  const isPrayers = route.name === "prayers"
  return (
    <main key={route.name} className="app route-anim app--tabbed">
      <HelpButton />
      {isPrayers ? <Prayers /> : <Today />}
      <Tabs active={isPrayers ? "prayers" : "today"} />
    </main>
  )
}
