// Motor de gamificare + radar (workbook §8, §10). Funcții pure, testabile.
// Persistența (DB sau in-memory) doar apelează aceste funcții.
import {
  GROWTH_AXES,
  XP_MODULE_COMPLETE_BONUS,
  XP_PER_LESSON,
  levelForXp,
} from "./domain.js"
import type { GamState, GrowthAxisId, GrowthScore, Reward } from "./domain.js"

/** Utilizator implicit pre-auth (Faza 3). Se înlocuiește cu Supabase Auth în Faza 4. */
export const DEMO_USER_ID = "demo-user"

/** Baseline implicit pe fiecare axă de creștere (0..100). */
export const DEFAULT_BASELINE = 20

export function emptyGam(userId: string): GamState {
  return {
    userId,
    xp: 0,
    level: 1,
    streakDays: 0,
    lastActiveDate: "",
    badgeIds: [],
    certificateIds: [],
  }
}

export function defaultGrowth(userId: string, baseline = DEFAULT_BASELINE): GrowthScore[] {
  const now = new Date().toISOString()
  return GROWTH_AXES.map((axis) => ({ userId, axis, baseline, current: baseline, updatedAt: now }))
}

function dayNumber(iso: string): number {
  const d = new Date(iso)
  return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000)
}

/** Streak nou (workbook §8): zile consecutive, cu grace de 1 zi. */
export function nextStreak(
  lastActiveDate: string | null | undefined,
  current: number,
  today: string = new Date().toISOString(),
): number {
  if (!lastActiveDate) return 1
  const diff = dayNumber(today) - dayNumber(lastActiveDate)
  if (diff <= 0) return Math.max(current, 1) // aceeași zi
  if (diff === 1) return current + 1 // zi consecutivă
  if (diff === 2) return current + 1 // grace de 1 zi sărită
  return 1 // streak rupt
}

/** Aplică o recompensă la starea de joc (imutabil). */
export function applyReward(
  gam: GamState,
  reward: Reward,
  opts: { moduleCompleted?: boolean; today?: string } = {},
): GamState {
  const today = opts.today ?? new Date().toISOString()
  const bonus = opts.moduleCompleted ? XP_MODULE_COMPLETE_BONUS : 0
  const xp = gam.xp + (reward.xp ?? XP_PER_LESSON) + bonus
  const badgeIds =
    reward.badgeId && !gam.badgeIds.includes(reward.badgeId)
      ? [...gam.badgeIds, reward.badgeId]
      : gam.badgeIds
  const certificateIds =
    reward.certificateId && !gam.certificateIds.includes(reward.certificateId)
      ? [...gam.certificateIds, reward.certificateId]
      : gam.certificateIds
  return {
    ...gam,
    xp,
    level: levelForXp(xp),
    streakDays: nextStreak(gam.lastActiveDate || null, gam.streakDays, today),
    lastActiveDate: today,
    badgeIds,
    certificateIds,
  }
}

/** Aplică axisDeltas la scorurile de creștere (imutabil), clamp 0..100. */
export function applyAxisDeltas(
  growth: GrowthScore[],
  deltas: Partial<Record<GrowthAxisId, number>> | undefined,
  today: string = new Date().toISOString(),
): GrowthScore[] {
  if (!deltas) return growth
  return growth.map((g) => {
    const d = deltas[g.axis]
    if (!d) return g
    return { ...g, current: Math.max(0, Math.min(100, g.current + d)), updatedAt: today }
  })
}

/** Un modul e considerat absolvit dacă recompensa dă certificat sau deblochează alt modul. */
export function isModuleCompletingReward(reward: Reward): boolean {
  return Boolean(reward.certificateId || reward.unlocksModuleId)
}

// --- Dashboard „Parcursul meu" (workbook §10) ---

export interface DashboardModuleView {
  id: string
  title: string
  axis: GrowthAxisId
  order: number
  lessonsTotal: number
  lessonsCompleted: number
  percent: number
  locked: boolean
}

export interface DashboardView {
  gam: GamState
  growth: GrowthScore[]
  next: { lessonId: string; title: string } | null
  modules: DashboardModuleView[]
}

export function buildDashboard(input: {
  gam: GamState
  growth: GrowthScore[]
  modules: Array<{
    id: string
    title: string
    axis: GrowthAxisId
    order: number
    lessons: Array<{ id: string; title: string }>
  }>
  completedLessonIds: Iterable<string>
}): DashboardView {
  const completed = new Set(input.completedLessonIds)
  const sorted = [...input.modules].sort((a, b) => a.order - b.order)
  let next: { lessonId: string; title: string } | null = null
  const modules: DashboardModuleView[] = sorted.map((m) => {
    const total = m.lessons.length
    const done = m.lessons.filter((l) => completed.has(l.id)).length
    for (const l of m.lessons) {
      if (!completed.has(l.id) && !next) next = { lessonId: l.id, title: l.title }
    }
    return {
      id: m.id,
      title: m.title,
      axis: m.axis,
      order: m.order,
      lessonsTotal: total,
      lessonsCompleted: done,
      percent: total ? Math.round((done / total) * 100) : 0,
      locked: false,
    }
  })
  for (let i = 1; i < modules.length; i++) {
    const prev = modules[i - 1]
    modules[i].locked = !(prev.lessonsTotal > 0 && prev.lessonsCompleted >= prev.lessonsTotal)
  }
  return { gam: input.gam, growth: input.growth, next, modules }
}
