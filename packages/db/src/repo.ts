import {
  DEMO_USER_ID,
  applyAxisDeltas,
  applyReward,
  buildDashboard,
  defaultGrowth,
  isModuleCompletingReward,
} from "@emanus/shared"
import type {
  Course,
  DashboardView,
  GamState,
  GrowthScore,
  Lesson,
  Module,
  Reward,
} from "@emanus/shared"
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

// --- Gamificare + creștere (workbook §8, §10) ---

function toGam(row: any): GamState {
  return {
    userId: row.userId,
    xp: row.xp,
    level: row.level,
    streakDays: row.streakDays,
    lastActiveDate: row.lastActiveDate ? row.lastActiveDate.toISOString() : "",
    badgeIds: row.badgeIds,
    certificateIds: row.certificateIds,
  }
}

function toGrowth(row: any): GrowthScore {
  return {
    userId: row.userId,
    axis: row.axis,
    baseline: row.baseline,
    current: row.current,
    updatedAt: row.updatedAt ? row.updatedAt.toISOString() : new Date().toISOString(),
  }
}

export async function ensureUser(userId: string = DEMO_USER_ID): Promise<void> {
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      anonName: "Explorator",
      avatar: "🌱",
      categoryId: "teens12_18" as any,
      consent: { termsAccepted: true, dataProcessing: true } as any,
    },
  })
}

export async function getOrInitGam(userId: string): Promise<GamState> {
  const row = await prisma.gamState.findUnique({ where: { userId } })
  if (row) return toGam(row)
  return toGam(await prisma.gamState.create({ data: { userId } }))
}

export async function getOrInitGrowth(userId: string): Promise<GrowthScore[]> {
  const rows = await prisma.growthScore.findMany({ where: { userId } })
  if (rows.length) return rows.map(toGrowth)
  const seeded = defaultGrowth(userId)
  await prisma.$transaction(
    seeded.map((g) =>
      prisma.growthScore.create({
        data: { userId, axis: g.axis as any, baseline: g.baseline, current: g.current },
      }),
    ),
  )
  return seeded
}

export interface ProgressOutcome {
  status: "completed"
  reward: Reward
  moduleCompleted: boolean
  gam: GamState
  growth: GrowthScore[]
}

export async function applyLessonProgress(
  userId: string,
  lesson: Lesson,
  choicesMade: Record<string, string>,
): Promise<ProgressOutcome> {
  await ensureUser(userId)
  const rewardStep = [...lesson.steps].reverse().find((s) => s.reward)
  const reward: Reward = rewardStep?.reward ?? { xp: 10 }
  const moduleCompleted = isModuleCompletingReward(reward)

  await prisma.progress.upsert({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
    update: { status: "completed", completedAt: new Date(), choicesMade: choicesMade as any },
    create: {
      userId,
      lessonId: lesson.id,
      status: "completed",
      completedAt: new Date(),
      choicesMade: choicesMade as any,
    },
  })

  const gam0 = await getOrInitGam(userId)
  const gam1 = applyReward(gam0, reward, { moduleCompleted })
  const gam = toGam(
    await prisma.gamState.update({
      where: { userId },
      data: {
        xp: gam1.xp,
        level: gam1.level,
        streakDays: gam1.streakDays,
        lastActiveDate: gam1.lastActiveDate ? new Date(gam1.lastActiveDate) : null,
        badgeIds: gam1.badgeIds,
        certificateIds: gam1.certificateIds,
      },
    }),
  )

  const growth0 = await getOrInitGrowth(userId)
  const growth1 = applyAxisDeltas(growth0, reward.axisDeltas)
  const changed = growth1.filter((g, i) => g.current !== growth0[i].current)
  if (changed.length) {
    await prisma.$transaction(
      changed.map((g) =>
        prisma.growthScore.update({
          where: { userId_axis: { userId, axis: g.axis as any } },
          data: { current: g.current },
        }),
      ),
    )
  }

  return { status: "completed", reward, moduleCompleted, gam, growth: growth1 }
}

export async function getDashboard(
  userId: string,
  categoryId = "teens12_18",
): Promise<DashboardView> {
  await ensureUser(userId)
  const [gam, growth, tree, doneRows] = await Promise.all([
    getOrInitGam(userId),
    getOrInitGrowth(userId),
    getTree(categoryId),
    prisma.progress.findMany({
      where: { userId, status: "completed" },
      select: { lessonId: true },
    }),
  ])
  const modules = tree.map((m) => ({
    id: m.id,
    title: m.title,
    axis: m.axis,
    order: m.order,
    lessons: m.courses.flatMap((c) => c.lessons).map((l) => ({ id: l.id, title: l.title })),
  }))
  return buildDashboard({
    gam,
    growth,
    modules,
    completedLessonIds: doneRows.map((r: any) => r.lessonId),
  })
}
