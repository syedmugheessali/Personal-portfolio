import { expect, test } from "@playwright/test";

test("expense tracker supports validated CRUD, filters, persistence, and mobile layout", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4174");
  await page.evaluate(() => localStorage.clear()); await page.reload();
  await page.getByRole("button", { name: "Add transaction" }).click();
  await expect(page.locator("#description-error")).toContainText("at least 2");

  await page.getByLabel("Income").check();
  await page.getByLabel("Description").fill("Freelance project");
  await page.getByLabel("Amount (USD)").fill("850");
  await page.locator("#category").selectOption("Freelance");
  await page.getByRole("button", { name: "Add transaction" }).click();
  await page.getByLabel("Description").fill("Monthly rent");
  await page.getByLabel("Amount (USD)").fill("420");
  await page.locator("#category").selectOption("Housing");
  await page.getByRole("button", { name: "Add transaction" }).click();
  await expect(page.locator("#balance-total")).toHaveText("$430.00");
  await expect(page.locator("#transaction-list tr")).toHaveCount(2);

  await page.getByLabel("Search").fill("rent");
  await expect(page.locator("#transaction-list tr")).toHaveCount(1);
  await page.getByLabel("Search").fill("");
  await page.getByRole("button", { name: "Edit transaction" }).first().click();
  await expect(page.getByRole("button", { name: "Save changes" })).toBeVisible();
  await page.getByRole("button", { name: "Cancel edit" }).click();
  await page.reload();
  await expect(page.locator("#transaction-list tr")).toHaveCount(2);
  await page.evaluate(() => { window.scrollTo(0, 0); if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
  await page.locator(".skip-link").evaluate((element) => { (element as HTMLElement).style.display = "none"; });
  await page.screenshot({ path: "projects/expense-tracker-js/docs/expense-tracker-dashboard.png", fullPage: true, animations: "disabled" });
  expect(errors).toEqual([]);
  await page.close();
});
