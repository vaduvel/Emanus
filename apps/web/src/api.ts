import type {
  Category,
  CommunityPostView,
  CrisisResource,
  DailyView,
  DashboardView,
  DiagnosticQuestion,
  GamState,
  GrowthScore,
  Lesson,
  ModerationResult,
} from "@emanus/shared"
import { getUserId } from "./session"

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
  return getJson<DailyView>("/me/daily")
}

export function getDashboard(): Promise<DashboardView> {
  return getJson<DashboardView>("/me/dashboard")
}

export function getGrowth(): Promise<GrowthScore[]> {
  return getJson<GrowthScore[]>("/me/growth")
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

export function createPost(categoryId: string, body: string): Promise<CreatePostResult> {
  return postJson<CreatePostResult>("/community", { categoryId, body })
}

export function getCrisis(): Promise<{ resources: CrisisResource[] }> {
  return getJson("/crisis")
}
