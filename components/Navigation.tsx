"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { siteConfig, isPublicAssetUrl } from "@/lib/site";

const links = [
  ["projects", "Projects"], ["capabilities", "Skills"], ["experience", "Experience"], ["about", "About"], ["certificates", "Certificates"], ["contact", "Contact"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const scrollToSection = (id: string, updateHistory = true) => {
    const section = document.getElementById(id);
    if (!section) return;
    const marker = id === "home" ? section : section.querySelector<HTMLElement>(".section-label") ?? section;
    const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 76;
    const top = id === "home" ? 0 : marker.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    if (updateHistory) window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActive(current.target.id);
    }, { rootMargin: "-25% 0px -65%", threshold: 0 });
    document.querySelectorAll("[data-section]").forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const alignHash = () => {
      const id = window.location.hash.slice(1);
      if (id) window.requestAnimationFrame(() => scrollToSection(id, false));
    };
    alignHash();
    window.addEventListener("hashchange", alignHash);
    return () => window.removeEventListener("hashchange", alignHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled || open ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="wordmark" href="#home" onClick={(event) => navigateToSection(event, "home")} aria-label="Syed Mughees Ali, home"><span>SMA</span><small>Full Stack Developer</small></a>
          <div className="desktop-nav">
            {links.map(([id, label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={(event) => navigateToSection(event, id)}>{label}</a>)}
          </div>
          <div className="nav-actions">
            {isPublicAssetUrl(siteConfig.resume) ? <a className="resume-link" href={siteConfig.resume} download><ArrowDownToLine size={16} /> Résumé</a> : <a className="resume-link" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Résumé request")}`}><ArrowDownToLine size={16} /> Request résumé</a>}
            <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X /> : <Menu />}</button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && <motion.div id="mobile-menu" className="mobile-menu" initial={{ y: -14 }} animate={{ y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
          {links.map(([id, label], index) => <motion.a key={id} href={`#${id}`} onClick={(event) => navigateToSection(event, id)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>{label}<span>0{index + 1}</span></motion.a>)}
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
