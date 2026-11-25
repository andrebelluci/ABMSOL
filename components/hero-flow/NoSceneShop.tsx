'use client'

/** Cena “negocio-solido”: pó some e lâmpada/placa acendem (Etapa 4). */
export function NoSceneShop() {
  return (
    <svg
      className="no-scene-shop"
      viewBox="0 0 120 160"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
    >
      <path data-no-el className="no-shop-stroke" d="M84 92 L100 82 L116 92" />
      <rect data-no-el className="no-shop-stroke" x="86" y="92" width="28" height="40" rx="1.5" />
      <rect data-no-el className="no-shop-stroke" x="96" y="112" width="8" height="20" rx="0.8" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="90" cy="108" r="1.1" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="106" cy="104" r="1.1" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="94" cy="118" r="1" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="110" cy="116" r="1" />
      <circle data-no-el data-no-shop-halo className="no-shop-halo" cx="100" cy="74" r="7" />
      <circle data-no-el data-no-shop-lamp className="no-shop-lamp" cx="100" cy="74" r="2.4" />
      <path data-no-el data-no-shop-sign className="no-shop-sign" d="M94 78 H106" />
    </svg>
  )
}
