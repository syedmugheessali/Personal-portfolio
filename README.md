# Syed Mughees Ali — Developer Portfolio

A recruiter-focused portfolio for Syed Mughees Ali, built with Next.js App Router, TypeScript, React, responsive CSS, Motion, GSAP, and Playwright.

![Portfolio homepage](public/images/projects/developer-portfolio.webp)

## Featured work

- **Developer Portfolio** — this production Next.js application, including accessible navigation, metadata, structured data, responsive project cards, a certificate carousel, and Vercel monitoring.
- **Ledgerly Expense Tracker** — a standalone vanilla JavaScript project under `projects/expense-tracker-js`, with localStorage CRUD, validation, search, filters, calculated totals, and Node tests.
- **EventEase** — a separately versioned C#/Blazor project under `projects/EventEase`, upgraded with Entity Framework Core, SQLite persistence, event CRUD, registration rules, attendance tracking, and integration tests.

The JavaScript workspace is declared in `pnpm-workspace.yaml`. EventEase remains an independent nested repository and is not bundled into the production Next.js application.

## Run the portfolio locally

Requirements: Node.js 20+ and Corepack.

```powershell
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000`.

## Public configuration

Copy `.env.example` to `.env.local` only when overriding a public default:

```env
NEXT_PUBLIC_SITE_URL=https://syedmugheesali.vercel.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/syedmugheessali
NEXT_PUBLIC_RESUME_URL=
NEXT_PUBLIC_PORTRAIT_URL=/images/profile-headshot.webp
```

Do not store secrets in `NEXT_PUBLIC_*` variables because Next.js exposes them to browser code. The résumé action remains a working email request until a verified public résumé file or URL is configured.

## Quality checks

```powershell
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm test:visual
```

The Playwright wrapper starts and stops the production portfolio and static expense-tracker servers. Browser coverage includes 375×812, 768×1024, and 1440×900 layouts plus a 720-CSS-pixel 200%-zoom equivalent; console errors; horizontal overflow; keyboard navigation; project fallbacks; certificate autoplay, pause, arrows, reduced motion, and touch dragging; metadata and public routes; plus the expense tracker's validated CRUD and persistence flow.

EventEase has its own setup, database, test, and deployment instructions in [`projects/EventEase/README.md`](projects/EventEase/README.md).

## Production metadata

- Canonical site: `https://syedmugheesali.vercel.app`
- Open Graph image: 1200×630 at `/og-image.png`
- Crawl endpoints: `/robots.txt` and `/sitemap.xml`
- Person and WebSite JSON-LD share the canonical production origin.
- GitHub and LinkedIn are included in the Person `sameAs` data.

## Deploy to Vercel

1. Push the reviewed files to the `Personal-portfolio` repository.
2. Import or reconnect that repository in Vercel.
3. Confirm the public environment values from `.env.example`.
4. Enable Web Analytics and Speed Insights in the Vercel dashboard.
5. Redeploy, then verify `/`, `/robots.txt`, `/sitemap.xml`, `/og-image.png`, and `/favicon.svg`.

Analytics data appears only after the dashboard products are enabled, a production deployment is live, and the site receives real traffic.
