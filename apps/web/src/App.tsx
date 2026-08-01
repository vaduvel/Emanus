import { lazy, Suspense } from "react"
import { LifeBuoy } from "lucide-react"
import { TabBar } from "./components/TabBar"
import { hasSeenWelcome, hasStarted } from "./journey"
import { navigate, useHashRoute } from "./router"
import "./journey.css"

const Ask = lazy(() => import("./screens/Ask").then((module) => ({ default: module.Ask })))
const Bible = lazy(() => import("./screens/Bible").then((module) => ({ default: module.Bible })))
const BibleChapterScreen = lazy(() =>
  import("./screens/Bible").then((module) => ({ default: module.BibleChapterScreen })),
)
const Crisis = lazy(() => import("./Crisis").then((module) => ({ default: module.Crisis })))
const Doors = lazy(() => import("./screens/Doors").then((module) => ({ default: module.Doors })))
const Gallery = lazy(() => import("./ds/Gallery").then((module) => ({ default: module.Gallery })))
const LessonView = lazy(() =>
  import("./LessonView").then((module) => ({ default: module.LessonView })),
)
const Library = lazy(() =>
  import("./screens/Library").then((module) => ({ default: module.Library })),
)
const Course = lazy(() =>
  import("./screens/Course").then((module) => ({ default: module.Course })),
)
const PathEnd = lazy(() =>
  import("./screens/PathEnd").then((module) => ({ default: module.PathEnd })),
)
const Prayers = lazy(() =>
  import("./screens/Prayers").then((module) => ({ default: module.Prayers })),
)
const Profile = lazy(() =>
  import("./screens/Profile").then((module) => ({ default: module.Profile })),
)
const Today = lazy(() =>
  import("./screens/Today").then((module) => ({ default: module.Today })),
)
const Welcome = lazy(() =>
  import("./screens/Welcome").then((module) => ({ default: module.Welcome })),
)

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

function TabbedScreen({
  active,
  children,
}: {
  active: string
  children: React.ReactNode
}) {
  return (
    <main className="app route-anim app--tabbed">
      <HelpButton />
      {children}
      <TabBar active={active} />
    </main>
  )
}

function Loading() {
  return (
    <div className="app">
      <p className="muted">Se deschide…</p>
    </div>
  )
}

export default function App() {
  const route = useHashRoute()
  const isLessonPreview =
    route.name === "lesson" &&
    new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("preview") === "1"
  let screen: React.ReactNode

  if (route.name === "ds") {
    screen = <Gallery />
  } else if (route.name === "crisis") {
    screen = <Crisis intents={route.intents} onBack={() => navigate("/")} />
  } else if (isLessonPreview && route.name === "lesson") {
    screen = (
      <main className="app route-anim">
        <HelpButton />
        <LessonView lessonId={route.id} />
      </main>
    )
  } else if (!hasStarted() && !hasSeenWelcome() && route.name !== "doors") {
    screen = (
      <main className="app route-anim">
        <Welcome />
      </main>
    )
  } else if (route.name === "doors" || !hasStarted()) {
    screen = (
      <main className="app route-anim">
        <HelpButton />
        <Doors />
      </main>
    )
  } else if (route.name === "lesson") {
    screen = (
      <main className="app route-anim">
        <HelpButton />
        <LessonView lessonId={route.id} />
      </main>
    )
  } else if (route.name === "library") {
    screen = (
      <TabbedScreen active="bible">
        <Library />
      </TabbedScreen>
    )
  } else if (route.name === "course") {
    screen = (
      <TabbedScreen active="bible">
        <Course courseId={route.id} />
      </TabbedScreen>
    )
  } else if (route.name === "bible") {
    screen = (
      <TabbedScreen active="bible">
        <Bible />
      </TabbedScreen>
    )
  } else if (route.name === "bibleChapter") {
    screen = (
      <TabbedScreen active="bible">
        <BibleChapterScreen bookId={route.bookId} chapter={route.chapter} />
      </TabbedScreen>
    )
  } else if (route.name === "ask") {
    screen = (
      <TabbedScreen active="ask">
        <Ask despre={route.despre} />
      </TabbedScreen>
    )
  } else if (route.name === "people" || route.name === "prayers") {
    screen = (
      <TabbedScreen active="people">
        <Prayers title="Ai mei în rugăciune" />
      </TabbedScreen>
    )
  } else if (route.name === "profile") {
    screen = (
      <TabbedScreen active="profile">
        <Profile />
      </TabbedScreen>
    )
  } else if (route.name === "pathend") {
    screen = (
      <TabbedScreen active="today">
        <PathEnd />
      </TabbedScreen>
    )
  } else {
    screen = (
      <TabbedScreen active="today">
        <Today />
      </TabbedScreen>
    )
  }

  return <Suspense fallback={<Loading />}>{screen}</Suspense>
}
