import { expect, test, type Page } from "@playwright/test"
import { quizOptionRotation } from "@emanus/shared"
import { getPathForDoor } from "@emanus/shared/paths"

const BASE_JOURNEY = {
  schemaVersion: 2,
  seenWelcome: true,
  pathId: "path_acasa",
  doorId: null,
  lessonsDone: 0,
  completedLessonIds: [],
  doctrineDone: 0,
  completedDoctrineLessonIds: [],
  lastLessonDate: null,
  prayerInviteSeen: false,
  journal: [],
  prayers: [],
  pathCompletedSeen: false,
  emmausMaxStation: 1,
  emmausStationSeenAt: {},
  crossVisitedAt: null,
}

const REMOVED_ROLE_COPY = [
  "Duhul Sfânt formează caracterul lui Hristos prin adevăr, practică și comunitate.",
  "Nicio idee despre roluri nu justifică abuzul, controlul, rușinarea sau reducerea persoanei la utilitatea ei.",
] as const

const REMOVED_FOCUS_COPY = [
  "Nu trebuie să urmărești un singur rezultat. Alege ce vrei să observi pe parcursul cursului.",
  "Ce vrei să urmărești? Poți alege mai multe.",
] as const

const GENERIC_CHOICE_FEEDBACK = "Răspunsul acesta este un punct de plecare"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
  await page.evaluate((journey) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify(journey))
    window.localStorage.removeItem("emanus_learning_progress_v1")
  }, BASE_JOURNEY)
})

async function seedCourseDraft(
  page: Page,
  courseId: string,
  lessonId: string,
  mainStepId: string,
  completedLessonIds: string[] = [],
) {
  await page.evaluate(({ programId, lesson, step, completed }) => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        [programId]: {
          completedLessonIds: completed,
          lastLessonId: lesson,
          journals: {},
          updatedAt: "2026-08-21T06:00:00.000Z",
          drafts: {
            [lesson]: {
              mainStepId: step,
              mainStepIndex: 0,
              revealedStepIds: [step],
              choices: {},
              multiChoices: {},
              textResponses: {},
              quizAnswers: {},
              checkIns: {},
              journal: "",
            },
          },
        },
      },
    }))
  }, {
    programId: `course:${courseId}`,
    lesson: lessonId,
    step: mainStepId,
    completed: completedLessonIds,
  })
}

async function accelerateLesson(page: Page) {
  await page.evaluate(() => {
    const nativeSetTimeout = window.setTimeout.bind(window)
    window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) =>
      nativeSetTimeout(handler, Math.min(timeout ?? 0, 25), ...args)) as typeof window.setTimeout
  })
}

async function expectRemovedRoleCopyToStayAbsent(page: Page) {
  for (const copy of REMOVED_ROLE_COPY) {
    await expect(page.getByText(copy, { exact: true })).toHaveCount(0)
  }
}

async function finishLessonWithoutGeneratedCopy(page: Page) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    for (const copy of REMOVED_FOCUS_COPY) {
      await expect(page.getByText(copy, { exact: true })).toHaveCount(0)
    }
    await expect(page.getByText(GENERIC_CHOICE_FEEDBACK, { exact: false })).toHaveCount(0)

    if (await page.locator(".player--done").count()) return

    const textarea = page.locator(".chat textarea:visible").first()
    if (await textarea.count()) await textarea.fill("Păstrez adevărul acestei lecții.")

    const action = page.locator(".chat button:visible:not(:disabled)").first()
    if (await action.count()) await action.click()
    else await page.waitForTimeout(35)
  }

  throw new Error("Lecția nu s-a încheiat în limita de pași a regresiei")
}

