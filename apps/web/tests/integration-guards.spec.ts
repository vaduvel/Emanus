import { expect, test } from "@playwright/test"

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

async function seedJourney(
  page: import("@playwright/test").Page,
  state: Record<string, unknown>,
) {
  await page.addInitScript(({ base, override }) => {
    window.localStorage.setItem(
      "emanus_journey_v1",
      JSON.stringify({ ...base, ...override }),
    )
  }, { base: BASE_JOURNEY, override: state })
}

const DOOR_ENTRY_CASES = [
  {
    doorId: "doliu",
    optionLabel: "Absența unei persoane pe care am pierdut-o",
    branchCopy: "Nu îți voi cere să numești pierderea un bine",
  },
  {
    doorId: "boala",
    optionLabel: "Boala mea sau a cuiva drag",
    branchCopy: "Boala schimbă corpul, programul, banii și relațiile",
  },
  {
    doorId: "de_ce_permis",
    optionLabel: "Întrebarea de ce a permis Dumnezeu",
    branchCopy: "Întrebarea nu Îl sperie pe Dumnezeu",
  },
] as const

for (const entry of DOOR_ENTRY_CASES) {
  test(`ușa ${entry.doorId} intră direct în ramura aleasă`, async ({ page }) => {
    await seedJourney(page, { pathId: "path_suferinta", doorId: entry.doorId })
    await page.goto(`/#/program/door%3A${entry.doorId}/lesson/suferinta_l1`)

    await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
    await page.getByRole("button", { name: "stare greu" }).click()

    await expect(page.getByText(entry.optionLabel, { exact: true })).toBeVisible()
    await expect(page.getByRole("button", { name: entry.optionLabel, exact: true })).toHaveCount(0)
    await expect(page.getByText(entry.branchCopy, { exact: false })).toBeVisible()
  })
}

const GENERIC_CRISIS_RESOURCES = [
  "Urgențe: ambulanță și poliție",
  "Linie de sprijin psihologic",
  "TelVerde Antisuicid",
  "Numărul unic național pentru copii",
  "Telefonul Copilului",
  "Linie națională pentru violență domestică",
  "TelVerde pentru consum și dependență de droguri",
  "Programul privat Joc Responsabil",
]

test("/criza afișează lista generică de ajutor verificabil", async ({ page }) => {
  await page.goto("/#/criza")

  await expect(page.getByRole("heading", { name: "Ai nevoie de ajutor acum?" })).toBeVisible()
  await expect(page.locator(".crisis-resource h2")).toHaveText(GENERIC_CRISIS_RESOURCES)
})

const SPECIALIZED_CRISIS_CASES = [
  {
    intent: "violence",
    resource: "Linie națională pentru violență domestică",
  },
  {
    intent: "drugs",
    resource: "TelVerde pentru consum și dependență de droguri",
  },
  {
    intent: "gambling",
    resource: "Programul privat Joc Responsabil",
  },
] as const

for (const crisis of SPECIALIZED_CRISIS_CASES) {
  test(`/criza?motiv=${crisis.intent} păstrează numai ajutorul potrivit`, async ({ page }) => {
    await page.goto(`/#/criza?motiv=${crisis.intent}`)

    await expect(page.locator(".crisis-resource h2")).toHaveText([
      "Urgențe: ambulanță și poliție",
      crisis.resource,
    ])
  })
}

