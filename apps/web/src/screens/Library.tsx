import { useState } from "react"
import { ArrowLeft, BookOpen, ChevronRight, Lock } from "lucide-react"
import type { ContentCourse, ContentShelf } from "@emanus/shared/content-catalog"
import { courseIsOpen, courseMissingReviews, visibleContentShelves } from "../content"
import { navigate } from "../router"
import "../library.css"

function Course({ course }: { course: ContentCourse }) {
  const open = courseIsOpen(course)
  const missingReviews = courseMissingReviews(course)
  const reviewLabel = missingReviews.map((review) => ({ pastoral: "pastorală", clinical: "clinică", doctrinal: "doctrinară", safeguarding: "de siguranță" })[review]).join(" și ")
  return <button type="button" className={open ? "libcourse" : "libcourse libcourse--soon"} disabled={!open} onClick={() => { if (open) navigate(`/curs/${encodeURIComponent(course.id)}`) }}>
    <span className="libcourse__main"><span className="libcourse__title">{course.title}</span><span className="libcourse__for">{course.forWhom}</span>{!open && <span className="libcourse__soon">{missingReviews.length > 0 ? `În revizie ${reviewLabel}` : "Se scrie"}</span>}</span>
    {open && <ChevronRight size={18} strokeWidth={1.8} aria-hidden />}
  </button>
}

function Shelf({ shelf }: { shelf: ContentShelf }) {
  const [open, setOpen] = useState(false)
  const ready = shelf.courses.filter(courseIsOpen).length
  const waitingForReview = shelf.courses.some(
    (course) => courseMissingReviews(course).length > 0,
  )
  return <section className="libshelf">
    <button type="button" className="libshelf__head" onClick={() => setOpen(!open)} aria-expanded={open}><span><span className="libshelf__title">{shelf.title}</span><span className="libshelf__blurb">{shelf.blurb}</span></span><ChevronRight size={20} strokeWidth={1.8} aria-hidden className={open ? "libshelf__chev libshelf__chev--open" : "libshelf__chev"} /></button>
    {open && <div className="libshelf__body">{shelf.courses.map((c) => <Course key={c.id} course={c} />)}{ready === 0 && <p className="muted libshelf__none">{waitingForReview ? "Materialul există ca draft, dar rămâne închis până la aprobările umane declarate." : "Raftul acesta este scris pe hârtie, dar încă nu în aplicație. Nu-l punem pe jumătate."}</p>}</div>}
  </section>
}

export function Library() {
  const shelves = visibleContentShelves()
  return <section className="library">
    <button type="button" className="ghost library__back" onClick={() => navigate("/")}><ArrowLeft size={16} aria-hidden /> Azi</button>
    <header className="library__head"><BookOpen size={22} strokeWidth={1.7} aria-hidden /><h1>Biblia și cursurile</h1></header>
    <p className="library__intro">Intră prin întrebarea pe care o ai acum. Cursurile leagă textul biblic de viața reală, fără să înlocuiască citirea Scripturii.</p>
    {shelves.map((s) => <Shelf key={s.id} shelf={s} />)}
    <div className="tile library__gated"><p className="today__kicker"><Lock size={15} aria-hidden /> De la creatori</p><p className="muted">Cursuri scrise de oameni care duc mai departe ce au primit. Se deschide când există cine să citească fiecare lecție înainte să ajungă la tine.</p></div>
  </section>
}