test("primele două lecții de identitate au quizuri contextuale și nu repetă blocul generic despre roluri", async ({ page }) => {
  await seedCourseDraft(
    page,
    "identitate_c1_chip",
    "identitate_vocatie_l1",
    "identitatevocatiel1q",
  )
  await page.goto("/#/program/course%3Aidentitate_c1_chip/lesson/identitate_vocatie_l1")

  const firstQuestion = "Pe ce se întemeiază demnitatea fiecărui om?"
  await expect(page.getByText(firstQuestion, { exact: true })).toBeVisible()
  await accelerateLesson(page)
  await page.getByRole("button", { name: "Pe faptul că bărbatul și femeia sunt creați după chipul lui Dumnezeu.", exact: true }).click()
  await expect(page.getByRole("button", { name: "Am făcut pasul" })).toBeVisible()
  await expectRemovedRoleCopyToStayAbsent(page)

  await page.goto("/")
  await seedCourseDraft(
    page,
    "identitate_c1_chip",
    "identitate_vocatie_l2",
    "identitatevocatiel2q",
    ["identitate_vocatie_l1"],
  )
  await page.goto("/#/program/course%3Aidentitate_c1_chip/lesson/identitate_vocatie_l2")

  const secondQuestion = "Ce identitate vine înaintea rolurilor și stereotipurilor?"
  await expect(page.getByText(secondQuestion, { exact: true })).toBeVisible()
  await expect(page.getByText(firstQuestion, { exact: true })).toHaveCount(0)
  await accelerateLesson(page)
  await page.getByRole("button", { name: "Identitatea de ucenic care Îl urmează pe Hristos.", exact: true }).click()
  await expect(page.getByRole("button", { name: "Am făcut pasul" })).toBeVisible()
  await expectRemovedRoleCopyToStayAbsent(page)
})

test("o alegere fără feedback editorial nu inventează feedback și lecția nu mai introduce focusul generic", async ({ page }) => {
  await seedCourseDraft(
    page,
    "identitate_c1_chip",
    "identitate_vocatie_l1",
    "identitatevocatiel1c",
  )
  await page.goto("/#/program/course%3Aidentitate_c1_chip/lesson/identitate_vocatie_l1")
  await accelerateLesson(page)

  await page.getByRole("button", { name: "Din relație.", exact: true }).click()
  await expect(page.getByText(GENERIC_CHOICE_FEEDBACK, { exact: false })).toHaveCount(0)
  await finishLessonWithoutGeneratedCopy(page)
})

test("răspunsul corect nu rămâne pe aceeași poziție în quizurile succesive", async ({ page }) => {
  await seedCourseDraft(page, "identitate_c1_chip", "identitate_vocatie_l1", "identitatevocatiel1q")
  await page.goto("/#/program/course%3Aidentitate_c1_chip/lesson/identitate_vocatie_l1")
  const firstCorrect = page.getByRole("button", { name: "Pe faptul că bărbatul și femeia sunt creați după chipul lui Dumnezeu.", exact: true })
  const firstPosition = await firstCorrect.evaluate((button) => Array.from(button.parentElement?.children ?? []).indexOf(button))

  await page.goto("/")
  await seedCourseDraft(page, "identitate_c1_chip", "identitate_vocatie_l2", "identitatevocatiel2q", ["identitate_vocatie_l1"])
  await page.goto("/#/program/course%3Aidentitate_c1_chip/lesson/identitate_vocatie_l2")
  const secondCorrect = page.getByRole("button", { name: "Identitatea de ucenic care Îl urmează pe Hristos.", exact: true })
  const secondPosition = await secondCorrect.evaluate((button) => Array.from(button.parentElement?.children ?? []).indexOf(button))

  expect(firstPosition).not.toBe(secondPosition)
})

