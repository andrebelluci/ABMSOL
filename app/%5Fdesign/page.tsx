import type { Metadata } from 'next'
import Image from 'next/image'
import { Wordmark } from '@/components/brand/Wordmark'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SUN_NODES, SUN_RAYS } from '@/components/sun/sun-geometry'
import { FONT_BUDGET } from '@/lib/font-budget'

export const metadata: Metadata = {
  title: 'Sistema de design — ABMSOL',
  robots: { index: false, follow: false },
}

const swatches = [
  ['navy-900', 'bg-navy-900', 'text-ink'],
  ['navy-800', 'bg-navy-800', 'text-ink'],
  ['gold', 'bg-gold', 'text-navy-900'],
  ['mint', 'bg-mint', 'text-navy-900'],
  ['ink', 'bg-ink', 'text-navy-900'],
  ['paper', 'bg-paper', 'text-navy-900'],
] as const

const markSizes = [16, 32, 48, 110, 512] as const

function kb(bytes: number) {
  return `${(bytes / 1024).toFixed(1).replace('.', ',')} KB`
}

export default function DesignSystemPage() {
  const siteFonts = FONT_BUDGET.families.filter((font) => font.name !== 'Rajdhani')

  return (
    <main>
      <Section>
        <p className="font-mono text-label uppercase text-mint">Fase 01 · prova interna</p>
        <h1 className="mt-3 max-w-3xl text-balance text-h2">Sistema de design</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead">
          Tokens, tipo e marca. Sem chrome, sem hero e sem seções do site.
          A escolha do wordmark continua com o André.
        </p>
      </Section>

      <Section tone="raised">
        <SectionHeading index="01" label="Cor" title="Tokens">
          Marinho de fundo, dourado e menta só como acento. Dourado sobre paper não é texto.
        </SectionHeading>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {swatches.map(([name, bg, fg]) => (
            <li key={name} className={`flex h-24 items-end p-3 ${bg} ${fg}`}>
              <span className="font-mono text-label uppercase">{name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading index="02" label="Tipo" title="Escala">
          Syne nos títulos, Instrument Sans no texto, JetBrains Mono nos rótulos.
        </SectionHeading>
        <div className="mt-8 w-full max-w-[375px] border border-line p-4">
          <p className="font-mono text-label uppercase text-mint">375 px</p>
          <p className="mt-3 font-display text-display text-ink">Tecnologia com acabamento</p>
        </div>
        <p className="mt-8 font-display text-h2">Título de seção</p>
        <p className="mt-4 text-lead">Texto de apoio, na escala lead.</p>
        <p className="mt-4 text-body">Corpo em um rem, entrelinha 1,65.</p>
        <p className="mt-4 font-mono text-label uppercase text-mint">01 rótulo</p>
        <p className="is-muted mt-6 text-sm">
          Três famílias no site:{' '}
          {FONT_BUDGET.measured
            ? `${kb(FONT_BUDGET.siteBytes)} de woff2 latin (teto 90 KB).`
            : 'peso ainda não medido.'}
        </p>
        {siteFonts.length > 0 ? (
          <ul className="is-muted mt-2 font-mono text-sm">
            {siteFonts.map((font) => (
              <li key={font.name}>
                {font.name} · {kb(font.bytes)}
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section tone="paper">
        <SectionHeading index="03" label="Papel" title="Seção invertida">
          Texto marinho sobre paper. O dourado fica de fora desta superfície.
        </SectionHeading>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>WhatsApp</Button>
          <Button variant="secondary">Secundário</Button>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeading index="04" label="Marca" title="Wordmark A ou B">
          O padrão proposto é B. A decisão final é do André, depois destas duas amostras.
        </SectionHeading>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <figure className="border border-line p-6">
            <figcaption className="font-mono text-label uppercase text-mint">
              A · Rajdhani Medium, texto vivo
            </figcaption>
            <p
              className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none text-mint"
              style={{
                fontFamily: 'var(--font-rajdhani-sample), sans-serif',
                letterSpacing: '0.09375em',
              }}
            >
              ABMSOL
            </p>
            <p className="is-muted mt-6 text-sm">
              {FONT_BUDGET.measured
                ? `${kb(FONT_BUDGET.rajdhaniBytes)} de woff2 latin, um peso. Não entra no layout do site.`
                : 'Peso do woff2 ainda não medido.'}
            </p>
          </figure>
          <figure className="border border-line p-6">
            <figcaption className="font-mono text-label uppercase text-mint">
              B · SVG em curvas · padrão
            </figcaption>
            <Wordmark className="mt-6 h-16 w-auto max-w-full" />
            <p className="is-muted mt-6 text-sm">
              {FONT_BUDGET.measured
                ? `${kb(FONT_BUDGET.wordmarkBytes)} em curvas no HTML, sem arquivo de fonte.`
                : 'Peso do SVG ainda não medido.'}
            </p>
          </figure>
        </div>
      </Section>

      <Section>
        <SectionHeading index="05" label="Sol" title="Marca simplificada">
          {`${SUN_NODES.length} nós no circuito e ${SUN_RAYS.length} raios cardeais, medidos no vetor. A versão pequena é o anel, os quatro raios e os quatro nós da ponta.`}
        </SectionHeading>
        <div className="mt-8 flex flex-wrap items-end gap-8">
          {markSizes.map((size) => (
            <figure key={`simple-${size}`}>
              <Image
                src="/logo/mark-simple.svg"
                width={size}
                height={size}
                alt=""
                unoptimized
              />
              <figcaption className="is-muted mt-2 font-mono text-label uppercase">
                {size} px
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="is-muted mt-6 max-w-2xl text-sm">
          Em 32 px os nós da ponta ficam com cerca de 2 px. Em 48 e 110 a cruz e os nós se leem.
          A aprovação visual é do André.
        </p>
        <div className="mt-10 flex flex-wrap items-end gap-8">
          {[16, 32, 512].map((size) => (
            <figure key={`mark-${size}`}>
              <Image src="/logo/mark.svg" width={size} height={size} alt="" unoptimized />
              <figcaption className="is-muted mt-2 font-mono text-label uppercase">
                sol {size} px
              </figcaption>
            </figure>
          ))}
        </div>
        <Image
          src="/logo/mark-lockup.svg"
          alt="ABMSOL"
          width={733}
          height={155}
          unoptimized
          className="mt-10 h-24 w-auto max-w-full"
        />
      </Section>
    </main>
  )
}
