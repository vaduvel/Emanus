import { expect, test } from "@playwright/test"

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

test.beforeEach(async ({ page }) => {
  await page.addInitScript((state) => {
    window.localStorage.setItem("emanus_journey_v1", JSON.stringify(state))
  }, journey)
})

test("navigarea principală are cinci destinații funcționale", async ({ page }) => {
  await page.goto("/#/")

  const navigation = page.getByRole("navigation", { name: "Navigare principală" })
  await expect(navigation).toBeVisible()
  await expect(navigation.getByRole("button")).toHaveCount(5)
  await expect(navigation.getByRole("button").allTextContents()).resolves.toEqual([
    "Azi",
    "Biblia",
    "Bibliotecă",
    "Întreabă",
    "Rugăciuni",
  ])
  await expect(navigation.getByRole("button", { name: "Azi" })).toHaveAttribute("aria-current", "page")

  for (const destination of [
    { name: "Biblia", hash: "#/biblia" },
    { name: "Bibliotecă", hash: "#/biblioteca" },
    { name: "Întreabă", hash: "#/intreaba" },
    { name: "Rugăciuni", hash: "#/rugaciuni" },
    { name: "Azi", hash: "#/" },
  ]) {
    await navigation.getByRole("button", { name: destination.name, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${destination.hash.replaceAll("/", "\\/")}$`, "u"))
    await expect(navigation.getByRole("button", { name: destination.name, exact: true })).toHaveAttribute("aria-current", "page")
    await expect(navigation.locator('[aria-current="page"]')).toHaveCount(1)
  }
})

test("navigarea dispare în cititor, programe, lecții și flow-uri imersive", async ({ page }) => {
  for (const route of [
    "/#/biblia/geneza/1",
    "/#/program/path%3Apath_acasa",
    "/#/program/path%3Apath_acasa/lesson/rusine_l1",
    "/#/lesson/fund_l1",
    "/#/devotional",
    "/#/pergament",
    "/#/candela",
    "/#/legamant",
    "/#/final",
  ]) {
    await page.goto(route)
    await expect(page.getByRole("navigation", { name: "Navigare principală" })).toHaveCount(0)
  }
})

test("selectorul intermediar al Bibliei păstrează navigarea principală", async ({ page }) => {
  await page.goto("/#/biblia/alege?testament=nt&carte=ioan")

  const navigation = page.getByRole("navigation", { name: "Navigare principală" })
  await expect(navigation).toBeVisible()
  await expect(navigation.getByRole("button", { name: "Biblia", exact: true })).toHaveAttribute("aria-current", "page")
  await expect(page.locator("main")).toHaveClass(/app--tabbed/u)
  await expect(page.locator("main")).toHaveClass(/app--bible/u)
})

test("bara respectă lățimea mobilă, aria sigură și ținte tactile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/#/biblioteca")
  await expect(page.getByRole("navigation", { name: "Navigare principală" })).toBeVisible()

  const measurements = await page.evaluate(() => {
    const app = document.querySelector<HTMLElement>(".app--tabbed")
    const navigation = document.querySelector<HTMLElement>(".tabs2")
    const buttons = [...document.querySelectorAll<HTMLElement>(".tabs2 button")]
    return {
      appPaddingBottom: app ? Number.parseFloat(window.getComputedStyle(app).paddingBottom) : 0,
      navigationHeight: navigation?.getBoundingClientRect().height ?? 0,
      navigationBottom: navigation?.getBoundingClientRect().bottom ?? 0,
      smallestButtonHeight: Math.min(...buttons.map((button) => button.getBoundingClientRect().height)),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }
  })

  expect(measurements.smallestButtonHeight).toBeGreaterThanOrEqual(44)
  expect(measurements.appPaddingBottom).toBeGreaterThanOrEqual(measurements.navigationHeight)
  expect(measurements.navigationBottom).toBe(844)
  expect(measurements.scrollWidth).toBeLessThanOrEqual(measurements.clientWidth)
})
