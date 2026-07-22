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
