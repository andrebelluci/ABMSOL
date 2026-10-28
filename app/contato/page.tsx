import { ContactComposer } from '@/components/pages/ContactComposer'
import { contactPage } from '@/lib/content/contact'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
    title: 'Conversar no WhatsApp sobre site ou suporte | ABMSOL',
    description:
      'Escolha sites, suporte, plano mensal ou um diagnóstico gratuito. A mensagem abre no WhatsApp, com o contexto que você quiser escrever nesta conversa.',
    path: '/contato/',
    ogImage: '/images/og-image.webp',
  })

export default function ContatoPage() {
  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <p className="font-mono text-label uppercase text-mint">Contato</p>
        <h1 className="mt-3 max-w-3xl text-h2">{contactPage.title}</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {contactPage.lead}
        </p>
        <ContactComposer />
      </div>
    </main>
  )
}
