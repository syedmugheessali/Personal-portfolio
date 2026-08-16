"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = "a, button, [role='button'], .project-card, .certificate-card, .carousel-viewport";

function cursorLabel(target: Element | null) {
  if (!target) return "";
  if (target.closest(".carousel-viewport")) return "DRAG";
  if (target.closest(".project-card, .certificate-card")) return "VIEW";
  return target.closest("a, button, [role='button']") ? "OPEN" : "";
}

export function TechnicalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!precisePointer.matches || reducedMotion.matches) return;

    document.documentElement.classList.add("technical-cursor-enabled");
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = "true";
      const interactive = (event.target as Element | null)?.closest(interactiveSelector) ?? null;
      cursor.dataset.active = interactive ? "true" : "false";
      const label = cursor.querySelector<HTMLElement>(".technical-cursor-label");
      if (label) label.dataset.label = cursorLabel(interactive);
    };
    const leave = () => { cursor.dataset.visible = "false"; };
    const down = () => { cursor.dataset.pressed = "true"; };
    const up = () => { cursor.dataset.pressed = "false"; };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("technical-cursor-enabled");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="technical-cursor" data-visible="false" data-active="false" aria-hidden="true">
      <span className="technical-cursor-dot" />
      <span className="technical-cursor-frame"><i /><i /><i /><i /></span>
      <span className="technical-cursor-label" />
    </div>
  );
}
