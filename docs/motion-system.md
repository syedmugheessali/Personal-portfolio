# Motion system

Motion communicates order and state. It never delays access to content.

## Timing and easing

- Micro interaction: 160–220ms, `ease-out`.
- Section reveal: 450–600ms, 20–28px vertical offset, short 60–90ms stagger, once only.
- Hero sequence: availability → heading mask → copy → actions → portrait, complete within 1.2 seconds.
- Hover scale never exceeds 1.02; arrows translate 3–5px; imagery scales to at most 1.035.

## Ownership

- **Motion for React:** page entry, reveal groups, menu presence, buttons, small hover states and layout transitions.
- **GSAP ScrollTrigger:** experience progress and the project-preview storytelling sequence only. Contexts are reverted on cleanup.
- **Native CSS/browser:** focus, colour and border transitions; native scrolling remains intact.

## Interaction enhancement layer

- A 3px spring-smoothed page-progress line gives a persistent sense of position without altering native scrolling.
- The hero portrait responds to desktop pointer position with a maximum five-degree tilt, spring return, restrained image scale and a single-pass sheen. Touch input receives the static image treatment.
- Primary and secondary hero actions use subtle lift/press feedback and a single-pass highlight; translation and scale remain within the 2% limit.
- Recruiter snapshot cells, responsibility rows, process steps and credentials use section-specific underline, surface or inset transitions instead of one repeated card-hover effect.
- Text-link arrows shift by only 3px to communicate direction.

## Reduced motion and performance

When `prefers-reduced-motion: reduce` is active, content renders in its final state, smooth scrolling is disabled, GSAP triggers are not created, and nonessential transforms are removed. Motion uses opacity and transform only, avoids layout properties, and does not introduce initial hidden server-rendered content or layout shifts.
