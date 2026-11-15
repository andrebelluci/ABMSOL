import Image from 'next/image'
import Link from 'next/link'

import { MarkRay } from '@/components/brand/MarkRay'
import { Reveal } from '@/components/sections/Reveal'
import {
  behindName,
  behindPage,
  behindPhoto,
  behindPhotoAlt,
  behindRole,
} from '@/lib/content/behind'

export function BehindTeaser() {
  return (
    <section
      id="quem-assina"
      className="home-section"
      data-cursor-theme="dark"
      aria-labelledby="quem-assina-title"
    >
      <MarkRay place="section" />
      <Reveal>
        <div className="mx-auto flex w-full max-w-page flex-col justify-start py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
          <div data-reveal className="behind-teaser">
            <figure className="portrait-frame behind-teaser-photo">
              <Image
                src={behindPhoto}
                alt={behindPhotoAlt}
                width={720}
                height={720}
                className="portrait-image"
                sizes="(min-width: 1024px) 14rem, 40vw"
              />
            </figure>
            <div className="behind-teaser-copy">
              <p className="font-mono text-label uppercase text-mint">Quem assina</p>
              <h2 id="quem-assina-title" className="mt-3 max-w-[18ch] text-h2">
                {behindName}
              </h2>
              <p className="is-muted mt-2 text-body">{behindRole}</p>
              <p
                className="mt-6 max-w-[34ch] font-display text-lead text-ink"
                data-cursor-avoid=""
              >
                {behindPage.line}
              </p>
              <Link
                href="/sobre/#por-tras"
                className="mt-8 inline-flex min-h-12 items-center text-mint"
                data-cursor="link"
                data-cursor-label="Conhecer a história"
                data-cursor-theme="dark"
              >
                Conhecer a história →
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
