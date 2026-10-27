import { Rajdhani } from 'next/font/google'

/** Só nesta rota de prova. Não entra no layout do site nem no orçamento das 3 famílias. */
const rajdhaniSample = Rajdhani({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-rajdhani-sample',
  adjustFontFallback: false,
})

export default function DesignSampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={rajdhaniSample.variable}>{children}</div>
}
