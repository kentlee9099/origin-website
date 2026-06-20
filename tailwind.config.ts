import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        by: {
          'bg':      '#080808',
          'bg-alt':  '#0D0D0D',
          'surface': '#111111',
          'raised':  '#181818',
          'text':    '#EDE9E0',
          'blue':    '#3A5F8A',
          'blue-lt': '#5C85B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['clamp(48px,7vw,96px)', { lineHeight: '0.97', letterSpacing: '-0.035em' }],
        h1:      ['clamp(32px,5vw,56px)',  { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        h2:      ['clamp(22px,3vw,32px)',  { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        label:   ['11px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        micro:   ['10px', { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },
      animation: {
        ticker:    'ticker 30s linear infinite',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        expo:  'cubic-bezier(0.16, 1, 0.3, 1)',
        sharp: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}

export default config
