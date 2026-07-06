import { CRISIS_RESOURCES, DEMO_USER_ID, MAX_POST_LENGTH, isFaithStage } from "@emanus/shared"
import type { Express, Request } from "express"
import { store } from "./store.js"
import {
  pushEnabled,
  pushPublicKey,
  reassignPushSubscriptions,
  removePushSubscription,
  savePushSubscription,
  sendPushToAll,
} from "./push.js"

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
        avatar: avatar ?? "\ud83c\udf31",
        ageBand,
        categoryId,
        consent: consent ?? {},
      })
      res.json(user)
    } catch (e) {
      next(e)
    }
  })

  // Autentificare (login LAST): leagă progresul anonim de contul autentificat (Supabase).
  // Se apelează cu x-user-id = id-ul anonim curent și toUserId = id-ul Supabase.
  app.post("/me/link", (req, res) => {
    const to = typeof req.body?.toUserId === "string" ? req.body.toUserId.trim() : ""
    if (!to) return res.status(400).json({ error: "missing_to" })
    const from = userIdOf(req)
    const result = store.linkAccount(from, to)
    reassignPushSubscriptions(from, to)
    res.json(result)
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

  // Nivelul Mentor (docs/00-DIRECTIE): eligibilitate din nivel + module absolvite
  app.get("/me/mentor", async (req, res, next) => {
    try {
      const categoryId = (req.query.category as string) || "teens12_18"
      res.json(await store.mentor(userIdOf(req), categoryId))
    } catch (e) {
      next(e)
    }
  })

  // Calendar de mentorat: sloturi disponibile + sesiunile mele (docs/00-DIRECTIE)
  app.get("/me/mentorat", (req, res) => {
    res.json(store.mentorat(userIdOf(req)))
  })

  // Calendar de mentorat: un mentor oferă un slot propriu (înainte de rutele cu :id)
  app.post("/me/mentorat/offer", (req, res) => {
    const topic = typeof req.body?.topic === "string" ? req.body.topic.trim() : ""
    const startsAt = typeof req.body?.startsAt === "string" ? req.body.startsAt.trim() : ""
    if (!topic || !startsAt) return res.status(400).json({ error: "missing_fields" })
    const when = new Date(startsAt)
    if (Number.isNaN(when.getTime())) return res.status(400).json({ error: "bad_date" })
    const mentorName =
      typeof req.body?.mentorName === "string" && req.body.mentorName.trim()
        ? req.body.mentorName.trim()
        : "Mentor"
    const durationRaw = Number(req.body?.durationMin)
    const durationMin =
      Number.isFinite(durationRaw) && durationRaw > 0 ? Math.round(durationRaw) : 30
    res.json(
      store.offerMentorSlot(userIdOf(req), {
        mentorName,
        topic,
        startsAt: when.toISOString(),
        durationMin,
      }),
    )
  })

  // Calendar de mentorat: programează un slot
  app.post("/me/mentorat/:id/book", (req, res) => {
    const booked = store.bookMentorSlot(userIdOf(req), req.params.id)
    if (!booked) return res.status(404).json({ error: "not_found" })
    res.json(booked)
  })

  // Calendar de mentorat: anulează o sesiune programată
  app.post("/me/mentorat/:id/cancel", (req, res) => {
    const ok = store.cancelMentorSlot(userIdOf(req), req.params.id)
    if (!ok) return res.status(404).json({ error: "not_found" })
    res.json({ ok: true })
  })

  // Calendar de mentorat: un mentor retrage un slot oferit (încă neprogramat)
  app.post("/me/mentorat/:id/withdraw", (req, res) => {
    const ok = store.withdrawMentorSlot(userIdOf(req), req.params.id)
    if (!ok) return res.status(404).json({ error: "not_found" })
    res.json({ ok: true })
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

  // „Creșterea mea”: al doilea onboarding profund — text liber -> profil de nevoi + conținut adaptiv
  app.post("/me/growth-profile", async (req, res, next) => {
    try {
      const text = typeof req.body?.text === "string" ? req.body.text.trim() : ""
      if (!text) return res.status(400).json({ error: "empty" })
      if (text.length > 2000) return res.status(400).json({ error: "too_long" })
      const categoryId = (req.body?.categoryId as string) || "teens12_18"
      res.json(await store.saveGrowthProfile(userIdOf(req), categoryId, text))
    } catch (e) {
      next(e)
    }
  })

  // „Creșterea mea”: profilul de nevoi salvat (dacă există)
  app.get("/me/growth-profile", async (req, res, next) => {
    try {
      res.json({ profile: await store.getGrowthProfile(userIdOf(req)) })
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

  // Legământul familiei: teme sugerate (docs/00-DIRECTIE §6)
  app.get("/me/family/themes", (_req, res) => {
    res.json({ themes: store.familyThemes() })
  })

  // Legământul familiei: starea curentă (temă + legământ + zid)
  app.get("/me/family", async (req, res, next) => {
    try {
      res.json(await store.getFamily(userIdOf(req)))
    } catch (e) {
      next(e)
    }
  })

  // Legământul familiei: creează sau actualizează
  app.post("/me/family", async (req, res, next) => {
    try {
      const { name, themeId, covenant, members } = req.body ?? {}
      if (!name || !themeId) return res.status(400).json({ error: "missing_fields" })
      res.json(
        await store.createFamily(userIdOf(req), {
          name: String(name).trim(),
          themeId: String(themeId),
          covenant: typeof covenant === "string" ? covenant.trim() : "",
          members: Array.isArray(members) ? members : [],
        }),
      )
    } catch (e) {
      next(e)
    }
  })

  // Legământul familiei: adaugă o rugăciune pe zidul familiei
  app.post("/me/family/prayers", async (req, res, next) => {
    try {
      const text = typeof req.body?.text === "string" ? req.body.text.trim() : ""
      const author = typeof req.body?.author === "string" ? req.body.author.trim() : ""
      if (!text) return res.status(400).json({ error: "empty" })
      if (text.length > 500) return res.status(400).json({ error: "too_long" })
      res.json(await store.addFamilyPrayer(userIdOf(req), author || "Familie", text))
    } catch (e) {
      next(e)
    }
  })

  // Legământul familiei: marchează o rugăciune ca răspunsă
  app.post("/me/family/prayers/:id/answered", async (req, res, next) => {
    try {
      const updated = await store.markFamilyPrayerAnswered(userIdOf(req), req.params.id)
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

  // Comunitate: creează o postare (cu moderare automată + detectare criză).
  // kind = "prayer_request" apare în feed ca „[user] a cerut rugăciune”.
  app.post("/community", async (req, res, next) => {
    try {
      const { categoryId, body, kind } = req.body ?? {}
      const text = typeof body === "string" ? body.trim() : ""
      if (!text) return res.status(400).json({ error: "empty" })
      if (text.length > MAX_POST_LENGTH) return res.status(400).json({ error: "too_long" })
      const postKind = kind === "prayer_request" ? "prayer_request" : "post"
      const authorId = userIdOf(req)
      const result = await store.createPost(authorId, categoryId || "teens12_18", text, postKind)
      // La o cerere de rugăciune vizibilă, anunță comunitatea prin push (best-effort, exclude autorul).
      if (postKind === "prayer_request" && result.post.status === "visible") {
        void sendPushToAll(
          {
            title: "Cineva a cerut rugăciune",
            body: "Un membru al comunității are nevoie de rugăciunea ta.",
            url: "/community",
          },
          { excludeUserId: authorId },
        ).catch(() => {})
      }
      res.json({
        ...result,
        crisisResources: result.moderation.crisis ? CRISIS_RESOURCES : undefined,
      })
    } catch (e) {
      next(e)
    }
  })

  // Comunitate: „Mă rog pentru tine” — incrementează contorul unei cereri de rugăciune
  app.post("/community/:id/pray", async (req, res, next) => {
    try {
      const updated = await store.prayForPost(userIdOf(req), req.params.id)
      if (!updated) return res.status(404).json({ error: "not_found" })
      res.json(updated)
    } catch (e) {
      next(e)
    }
  })

  // Push: cheia publică VAPID pentru abonare din client (gol dacă push nu e configurat)
  app.get("/push/public-key", (_req, res) => {
    res.json({ key: pushPublicKey(), enabled: pushEnabled() })
  })

  // Push: înregistrează abonamentul utilizatorului curent
  app.post("/push/subscribe", (req, res) => {
    const sub = req.body?.subscription
    if (!sub || typeof sub !== "object" || typeof sub.endpoint !== "string") {
      return res.status(400).json({ error: "bad_subscription" })
    }
    res.json(savePushSubscription(userIdOf(req), sub))
  })

  // Push: dezinregistrează abonamentul (după endpoint)
  app.post("/push/unsubscribe", (req, res) => {
    const endpoint = typeof req.body?.endpoint === "string" ? req.body.endpoint : ""
    res.json(removePushSubscription(userIdOf(req), endpoint))
  })
}
