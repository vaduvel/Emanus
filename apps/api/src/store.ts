import { CATEGORY_CONFIGS } from "@emanus/shared"
import type { Category, Course, Lesson, Module } from "@emanus/shared"
import seed from "./seed/teens_m1_c1.json" with { type: "json" }

// Store in-memory pentru Faza 1 (vezi DECISIONS D-003). Se înlocuiește cu Prisma în Faza 1.5.
const modules = new Map<string, Module>()
const courses = new Map<string, Course>()
const lessons = new Map<string, Lesson>()

const bundle = seed as unknown as { module: Module; course: Course; lessons: Lesson[] }
modules.set(bundle.module.id, bundle.module)
courses.set(bundle.course.id, bundle.course)
for (const lesson of bundle.lessons) lessons.set(lesson.id, lesson)

export interface CourseNode extends Course {
  lessons: Lesson[]
}
export interface ModuleNode extends Module {
  courses: CourseNode[]
}

export const store = {
  categories(): Category[] {
    return Object.values(CATEGORY_CONFIGS)
  },
  category(id: string): Category | undefined {
    return CATEGORY_CONFIGS[id as keyof typeof CATEGORY_CONFIGS]
  },
  lesson(id: string): Lesson | undefined {
    return lessons.get(id)
  },
  firstLesson(): Lesson | undefined {
    // Prima lecție publică (workbook §16.4). Deocamdată L1 din cursul-model.
    return lessons.get("teens_m1_c1_l1")
  },
  tree(categoryId: string): ModuleNode[] {
    return [...modules.values()]
      .filter((m) => m.categoryId === categoryId)
      .sort((a, b) => a.order - b.order)
      .map((m) => ({
        ...m,
        courses: m.courseIds
          .map((cid) => courses.get(cid))
          .filter((c): c is Course => Boolean(c))
          .map((c) => ({
            ...c,
            lessons: c.lessonIds
              .map((lid) => lessons.get(lid))
              .filter((l): l is Lesson => Boolean(l)),
          })),
      }))
  },
}
