import { ArrowRight, AtSign, Code2, Database, ExternalLink, GraduationCap, Mail, MapPin, ServerCog } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { PageEnhancements } from "@/components/PageEnhancements";
import { Reveal } from "@/components/Reveal";
import { ExperienceProgress, ProjectSequence } from "@/components/ScrollStories";
import { isPublicUrl, siteConfig } from "@/lib/site";

const snapshot = [
  { label: "Current role", value: "Full-Stack Developer", detail: "Disc & Drive" },
  { label: "Education", value: "Software Engineering", detail: "Bahria University" },
  { label: "Primary focus", value: "Full-Stack Development", detail: "Web applications, databases & APIs" },
  { label: "Availability", value: "Junior Development Roles", detail: "Internships & suitable opportunities" },
];

const responsibilities = [
  "Contribute to the development and maintenance of full-stack web applications.",
  "Work on responsive front-end interfaces and application functionality.",
  "Support back-end logic and database-related operations.",
  "Contribute to API integration and data handling.",
  "Investigate and debug application issues.",
  "Support performance and user-experience improvements.",
];

const capabilities = [
  { number: "01", title: "Core development", icon: Code2, lead: "Building functional, data-aware applications from interface to implementation.", items: ["C#", "Python", "SQL", "Full-Stack Development", "Web Development", "API Integration"] },
  { number: "02", title: "Development concepts", icon: ServerCog, lead: "Working methodically across application layers and the issues between them.", items: ["Front-End Development", "Back-End Logic", "Responsive Design", "Database Design", "Debugging", "Problem-Solving", "Performance Improvement"] },
  { number: "03", title: "Current learning", icon: Database, lead: "Expanding a software-engineering foundation into modern .NET and data disciplines.", items: ["Blazor", "Artificial Intelligence", "Machine Learning", "Data Science"] },
];

const process = [
  ["01", "Understand", "I identify the user, problem and application requirements."],
  ["02", "Plan", "I structure the interface, data flow and database requirements."],
  ["03", "Build", "I develop responsive interfaces and functional application features."],
  ["04", "Test", "I debug functionality, test responsiveness and review usability."],
  ["05", "Improve", "I use feedback and testing to refine the solution."],
];

const certifications = [
  { title: "Machine Learning for All", issuer: "University of London through Coursera", date: "July 2026" },
  { title: "Foundations of Data Science", issuer: "Google through Coursera", date: "June 2026" },
];

