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

test.beforeEach(async ({ page }) => {
  await page.addInitScript((state) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify(state))
  }, journey)
})

test("catalogul complet și un capitol VT folosesc Biblia Emanus fără încărcare eager", async ({ page }) => {
  const pageErrors: string[] = []
  const loadedBooks: string[] = []
  page.on("pageerror", (error) => pageErrors.push(error.message))
  page.on("response", (response) => {
    const match = new URL(response.url()).pathname.match(/\/biblia-emanus\/books\/([^/]+)\.json$/u)
    if (match) loadedBooks.push(match[1])
  })

  await page.goto("/#/biblia")
  await expect(page.getByRole("heading", { name: "Biblia Emanus" })).toBeVisible()
  await expect(page.locator(".bbook__name", { hasText: "Geneza" })).toBeVisible()
  await expect(page.getByText("Biblia Emanus (BE) · Traducere originală Emanus", { exact: true }).first()).toBeVisible()
  expect(loadedBooks).toEqual([])
  const eagerBibleChunks = await page.evaluate(() => performance.getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((name) => /\/assets\/bible-/u.test(name)))
  expect(eagerBibleChunks).toEqual([])

  await page.locator(".bbook").filter({ has: page.locator(".bbook__name", { hasText: "Geneza" }) }).locator(".bchap").first().click()

  await expect(page.getByText("Geneza 1:1", { exact: true })).toBeVisible()
  await expect(page.getByText("La început, Dumnezeu a creat cerurile și pământul.", { exact: true })).toBeVisible()
  await expect(page.getByText("Biblia Emanus (BE) · Traducere originală Emanus", { exact: true }).last()).toBeVisible()
  expect(loadedBooks).toEqual(["geneza"])
  expect(pageErrors).toEqual([])
})

test("intrarea după nevoie folosește indexul ușor și deschide pasajul complet", async ({ page }) => {
  const loadedBooks: string[] = []
  page.on("response", (response) => {
    const match = new URL(response.url()).pathname.match(/\/biblia-emanus\/books\/([^/]+)\.json$/u)
    if (match) loadedBooks.push(match[1])
  })

  await page.goto("/#/biblia")
  await page.getByRole("button", { name: "Mi-a murit cineva" }).click()
  const firstPassage = page.locator(".bfound__item").first()
  await expect(firstPassage).toBeVisible()
  expect(loadedBooks).toEqual([])

  await firstPassage.click()
  await expect(page).toHaveURL(/#\/biblia\/[^/]+\/\d+$/u)
  await expect(page.locator(".bunit__text").first()).toBeVisible()
  await expect(page.getByText("Biblia Emanus (BE) · Traducere originală Emanus", { exact: true }).last()).toBeVisible()
  expect(loadedBooks).toHaveLength(1)
})

test("căutarea în text încarcă corpusul complet numai la cererea utilizatorului", async ({ page }) => {
  const loadedBooks = new Set<string>()
  page.on("response", (response) => {
    const match = new URL(response.url()).pathname.match(/\/biblia-emanus\/books\/([^/]+)\.json$/u)
    if (match) loadedBooks.add(match[1])
  })

  await page.goto("/#/biblia")
  const search = page.getByRole("searchbox", { name: "Caută în Biblia Emanus" })
  await search.fill("Melhisedec")

  await expect(page.getByRole("button", { name: /14 Geneza 14/u })).toBeVisible({ timeout: 15_000 })
  expect(loadedBooks.size).toBe(66)
})

test("Noul Testament final este accesibil ca text canonic separat de explicație", async ({ page }) => {
  await page.goto("/#/biblia/matei/1")

  await expect(page.getByRole("heading", { name: "Matei 1" })).toBeVisible()
  await expect(page.locator(".bverse")).toHaveCount(25)
  await expect(page.getByText("Cartea genealogiei lui Isus Hristos, fiul lui David, fiul lui Avraam.", { exact: true })).toBeVisible()
  await expect(page.getByText("Biblia Emanus (BE) · Traducere originală Emanus", { exact: true }).last()).toBeVisible()
  await expect(page.locator(".bunit__teaching")).toHaveCount(0)
})
