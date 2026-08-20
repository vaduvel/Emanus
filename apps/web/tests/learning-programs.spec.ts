import { expect, test } from "@playwright/test"
import {
  PATHS,
  computeEmmausJourney,
  emmausUnitsFromLibraryShelves,
  emmausUnitsFromPaths,
} from "@emanus/shared"
import { ALL_LIBRARY_COURSES, LIBRARY_LESSONS, SHELVES, courseIsOpen } from "@emanus/shared/library"

const FUNDAMENTUL_PROGRAM_ID = "course:lib_fundamentul"
const FUNDAMENTUL_PROGRAM_URL = "/#/program/course%3Alib_fundamentul"
const FUNDAMENTUL_LESSON_IDS = Array.from({ length: 8 }, (_, index) => `fund_l${index + 1}`)

const journey = {
  seenWelcome: true,
  pathId: "path_acasa",
  lessonsDone: 0,
  doctrineDone: 0,
  lastLessonDate: null,
  prayerInviteSeen: false,
  journal: [],
  prayers: [],
  pathCompletedSeen: false,
}

async function accelerateLesson(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const nativeSetTimeout = window.setTimeout.bind(window)
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) =>
      nativeSetTimeout(handler, Math.min(timeout ?? 0, 25), ...args)) as typeof window.setTimeout
  })
}

async function finishVisibleLesson(page: import("@playwright/test").Page) {
  for (let attempt = 0; attempt < 140; attempt += 1) {
    if (await page.locator(".player--done").count()) return
    const safetyContinue = page.getByRole("button", { name: "Sunt în siguranță acum și continui" })
    if (await safetyContinue.count()) {
      await safetyContinue.click()
      continue
    }
    const textarea = page.locator(".chat textarea:visible").first()
    if (await textarea.count()) await textarea.fill("Adevărul pe care vreau să îl păstrez.")
    const continueAction = page.locator(".chat button:visible:not(:disabled)").filter({ hasText: /^Continuă$/u }).last()
    if (await continueAction.count()) {
      await continueAction.click()
      continue
    }
    const action = page.locator(".chat button:visible:not(:disabled)").first()
    if (await action.count()) await action.click()
    else await page.waitForTimeout(30)
  }
  throw new Error("Lecția nu a ajuns la ecranul de finalizare")
}

async function seedFundamentulProgress(
  page: import("@playwright/test").Page,
  completedLessonIds: string[],
  extra: Record<string, unknown> = {},
) {
  await page.evaluate(({ programId, completedIds, additional }) => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        [programId]: {
          completedLessonIds: completedIds,
          lastLessonId: completedIds.at(-1) ?? null,
          journals: {},
          updatedAt: "2026-08-13T10:00:00.000Z",
          ...additional,
        },
      },
    }))
  }, { programId: FUNDAMENTUL_PROGRAM_ID, completedIds: completedLessonIds, additional: extra })
}

async function readFundamentulProgress(page: import("@playwright/test").Page) {
  return page.evaluate((programId) => {
    const store = JSON.parse(window.localStorage.getItem("emanus_learning_progress_v1") ?? "{}")
    return store.programs?.[programId]
  }, FUNDAMENTUL_PROGRAM_ID)
}

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.evaluate((state) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify(state))
    window.localStorage.removeItem("emanus_learning_progress_v1")
  }, journey)
})

test("catalogul Bibliotecii leagă fiecare curs live de lecțiile lui", () => {
  const lessonById = new Map(LIBRARY_LESSONS.map((lesson) => [lesson.id, lesson] as const))
  const liveCourses = ALL_LIBRARY_COURSES.filter((course) => course.state === "live")
  const courseIds = ALL_LIBRARY_COURSES.map((course) => course.id)
  const claimedLessons = new Set<string>()

  expect(new Set(courseIds).size).toBe(courseIds.length)
  expect(lessonById.size).toBe(LIBRARY_LESSONS.length)
  expect(liveCourses).toHaveLength(53)
  expect(LIBRARY_LESSONS).toHaveLength(318)

  const liveLessonIds = new Set(liveCourses.flatMap((course) => course.lessonIds))
  const liveLessons = LIBRARY_LESSONS.filter((lesson) => liveLessonIds.has(lesson.id))
  expect(liveLessons.filter((lesson) => lesson.safety)).toHaveLength(46)
  expect(liveCourses.every((course) => course.lessonIds.some((lessonId) =>
    lessonById.get(lessonId)?.steps.some((step) => step.type === "multi_choice"),
  ))).toBe(true)
  expect(liveLessons.flatMap((lesson) => lesson.steps).flatMap((step) => step.choice?.options ?? [])
    .every((option) => Boolean(option.feedback || option.branchStepId))).toBe(true)

  for (const course of liveCourses) {
    expect(course.lessonIds).toHaveLength(course.plannedLessons)
    for (const lessonId of course.lessonIds) {
      const lesson = lessonById.get(lessonId)
      expect(lesson, `${course.id} trebuie să găsească ${lessonId}`).toBeDefined()
      expect(lesson?.courseId).toBe(course.id)
      expect(claimedLessons.has(lessonId), `${lessonId} nu trebuie refolosit în două cursuri`).toBe(false)
      claimedLessons.add(lessonId)
    }
  }
})

