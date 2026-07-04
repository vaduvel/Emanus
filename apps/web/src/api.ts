import type { Category, DashboardView, GamState, GrowthScore, Lesson } from "@emanus/shared"

const BASE = import.meta.env.VITE_API_URL ?? "/api"

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
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

export function getDashboard(): Promise<DashboardView> {
  return getJson<DashboardView>("/me/dashboard")
}

export function getGrowth(): Promise<GrowthScore[]> {
  return getJson<GrowthScore[]>("/me/growth")
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

export async function submitProgress(
  id: string,
  choicesMade: Record<string, string> = {},
): Promise<ProgressResult> {
  const res = await fetch(`${BASE}/lessons/${id}/progress`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ choicesMade }),
  })
  if (!res.ok) throw new Error("Nu am putut salva progresul.")
  return (await res.json()) as ProgressResult
}
