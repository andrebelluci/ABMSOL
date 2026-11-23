import Image from 'next/image'
import Link from 'next/link'

import { FooterWhatsApp } from '@/components/layout/FooterWhatsApp'
import { socialChannels } from '@/lib/contact'
import { NAV_ITEMS } from '@/lib/nav'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer
      className="border-t border-line bg-navy-900 px-4 py-16 lg:px-8"
      data-cursor-theme="dark"
      data-cta-final=""
    >
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="flex items-end gap-4" aria-hidden>
              <span className="mb-3 h-14 w-px bg-gold" />
              <Image
                src="/logo/mark.svg"
                alt=""
                width={48}
                height={48}
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="mt-5 font-display text-lead font-semibold text-ink">ABMSOL</p>
            <p className="is-muted mt-2 max-w-[28ch] text-body">
              Site, sistema e suporte com um parceiro só.
            </p>
            <FooterWhatsApp />
          </div>

          <nav className="footer-nav" aria-label="Rodapé">
            <p className="font-mono text-label uppercase text-mint">Índice</p>
            <ul className="mt-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-12 items-center gap-3 text-ink"
                    data-cursor="link"
                    data-cursor-label={item.label}
                    data-cursor-theme="dark"
                  >
                    <span className="font-mono text-label text-mint">{item.index}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contato/"
                  className="inline-flex min-h-12 items-center gap-3 text-ink"
                  data-cursor="link"
                  data-cursor-label="Contato"
                  data-cursor-theme="dark"
                >
                  <span className="font-mono text-label text-mint">05</span>
                  <span>Contato</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer-meta">
            <p className="font-mono text-label uppercase text-mint">Onde</p>
            <p className="mt-4 text-body text-ink">
              Rio Preto (SP)
              <span className="is-muted mt-1 block">atendimento online em todo o Brasil</span>
            </p>
            <Link
              href="/privacidade/"
              className="mt-6 inline-flex min-h-12 items-center text-mint"
              data-cursor="link"
              data-cursor-label="Privacidade"
              data-cursor-theme="dark"
            >
              Privacidade
            </Link>
          </div>
        </div>

        <div className="footer-signals">
          <p className="footer-signals-label" id="footer-signals-label">
            Sinais
          </p>
          <ul className="footer-signals-list" aria-labelledby="footer-signals-label">
            {socialChannels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  className="footer-signal"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label={channel.label}
                  data-cursor-theme="dark"
                >
                  <span className="footer-signal-id" aria-hidden>
                    {channel.id}
                  </span>
                  <span className="footer-signal-handle">{channel.handle}</span>
                  <span className="sr-only">
                    {channel.label} (abre em nova aba)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="is-muted mt-10 border-t border-line pt-6 font-mono text-label">
          © {year} ABMSOL
        </p>
      </div>
    </footer>
  )
}