test("rotația rămâne distinctă în Uși compuse chiar când se schimbă numărul opțiunilor", () => {
  for (const doorId of ["familie_respinge", "respins_biserica"]) {
    const path = getPathForDoor(doorId)
    expect(path).toBeDefined()
    let sequenceIndex = 0
    let previousCorrectPosition = -1

    for (const lesson of path?.lessons ?? []) {
      for (const step of [...lesson.steps].sort((left, right) => left.order - right.order)) {
        if (!step.quiz) continue
        const correctOptionIndex = step.quiz.options.findIndex((option) => option.correct)
        const rotation = quizOptionRotation(
          `door:${doorId}`,
          sequenceIndex,
          correctOptionIndex,
          step.quiz.options.length,
          previousCorrectPosition,
        )
        const currentCorrectPosition = (
          correctOptionIndex - rotation + step.quiz.options.length
        ) % step.quiz.options.length
        expect(currentCorrectPosition).not.toBe(previousCorrectPosition)
        previousCorrectPosition = currentCorrectPosition
        sequenceIndex += 1
      }
    }
  }
})

test("lecțiile pentru copii păstrează alegerea fără feedback generic inventat", async ({ page }) => {
  await seedCourseDraft(page, "lib_micii_facut", "micii_facut_l1", "miciifacutl1c")
  await page.goto("/#/program/course%3Alib_micii_facut/lesson/micii_facut_l1")
  await accelerateLesson(page)

  await page.getByRole("button", { name: "Animalele.", exact: true }).click()
  await expect(page.getByText(/Ai ales:/u)).toHaveCount(0)
  await expect(page.getByText("Mulțumesc. Mergem mai departe de aici, fără note și fără să te facem de rușine pentru răspuns.", { exact: true })).toHaveCount(0)
})

test("reflecția generată pornește din pasul real al lecției, nu dintr-un șablon generic", async ({ page }) => {
  await seedCourseDraft(page, "doctrine_c2_har", "har_d_l1", "har_d_l1__reflection")
  await page.goto("/#/program/course%3Adoctrine_c2_har/lesson/har_d_l1")

  await expect(page.getByText(
    "Lecția propune „Un lucru azi, nu zece: citește Ioan 3, primele opt versete. Doar…”. Cum ar arăta asta concret pentru tine?",
    { exact: true },
  )).toBeVisible()
  await expect(page.getByText(/ce adevăr din lecția .* atinge situația ta/iu)).toHaveCount(0)
})

test("lecția copilului despre autovătămare deschide mai întâi ecranul de siguranță", async ({ page }) => {
  await seedCourseDraft(
    page,
    "lib_copii_emotii",
    "copii_emotii_l3",
    "copiiemotiil3h",
    ["copii_emotii_l1", "copii_emotii_l2"],
  )
  await page.goto("/#/program/course%3Alib_copii_emotii/lesson/copii_emotii_l3")

  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await expect(page.getByText(/spune imediat unui adult sigur/iu)).toBeVisible()
  await expect(page.getByRole("button", { name: "Am nevoie de ajutor acum" })).toBeVisible()
})

test("lecțiile de siguranță nu generează un al doilea răspuns liber cu detalii sensibile", async ({ page }) => {
  await seedCourseDraft(
    page,
    "femei_c4_sotie",
    "sotie_legamant_l7",
    "sotielegamantl7j",
    [
      "sotie_legamant_l1",
      "sotie_legamant_l2",
      "sotie_legamant_l3",
      "sotie_legamant_l4",
      "sotie_legamant_l5",
      "sotie_legamant_l6",
    ],
  )
  await page.goto("/#/program/course%3Afemei_c4_sotie/lesson/sotie_legamant_l7")
  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await accelerateLesson(page)

  await expect(page.getByText(/Nu nota aici planul, locul, dovezile sau nume/u)).toBeVisible()
  await page.getByRole("button", { name: "Sar peste" }).click()

  await expect(page.getByRole("button", { name: "Încheie sesiunea" })).toBeVisible()
  await expect(page.locator("label[for$='__closing_declaration']")).toHaveCount(0)
})

