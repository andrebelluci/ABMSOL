import Image from 'next/image'
import Link from 'next/link'

import { projectCaseLabel, type Project } from '@/lib/content/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="project-row"
      data-reveal
      data-cursor="card"
      data-cursor-label="Ver o case"
      data-cursor-theme="dark"
    >
      <div className="project-row-copy">
        <p className="font-mono text-label uppercase text-mint">{projectCaseLabel}</p>
        <p className="is-muted mt-3 font-mono text-label uppercase">
          {project.index} {project.kind}
        </p>
        <h3 className="mt-3 text-h2">{project.name}</h3>
        <p className="is-muted mt-4 max-w-xl text-body" data-cursor-avoid="">
          {project.summary}
        </p>
        <Link
          href={`/portfolio/${project.slug}/`}
          className="mt-6 inline-flex min-h-12 items-center text-mint"
          data-cursor="link"
          data-cursor-label="Ver o case"
          data-cursor-theme="dark"
        >
          Ver o case
        </Link>
      </div>
      {project.cover ? (
        <Link
          href={`/portfolio/${project.slug}/`}
          className="project-row-media"
          data-cursor="card"
          data-cursor-label={project.name}
          data-cursor-theme="dark"
          aria-label={`Abrir case ${project.name}`}
        >
          <Image
            src={project.cover}
            alt=""
            width={960}
            height={640}
            className="project-row-image"
            unoptimized
          />
        </Link>
      ) : null}
    </article>
  )
}
