import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://127.0.0.1:4187",
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
    viewport: { width: 430, height: 932 },
    hasTouch: true,
  },
  webServer: {
    command: "pnpm preview --host 127.0.0.1 --port 4187",
    url: "http://127.0.0.1:4187",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
