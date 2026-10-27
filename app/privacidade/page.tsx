import ReactMarkdown from 'react-markdown'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { getLegalDocument } from '@/lib/content'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Política de Privacidade',
  description: 'Política de privacidade e cookies.',
  path: '/privacidade',
})

export default function PrivacidadePage() {
  const document = getLegalDocument('politica-de-privacidade')

  return (
    <LegalPageLayout document={document}>
      <ReactMarkdown>{document.body}</ReactMarkdown>
    </LegalPageLayout>
  )
}
