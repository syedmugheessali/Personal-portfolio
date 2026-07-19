# Syed Mughees Ali — Portfolio

A premium, recruiter-focused portfolio rebuilt with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, GSAP ScrollTrigger and Lucide React.

## Run locally

This machine uses Corepack because its bundled `npm` installation is currently broken.

```powershell
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000`.

## Quality checks

```powershell
corepack pnpm lint
corepack pnpm build
corepack pnpm test:visual
```

The Playwright suite starts the production server on port 4173, captures 1440×1000, 1280×800, 768×1024 and 390×844 screenshots, checks horizontal overflow and browser errors, and verifies Escape-key dismissal of the mobile menu.

## Content and asset configuration

Copy `.env.example` to `.env.local` and configure only verified public values:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/verified-username
NEXT_PUBLIC_RESUME_URL=/syed-mughees-ali-resume.pdf
NEXT_PUBLIC_PORTRAIT_URL=/profile-headshot.jpg
```

Place the approved résumé and portrait in `public/`. When these variables are absent, the site intentionally shows a professional portrait placeholder, offers a working résumé-request email, and hides the GitHub link. No fake projects or broken actions are rendered.

Confirmed personal content is in `lib/site.ts` and `app/page.tsx`. The selected visual direction and motion rules are documented in `docs/`.

## Deploy to Vercel

1. Push the repository to a Git provider and import it into Vercel.
2. Vercel will detect Next.js; no custom build command is needed.
3. Add the `NEXT_PUBLIC_*` values above in Project Settings → Environment Variables.
4. Deploy, then run the Playwright checks against the production URL or review the live site manually.
5. Confirm the canonical origin, résumé, portrait, GitHub profile and all external links before sharing with recruiters.

## Genuine remaining content TODOs

- Add the approved professional portrait.
- Add the reviewed résumé PDF.
- Confirm the GitHub profile URL.
- Set the production domain/canonical URL.
- Add verified projects, screenshots, repositories and demos.
- Confirm Disc & Drive employment type, exact stack, delivered features and verified outcomes.
- Add credential links and details for certifications whose issuer/date is not yet confirmed.
