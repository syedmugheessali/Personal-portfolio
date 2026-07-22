import { AtSign, Code2, Database, ExternalLink, GraduationCap, Mail, MapPin, ServerCog } from "lucide-react";
import { CertificateCarousel } from "@/components/CertificateCarousel";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { PageEnhancements } from "@/components/PageEnhancements";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ExperienceProgress } from "@/components/ScrollStories";
import { GitHubIcon } from "@/components/GitHubIcon";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const snapshot = [
  { label: "Current role", value: "Full Stack Developer", detail: "Disc & Drive" },
  { label: "Education", value: "Software Engineering", detail: "Bahria University" },
  { label: "Primary focus", value: "Full-Stack Development", detail: "Web applications, databases & APIs" },
  { label: "Availability", value: "Junior Development Roles", detail: "Internships & suitable opportunities" },
];

const responsibilities = [
  "Develop and maintain full-stack web applications with responsive interfaces and reliable user experiences.",
  "Build and refine front-end behavior across different screen sizes and common user flows.",
  "Work with back-end logic, database operations, and API integrations as part of application development.",
  "Investigate and resolve application issues while improving functionality, usability, and performance.",
];

const capabilities = [
  { number: "01", title: "Core development", icon: Code2, lead: "Building functional, data-aware applications from interface to implementation.", items: ["C#", "Python", "SQL", "Full-Stack Development", "Web Development", "API Integration"] },
  { number: "02", title: "Development concepts", icon: ServerCog, lead: "Working methodically across application layers and the issues between them.", items: ["Front-End Development", "Back-End Logic", "Responsive Design", "Database Design", "Debugging", "Problem-Solving"] },
  { number: "03", title: "Current learning", icon: Database, lead: "Expanding a software-engineering foundation into modern .NET and data disciplines.", items: ["Blazor", "Artificial Intelligence", "Machine Learning", "Data Science"] },
];

const process = [
  ["01", "Understand", "Identify the user, problem, and application requirements."],
  ["02", "Plan", "Structure the interface, data flow, and database requirements."],
  ["03", "Build", "Develop responsive interfaces and functional application features."],
  ["04", "Test", "Debug functionality, test responsiveness, and review usability."],
  ["05", "Improve", "Use feedback and testing to refine the solution."],
];

