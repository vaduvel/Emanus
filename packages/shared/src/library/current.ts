import type { Lesson } from "../domain.js"
import type { LibraryCourse, LibraryShelf } from "./index.js"
import * as base from "./index.js"
import { DOCTRINE_BIBLIA_LESSONS } from "./doctrineBiblia2.js"
import { DOCTRINE_BISERICA_LESSONS } from "./doctrineBiserica2.js"
import { RUGACIUNE_INCEPUT_LESSONS } from "./rugaciuneInceput3.js"
import { SPIRITUAL_LUMEA_LESSONS } from "./spiritualLumeaNevazuta2.js"
import { SPIRITUAL_DISCERN_LESSONS } from "./spiritualDiscernamant2.js"
import { SPIRITUAL_BLESTEM_LESSONS } from "./spiritualBlesteme2.js"

export type { CourseState, LibraryCourse, LibraryShelf } from "./index.js"
export * from "./doctrineBiblia.js"
export * from "./doctrineBiblia2.js"
export * from "./doctrineBiserica.js"
export * from "./doctrineBiserica2.js"
export * from "./rugaciuneInceput.js"
export * from "./rugaciuneInceput2.js"
export * from "./rugaciuneInceput3.js"
export * from "./spiritualLumeaNevazuta.js"
export * from "./spiritualLumeaNevazuta2.js"
export * from "./spiritualDiscernamant.js"
export * from "./spiritualDiscernamant2.js"
export * from "./spiritualBlesteme.js"
export * from "./spiritualBlesteme2.js"

const liveCourses: Record<string, string[]> = {
  doctrine_c1_biblia: ["biblia_l1", "biblia_l2", "biblia_l3", "biblia_l4", "biblia_l5", "biblia_l6"],
  doctrine_c3_biserica: ["biserica_l1", "biserica_l2", "biserica_l3", "biserica_l4", "biserica_l5"],
  lib_rug_inceput: Array.from({ length: 9 }, (_, i) => `rug_inceput_l${i + 1}`),
  spiritual_c1_lumea_nevazuta: Array.from({ length: 6 }, (_, i) => `spirit_lumea_l${i + 1}`),
  spiritual_c2_discernamant: Array.from({ length: 6 }, (_, i) => `spirit_discern_l${i + 1}`),
  spiritual_c3_blessings: Array.from({ length: 6 }, (_, i) => `spirit_blestem_l${i + 1}`),
}
const open = (course: LibraryCourse): LibraryCourse => {
  const lessonIds = liveCourses[course.id]
  return lessonIds ? { ...course, lessonIds, state: "live" } : course
}
const spiritualShelf: LibraryShelf = {
  id: "lib_spiritual", title: "Lumea nevăzută și libertatea",
  blurb: "Îngeri, demoni, discernământ și libertatea în Hristos — fără folclor, panică sau diagnostice prin ecran.",
  courses: [
    { id: "spiritual_c1_lumea_nevazuta", title: "Lumea nevăzută: ce spune Biblia", forWhom: "Vrei să înțelegi îngerii, demonii și autoritatea lui Iisus.", plannedLessons: 6, lessonIds: liveCourses.spiritual_c1_lumea_nevazuta, state: "live", source: "Scriptura; Carta doctrinară; cercetare Allen Nolan" },
    { id: "spiritual_c2_discernamant", title: "Discerne lupta", forWhom: "Nu știi dacă trăirea vine din fire, lume, traumă, boală sau atac spiritual.", plannedLessons: 6, lessonIds: liveCourses.spiritual_c2_discernamant, state: "live", source: "Scriptura; Carta doctrinară; îngrijire interdisciplinară" },
    { id: "spiritual_c3_blessings", title: "Blesteme, legături și uși deschise", forWhom: "Te temi de trecut, practici oculte sau tipare de familie.", plannedLessons: 6, lessonIds: liveCourses.spiritual_c3_blessings, state: "live", source: "Scriptura; Carta doctrinară" },
    { id: "spiritual_c4_libertate", title: "Libertate și autoritate în Hristos", forWhom: "Vrei să înțelegi pocăința, renunțarea, împotrivirea și rugăciunea pentru eliberare.", plannedLessons: 7, lessonIds: [], state: "planned" },
  ],
}
export const SHELVES: LibraryShelf[] = [...base.SHELVES.map((s) => ({ ...s, courses: s.courses.map(open) })), spiritualShelf]
export function visibleShelves(): LibraryShelf[] { return SHELVES.filter((s) => !s.gated) }
export function getShelf(id: string): LibraryShelf | undefined { return SHELVES.find((s) => s.id === id) }
export const ALL_LIBRARY_COURSES = SHELVES.flatMap((s) => s.courses)
export function getLibraryCourse(id: string): LibraryCourse | undefined { return ALL_LIBRARY_COURSES.find((c) => c.id === id) }
export const courseIsOpen = base.courseIsOpen
export const nextCourseLesson = base.nextCourseLesson
export const LIBRARY_LESSONS: Lesson[] = [...base.LIBRARY_LESSONS, ...DOCTRINE_BIBLIA_LESSONS, ...DOCTRINE_BISERICA_LESSONS, ...RUGACIUNE_INCEPUT_LESSONS, ...SPIRITUAL_LUMEA_LESSONS, ...SPIRITUAL_DISCERN_LESSONS, ...SPIRITUAL_BLESTEM_LESSONS]
export function findLibraryLesson(id: string): Lesson | undefined { return LIBRARY_LESSONS.find((l) => l.id === id) }
export function libraryCourseLessons(courseId: string): Lesson[] { const c = getLibraryCourse(courseId); return c ? c.lessonIds.map(findLibraryLesson).filter((x): x is Lesson => Boolean(x)) : [] }
const remainingBase = base.WRITING_ORDER.filter((id) => !["doctrine_c1_biblia", "doctrine_c3_biserica", "lib_rug_inceput"].includes(id))
export const WRITING_ORDER = ["spiritual_c4_libertate", ...remainingBase]
