import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="lost flex min-h-[70vh] flex-col justify-center px-6" data-cursor-theme="dark">
      <div className="lost-sun" aria-hidden="true">
        <span className="lost-trail lost-trail-a" />
        <Image
          src="/logo/mark.svg"
          alt=""
          width={96}
          height={96}
          unoptimized
          className="lost-mark object-contain"
        />
        <span className="lost-trail lost-trail-b" />
      </div>
      <h1 className="mt-8 max-w-xl text-h2 text-ink">Esta página não está no mapa.</h1>
      <p className="is-muted mt-4 max-w-md text-body">O sol ficou sem a trilha. O início liga de novo.</p>
      <Link
        href="/"
        className="lost-return mt-8 inline-flex min-h-12 items-center text-mint"
        data-cursor="link"
        data-cursor-label="Início"
        data-cursor-theme="dark"
      >
        Voltar ao início
      </Link>
    </main>
  )
}
