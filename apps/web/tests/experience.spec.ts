import { expect, test } from "@playwright/test"

const journey = {
  seenWelcome: true,
  pathId: "path_temelie",
  lessonsDone: 0,
  doctrineDone: 0,
  lastLessonDate: null,
  prayerInviteSeen: false,
  journal: [],
  prayers: [],
  pathCompletedSeen: false,
}

test("onboardingul conduce spre poarta fără să creeze progres fals", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()

  await expect(page.getByRole("heading", { name: "Biblia pentru viața ta de azi" })).toBeVisible()
  await page.getByRole("button", { name: /Mai departe/u }).click()
  await expect(page.getByRole("heading", { name: "Pas cu pas, nu singur" })).toBeVisible()
  await page.getByRole("button", { name: /Mai departe/u }).click()
  await expect(page.getByRole("heading", { name: "Nu intri aici la întâmplare" })).toBeVisible()

  await page.getByRole("button", { name: /Alege poarta mea/u }).click()
  await expect(page).toHaveURL(/#\/intrare$/u)
  await expect(page.getByRole("heading", { name: "Ești în pericol acum?" })).toBeVisible()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()
  await expect(page.getByRole("heading", { name: "Ce te-a adus aici?" })).toBeVisible()

  const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"))
  expect(stored.seenWelcome).toBe(true)
  expect(stored.pathId).toBeNull()
})

test("Drumul Emaus și Crucea rămân deschise înainte de alegerea unei Porți", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => window.localStorage.clear())
  await page.goto("/#/drum")

  await expect(page.getByText("Drumul Emaus", { exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: /Vreau să ajung la Cruce acum/u })).toBeVisible()
  await page.getByRole("button", { name: /Vreau să ajung la Cruce acum/u }).click()
  await page.getByRole("button", { name: "Scrie ce I-ai spus" }).click()
  await expect(page).toHaveURL(/#\/rugaciuni$/u)
  await expect(page.getByRole("heading", { name: "Rugăciunile mele" })).toBeVisible()
})

