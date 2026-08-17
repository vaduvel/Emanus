import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, BookOpen, ChevronRight, Lock, Search, X } from "lucide-react"
import type { LibraryCourse, LibraryShelf } from "@emanus/shared/library"
import { courseIsOpen, visibleShelves } from "@emanus/shared/library"
import {
  courseProgramId,
  getLearningProgram,
  learningLessonUrl,
  learningProgramCompletionUrl,
  learningProgramUrl,
  programResumeIndex,
} from "../learningPrograms"
import { getLearningProgressSnapshot } from "../learningProgress"
import type { ProgramLearningProgress } from "../learningProgress"
import { navigate } from "../router"
import "../library.css"

type LibraryFilter = "all" | "started" | "completed"

interface CourseViewState {
  programId: string
  status: "not_started" | "in_progress" | "complete"
  statusLabel: string
  currentLessonId?: string
  currentLessonTitle?: string
  updatedAt: number
}

interface CourseEntry {
  course: LibraryCourse
  shelf: LibraryShelf
  state?: CourseViewState
}

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLocaleLowerCase("ro-RO")
    .replace(/\s+/gu, " ")
    .trim()
}

function getCourseViewState(
  course: LibraryCourse,
  progressByProgram: Record<string, ProgramLearningProgress>,
): CourseViewState | undefined {
  if (!courseIsOpen(course)) return undefined
  const programId = courseProgramId(course.id)
  const program = getLearningProgram(programId)
  if (!program || program.lessons.length === 0) return undefined

  const progress = progressByProgram[programId] ?? {
    completedLessonIds: [],
    lastLessonId: null,
    journals: {},
    updatedAt: null,
  }
  const completed = new Set(progress.completedLessonIds)
  const completedCount = program.lessons.filter((lesson) => completed.has(lesson.id)).length
  const currentIndex = programResumeIndex(program, completed, progress.lastLessonId)
  const hasDraft = Boolean(progress.lastLessonId && progress.drafts?.[progress.lastLessonId])
  const complete = currentIndex === -1
  const inProgress = (completedCount > 0 || hasDraft) && !complete
  const currentLesson = currentIndex >= 0 ? program.lessons[currentIndex] : undefined

  return {
    programId,
    status: complete ? "complete" : inProgress ? "in_progress" : "not_started",
    statusLabel: complete
      ? "Încheiat"
      : inProgress
        ? `Continuă sesiunea ${currentIndex + 1}`
        : "Începe",
    currentLessonId: currentLesson?.id,
    currentLessonTitle: currentLesson?.title,
    updatedAt: progress.updatedAt ? Date.parse(progress.updatedAt) || 0 : 0,
  }
}

function matchesSearch(entry: CourseEntry, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true
  const haystack = normalizeSearchText([
    entry.course.title,
    entry.course.forWhom,
    entry.shelf.title,
    entry.shelf.blurb,
  ].join(" "))
  return haystack.includes(normalizedQuery)
}

function matchesFilter(state: CourseViewState | undefined, filter: LibraryFilter): boolean {
  if (filter === "all") return true
  if (filter === "started") return state?.status === "in_progress"
  return state?.status === "complete"
}

function resumeCourse(state: CourseViewState): void {
  if (state.currentLessonId) {
    navigate(learningLessonUrl(state.programId, state.currentLessonId))
    return
  }
  navigate(learningProgramCompletionUrl(state.programId))
}

function Course({ course, state }: { course: LibraryCourse; state: CourseViewState }) {
  const canResume = state.status === "in_progress" && Boolean(state.currentLessonId)
  return <li className={`libcourse libcourse--${state.status}`}>
    <button
      type="button"
      className="libcourse__overview"
      onClick={() => navigate(learningProgramUrl(state.programId))}
      aria-label={`Vezi cursul ${course.title}`}
    >
      <span className="libcourse__main">
        <span className="libcourse__title">{course.title}</span>
        <span className="libcourse__for">{course.forWhom}</span>
        {!canResume ? <span className={`libcourse__state libcourse__state--${state.status}`}>{state.statusLabel}</span> : null}
      </span>
      <ChevronRight size={18} strokeWidth={1.8} aria-hidden />
    </button>
    {canResume ? <button type="button" className="libcourse__resume" aria-label={`${state.statusLabel} — ${course.title}`} onClick={() => resumeCourse(state)}>
      {state.statusLabel}<ChevronRight size={17} strokeWidth={1.8} aria-hidden />
    </button> : null}
  </li>
}

