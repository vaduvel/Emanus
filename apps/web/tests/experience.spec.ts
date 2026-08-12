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
  await expect(page.getByRole("heading", { name: "Ce te-a adus aici?" })).toBeVisible()

  const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"))
  expect(stored.seenWelcome).toBe(true)
  expect(stored.pathId).toBeNull()
})

test("poarta păstrează alegerea și deschide traseul potrivit", async ({ page }) => {
  await page.goto("/#/intrare")
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()

  const firstDoor = page.locator(".doors__list .door:not(.door--quiet)").first()
  const doorLabel = (await firstDoor.locator("span").innerText()).trim()
  await firstDoor.click()

  await expect(page.getByRole("heading", { name: `„${doorLabel}”` })).toBeVisible()
  await expect(page.getByText("Traseul tău", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: /Începe drumul/u }).click()

  await expect(page).toHaveURL(/\/#\/$/u)
  const stored = await page.evaluate(() => JSON.parse(window.localStorage.getItem("emanus_journey_v1") ?? "{}"))
  expect(stored.seenWelcome).toBe(true)
  expect(stored.pathId).toEqual(expect.any(String))
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
    await page.getByRole("button", { name: "Arata versetul acum" }).click()
    await page.getByRole("button", { name: /Am citit și răspund/u }).click()

    await expect(page.getByText("Ajunge pentru azi.", { exact: true })).toBeVisible()
    await expect(page.getByText("Nu ai nimic restant.", { exact: false })).toBeVisible()
    await expect(page.getByRole("button", { name: /Aprinde candela seara/u })).toBeVisible()
  })

  test("pergamentul oferă un singur verset și contextul lui", async ({ page }) => {
    await page.goto("/#/pergament")
    await expect(page.getByRole("heading", { name: "Ce duci azi?" })).toBeVisible()
    await page.locator(".scroll-choices button").first().click()

    await expect(page.getByRole("heading", { name: "Pergamentul s-a deschis" })).toBeVisible()
    await page.getByRole("button", { name: "Arata versetul acum" }).click()
    await expect(page.getByRole("button", { name: /Citește în context/u })).toBeVisible()
    await expect(page.getByText("Sulul se strânge acum.", { exact: false })).toBeVisible()
  })

  test("candela salvează reflecția de seară", async ({ page }) => {
    await page.goto("/#/candela")
    await expect(page.getByRole("heading", { name: "Lumina pentru următorul pas" })).toBeVisible()
    await page.getByRole("button", { name: "Arata versetul acum" }).click()
    await page.getByRole("textbox", { name: "Unde a fost Dumnezeu azi? Două rânduri sunt suficiente." }).fill("Am văzut ajutorul lui Dumnezeu într-o conversație.")
    await page.getByRole("button", { name: /Pun deoparte/u }).click()

    await expect(page.getByText("Gândul a fost păstrat.", { exact: true })).toBeVisible()
    await expect(page.getByRole("button", { name: /Înapoi la Azi/u }).last()).toBeVisible()
  })
})
