"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function ExperienceProgress() {
  const root = useRef<HTMLDivElement>(null); const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    let context: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default; const ScrollTrigger = triggerModule.ScrollTrigger; gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => gsap.fromTo(".timeline-progress", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 72%", end: "bottom 70%", scrub: 0.5 } }), root);
    });
    return () => context?.revert();
  }, [reduced]);
  return <div ref={root} className="timeline-rail" aria-hidden="true"><span className="timeline-progress"/></div>;
}

export function ProjectSequence() {
  const root = useRef<HTMLDivElement>(null); const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current || window.innerWidth < 900) return;
    let context: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default; const ScrollTrigger = triggerModule.ScrollTrigger; gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.to(".project-blueprint-line", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: 0.5 } });
        gsap.fromTo(".project-status-panel", { y: 40 }, { y: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.7 } });
      }, root);
    });
    return () => context?.revert();
  }, [reduced]);
  return <div ref={root} className="project-visual" aria-hidden="true"><span className="project-blueprint-line"/><div className="project-status-panel"><span>CASE STUDY / 001</span><strong>Verified work<br/>coming into focus.</strong><small>Repositories · deployed applications · technical decisions</small></div></div>;
}
