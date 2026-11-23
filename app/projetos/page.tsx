import { ProjectCard } from '@/components/pages/ProjectCard'
import { projectsSection, publishedProjects } from '@/lib/content/projects'
import { createMetadata } from '@/lib/seo'

const list = publishedProjects()

export const metadata = createMetadata({
  title: 'Projetos e cases | ABMSOL',
  description:
    'Sites, sistemas e produtos próprios entregues pela ABMSOL. Cases reais, sem número inventado.',
  path: '/projetos/',
  ogImage: '/images/og-image.webp',
})

export default function ProjetosPage() {
  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <p className="font-mono text-label uppercase text-mint">Projetos</p>
        <h1 className="mt-3 max-w-3xl text-h2">{projectsSection.title}</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {projectsSection.lead}
        </p>
        <p className="mt-6 font-mono text-label uppercase text-mint">
          {list.length} {list.length === 1 ? 'case' : 'cases'}
        </p>
        <div className="mt-12 flex flex-col gap-16">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
