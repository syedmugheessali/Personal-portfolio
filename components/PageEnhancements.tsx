"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function PageEnhancements() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  if (reduced) return null;

  return (
    <motion.div
      className="page-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
