import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { WhatsAppBar } from '@/components/layout/WhatsAppBar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="skip-link"
        data-cursor="link"
        data-cursor-label="Pular"
        data-cursor-theme="dark"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <MobileNav />
      <div id="page-root" className="pt-14 lg:pt-16">
        <div id="conteudo">{children}</div>
        <Footer />
      </div>
      <WhatsAppBar />
    </>
  )
}
