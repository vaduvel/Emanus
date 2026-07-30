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

export function isContentManifest(value: unknown): value is ContentManifest {
  if (!value || typeof value !== "object") return false
  const manifest = value as Partial<ContentManifest>
  return (
    manifest.schemaVersion === 1 &&
    typeof manifest.contentVersion === "string" &&
    Array.isArray(manifest.rooms) &&
    Array.isArray(manifest.doors) &&
    Array.isArray(manifest.exploreDoors) &&
    Array.isArray(manifest.paths) &&
    Array.isArray(manifest.doctrineLessons) &&
    Array.isArray(manifest.shelves)
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
