"use client";

import { useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type PortfolioProject } from "@/lib/projects";

const AUTOPLAY_PIXELS_PER_SECOND = 58;
const RESUME_DELAY_MS = 600;
const SWIPE_DIRECTION_THRESHOLD = 6;

function CarouselProjectCard({ project, index, clone = false }: { project: PortfolioProject; index: number; clone?: boolean }) {
  return (
    <div aria-hidden={clone || undefined}>
      <ProjectCard project={project} index={index} />
    </div>
  );
}

export function ProjectCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const resumeAt = useRef(0);
  const interaction = useRef({ hover: false, focus: false, drag: false, touch: false, hidden: false });
  const drag = useRef({ x: 0, scrollLeft: 0, moved: false });
  const touch = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
    scrollLeft: 0,
    locked: null as "h" | "v" | null,
    moved: false,
  });
  const reducedMotion = useReducedMotion();

  const featuredProjects = projects.filter((p) => p.featured);

  const pauseTemporarily = useCallback((delay = RESUME_DELAY_MS) => {
    resumeAt.current = performance.now() + delay;
  }, []);

  const cardDistance = () => {
    const card = viewportRef.current?.querySelector<HTMLElement>(".project-card");
    return card ? card.offsetWidth + 24 : 420;
  };
  const loopWidth = () => (viewportRef.current?.scrollWidth ?? 0) / 2;

  /* ── Autoplay tick ── */
  useEffect(() => {
    const onVisibility = () => {
      interaction.current.hidden = document.hidden;
      if (!document.hidden) pauseTemporarily();
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (reducedMotion) return () => document.removeEventListener("visibilitychange", onVisibility);

    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const viewport = viewportRef.current;
      const paused = Object.values(interaction.current).some(Boolean) || now < resumeAt.current;
      if (viewport && !paused) {
        viewport.scrollLeft += (AUTOPLAY_PIXELS_PER_SECOND * Math.min(now - previous, 50)) / 1000;
        const width = loopWidth();
        if (width && viewport.scrollLeft >= width) viewport.scrollLeft -= width;
      }
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion, pauseTemporarily]);

  const move = useCallback(
    (direction: -1 | 1) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      pauseTemporarily();
      const distance = cardDistance();
      if (direction < 0 && viewport.scrollLeft < distance) viewport.scrollLeft += loopWidth();
      viewport.scrollBy({ left: direction * distance, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [pauseTemporarily, reducedMotion]
  );

  /* ── Touch swipe (imperative with { passive: false } for reliable mobile swipe) ── */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 1) return;
      const t = event.touches[0];
      interaction.current.touch = true;
      interaction.current.focus = false;
      const now = performance.now();
      touch.current = {
        startX: t.clientX,
        startY: t.clientY,
        lastX: t.clientX,
        lastTime: now,
        velocityX: 0,
        scrollLeft: viewport.scrollLeft,
        locked: null,
        moved: false,
      };

      const width = loopWidth();
      if (width > 0 && viewport.scrollLeft < 2) {
        viewport.scrollLeft += width;
        touch.current.scrollLeft += width;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 1) return;
      const t = event.touches[0];
      const dx = t.clientX - touch.current.startX;
      const dy = t.clientY - touch.current.startY;

      if (!touch.current.locked) {
        if (Math.abs(dx) < SWIPE_DIRECTION_THRESHOLD && Math.abs(dy) < SWIPE_DIRECTION_THRESHOLD) return;
        touch.current.locked = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }

      if (touch.current.locked === "v") return;

      event.preventDefault();
      touch.current.moved = true;

      const now = performance.now();
      const dt = now - touch.current.lastTime;
      if (dt > 0) {
        touch.current.velocityX = (t.clientX - touch.current.lastX) / dt;
        touch.current.lastX = t.clientX;
        touch.current.lastTime = now;
      }

      const width = loopWidth();
      if (width > 0) {
        let target = touch.current.scrollLeft - dx;
        while (target < 0) {
          target += width;
          touch.current.scrollLeft += width;
        }
        while (target >= width) {
          target -= width;
          touch.current.scrollLeft -= width;
        }
        viewport.scrollLeft = target;
      }
    };

    const onTouchEnd = () => {
      interaction.current.touch = false;
      const locked = touch.current.locked;
      const velocity = touch.current.velocityX;
      touch.current.locked = null;

      if (locked === "h" && Math.abs(velocity) > 0.25) {
        if (velocity < -0.25) move(1);
        else if (velocity > 0.25) move(-1);
      } else {
        pauseTemporarily();
      }

      setTimeout(() => {
        touch.current.moved = false;
      }, 80);
    };

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [pauseTemporarily, move]);

  /* ── Mouse-only pointer hover handlers ── */
  const onMouseEnter = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") interaction.current.hover = true;
  }, []);

  const onMouseLeave = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") {
      interaction.current.hover = false;
      interaction.current.drag = false;
      pauseTemporarily();
    }
  }, [pauseTemporarily]);

  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      onFocusCapture={(event) => {
        if (interaction.current.touch) return;
        const target = event.target as HTMLElement | null;
        if (target?.matches?.(":focus-visible")) {
          interaction.current.focus = true;
        }
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          interaction.current.focus = false;
          pauseTemporarily();
        }
      }}
      onClickCapture={(event) => {
        if (touch.current.moved || drag.current.moved) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      <div className="carousel-controls">
        <p>Autoplay pauses while you browse, focus, drag, or use the controls.</p>
        <div>
          <button
            type="button"
            onClick={(e) => {
              move(-1);
              e.currentTarget.blur();
            }}
            aria-label="Previous project"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={(e) => {
              move(1);
              e.currentTarget.blur();
            }}
            aria-label="Next project"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        className="carousel-viewport"
        ref={viewportRef}
        onWheel={() => pauseTemporarily()}
        onPointerDown={(event) => {
          if (interaction.current.touch) return;
          pauseTemporarily();
          if (event.button !== 0) return;
          if (event.pointerType === "mouse" && (event.target as HTMLElement).closest("a,button")) return;
          const viewport = viewportRef.current;
          if (!viewport) return;
          if (viewport.scrollLeft < 2) viewport.scrollLeft += loopWidth();
          interaction.current.drag = true;
          drag.current = { x: event.clientX, scrollLeft: viewport.scrollLeft, moved: false };
          try {
            viewport.setPointerCapture(event.pointerId);
          } catch {
            // Pointer capture can throw on synthetic tests
          }
        }}
        onPointerMove={(event) => {
          if (interaction.current.touch || !interaction.current.drag || !viewportRef.current) return;
          const delta = event.clientX - drag.current.x;
          if (Math.abs(delta) > 4) drag.current.moved = true;
          viewportRef.current.scrollLeft = drag.current.scrollLeft - delta;
        }}
        onPointerUp={(event) => {
          if (interaction.current.touch) return;
          interaction.current.drag = false;
          try {
            event.currentTarget.releasePointerCapture?.(event.pointerId);
          } catch {}
          pauseTemporarily();
          setTimeout(() => {
            drag.current.moved = false;
          }, 80);
        }}
        onPointerCancel={() => {
          if (interaction.current.touch) return;
          interaction.current.drag = false;
          pauseTemporarily();
        }}
      >
        <div className="carousel-track project-carousel-track">
          {featuredProjects.map((project, index) => (
            <CarouselProjectCard project={project} index={index} key={project.id} />
          ))}
          <div className="carousel-clones" aria-hidden="true">
            {featuredProjects.map((project, index) => (
              <CarouselProjectCard project={project} index={index} clone key={`clone-${project.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
