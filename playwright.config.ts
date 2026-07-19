import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: ".qa/playwright-results",
  reporter: [["html", { outputFolder: ".qa/playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "corepack pnpm start -p 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "edge", use: { ...devices["Desktop Chrome"], channel: "msedge" } }],
});
