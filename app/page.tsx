import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

/** Página mínima da Fase 0. Hero e seções entram nas fases 03 e 04. */
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center bg-navy-900 px-6 md:px-[8vw]">
      <h1 className="text-h2 text-ink">
        {SITE_NAME} — {SITE_TAGLINE}
      </h1>
    </main>
  )
}
