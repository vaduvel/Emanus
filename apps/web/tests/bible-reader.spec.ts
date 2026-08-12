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

test("biblioteca se încarcă progresiv și deschide textul VT", async ({ page }) => {
  const pageErrors: string[] = []
  const loadedBooks: string[] = []
  page.on("pageerror", (error) => pageErrors.push(error.message))
  page.on("response", (response) => {
    const match = new URL(response.url()).pathname.match(/\/biblia-emanus\/books\/([^/]+)\.json$/u)
    if (match) loadedBooks.push(match[1])
  })

  await page.goto("/#/biblia")
  await expect(page.getByRole("heading", { name: "Biblia", exact: true })).toBeVisible()
  await expect(page.getByRole("button", { name: /Geneza/u })).toBeVisible()
  await expect(page.getByText("Biblia Emanus (BE) · Traducere originală Emanus", { exact: true })).toBeVisible()
  expect(loadedBooks).toEqual([])

  await page.getByRole("button", { name: /Geneza/u }).click()
  await expect(page.getByRole("dialog", { name: "Geneza" })).toBeVisible()
  await page.getByRole("button", { name: /^Geneza 1:/u }).click()

  await expect(page.getByRole("button", { name: "Alege altă carte sau alt capitol" })).toContainText("Geneza 1")
  await expect(page.getByText("La început, Dumnezeu a creat cerurile și pământul.", { exact: true })).toBeVisible()
  expect(loadedBooks).toEqual(["geneza"])
  expect(pageErrors).toEqual([])
})

test("Scriptura și Înțelege rămân două moduri ale aceluiași capitol", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")

  await expect(page.getByRole("tab", { name: "Scriptura" })).toHaveAttribute("aria-selected", "true")
  await expect(page.locator(".bible-reader__verse")).toHaveCount(31)
  await expect(page.locator(".bible-explanation")).toHaveCount(0)

  await page.getByRole("tab", { name: "Înțelege" }).click()
  await expect(page.getByRole("tab", { name: "Înțelege" })).toHaveAttribute("aria-selected", "true")
  await expect(page.locator(".bible-explanation").first()).toBeVisible()
  await expect(page.locator(".bible-reader__verse")).toHaveCount(0)
  await expect(page.getByText("Practică de azi")).toHaveCount(0)
})

test("intrarea după nevoie deschide pasajul complet, nu un verset izolat", async ({ page }) => {
  const loadedBooks: string[] = []
  page.on("response", (response) => {
    const match = new URL(response.url()).pathname.match(/\/biblia-emanus\/books\/([^/]+)\.json$/u)
    if (match) loadedBooks.push(match[1])
  })

  await page.goto("/#/biblia")
  await page.getByRole("button", { name: /Când te doare, citește/u }).click()
  await page.getByRole("button", { name: "Mi-a murit cineva" }).click()
  const firstPassage = page.locator(".bible-need-results .bible-result").first()
  await expect(firstPassage).toBeVisible()
  expect(loadedBooks).toEqual([])

  await firstPassage.click()
  await expect(page).toHaveURL(/#\/biblia\/[^/]+\/\d+$/u)
  await expect(page.locator(".bible-reader__verse").first()).toBeVisible()
  expect(loadedBooks).toHaveLength(1)
})

test("căutarea încarcă corpusul complet doar după ce utilizatorul scrie", async ({ page }) => {
  const loadedBooks = new Set<string>()
  page.on("response", (response) => {
    const match = new URL(response.url()).pathname.match(/\/biblia-emanus\/books\/([^/]+)\.json$/u)
    if (match) loadedBooks.add(match[1])
  })

  await page.goto("/#/biblia")
  await page.getByRole("button", { name: "Caută în Biblie" }).click()
  expect(loadedBooks.size).toBe(0)

  await page.getByRole("searchbox", { name: "Caută în Biblia Emanus" }).fill("Melhisedec")
  await expect(page.getByRole("button", { name: /Geneza 14/u }).first()).toBeVisible({ timeout: 20_000 })
  expect(loadedBooks.size).toBe(66)
})

test("salvarea și reluarea lecturii persistă local", async ({ page }) => {
  await page.goto("/#/biblia/ioan/3")
  await page.getByRole("button", { name: "Salvează capitolul" }).click()
  await expect(page.getByRole("button", { name: "Elimină capitolul din salvate" })).toBeVisible()

  await page.getByRole("button", { name: "Înapoi la biblioteca Bibliei" }).click()
  await expect(page.getByRole("button", { name: /Continuă lectura.*Ioan 3/s })).toBeVisible()
  await page.getByRole("button", { name: "Capitole salvate" }).click()
  await expect(page.getByRole("dialog", { name: "Capitole salvate" }).getByRole("button", { name: /Ioan 3/u })).toBeVisible()
})

test("NT final este citit separat de stratul explicativ", async ({ page }) => {
  await page.goto("/#/biblia/matei/1")

  await expect(page.locator(".bible-reader__verse")).toHaveCount(25)
  await expect(page.getByText("Cartea genealogiei lui Isus Hristos, fiul lui David, fiul lui Avraam.", { exact: true })).toBeVisible()
  await page.getByRole("tab", { name: "Înțelege" }).click()
  await expect(page.getByText("Explicația nu este încă legată de acest capitol.", { exact: true })).toBeVisible()
})