test("Libertate separă adevărul de pasul practic și nu repetă acțiunea", async ({ page }) => {
  const hook = "Când frica pune în centru puterea răului, primul pas nu este o formulă de confruntare, ci întoarcerea privirii spre Iisus."
  const truth = "Libertatea nu începe cu demonul, ci cu Iisus și cu apartenența ta. Frica întreabă cine te revendică; Evanghelia răspunde cine te-a răscumpărat."
  const action = "Scrie adevărul despre cine este Iisus și cui Îi aparții. Nu începe confruntarea până când centrul nu este Hristos."

  await seedCourseDraft(
    page,
    "spiritual_c4_libertate",
    "spirit_libertate_l1",
    "spirit_libertate_l1_4",
  )
  await page.goto("/#/program/course%3Aspiritual_c4_libertate/lesson/spirit_libertate_l1")

  await expect(page.getByText(hook, { exact: true })).toHaveCount(1)
  await expect(page.getByText(truth, { exact: true })).toHaveCount(1)
  await expect(page.getByText(action, { exact: true })).toHaveCount(0)
  expect(new Set([hook, truth, action]).size).toBe(3)

  await page.getByRole("button", { name: "Să cer unui credincios matur să mă sprijine.", exact: true }).click()
  await expect(page.getByRole("button", { name: "Am făcut pasul" })).toBeVisible()
  await expect(page.getByText(hook, { exact: true })).toHaveCount(1)
  await expect(page.getByText(truth, { exact: true })).toHaveCount(1)
  await expect(page.getByText(action, { exact: true })).toHaveCount(1)
})

test("ușa dependenței afișează cele opt sesiuni reale în descriere și în listă", async ({ page }) => {
  await page.evaluate((journey) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify({
      ...journey,
      pathId: "path_schimbare",
      doorId: "dependenta",
    }))
  }, BASE_JOURNEY)
  await page.goto("/#/program/door%3Adependenta")

  await expect(page.getByRole("heading", { name: "Când nu te poți schimba" })).toBeVisible()
  await expect(page.locator(".program-intro__promise")).toContainText("8 sesiuni, una la două zile.")
  await expect(page.locator(".program-intro__promise")).not.toContainText("Șapte lecții")
  await expect(page.locator(".program-meta")).toContainText("8 sesiuni")
  await expect(page.locator(".program-session-list .program-session__card")).toHaveCount(8)
  await expect(page.locator(".program-session__number").last()).toHaveText("Sesiunea 8")
})

test("ușa dependenței arată cele opt sesiuni înainte de pornire și în ecranul Azi", async ({ page }) => {
  await page.goto("/#/intrare")
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()
  await page.getByRole("button", { name: "Nu mă pot lăsa de un lucru", exact: true }).click()

  const doorPromise = page.locator(".confirm__card .confirm__promise")
  await expect(doorPromise).toContainText("8 sesiuni, una la două zile.")
  await expect(doorPromise).not.toContainText(/șapte lecții/iu)
  await expect(page.locator(".confirm__meta")).toContainText("8 sesiuni")

  await page.evaluate((journey) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify({
      ...journey,
      pathId: "path_schimbare",
      doorId: "dependenta",
    }))
  }, BASE_JOURNEY)
  await page.goto("/")

  const todayPromise = page.locator(".today__promise")
  await expect(todayPromise).toContainText("8 sesiuni, una la două zile.")
  await expect(todayPromise).not.toContainText(/șapte lecții/iu)
})

test("variantele lungi ale Ușilor nu păstrează promisiunea contradictorie de șapte lecții", async ({ page }) => {
  await page.evaluate((journey) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify({
      ...journey,
      pathId: "path_impreuna",
      doorId: "familie_respinge",
    }))
  }, BASE_JOURNEY)
  await page.goto("/#/program/door%3Afamilie_respinge")

  await expect(page.locator(".program-intro__promise")).toContainText("9 sesiuni")
  await expect(page.locator(".program-intro__promise")).not.toContainText(/șapte lecții/iu)
  await expect(page.locator(".program-intro__promise")).not.toContainText("fabricăm oameni")
  await expect(page.locator(".program-session-list .program-session__card")).toHaveCount(9)
})
