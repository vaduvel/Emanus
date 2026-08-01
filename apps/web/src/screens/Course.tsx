import { ArrowLeft, BookOpen, Check, ChevronRight, Clock3, Lock } from "lucide-react"
import { contentCourse, courseIsOpen } from "../content"
import { courseLessonsDone } from "../journey"
import { navigate } from "../router"
import "../library.css"

export function Course({ courseId }: { courseId?: string }) {
  const course = contentCourse(courseId)

  if (!course) {
    return (
      <section className="course-screen course-screen--status">
        <h1>Cursul nu este disponibil</h1>
        <p className="muted">Este posibil ca această versiune de conținut să nu mai fie publicată.</p>
        <button type="button" onClick={() => navigate("/biblioteca")}>Înapoi la bibliotecă</button>
      </section>
    )
  }

  const completed = new Set(courseLessonsDone(course.id))
  const nextLessonId = course.lessonIds.find((lessonId) => !completed.has(lessonId))
  const nextIndex = nextLessonId ? course.lessonIds.indexOf(nextLessonId) : -1
  const isOpen = courseIsOpen(course)

  return (
    <section className="course-screen">
      <button type="button" className="ghost library__back" onClick={() => navigate("/biblioteca")}>
        <ArrowLeft size={16} aria-hidden /> Biblioteca
      </button>
      <header className="course-screen__head">
        <BookOpen size={22} strokeWidth={1.7} aria-hidden />
        <div>
          <h1>{course.title}</h1>
          <p>{course.forWhom}</p>
        </div>
      </header>

      {!isOpen ? (
        <div className="tile course-screen__notice">
          <Lock size={18} aria-hidden />
          <p>Acest curs este în redactare. Nu îl deschidem până când lecțiile nu sunt verificate.</p>
        </div>
      ) : (
        <>
          <p className="course-screen__source">{course.source ?? "Curs biblic Emanus"}</p>
          {nextLessonId ? (
            <button
              type="button"
              className="course-screen__continue"
              onClick={() => navigate(`/lesson/${encodeURIComponent(nextLessonId)}`)}
            >
              {nextIndex === 0 ? "Începe cursul" : `Continuă cu lecția ${nextIndex + 1}`}
              <ChevronRight size={18} aria-hidden />
            </button>
          ) : (
            <div className="tile course-screen__notice">
              <Check size={18} aria-hidden />
              <p>Ai ajuns la capătul acestui curs. Poți reveni la orice lecție.</p>
            </div>
          )}

          <ol className="course-screen__lessons">
            {course.lessonIds.map((lessonId, index) => {
              const finished = completed.has(lessonId)
              const available = finished || index === 0 || Boolean(nextLessonId && index <= nextIndex)
              const summary = course.lessons?.find((lesson) => lesson.id === lessonId)
              return (
                <li key={lessonId}>
                  <button
                    type="button"
                    className={`course-lesson${finished ? " course-lesson--done" : ""}`}
                    disabled={!available}
                    onClick={() => navigate(`/lesson/${encodeURIComponent(lessonId)}`)}
                  >
                    <span className="course-lesson__index" aria-hidden>
                      {finished ? <Check size={15} /> : index + 1}
                    </span>
                    <span className="course-lesson__body">
                      <strong>{summary?.title ?? `Lecția ${index + 1}`}</strong>
                      <small>
                        {summary
                          ? `${summary.estMinutes} minute`
                          : finished
                            ? "Parcursă"
                            : available
                              ? "Disponibilă acum"
                              : "Urmează"}
                      </small>
                    </span>
                    {!available
                      ? <Lock size={15} aria-hidden />
                      : summary
                        ? <Clock3 size={16} aria-hidden />
                        : <ChevronRight size={16} aria-hidden />}
                  </button>
                </li>
              )
            })}
          </ol>
        </>
      )}
    </section>
  )
}
