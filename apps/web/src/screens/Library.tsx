import { useState } from "react"
import { ArrowLeft, BookOpen, ChevronRight, Lock } from "lucide-react"
import type { LibraryCourse, LibraryShelf } from "@emanus/shared"
import { courseIsOpen, visibleShelves } from "@emanus/shared"
import { navigate } from "../router"

/*
 * Biblioteca. (docs/21, decizia din chat)
 *
 * Ce e: raftul de cursuri, dupa SUBIECT. Se deschide oricand, din "Azi".
 * Ce NU e: poarta de intrare in aplicatie. Nimeni nu ajunge aici la instalare
 * si nimeni nu e pus sa spuna ce e (varsta, sex, rol) ca sa primeasca ceva.
 *
 * Ce nu are voie sa apara aici: procent parcurs, nivel, punctaj, "3 din 5".
 * Un curs e ori deschis, ori inca nescris. Atat.
 *
 * Durerile (rusine, neiertare, anxietate, singuratate, recadere) NU sunt aici.
 * Alea sunt camerele din paths/ si se intra pe usa, cu parcurs.
 */

function Course({ course }: { course: LibraryCourse }) {
  const open = courseIsOpen(course)
  const first = course.lessonIds[0]

  return (
    <button
      type="button"
      className={open ? "libcourse" : "libcourse libcourse--soon"}
      disabled={!open}
      onClick={() => {
        if (open && first) navigate(`/lesson/${first}`)
      }}
    >
      <span className="libcourse__main">
        <span className="libcourse__title">{course.title}</span>
        <span className="libcourse__for">{course.forWhom}</span>
        {!open && <span className="libcourse__soon">Se scrie</span>}
      </span>
      {open && <ChevronRight size={18} strokeWidth={1.8} aria-hidden />}
    </button>
  )
}

function Shelf({ shelf }: { shelf: LibraryShelf }) {
  const [open, setOpen] = useState(false)
  const ready = shelf.courses.filter(courseIsOpen).length

  return (
    <section className="libshelf">
      <button
        type="button"
        className="libshelf__head"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>
          <span className="libshelf__title">{shelf.title}</span>
          <span className="libshelf__blurb">{shelf.blurb}</span>
        </span>
        <ChevronRight
          size={20}
          strokeWidth={1.8}
          aria-hidden
          className={open ? "libshelf__chev libshelf__chev--open" : "libshelf__chev"}
        />
      </button>

      {open && (
        <div className="libshelf__body">
          {shelf.courses.map((c) => (
            <Course key={c.id} course={c} />
          ))}
          {ready === 0 && (
            <p className="muted libshelf__none">
              Raftul asta e scris pe hartie, dar inca nu in aplicatie. Nu-l punem pe
              jumatate.
            </p>
          )}
        </div>
      )}
    </section>
  )
}

export function Library() {
  const shelves = visibleShelves()

  return (
    <section className="library">
      <button type="button" className="ghost library__back" onClick={() => navigate("/")}>
        <ArrowLeft size={16} aria-hidden /> Azi
      </button>

      <header className="library__head">
        <BookOpen size={22} strokeWidth={1.7} aria-hidden />
        <h1>Biblioteca</h1>
      </header>

      <p className="library__intro">
        Drumul tau merge inainte fara asta. Aici intri doar cand vrei sa inveti si
        altceva.
      </p>

      {shelves.map((s) => (
        <Shelf key={s.id} shelf={s} />
      ))}

      {/*
        Raftul de creatori exista in cod, dar nu se arata pana cand un om real
        valideaza doctrina. (docs/22 §10.2) Spunem de ce, nu ascundem.
      */}
      <div className="tile library__gated">
        <p className="today__kicker">
          <Lock size={15} aria-hidden /> De la creatori
        </p>
        <p className="muted">
          Cursuri scrise de oameni care duc mai departe ce au primit. Se deschide cand
          exista cine sa citeasca fiecare lectie inainte sa ajunga la tine.
        </p>
      </div>
    </section>
  )
}
