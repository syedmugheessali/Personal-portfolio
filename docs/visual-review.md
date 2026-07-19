# Visual review

Screenshots are generated in `.qa/screenshots/` at 1440×1000, 1280×800, 768×1024 and 390×844. Testing uses the production build in Microsoft Edge through Playwright.

## Initial build review

The first apparent captures were rejected because Playwright had reused a stale Python server on port 4173 and displayed the previous Bootstrap site. After identifying the process by command line and stopping only that server, the real Next.js capture exposed 17–48px of document overflow from off-canvas decorative pseudo-elements. Root-level horizontal clipping fixed the scroll region without hiding content. Section-reveal behavior was also changed so server-rendered content is visible before JavaScript; motion now enhances visible content rather than gating it.

## Refinement pass one

- Confirmed the Swiss/editorial rhythm reads distinctly across dark and light sections.
- Replaced absent résumé actions with a functional, clearly labelled email request; a real download automatically replaces it when configured.
- Added an explicit hero fact rail for Karachi, Bahria University and availability, strengthening ten-second recruiter comprehension.
- Kept the portrait and project states honest because the repository contains no approved portrait or verified project data.

## Refinement pass two

- Tightened mobile capability spacing and increased skill-row readability.
- Rechecked hero framing, snapshot flow, experience density, project preview, process stacking, credential rail and contact hierarchy at all four required widths.
- Verified no horizontal overflow, browser console errors or hydration errors.
- Verified the mobile menu opens, locks body scrolling, closes with Escape and restores the page.
- Confirmed visible focus states, 44px minimum controls, reduced-motion handling, semantic landmarks and a single H1.

## Final result

The final visual system is deliberately rectangular, typographic and asymmetric, with controlled blueprint details and limited blue accents. It avoids repeated card grids, fake metrics, fake projects, icon clouds, decorative gradients and scroll-jacking. Remaining gaps are content assets, not design placeholders: portrait, résumé, GitHub URL, canonical domain and verified projects.
