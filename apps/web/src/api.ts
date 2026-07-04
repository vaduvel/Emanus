import type { Category, Lesson } from "@emanus/shared"

const BASE = import.meta.env.VITE_API_URL ?? "/api"

export async function getFirstLesson(): Promise<Lesson> {
  const res = await fetch(`${BASE}/public/first-lesson`)
  if (!res.ok) throw new Error("Nu am putut încărca prima lecție.")
  return res.json()
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories`)
  if (!res.ok) throw new Error("Nu am putut încărca categoriile.")
  return res.json()
}

export async function completeLesson(id: string): Promise<{ reward: { xp: number } }> {
  const res = await fetch(`${BASE}/lessons/${id}/progress`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}"
  })
  if (!res.ok) throw new Error("Nu am putut salva progresul.")
  return res.json()
}
