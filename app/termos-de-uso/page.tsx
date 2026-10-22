import ReactMarkdown from 'react-markdown'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { getLegalDocument } from '@/lib/content'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Termos de Uso',
  description: 'Termos de uso do site.',
  path: '/termos-de-uso',
})

export default function TermosDeUsoPage() {
  const document = getLegalDocument('termos-de-uso')

  return (
    <LegalPageLayout document={document}>
      <ReactMarkdown>{document.body}</ReactMarkdown>
    </LegalPageLayout>
  )
}