test("Drumul Emanus include cursurile publice și poate ajunge la stația opt", () => {
  const publicShelves = SHELVES.map((shelf) => ({
    id: shelf.id,
    courses: shelf.courses.filter(courseIsOpen),
  }))
  const pathUnits = emmausUnitsFromPaths(PATHS)
  const courseUnits = emmausUnitsFromLibraryShelves(publicShelves)
  const units = [...pathUnits, ...courseUnits]

  expect(pathUnits.some((unit) => unit.id === "path_greutate")).toBe(false)
  expect(pathUnits.some((unit) => unit.id === "path_paine")).toBe(true)
  expect(courseUnits).toHaveLength(53)

  const retiredPath = PATHS.find((path) => path.id === "path_greutate")
  const legacyUnits = emmausUnitsFromPaths(PATHS, {
    completedLessonIds: retiredPath?.lessons.slice(0, 1).map((lesson) => lesson.id) ?? [],
  })
  expect(legacyUnits.some((unit) => unit.id === "path_greutate")).toBe(true)

  const completedLessonIds = [...new Set(units.flatMap((unit) => unit.lessonIds))]
  const result = computeEmmausJourney({ units, completedLessonIds })
  expect(result.currentStation.id).toBe(8)
  expect(result.axesTouched).toBe(6)
})

test("harta Drumul Emanus citește progresul păstrat în cursurile Bibliotecii", async ({ page }) => {
  const openCourses = ALL_LIBRARY_COURSES.filter(courseIsOpen)
  const programs = Object.fromEntries(openCourses.map((course) => [`course:${course.id}`, {
    completedLessonIds: course.lessonIds,
    lastLessonId: course.lessonIds.at(-1) ?? null,
    journals: {},
    updatedAt: "2026-08-20T08:00:00.000Z",
  }]))
  await page.evaluate(({ learning, journeyState }) => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({ version: 1, programs: learning }))
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify({
      ...journeyState,
      schemaVersion: 2,
      doorId: null,
      completedLessonIds: [],
      emmausMaxStation: 1,
      emmausStationSeenAt: {},
      crossVisitedAt: null,
    }))
  }, { learning: programs, journeyState: journey })

  const units = [
    ...emmausUnitsFromPaths(PATHS),
    ...emmausUnitsFromLibraryShelves(SHELVES.map((shelf) => ({
      id: shelf.id,
      courses: shelf.courses.filter(courseIsOpen),
    }))),
  ]
  const expected = computeEmmausJourney({
    units,
    completedLessonIds: openCourses.flatMap((course) => course.lessonIds),
  })
  expect(expected.currentStation.id).toBeGreaterThan(1)

  await page.goto("/#/drum")
  await expect(page.getByRole("heading", { name: expected.currentStation.labelRo })).toBeVisible()
})

