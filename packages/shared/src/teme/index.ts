import type { Lesson } from "../domain.js"
import { DE_CE_DAM_GRES_LESSONS } from "./deceDamGres.js"

export * from "./deceDamGres.js"

export type TemeCourseState = "in_review" | "published"

export type TemeCourse = {
  id: string
  title: string
  forWhom: string
  plannedLessons: number
  lessonIds: string[]
  state: TemeCourseState
  source: string
}

/**
 * Module noi pe teme. Planul complet al celor 72 de teme este in
 * docs/41-module-teme-poonen.md. Se adauga pe rand, dupa scriere si revizie.
 * Legarea in rafturile Bibliotecii se face intr-un singur pas, dupa integrarea in main.
 */
export const TEME_COURSES: TemeCourse[] = [
  {
    id: "teme_c6_esec",
    title: "De ce dam gres",
    forWhom: "Ai incercat de multe ori si cazi mereu in acelasi loc.",
    plannedLessons: 4,
    lessonIds: DE_CE_DAM_GRES_LESSONS.map((lesson) => lesson.id),
    state: "in_review",
    source: "docs/41-module-teme-poonen.md #6",
  },
]

export const TEME_LESSONS: Lesson[] = [...DE_CE_DAM_GRES_LESSONS]

export function findTemeCourse(id: string): TemeCourse | undefined {
  return TEME_COURSES.find((course) => course.id === id)
}

export function findTemeLesson(id: string): Lesson | undefined {
  return TEME_LESSONS.find((lesson) => lesson.id === id)
}

export function temeCourseLessons(courseId: string): Lesson[] {
  return TEME_LESSONS.filter((lesson) => lesson.courseId === courseId).sort((a, b) => a.order - b.order)
}
