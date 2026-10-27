import Image from 'next/image'
import Link from 'next/link'
import { Wordmark } from '@/components/brand/Wordmark'
import { DesktopNav } from '@/components/layout/MobileNav'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 h-14 border-b border-line bg-navy-900 lg:h-16"
      data-cursor-theme="dark"
    >
      <div className="mx-auto flex h-full max-w-page items-center gap-3 px-4 pr-24 lg:px-8 lg:pr-8 xl:max-w-page-wide">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-3"
          data-cursor="link"
          data-cursor-label="Início"
          data-cursor-theme="dark"
          data-cursor-avoid=""
        >
          <Image
            src="/logo/mark-simple.svg"
            alt=""
            width={32}
            height={32}
            unoptimized
          />
          <Wordmark className="h-4 w-auto" />
        </Link>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <DesktopNav />
          <WhatsAppLink source="header" message={WHATSAPP_MESSAGES.site} />
        </div>
      </div>
    </header>
  )
}
