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
  await expect(page).toHaveURL(/#\/biblia\/alege\?testament=vt&carte=geneza$/u)
  await expect(page.getByRole("heading", { name: "Alege cartea și capitolul" })).toBeVisible()
  await page.getByRole("button", { name: /^Geneza 1:/u }).click()
  await page.getByRole("button", { name: "Deschide Geneza 1" }).click()

  await expect(page.getByRole("button", { name: "Alege altă carte sau alt capitol" })).toContainText("Geneza 1")
  await expect(page.getByText("La început, Dumnezeu a creat cerurile și pământul.", { exact: true })).toBeVisible()
  expect(loadedBooks).toEqual(["geneza"])
  expect(pageErrors).toEqual([])
})

test("Scriptura și Înțelege rămân două moduri ale aceluiași capitol", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")

  await expect(page.getByRole("button", { name: "Scriptura" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator(".bible-reader__verse")).toHaveCount(31)
  await expect(page.locator(".bible-explanation")).toHaveCount(0)

  await page.getByRole("button", { name: "Înțelege" }).click()
  await expect(page.getByRole("button", { name: "Înțelege" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator(".bible-explanation").first()).toBeVisible()
  await expect(page.locator(".bible-reader__verse")).toHaveCount(0)
  await expect(page.getByText("Practică de azi")).toHaveCount(0)
})

test("un verset din mijlocul pasajului deschide explicația care îl conține", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")

  await page.getByRole("button", { name: /^Versetul 4 /u }).click()
  await page.getByRole("toolbar", { name: "Acțiuni pentru 1 verset" }).getByRole("button", { name: "Înțelege" }).click()

  const explanation = page.locator('.bible-explanation[data-reader-anchor="3"][data-reader-anchor-end="5"]')
  await expect(explanation).toBeInViewport()
  await expect(explanation.getByRole("heading", { name: "Ziua intai: lumina" })).toBeVisible()
  await expect(explanation.getByText("Pasaj explicat")).toBeVisible()
  await expect(explanation.getByText(/Dumnezeu a spus: „Să fie lumină!”/u)).toBeVisible()
})

test("o selecție nouă înlocuiește ancora veche din URL când deschide explicația", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1?verset=31")
  await expect(page.getByRole("button", { name: /^Versetul 31 /u })).toBeInViewport()

  await page.getByRole("button", { name: /^Versetul 4 /u }).click()
  await page.getByRole("toolbar", { name: "Acțiuni pentru 1 verset" }).getByRole("button", { name: "Înțelege" }).click()

  const explanation = page.locator('.bible-explanation.is-targeted[data-reader-anchor="3"][data-reader-anchor-end="5"]')
  await expect(explanation).toBeInViewport()
  await expect(explanation).toBeFocused()
  await expect(explanation.getByRole("heading", { name: "Ziua intai: lumina" })).toBeVisible()
})

test("schimbarea modului urmează pasajul citit după ce utilizatorul s-a îndepărtat de ancora inițială", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1?verset=4")
  await expect(page.getByRole("button", { name: /^Versetul 4 /u })).toBeInViewport()

  await page.evaluate(async () => {
    await document.fonts.ready
    await new Promise((resolve) => window.setTimeout(resolve, 180))
  })

  const verseTwentyFive = page.locator('[data-reader-anchor="25"]')
  await verseTwentyFive.evaluate((element) => {
    element.scrollIntoView({ block: "start" })
    window.scrollBy({ top: -170 })
  })
  await expect(verseTwentyFive).toBeInViewport()
  const understandSwitch = page.getByRole("button", { name: "Înțelege" })
  const switchBox = await understandSwitch.boundingBox()
  expect(switchBox).not.toBeNull()
  await page.mouse.click(switchBox!.x + switchBox!.width / 2, switchBox!.y + switchBox!.height / 2)

  const explanation = page.locator('.bible-explanation.is-targeted[data-reader-anchor="24"][data-reader-anchor-end="25"]')
  await expect(explanation).toBeInViewport()
  await expect(explanation).toBeFocused()
})

test("o selecție necontiguă anunță toate pasajele explicate atinse", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")

  await page.getByRole("button", { name: /^Versetul 4 /u }).click()
  await page.getByRole("button", { name: /^Versetul 6 /u }).click()
  await page.getByRole("toolbar", { name: "Acțiuni pentru 2 versete" }).getByRole("button", { name: "Înțelege" }).click()

  const notice = page.getByRole("complementary", { name: "Explicațiile selecției" })
  await expect(notice.getByText("Selecția atinge 2 pasaje explicate", { exact: true })).toBeVisible()
  await expect(notice.getByRole("button", { name: /v\. 4 · Ziua intai: lumina/u })).toBeVisible()
  await expect(notice.getByRole("button", { name: /v\. 6 · Ziua a doua: intinderea/u })).toBeVisible()
  await expect(page.locator('.bible-explanation.is-targeted[data-reader-anchor="3"][data-reader-anchor-end="5"]')).toBeInViewport()
})

