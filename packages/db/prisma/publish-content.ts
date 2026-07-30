import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { fileURLToPath } from "node:url"
import {
  LIBRARY_LESSONS,
  PATHS,
  mohlerNotForMe,
  teensM1C1,
} from "@emanus/shared"
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

const referencedIds = new Set([
  ...STATIC_CONTENT_MANIFEST.paths.flatMap((path) =>
    path.lessons.map((lesson) => lesson.id),
  ),
  ...STATIC_CONTENT_MANIFEST.shelves.flatMap((shelf) =>
    shelf.courses.flatMap((course) => course.lessonIds),
  ),
])

for (const id of referencedIds) {
  if (!lessons.has(id)) {
    throw new Error(`Manifestul referă lecția lipsă ${id}.`)
  }
}

const rows = [...lessons.values()].map((lesson) => ({
  id: lesson.id,
  course_id: lesson.courseId,
  sort_order: lesson.order,
  title: lesson.title,
  est_minutes: lesson.estMinutes,
  anchor_refs: lesson.anchorRefs,
  memory_verse_ref: lesson.memoryVerseRef,
  badge_id: lesson.badgeId ?? null,
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
