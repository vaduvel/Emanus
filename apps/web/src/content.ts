import type { Lesson } from "@emanus/shared/domain"
import {
  STATIC_CONTENT_MANIFEST,
  contentCourseIsOpen,
  contentDoorHasOwnRoom,
  getContentDoor,
  getContentPath,
  isContentManifest,
  nextDoctrineLessonSummary,
  planContentToday,
  resolveContentDoorPath,
} from "@emanus/shared/content-catalog"
import type {
  ContentCourse,
  ContentDayPlan,
  ContentDoor,
  ContentLessonSummary,
  ContentManifest,
  ContentPath,
  ContentShelf,
} from "@emanus/shared/content-catalog"
import { getLesson as getLessonFromApi } from "./api"
import { getSupabase } from "./supabase"

const MANIFEST_STORAGE_KEY = "emanus_content_manifest_v1"
const LESSON_CACHE = "emanus-lessons-v1"

let activeManifest: ContentManifest = STATIC_CONTENT_MANIFEST

function readCachedManifest(): ContentManifest | null {
  try {
    const value = JSON.parse(localStorage.getItem(MANIFEST_STORAGE_KEY) ?? "null") as unknown
    return isContentManifest(value) ? value : null
  } catch {
    return null
  }
}

function writeCachedManifest(manifest: ContentManifest): void {
  try {
    localStorage.setItem(MANIFEST_STORAGE_KEY, JSON.stringify(manifest))
  } catch {
    // Manifestul inclus în aplicație rămâne fallback dacă spațiul local este plin.
  }
}

/**
 * Încarcă manifestul publicat. Manifestul este mic și atomic; lecțiile complete
 * se descarcă separat, numai când sunt deschise.
 */
export async function hydrateContentManifest(): Promise<boolean> {
  const before = activeManifest.contentVersion
  const cached = readCachedManifest()
  if (cached) activeManifest = cached

  const sb = getSupabase()
  if (sb) {
    try {
      const { data, error } = await sb
        .from("content_manifests")
        .select("version,payload")
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!error && data && isContentManifest(data.payload)) {
        const remote = data.payload
        if (remote.contentVersion === data.version) {
          activeManifest = remote
          writeCachedManifest(remote)
        }
      }
    } catch {
      // Pornirea offline folosește ultimul manifest valid sau fallback-ul inclus.
    }
  }

  return activeManifest.contentVersion !== before
}

export function contentManifest(): ContentManifest {
  return activeManifest
}

export function contentPath(pathId: string | null | undefined): ContentPath | undefined {
  return getContentPath(activeManifest, pathId)
}

export function otherContentPaths(pathId: string | null | undefined): ContentPath[] {
  return activeManifest.paths.filter((path) => path.id !== pathId)
}

export function contentDoor(doorId: string | null | undefined): ContentDoor | undefined {
  return getContentDoor(activeManifest, doorId)
}

export function commonContentDoors(): ContentDoor[] {
  return activeManifest.doors.filter((door) => door.common)
}

export function moreContentDoors(): ContentDoor[] {
  return activeManifest.doors.filter((door) => !door.common)
}

export function exploreContentDoors(): ContentDoor[] {
  return activeManifest.exploreDoors
}

export function resolveDoorPath(doorId: string): string {
  return resolveContentDoorPath(activeManifest, doorId)
}

export function doorHasOwnRoom(doorId: string): boolean {
  return contentDoorHasOwnRoom(activeManifest, doorId)
}

export function planTodayFromContent(
  path: ContentPath,
  lessonsDone: number,
  daysSinceLastLesson: number | null,
): ContentDayPlan {
  return planContentToday(path, lessonsDone, daysSinceLastLesson)
}

export function nextDoctrineLesson(
  lessonsDone: number,
  pathLength: number,
  doctrineDone: number,
): ContentLessonSummary | undefined {
  return nextDoctrineLessonSummary(activeManifest, lessonsDone, pathLength, doctrineDone)
}

export function visibleContentShelves(): ContentShelf[] {
  return activeManifest.shelves.filter((shelf) => !shelf.gated)
}

export function courseIsOpen(course: ContentCourse): boolean {
  return contentCourseIsOpen(course)
}

