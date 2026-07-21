import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`${viewport.name} renders without overflow or console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Syed Mughees Ali");
    const { overflow, offenders } = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      offenders: [...document.querySelectorAll("body *")].map((element) => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName, className: element.className?.toString().slice(0, 80), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
      }).filter((rect) => rect.right > document.documentElement.clientWidth + 1 || rect.left < -1).slice(0, 10),
    }));
    if (overflow > 1) console.log(`${viewport.name} overflow`, offenders);
    await page.screenshot({ path: `.qa/screenshots/${viewport.name}.png`, fullPage: true, animations: "disabled" });
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("mobile navigation supports keyboard dismissal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open navigation menu" });
  await button.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await expect(page.locator("#mobile-menu")).toHaveCSS("background-color", "rgb(6, 18, 37)");
  await page.screenshot({ path: ".qa/screenshots/mobile-menu-open.png", animations: "disabled" });
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("reduced motion and landscape remain usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("certificate archive is part of the homepage flow without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".certificate-card")).toHaveCount(6);
  await expect(page.getByRole("link", { name: /Verify credential/i })).toHaveCount(6);
  await page.getByRole("link", { name: "Certificates", exact: true }).first().click();
  await expect(page).toHaveURL(/#certificates$/);
  await expect(page.locator("#certificates")).toBeInViewport();
  await expect(page.locator(".desktop-nav a.active")).toHaveText("Certificates");
  const labelTop = await page.locator("#certificates .section-label").first().evaluate((element) => element.getBoundingClientRect().top);
  expect(labelTop).toBeGreaterThanOrEqual(76);
  expect(labelTop).toBeLessThanOrEqual(120);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