function ActiveCourse({ course, state }: { course: LibraryCourse; state: CourseViewState }) {
  const canResume = state.status === "in_progress" && Boolean(state.currentLessonId)
  return <article className={`library-active library-active--${state.status}`}>
    <button
      type="button"
      className="library-active__overview"
      onClick={() => navigate(learningProgramUrl(state.programId))}
      aria-label={`Vezi cursul ${course.title}`}
    >
      <span className="library-active__icon" aria-hidden><BookOpen size={21} strokeWidth={1.7} /></span>
      <span className="library-active__main">
        <span className="library-active__eyebrow">{state.status === "complete" ? "Curs parcurs" : "În curs"}</span>
        <strong>{course.title}</strong>
        {state.currentLessonTitle
          ? <span className="library-active__lesson">Urmează: {state.currentLessonTitle}</span>
          : <span className="library-active__lesson">Poți reveni oricând la curs.</span>}
      </span>
      <ChevronRight size={21} strokeWidth={1.8} aria-hidden />
    </button>
    <button type="button" className="library-active__action" aria-label={`${canResume ? state.statusLabel : "Vezi încheierea"} — ${course.title}`} onClick={() => resumeCourse(state)}>
      {canResume ? state.statusLabel : "Vezi încheierea"}<ChevronRight size={17} strokeWidth={1.8} aria-hidden />
    </button>
  </article>
}

function Shelf({ shelf, entries, defaultOpen, forceOpen }: {
  shelf: LibraryShelf
  entries: CourseEntry[]
  defaultOpen: boolean
  forceOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  useEffect(() => {
    if (forceOpen) setOpen(true)
  }, [forceOpen])
  const expanded = open
  const titleId = `library-shelf-${shelf.id}-title`
  const bodyId = `library-shelf-${shelf.id}-courses`
  return <section className="libshelf" aria-labelledby={titleId}>
    <h2 className="libshelf__heading">
      <button type="button" className="libshelf__head" onClick={() => setOpen(!open)} aria-controls={bodyId} aria-expanded={expanded}>
        <span><span id={titleId} className="libshelf__title">{shelf.title}</span><span className="libshelf__blurb">{shelf.blurb}</span></span>
        <ChevronRight size={20} strokeWidth={1.8} aria-hidden className={expanded ? "libshelf__chev libshelf__chev--open" : "libshelf__chev"} />
      </button>
    </h2>
    {expanded && <ul id={bodyId} className="libshelf__body">{entries.map((entry) => entry.state ? <Course key={entry.course.id} course={entry.course} state={entry.state} /> : null)}</ul>}
  </section>
}

function PlannedCourses({ entries, forceOpen }: { entries: CourseEntry[]; forceOpen: boolean }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (forceOpen) setOpen(true)
  }, [forceOpen])
  const expanded = open
  if (entries.length === 0) return null

  return <section className="library-planned" aria-labelledby="library-planned-title">
    <h2 className="library-planned__heading">
      <button type="button" className="library-planned__toggle" onClick={() => setOpen(!open)} aria-controls="library-planned-courses" aria-expanded={expanded}>
        <span><Lock size={16} aria-hidden /><span id="library-planned-title">În pregătire</span></span>
        <ChevronRight size={20} strokeWidth={1.8} aria-hidden className={expanded ? "library-planned__chev library-planned__chev--open" : "library-planned__chev"} />
      </button>
    </h2>
    {expanded && <ul id="library-planned-courses" className="library-planned__list">
      {entries.map(({ course, shelf }) => <li key={course.id} className="library-planned__course">
        <span className="library-planned__shelf">{shelf.title}</span>
        <strong>{course.title}</strong>
        <span>{course.forWhom}</span>
        <span className="libcourse__soon">Se scrie</span>
      </li>)}
    </ul>}
  </section>
}

