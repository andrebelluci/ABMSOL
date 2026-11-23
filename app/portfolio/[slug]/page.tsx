import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  adjacentProjects,
  getPublishedProject,
  projectCaseLabel,
  publishedProjects,
} from '@/lib/content/projects'
import { createMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return publishedProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getPublishedProject(slug)
  if (!project) return {}

  return {
    ...createMetadata({
      title: project.seoTitle,
      description: project.seoDescription,
      path: `/portfolio/${project.slug}/`,
      ogImage: project.cover ?? '/images/og-image.webp',
    }),
  }
}

export default async function ProjectCasePage({ params }: PageProps) {
  const { slug } = await params
  const project = getPublishedProject(slug)
  if (!project) notFound()

  const { prev, next } = adjacentProjects(project.slug)
  const gallery = project.gallery?.length
    ? project.gallery
    : project.cover
      ? [project.cover]
      : []

  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <article
        className="mx-auto w-full max-w-page xl:max-w-page-wide"
        data-cursor-theme="dark"
      >
        <p className="font-mono text-label uppercase text-mint">{projectCaseLabel}</p>
        <p className="is-muted mt-4 font-mono text-label uppercase">
          {project.index} {project.kind}
          {project.year ? ` · ${project.year}` : ''}
        </p>
        <h1 className="mt-3 max-w-3xl text-h2">{project.name}</h1>
        <p className="is-muted mt-6 max-w-2xl text-lead" data-cursor-avoid="">
          {project.summary}
        </p>

        {project.cover ? (
          <div className="project-case-hero mt-10">
            <Image
              src={project.cover}
              alt=""
              width={1440}
              height={900}
              className="project-case-hero-image"
              priority
              unoptimized
            />
          </div>
        ) : null}

        <div className="project-case-grid mt-12">
          <section>
            <h2 className="font-mono text-label uppercase text-mint">Desafio</h2>
            <p className="is-muted mt-4 max-w-2xl text-body" data-cursor-avoid="">
              {project.challenge}
            </p>
          </section>
          <section>
            <h2 className="font-mono text-label uppercase text-mint">Solução</h2>
            <p className="is-muted mt-4 max-w-2xl text-body" data-cursor-avoid="">
              {project.solution}
            </p>
          </section>
        </div>

        {project.tech?.length ? (
          <section className="mt-12">
            <h2 className="font-mono text-label uppercase text-mint">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="border border-line px-3 py-2 font-mono text-label text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {gallery.length > 1 ? (
          <section className="mt-12">
            <h2 className="font-mono text-label uppercase text-mint">Telas</h2>
            <div className="project-case-gallery mt-6">
              {gallery.map((src) => (
                <figure key={src} className="project-case-shot">
                  <Image
                    src={src}
                    alt=""
                    width={1200}
                    height={800}
                    className="project-case-shot-image"
                    unoptimized
                  />
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {project.testimonial ? (
          <figure className="project-case-quote mt-14">
            <blockquote className="text-lead text-ink" data-cursor-avoid="">
              “{project.testimonial.quote}”
            </blockquote>
            <figcaption className="is-muted mt-4 font-mono text-label">
              — {project.testimonial.attribution}
            </figcaption>
          </figure>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center bg-gold px-5 font-display font-semibold text-navy-900"
              data-cursor="link"
              data-cursor-label="Abrir"
              data-cursor-theme="dark"
            >
              Abrir o projeto
            </a>
          ) : null}
          <Link
            href="/projetos/"
            className="inline-flex min-h-12 items-center text-mint"
            data-cursor="link"
            data-cursor-label="Projetos"
            data-cursor-theme="dark"
          >
            Todos os cases
          </Link>
        </div>

        <nav
          className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between"
          aria-label="Navegação entre cases"
        >
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}/`}
              className="inline-flex min-h-12 flex-col justify-center text-ink"
              data-cursor="link"
              data-cursor-label={prev.name}
              data-cursor-theme="dark"
            >
              <span className="font-mono text-label uppercase text-mint">Anterior</span>
              <span className="mt-1">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/portfolio/${next.slug}/`}
              className="inline-flex min-h-12 flex-col justify-center text-ink sm:items-end"
              data-cursor="link"
              data-cursor-label={next.name}
              data-cursor-theme="dark"
            >
              <span className="font-mono text-label uppercase text-mint">Próximo</span>
              <span className="mt-1">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  )
}
