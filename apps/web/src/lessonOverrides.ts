import type { Lesson } from "@emanus/shared/domain"
import { neiertareL4Reviewed } from "@emanus/shared/paths/neiertare-review"

const OVERRIDES = new Map<string, Lesson>([
  [neiertareL4Reviewed.id, neiertareL4Reviewed],
])

export function reviewedLesson(lesson: Lesson | undefined): Lesson | undefined {
  if (!lesson) return undefined
  return OVERRIDES.get(lesson.id) ?? lesson
}

export function reviewedLessonById(lessonId: string | null | undefined): Lesson | undefined {
  if (!lessonId) return undefined
  return OVERRIDES.get(lessonId)
}