export function Library() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<LibraryFilter>("all")
  const shelves = useMemo(() => visibleShelves(), [])
  const progressByProgram = useMemo(() => getLearningProgressSnapshot(), [])
  const normalizedQuery = normalizeSearchText(query)

  const entries = useMemo<CourseEntry[]>(() => shelves.flatMap((shelf) => shelf.courses.map((course) => ({
    course,
    shelf,
    state: getCourseViewState(course, progressByProgram),
  }))), [progressByProgram, shelves])

  const liveEntries = entries.filter((entry) => courseIsOpen(entry.course) && entry.state)
  const plannedEntries = entries.filter((entry) => !courseIsOpen(entry.course))
  const activeEntries = liveEntries
    .filter((entry) => entry.state?.status !== "not_started")
    .sort((a, b) => {
      const aComplete = a.state?.status === "complete" ? 1 : 0
      const bComplete = b.state?.status === "complete" ? 1 : 0
      return aComplete - bComplete
        || (b.state?.updatedAt ?? 0) - (a.state?.updatedAt ?? 0)
        || a.course.title.localeCompare(b.course.title, "ro")
    })
  const filteredLiveEntries = liveEntries.filter((entry) => matchesSearch(entry, normalizedQuery) && matchesFilter(entry.state, filter))
  const filteredShelves = shelves
    .map((shelf) => ({
      shelf,
      entries: filteredLiveEntries.filter((entry) => entry.shelf.id === shelf.id),
    }))
    .filter((group) => group.entries.length > 0)
  const filteredPlannedEntries = filter === "all"
    ? plannedEntries.filter((entry) => matchesSearch(entry, normalizedQuery))
    : []
  const defaultShelfId = activeEntries[0]?.shelf.id
    ?? shelves.find((shelf) => shelf.id === "lib_temelie")?.id
    ?? shelves[0]?.id
  const forceShelvesOpen = Boolean(normalizedQuery) || filter !== "all"
  const showProgressSection = activeEntries.length > 0 && !normalizedQuery && filter === "all"
  const hasCatalogResults = filteredShelves.length > 0 || filteredPlannedEntries.length > 0
  const resultCount = filteredLiveEntries.length + filteredPlannedEntries.length

  return <section className="library">
    <button type="button" className="ghost library__back" onClick={() => navigate("/")}><ArrowLeft size={16} aria-hidden /> Azi</button>
    <header className="library__head"><BookOpen size={22} strokeWidth={1.7} aria-hidden /><h1>Biblioteca</h1></header>
    <p className="library__intro">Drumul tău merge înainte fără asta. Aici intri doar când vrei să înveți și altceva.</p>

    <div className="library-tools">
      <div className="library-search" role="search">
        <Search size={20} strokeWidth={1.8} aria-hidden />
        <input
          id="library-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Caută un curs sau un subiect"
          aria-label="Caută în Bibliotecă"
        />
        {query ? <button type="button" className="library-search__clear" onClick={() => setQuery("")} aria-label="Șterge căutarea"><X size={18} aria-hidden /></button> : null}
      </div>
      <div className="library-filters" role="group" aria-label="Filtrează cursurile">
        {([
          ["all", "Toate"],
          ["started", "Începute"],
          ["completed", "Încheiate"],
        ] as const).map(([value, label]) => <button
          key={value}
          type="button"
          className={filter === value ? "library-filter library-filter--active" : "library-filter"}
          aria-pressed={filter === value}
          onClick={() => setFilter(value)}
        >{label}</button>)}
      </div>
    </div>

    {showProgressSection ? <section className="library-progress" aria-labelledby="library-progress-title">
      <div className="library-progress__heading">
        <p className="library__section-label">Cursurile tale</p>
        <h2 id="library-progress-title">Continuă de unde ai rămas</h2>
      </div>
      <div className="library-progress__list">
        {activeEntries.map((entry) => entry.state ? <ActiveCourse key={entry.course.id} course={entry.course} state={entry.state} /> : null)}
      </div>
    </section> : null}

    <div className="library-catalog">
      <div className="library-catalog__heading">
        <p className="library__section-label">{normalizedQuery || filter !== "all" ? "Rezultate" : "Alege un raft"}</p>
        {normalizedQuery || filter !== "all" ? <p className="library-results__summary" aria-live="polite">{resultCount === 1 ? "1 curs găsit" : `${resultCount} cursuri găsite`}</p> : null}
      </div>
      <div className="library-catalog__shelves">
        {filteredShelves.map(({ shelf, entries: shelfEntries }) => <Shelf
          key={shelf.id}
          shelf={shelf}
          entries={shelfEntries}
          defaultOpen={shelf.id === defaultShelfId}
          forceOpen={forceShelvesOpen}
        />)}
      </div>
      <PlannedCourses entries={filteredPlannedEntries} forceOpen={Boolean(normalizedQuery)} />
      {!hasCatalogResults ? <div className="library-empty" role="status">
        <BookOpen size={22} strokeWidth={1.7} aria-hidden />
        <p>Nu am găsit un curs pentru această căutare.</p>
        <button type="button" className="library-empty__reset" onClick={() => { setQuery(""); setFilter("all") }}>Arată toate cursurile</button>
      </div> : null}
    </div>

    <div className="tile library__gated"><p className="today__kicker"><Lock size={15} aria-hidden /> De la creatori</p><p className="muted">Cursuri scrise de oameni care duc mai departe ce au primit. Se deschide când există cine să citească fiecare lecție înainte să ajungă la tine.</p></div>
  </section>
}