function lessonRequest(id: string): Request {
  const key = encodeURIComponent(`${activeManifest.contentVersion}:${id}`)
  return new Request(new URL(`/__emanus_content/lessons/${key}`, window.location.origin))
}

async function readCachedLesson(id: string): Promise<Lesson | null> {
  if (!("caches" in window)) return null
  try {
    const response = await (await caches.open(LESSON_CACHE)).match(lessonRequest(id))
    if (!response) return null
    const value = (await response.json()) as unknown
    return isLesson(value) ? value : null
  } catch {
    return null
  }
}

async function writeCachedLesson(lesson: Lesson): Promise<void> {
  if (!("caches" in window)) return
  try {
    const cache = await caches.open(LESSON_CACHE)
    await cache.put(
      lessonRequest(lesson.id),
      new Response(JSON.stringify(lesson), {
        headers: { "content-type": "application/json; charset=utf-8" },
      }),
    )
  } catch {
    // Cache-ul offline este o optimizare, nu condiție de acces.
  }
}

function isLesson(value: unknown): value is Lesson {
  if (!value || typeof value !== "object") return false
  const lesson = value as Partial<Lesson>
  return (
    typeof lesson.id === "string" &&
    typeof lesson.courseId === "string" &&
    typeof lesson.order === "number" &&
    typeof lesson.title === "string" &&
    typeof lesson.estMinutes === "number" &&
    Array.isArray(lesson.anchorRefs) &&
    typeof lesson.memoryVerseRef === "string" &&
    Array.isArray(lesson.steps) &&
    lesson.steps.every(
      (step) =>
        Boolean(step) &&
        typeof step === "object" &&
        typeof (step as { id?: unknown }).id === "string" &&
        typeof (step as { type?: unknown }).type === "string" &&
        typeof (step as { order?: unknown }).order === "number",
    )
  )
}

function mapLessonRow(row: Record<string, unknown>): Lesson | null {
  const lesson: unknown = {
    id: row.id,
    courseId: row.course_id,
    order: row.sort_order,
    title: row.title,
    estMinutes: row.est_minutes,
    anchorRefs: row.anchor_refs,
    memoryVerseRef: row.memory_verse_ref,
    badgeId: row.badge_id ?? undefined,
    safety: row.safety ?? undefined,
    steps: row.steps,
  }
  return isLesson(lesson) ? lesson : null
}

export async function loadLesson(id: string): Promise<Lesson> {
  const cached = await readCachedLesson(id)
  if (cached) return cached

  const sb = getSupabase()
  if (sb) {
    try {
      const { data, error } = await sb
        .from("content_lessons")
        .select(
          "id,course_id,sort_order,title,est_minutes,anchor_refs,memory_verse_ref,badge_id,safety,steps",
        )
        .eq("id", id)
        .eq("status", "published")
        .eq("content_version", activeManifest.contentVersion)
        .maybeSingle()

      if (!error && data) {
        const lesson = mapLessonRow(data)
        if (lesson) {
          await writeCachedLesson(lesson)
          return lesson
        }
      }
    } catch {
      // Fallback-ul de dezvoltare de mai jos păstrează mediul local utilizabil.
    }
  }

  try {
    const lesson = await getLessonFromApi(id)
    if (isLesson(lesson)) {
      await writeCachedLesson(lesson)
      return lesson
    }
  } catch {
    // Build-ul static nu are obligatoriu un API separat.
  }

  try {
    const [{ findLessonAnywhere }, { LIBRARY_LESSONS }, { mohlerNotForMe }] =
      await Promise.all([
        import("@emanus/shared/paths"),
        import("@emanus/shared/library"),
        import("@emanus/shared/lesson-mohler"),
      ])
    const local =
      findLessonAnywhere(id) ??
      LIBRARY_LESSONS.find((lesson) => lesson.id === id) ??
      mohlerNotForMe.lessons.find((lesson) => lesson.id === id)
    if (local) {
      await writeCachedLesson(local)
      return local
    }
  } catch {
    // Mesajul de indisponibilitate este randat de LessonView.
  }

  throw new Error("lesson_unavailable")
}
