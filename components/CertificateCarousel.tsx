"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BadgeCheck, Download, ExternalLink } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { certificates, type Certificate } from "@/lib/certificates";

const AUTOPLAY_PIXELS_PER_SECOND = 58;
const RESUME_DELAY_MS = 1000;

function CertificateCard({ certificate, index, clone = false }: { certificate: Certificate; index: number; clone?: boolean }) {
  return (
    <article className="certificate-card" aria-hidden={clone || undefined}>
      <a className="certificate-preview" href={certificate.pdf} target="_blank" rel="noopener noreferrer" tabIndex={clone ? -1 : undefined} aria-label={clone ? undefined : `View ${certificate.title} certificate PDF (opens in a new tab)`}>
        <Image src={certificate.thumbnail} alt={clone ? "" : `${certificate.title} certificate issued by ${certificate.issuer}`} fill sizes="(max-width: 620px) 86vw, (max-width: 1000px) 44vw, 30vw" />
        <span>View original <ExternalLink size={15} /></span>
      </a>
      <div className="certificate-card-body">
        <div className="certificate-card-meta"><span>{String(index + 1).padStart(2, "0")} / {certificate.category}</span><time dateTime={certificate.dateTime}>{certificate.date}</time></div>
        <h3>{certificate.title}</h3>
        <p className="certificate-issuer"><BadgeCheck size={17} />{certificate.issuer} · Coursera</p>
        <p className="credential-code">Credential ID <strong>{certificate.credentialId}</strong></p>
        <div className="certificate-actions">
          <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer" tabIndex={clone ? -1 : undefined}>Verify <ExternalLink size={15} /></a>
          <a href={certificate.pdf} download tabIndex={clone ? -1 : undefined}>PDF <Download size={15} /></a>
        </div>
      </div>
    </article>
  );
}

export function CertificateCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const resumeAt = useRef(0);
  const interaction = useRef({ hover: false, focus: false, drag: false, hidden: false });
  const drag = useRef({ x: 0, scrollLeft: 0, moved: false });
  const reducedMotion = useReducedMotion();

  const pauseTemporarily = () => { resumeAt.current = performance.now() + RESUME_DELAY_MS; };
  const cardDistance = () => {
    const card = viewportRef.current?.querySelector<HTMLElement>(".certificate-card");
    return card ? card.offsetWidth + 24 : 360;
  };
  const loopWidth = () => (viewportRef.current?.scrollWidth ?? 0) / 2;

  useEffect(() => {
    const onVisibility = () => { interaction.current.hidden = document.hidden; if (!document.hidden) pauseTemporarily(); };
    document.addEventListener("visibilitychange", onVisibility);
    if (reducedMotion) return () => document.removeEventListener("visibilitychange", onVisibility);
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const viewport = viewportRef.current;
      const paused = Object.values(interaction.current).some(Boolean) || now < resumeAt.current;
      if (viewport && !paused) {
        viewport.scrollLeft += AUTOPLAY_PIXELS_PER_SECOND * Math.min(now - previous, 50) / 1000;
        const width = loopWidth();
        if (width && viewport.scrollLeft >= width) viewport.scrollLeft -= width;
      }
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", onVisibility); };
  }, [reducedMotion]);

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current; if (!viewport) return;
    pauseTemporarily();
    const distance = cardDistance();
    if (direction < 0 && viewport.scrollLeft < distance) viewport.scrollLeft += loopWidth();
    viewport.scrollBy({ left: direction * distance, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div
      className="certificate-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Professional certificates"
      onPointerEnter={() => { interaction.current.hover = true; }}
      onPointerLeave={() => { interaction.current.hover = false; interaction.current.drag = false; pauseTemporarily(); }}
      onFocusCapture={() => { interaction.current.focus = true; }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { interaction.current.focus = false; pauseTemporarily(); } }}
    >
      <div className="carousel-controls">
        <p>Autoplay pauses while you browse, focus, drag, or use the controls.</p>
        <div><button type="button" onClick={() => move(-1)} aria-label="Previous certificate"><ArrowLeft /></button><button type="button" onClick={() => move(1)} aria-label="Next certificate"><ArrowRight /></button></div>
      </div>
      <div
        className="carousel-viewport"
        ref={viewportRef}
        onWheel={pauseTemporarily}
        onPointerDown={(event) => {
          pauseTemporarily();
          if (event.button !== 0 || (event.target as HTMLElement).closest("a,button")) return;
          const viewport = viewportRef.current; if (!viewport) return;
          if (viewport.scrollLeft < 2) viewport.scrollLeft += loopWidth();
          interaction.current.drag = true; drag.current = { x: event.clientX, scrollLeft: viewport.scrollLeft, moved: false };
          viewport.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!interaction.current.drag || !viewportRef.current) return;
          const delta = event.clientX - drag.current.x; if (Math.abs(delta) > 4) drag.current.moved = true;
          viewportRef.current.scrollLeft = drag.current.scrollLeft - delta;
        }}
        onPointerUp={(event) => { interaction.current.drag = false; event.currentTarget.releasePointerCapture?.(event.pointerId); pauseTemporarily(); }}
        onPointerCancel={() => { interaction.current.drag = false; pauseTemporarily(); }}
      >
        <div className="carousel-track">
          {certificates.map((certificate, index) => <CertificateCard certificate={certificate} index={index} key={certificate.credentialId} />)}
          <div className="carousel-clones" aria-hidden="true">{certificates.map((certificate, index) => <CertificateCard certificate={certificate} index={index} clone key={`clone-${certificate.credentialId}`} />)}</div>
        </div>
      </div>
    </div>
  );
}
