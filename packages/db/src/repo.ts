import type { Course, Lesson, Module } from "@emanus/shared"
import { prisma } from "./client.js"

export interface CourseNode extends Course {
  lessons: Lesson[]
}
export interface ModuleNode extends Module {
  courses: CourseNode[]
}

function toLesson(row: any): Lesson {
  return {
    id: row.id,
    courseId: row.courseId,
    order: row.order,
    title: row.title,
    estMinutes: row.estMinutes,
    anchorRefs: row.anchorRefs,
    memoryVerseRef: row.memoryVerseRef,
    badgeId: row.badgeId ?? undefined,
    steps: row.steps as Lesson["steps"],
  }
}

export async function getLesson(id: string): Promise<Lesson | null> {
  const row = await prisma.lesson.findUnique({ where: { id } })
  return row ? toLesson(row) : null
}

export async function getTree(categoryId: string): Promise<ModuleNode[]> {
  const modules = await prisma.module.findMany({
    where: { categoryId: categoryId as any },
    orderBy: { order: "asc" },
    include: {
      courses: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  })

  return modules.map((m: any) => ({
    id: m.id,
    categoryId: m.categoryId,
    order: m.order,
    title: m.title,
    axis: m.axis,
    courseIds: m.courses.map((c: any) => c.id),
    unlockRule: (m.unlockRule as Module["unlockRule"]) ?? undefined,
    courses: m.courses.map((c: any) => ({
      id: c.id,
      moduleId: c.moduleId,
      order: c.order,
      title: c.title,
      struggle: c.struggle,
      truth: c.truth,
      lessonIds: c.lessons.map((l: any) => l.id),
      lessons: c.lessons.map(toLesson),
    })),
  }))
}
