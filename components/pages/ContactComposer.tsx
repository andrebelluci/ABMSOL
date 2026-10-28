'use client'

import { useMemo, useState } from 'react'
import { contactOptions, contactPage } from '@/lib/content/contact'
import { trackWhatsAppClick, whatsappHref } from '@/lib/whatsapp'

export function ContactComposer() {
  const [optionId, setOptionId] = useState<(typeof contactOptions)[number]['id']>(
    contactOptions[0].id,
  )
  const [context, setContext] = useState('')

  const option = contactOptions.find((item) => item.id === optionId) ?? contactOptions[0]
  const href = useMemo(() => {
    const note = context.trim()
    const message = note ? `${option.message}\n\n${note}` : option.message
    return whatsappHref(message)
  }, [context, option.message])

  return (
    <div className="mt-10 max-w-xl">
      <label className="block text-body text-ink" htmlFor="assunto">
        Assunto
      </label>
      <select
        id="assunto"
        className="contact-field mt-2"
        value={optionId}
        data-cursor="hide"
        onChange={(event) =>
          setOptionId(event.target.value as (typeof contactOptions)[number]['id'])
        }
      >
        {contactOptions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <label className="mt-6 block text-body text-ink" htmlFor="contexto">
        {contactPage.contextLabel}
      </label>
      <p className="is-muted mt-1 text-body" id="contexto-hint">
        {contactPage.contextHint}
      </p>
      <textarea
        id="contexto"
        className="contact-field mt-2 min-h-32"
        maxLength={400}
        value={context}
        aria-describedby="contexto-hint"
        data-cursor="hide"
        onChange={(event) => setContext(event.target.value)}
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-8 inline-flex min-h-12 items-center justify-center rounded-control bg-gold px-5 font-sans text-body font-medium text-navy-900"
        data-cursor="whatsapp"
        data-cursor-label="WhatsApp"
        data-cursor-theme="dark"
        onClick={() => trackWhatsAppClick('contato', option.id)}
      >
        {contactPage.send}
      </a>
    </div>
  )
}