test("traseul din Poartă are o singură sesiune activă și viitorul blocat", async ({ page }) => {
  await page.goto("/#/program/path%3Apath_acasa")

  await expect(page.getByRole("heading", { name: "Drumul înapoi" })).toBeVisible()
  await expect(page.locator(".program-session--current")).toHaveCount(1)
  await expect(page.locator(".program-session--locked")).toHaveCount(6)
  await expect(page.locator(".program-session--locked button").first()).toBeDisabled()

  await page.locator(".program-session--current button").click()
  await expect(page).toHaveURL(/#\/program\/path%3Apath_acasa\/lesson\/rusine_l1$/u)
  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await expect(page.getByRole("heading", { name: "El S-a miscat primul" })).toBeVisible()
  await expect(page.getByText("Sesiunea 1 din 7", { exact: true })).toBeVisible()
})

test("Biblioteca arată cursul de continuat și deschide sesiunea următoare", async ({ page }) => {
  await seedFundamentulProgress(page, ["fund_l1"], {
    journals: { fund_l1: "Un gând păstrat" },
  })
  await page.goto("/#/biblioteca")

  const resumeCard = page.locator(".library-active")
  await expect(resumeCard).toContainText("În curs")
  await expect(resumeCard).toContainText("Fundamentul")
  await expect(resumeCard).toContainText("Urmează: Ce s-a rupt, de fapt")
  const directResume = resumeCard.getByRole("button", { name: /Continuă sesiunea 2/u })
  await expect(directResume).toHaveAccessibleName("Continuă sesiunea 2 — Fundamentul")
  await directResume.click()
  await expect(page).toHaveURL(/#\/program\/course%3Alib_fundamentul\/lesson\/fund_l2$/u)
  await expect(page.getByRole("heading", { name: "Ce s-a rupt, de fapt" })).toBeVisible()
  await expect(page.getByText("Sesiunea 2 din 8", { exact: true })).toBeVisible()

  await page.goto("/#/biblioteca")
  await page.locator(".library-active").getByRole("button", { name: "Vezi cursul Fundamentul" }).click()
  await expect(page).toHaveURL(/#\/program\/course%3Alib_fundamentul$/u)
  await expect(page.getByRole("heading", { name: "Fundamentul" })).toBeVisible()
  await expect(page.getByRole("progressbar", { name: "Progresul programului" })).toHaveAttribute("aria-valuenow", "1")
  await expect(page.getByRole("button", { name: /Continuă cu sesiunea 2/u })).toBeVisible()
  await expect(page.locator(".program-session--completed")).toHaveCount(1)
  await expect(page.locator(".program-session--current")).toHaveCount(1)
  await expect(page.locator(".program-session--current")).toContainText("Sesiunea 2")
  const storedJourney = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"))
  expect(storedJourney.lessonsDone).toBe(0)
  expect(storedJourney.lastLessonDate).toBeNull()
})

test("Biblioteca caută fără diacritice și separă cursurile în pregătire", async ({ page }) => {
  await page.goto("/#/biblioteca")

  const search = page.getByRole("searchbox", { name: "Caută în Bibliotecă" })
  await search.fill("casnicia")
  await expect(page.getByRole("button", { name: "Vezi cursul Căsnicia" })).toBeVisible()
  await expect(page.getByText("1 curs găsit", { exact: true })).toBeVisible()

  await search.fill("energii")
  await expect(page.getByRole("heading", { name: "În pregătire" })).toBeVisible()
  await expect(page.locator(".library-planned__course")).toContainText("Energii, horoscop, karma")
  await expect(page.locator(".library-planned__course")).toContainText("Se scrie")

  await page.getByRole("button", { name: "Șterge căutarea" }).click()
  await expect(search).toHaveValue("")
  await expect(page.getByText("Alege un raft", { exact: true })).toBeVisible()
})

test("Biblioteca afișează toate cursurile active și le filtrează", async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:lib_fundamentul": {
          completedLessonIds: ["fund_l1"],
          lastLessonId: "fund_l1",
          journals: {},
          updatedAt: "2026-08-17T12:00:00.000Z",
        },
        "course:lib_bani": {
          completedLessonIds: ["bani_l1"],
          lastLessonId: "bani_l1",
          journals: {},
          updatedAt: "2026-08-17T11:00:00.000Z",
        },
      },
    }))
  })
  await page.goto("/#/biblioteca")

  await expect(page.locator(".library-active")).toHaveCount(2)
  await expect(page.locator(".library-active").nth(0)).toContainText("Fundamentul")
  await expect(page.locator(".library-active").nth(1)).toContainText("Bani și datorii")

  const started = page.getByRole("button", { name: "Începute" })
  await started.click()
  await expect(started).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator(".libcourse--in_progress")).toHaveCount(2)

  await page.getByRole("button", { name: "Încheiate" }).click()
  await expect(page.getByText("Nu am găsit un curs pentru această căutare.", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Arată toate cursurile" }).click()
  await expect(page.getByRole("button", { name: "Toate" })).toHaveAttribute("aria-pressed", "true")
})

