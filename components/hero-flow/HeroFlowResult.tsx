'use client'

import { trackHeroFlowWhatsAppClick } from '@/lib/analytics'
import {
  buildFlowMessage,
  getNeed,
  getProfile,
  heroFlowUi,
  type NeedId,
  type ProfileId,
} from '@/lib/content/hero-flow/steps'
import { trackWhatsAppClick, whatsappHref } from '@/lib/whatsapp'

export function HeroFlowResult({
  profileId,
  needId,
  onBack,
  onRedo,
  onClose,
}: {
  profileId: ProfileId
  needId: NeedId
  onBack: () => void
  onRedo: () => void
  onClose: () => void
}) {
  const profile = getProfile(profileId)
  const need = getNeed(needId)
  const message = buildFlowMessage(profileId, needId)
  const href = whatsappHref(message)

  return (
    <div className="hero-flow-result">
      <p className="font-mono text-label uppercase text-mint">{heroFlowUi.resultEyebrow}</p>
      <p className="mt-4 max-w-[34ch] text-lead text-ink">{profile.headline}</p>
      <p className="is-muted mt-3 max-w-[36ch] text-body">{need.next}</p>
      <p className="is-muted mt-3 text-body">{heroFlowUi.resultNote}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-8 inline-flex min-h-12 min-w-12 items-center justify-center rounded-control bg-gold px-5 font-sans text-body font-medium text-navy-900"
        data-cursor="whatsapp"
        data-cursor-label="WhatsApp"
        data-cursor-theme="dark"
        onClick={() => {
          trackHeroFlowWhatsAppClick(profileId, needId)
          trackWhatsAppClick('hero-flow', `${profileId}:${needId}`)
        }}
      >
        {heroFlowUi.whatsappResultLabel}
      </a>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <button type="button" className="hero-flow-text-btn" onClick={onBack}>
          {heroFlowUi.backLabel}
        </button>
        <button type="button" className="hero-flow-text-btn" onClick={onRedo}>
          {heroFlowUi.redoLabel}
        </button>
        <button type="button" className="hero-flow-text-btn" onClick={onClose}>
          {heroFlowUi.closeLabel}
        </button>
      </div>
    </div>
  )
}
