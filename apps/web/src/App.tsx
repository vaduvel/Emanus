import { lazy, Suspense } from "react"
import { createPortal } from "react-dom"
import { BookOpen, HandHeart, HelpCircle, Library as LibraryIcon, LifeBuoy, Sunrise } from "lucide-react"
import { hasSeenWelcome, hasStarted } from "./journey"
import { navigate, useHashRoute } from "./router"
import "./journey.css"
import "./experience.css"
import "./program.css"

const Crisis = lazy(() => import("./Crisis").then((m) => ({ default: m.Crisis })))
const LessonView = lazy(() => import("./LessonView").then((m) => ({ default: m.LessonView })))
const Gallery = lazy(() => import("./ds/Gallery").then((m) => ({ default: m.Gallery })))
const Doors = lazy(() => import("./screens/Doors").then((m) => ({ default: m.Doors })))
const Library = lazy(() => import("./screens/Library").then((m) => ({ default: m.Library })))
const ProgramOverview = lazy(() => import("./screens/ProgramOverview").then((m) => ({ default: m.ProgramOverview })))
const Bible = lazy(() => import("./screens/Bible").then((m) => ({ default: m.Bible })))
const BibleChooser = lazy(() => import("./screens/Bible").then((m) => ({ default: m.BibleChooser })))
const BibleChapterScreen = lazy(() => import("./screens/Bible").then((m) => ({ default: m.BibleChapterScreen })))
const Ask = lazy(() => import("./screens/Ask").then((m) => ({ default: m.Ask })))
const PathEnd = lazy(() => import("./screens/PathEnd").then((m) => ({ default: m.PathEnd })))
const EmmausMap = lazy(() => import("./screens/EmmausMap").then((m) => ({ default: m.EmmausMap })))
const Prayers = lazy(() => import("./screens/Prayers").then((m) => ({ default: m.Prayers })))
const Today = lazy(() => import("./screens/Today").then((m) => ({ default: m.Today })))
const Welcome = lazy(() => import("./screens/Welcome").then((m) => ({ default: m.Welcome })))
// Cele trei daruri de zi (docs/27): fiecare in chunk propriu, ca sa nu incarce
// ecranul Azi — regula de <2s la deschidere (docs/00-DIRECTIE §15).
const Devotional = lazy(() => import("./screens/Devotional"))
const Pergament = lazy(() => import("./screens/Pergament"))
const Candela = lazy(() => import("./screens/Candela"))
const Mesaj = lazy(() => import("./screens/Mesaj"))
// Legamantul familiei (faza G): se intra din devotional, tot in chunk propriu.
const Legamant = lazy(() => import("./screens/Legamant"))

type MainDestination = "today" | "bible" | "library" | "ask" | "prayers"

function Tabs({ active }: { active: MainDestination }) {
  const current = (destination: MainDestination) => active === destination ? "page" as const : undefined
  return createPortal(<nav className="tabs2" aria-label="Navigare principală">
    <button type="button" className={active === "today" ? "active" : ""} aria-current={current("today")} onClick={() => navigate("/")}><Sunrise size={20} strokeWidth={1.8} aria-hidden /><span>Azi</span></button>
    <button type="button" className={active === "bible" ? "active" : ""} aria-current={current("bible")} onClick={() => navigate("/biblia")}><BookOpen size={20} strokeWidth={1.8} aria-hidden /><span>Biblia</span></button>
    <button type="button" className={active === "library" ? "active" : ""} aria-current={current("library")} onClick={() => navigate("/biblioteca")}><LibraryIcon size={20} strokeWidth={1.8} aria-hidden /><span>Bibliotecă</span></button>
    <button type="button" className={active === "ask" ? "active" : ""} aria-current={current("ask")} onClick={() => navigate("/intreaba")}><HelpCircle size={20} strokeWidth={1.8} aria-hidden /><span>Întreabă</span></button>
    <button type="button" className={active === "prayers" ? "active" : ""} aria-current={current("prayers")} onClick={() => navigate("/rugaciuni")}><HandHeart size={20} strokeWidth={1.8} aria-hidden /><span>Rugăciuni</span></button>
  </nav>, document.body)
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
  // Cardul primit de la cineva se deschide si fara cont: ajungi la verset, nu la un zid.
  // Randul asta sta dinadins INAINTEA portii de bun venit.
  else if (route.name === "message") screen = <main key={route.id ?? "mesaj"} className="app route-anim"><HelpButton /><Mesaj cardId={route.id} /></main>
  else if (route.name === "program") screen = <main key={`${route.programId}:${route.showCompletion ? "final" : "overview"}`} className="app app--program route-anim"><ProgramOverview programId={route.programId} showCompletion={route.showCompletion} /></main>
  else if (route.name === "programLesson") screen = <main key={`${route.programId}:${route.lessonId}`} className="app app--lesson route-anim"><LessonView programId={route.programId} lessonId={route.lessonId} /></main>
  else if (route.name === "lesson") screen = <main key={route.id ?? "lesson"} className="app app--lesson route-anim"><LessonView lessonId={route.id} /></main>
  else if (!hasStarted() && !hasSeenWelcome() && route.name !== "doors") screen = <main className="app route-anim"><Welcome /></main>
  else if (route.name === "doors" || !hasStarted()) screen = <main className="app route-anim"><HelpButton /><Doors /></main>
  else if (route.name === "library") screen = <main className="app route-anim app--tabbed app--library"><HelpButton /><Library /><Tabs active="library" /></main>
  else if (route.name === "bible") screen = <main className="app route-anim app--tabbed app--bible"><Bible /><Tabs active="bible" /></main>
  else if (route.name === "bibleChooser") screen = <main className="app route-anim app--tabbed app--bible"><BibleChooser testament={route.testament} bookId={route.bookId} /><Tabs active="bible" /></main>
  else if (route.name === "bibleChapter") screen = <main key={`${route.bookId}-${route.chapter}-${route.verse ?? "chapter"}`} className="app route-anim app--bible"><BibleChapterScreen bookId={route.bookId} chapter={route.chapter} verse={route.verse} /></main>
  else if (route.name === "ask") screen = <main key={`${route.despre ?? "ask"}:${route.returnTo ?? "default"}`} className="app route-anim app--tabbed"><HelpButton /><Ask despre={route.despre} returnTo={route.returnTo} /><Tabs active="ask" /></main>
  else if (route.name === "pathend") screen = <main className="app route-anim"><HelpButton /><PathEnd /></main>
  else if (route.name === "emmaus") screen = <main className="app route-anim app--tabbed"><HelpButton /><EmmausMap /><Tabs active="today" /></main>
  else if (route.name === "devotional") screen = <main className="app route-anim"><HelpButton /><Devotional /></main>
  else if (route.name === "scroll") screen = <main className="app route-anim"><HelpButton /><Pergament /></main>
  else if (route.name === "lamp") screen = <main className="app route-anim"><HelpButton /><Candela /></main>
  else if (route.name === "covenant") screen = <main className="app route-anim"><HelpButton /><Legamant /></main>
  else {
    const isPrayers = route.name === "prayers"
    screen = <main key={route.name} className="app route-anim app--tabbed"><HelpButton />{isPrayers ? <Prayers /> : <Today />}<Tabs active={isPrayers ? "prayers" : "today"} /></main>
  }
  return <Suspense fallback={<Loading />}>{screen}</Suspense>
}
