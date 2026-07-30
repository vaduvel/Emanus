import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { fileURLToPath } from "node:url"
import { teensM1C1 } from "@emanus/shared"
import { LIBRARY_LESSONS } from "@emanus/shared/library"
import { mohlerNotForMe } from "@emanus/shared/lesson-mohler"
import { PATHS } from "@emanus/shared/paths"
import { STATIC_CONTENT_MANIFEST } from "@emanus/shared/content-catalog"
import type { Lesson } from "@emanus/shared/domain"

config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) })

const lessons = new Map<string, Lesson>()
for (const lesson of [
  ...PATHS.flatMap((path) => path.lessons),
  ...LIBRARY_LESSONS,
  ...mohlerNotForMe.lessons,
  ...teensM1C1.lessons,
]) {
  const existing = lessons.get(lesson.id)
  if (existing && JSON.stringify(existing) !== JSON.stringify(lesson)) {
    throw new Error(`Lecția ${lesson.id} are două definiții diferite.`)
  }
  lessons.set(lesson.id, lesson)
}

function validateLesson(lesson: Lesson): void {
  if (!lesson.id || !lesson.courseId || !lesson.title.trim()) {
    throw new Error("Lecție fără id, courseId sau titlu.")
  }
  if (!Number.isInteger(lesson.estMinutes) || lesson.estMinutes <= 0) {
    throw new Error(`Lecția ${lesson.id} are durata invalidă.`)
  }
  if (lesson.steps.length === 0) {
    throw new Error(`Lecția ${lesson.id} nu are pași.`)
  }

  const stepIds = new Set<string>()
  for (const step of lesson.steps) {
    if (stepIds.has(step.id)) {
      throw new Error(`Lecția ${lesson.id} are pasul duplicat ${step.id}.`)
    }
    stepIds.add(step.id)
    if (!Number.isFinite(step.order)) {
      throw new Error(`Pasul ${lesson.id}/${step.id} are ordinea invalidă.`)
    }
    if (step.type === "choice" && !step.choice?.options.length) {
      throw new Error(`Pasul ${lesson.id}/${step.id} nu are opțiuni.`)
    }
    if (step.type === "multi_choice" && !step.multiChoice?.options.length) {
      throw new Error(`Pasul multiplu ${lesson.id}/${step.id} nu are opțiuni.`)
    }
    if (
      (step.type === "reflection" || step.type === "declaration") &&
      !step.response?.prompt.trim()
    ) {
      throw new Error(`Pasul ${lesson.id}/${step.id} nu are întrebare.`)
    }
  }

  for (const step of lesson.steps) {
    for (const option of step.choice?.options ?? []) {
      if (option.branchStepId && !stepIds.has(option.branchStepId)) {
        throw new Error(
          `Ramura ${lesson.id}/${step.id}/${option.id} indică pasul lipsă ${option.branchStepId}.`,
        )
      }
    }
  }
}

for (const lesson of lessons.values()) validateLesson(lesson)

const referencedIds = new Set([
  ...STATIC_CONTENT_MANIFEST.paths.flatMap((path) =>
    path.lessons.map((lesson) => lesson.id),
  ),
  ...STATIC_CONTENT_MANIFEST.doctrineLessons.map((lesson) => lesson.id),
  ...STATIC_CONTENT_MANIFEST.shelves.flatMap((shelf) =>
    shelf.courses.flatMap((course) => course.lessonIds),
  ),
])

for (const id of referencedIds) {
  if (!lessons.has(id)) {
    throw new Error(`Manifestul referă lecția lipsă ${id}.`)
  }
}

const rows = [...referencedIds].map((id) => lessons.get(id)!).map((lesson) => ({
  id: lesson.id,
  course_id: lesson.courseId,
  sort_order: lesson.order,
  title: lesson.title,
  est_minutes: lesson.estMinutes,
  anchor_refs: lesson.anchorRefs,
  memory_verse_ref: lesson.memoryVerseRef,
  badge_id: lesson.badgeId ?? null,
  safety: lesson.safety ?? null,
  steps: lesson.steps,
}))

if (process.argv.includes("--dry-run")) {
  console.log(
    `Conținut valid: ${STATIC_CONTENT_MANIFEST.contentVersion}, ${rows.length} lecții.`,
  )
  process.exit(0)
}

const url = process.env.SUPABASE_URL
const secret =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !secret) {
  throw new Error(
    "Lipsesc SUPABASE_URL și SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY.",
  )
}

const supabase = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const { data, error } = await supabase.rpc("publish_content_release", {
  release_version: STATIC_CONTENT_MANIFEST.contentVersion,
  release_payload: STATIC_CONTENT_MANIFEST,
  release_lessons: rows,
})

if (error) throw error

console.log(
  `Release publicat: ${STATIC_CONTENT_MANIFEST.contentVersion}, ${rows.length} lecții.`,
)
console.log(data)
