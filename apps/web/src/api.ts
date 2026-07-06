import type {
  Category,
  CommunityPostKind,
  CommunityPostView,
  CrisisResource,
  DailyView,
  DashboardView,
  DiagnosticQuestion,
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
  NeedProfile,
  PrayerLevel,
  PrayerRequest,
  RecommendationView,
} from "@emanus/shared"
import { getCategory, getUserId } from "./session"

const BASE = import.meta.env.VITE_API_URL ?? "/api"

function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const uid = getUserId()
  return uid ? { ...extra, "x-user-id": uid } : extra
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Cerere eșuată (${res.status}): ${path}`)
  return (await res.json()) as T
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cerere eșuată (${res.status}): ${path}`)
  return (await res.json()) as T
}

export function getFirstLesson(): Promise<Lesson> {
  return getJson<Lesson>("/public/first-lesson")
}

export function getLesson(id: string): Promise<Lesson> {
  return getJson<Lesson>(`/lessons/${id}`)
}

export function getCategories(): Promise<Category[]> {
  return getJson<Category[]>("/categories")
}

export function getDaily(): Promise<DailyView> {
  return getJson<DailyView>(`/me/daily?category=${encodeURIComponent(getCategory())}`)
}

export function getDashboard(): Promise<DashboardView> {
  return getJson<DashboardView>(`/me/dashboard?category=${encodeURIComponent(getCategory())}`)
}

export function getMentor(): Promise<MentorStatus> {
  return getJson<MentorStatus>(`/me/mentor?category=${encodeURIComponent(getCategory())}`)
}

export function getMentorat(): Promise<MentoratView> {
  return getJson<MentoratView>("/me/mentorat")
}

export function bookMentorSession(id: string): Promise<MentorSlot> {
  return postJson<MentorSlot>(`/me/mentorat/${id}/book`, {})
}

export function cancelMentorSession(id: string): Promise<{ ok: boolean }> {
  return postJson<{ ok: boolean }>(`/me/mentorat/${id}/cancel`, {})
}

// Mentor: oferă un slot propriu (dată/oră, subiect, durată).
export function offerMentorSlot(input: {
  mentorName: string
  topic: string
  startsAt: string
  durationMin: number
}): Promise<MentorSlot> {
  return postJson<MentorSlot>("/me/mentorat/offer", input)
}

// Mentor: retrage un slot oferit (încă neprogramat).
export function withdrawMentorSlot(id: string): Promise<{ ok: boolean }> {
  return postJson<{ ok: boolean }>(`/me/mentorat/${id}/withdraw`, {})
}

// Login LAST: leagă progresul anonim curent (x-user-id) de id-ul stabil Supabase.
// Se apelează ÎNAINTE de a schimba id-ul local, ca headerul să conțină id-ul anonim.
export function linkAccount(toUserId: string): Promise<{ ok: boolean; userId: string }> {
  return postJson<{ ok: boolean; userId: string }>("/me/link", { toUserId })
}

export function getGrowth(): Promise<GrowthScore[]> {
  return getJson<GrowthScore[]>("/me/growth")
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

export function saveGrowthProfile(text: string, categoryId: string): Promise<GrowthProfileResult> {
  return postJson<GrowthProfileResult>("/me/growth-profile", { text, categoryId })
}

export function getGrowthProfile(): Promise<{ profile: NeedProfile | null }> {
  return getJson<{ profile: NeedProfile | null }>("/me/growth-profile")
}

export function getRecommendation(category: string, stage: string): Promise<RecommendationView> {
  return getJson<RecommendationView>(
    `/me/recommendation?category=${encodeURIComponent(category)}&stage=${encodeURIComponent(stage)}`,
  )
}

export function getDiagnostic(
  category: string,
): Promise<{ categoryId: string; questions: DiagnosticQuestion[] }> {
  return getJson(`/diagnostic?category=${encodeURIComponent(category)}`)
}

export function createUser(input: {
  anonName: string
  avatar: string
  ageBand?: string
  categoryId: string
  consent: Record<string, unknown>
}): Promise<{ id: string }> {
  return postJson<{ id: string }>("/users", input)
}

export function submitDiagnostic(
  categoryId: string,
  answers: Record<string, number>,
): Promise<{ growth: GrowthScore[] }> {
  return postJson<{ growth: GrowthScore[] }>("/me/diagnostic", { categoryId, answers })
}

export interface ProgressResult {
  lessonId: string
  status: string
  reward: {
    xp: number
    badgeId?: string
    certificateId?: string
    unlocksModuleId?: string
  }
  moduleCompleted: boolean
  gam: GamState
  growth: GrowthScore[]
  levelAfter: number
}

export function submitProgress(
  id: string,
  choicesMade: Record<string, string> = {},
): Promise<ProgressResult> {
  return postJson<ProgressResult>(`/lessons/${id}/progress`, { choicesMade })
}

export function getCommunity(
  category: string,
): Promise<{ categoryId: string; posts: CommunityPostView[] }> {
  return getJson(`/community?category=${encodeURIComponent(category)}`)
}

export interface CreatePostResult {
  post: CommunityPostView
  moderation: ModerationResult
  crisisResources?: CrisisResource[]
}

export function createPost(
  categoryId: string,
  body: string,
  kind: CommunityPostKind = "post",
): Promise<CreatePostResult> {
  return postJson<CreatePostResult>("/community", { categoryId, body, kind })
}

export function prayForPost(postId: string): Promise<{ prayCount: number }> {
  return postJson<{ prayCount: number }>(`/community/${postId}/pray`, {})
}

export function getCrisis(): Promise<{ resources: CrisisResource[] }> {
  return getJson("/crisis")
}

export function getPrayerLevels(): Promise<{ levels: PrayerLevel[] }> {
  return getJson("/me/prayer/levels")
}

export function getEbenezer(): Promise<{ requests: PrayerRequest[] }> {
  return getJson("/me/ebenezer")
}

export function addPrayerRequest(text: string): Promise<PrayerRequest> {
  return postJson<PrayerRequest>("/me/ebenezer", { text })
}

export function markPrayerAnswered(id: string, note?: string): Promise<PrayerRequest> {
  return postJson<PrayerRequest>(`/me/ebenezer/${id}/answered`, { note })
}

export function getFamilyThemes(): Promise<{ themes: FamilyThemeOption[] }> {
  return getJson("/me/family/themes")
}

export function getFamily(): Promise<FamilyView> {
  return getJson<FamilyView>("/me/family")
}

export function createFamily(input: {
  name: string
  themeId: string
  covenant: string
  members?: FamilyMember[]
}): Promise<FamilyView> {
  return postJson<FamilyView>("/me/family", input)
}

export function addFamilyPrayer(text: string, author: string): Promise<FamilyPrayer> {
  return postJson<FamilyPrayer>("/me/family/prayers", { text, author })
}

export function markFamilyPrayerAnswered(id: string): Promise<FamilyPrayer> {
  return postJson<FamilyPrayer>(`/me/family/prayers/${id}/answered`, {})
}

// Push notifications (opt-in pentru cereri de rugăciune în comunitate).
export function getPushPublicKey(): Promise<{ key: string; enabled: boolean }> {
  return getJson<{ key: string; enabled: boolean }>("/push/public-key")
}

export function subscribePush(subscription: unknown): Promise<{ ok: boolean; enabled?: boolean }> {
  return postJson<{ ok: boolean; enabled?: boolean }>("/push/subscribe", { subscription })
}

export function unsubscribePush(endpoint: string): Promise<{ ok: boolean }> {
  return postJson<{ ok: boolean }>("/push/unsubscribe", { endpoint })
}
