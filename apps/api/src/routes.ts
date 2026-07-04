import { DEMO_USER_ID } from "@emanus/shared"
import type { Express, Request } from "express"
import { store } from "./store.js"

function userIdOf(req: Request): string {
  const h = req.header("x-user-id")
  return h && h.trim() ? h.trim() : DEMO_USER_ID
}

export function registerRoutes(app: Express): void {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "emanus-api", phase: 3 })
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

  // Marchează progresul, aplică recompensa (XP/streak/insigne/creștere) — workbook §8/§10.
  app.post("/lessons/:id/progress", async (req, res, next) => {
    try {
      const lesson = await store.lesson(req.params.id)
      if (!lesson) return res.status(404).json({ error: "not_found" })
      const choicesMade = (req.body?.choicesMade ?? {}) as Record<string, string>
      const outcome = await store.applyProgress(userIdOf(req), lesson, choicesMade)
      res.json({ lessonId: lesson.id, levelAfter: outcome.gam.level, ...outcome })
    } catch (e) {
      next(e)
    }
  })

  // Dashboard „Parcursul meu" (workbook §10)
  app.get("/me/dashboard", async (req, res, next) => {
    try {
      const categoryId = (req.query.category as string) || "teens12_18"
      res.json(await store.dashboard(userIdOf(req), categoryId))
    } catch (e) {
      next(e)
    }
  })

  // Radarul de creștere (workbook §10)
  app.get("/me/growth", async (req, res, next) => {
    try {
      res.json(await store.growth(userIdOf(req)))
    } catch (e) {
      next(e)
    }
  })
}
