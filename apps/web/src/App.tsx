import { lazy, Suspense } from "react"
import { HandHeart, LifeBuoy, Sunrise } from "lucide-react"
import { hasSeenWelcome, hasStarted } from "./journey"
import { navigate, useHashRoute } from "./router"
import "./journey.css"

const Crisis = lazy(() => import("./Crisis").then((m) => ({ default: m.Crisis })))
const LessonView = lazy(() => import("./LessonView").then((m) => ({ default: m.LessonView })))
const Gallery = lazy(() => import("./ds/Gallery").then((m) => ({ default: m.Gallery })))
const Doors = lazy(() => import("./screens/Doors").then((m) => ({ default: m.Doors })))
const Library = lazy(() => import("./screens/Library").then((m) => ({ default: m.Library })))
const PathEnd = lazy(() => import("./screens/PathEnd").then((m) => ({ default: m.PathEnd })))
const Prayers = lazy(() => import("./screens/Prayers").then((m) => ({ default: m.Prayers })))
const Today = lazy(() => import("./screens/Today").then((m) => ({ default: m.Today })))
const Welcome = lazy(() => import("./screens/Welcome").then((m) => ({ default: m.Welcome })))

function Tabs({ active }: { active: "today" | "prayers" }) {
  return <nav className="tabs2" aria-label="Navigare"><button type="button" className={active === "today" ? "active" : ""} onClick={() => navigate("/")}><Sunrise size={20} strokeWidth={1.8} aria-hidden /><span>Azi</span></button><button type="button" className={active === "prayers" ? "active" : ""} onClick={() => navigate("/rugaciuni")}><HandHeart size={20} strokeWidth={1.8} aria-hidden /><span>Rugăciuni</span></button></nav>
}

function HelpButton() {
  return <button type="button" className="helpbar" onClick={() => navigate("/criza")} aria-label="Am nevoie de ajutor acum"><LifeBuoy size={16} strokeWidth={1.9} aria-hidden /><span>Am nevoie de ajutor acum</span></button>
}

function Loading() { return <div className="app"><p className="muted">Se deschide…</p></div> }

export default function App() {
  const route = useHashRoute()
  let screen
  if (route.name === "ds") screen = <Gallery />
  else if (route.name === "crisis") screen = <Crisis onBack={() => navigate("/")} />
  else if (!hasStarted() && !hasSeenWelcome() && route.name !== "doors") screen = <main className="app route-anim"><Welcome /></main>
  else if (route.name === "doors" || !hasStarted()) screen = <main className="app route-anim"><HelpButton /><Doors /></main>
  else if (route.name === "lesson") screen = <main className="app route-anim"><HelpButton /><LessonView lessonId={route.id} /></main>
  else if (route.name === "library") screen = <main className="app route-anim app--tabbed"><HelpButton /><Library /><Tabs active="today" /></main>
  else if (route.name === "pathend") screen = <main className="app route-anim app--tabbed"><HelpButton /><PathEnd /><Tabs active="today" /></main>
  else {
    const isPrayers = route.name === "prayers"
    screen = <main key={route.name} className="app route-anim app--tabbed"><HelpButton />{isPrayers ? <Prayers /> : <Today />}<Tabs active={isPrayers ? "prayers" : "today"} /></main>
  }
  return <Suspense fallback={<Loading />}>{screen}</Suspense>
}
