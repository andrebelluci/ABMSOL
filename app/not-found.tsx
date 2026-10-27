import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col justify-center px-6">
      <Image
        src="/logo/mark-simple.svg"
        alt=""
        width={64}
        height={64}
        unoptimized
      />
      <h1 className="mt-6 max-w-xl text-h2 text-ink">Esta página não está no mapa.</h1>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-12 items-center text-mint"
        data-cursor="link"
        data-cursor-label="Início"
        data-cursor-theme="dark"
      >
        Voltar ao início
      </Link>
    </main>
  )
}
