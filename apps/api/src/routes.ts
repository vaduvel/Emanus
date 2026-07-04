import { levelForXp } from "@emanus/shared"
import type { Express } from "express"
import { store } from "./store.js"

export function registerRoutes(app: Express): void {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "emanus-api", phase: 1 })
  })

  // Prima lecție gratis, fără cont (workbook §16.4)
  app.get("/public/first-lesson", (_req, res) => {
    const lesson = store.firstLesson()
    if (!lesson) return res.status(404).json({ error: "not_found" })
    res.json(lesson)
  })

  app.get("/categories", (_req, res) => {
    res.json(store.categories())
  })

  app.get("/categories/:id/tree", (req, res) => {
    const category = store.category(req.params.id)
    if (!category) return res.status(404).json({ error: "unknown_category" })
    res.json({ category, modules: store.tree(req.params.id) })
  })

  app.get("/lessons/:id", (req, res) => {
    const lesson = store.lesson(req.params.id)
    if (!lesson) return res.status(404).json({ error: "not_found" })
    res.json(lesson)
  })

  // Marchează progresul și întoarce recompensa (workbook §8). In-memory: fără persistență încă.
  app.post("/lessons/:id/progress", (req, res) => {
    const lesson = store.lesson(req.params.id)
    if (!lesson) return res.status(404).json({ error: "not_found" })
    const rewardStep = [...lesson.steps].reverse().find((s) => s.reward)
    const reward = rewardStep?.reward ?? { xp: 10 }
    res.json({
      lessonId: lesson.id,
      status: "completed",
      reward,
      levelAfter: levelForXp(reward.xp),
    })
  })
}