test("selectarea cu Enter mută focusul în toolbar iar Escape îl restaurează pe verset", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")

  const verse = page.getByRole("button", { name: /^Versetul 4 /u })
  await verse.focus()
  await verse.press("Enter")

  const toolbar = page.getByRole("toolbar", { name: "Acțiuni pentru 1 verset" })
  await expect(toolbar).toBeVisible()
  await expect(toolbar.getByRole("button", { name: "Marchează cu auriu" })).toBeFocused()

  await page.keyboard.press("Escape")
  await expect(toolbar).toHaveCount(0)
  await expect(verse).toBeFocused()
})

test("un verset favorit se redeschide în Scriptura chiar dacă ultimul mod a fost Înțelege", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("emanus.bible.verse.favorites.v1", JSON.stringify(["geneza:1:4"]))
    window.localStorage.setItem("emanus.bible.reader.mode", JSON.stringify("understand"))
  })
  await page.goto("/#/biblia")

  await page.getByRole("button", { name: "Capitole și versete salvate" }).click()
  const savedDialog = page.getByRole("dialog", { name: "Salvate" })
  await savedDialog.getByRole("button", { name: /Geneza 1:4/u }).click()

  await expect(page).toHaveURL(/#\/biblia\/geneza\/1\?verset=4$/u)
  await expect(page.getByRole("button", { name: "Scriptura" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("button", { name: /^Versetul 4 /u })).toBeInViewport()
})

test("un pasaj foarte lung păstrează versetul exact între Scriptura și Înțelege", async ({ page }) => {
  await page.goto("/#/biblia/psalmi/119?verset=150")
  const verse = page.getByRole("button", { name: /^Versetul 150 /u })
  await expect(verse).toBeInViewport()
  await verse.click()
  await page.getByRole("toolbar", { name: "Acțiuni pentru 1 verset" }).getByRole("button", { name: "Înțelege" }).click()

  const explanation = page.locator('.bible-explanation[data-reader-anchor="1"][data-reader-anchor-end="176"]')
  await expect(explanation).toBeInViewport()
  await explanation.getByRole("button", { name: "Vezi în Scriptură" }).click()
  await expect(page.getByRole("button", { name: /^Versetul 150 /u })).toBeInViewport()
})

test("un deep link către ultimul verset din Psalmul 119 ajunge la ancora exactă", async ({ page }) => {
  await page.goto("/#/biblia/psalmi/119?verset=176")

  const verse = page.getByRole("button", { name: /^Versetul 176 /u })
  await expect(verse).toBeInViewport({ timeout: 10_000 })
  await expect(verse).toBeFocused()
})

test("Marcu 16 semnalizează statutul textual și păstrează finalul alternativ", async ({ page }) => {
  await page.goto("/#/biblia/marcu/16")

  const verseNine = page.getByRole("button", { name: /^Versetul 9 /u })
  await expect(verseNine).toHaveAttribute("data-textual-status", "double-bracketed")
  await expect(verseNine).toContainText("Text cu tradiție manuscrisă discutată · vezi notele")

  const alternateEndings = page.locator("details.bible-alternate-endings")
  await alternateEndings.getByText("Finaluri alternative păstrate (1)", { exact: true }).click()
  await expect(alternateEndings).toHaveAttribute("open", "")
  await expect(alternateEndings.getByText(/Dar ele le-au vestit pe scurt celor din jurul lui Petru/u)).toBeVisible()
})

test("bara contextuală marchează și salvează mai multe versete", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")

  const verseOne = page.getByRole("button", { name: /^Versetul 1 /u })
  const verseTwo = page.getByRole("button", { name: /^Versetul 2 /u })
  await verseOne.click()
  await verseTwo.click()

  const toolbar = page.getByRole("toolbar", { name: "Acțiuni pentru 2 versete" })
  await expect(toolbar).toBeVisible()
  await toolbar.getByRole("button", { name: "Marchează cu auriu" }).click()
  await expect(verseOne).toHaveAttribute("data-highlight", "gold")
  await expect(verseTwo).toHaveAttribute("data-highlight", "gold")

  await toolbar.getByRole("button", { name: "Favorit" }).click()
  await expect(toolbar.getByRole("button", { name: "Salvat" })).toHaveAttribute("aria-pressed", "true")
  await page.reload()

  await expect(page.getByRole("button", { name: /^Versetul 1 /u })).toHaveAttribute("data-highlight", "gold")
  await expect(page.getByRole("button", { name: /^Versetul 2 /u })).toHaveAttribute("data-highlight", "gold")
  await page.getByRole("button", { name: "Înapoi la alegerea capitolului" }).click()
  await page.getByRole("button", { name: "Înapoi la pagina Biblia" }).click()
  await page.getByRole("button", { name: "Capitole și versete salvate" }).click()
  const savedDialog = page.getByRole("dialog", { name: "Salvate" })
  await expect(savedDialog.getByRole("heading", { name: "Versete favorite" })).toBeVisible()
  await expect(savedDialog.getByRole("button", { name: /Geneza 1:1/u })).toBeVisible()
  await expect(savedDialog.getByRole("button", { name: /Geneza 1:2/u })).toBeVisible()
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

test("rezultatul unui verset deschide versetul, nu începutul capitolului", async ({ page }) => {
  await page.goto("/#/biblia")
  await page.getByRole("button", { name: "Caută în Biblie" }).click()
  await page.getByRole("searchbox", { name: "Caută în Biblia Emanus" }).fill("Melhisedec")

  const result = page.getByRole("button", { name: /Text biblic · Psalmii 110:4/u }).first()
  await expect(result).toBeVisible({ timeout: 20_000 })
  await result.click()

  await expect(page).toHaveURL(/#\/biblia\/psalmi\/110\?verset=4$/u)
  await expect(page.getByRole("button", { name: /^Versetul 4 /u })).toBeInViewport()
})

test("un rezultat de tip explicație deschide direct modul Înțelege", async ({ page }) => {
  await page.goto("/#/biblia")
  await page.getByRole("button", { name: "Caută în Biblie" }).click()
  await page.getByRole("searchbox", { name: "Caută în Biblia Emanus" }).fill("Melhisedec")
  const result = page.getByRole("button", { name: /Explicație · Geneza 14/u }).first()
  await expect(result).toBeVisible({ timeout: 20_000 })
  await result.click()
  await expect(page.getByRole("button", { name: "Înțelege" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator(".bible-explanation").first()).toBeVisible()
})

test("navigarea la capitolul următor pornește de sus", async ({ page }) => {
  await page.goto("/#/biblia/geneza/1")
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.getByRole("button", { name: "Următor Geneza 2" }).click()
  await expect(page).toHaveURL(/#\/biblia\/geneza\/2$/u)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(20)
})

for (const viewport of [{ width: 390, height: 844 }, { width: 1200, height: 800 }]) {
  test(`selectorul carte-capitol funcționează la ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto("/#/biblia/alege?testament=nt&carte=luca")

    await expect(page.getByRole("button", { name: "Noul Testament" })).toHaveAttribute("aria-pressed", "true")
    await page.getByRole("searchbox", { name: "Caută o carte a Bibliei" }).fill("Ioan")
    await page.getByRole("navigation", { name: "Cărțile din Noul Testament" }).getByRole("button", { name: "Ioan", exact: true }).click()
    await page.getByRole("button", { name: /^Ioan 3:/u }).click()
    await page.getByRole("button", { name: "Deschide Ioan 3" }).click()

    await expect(page).toHaveURL(/#\/biblia\/ioan\/3$/u)
    await expect(page.getByRole("button", { name: "Alege altă carte sau alt capitol" })).toContainText("Ioan 3")
    await expect(page.getByRole("navigation", { name: "Navigare principală" })).toHaveCount(0)
  })
}

test("salvarea și reluarea lecturii persistă local", async ({ page }) => {
  await page.goto("/#/biblia/ioan/3")
  await page.getByRole("button", { name: "Salvează capitolul" }).click()
  await expect(page.getByRole("button", { name: "Elimină capitolul din salvate" })).toBeVisible()

  await page.getByRole("button", { name: "Înapoi la alegerea capitolului" }).click()
  await page.getByRole("button", { name: "Înapoi la pagina Biblia" }).click()
  await expect(page.getByRole("button", { name: /Continuă lectura.*Ioan 3/s })).toBeVisible()
  await page.getByRole("button", { name: "Capitole și versete salvate" }).click()
  await expect(page.getByRole("dialog", { name: "Salvate" }).getByRole("button", { name: /Ioan 3/u })).toBeVisible()
})

test("NT final păstrează textul canonic și deschide explicația legată", async ({ page }) => {
  await page.goto("/#/biblia/matei/1")

  await expect(page.locator(".bible-reader__verse")).toHaveCount(25)
  await expect(page.getByText("Cartea genealogiei lui Isus Hristos, fiul lui David, fiul lui Avraam.", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Înțelege" }).click()
  await expect(page.locator(".bible-explanation").first()).toBeVisible()
  await expect(page.getByText("Explicația nu este încă legată de acest capitol.", { exact: true })).toHaveCount(0)
})
