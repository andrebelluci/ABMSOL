import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1280px',
      xl: '1920px',
    },
    extend: {
      colors: {
        navy: {
          900: 'var(--c-navy-900)',
          800: 'var(--c-navy-800)',
          700: 'var(--c-navy-700)',
          muted: 'var(--c-navy-muted)',
        },
        gold: 'var(--c-gold)',
        mint: 'var(--c-mint)',
        ink: {
          DEFAULT: 'var(--c-ink)',
          muted: 'var(--c-ink-muted)',
        },
        paper: 'var(--c-paper)',
        line: 'var(--c-line)',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-instrument)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: [
          'clamp(2.5rem, 7vw + 1rem, 6.5rem)',
          { lineHeight: '1.12', letterSpacing: '-0.03em', fontWeight: '700' },
        ],
        h2: [
          'clamp(1.75rem, 3.5vw, 3rem)',
          { lineHeight: '1.15', fontWeight: '600' },
        ],
        lead: [
          'clamp(1.125rem, 1.5vw, 1.375rem)',
          { lineHeight: '1.65' },
        ],
        body: ['1rem', { lineHeight: '1.65' }],
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        page: '1280px',
        'page-wide': '1440px',
      },
      borderRadius: {
        control: '4px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}

export default config