test("Fundamentul lasă toate cele opt sesiuni deschise de la început", async ({ page }) => {
  await page.goto(FUNDAMENTUL_PROGRAM_URL)

  await expect(page.getByRole("heading", { name: "Fundamentul" })).toBeVisible()
  await expect(page.locator(".program-session-list .program-session__card")).toHaveCount(8)
  await expect(page.locator(".program-session-list .program-session__card:disabled")).toHaveCount(0)
  await expect(page.locator(".program-session--current")).toHaveCount(1)
  await expect(page.locator(".program-session--available")).toHaveCount(7)

  await page.locator(".program-session-list li").nth(7).getByRole("button").click()
  await expect(page).toHaveURL(/#\/program\/course%3Alib_fundamentul\/lesson\/fund_l8$/u)
  await expect(page.getByRole("heading", { name: "Ce urmează mâine" })).toBeVisible()
  await expect(page.getByText("Sesiunea 8 din 8", { exact: true })).toBeVisible()
})

test("check-in-ul Fundamentului păstrează întrebarea și răspunsurile editoriale", async ({ page }) => {
  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l1`)

  await expect(page.getByText("Cum ești, cu adevărat, azi?", { exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: "Sunt aici și pot continua." })).toBeVisible()
  await expect(page.getByRole("button", { name: "Îmi este greu, dar vreau să ascult." })).toBeVisible()
  await expect(page.getByRole("button", { name: "Nu știu încă ce simt." })).toBeVisible()
})

test("decizia din sesiunea 7 respectă întrebările și răspunsul fără presiune", async ({ page }) => {
  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l7`)
  await accelerateLesson(page)
  await page.getByRole("button", { name: "Sunt aici și pot continua." }).click()

  const needsClarity = page.getByRole("button", { name: "Vreau, dar încă nu înțeleg." })
  await expect(needsClarity).toBeVisible()
  await needsClarity.click()

  await expect(page).toHaveURL(/#\/intreaba\?despre=.*intoarcere=/u)
  await expect(page.getByRole("heading", { name: "Întreabă" })).toBeVisible()
  await expect(page.getByText("Întrebi despre:")).toContainText("Ce înseamnă să-L urmez pe Iisus?")
  await page.getByRole("button", { name: /Curs/u }).click()
  await expect(page).toHaveURL(/#\/program\/course%3Alib_fundamentul$/u)
  await expect(page.locator(".program-session--current")).toContainText("Sesiunea 8")

  await page.evaluate(() => window.localStorage.removeItem("emanus_learning_progress_v1"))

  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l7`)
  await accelerateLesson(page)
  await page.getByRole("button", { name: "Sunt aici și pot continua." }).click()
  const notYet = page.getByRole("button", { name: "Nu sunt pregătit acum." })
  await expect(notYet).toBeVisible()
  await notYet.click()
  await expect(page).toHaveURL(/#\/program\/course%3Alib_fundamentul$/u)

  const progress = await readFundamentulProgress(page)
  expect(progress.completedLessonIds).toContain("fund_l7")
  await expect(page.locator(".program-session--current")).toContainText("Sesiunea 8")
})

test("răspunsul da din sesiunea 7 rămâne corect după ieșire și reluare", async ({ page }) => {
  await seedFundamentulProgress(page, FUNDAMENTUL_LESSON_IDS.filter((id) => id !== "fund_l7"))
  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l7`)
  await accelerateLesson(page)
  await page.getByRole("button", { name: "Sunt aici și pot continua." }).click()
  await page.getByRole("button", { name: "Vreau să-I spun da lui Iisus acum." }).click()

  await page.waitForFunction((programId) => {
    const store = JSON.parse(window.localStorage.getItem("emanus_learning_progress_v1") ?? "{}")
    return store.programs?.[programId]?.drafts?.fund_l7?.choices?.fl7_choice === "fl7c_1"
  }, FUNDAMENTUL_PROGRAM_ID)

  await page.reload()
  await accelerateLesson(page)
  await finishVisibleLesson(page)

  await expect(page.getByRole("heading", { name: "Nu mai mergi ca un orfan" })).toBeVisible()
  const progress = await readFundamentulProgress(page)
  expect(progress.completedLessonIds).toHaveLength(FUNDAMENTUL_LESSON_IDS.length)
  expect(new Set(progress.completedLessonIds)).toEqual(new Set(FUNDAMENTUL_LESSON_IDS))
})

test("după o sesiune aleasă liber cursul propune următoarea din ordine", async ({ page }) => {
  await seedFundamentulProgress(page, ["fund_l4"])
  await page.goto(FUNDAMENTUL_PROGRAM_URL)

  await expect(page.getByRole("button", { name: /Continuă cu sesiunea 5/u })).toBeVisible()
  await expect(page.locator(".program-session--current")).toContainText("Sesiunea 5")

  await page.goto("/#/biblioteca")
  await expect(page.locator(".library-active")).toContainText("Continuă sesiunea 5")
  await expect(page.locator(".library-active")).toContainText("Urmează: Dumnezeu nu este împotriva ta")
})

test("o lecție începută revine la același pas după refresh", async ({ page }) => {
  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l1`)
  await page.getByRole("button", { name: "Îmi este greu, dar vreau să ascult." }).click()

  await expect(page.getByText("Poți avea un program plin și totuși să te întrebi dacă prezența ta schimbă ceva.", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Pauză" }).click()
  await expect(page.getByText("Pas 2/13", { exact: true })).toBeVisible()

  const beforeRefresh = await readFundamentulProgress(page)
  expect(beforeRefresh.lastLessonId).toBe("fund_l1")
  expect(beforeRefresh.drafts.fund_l1.mainStepId).toBe("fl1_hook")
  expect(beforeRefresh.drafts.fund_l1.checkIns.fl1_check).toBe("fl1ci_b")

  await page.reload()
  await expect(page.getByText("Pas 2/13", { exact: true })).toBeVisible()
  await expect(page.getByText("Poți avea un program plin și totuși să te întrebi dacă prezența ta schimbă ceva.", { exact: true })).toBeVisible()
})

test("un răspuns deja salvat nu blochează reluarea pe ecranul alegerii", async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:lib_bani": {
          completedLessonIds: [],
          lastLessonId: "bani_l1",
          journals: {},
          updatedAt: "2026-08-17T10:00:00.000Z",
          drafts: {
            bani_l1: {
              mainStepId: "banil1_c",
              mainStepIndex: 1,
              revealedStepIds: ["banil1_h", "banil1_c"],
              choices: { banil1_c: "banil1c1" },
              quizAnswers: {},
              checkIns: {},
              journal: "",
            },
          },
        },
      },
    }))
  })

  await page.goto("/#/program/course%3Alib_bani/lesson/bani_l1")
  await expect(page.getByRole("progressbar", { name: "Progresul sesiunii" })).toHaveAttribute("aria-valuenow", "3")
  await expect(page.getByText("Nu puteți sluji lui Dumnezeu și lui Mamona.", { exact: true })).toBeVisible()
})

test("o opțiune editorială veche din draft poate fi aleasă din nou", async ({ page }) => {
  await seedFundamentulProgress(page, [], {
    lastLessonId: "fund_l1",
    drafts: {
      fund_l1: {
        mainStepId: "fl1_choice",
        mainStepIndex: 2,
        revealedStepIds: ["fl1_check", "fl1_hook", "fl1_choice"],
        choices: { fl1_choice: "optiune_editoriala_veche" },
        quizAnswers: {},
        checkIns: { fl1_check: "fl1ci_a" },
        journal: "",
      },
    },
  })

  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l1`)
  await page.getByRole("button", { name: "Simt că sunt de prisos." }).click()
  await expect(page.getByRole("progressbar", { name: "Progresul sesiunii" })).toHaveAttribute("aria-valuenow", "4")
})

