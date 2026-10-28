import ReactMarkdown from 'react-markdown'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { getLegalDocument } from '@/lib/content'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
    title: 'Privacidade da visita e da conversa no WhatsApp | ABMSOL',
    description:
      'O contato é pelo WhatsApp e a conversa fica lá. Esta versão não grava identificador de visita no navegador e segue boas práticas de privacidade.',
    path: '/privacidade/',
    ogImage: '/images/og-image.webp',
  })

export default function PrivacidadePage() {
  const document = getLegalDocument('politica-de-privacidade')

  return (
    <LegalPageLayout document={document}>
      <ReactMarkdown>{document.body}</ReactMarkdown>
    </LegalPageLayout>
  )
}
