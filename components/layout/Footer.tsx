import Image from 'next/image'
import Link from 'next/link'
import { FooterWhatsApp } from '@/components/layout/FooterWhatsApp'

export function Footer() {
  return (
    <footer
      className="border-t border-line bg-navy-900 px-4 py-16 lg:px-8"
      data-cursor-theme="dark"
      data-cta-final=""
    >
      <div className="mx-auto flex w-full max-w-page flex-col items-start xl:max-w-page-wide">
        <div className="flex items-end gap-4" aria-hidden>
          <span className="mb-4 h-16 w-px bg-gold" />
          <Image
            src="/logo/mark.svg"
            alt=""
            width={48}
            height={48}
            unoptimized
            className="object-contain"
          />
        </div>
        <FooterWhatsApp />
        <p className="mt-6 text-body text-ink">
          Rio Preto (SP) · atendimento online em todo o Brasil
        </p>
        <Link
          href="/privacidade/"
          className="mt-4 inline-flex min-h-12 items-center text-mint"
          data-cursor="link"
          data-cursor-label="Privacidade"
          data-cursor-theme="dark"
        >
          Privacidade
        </Link>
      </div>
    </footer>
  )
}
