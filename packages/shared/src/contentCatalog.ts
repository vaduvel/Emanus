import { GENERATED_CONTENT_MANIFEST } from "./contentCatalog.generated.js"

export interface ContentLessonSummary {
  id: string
  courseId: string
  order: number
  title: string
  estMinutes: number
  memoryVerse: { text: string; ref: string } | null
}

export interface ContentPath {
  id: string
  roomId: string | null
  title: string
  promise: string
  lessons: ContentLessonSummary[]
  practices: string[]
}

export interface ContentRoom {
  id: string
  title: string
  lie: string
  pathId: string | null
}

export interface ContentDoor {
  id: string
  label: string
  roomId: string | null
  pathId?: string
  common?: boolean
}

export type ContentCourseState = "live" | "partial" | "planned"

export interface ContentCourse {
  id: string
  title: string
  forWhom: string
  plannedLessons: number
  lessonIds: string[]
  state: ContentCourseState
  source?: string
  ageHint?: "0-5" | "6-11" | "12-18" | "adult" | "bunici"
  /** Rezumatele publice permit afișarea cursului și offline. */
  lessons?: ContentLessonSummary[]
}

export interface ContentShelf {
  id: string
  title: string
  blurb: string
  courses: ContentCourse[]
  gated: boolean
}

export interface ContentManifest {
  schemaVersion: 1
  contentVersion: string
  rooms: ContentRoom[]
  doors: ContentDoor[]
  exploreDoors: ContentDoor[]
  paths: ContentPath[]
  doctrineLessons: ContentLessonSummary[]
  shelves: ContentShelf[]
}

export type ContentDayKind = "lesson" | "practice" | "done_today" | "path_complete"

export interface ContentDayPlan {
  kind: ContentDayKind
  lessonIndex: number
  lesson?: ContentLessonSummary
  practiceText?: string
  awayDays?: number
}

export const STATIC_CONTENT_MANIFEST =
  GENERATED_CONTENT_MANIFEST as unknown as ContentManifest

export const ABSENCE_DAYS = 5
export const DOCTRINE_UNLOCK_AFTER = 5

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object"
}

function isLessonSummary(value: unknown): value is ContentLessonSummary {
  if (!isRecord(value)) return false
  return (
    typeof value.id === "string" &&
    typeof value.courseId === "string" &&
    typeof value.order === "number" &&
    typeof value.title === "string" &&
    typeof value.estMinutes === "number" &&
    (value.memoryVerse === null ||
      (isRecord(value.memoryVerse) &&
        typeof value.memoryVerse.text === "string" &&
        typeof value.memoryVerse.ref === "string"))
  )
}

export function isContentManifest(value: unknown): value is ContentManifest {
  if (!isRecord(value)) return false
  const manifest = value as Partial<ContentManifest>
  return (
    manifest.schemaVersion === 1 &&
    typeof manifest.contentVersion === "string" &&
    /^[a-f0-9]{16}$/.test(manifest.contentVersion) &&
    Array.isArray(manifest.rooms) &&
    manifest.rooms.every(
      (room) =>
        isRecord(room) &&
        typeof room.id === "string" &&
        typeof room.title === "string" &&
        typeof room.lie === "string",
    ) &&
    Array.isArray(manifest.doors) &&
    manifest.doors.every(
      (door) =>
        isRecord(door) &&
        typeof door.id === "string" &&
        typeof door.label === "string",
    ) &&
    Array.isArray(manifest.exploreDoors) &&
    manifest.exploreDoors.every(
      (door) =>
        isRecord(door) &&
        typeof door.id === "string" &&
        typeof door.label === "string",
    ) &&
    Array.isArray(manifest.paths) &&
    manifest.paths.every(
      (path) =>
        isRecord(path) &&
        typeof path.id === "string" &&
        typeof path.title === "string" &&
        typeof path.promise === "string" &&
        Array.isArray(path.lessons) &&
        path.lessons.every(isLessonSummary) &&
        Array.isArray(path.practices) &&
        path.practices.every((practice) => typeof practice === "string"),
    ) &&
    Array.isArray(manifest.doctrineLessons) &&
    manifest.doctrineLessons.every(isLessonSummary) &&
    Array.isArray(manifest.shelves) &&
    manifest.shelves.every(
      (shelf) =>
        isRecord(shelf) &&
        typeof shelf.id === "string" &&
        typeof shelf.title === "string" &&
        typeof shelf.blurb === "string" &&
        typeof shelf.gated === "boolean" &&
        Array.isArray(shelf.courses) &&
        shelf.courses.every(
          (course) =>
            isRecord(course) &&
            typeof course.id === "string" &&
          typeof course.title === "string" &&
          typeof course.forWhom === "string" &&
          Array.isArray(course.lessonIds) &&
          course.lessonIds.every((id) => typeof id === "string") &&
          (course.lessons === undefined ||
            (Array.isArray(course.lessons) && course.lessons.every(isLessonSummary))),
        ),
    )
  )
}

