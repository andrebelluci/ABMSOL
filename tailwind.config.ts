import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E2C99A',
          pale: '#F9F4EC',
        },
        black: '#0A0A0A',
        'warm-dark': '#2B2B2B',
        'off-white': '#F7F4EF',
        surface: '#EDEAE4',
        text: {
          DEFAULT: '#1C1A17',
          muted: '#7A7469',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-display': 'clamp(3.5rem, 9vw, 10rem)',
        'section-title': 'clamp(2rem, 4vw, 4rem)',
        'card-title': 'clamp(1.1rem, 1.8vw, 1.4rem)',
        counter: 'clamp(3rem, 6vw, 6rem)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1280px',
        xl: '1920px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}

export default config
