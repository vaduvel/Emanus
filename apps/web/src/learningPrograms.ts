import type { Lesson } from "@emanus/shared/domain"
import { ALL_LIBRARY_COURSES, LIBRARY_LESSONS, courseIsOpen } from "@emanus/shared/library"
import { ALL_DOORS, PATHS, getPathForDoor, isPathReviewed } from "@emanus/shared/paths"

export type LearningProgramKind = "gate_path" | "course" | "discipleship"
export type LearningCadence = "guided" | "self_paced" | "daily" | "weekly"

export interface LearningProgramCompletion {
  eyebrow: string
  title: string
  body: string
  nextSteps: string[]
  shareText: string
}

interface CourseExperienceCopy {
  promise?: string
  outcomes?: string[]
  completion?: LearningProgramCompletion
  unlockPolicy?: LearningProgram["unlockPolicy"]
}

export interface LearningProgram {
  id: string
  sourceId: string
  /** Ușa exactă, când programul folosește o secvență contextuală a aceluiași drum. */
  doorId?: string
  /** Parcurs retras din alegere, păstrat numai pentru oamenii care îl aveau deja început. */
  legacyOnly?: boolean
  kind: LearningProgramKind
  cadence: LearningCadence
  unlockPolicy: "sequential" | "open"
  title: string
  promise: string
  lessons: Lesson[]
  plannedSessions: number
  sourceLabel: string
  practices?: string[]
  outcomes?: string[]
  completion?: LearningProgramCompletion
}

const courseExperienceCopy: Record<string, CourseExperienceCopy> = {
  lib_fundamentul: {
    promise: "Opt conversații care așază povestea întreagă: de ce ai fost creat, ce s-a rupt, ce a făcut Iisus și cum poți continua cu El.",
    outcomes: [
      "De ce ai fost creat și de unde vine valoarea ta.",
      "Ce s-a rupt și ce a făcut Iisus pentru tine.",
      "Cum poți răspunde și cum continui în ziua de mâine.",
    ],
    unlockPolicy: "open",
    completion: {
      eyebrow: "Temelia este așezată",
      title: "De aici începe drumul, nu performanța",
      body: "Nu trebuie să dovedești că meriți să fii primit. Revino la adevărurile de aici când ai nevoie și fă următorul pas împreună cu oameni reali.",
      nextSteps: [
        "Vorbește cu Dumnezeu zilnic, în cuvintele tale.",
        "Citește Scriptura, începând cu Ioan 1.",
        "Spune unui om de încredere și caută o biserică sănătoasă.",
      ],
      shareText: "Îți trimit Fundamentul: opt conversații scurte despre povestea credinței și un loc bun de unde să începi.",
    },
  },
}

const libraryLessonById = new Map(LIBRARY_LESSONS.map((lesson) => [lesson.id, lesson] as const))

const gatePrograms: LearningProgram[] = PATHS
  .filter((path) => isPathReviewed(path))
  .map((path) => ({
    id: pathProgramId(path.id),
    sourceId: path.id,
    kind: "gate_path",
    cadence: "guided",
    unlockPolicy: "sequential",
    title: path.title,
    promise: path.promise,
    lessons: path.lessons,
    plannedSessions: path.lessons.length,
    sourceLabel: "Traseu Emanus",
    practices: path.practices,
    ...(!path.offerAtPathEnd ? { legacyOnly: true } : {}),
  }))

const doorPrograms: LearningProgram[] = ALL_DOORS.flatMap((door) => {
  const path = getPathForDoor(door.id)
  if (!path || !isPathReviewed(path)) return []
  return [{
    id: doorProgramId(door.id),
    sourceId: path.id,
    doorId: door.id,
    kind: "gate_path" as const,
    cadence: "guided" as const,
    unlockPolicy: "sequential" as const,
    title: path.title,
    promise: path.promise,
    lessons: path.lessons,
    plannedSessions: path.lessons.length,
    sourceLabel: "Traseu Emanus",
    practices: path.practices,
  }]
})

const coursePrograms: LearningProgram[] = ALL_LIBRARY_COURSES.filter(courseIsOpen).map((course) => {
  const experience = courseExperienceCopy[course.id]
  return {
    id: courseProgramId(course.id),
    sourceId: course.id,
    kind: "course",
    cadence: "self_paced",
    unlockPolicy: experience?.unlockPolicy ?? "sequential",
    title: course.title,
    promise: experience?.promise ?? course.forWhom,
    lessons: course.lessonIds
      .map((lessonId) => libraryLessonById.get(lessonId))
      .filter((lesson): lesson is Lesson => Boolean(lesson)),
    plannedSessions: course.plannedLessons,
    sourceLabel: "Biblioteca Emanus",
    outcomes: experience?.outcomes,
    completion: experience?.completion,
  }
})

export const LEARNING_PROGRAMS: LearningProgram[] = [...gatePrograms, ...doorPrograms, ...coursePrograms]
const programById = new Map(LEARNING_PROGRAMS.map((program) => [program.id, program] as const))

export function pathProgramId(pathId: string): string {
  return `path:${pathId}`
}

export function doorProgramId(doorId: string): string {
  return `door:${doorId}`
}

export function courseProgramId(courseId: string): string {
  return `course:${courseId}`
}

export function getLearningProgram(programId: string | null | undefined): LearningProgram | undefined {
  if (!programId) return undefined
  return programById.get(programId)
}

export function activeGateProgramId(pathId: string, doorId?: string | null): string {
  const contextualId = doorId ? doorProgramId(doorId) : null
  return contextualId && programById.has(contextualId) ? contextualId : pathProgramId(pathId)
}

export function findProgramForLesson(lessonId: string | null | undefined): LearningProgram | undefined {
  if (!lessonId) return undefined
  return LEARNING_PROGRAMS.find((program) => program.lessons.some((lesson) => lesson.id === lessonId))
}

export function learningProgramUrl(programId: string): string {
  return `/program/${encodeURIComponent(programId)}`
}

export function learningProgramCompletionUrl(programId: string): string {
  return `${learningProgramUrl(programId)}?incheiere=1`
}

export function learningLessonUrl(programId: string, lessonId: string): string {
  return `${learningProgramUrl(programId)}/lesson/${encodeURIComponent(lessonId)}`
}

export function programSessionIndex(program: LearningProgram, lessonId: string): number {
  return program.lessons.findIndex((lesson) => lesson.id === lessonId)
}

export function programResumeIndex(
  program: LearningProgram,
  completedLessonIds: Iterable<string>,
  preferredLessonId?: string | null,
): number {
  const completed = new Set(completedLessonIds)
  const firstIncomplete = program.lessons.findIndex((lesson) => !completed.has(lesson.id))
  if (firstIncomplete < 0 || program.unlockPolicy === "sequential" || !preferredLessonId) return firstIncomplete

  const preferredIndex = programSessionIndex(program, preferredLessonId)
  if (preferredIndex < 0) return firstIncomplete
  if (!completed.has(preferredLessonId)) return preferredIndex

  const nextIncomplete = program.lessons.findIndex(
    (lesson, index) => index > preferredIndex && !completed.has(lesson.id),
  )
  if (nextIncomplete >= 0) return nextIncomplete
  return firstIncomplete
}

export function programDurationMinutes(program: LearningProgram): number {
  return program.lessons.reduce((total, lesson) => total + lesson.estMinutes, 0)
}
