import { useState } from "react"
import { ArrowLeft, BookOpen, Check, ChevronRight, Lock } from "lucide-react"
import type { LibraryCourse, LibraryShelf } from "@emanus/shared/library"
import { courseIsOpen, nextCourseLesson, visibleShelves } from "@emanus/shared/library"
import { libraryCompletedLessonIds } from "../journey"
import { navigate } from "../router"
import "../library.css"

function Course({ course, done }: { course: LibraryCourse; done: string[] }) {
  const open = courseIsOpen(course)
  const completed = course.lessonIds.filter((id) => done.includes(id)).length
  const finished = open && completed >= course.lessonIds.length
  const next = nextCourseLesson(course, done) ?? course.lessonIds[0]
  return <button type="button" className={open ? "libcourse" : "libcourse libcourse--soon"} disabled={!open} onClick={() => { if (open && next) navigate(`/lesson/${next}`) }}>
    <span className="libcourse__main">
      <span className="libcourse__title">{course.title}</span>
      <span className="libcourse__for">{course.forWhom}</span>
      {!open && <span className="libcourse__soon">Se scrie</span>}
      {open && <span className="muted">{finished ? "Terminat" : `${completed}/${course.lessonIds.length} lecții`}</span>}
    </span>
    {finished ? <Check size={18} strokeWidth={1.8} aria-hidden /> : open && <ChevronRight size={18} strokeWidth={1.8} aria-hidden />}
  </button>
}

function Shelf({ shelf, done }: { shelf: LibraryShelf; done: string[] }) {
  const [open, setOpen] = useState(false)
  const ready = shelf.courses.filter(courseIsOpen).length
  return <section className="libshelf">
    <button type="button" className="libshelf__head" onClick={() => setOpen(!open)} aria-expanded={open}><span><span className="libshelf__title">{shelf.title}</span><span className="libshelf__blurb">{shelf.blurb}</span></span><ChevronRight size={20} strokeWidth={1.8} aria-hidden className={open ? "libshelf__chev libshelf__chev--open" : "libshelf__chev"} /></button>
    {open && <div className="libshelf__body">{shelf.courses.map((c) => <Course key={c.id} course={c} done={done} />)}{ready === 0 && <p className="muted libshelf__none">Raftul acesta este scris pe hârtie, dar încă nu în aplicație. Nu-l punem pe jumătate.</p>}</div>}
  </section>
}

export function Library() {
  const shelves = visibleShelves()
  const done = libraryCompletedLessonIds()
  return <section className="library">
    <button type="button" className="ghost library__back" onClick={() => navigate("/")}><ArrowLeft size={16} aria-hidden /> Azi</button>
    <header className="library__head"><BookOpen size={22} strokeWidth={1.7} aria-hidden /><h1>Biblioteca</h1></header>
    <p className="library__intro">Drumul tău merge înainte fără asta. Cursurile de aici țin minte separat unde ai rămas.</p>
    {shelves.map((s) => <Shelf key={s.id} shelf={s} done={done} />)}
    <div className="tile library__gated"><p className="today__kicker"><Lock size={15} aria-hidden /> De la creatori</p><p className="muted">Cursuri scrise de oameni care duc mai departe ce au primit. Se deschide numai după verificarea biblică, de siguranță și de drepturi.</p></div>
  </section>
}
