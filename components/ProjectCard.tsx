"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ImageOff } from "lucide-react";
import { GitHubIcon } from "@/components/GitHubIcon";
import type { PortfolioProject } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="project-card">
      <div className="project-image">
        {imageFailed ? (
          <div className="project-image-fallback" role="img" aria-label={`Screenshot unavailable for ${project.title}`}><ImageOff /><span>Screenshot unavailable</span></div>
        ) : (
          <Image src={project.image} alt={`${project.title} application screenshot`} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" onError={() => setImageFailed(true)} />
        )}
        <span className="project-status">{project.status}</span>
      </div>
      <div className="project-card-body">
        <p className="project-index">{String(index + 1).padStart(2, "0")} / Featured project</p>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        <ul className="project-tags" aria-label={`${project.title} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <div className="project-actions">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}><GitHubIcon size={17} /> View code</a>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo (opens in a new tab)`}>Live demo <ExternalLink size={16} /></a>}
        </div>
      </div>
    </article>
  );
}