test("Întreabă recunoaște pericolul și nu promite o citire umană inexistentă", async ({ page }) => {
  await seedJourney(page, {})
  await page.goto("/#/intreaba")

  const question = page.getByRole("textbox", { name: "Întrebarea ta" })
  await question.fill("Partenerul mă bate și mă amenință.")
  await expect(page.getByRole("alert")).toContainText("Înaintea oricărui răspuns, caută ajutor direct")
  await expect(page.getByRole("button", { name: "Vezi ajutorul potrivit situației" })).toBeVisible()

  await page.getByRole("button", { name: "Păstrează întrebarea" }).click()
  await expect(page.getByText(/Nu a fost trimisă unui om/u)).toBeVisible()
  await expect(page.getByText(/o cite(?:ș|ş)te un om/iu)).toHaveCount(0)

  await question.fill("Partenerul mă bate și mă amenință.")
  await page.getByRole("button", { name: "Vezi ajutorul potrivit situației" }).click()
  await expect(page).toHaveURL(/#\/criza\?motiv=violence$/u)
  await expect(page.getByRole("heading", { name: "Linie națională pentru violență domestică" })).toBeVisible()
})

test("/eu arată stocarea locală și șterge datele numai după confirmare", async ({ page }) => {
  await seedJourney(page, {
    completedLessonIds: ["rusine_l1"],
    lessonsDone: 1,
    journal: [{ lessonId: "rusine_l1", text: "Însemnare locală", date: "2026-08-20" }],
    prayers: [{ id: "prayer-test", text: "Rugăciune locală", createdAt: "2026-08-20T08:00:00.000Z", answeredAt: null }],
  })
  await page.addInitScript(() => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        "course:lib_intoarcerea": {
          completedLessonIds: ["pocainta_l1"],
          lastLessonId: "pocainta_l1",
          journals: {},
          updatedAt: "2026-08-20T08:00:00.000Z",
          drafts: {},
        },
      },
    }))
    window.localStorage.setItem("emanus.daruri.v1", JSON.stringify({ version: 1 }))
    window.localStorage.setItem("emanus.ask.trimise", "[]")
    window.localStorage.setItem("unrelated.preference", "keep")
  })
  await page.goto("/#/eu")

  await expect(page.getByRole("heading", { name: "Datele mele" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Numai pe dispozitiv" })).toBeVisible()
  await expect(page.getByText("Nicio sesiune cloud nu este creată și nimic nu este încărcat.")).toBeVisible()
  await expect(page.getByText("Backup-ul nu este configurat în această instalare.")).toBeVisible()
  await expect(page.getByRole("button", { name: "Activează backup-ul" })).toHaveCount(0)
  expect(await page.evaluate(() => window.localStorage.getItem("emanus.backup.consent.v1"))).toBeNull()

  await page.getByRole("button", { name: "Șterge datele mele" }).click()
  await expect(page.getByText("Confirmi ștergerea definitivă? Acțiunea nu poate fi anulată.")).toBeVisible()
  expect(await page.evaluate(() => window.localStorage.getItem("emanus_journey_v1"))).not.toBeNull()

  await page.getByRole("button", { name: "Da, șterge definitiv" }).click()
  await expect(page).toHaveURL(/#\/$/u)
  await expect.poll(async () => page.evaluate(() => (
    Array.from({ length: window.localStorage.length }, (_, index) => window.localStorage.key(index))
      .filter((key): key is string => Boolean(key))
      .filter((key) => key.toLocaleLowerCase().startsWith("emanus"))
  ))).toEqual([])
  expect(await page.evaluate(() => window.localStorage.getItem("unrelated.preference"))).toBe("keep")
})

test("deep link-ul legacy păstrează programul ușii active", async ({ page }) => {
  await seedJourney(page, { pathId: "path_acasa", doorId: "rusine" })
  await page.goto("/#/lesson/rusine_l1")

  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await expect(page.getByRole("heading", { name: "El S-a miscat primul" })).toBeVisible()
  await expect(page.getByText("Sesiunea 1 din 7", { exact: true })).toBeVisible()

  await page.getByRole("button", { name: "Program", exact: true }).click()
  await expect(page).toHaveURL(/#\/program\/door%3Arusine$/u)
})

test("URL-ul vechi al overview-ului continuă prin programul ușii active", async ({ page }) => {
  await seedJourney(page, { pathId: "path_acasa", doorId: "rusine" })
  await page.goto("/#/program/path%3Apath_acasa")

  await expect(page.getByRole("heading", { name: "Drumul înapoi" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Sesiuni" })).toBeVisible()
  await page.locator(".program-session--current button").click()

  await expect(page).toHaveURL(/#\/program\/door%3Arusine\/lesson\/rusine_l1$/u)
  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
})

test("URL-ul vechi explicit al lecției deschide sesiunea ușii active", async ({ page }) => {
  await seedJourney(page, { pathId: "path_acasa", doorId: "rusine" })
  await page.goto("/#/program/path%3Apath_acasa/lesson/rusine_l1")

  await expect(page.getByText("Sesiune blocată", { exact: true })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await expect(page.getByRole("heading", { name: "El S-a miscat primul" })).toBeVisible()
  await expect(page.getByText("Sesiunea 1 din 7", { exact: true })).toBeVisible()
})

test("politica de siguranță completează lecțiile Porți care nu au safety inline", async ({ page }) => {
  await seedJourney(page, { pathId: "path_neiertare", doorId: "neiertare" })
  await page.goto("/#/program/door%3Aneiertare/lesson/neiertare_o1")

  await expect(page.getByRole("heading", { name: "Siguranța vine prima" })).toBeVisible()
  await expect(page.getByText(/Lecția vorbește despre răni, nedreptate și abuz/u)).toBeVisible()
  const before = await page.evaluate(() => window.localStorage.getItem("emanus_journey_v1"))

  await page.getByRole("button", { name: "Sunt în siguranță acum și continui" }).click()
  await expect(page.getByRole("heading", { name: "Nu El ti-a facut asta" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Ajutor acum" })).toBeVisible()

  const after = await page.evaluate(() => window.localStorage.getItem("emanus_journey_v1"))
  expect(after).toBe(before)
})

test("completion păstrează răspunsurile libere împreună cu jurnalul lecției", async ({ page }) => {
  const programId = "course:lib_intoarcerea"
  const lessonId = "pocainta_l6"
  const response = "Aleg să spun adevărul și să repar fără să cer controlul înapoi."
  const journal = "Voi continua rodul chiar dacă încrederea se reconstruiește încet."

  await seedJourney(page, {})
  await page.addInitScript(({ id, lesson, journalText }) => {
    window.localStorage.setItem("emanus_learning_progress_v1", JSON.stringify({
      version: 1,
      programs: {
        [id]: {
          completedLessonIds: ["pocainta_l1", "pocainta_l2", "pocainta_l3", "pocainta_l4", "pocainta_l5"],
          lastLessonId: "pocainta_l5",
          journals: {},
          updatedAt: "2026-08-20T08:00:00.000Z",
          drafts: {
            [lesson]: {
              mainStepId: `${lesson}__declaration`,
              mainStepIndex: 9,
              revealedStepIds: [`${lesson}__declaration`],
              choices: {},
              multiChoices: {},
              textResponses: {},
              quizAnswers: {},
              checkIns: {},
              journal: journalText,
            },
          },
        },
      },
    }))
  }, { id: programId, lesson: lessonId, journalText: journal })

  await page.goto("/#/program/course%3Alib_intoarcerea/lesson/pocainta_l6")
  const declaration = page.getByRole("textbox", {
    name: /Nu voi numi pocăință doar regretul meu/u,
  })
  await expect(declaration).toBeVisible()
  await declaration.fill(response)
  await page.getByRole("button", { name: "Am terminat", exact: true }).click()

  await expect(page.getByRole("heading", { name: "Ai parcurs toate sesiunile" })).toBeVisible()
  const saved = await page.evaluate(({ id, lesson }) => {
    const store = JSON.parse(window.localStorage.getItem("emanus_learning_progress_v1") ?? "{}")
    return {
      journal: store.programs?.[id]?.journals?.[lesson],
      draft: store.programs?.[id]?.drafts?.[lesson],
    }
  }, { id: programId, lesson: lessonId })

  expect(saved.journal).toContain(response)
  expect(saved.journal).toContain(journal)
  expect(saved.journal.split(response)).toHaveLength(2)
  expect(saved.journal.split(journal)).toHaveLength(2)
  expect(saved.draft).toBeUndefined()
})
