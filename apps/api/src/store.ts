import {
  CATEGORY_CONFIGS,
  applyAxisDeltas,
  applyReward,
  buildDashboard,
  buildRecommendation,
  computeBaseline,
  dailyRitualForDay,
  defaultGrowth,
  emptyGam,
  getDiagnostic as sharedGetDiagnostic,
  graceMessage,
  isModuleCompletingReward,
  moderatePost,
  teensM1C1,
} from "@emanus/shared"
import type {
  Category,
  CommunityPostView,
  Course,
  DailyView,
  DashboardView,
  DiagnosticQuestion,
  FaithStage,
  GamState,
  GrowthScore,
  Lesson,
  ModerationResult,
  Module,
  RecommendationView,
  Reward,
} from "@emanus/shared"

export interface CourseNode extends Course {
  lessons: Lesson[]
}
export interface ModuleNode extends Module {
  courses: CourseNode[]
}

export interface ProgressOutcome {
  status: "completed"
  reward: Reward
  moduleCompleted: boolean
  gam: GamState
  growth: GrowthScore[]
}

export interface CreatePostResult {
  post: CommunityPostView
  moderation: ModerationResult
}

// --- Fallback in-memory (dev fără DB), din seed-ul partajat @emanus/shared ---
const memModules = new Map<string, Module>([[teensM1C1.module.id, teensM1C1.module]])
const memCourses = new Map<string, Course>([[teensM1C1.course.id, teensM1C1.course]])
const memLessons = new Map<string, Lesson>(teensM1C1.lessons.map((l) => [l.id, l]))
const memGam = new Map<string, GamState>()
const memGrowth = new Map<string, GrowthScore[]>()
const memDone = new Map<string, Set<string>>()
const memPosts: CommunityPostView[] = []
let memUserSeq = 0
let memPostSeq = 0

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
  return lesson("teens_m1_c1_l1")
}

async function tree(categoryId: string): Promise<ModuleNode[]> {
  if (useDb) return (await db()).getTree(categoryId)
  return memTree(categoryId)
}

function memGetGam(userId: string): GamState {
  return memGam.get(userId) ?? emptyGam(userId)
}

function memGetGrowth(userId: string): GrowthScore[] {
  return memGrowth.get(userId) ?? defaultGrowth(userId)
}

function memApplyProgress(
  userId: string,
  lsn: Lesson,
  choicesMade: Record<string, string>,
): ProgressOutcome {
  void choicesMade
  const rewardStep = [...lsn.steps].reverse().find((s) => s.reward)
  const reward: Reward = rewardStep?.reward ?? { xp: 10 }
  const moduleCompleted = isModuleCompletingReward(reward)
  const gam = applyReward(memGetGam(userId), reward, { moduleCompleted })
  memGam.set(userId, gam)
  const growth = applyAxisDeltas(memGetGrowth(userId), reward.axisDeltas)
  memGrowth.set(userId, growth)
  const done = memDone.get(userId) ?? new Set<string>()
  done.add(lsn.id)
  memDone.set(userId, done)
  return { status: "completed", reward, moduleCompleted, gam, growth }
}

function memDashboard(userId: string, categoryId = "teens12_18"): DashboardView {
  const modules = memTree(categoryId).map((m) => ({
    id: m.id,
    title: m.title,
    axis: m.axis,
    order: m.order,
    lessons: m.courses.flatMap((c) => c.lessons).map((l) => ({ id: l.id, title: l.title })),
  }))
  return buildDashboard({
    gam: memGetGam(userId),
    growth: memGetGrowth(userId),
    modules,
    completedLessonIds: memDone.get(userId) ?? new Set<string>(),
  })
}

function memCreateUser(): { id: string } {
  const id = `mem-user-${++memUserSeq}`
  memGrowth.set(id, defaultGrowth(id))
  return { id }
}

function memSetBaseline(
  userId: string,
  baselines: Array<{ axis: string; score: number }>,
): GrowthScore[] {
  const now = new Date().toISOString()
  const growth = baselines.map((b) => ({
    userId,
    axis: b.axis as GrowthScore["axis"],
    baseline: b.score,
    current: b.score,
    updatedAt: now,
  }))
  memGrowth.set(userId, growth)
  return growth
}