export function getContentPath(
  manifest: ContentManifest,
  pathId: string | null | undefined,
): ContentPath | undefined {
  if (!pathId) return undefined
  return manifest.paths.find((path) => path.id === pathId)
}

export function getContentDoor(
  manifest: ContentManifest,
  doorId: string | null | undefined,
): ContentDoor | undefined {
  if (!doorId) return undefined
  return [...manifest.doors, ...manifest.exploreDoors].find((door) => door.id === doorId)
}

export function resolveContentDoorPath(
  manifest: ContentManifest,
  doorId: string,
): string {
  const door = getContentDoor(manifest, doorId)
  if (door?.pathId) return door.pathId
  const room = manifest.rooms.find((item) => item.id === door?.roomId)
  return room?.pathId ?? "path_temelie"
}

export function contentDoorHasOwnRoom(
  manifest: ContentManifest,
  doorId: string,
): boolean {
  const door = getContentDoor(manifest, doorId)
  if (door?.pathId) return true
  return manifest.rooms.find((room) => room.id === door?.roomId)?.pathId != null
}

export function planContentToday(
  path: ContentPath,
  lessonsDone: number,
  daysSinceLastLesson: number | null,
): ContentDayPlan {
  const awayDays =
    daysSinceLastLesson !== null && daysSinceLastLesson >= ABSENCE_DAYS
      ? daysSinceLastLesson
      : undefined

  if (lessonsDone >= path.lessons.length) {
    return { kind: "path_complete", lessonIndex: path.lessons.length - 1 }
  }
  if (daysSinceLastLesson === null) {
    return { kind: "lesson", lessonIndex: 0, lesson: path.lessons[0] }
  }
  if (daysSinceLastLesson === 0) {
    return {
      kind: "done_today",
      lessonIndex: lessonsDone - 1,
      practiceText: path.practices[lessonsDone - 1],
    }
  }
  if (daysSinceLastLesson === 1) {
    return {
      kind: "practice",
      lessonIndex: lessonsDone - 1,
      practiceText: path.practices[lessonsDone - 1],
    }
  }
  return {
    kind: "lesson",
    lessonIndex: lessonsDone,
    lesson: path.lessons[lessonsDone],
    awayDays,
  }
}

export function doctrineAllowance(lessonsDone: number, pathLength: number): number {
  if (lessonsDone < DOCTRINE_UNLOCK_AFTER) return 0
  if (lessonsDone >= pathLength) return Number.POSITIVE_INFINITY
  return Math.floor((lessonsDone - DOCTRINE_UNLOCK_AFTER) / 3) + 1
}

export function nextDoctrineLessonSummary(
  manifest: ContentManifest,
  lessonsDone: number,
  pathLength: number,
  doctrineDone: number,
): ContentLessonSummary | undefined {
  if (doctrineDone >= doctrineAllowance(lessonsDone, pathLength)) return undefined
  return manifest.doctrineLessons[doctrineDone]
}

export function contentCourseIsOpen(course: ContentCourse): boolean {
  return course.lessonIds.length > 0
}
