# Design direction

## Selected direction

The portfolio uses one coherent system: **Swiss Modernism 2.0 with a restrained technical-editorial layer**. It is 60% corporate credibility and 40% developer personality. A twelve-column grid, oversized but useful typography, thin rules, strong alignment and selective asymmetry establish trust without resembling a SaaS template.

The UI/UX Pro Max generator recommended Swiss Modernism 2.0, a monochrome-plus-blue palette, corporate typography and a trust-first conversion pattern. The generic enterprise gateway pattern was adapted to a recruiter journey: identity and availability → verified professional snapshot → evidence of experience → honest project status → capabilities and process → credentials → contact.

## Visual system

- **Layout:** 12-column editorial grid; 1240px maximum content width; alternating deep navy and warm-white sections; connected rows instead of repeated card grids.
- **Typography:** Lexend for display and headings, Source Sans 3 for body and interface text. Responsive `clamp()` sizes, compact display line-height, and readable 65–72 character body measures.
- **Colour:** deep navy `#061225`, navy `#08182f`, raised navy `#102844`, paper `#f5f7fb`, white, action blue `#3b82f6`, light blue `#60a5fa`, ink `#101827`, muted `#667085`. Blue is reserved for actions, progress and small identity marks.
- **Shape:** primarily rectangular compositions; 2–18px radii based on purpose; thin borders and restrained shadows. Portrait and project areas use layered rectangular framing.
- **Texture:** subtle grid lines and index labels provide developer character without fake terminals, code rain or decorative technology icons.

## Conversion and credibility

The hero answers name, role, location, education, technical focus and availability within one viewport. Contact and work exploration remain primary. Résumé and GitHub actions render only when configured, avoiding broken recruiter journeys. Current employment, dates and responsibilities remain permanently visible. Projects use an honest preparation state until verified work exists. Certifications show only confirmed issuer/date information.

Credibility comes from precise language, verified dates, visible professional context, clear skills grouped by application, and transparent TODO handling—not fake metrics, testimonials, logos, percentages or invented projects.

## Accessibility and anti-patterns

- WCAG AA contrast, semantic landmarks, logical headings, 44px targets, visible focus rings and keyboard-operable navigation.
- Content is visible without JavaScript; animations enhance rather than gate it.
- Reduced-motion mode removes transforms, parallax and scroll choreography.
- Avoid purple gradients, glass everywhere, glowing blobs, icon clouds, fake terminals, repeated card grids, skill ratings, scroll hijacking, excessive pills and animation on every element.

## Asset policy

The audited repository contains no portrait, résumé, verified project, or valid GitHub URL. The interface therefore uses a deliberate typographic portrait placeholder and hides unavailable actions. These items are centralized in `.env.example` and must be replaced only with verified assets/links.