function SectionLabel({ index, children, inverse = false }: { index: string; children: React.ReactNode; inverse?: boolean }) {
  return <p className={`section-label ${inverse ? "inverse" : ""}`}><span>{index}</span>{children}</p>;
}

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org", "@type": "Person", name: siteConfig.name,
    jobTitle: siteConfig.role, email: `mailto:${siteConfig.email}`, address: { "@type": "PostalAddress", addressLocality: "Karachi", addressRegion: "Sindh", addressCountry: "PK" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Bahria University" }, sameAs: [siteConfig.linkedIn, ...(isPublicUrl(siteConfig.github) ? [siteConfig.github] : [])],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navigation />
      <PageEnhancements />
      <main id="main-content">
        <Hero />

        <section id="snapshot" className="snapshot section-light" aria-label="Recruiter snapshot">
          <div className="snapshot-grid">
            {snapshot.map((item, index) => <Reveal className="snapshot-item" delay={index * 0.05} key={item.label}><span className="snapshot-index">0{index + 1}</span><p>{item.label}</p><h2>{item.value}</h2><small>{item.detail}</small></Reveal>)}
          </div>
        </section>

        <section id="about" data-section className="about section-light section-pad">
          <div className="section-shell about-grid">
            <Reveal className="about-statement"><SectionLabel index="01">Profile</SectionLabel><h2>Building practical software.<br/><em>Learning through real work.</em></h2></Reveal>
            <Reveal className="about-copy" delay={0.08}>
              <p className="lead">I am a Software Engineering student at Bahria University and currently work in a full-stack development role at Disc & Drive.</p>
              <p>My practical experience includes contributing to responsive front-end interfaces, back-end logic, database operations, API integration, debugging and application improvement.</p>
              <p>My current technical foundation includes C#, Python, SQL, full-stack web development, database design and structured problem-solving.</p>
              <p>I am also developing foundational knowledge in machine learning and data science through formal coursework. My primary career focus is software engineering and full-stack application development.</p>
              <dl className="profile-facts"><div><dt>Current focus</dt><dd>Full-stack applications</dd></div><div><dt>Career direction</dt><dd>Software engineering</dd></div><div><dt>Location</dt><dd>Karachi, Pakistan</dd></div></dl>
            </Reveal>
          </div>
        </section>

        <section id="experience" data-section className="experience section-dark section-pad">
          <div className="section-shell">
            <Reveal className="section-intro"><SectionLabel index="02" inverse>Experience</SectionLabel><h2>Professional experience,<br/>grounded in delivery.</h2><p>A growing practice across interfaces, application logic, data and iterative improvement.</p></Reveal>
            <div className="experience-layout">
              <ExperienceProgress />
              <Reveal className="experience-role">
                <div className="role-meta"><span>June 2026 — Present</span><span>Karachi, Sindh, Pakistan</span></div>
                <div className="role-heading"><p>Disc & Drive</p><h3>Full-Stack Developer</h3></div>
              </Reveal>
              <ol className="responsibility-list">
                {responsibilities.map((item, index) => <li key={item}><Reveal delay={index * 0.04}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></Reveal></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section id="projects" data-section className="projects section-light section-pad">
          <div className="section-shell">
            <Reveal className="section-intro dark-text"><SectionLabel index="03">Selected work</SectionLabel><h2>Work deserves context,<br/>not placeholder claims.</h2><p>Only verified repositories, deployed applications and accurate technical decisions will be published here.</p></Reveal>
            <div className="project-preview">
              <ProjectSequence />
              <Reveal className="project-copy" delay={0.08}>
                <p className="eyebrow">Project archive / In preparation</p>
                <h3>Detailed project case studies are being prepared.</h3>
                <p>Verified repositories and deployed applications will appear here. Each case study will document the problem, Syed’s role, the implementation, and what was learned—without invented metrics or filler.</p>
                {isPublicUrl(siteConfig.github) ? <a className="button button-dark" href={siteConfig.github} target="_blank" rel="noreferrer">View GitHub <ExternalLink size={17}/></a> : <span className="config-note">GitHub profile pending verification</span>}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="capabilities" data-section className="capabilities section-paper section-pad">
          <div className="section-shell">
            <Reveal className="capability-header"><SectionLabel index="04">Capabilities</SectionLabel><h2>Technical range,<br/><em>structured by application.</em></h2><p>No ratings or percentages—just the confirmed areas being used and developed.</p></Reveal>
            <div className="capability-list">{capabilities.map((group, index) => { const Icon = group.icon; return <Reveal className="capability-row" delay={index * 0.06} key={group.title}><span className="cap-number">{group.number}</span><div className="cap-title"><Icon/><h3>{group.title}</h3></div><p>{group.lead}</p><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></Reveal>; })}</div>
          </div>
        </section>

        <section className="process section-dark section-pad" aria-labelledby="process-title">
          <div className="section-shell">
            <Reveal className="section-intro"><SectionLabel index="05" inverse>Development approach</SectionLabel><h2 id="process-title">A clear path from<br/>requirement to refinement.</h2></Reveal>
            <div className="process-list">{process.map(([number, title, copy], index) => <Reveal className="process-step" delay={index * 0.05} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
          </div>
        </section>

        <section className="credentials section-light section-pad" aria-labelledby="credentials-title">
          <div className="section-shell credential-grid">
            <Reveal className="education-block"><SectionLabel index="06">Education</SectionLabel><GraduationCap size={34}/><p>Bahria University</p><h2 id="credentials-title">Software Engineering</h2><span>September 2023 — May 2027</span><div className="education-note">Formal study supporting a practical full-stack development path.</div></Reveal>
            <div className="certification-rail"><Reveal><p className="eyebrow">Confirmed credentials</p><h3>Continuous learning,<br/>documented precisely.</h3></Reveal>{certifications.map((cert, index) => <Reveal className="credential-item" delay={index * 0.06} key={cert.title}><span>0{index + 1}</span><div><h4>{cert.title}</h4><p>{cert.issuer}</p></div><time>{cert.date}</time></Reveal>)}</div>
          </div>
        </section>

        <section id="contact" data-section className="contact section-dark">
          <div className="contact-grid-pattern" aria-hidden="true" />
          <div className="section-shell contact-layout">
            <Reveal><SectionLabel index="07" inverse>Start a conversation</SectionLabel><h2>Let’s build<br/><em>something useful.</em></h2></Reveal>
            <Reveal className="contact-copy" delay={0.08}><p>I am open to junior software-development roles, internships and relevant project opportunities. Feel free to contact me regarding a suitable opportunity or professional collaboration.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${siteConfig.email}`}>Email me <Mail size={18}/></a><a className="button button-ghost" href={siteConfig.linkedIn} target="_blank" rel="noreferrer">Connect on LinkedIn <AtSign size={18}/></a>{isPublicUrl(siteConfig.github) && <a className="text-link" href={siteConfig.github} target="_blank" rel="noreferrer">View GitHub <ArrowRight size={17}/></a>}</div></Reveal>
            <Reveal className="contact-details" delay={0.12}><a href={`mailto:${siteConfig.email}`}><Mail/><span><small>Email</small>{siteConfig.email}</span></a><a href={siteConfig.linkedIn} target="_blank" rel="noreferrer"><AtSign/><span><small>LinkedIn</small>syedmugheesali</span></a><div><MapPin/><span><small>Location</small>{siteConfig.location}</span></div></Reveal>
          </div>
        </section>
      </main>
      <footer><div><a className="wordmark footer-mark" href="#home"><span>SMA</span><small>Full-Stack Developer</small></a><p>Designed and built for clarity, credibility and useful work.</p></div><div><span>© {new Date().getFullYear()} Syed Mughees Ali</span><a href="#home">Back to top ↑</a></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
