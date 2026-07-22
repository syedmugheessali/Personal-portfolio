import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-375", width: 375, height: 812 },
];

for (const viewport of viewports) {
  test(`${viewport.name} renders without overflow or console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Syed Mughees Ali");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await page.screenshot({ path: `.qa/screenshots/${viewport.name}.png`, fullPage: true, animations: "disabled" });
    if (viewport.name === "desktop-1440") await page.screenshot({ path: ".qa/project-sources/developer-portfolio.png", animations: "disabled" });
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test("200 percent zoom equivalent remains usable by keyboard", async ({ page }) => {
  // At 200% browser zoom, a 1440px window exposes roughly 720 CSS pixels.
  await page.setViewportSize({ width: 720, height: 450 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator("#projects")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("mobile navigation supports keyboard dismissal", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open navigation menu" });
  await button.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("project cards use verified actions and an image fallback", async ({ page }) => {
  await page.route("**/_next/image**", (route) => decodeURIComponent(route.request().url()).includes("developer-portfolio.webp") ? route.abort() : route.continue());
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".project-card")).toHaveCount(3);
  const eventEase = page.locator(".project-card").filter({ hasText: "EventEase" });
  await expect(eventEase.getByRole("link")).toHaveCount(1);
  await expect(eventEase.getByRole("link", { name: /View EventEase source code/ })).toHaveAttribute("href", "https://github.com/syedmugheessali/EventEase");
  await expect(page.getByText("Screenshot unavailable").first()).toBeVisible();
});

test("certificate carousel autoplays, pauses, and supports manual controls", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const carousel = page.getByRole("region", { name: "Professional certificates" });
  const viewport = carousel.locator(".carousel-viewport");
  await expect(carousel.locator(".certificate-card:not([aria-hidden=true])")).toHaveCount(6);
  await expect(carousel.locator(".carousel-clones")).toHaveAttribute("aria-hidden", "true");
  const start = await viewport.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(650);
  expect(await viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(start + 10);
  await carousel.hover();
  const pausedAt = await viewport.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(500);
  expect(Math.abs((await viewport.evaluate((element) => element.scrollLeft)) - pausedAt)).toBeLessThan(2);
  await page.mouse.move(0, 0);
  const verifyLink = carousel.locator(".certificate-card:not([aria-hidden=true])").first().getByRole("link", { name: "Verify" });
  await expect(verifyLink).toHaveAttribute("href", /coursera\.org\/verify\//);
  await verifyLink.focus();
  const focusedAt = await viewport.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(500);
  expect(Math.abs((await viewport.evaluate((element) => element.scrollLeft)) - focusedAt)).toBeLessThan(2);
  await carousel.getByRole("button", { name: "Next certificate" }).focus();
  await carousel.getByRole("button", { name: "Next certificate" }).click();
  await page.waitForTimeout(500);
  const afterNext = await viewport.evaluate((element) => element.scrollLeft);
  expect(afterNext).toBeGreaterThan(focusedAt + 100);
  await carousel.getByRole("button", { name: "Previous certificate" }).click();
  await page.waitForTimeout(500);
  expect(await viewport.evaluate((element) => element.scrollLeft)).toBeLessThan(afterNext - 100);
});

test("reduced motion disables carousel autoplay but keeps controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/", { waitUntil: "networkidle" });
  const viewport = page.locator(".carousel-viewport");
  const start = await viewport.evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(500);
  expect(await viewport.evaluate((element) => element.scrollLeft)).toBe(start);
  await page.getByRole("button", { name: "Next certificate" }).click();
  expect(await viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(start);
});

test("touch swipe moves the certificate track", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  const viewport = page.locator(".carousel-viewport");
  const box = await viewport.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    await page.touchscreen.tap(box.x + box.width * .8, box.y + 80);
    await viewport.dispatchEvent("pointerdown", { pointerId: 7, pointerType: "touch", button: 0, clientX: box.x + box.width * .8 });
    await viewport.dispatchEvent("pointermove", { pointerId: 7, pointerType: "touch", clientX: box.x + box.width * .25 });
    await viewport.dispatchEvent("pointerup", { pointerId: 7, pointerType: "touch", clientX: box.x + box.width * .25 });
    expect(await viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  }
  await context.close();
});

test("section navigation clears the fixed header", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: /Certificates/ }).click();
  await expect(page).toHaveURL(/#certificates$/);
  await expect(page.locator("#certificates")).toBeInViewport({ timeout: 10_000 });
  const labelTop = await page.locator("#certificates .section-label").evaluate((element) => element.getBoundingClientRect().top);
  expect(labelTop).toBeGreaterThanOrEqual(76);
});

test("production metadata and public asset routes use the canonical domain", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://syedmugheesali.vercel.app");
  const githubLinks = page.locator('a[href="https://github.com/syedmugheessali"]');
  expect(await githubLinks.count()).toBeGreaterThanOrEqual(5);
  for (const link of await githubLinks.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap: https://syedmugheesali.vercel.app/sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("https://syedmugheesali.vercel.app/");
  expect((await request.get("/og-image.png")).ok()).toBeTruthy();
  expect((await request.get("/favicon.svg")).ok()).toBeTruthy();
  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  expect(jsonLd).toContain("https://github.com/syedmugheessali");
  expect(jsonLd).toContain("https://syedmugheesali.vercel.app");
});
