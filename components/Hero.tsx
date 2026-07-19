"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowDown, ArrowRight, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { isPublicAssetUrl, siteConfig } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();
  const rawPortraitX = useMotionValue(0);
  const rawPortraitY = useMotionValue(0);
  const portraitRotateX = useSpring(rawPortraitX, { stiffness: 180, damping: 22 });
  const portraitRotateY = useSpring(rawPortraitY, { stiffness: 180, damping: 22 });
  const enter = (delay: number) => reduced ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.48, ease: [0.22, 1, 0.36, 1] as const } };
  return (
    <section id="home" data-section className="hero section-dark">
      <div className="hero-grid blueprint">
        <div className="hero-copy">
          <motion.div className="availability" {...enter(0.05)}><span /> Available for junior development opportunities</motion.div>
          <motion.p className="hero-kicker" {...enter(0.15)}>Karachi · Software Engineering · Full-Stack</motion.p>
          <div className="hero-title-mask"><motion.h1 {...enter(0.22)}>Hi, I’m<br/><strong>Syed Mughees Ali.</strong></motion.h1></div>
          <motion.p className="hero-role" {...enter(0.34)}>Junior Full-Stack Developer</motion.p>
          <motion.p className="hero-intro" {...enter(0.42)}>I am a Software Engineering student at Bahria University with practical experience in full-stack development. I build responsive, database-driven web applications with a focus on C#, Python, SQL and API integration.</motion.p>
          <motion.div className="hero-actions" {...enter(0.52)}>
            <motion.a className="button button-primary" href="#projects" whileHover={reduced ? undefined : { y: -2, scale: 1.015 }} whileTap={reduced ? undefined : { scale: .98 }}>Explore my work <ArrowRight size={18}/></motion.a>
            {isPublicAssetUrl(siteConfig.resume) ? <motion.a className="button button-ghost" href={siteConfig.resume} download whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .98 }}>Download résumé</motion.a> : <motion.a className="button button-ghost" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Résumé request")}`} whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .98 }}>Request résumé</motion.a>}
            <a className="text-link" href={`mailto:${siteConfig.email}`}><Mail size={17}/> Contact me</a>
          </motion.div>
          <motion.ul className="hero-facts" aria-label="Recruiter information" {...enter(0.58)}>
            <li>Karachi, Pakistan</li><li>Software Engineering — Bahria University</li><li>Open to junior roles and internships</li>
          </motion.ul>
        </div>
        <motion.div className="portrait-stage" initial={reduced ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} transition={{ delay: 0.38, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
          <div className="portrait-index">01 / PROFILE</div>
          <motion.div
            className="portrait-frame"
            style={{ rotateX: portraitRotateX, rotateY: portraitRotateY, transformPerspective: 1000 }}
            onPointerMove={(event) => {
              if (reduced || event.pointerType === "touch") return;
              const rect = event.currentTarget.getBoundingClientRect();
              rawPortraitX.set(((event.clientY - rect.top) / rect.height - 0.5) * -5);
              rawPortraitY.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
            }}
            onPointerLeave={() => { rawPortraitX.set(0); rawPortraitY.set(0); }}
          >
            {isPublicAssetUrl(siteConfig.portrait) ? <Image src={siteConfig.portrait} alt="Portrait of Syed Mughees Ali" width={800} height={1000} priority unoptimized/> : <div className="portrait-placeholder" role="img" aria-label="Portrait pending"><span>SMA</span><small>Professional portrait pending</small></div>}
            <span className="portrait-sheen" aria-hidden="true" />
          </motion.div>
          <div className="portrait-label label-role"><span>Current</span>Full-Stack Developer<br/><strong className="company-name">Disc & Drive</strong></div>
          <div className="portrait-label label-location"><MapPin size={15}/>{siteConfig.location}</div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#snapshot"><span>Scroll to profile</span><ArrowDown size={16}/></a>
    </section>
  );
}
