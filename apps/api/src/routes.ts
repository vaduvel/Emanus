import { levelForXp } from "@emanus/shared"
import type { Express } from "express"
import { store } from "./store.js"

export function registerRoutes(app: Express): void {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "emanus-api", phase: 1 })
  })

  // Prima lecție gratis, fără cont (workbook §16.4)
  app.get("/public/first-lesson", async (_req, res, next) => {
    try {
      const lesson = await store.firstLesson()
      if (!lesson) return res.status(404).json({ error: "not_found" })
      res.json(lesson)
    } catch (e) {
      next(e)
    }
  })

  app.get("/categories", (_req, res) => {
    res.json(store.categories())
  })

  app.get("/categories/:id/tree", async (req, res, next) => {
    try {
      const category = store.category(req.params.id)
      if (!category) return res.status(404).json({ error: "unknown_category" })
      res.json({ category, modules: await store.tree(req.params.id) })
    } catch (e) {
      next(e)
    }
  })

  app.get("/lessons/:id", async (req, res, next) => {
    try {
      const lesson = await store.lesson(req.params.id)
      if (!lesson) return res.status(404).json({ error: "not_found" })
      res.json(lesson)
    } catch (e) {
      next(e)
    }
  })

  // Marchează progresul și întoarce recompensa (workbook §8).
  app.post("/lessons/:id/progress", async (req, res, next) => {
    try {
      const lesson = await store.lesson(req.params.id)
      if (!lesson) return res.status(404).json({ error: "not_found" })
      const rewardStep = [...lesson.steps].reverse().find((s) => s.reward)
      const reward = rewardStep?.reward ?? { xp: 10 }
      res.json({
        lessonId: lesson.id,
        status: "completed",
        reward,
        levelAfter: levelForXp(reward.xp),
      })
    } catch (e) {
      next(e)
    }
  })
}
