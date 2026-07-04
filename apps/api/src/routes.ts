import { CRISIS_RESOURCES, DEMO_USER_ID, MAX_POST_LENGTH, isFaithStage } from "@emanus/shared"
import type { Express, Request } from "express"
import { store } from "./store.js"

function userIdOf(req: Request): string {
  const h = req.header("x-user-id")
  return h && h.trim() ? h.trim() : DEMO_USER_ID
}

export function registerRoutes(app: Express): void {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "emanus-api", phase: 5 })
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

  // Onboarding: creează utilizatorul (workbook §16.4 / §9)
  app.post("/users", async (req, res, next) => {
    try {
      const { anonName, avatar, ageBand, categoryId, consent } = req.body ?? {}
      if (!anonName || !categoryId) return res.status(400).json({ error: "missing_fields" })
      const user = await store.createUser({
        anonName,
        avatar: avatar ?? "🌱",
        ageBand,
        categoryId,
        consent: consent ?? {},
      })
      res.json(user)
    } catch (e) {
      next(e)
    }
  })

  // Diagnostic inițial: întrebările (workbook §10)
  app.get("/diagnostic", (req, res) => {
    const categoryId = (req.query.category as string) || "teens12_18"
    res.json({ categoryId, questions: store.diagnostic(categoryId) })
  })

  // Diagnostic inițial: setează baseline-ul radarului din răspunsuri
  app.post("/me/diagnostic", async (req, res, next) => {
    try {
      const { categoryId, answers } = req.body ?? {}
      const growth = await store.setBaseline(
        userIdOf(req),
        categoryId || "teens12_18",
        (answers ?? {}) as Record<string, number>,
      )
      res.json({ growth })
    } catch (e) {
      next(e)
    }
  })

  // Ritualul zilnic „Timp cu Dumnezeu” (docs/00-DIRECTIE §2)
  app.get("/me/daily", async (req, res, next) => {
    try {
      const categoryId = (req.query.category as string) || "teens12_18"
      res.json(await store.dailyRitual(userIdOf(req), categoryId))
    } catch (e) {
      next(e)
    }
  })

  // Dashboard „Parcursul meu” (workbook §10)
  app.get("/me/dashboard", async (req, res, next) => {
    try {
      const categoryId = (req.query.category as string) || "teens12_18"
      res.json(await store.dashboard(userIdOf(req), categoryId))
    } catch (e) {
      next(e)
    }
  })

  // Recomandare de parcurs după onboarding (docs/00-DIRECTIE §13: „Ușa, nu unghiul”)
  app.get("/me/recommendation", async (req, res, next) => {
    try {
      const categoryId = (req.query.category as string) || "teens12_18"
      const stageRaw = req.query.stage as string
      const faithStage = isFaithStage(stageRaw) ? stageRaw : "seeking"
      res.json(await store.recommendation(userIdOf(req), categoryId, faithStage))
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

  // Antrenorul de rugăciune: nivelurile progresive (docs/00-DIRECTIE §4)
  app.get("/me/prayer/levels", (_req, res) => {
    res.json({ levels: store.prayerLevels() })
  })

  // Zidul Ebenezer: listează rugăciunile utilizatorului (docs/00-DIRECTIE §5)
  app.get("/me/ebenezer", async (req, res, next) => {
    try {
      res.json({ requests: await store.listEbenezer(userIdOf(req)) })
    } catch (e) {
      next(e)
    }
  })

  // Zidul Ebenezer: adaugă o rugăciune
  app.post("/me/ebenezer", async (req, res, next) => {
    try {
      const text = typeof req.body?.text === "string" ? req.body.text.trim() : ""
      if (!text) return res.status(400).json({ error: "empty" })
      if (text.length > 500) return res.status(400).json({ error: "too_long" })
      res.json(await store.addPrayerRequest(userIdOf(req), text))
    } catch (e) {
      next(e)
    }
  })

  // Zidul Ebenezer: marchează o rugăciune ca răspunsă
  app.post("/me/ebenezer/:id/answered", async (req, res, next) => {
    try {
      const note = typeof req.body?.note === "string" ? req.body.note.trim() : undefined
      const updated = await store.markPrayerAnswered(userIdOf(req), req.params.id, note)
      if (!updated) return res.status(404).json({ error: "not_found" })
      res.json(updated)
    } catch (e) {
      next(e)
    }
  })

  // Resurse de criză (workbook §15)
  app.get("/crisis", (_req, res) => {
    res.json({ resources: CRISIS_RESOURCES })
  })

  // Comunitate: listează postele vizibile (workbook §16.5)
  app.get("/community", async (req, res, next) => {
    try {
      const categoryId = (req.query.category as string) || "teens12_18"
      res.json({ categoryId, posts: await store.listCommunity(categoryId) })
    } catch (e) {
      next(e)
    }
  })

  // Comunitate: creează o postare (cu moderare automată + detectare criză)
  app.post("/community", async (req, res, next) => {
    try {
      const { categoryId, body } = req.body ?? {}
      const text = typeof body === "string" ? body.trim() : ""
      if (!text) return res.status(400).json({ error: "empty" })
      if (text.length > MAX_POST_LENGTH) return res.status(400).json({ error: "too_long" })
      const result = await store.createPost(userIdOf(req), categoryId || "teens12_18", text)
      res.json({
        ...result,
        crisisResources: result.moderation.crisis ? CRISIS_RESOURCES : undefined,
      })
    } catch (e) {
      next(e)
    }
  })
}
