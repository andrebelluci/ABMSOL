'use client'

/** Cena “negocio-solido”: vitrine de loja — pó some e placa/lâmpada acendem. */
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
      {/* Placa com lâmpada integrada (acima do toldo) */}
      <rect
        data-no-el
        data-no-shop-sign
        className="no-shop-sign"
        x="92"
        y="70"
        width="16"
        height="8"
        rx="1"
      />
      <circle
        data-no-el
        data-no-shop-lamp
        className="no-shop-lamp"
        cx="100"
        cy="74"
        r="2.2"
      />
      <circle
        data-no-el
        data-no-shop-halo
        className="no-shop-halo"
        cx="100"
        cy="74"
        r="6"
      />
      {/* Toldo plano (trapézio) com 3 listras */}
      <path
        data-no-el
        className="no-shop-stroke"
        d="M84 86 L86 78 L114 78 L116 86 Z"
      />
      <path data-no-el className="no-shop-stroke" d="M91 78 V86" />
      <path data-no-el className="no-shop-stroke" d="M100 78 V86" />
      <path data-no-el className="no-shop-stroke" d="M109 78 V86" />
      {/* Corpo + vitrine larga + porta */}
      <rect
        data-no-el
        className="no-shop-stroke"
        x="86"
        y="86"
        width="28"
        height="46"
        rx="1.2"
      />
      <rect
        data-no-el
        className="no-shop-stroke"
        x="89"
        y="92"
        width="22"
        height="18"
        rx="0.8"
      />
      <rect
        data-no-el
        className="no-shop-stroke"
        x="96"
        y="114"
        width="8"
        height="18"
        rx="0.6"
      />
      {/* Pó concentrado sobre a vitrine */}
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="92" cy="96" r="1.5" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="98" cy="94" r="1.7" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="104" cy="97" r="1.4" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="95" cy="102" r="1.6" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="101" cy="104" r="1.8" />
      <circle data-no-el data-no-shop-dust className="no-shop-dust" cx="107" cy="101" r="1.5" />
    </svg>
  )
}