async function applyProgress(
  userId: string,
  lsn: Lesson,
  choicesMade: Record<string, string>,
): Promise<ProgressOutcome> {
  if (useDb) return (await db()).applyLessonProgress(userId, lsn, choicesMade)
  return memApplyProgress(userId, lsn, choicesMade)
}

async function dashboard(userId: string, categoryId = "teens12_18"): Promise<DashboardView> {
  if (useDb) return (await db()).getDashboard(userId, categoryId)
  return memDashboard(userId, categoryId)
}

// Ritualul zilnic „Timp cu Dumnezeu” (docs/00-DIRECTIE §2): versetul urmează axa cea mai fragedă.
async function dailyRitual(userId: string, categoryId = "teens12_18"): Promise<DailyView> {
  const dash = await dashboard(userId, categoryId)
  const focus = [...dash.growth].sort((a, b) => a.current - b.current)[0]?.axis
  const ritual = dailyRitualForDay(new Date(), focus)
  return {
    ritual,
    rhythmDays: dash.gam.streakDays,
    nextLesson: dash.next,
    graceMessage: graceMessage(dash.gam.streakDays),
  }
}

async function growth(userId: string): Promise<GrowthScore[]> {
  if (useDb) return (await db()).getOrInitGrowth(userId)
  return memGetGrowth(userId)
}

// Recomandarea de parcurs după onboarding (docs/00-DIRECTIE §13: „Ușa, nu unghiul”).
// Pornim de la axa cea mai fragedă din diagnostic și adaptăm tonul la FaithStage.
async function recommendation(
  userId: string,
  categoryId = "teens12_18",
  faithStage: FaithStage = "seeking",
): Promise<RecommendationView> {
  const [modules, growthScores] = await Promise.all([tree(categoryId), growth(userId)])
  const focusAxis =
    [...growthScores].sort((a, b) => a.current - b.current)[0]?.axis ?? "identity"
  const match = modules.find((m) => m.axis === focusAxis) ?? modules[0]
  const firstCourse = match?.courses[0]
  const firstLesson = firstCourse?.lessons[0]
  const cat = category(categoryId)
  return buildRecommendation({
    faithStage,
    categoryName: cat?.name ?? "",
    focusAxis,
    course:
      match && firstCourse
        ? {
            moduleId: match.id,
            courseId: firstCourse.id,
            title: firstCourse.title,
            struggle: firstCourse.struggle,
            truth: firstCourse.truth,
            firstLessonId: firstLesson?.id,
          }
        : undefined,
  })
}

function diagnostic(categoryId: string): DiagnosticQuestion[] {
  return sharedGetDiagnostic(categoryId as any)
}

async function createUser(input: {
  anonName: string
  avatar: string
  ageBand?: string
  categoryId: string
  consent: Record<string, unknown>
}): Promise<{ id: string }> {
  if (useDb) return (await db()).createUser(input)
  return memCreateUser()
}

async function setBaseline(
  userId: string,
  categoryId: string,
  answers: Record<string, number>,
): Promise<GrowthScore[]> {
  const baselines = computeBaseline(categoryId as any, answers)
  if (useDb) return (await db()).setBaseline(userId, baselines)
  return memSetBaseline(userId, baselines)
}

async function createPost(
  userId: string,
  categoryId: string,
  body: string,
): Promise<CreatePostResult> {
  const moderation = moderatePost(body)
  if (useDb) {
    const post = await (await db()).createPost({
      userId,
      categoryId,
      body,
      status: moderation.decision,
    })
    return { post, moderation }
  }
  const post: CommunityPostView = {
    id: `mem-post-${++memPostSeq}`,
    userId,
    author: { anonName: "Explorator", avatar: "🌱" },
    categoryId,
    body,
    createdAt: new Date().toISOString(),
    status: moderation.decision,
  }
  memPosts.unshift(post)
  return { post, moderation }
}

async function listCommunity(categoryId: string): Promise<CommunityPostView[]> {
  if (useDb) return (await db()).listPosts(categoryId, "visible")
  return memPosts.filter((p) => p.categoryId === categoryId && p.status === "visible")
}

export const store = {
  categories,
  category,
  lesson,
  firstLesson,
  tree,
  applyProgress,
  dashboard,
  dailyRitual,
  growth,
  recommendation,
  diagnostic,
  createUser,
  setBaseline,
  createPost,
  listCommunity,
}
