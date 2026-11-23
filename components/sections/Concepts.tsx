import { MarkRay } from '@/components/brand/MarkRay'
import Link from 'next/link'
import { ProjectCard } from '@/components/pages/ProjectCard'
import { Reveal } from '@/components/sections/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredProjects, projectsSection, publishedProjects } from '@/lib/content/projects'

export function Concepts() {
  const featured = featuredProjects()
  const total = publishedProjects().length

  return (
    <section id="projetos" className="home-section home-anchor" data-cursor-theme="dark">
      <MarkRay place="section" />
      <Reveal>
        <div className="mx-auto w-full max-w-page py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
          <div data-reveal data-cursor-avoid="">
            <SectionHeading
              index={projectsSection.index}
              label={projectsSection.label}
              title={projectsSection.title}
            >
              {projectsSection.lead}
            </SectionHeading>
            <p className="mt-4 font-mono text-label uppercase text-mint">
              {total} {total === 1 ? 'case publicado' : 'cases publicados'}
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-16">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div data-reveal>
            <Link
              href="/projetos/"
              className="mt-12 inline-flex min-h-12 items-center text-mint"
              data-cursor="link"
              data-cursor-label="Projetos"
              data-cursor-theme="dark"
            >
              Abrir a página de projetos
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