test("un pas editorial eliminat resetează draftul la începutul lecției", async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:lib_bani": {
          completedLessonIds: [],
          lastLessonId: "bani_l1",
          journals: {},
          updatedAt: "2026-08-17T10:00:00.000Z",
          drafts: {
            bani_l1: {
              mainStepId: "pas_editorial_eliminat",
              mainStepIndex: 9,
              revealedStepIds: ["pas_editorial_eliminat"],
              choices: {},
              quizAnswers: {},
              checkIns: {},
              journal: "",
            },
          },
        },
      },
    }))
  })

  await page.goto("/#/program/course%3Alib_bani/lesson/bani_l1")
  await expect(page.getByRole("progressbar", { name: "Progresul sesiunii" })).toHaveAttribute("aria-valuenow", "1")
  await expect(page.getByRole("button", { name: "Încheie sesiunea" })).toHaveCount(0)
})

test("un draft stale nu sare peste prima sesiune incompletă a unui curs secvențial", async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:lib_bani": {
          completedLessonIds: ["bani_l1"],
          lastLessonId: "bani_l3",
          journals: {},
          updatedAt: "2026-08-17T10:00:00.000Z",
          drafts: {
            bani_l3: {
              mainStepId: "banil3_h",
              mainStepIndex: 0,
              revealedStepIds: ["banil3_h"],
              choices: {},
              quizAnswers: {},
              checkIns: {},
              journal: "",
            },
          },
        },
      },
    }))
  })

  await page.goto("/#/program/course%3Alib_bani")
  await expect(page.getByRole("button", { name: /Continuă cu sesiunea 2/u })).toBeVisible()
  await expect(page.locator(".program-session--current")).toContainText("Sesiunea 2")
  await expect(page.locator(".program-session-list li").nth(2).getByRole("button")).toBeDisabled()
})

