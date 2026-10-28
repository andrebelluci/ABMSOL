import { aboutPage, aboutSteps } from '@/lib/content/about'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
    title: 'O método do estúdio de tecnologia em Rio Preto | ABMSOL',
    description:
      'Site, sistema e suporte com o mesmo parceiro. Seis etapas, do diagnóstico ao cuidado contínuo, para quem está em Rio Preto ou chama de outro lugar.',
    path: '/sobre/',
    ogImage: '/images/og-image.webp',
  })

export default function SobrePage() {
  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <p className="font-mono text-label uppercase text-mint">Sobre</p>
        <h1 className="mt-3 max-w-3xl text-h2">{aboutPage.title}</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {aboutPage.lead}
        </p>
        <ol className="mt-12 max-w-2xl">
          {aboutSteps.map((step) => (
            <li key={step.index} className="border-t border-line py-6">
              <p className="font-mono text-label uppercase text-mint">{step.index}</p>
              <h2 className="mt-2 font-display text-lead font-semibold">{step.title}</h2>
              <p className="is-muted mt-2 text-body" data-cursor-avoid="">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
