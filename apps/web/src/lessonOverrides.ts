import type { Lesson } from "@emanus/shared/domain"
import { PATHS } from "@emanus/shared/paths"
import { neiertareL4Reviewed } from "@emanus/shared/paths/neiertare-review"

const OVERRIDES = new Map<string, Lesson>([
  [neiertareL4Reviewed.id, neiertareL4Reviewed],
])

// Instalat o singură dată la pornirea aplicației. Păstrăm ID-ul și ordinea,
// astfel încât progresul existent să nu fie invalidat.
for (const path of PATHS) {
  path.lessons = path.lessons.map((lesson) => OVERRIDES.get(lesson.id) ?? lesson)
}

export function reviewedLesson(lesson: Lesson | undefined): Lesson | undefined {
  if (!lesson) return undefined
  return OVERRIDES.get(lesson.id) ?? lesson
}

export function reviewedLessonById(lessonId: string | null | undefined): Lesson | undefined {
  if (!lessonId) return undefined
  return OVERRIDES.get(lessonId)
}
