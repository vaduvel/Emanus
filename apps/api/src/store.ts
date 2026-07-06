import {
  CATEGORY_CONFIGS,
  FAMILY_THEMES,
  PRAYER_LEVELS,
  analyzeGrowthText,
  applyAxisDeltas,
  applyReward,
  buildDashboard,
  buildDemoMentorSlots,
  buildRecommendation,
  computeBaseline,
  dailyRitualForDay,
  defaultGrowth,
  emptyGam,
  getDiagnostic as sharedGetDiagnostic,
  getFamilyTheme,
  graceMessage,
  isModuleCompletingReward,
  mentorStatus as computeMentorStatus,
  moderatePost,
  teensM1C1,
} from "@emanus/shared"
import type {
  Category,
  CommunityPostKind,
  CommunityPostView,
  Course,
  DailyView,
  DashboardView,
  DiagnosticQuestion,
  FaithStage,
  Family,
  FamilyMember,
  FamilyPrayer,
  FamilyThemeOption,
  FamilyView,
  GamState,
  GrowthScore,
  Lesson,
  MentorSlot,
  MentorStatus,
  MentoratView,
  ModerationResult,
  Module,
  NeedProfile,
  PrayerLevel,
  PrayerRequest,
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

export interface AdaptiveCourse {
  moduleId: string
  courseId: string
  title: string
  struggle: string
  truth: string
  firstLessonId?: string
}

export interface GrowthProfileResult {
  profile: NeedProfile
  adaptive: AdaptiveCourse | null
}

// --- Fallback in-memory (dev fără DB), din seed-ul partajat @emanus/shared ---
const memModules = new Map<string, Module>([[teensM1C1.module.id, teensM1C1.module]])
const memCourses = new Map<string, Course>([[teensM1C1.course.id, teensM1C1.course]])
const memLessons = new Map<string, Lesson>(teensM1C1.lessons.map((l) => [l.id, l]))
const memGam = new Map<string, GamState>()
const memGrowth = new Map<string, GrowthScore[]>()
const memDone = new Map<string, Set<string>>()
const memPosts: CommunityPostView[] = []
// Metadate cerere-de-rugăciune (kind + contor + cine s-a rugat), stratificate peste
// posturi indiferent de sursa lor (in-memory sau DB). Se persistă la login real.
const memPostMeta = new Map<
  string,
  { kind: CommunityPostKind; prayCount: number; prayedBy: Set<string> }
>()
const memPrayers = new Map<string, PrayerRequest[]>()
const memFamilies = new Map<string, Family>()
const memFamilyPrayers = new Map<string, FamilyPrayer[]>()
const memGrowthProfiles = new Map<string, NeedProfile>()
// Rezervări de mentorat per utilizator (slotId -> slot rezervat). Se persistă la login real.
const memMentorBookings = new Map<string, Map<string, MentorSlot>>()
let memUserSeq = 0
let memPostSeq = 0
let memPrayerSeq = 0
let memFamilySeq = 0
let memFamilyPrayerSeq = 0

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

// Nivelul Mentor (docs/00-DIRECTIE): eligibilitate din nivel + module absolvite.
async function mentor(userId: string, categoryId = "teens12_18"): Promise<MentorStatus> {
  const dash = await dashboard(userId, categoryId)
  return computeMentorStatus(dash.gam)
}

// --- Calendar de mentorat (docs/00-DIRECTIE) ---
// Sloturi demo + rezervări in-memory. Se persistă la login real.
function byStart(a: MentorSlot, b: MentorSlot): number {
  return a.startsAt < b.startsAt ? -1 : a.startsAt > b.startsAt ? 1 : 0
}

function mentorat(userId: string): MentoratView {
  const all = buildDemoMentorSlots(new Date())
  const mine = memMentorBookings.get(userId) ?? new Map<string, MentorSlot>()
  const upcoming = all.filter((s) => !mine.has(s.id)).sort(byStart)
  const mySessions = [...mine.values()].sort(byStart)
  return { upcoming, mySessions }
}

function bookMentorSlot(userId: string, slotId: string): MentorSlot | undefined {
  const slot = buildDemoMentorSlots(new Date()).find((s) => s.id === slotId)
  if (!slot) return undefined
  const booked: MentorSlot = { ...slot, status: "booked", bookedBy: userId }
  const mine = memMentorBookings.get(userId) ?? new Map<string, MentorSlot>()
  mine.set(slotId, booked)
  memMentorBookings.set(userId, mine)
  return booked
}

function cancelMentorSlot(userId: string, slotId: string): boolean {
  const mine = memMentorBookings.get(userId)
  if (!mine || !mine.has(slotId)) return false
  mine.delete(slotId)
  return true
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

// --- Antrenorul de rugăciune (docs/00-DIRECTIE §4) + Zidul Ebenezer (§5) ---
// Deocamdată in-memory (nu există încă tabel în @emanus/db); se persistă la login real.

function prayerLevels(): PrayerLevel[] {
  return PRAYER_LEVELS
}

async function listEbenezer(userId: string): Promise<PrayerRequest[]> {
  return memPrayers.get(userId) ?? []
}

async function addPrayerRequest(userId: string, text: string): Promise<PrayerRequest> {
  const request: PrayerRequest = {
    id: `mem-prayer-${++memPrayerSeq}`,
    userId,
    text,
    createdAt: new Date().toISOString(),
    answered: false,
  }
  const list = memPrayers.get(userId) ?? []
  list.unshift(request)
  memPrayers.set(userId, list)
  return request
}

async function markPrayerAnswered(
  userId: string,
  id: string,
  note?: string,
): Promise<PrayerRequest | undefined> {
  const list = memPrayers.get(userId) ?? []
  const found = list.find((p) => p.id === id)
  if (!found) return undefined
  found.answered = true
  found.answeredAt = new Date().toISOString()
  if (note) found.answerNote = note
  memPrayers.set(userId, list)
  return found
}

// --- Legământul familiei (docs/00-DIRECTIE §6) ---
// Temă comună + zid de rugăciune al familiei. In-memory pentru MVP.

function familyThemes(): FamilyThemeOption[] {
  return FAMILY_THEMES
}

async function getFamily(userId: string): Promise<FamilyView> {
  const family = memFamilies.get(userId) ?? null
  const theme = family ? getFamilyTheme(family.themeId) ?? null : null
  const prayers = memFamilyPrayers.get(userId) ?? []
  return { family, theme, prayers }
}

async function createFamily(
  userId: string,
  input: { name: string; themeId: string; covenant: string; members: FamilyMember[] },
): Promise<FamilyView> {
  const existing = memFamilies.get(userId)
  const family: Family = {
    id: existing?.id ?? `mem-family-${++memFamilySeq}`,
    name: input.name,
    themeId: input.themeId,
    covenant: input.covenant,
    members: input.members,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  }
  memFamilies.set(userId, family)
  return getFamily(userId)
}

async function addFamilyPrayer(
  userId: string,
  author: string,
  text: string,
): Promise<FamilyPrayer> {
  const prayer: FamilyPrayer = {
    id: `mem-fprayer-${++memFamilyPrayerSeq}`,
    author,
    text,
    createdAt: new Date().toISOString(),
    answered: false,
  }
  const list = memFamilyPrayers.get(userId) ?? []
  list.unshift(prayer)
  memFamilyPrayers.set(userId, list)
  return prayer
}

async function markFamilyPrayerAnswered(
  userId: string,
  id: string,
): Promise<FamilyPrayer | undefined> {
  const list = memFamilyPrayers.get(userId) ?? []
  const found = list.find((p) => p.id === id)
  if (!found) return undefined
  found.answered = true
  found.answeredAt = new Date().toISOString()
  memFamilyPrayers.set(userId, list)
  return found
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

// --- „Creșterea mea”: al doilea onboarding profund (docs/00-DIRECTIE) ---
// Text liber -> profil de nevoi (axe + etichete) -> conținut adaptiv (modulul axei dominante).
async function saveGrowthProfile(
  userId: string,
  categoryId: string,
  text: string,
): Promise<GrowthProfileResult> {
  const profile = analyzeGrowthText(text)
  memGrowthProfiles.set(userId, profile)
  const modules = await tree(categoryId)
  const match = profile.primaryAxis
    ? modules.find((m) => m.axis === profile.primaryAxis)
    : undefined
  const course = match?.courses[0]
  const firstLesson = course?.lessons[0]
  const adaptive: AdaptiveCourse | null =
    match && course
      ? {
          moduleId: match.id,
          courseId: course.id,
          title: course.title,
          struggle: course.struggle,
          truth: course.truth,
          firstLessonId: firstLesson?.id,
        }
      : null
  return { profile, adaptive }
}

async function getGrowthProfile(userId: string): Promise<NeedProfile | null> {
  return memGrowthProfiles.get(userId) ?? null
}

// Îmbogățește un post cu metadatele de cerere-de-rugăciune (kind + contor).
function enrichPost(p: CommunityPostView): CommunityPostView {
  const meta = memPostMeta.get(p.id)
  return {
    ...p,
    kind: meta?.kind ?? p.kind ?? "post",
    prayCount: meta?.prayCount ?? p.prayCount ?? 0,
  }
}

async function createPost(
  userId: string,
  categoryId: string,
  body: string,
  kind: CommunityPostKind = "post",
): Promise<CreatePostResult> {
  const moderation = moderatePost(body)
  if (useDb) {
    const dbPost = await (await db()).createPost({
      userId,
      categoryId,
      body,
      status: moderation.decision,
    })
    const post: CommunityPostView = { ...dbPost, kind, prayCount: 0 }
    memPostMeta.set(post.id, { kind, prayCount: 0, prayedBy: new Set() })
    return { post, moderation }
  }
  const post: CommunityPostView = {
    id: `mem-post-${++memPostSeq}`,
    userId,
    author: { anonName: "Explorator", avatar: "🌱" },
    categoryId,
    body,
    kind,
    prayCount: 0,
    createdAt: new Date().toISOString(),
    status: moderation.decision,
  }
  memPosts.unshift(post)
  memPostMeta.set(post.id, { kind, prayCount: 0, prayedBy: new Set() })
  return { post, moderation }
}

// „Mă rog pentru tine”: incrementează contorul cumulativ (o dată per utilizator).
async function prayForPost(
  userId: string,
  postId: string,
): Promise<{ prayCount: number } | undefined> {
  const meta = memPostMeta.get(postId)
  if (!meta) return undefined
  if (!meta.prayedBy.has(userId)) {
    meta.prayedBy.add(userId)
    meta.prayCount += 1
  }
  return { prayCount: meta.prayCount }
}

async function listCommunity(categoryId: string): Promise<CommunityPostView[]> {
  if (useDb) {
    const base = await (await db()).listPosts(categoryId, "visible")
    return base.map(enrichPost)
  }
  return memPosts
    .filter((p) => p.categoryId === categoryId && p.status === "visible")
    .map(enrichPost)
}

export const store = {
  categories,
  category,
  lesson,
  firstLesson,
  tree,
  applyProgress,
  dashboard,
  mentor,
  mentorat,
  bookMentorSlot,
  cancelMentorSlot,
  dailyRitual,
  growth,
  recommendation,
  diagnostic,
  prayerLevels,
  listEbenezer,
  addPrayerRequest,
  markPrayerAnswered,
  familyThemes,
  getFamily,
  createFamily,
  addFamilyPrayer,
  markFamilyPrayerAnswered,
  createUser,
  setBaseline,
  saveGrowthProfile,
  getGrowthProfile,
  createPost,
  prayForPost,
  listCommunity,
}
