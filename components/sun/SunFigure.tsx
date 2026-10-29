import Image from 'next/image'

/** Desenho oficial, sem texto: docs/assets/logo_desenho_svg.svg → public/logo/mark.svg */
export function SunFigure() {
  return (
    <div className="hero-sun" data-sun-root aria-hidden="true">
      <Image
        src="/logo/mark.svg"
        alt=""
        width={1536}
        height={1548}
        unoptimized
        priority
        fetchPriority="high"
        className="h-full w-full object-contain"
      />
    </div>
  )
}