function SectionLabel({ index, children, inverse = false }: { index: string; children: React.ReactNode; inverse?: boolean }) {
  return <p className={`section-label ${inverse ? "inverse" : ""}`}><span>{index}</span>{children}</p>;
}

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navigation />
      <PageEnhancements />
      <main id="main-content">
        <Hero />

        <section id="projects" data-section className="projects section-light section-pad" aria-labelledby="projects-title">
          <div className="section-shell">
            <Reveal className="section-intro dark-text"><SectionLabel index="01">Featured projects</SectionLabel><h2 id="projects-title">Real applications,<br/>built to be useful.</h2><p>Selected work with verified source code, honest implementation details, and live links only where a deployment exists.</p></Reveal>
            <div className="project-grid">{featuredProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
            <Reveal className="projects-footer"><a className="button button-dark" href={siteConfig.github} target="_blank" rel="noopener noreferrer">View all projects on GitHub <ExternalLink size={17}/></a></Reveal>
          </div>
        </section>

        <section id="snapshot" className="snapshot section-light" aria-label="Recruiter snapshot">
          <div className="snapshot-grid">{snapshot.map((item, index) => <Reveal className="snapshot-item" delay={index * 0.05} key={item.label}><span className="snapshot-index">0{index + 1}</span><p>{item.label}</p><h2>{item.value}</h2><small className={item.detail === "Disc & Drive" ? "company-name" : undefined}>{item.detail}</small></Reveal>)}</div>
        </section>

        <section id="capabilities" data-section className="capabilities section-paper section-pad">
          <div className="section-shell">
            <Reveal className="capability-header"><SectionLabel index="02">Capabilities</SectionLabel><h2>Technical range,<br/><em>structured by application.</em></h2><p>No ratings or percentages—just the confirmed areas being used and developed.</p></Reveal>
            <div className="capability-list">{capabilities.map((group, index) => { const Icon = group.icon; return <Reveal className="capability-row" delay={index * 0.06} key={group.title}><span className="cap-number">{group.number}</span><div className="cap-title"><Icon/><h3>{group.title}</h3></div><p>{group.lead}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>; })}</div>
          </div>
        </section>

        <section id="experience" data-section className="experience section-dark section-pad">
          <div className="section-shell">
            <Reveal className="section-intro"><SectionLabel index="03" inverse>Experience</SectionLabel><h2>Professional experience,<br/>grounded in delivery.</h2><p>Full-stack application work across interfaces, logic, data, testing, and refinement.</p></Reveal>
            <div className="experience-layout">
              <ExperienceProgress />
              <Reveal className="experience-role"><div className="role-meta"><span>June 2026 — Present</span><span>Karachi, Pakistan</span></div><div className="role-heading"><p className="company-name on-dark">Disc & Drive</p><h3>Full Stack Developer</h3></div></Reveal>
              <ol className="responsibility-list">{responsibilities.map((item, index) => <li key={item}><Reveal delay={index * 0.04}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></Reveal></li>)}</ol>
            </div>
          </div>
        </section>

        <section id="about" data-section className="about section-light section-pad">
          <div className="section-shell about-grid">
            <Reveal className="about-statement"><SectionLabel index="04">About & education</SectionLabel><h2>Building practical software.<br/><em>Learning through real work.</em></h2><div className="education-card"><GraduationCap size={28}/><p>Bahria University</p><strong>Software Engineering</strong><span>September 2023 — May 2027</span></div></Reveal>
            <Reveal className="about-copy" delay={0.08}>
              <p className="lead">I am a Software Engineering student at Bahria University and currently work as a Full Stack Developer at <strong className="company-name">Disc & Drive</strong>.</p>
              <p>My practical experience covers responsive front-end interfaces, back-end logic, database operations, API integration, debugging, and application improvement.</p>
              <p>My technical foundation includes C#, Python, SQL, full-stack web development, database design, and structured problem-solving. I am also building foundational knowledge in machine learning and data science through formal coursework.</p>
              <dl className="profile-facts"><div><dt>Current focus</dt><dd>Full-stack applications</dd></div><div><dt>Career direction</dt><dd>Software engineering</dd></div><div><dt>Location</dt><dd>Karachi, Pakistan</dd></div></dl>
            </Reveal>
          </div>
        </section>

        <section className="process section-dark section-pad" aria-labelledby="process-title">
          <div className="section-shell"><Reveal className="section-intro"><SectionLabel index="05" inverse>Development approach</SectionLabel><h2 id="process-title">A clear path from<br/>requirement to refinement.</h2></Reveal><div className="process-list">{process.map(([number, title, copy], index) => <Reveal className="process-step" delay={index * 0.05} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div>
        </section>

        <section id="certificates" data-section className="certificates-home section-paper section-pad" aria-labelledby="certificates-title">
          <div className="section-shell">
            <Reveal className="certificate-archive-intro"><div><SectionLabel index="06">Certificates</SectionLabel><h2 id="certificates-title">Verified learning,<br/>always in motion.</h2></div><p>Six original course certificates across development, data science, and machine learning. Open the PDF, download it, or verify completion directly through Coursera.</p></Reveal>
            <CertificateCarousel />
          </div>
        </section>

        <section id="contact" data-section className="contact section-dark">
          <div className="contact-grid-pattern" aria-hidden="true" />
          <div className="section-shell contact-layout">
            <Reveal><SectionLabel index="07" inverse>Start a conversation</SectionLabel><h2>Let’s build<br/><em>something useful.</em></h2></Reveal>
            <Reveal className="contact-copy" delay={0.08}><p>I am open to junior software-development roles, internships, and relevant project opportunities.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${siteConfig.email}`}>Email me <Mail size={18}/></a><a className="button button-ghost" href={siteConfig.linkedIn} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <AtSign size={18}/></a><a className="text-link" href={siteConfig.github} target="_blank" rel="noopener noreferrer">View GitHub <GitHubIcon size={17}/></a></div></Reveal>
            <Reveal className="contact-details" delay={0.12}><a href={`mailto:${siteConfig.email}`}><Mail/><span><small>Email</small>{siteConfig.email}</span></a><a href={siteConfig.linkedIn} target="_blank" rel="noopener noreferrer"><AtSign/><span><small>LinkedIn</small>syedmugheesali</span></a><a href={siteConfig.github} target="_blank" rel="noopener noreferrer"><GitHubIcon size={24}/><span><small>GitHub</small>syedmugheessali</span></a><div><MapPin/><span><small>Location</small>{siteConfig.location}</span></div></Reveal>
          </div>
        </section>
      </main>
      <footer><div><a className="wordmark footer-mark" href="#home"><span>SMA</span><small>Full Stack Developer</small></a><p>Designed and built for clarity, credibility, and useful work.</p></div><div><a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">GitHub</a><span>© {new Date().getFullYear()} Syed Mughees Ali</span><a href="#home">Back to top ↑</a></div></footer>
    </>
  );
}