test("playerul expune progresul și starea butonului de pauză", async ({ page }) => {
  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l1`)

  const progress = page.getByRole("progressbar", { name: "Progresul sesiunii" })
  await expect(progress).toHaveAttribute("aria-valuemin", "1")
  await expect(progress).toHaveAttribute("aria-valuemax", "13")
  await expect(progress).toHaveAttribute("aria-valuenow", "1")

  const pause = page.getByRole("button", { name: "Pauză" })
  await expect(pause).toHaveAttribute("aria-pressed", "false")
  await pause.click()
  await expect(page.getByRole("button", { name: "Continuă conversația" })).toHaveAttribute("aria-pressed", "true")
})

test("focusul ajunge la următoarea interacțiune după pașii automați", async ({ page }) => {
  await page.goto("/#/program/course%3Alib_bani/lesson/bani_l1")
  await accelerateLesson(page)
  await page.getByRole("button", { name: "Siguranță." }).click()

  await expect(page.getByText("Care este direcția biblică a acestei lecții?", { exact: true })).toBeVisible()
  await expect(page.locator(".lesson-turn").last()).toBeFocused()
})

test("versetul de memorat așteaptă confirmarea înainte de final", async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:lib_bani": {
          completedLessonIds: [],
          lastLessonId: "bani_l1",
          journals: {},
          updatedAt: "2026-08-17T10:00:00.000Z",
          drafts: {
            bani_l1: {
              mainStepId: "banil1_m",
              mainStepIndex: 9,
              revealedStepIds: ["banil1_m"],
              choices: {},
              quizAnswers: {},
              checkIns: {},
              journal: "",
            },
          },
        },
      },
    }))
  })
  await page.goto("/#/program/course%3Alib_bani/lesson/bani_l1")

  const finish = page.getByRole("button", { name: "Încheie sesiunea" })
  await expect(finish).toBeVisible()
  await page.waitForTimeout(2_600)
  await expect(page.locator(".player--done")).toHaveCount(0)
  await finish.click()
  await expect(page.getByRole("heading", { name: "Ai încheiat sesiunea 1" })).toBeVisible()
})

test("cursul de siguranță oferă ieșire imediată spre ajutor", async ({ page }) => {
  await page.goto("/#/program/course%3Acomun_c5_siguranta/lesson/siguranta_l1")

  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await expect(page.getByRole("heading", { name: "Numește abuzul fără eufemisme" })).toBeVisible()
  const help = page.getByRole("button", { name: "Ajutor acum" })
  await expect(help).toBeVisible()
  await help.click()
  await expect(page).toHaveURL(/#\/criza$/u)
  await expect(page.getByRole("heading").first()).toBeVisible()

  await page.goto("/#/program/course%3Acomun_c5_siguranta/lesson/siguranta_l6")
  await expect(page.getByText("Sesiune blocată", { exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: "Ajutor acum" })).toBeVisible()

  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:comun_c5_siguranta": {
          completedLessonIds: ["siguranta_l1", "siguranta_l2", "siguranta_l3", "siguranta_l4", "siguranta_l5"],
          lastLessonId: "siguranta_l5",
          journals: {},
          updatedAt: "2026-08-17T10:00:00.000Z",
        },
      },
    }))
  })
  await page.reload()
  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await expect(page.getByRole("heading", { name: "Pocăința agresorului are rod" })).toBeVisible()
  await accelerateLesson(page)
  await finishVisibleLesson(page)
  await expect(page.getByRole("heading", { name: "Ai parcurs toate sesiunile" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Ajutor acum" })).toBeVisible()
})

test("finalizarea unui pas ghidat conduce la timpul de aplicare", async ({ page }) => {
  await page.goto("/#/program/path%3Apath_acasa")
  await accelerateLesson(page)
  await page.locator(".program-session--current button").click()
  await finishVisibleLesson(page)

  await expect(page.getByRole("heading", { name: "Ai încheiat sesiunea 1" })).toBeVisible()
  await expect(page.getByText("De pus în practică", { exact: true })).toBeVisible()
  const completedState = await page.evaluate(() => ({
    journey: JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"),
    learning: window.localStorage.getItem("emanus_learning_progress_v1"),
  }))
  expect(completedState.journey.lessonsDone).toBe(1)
  expect(completedState.learning).toBeNull()

  await page.getByRole("button", { name: /Vezi practica de azi/u }).click()
  await expect(page.getByRole("heading", { name: "Ai fost azi aici" })).toBeVisible()
  await page.goto("/#/program/path%3Apath_acasa")
  await expect(page.locator(".program-practice")).toBeVisible()
  await expect(page.locator(".program-session--waiting-for-practice")).toHaveCount(1)
})

test("finalizarea unei sesiuni de curs oferă imediat sesiunea următoare", async ({ page }) => {
  await page.goto("/#/program/course%3Alib_fundamentul")
  await accelerateLesson(page)
  await page.locator(".program-session--current button").click()
  await finishVisibleLesson(page)

  await expect(page.getByRole("heading", { name: "Ai încheiat sesiunea 1" })).toBeVisible()
  await expect(page.getByText("Urmează: Sesiunea 2", { exact: true })).toBeVisible()
  const stateAfterCourse = await page.evaluate(() => ({
    journey: JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"),
    learning: JSON.parse(window.localStorage.getItem("emanus_learning_progress_v1") ?? "{}"),
  }))
  expect(stateAfterCourse.journey.lessonsDone).toBe(0)
  expect(stateAfterCourse.learning.programs["course:lib_fundamentul"].completedLessonIds).toEqual(["fund_l1"])

  await page.getByRole("button", { name: /Continuă la sesiunea 2/u }).click()
  await expect(page.getByRole("heading", { name: "Ce s-a rupt, de fapt" })).toBeVisible()
  await page.reload()
  await expect(page.getByText("Sesiunea 2 din 8", { exact: true })).toBeVisible()
})

test("cursul poate avansa în fila curentă când persistența locală este refuzată", async ({ page }) => {
  await page.goto("/#/program/course%3Alib_bani/lesson/bani_l1")
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Spațiul local este indisponibil", "QuotaExceededError")
    }
  })
  await accelerateLesson(page)
  await finishVisibleLesson(page)

  await expect(page.getByText("Urmează: Sesiunea 2", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: /Continuă la sesiunea 2/u }).click()
  await expect(page.getByRole("heading", { name: "Bugetul spune adevărul" })).toBeVisible()
  await expect(page.getByText("Sesiunea 2 din 5", { exact: true })).toBeVisible()
})

test("finalul Fundamentului persistă, se poate distribui și apare în Bibliotecă", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window.navigator, "share", {
      configurable: true,
      value: async (data: ShareData) => {
        window.localStorage.setItem("emanus_test_share", JSON.stringify(data))
      },
    })
  })
  await seedFundamentulProgress(page, FUNDAMENTUL_LESSON_IDS.slice(0, 7))
  await page.evaluate(() => {
    Object.defineProperty(window.navigator, "share", {
      configurable: true,
      value: async (data: ShareData) => {
        window.localStorage.setItem("emanus_test_share", JSON.stringify(data))
      },
    })
  })
  await page.goto(`${FUNDAMENTUL_PROGRAM_URL}/lesson/fund_l8`)
  await accelerateLesson(page)
  await finishVisibleLesson(page)

  await expect(page.getByRole("heading", { name: "Ai parcurs toate sesiunile" })).toBeVisible()
  let progress = await readFundamentulProgress(page)
  expect(progress.completedLessonIds).toEqual(FUNDAMENTUL_LESSON_IDS)
  expect(progress.drafts?.fund_l8).toBeUndefined()

  await page.getByRole("button", { name: /Vezi încheierea cursului/u }).click()
  await expect(page.getByText("8 din 8 sesiuni", { exact: true })).toBeVisible()
  await expect(page.getByRole("progressbar", { name: "Progresul programului" })).toHaveAttribute("aria-valuenow", "8")
  await expect(page.getByRole("heading", { name: "De aici începe drumul, nu performanța" })).toBeVisible()
  await expect(page.getByText("Vorbește cu Dumnezeu zilnic, în cuvintele tale.", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Dă-l mai departe" }).click()
  await expect(page.getByText("Cursul este gata de trimis.", { exact: true })).toBeVisible()

  const sharePayload = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_test_share") ?? "{}"))
  expect(sharePayload.title).toBe("Fundamentul")
  expect(sharePayload.text).toContain("opt conversații scurte")
  expect(sharePayload.url).toMatch(/#\/program\/course%3Alib_fundamentul$/u)

  await page.reload()
  await expect(page.getByText("8 din 8 sesiuni", { exact: true })).toBeVisible()
  await expect(page.locator(".program-session--completed")).toHaveCount(8)
  progress = await readFundamentulProgress(page)
  expect(progress.completedLessonIds).toEqual(FUNDAMENTUL_LESSON_IDS)

  await page.getByRole("button", { name: "Înapoi la Bibliotecă" }).click()
  const completedCard = page.locator(".library-active")
  await expect(completedCard).toContainText("Curs parcurs")
  await expect(completedCard).toContainText("Fundamentul")
  await completedCard.getByRole("button", { name: /Vezi încheierea/u }).click()
  await expect(page).toHaveURL(/#\/program\/course%3Alib_fundamentul\?incheiere=1$/u)
  await expect(page.getByRole("heading", { name: "De aici începe drumul, nu performanța" })).toBeVisible()
})

test("orice curs terminat are o încheiere generică funcțională", async ({ page }) => {
  const programId = "course:lib_bani"
  await page.evaluate((id) => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        [id]: {
          completedLessonIds: ["bani_l1", "bani_l2", "bani_l3", "bani_l4", "bani_l5"],
          lastLessonId: "bani_l5",
          journals: {},
          updatedAt: "2026-08-17T10:00:00.000Z",
        },
      },
    }))
  }, programId)

  await page.goto("/#/program/course%3Alib_bani?incheiere=1")
  const heading = page.getByRole("heading", { name: "Ai ajuns la capătul cursului „Bani și datorii”" })
  await expect(heading).toBeVisible()
  await expect(heading).toBeFocused()
  const completionTop = await page.locator(".program-completion").evaluate((element) => element.getBoundingClientRect().top)
  expect(completionTop).toBeGreaterThanOrEqual(0)
  const shareButton = page.getByRole("button", { name: "Dă-l mai departe" })
  await expect(shareButton).toBeVisible()
  await page.evaluate(() => {
    Object.defineProperty(window.navigator, "share", { configurable: true, value: async () => undefined })
  })
  await shareButton.click()
  await expect(page.getByText("Cursul este gata de trimis.", { exact: true })).toBeVisible()
  await expect(shareButton).toBeFocused()
  await expect(page.getByRole("button", { name: "Recitește prima sesiune" })).toBeVisible()
})

test("progresul local malformat este ignorat fără să blocheze cursul", async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", "{nu este json")
  })
  await page.goto(FUNDAMENTUL_PROGRAM_URL)
  await expect(page.getByText("0 din 8 sesiuni", { exact: true })).toBeVisible()
  await expect(page.locator(".program-session-list .program-session__card:disabled")).toHaveCount(0)

  await page.evaluate((programId) => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        [programId]: {
          completedLessonIds: [null, false, "", "lecție-inexistentă", {}],
          lastLessonId: 42,
          journals: [],
          updatedAt: {},
          drafts: {
            fund_l1: { mainStepId: null, mainStepIndex: "doi" },
          },
        },
      },
    }))
  }, FUNDAMENTUL_PROGRAM_ID)
  await page.reload()

  await expect(page.getByRole("heading", { name: "Fundamentul" })).toBeVisible()
  await expect(page.getByText("0 din 8 sesiuni", { exact: true })).toBeVisible()
  await expect(page.locator(".program-session--completed")).toHaveCount(0)
  await expect(page.locator(".program-session-list .program-session__card:disabled")).toHaveCount(0)
})

test("deep link-ul vechi găsește programul lecției", async ({ page }) => {
  await page.goto("/#/lesson/fund_l1")

  await expect(page.getByRole("heading", { name: "Nu ești o întâmplare" })).toBeVisible()
  await expect(page.getByRole("button", { name: /Program/u })).toBeVisible()
  await expect(page.getByText("Sesiunea 1 din 8", { exact: true })).toBeVisible()
})

test("recitirea unei sesiuni de traseu nu mută progresul sau data", async ({ page }) => {
  await page.evaluate(() => {
    const stored = JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}")
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify({ ...stored, lessonsDone: 1, lastLessonDate: "2026-08-10" }))
  })
  await page.goto("/#/program/path%3Apath_acasa")

  await expect(page.locator(".program-session--completed")).toHaveCount(1)
  await expect(page.locator(".program-session--completed button")).toBeEnabled()
  await expect(page.locator(".program-session--locked button").first()).toBeDisabled()
  await accelerateLesson(page)
  await page.locator(".program-session--completed button").click()
  await finishVisibleLesson(page)
  await expect(page.getByRole("heading", { name: "Ai recitit sesiunea 1" })).toBeVisible()

  const state = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"))
  expect(state.lessonsDone).toBe(1)
  expect(state.lastLessonDate).toBe("2026-08-10")
})

test("overview-ul nu produce overflow pe mobil și rămâne centrat pe desktop", async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 430, height: 932 }, { width: 1280, height: 900 }]) {
    await page.setViewportSize(viewport)
    await page.goto("/#/program/path%3Apath_acasa")
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      overviewWidth: document.querySelector(".program-overview")?.getBoundingClientRect().width ?? 0,
    }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
    expect(dimensions.overviewWidth).toBeLessThanOrEqual(Math.min(viewport.width, 760))
  }
})

test("playerul folosește un singur viewport exterior pe mobil și desktop", async ({ page }) => {
  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout.bind(window)
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) =>
      nativeSetTimeout(handler, Math.min(timeout ?? 0, 25), ...args)) as typeof window.setTimeout
  })
  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 900 }]) {
    await page.setViewportSize(viewport)
    await page.evaluate(() => window.localStorage.removeItem("emanus_learning_progress_v1"))
    await page.reload()
    await page.goto("/#/program/course%3Acomun_c5_siguranta/lesson/siguranta_l1")
    await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
    await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
    await expect(page.getByRole("heading", { name: "Numește abuzul fără eufemisme" })).toBeVisible()
    const dimensions = await page.evaluate(() => {
      const player = document.querySelector(".player")?.getBoundingClientRect()
      const nav = document.querySelector(".lesson-shell__nav")?.getBoundingClientRect()
      return {
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        playerBottom: player?.bottom ?? Number.POSITIVE_INFINITY,
        playerWidth: player?.width ?? 0,
        navWidth: nav?.width ?? 0,
      }
    })
    expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.clientHeight)
    expect(dimensions.playerBottom).toBeLessThanOrEqual(viewport.height)
    expect(Math.abs(dimensions.playerWidth - dimensions.navWidth)).toBeLessThanOrEqual(1)

    await page.getByRole("button", { name: "Să numesc adevărul." }).click()
    await expect(page.getByRole("progressbar", { name: "Progresul sesiunii" })).toHaveAttribute("aria-valuenow", "4")
    const grownTranscript = await page.evaluate(() => {
      const nav = document.querySelector(".lesson-shell__nav")?.getBoundingClientRect()
      const position = document.querySelector(".lesson-shell__position")?.getBoundingClientRect()
      const player = document.querySelector(".player")?.getBoundingClientRect()
      return {
        navBottom: nav?.bottom ?? Number.POSITIVE_INFINITY,
        positionBottom: position?.bottom ?? Number.POSITIVE_INFINITY,
        playerTop: player?.top ?? 0,
        playerBottom: player?.bottom ?? Number.POSITIVE_INFINITY,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
      }
    })
    expect(grownTranscript.navBottom).toBeLessThanOrEqual(grownTranscript.playerTop)
    expect(grownTranscript.positionBottom).toBeLessThanOrEqual(grownTranscript.playerTop)
    expect(grownTranscript.playerBottom).toBeLessThanOrEqual(viewport.height)
    expect(grownTranscript.scrollHeight).toBeLessThanOrEqual(grownTranscript.clientHeight)
  }
})

test("Biblioteca rămâne lizibilă pe mobil și folosește spațiul desktop", async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1280, height: 900 }]) {
    await page.setViewportSize(viewport)
    await page.goto("/#/biblioteca")
    await expect(page.getByRole("heading", { name: "Biblioteca" })).toBeVisible()
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      libraryWidth: document.querySelector(".library")?.getBoundingClientRect().width ?? 0,
    }))
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
    expect(dimensions.libraryWidth).toBeLessThanOrEqual(viewport.width)
    if (viewport.width >= 900) expect(dimensions.libraryWidth).toBeGreaterThan(800)
  }
})
