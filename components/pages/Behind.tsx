import Image from 'next/image'

import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import {
  behindManifesto,
  behindName,
  behindNameOrigin,
  behindPage,
  behindPhoto,
  behindPhotoAlt,
  behindPrinciples,
  behindRole,
  behindTimeline,
} from '@/lib/content/behind'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export function Behind() {
  return (
    <section className="mt-24 border-t border-line pt-16" aria-labelledby="por-tras">
      <p className="font-mono text-label uppercase text-mint">Institucional</p>
      <h2 id="por-tras" className="mt-3 max-w-3xl text-h2">
        {behindPage.title}
      </h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(14rem,18rem)_1fr] lg:items-start">
        <figure className="portrait-frame">
          <Image
            src={behindPhoto}
            alt={behindPhotoAlt}
            width={720}
            height={720}
            className="portrait-image"
            sizes="(min-width: 1024px) 18rem, 100vw"
            priority={false}
          />
        </figure>
        <div>
          <p className="font-mono text-label uppercase text-gold">{behindName}</p>
          <p className="is-muted mt-2 text-body">{behindRole}</p>
          <p className="mt-6 max-w-xl font-display text-lead text-ink" data-cursor-avoid="">
            {behindPage.line}
          </p>
        </div>
      </div>

      <h3 className="mt-16 max-w-3xl font-display text-lead font-semibold">
        {behindPage.nameOriginTitle}
      </h3>
      <p className="is-muted mt-4 max-w-2xl text-body" data-cursor-avoid="">
        {behindNameOrigin}
      </p>

      <h3 className="mt-16 max-w-3xl font-display text-lead font-semibold">
        {behindPage.manifestoTitle}
      </h3>
      <p className="is-muted mt-4 max-w-2xl text-body" data-cursor-avoid="">
        {behindManifesto}
      </p>

      <h3 className="mt-16 font-display text-lead font-semibold">Trajetória</h3>
      <ol className="mt-6 max-w-2xl">
        {behindTimeline.map((step) => (
          <li key={`${step.period}-${step.title}`} className="border-t border-line py-6">
            <p className="font-mono text-label uppercase text-mint">{step.period}</p>
            <p className="mt-2 font-display text-body font-semibold">{step.title}</p>
            <p className="is-muted mt-2 text-body">{step.body}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-16 font-display text-lead font-semibold">Como o estúdio trabalha</h3>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {behindPrinciples.map((item) => (
          <li key={item.title} className="principle">
            <h4 className="font-display text-body font-semibold">{item.title}</h4>
            <p className="is-muted mt-2 text-body" data-cursor-avoid="">
              {item.body}
            </p>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 max-w-xl font-display text-h2">{behindPage.close}</h3>
      <WhatsAppLink source="sobre" message={WHATSAPP_MESSAGES.site} className="mt-8">
        Falar no WhatsApp
      </WhatsAppLink>
    </section>
  )
}
