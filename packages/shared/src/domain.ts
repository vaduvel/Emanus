// Model de date Emanus. Sursa de adevăr: docs/03-workbook-implementare.md §7.
// Engine-ul tratează aceste tipuri ca FIX; adaptarea pe categorii se face prin CategoryConfig.

export type AgeCategoryId =
  | "kids0_5"
  | "kids6_11"
  | "teens12_18"
  | "women"
  | "men"
  | "parents"
  | "grandparents"
  | "couples"
  | "doctrine"

export type GrowthAxisId =
  | "identity"
  | "emotional_peace"
  | "relationships"
  | "living_faith"
  | "character"
  | "freedom"

export type LessonStepType =
  | "check_in"
  | "hook"
  | "choice"
  | "name_struggle"
  | "world_vs_truth"
  | "scripture"
  | "truth_simple"
  | "quiz"
  | "how_god_helps"
  | "step"
  | "memory_verse"
  | "prayer"
  | "journal"
  | "reward"

export type MediaKind = "chat" | "video" | "audio" | "animation"

export interface CategoryConfig {
  tone: string
  bubbleMaxChars: number
  mediaMix: MediaKind[]
  bibleTranslation: string
  diagnosticQuestionIds: string[]
  accessibility?: { largeFont?: boolean; highContrast?: boolean; audioFirst?: boolean }
  requiresParent?: boolean
}

export interface Category {
  id: AgeCategoryId
  name: string
  ageRange: string
  dominantFormat: string
  config: CategoryConfig
  moduleIds: string[]
}

export interface Module {
  id: string
  categoryId: AgeCategoryId
  order: number
  title: string
  axis: GrowthAxisId
  courseIds: string[]
  unlockRule?: UnlockRule
}

export interface Course {
  id: string
  moduleId: string
  order: number
  title: string
  struggle: string
  truth: string
  lessonIds: string[]
}

export interface Lesson {
  id: string
  courseId: string
  order: number
  title: string
  estMinutes: number
  anchorRefs: string[]
  memoryVerseRef: string
  badgeId?: string
  steps: LessonStep[]
}

export interface ChoiceOption {
  id: string
  label: string
  branchStepId?: string
}

export interface LessonStep {
  id: string
  type: LessonStepType
  order: number
  bubbles?: { from: "guide"; text: string }[]
  choice?: { prompt: string; options: ChoiceOption[] }
  quiz?: { question: string; options: { text: string; correct: boolean }[]; explanation: string }
  scripture?: { text: string; ref: string }
  journalPrompt?: string
  reward?: Reward
}

export interface Reward {
  xp: number
  badgeId?: string
  axisDeltas?: Partial<Record<GrowthAxisId, number>>
  unlocksModuleId?: string
  certificateId?: string
}

export interface UnlockRule {
  requiresModuleComplete?: string
  requiresAgeMin?: number
}

export interface User {
  id: string
  anonName: string
  avatar: string
  ageBand?: string
  categoryId: AgeCategoryId
  createdAt: string
  consent: ConsentFlags
  parentLink?: { parentUserId?: string; childUserIds?: string[] }
}

export interface ConsentFlags {
  termsAccepted: boolean
  parentalConsent?: boolean
  dataProcessing: boolean
}

export interface Progress {
  userId: string
  lessonId: string
  status: "not_started" | "in_progress" | "completed"
  completedAt?: string
  choicesMade: Record<string, string>
}

export interface GamState {
  userId: string
  xp: number
  level: number
  streakDays: number
  lastActiveDate: string
  badgeIds: string[]
  certificateIds: string[]
}

export interface GrowthScore {
  userId: string
  axis: GrowthAxisId
  baseline: number
  current: number
  updatedAt: string
}

export interface JournalEntry {
  id: string
  userId: string
  lessonId: string
  prompt: string
  text: string
  createdAt: string
  private: boolean
}

export interface CommunityPost {
  id: string
  userId: string
  categoryId: AgeCategoryId
  body: string
  createdAt: string
  status: "visible" | "pending" | "removed"
}

// --- Constante engine (workbook §3, §6, §8) ---

export const GROWTH_AXES: GrowthAxisId[] = [
  "identity",
  "emotional_peace",
  "relationships",
  "living_faith",
  "character",
  "freedom",
]

export const LESSON_STEP_ORDER: LessonStepType[] = [
  "check_in",
  "hook",
  "choice",
  "name_struggle",
  "world_vs_truth",
  "scripture",
  "truth_simple",
  "quiz",
  "how_god_helps",
  "step",
  "memory_verse",
  "prayer",
  "journal",
  "reward",
]

export const XP_PER_LESSON = 10
export const XP_MODULE_COMPLETE_BONUS = 20
export const XP_PER_LEVEL = 100

export function levelForXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

/** Radar de creștere (workbook §10): 0.5*selfReport + 0.3*moduleReview + 0.2*behaviorSignal, clamp 0..100 */
export function computeAxisScore(input: {
  selfReport: number
  moduleReview: number
  behaviorSignal: number
}): number {
  const raw = 0.5 * input.selfReport + 0.3 * input.moduleReview + 0.2 * input.behaviorSignal
  return Math.max(0, Math.min(100, Math.round(raw)))
}
