"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  return (
    <motion.div
      className={className}
      initial={false}
      animate={controls}
      onViewportEnter={() => {
        if (reduced) return;
        controls.set({ opacity: 0, y: 24 });
        void controls.start({ opacity: 1, y: 0, transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] } });
      }}
      viewport={{ once: true, amount: 0.16 }}
    >{children}</motion.div>
  );
}
