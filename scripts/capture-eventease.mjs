import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("http://127.0.0.1:4175", { waitUntil: "networkidle" });

const createEvent = async ({ name, description, date, location, capacity }) => {
  await page.getByLabel("Event name").fill(name);
  await page.getByLabel("Description").fill(description);
  await page.getByLabel("Date").fill(date);
  await page.locator("#location").fill(location);
  await page.getByLabel("Capacity").fill(capacity);
  await page.getByRole("button", { name: "Create event" }).click();
  await page.getByText("Event created.").waitFor();
};

await createEvent({ name: "Developer Community Meetup", description: "An evening of practical talks, networking, and collaborative learning.", date: "2026-08-18", location: "Karachi", capacity: "120" });
await createEvent({ name: "API Design Workshop", description: "A focused workshop covering reliable API structure and validation.", date: "2026-08-25", location: "Online", capacity: "60" });
await page.evaluate(() => { window.scrollTo(0, 0); if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
await page.screenshot({ path: "projects/EventEase/docs/eventease-dashboard.png", fullPage: true, animations: "disabled" });

await browser.close();
if (errors.length) throw new Error(`Browser errors: ${errors.join(" | ")}`);
console.log("Captured EventEase dashboard with two database-backed records.");