test("poarta păstrează alegerea și deschide programul traseului potrivit", async ({ page }) => {
  await page.goto("/#/intrare")
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()

  const firstDoor = page.locator(".doors__list .door:not(.door--quiet)").first()
  const doorLabel = (await firstDoor.locator("span").innerText()).trim()
  await firstDoor.click()

  await expect(page.getByRole("heading", { name: `„${doorLabel}”` })).toBeVisible()
  await expect(page.getByText("Traseul tău", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: /Începe drumul/u }).click()

  await expect(page).toHaveURL(/#\/program\/door%3Arusine$/u)
  await expect(page.getByRole("heading", { name: "Sesiuni" })).toBeVisible()
  await expect(page.getByText("Ritm ghidat · între sesiuni există timp de aplicare", { exact: true })).toBeVisible()
  const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"))
  expect(stored.seenWelcome).toBe(true)
  expect(stored.pathId).toEqual(expect.any(String))
  expect(stored.doorId).toBe("rusine")
})

test("poarta cu secvență proprie deschide exact varianta ei, iar traseele nerevizuite rămân închise", async ({ page }) => {
  await page.goto("/#/intrare")
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()
  await page.getByRole("button", { name: /Arată-mi toate opțiunile/u }).click()
  await page.getByRole("searchbox", { name: /Caută o situație/u }).fill("pierdut")
  await page.getByRole("button", { name: /Am pierdut pe cineva/u }).click()
  await page.getByRole("button", { name: /Începe drumul/u }).click()

  await expect(page).toHaveURL(/#\/program\/door%3Adoliu$/u)
  await expect(page.getByRole("heading", { name: "După pierdere" })).toBeVisible()
  await expect(page.locator(".program-session-list .program-session__card")).toHaveCount(5)

  await page.goto("/#/program/path%3Apath_anxietate")
  await expect(page.getByRole("heading", { name: "Programul nu este disponibil încă" })).toBeVisible()
  await page.goto("/#/program/door%3Aanxietate")
  await expect(page.getByRole("heading", { name: "Programul nu este disponibil încă" })).toBeVisible()
  await page.goto("/#/lesson/anxietate_l1")
  await expect(page.getByText("Lecția aceasta nu este disponibilă încă.", { exact: true })).toBeVisible()
})

test("intrările de explorare deschid programe reale fără să inventeze o rană", async ({ page }) => {
  for (const doorId of ["inceput", "umblare", "nu_stiu"]) {
    await page.goto(`/#/program/door%3A${doorId}`)
    await expect(page.getByRole("heading", { name: "Începe prin locul tău real" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Programul nu este disponibil încă" })).toHaveCount(0)
  }
})

test("un program de Poartă deschis direct nu poate sări peste întrebarea de siguranță", async ({ page }) => {
  await page.goto("/")
  await page.evaluate(() => window.localStorage.clear())
  await page.goto("/#/program/door%3Arusine")

  await expect(page.getByRole("heading", { name: "Începe prin locul tău real" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Sesiuni" })).toHaveCount(0)
  await page.getByRole("button", { name: "Continuă spre Poarta de intrare" }).click()
  await expect(page).toHaveURL(/#\/intrare\?u=rusine$/u)
  await expect(page.getByRole("heading", { name: "Ești în pericol acum?" })).toBeVisible()
})

test("parametrul unei Porți este consumat o singură dată și scos din URL", async ({ page }) => {
  await page.goto("/#/intrare?u=rusine")
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()

  await expect(page.getByRole("heading", { name: "„Am făcut lucruri de care mi-e rușine”" })).toBeVisible()
  await page.getByRole("button", { name: "Nu, vreau să aleg eu" }).click()
  await expect(page).toHaveURL(/#\/intrare$/u)
  await expect(page.getByRole("heading", { name: "Ce te-a adus aici?" })).toBeVisible()

  await page.reload()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()
  await expect(page.getByRole("heading", { name: "Ce te-a adus aici?" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "„Am făcut lucruri de care mi-e rușine”" })).toHaveCount(0)

  await page.goto("/#/intrare?u=rusine")
  await page.reload()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()
  await page.getByRole("button", { name: /Da, începe aici/u }).click()
  await expect(page).toHaveURL(/#\/intrare$/u)
  await page.getByRole("button", { name: /Începe drumul/u }).click()
  await expect(page).toHaveURL(/#\/program\/door%3Arusine$/u)

  await page.goBack()
  await expect(page).toHaveURL(/#\/intrare$/u)
  await page.reload()
  await page.getByRole("button", { name: "Nu, pot continua spre uși" }).click()
  await expect(page.getByRole("heading", { name: "Ce te-a adus aici?" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "„Am făcut lucruri de care mi-e rușine”" })).toHaveCount(0)
})

test("un drum retras poate fi continuat doar de utilizatorul care îl avea deja", async ({ page }) => {
  await page.goto("/")
  await page.evaluate((state) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify({
      ...state,
      pathId: "path_greutate",
      doorId: null,
      lessonsDone: 1,
      completedLessonIds: [],
    }))
  }, journey)
  await page.goto("/#/program/path%3Apath_greutate")
  await expect(page.getByRole("heading", { name: "Sesiuni" })).toBeVisible()

  await page.evaluate((state) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify(state))
  }, journey)
  await page.reload()
  await expect(page.getByRole("heading", { name: "Programul nu este disponibil încă" })).toBeVisible()
})

test("lecțiile pastorale planificate nu pot ocoli aprobările prin deep link", async ({ page }) => {
  await page.goto("/#/program/course%3Apastoral_doliu_suicid")
  await expect(page.getByRole("heading", { name: "Programul nu este disponibil încă" })).toBeVisible()
  await page.goto("/#/lesson/doliu_suicid_l1")
  await expect(page.getByText("Lecția aceasta nu este disponibilă încă.", { exact: true })).toBeVisible()
})

test.describe("darurile zilnice", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((state) => {
      window.localStorage.setItem("emanus_journey_v1", JSON.stringify(state))
    }, journey)
  })

  test("devoționalul se încheie fără scor sau presiune de serie", async ({ page }) => {
    await page.goto("/#/devotional")
    await expect(page.getByText("Un singur lucru pentru azi", { exact: true })).toBeVisible()
    const theme = await page.getByRole("heading", { level: 1 }).innerText()
    await page.getByRole("button", { name: "Arată versetul acum" }).click()
    await page.getByRole("button", { name: /Am citit și răspund/u }).click()

    await expect(page.getByText("Ajunge pentru azi.", { exact: true })).toBeVisible()
    await expect(page.getByText("Nu ai nimic restant.", { exact: false })).toBeVisible()
    await expect(page.getByRole("button", { name: /Aprinde candela seara/u })).toBeVisible()

    const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus.daruri.v1") ?? "{}"))
    expect(stored.devotional.dayIndex).toBe(1)
    await page.reload()
    await expect(page.getByRole("heading", { level: 1, name: theme })).toBeVisible()
    await expect(page.getByText("Ajunge pentru azi.", { exact: true })).toBeVisible()
  })

  test("devoționalul are o încheiere după ultima zi, fără a reporni automat", async ({ page }) => {
    await page.goto("/")
    await page.evaluate(() => {
      window.localStorage.setItem("emanus.daruri.v1", JSON.stringify({
        devotional: {
          dayIndex: 365,
          openedDays: Array.from({ length: 365 }, (_, index) => index + 1),
          lastOpenedAt: "2026-08-18T08:00:00.000Z",
        },
        seenCards: [], seenVerses: [], eveningNotes: [], lastMood: null,
        ageMode: "adult", covenant: null, dailyVerses: {},
      }))
    })
    await page.goto("/#/devotional")
    await expect(page.getByRole("heading", { name: "Ai ajuns la capătul acestui drum zilnic" })).toBeVisible()
    await expect(page.getByText("Nu începe automat o numărătoare nouă.", { exact: false })).toBeVisible()
  })

  test("pergamentul oferă un singur verset și contextul lui", async ({ page }) => {
    await page.goto("/#/pergament")
    await expect(page.getByRole("heading", { name: "Ce duci azi?" })).toBeVisible()
    await page.locator(".scroll-choices button").first().click()

    await expect(page.getByRole("heading", { name: "Pergamentul s-a deschis" })).toBeVisible()
    await page.getByRole("button", { name: "Arată versetul acum" }).click()
    const reference = await page.locator(".reveal__ref").innerText()
    const parchmentCopy = page.locator(".reveal__stage--scroll > .reveal__text--scroll")
    await expect(parchmentCopy).toBeVisible()
    await expect(page.locator(".reveal--scroll > .reveal__text")).toHaveCount(0)
    const parchmentLayout = await parchmentCopy.evaluate((copy) => {
      const stage = copy.parentElement?.getBoundingClientRect()
      const text = copy.getBoundingClientRect()
      return stage ? {
        stageTop: stage.top,
        stageBottom: stage.bottom,
        textTop: text.top,
        textBottom: text.bottom,
      } : null
    })
    expect(parchmentLayout).not.toBeNull()
    expect(parchmentLayout?.textTop ?? 0).toBeGreaterThan(parchmentLayout?.stageTop ?? 0)
    expect(parchmentLayout?.textBottom ?? 0).toBeLessThan(parchmentLayout?.stageBottom ?? 0)
    await expect(page.getByRole("button", { name: /Citește în context/u })).toBeVisible()
    await expect(page.getByText("Sulul se strânge acum.", { exact: false })).toBeVisible()

    await page.setViewportSize({ width: 390, height: 844 })
    const helpBox = await page.locator(".helpbar").boundingBox()
    const contextBox = await page.getByRole("button", { name: /Citește în context/u }).boundingBox()
    expect(helpBox).not.toBeNull()
    expect(contextBox).not.toBeNull()
    expect((helpBox?.y ?? 0) + (helpBox?.height ?? 0)).toBeLessThanOrEqual(contextBox?.y ?? 0)

    await page.reload()
    await expect(page.getByRole("heading", { name: "Pergamentul s-a deschis" })).toBeVisible()
    await expect(page.locator(".reveal__ref")).toHaveText(reference)

    await page.getByRole("button", { name: /Citește în context/u }).click()
    await expect(page).toHaveURL(/#\/biblia\/[a-z0-9-]+\/\d+\?verset=\d+$/u)
    await page.goto("/#/pergament")
    await page.getByRole("button", { name: /Trimite cuiva/u }).click()
    await expect(page).toHaveURL(/#\/mesaj\?verset=sv_/u)
    await expect(page.locator(".today__verse")).toHaveText(reference)
  })

  test("candela salvează reflecția de seară", async ({ page }) => {
    await page.goto("/#/candela")
    await expect(page.getByRole("heading", { name: "Lumina pentru următorul pas" })).toBeVisible()
    await page.getByRole("button", { name: "Arată versetul acum" }).click()
    const reference = await page.locator(".reveal__ref").innerText()
    await expect(page.locator(".reveal--lamp .reveal__step")).toHaveCSS("color", "rgb(255, 248, 232)")
    await page.reload()
    await page.getByRole("button", { name: "Arată versetul acum" }).click()
    await expect(page.locator(".reveal__ref")).toHaveText(reference)
    await page.getByRole("textbox", { name: "Unde a fost Dumnezeu azi? Două rânduri sunt suficiente." }).fill("Am văzut ajutorul lui Dumnezeu într-o conversație.")
    await page.getByRole("button", { name: /Pun deoparte/u }).click()

    await expect(page.getByText("Gândul a fost păstrat.", { exact: true })).toBeVisible()
    await expect(page.getByRole("button", { name: /Înapoi la Azi/u }).last()).toBeVisible()
  })
})
