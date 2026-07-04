import { CATEGORY_CONFIGS, teensM1C1 } from "@emanus/shared"
import type { Category, Course, Lesson, Module } from "@emanus/shared"

export interface CourseNode extends Course {
  lessons: Lesson[]
}
export interface ModuleNode extends Module {
  courses: CourseNode[]
}

// --- Fallback in-memory (dev fără DB), din seed-ul partajat @emanus/shared ---
const memModules = new Map<string, Module>([[teensM1C1.module.id, teensM1C1.module]])
const memCourses = new Map<string, Course>([[teensM1C1.course.id, teensM1C1.course]])
const memLessons = new Map<string, Lesson>(teensM1C1.lessons.map((l) => [l.id, l]))

// Dacă DATABASE_URL e setat (Supabase), citește din DB; altfel in-memory.
const useDb = Boolean(process.env.DATABASE_URL)
let dbMod: Promise<typeof import("@emanus/db")> | null = null
function db() {
  if (!dbMod) dbMod = import("@emanus/db")
  return dbMod
}

function memTree(categoryId: string): ModuleNode[] {
  return [...memModules.values()]
    .filter((m) => m.categoryId === categoryId)
    .sort((a, b) => a.order - b.order)
    .map((m) => ({
      ...m,
      courses: m.courseIds
        .map((cid) => memCourses.get(cid))
        .filter((c): c is Course => Boolean(c))
        .map((c) => ({
          ...c,
          lessons: c.lessonIds
            .map((lid) => memLessons.get(lid))
            .filter((l): l is Lesson => Boolean(l)),
        })),
    }))
}

function categories(): Category[] {
  return Object.values(CATEGORY_CONFIGS)
}

function category(id: string): Category | undefined {
  return CATEGORY_CONFIGS[id as keyof typeof CATEGORY_CONFIGS]
}

async function lesson(id: string): Promise<Lesson | undefined> {
  if (useDb) {
    const found = await (await db()).getLesson(id)
    return found ?? undefined
  }
  return memLessons.get(id)
}

async function firstLesson(): Promise<Lesson | undefined> {
  // Prima lecție publică (workbook §16.4).
  return lesson("teens_m1_c1_l1")
}

async function tree(categoryId: string): Promise<ModuleNode[]> {
  if (useDb) return (await db()).getTree(categoryId)
  return memTree(categoryId)
}

export const store = { categories, category, lesson, firstLesson, tree }
