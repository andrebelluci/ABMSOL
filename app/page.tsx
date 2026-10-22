import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

/** Página mínima da Fase 0. Hero e seções entram nas fases 03 e 04. */
export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center bg-off-white px-6 md:px-[8vw]">
      <h1 className="font-display text-section-title font-light text-text">
        {SITE_NAME} — {SITE_TAGLINE}
      </h1>
    </main>
  )
}
