import type { Lesson } from "../domain.js"
import type { LibraryCourse, LibraryShelf } from "./index.js"
import * as base from "./index.js"
import { DOCTRINE_BIBLIA_LESSONS } from "./doctrineBiblia2.js"

export type { CourseState, LibraryCourse, LibraryShelf } from "./index.js"
export * from "./doctrineBiblia.js"
export * from "./doctrineBiblia2.js"

const bibleIds = ["biblia_l1", "biblia_l2", "biblia_l3", "biblia_l4", "biblia_l5", "biblia_l6"]

function openBible(course: LibraryCourse): LibraryCourse {
  return course.id === "doctrine_c1_biblia"
    ? { ...course, lessonIds: bibleIds, state: "live" }
    : course
}

/** Catalogul efectiv livrat aplicației. */
export const SHELVES: LibraryShelf[] = base.SHELVES.map((s) => ({
  ...s,
  courses: s.courses.map(openBible),
}))

export function visibleShelves(): LibraryShelf[] { return SHELVES.filter((s) => !s.gated) }
export function getShelf(id: string): LibraryShelf | undefined { return SHELVES.find((s) => s.id === id) }
export const ALL_LIBRARY_COURSES: LibraryCourse[] = SHELVES.flatMap((s) => s.courses)
export function getLibraryCourse(id: string): LibraryCourse | undefined { return ALL_LIBRARY_COURSES.find((c) => c.id === id) }
export const courseIsOpen = base.courseIsOpen
export const nextCourseLesson = base.nextCourseLesson

export const LIBRARY_LESSONS: Lesson[] = [...base.LIBRARY_LESSONS, ...DOCTRINE_BIBLIA_LESSONS]
export function findLibraryLesson(id: string): Lesson | undefined { return LIBRARY_LESSONS.find((l) => l.id === id) }
export function libraryCourseLessons(courseId: string): Lesson[] {
  const course = getLibraryCourse(courseId)
  return course ? course.lessonIds.map(findLibraryLesson).filter((x): x is Lesson => Boolean(x)) : []
}

export const WRITING_ORDER: string[] = base.WRITING_ORDER.filter((id) => id !== "doctrine_c1_biblia")
