/** @type {import('tailwindcss').Config} */
function withOpacity(variable) {
  return `rgb(var(${variable}) / <alpha-value>)`
}

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: withOpacity('--color-surface'),
        ink: {
          50: withOpacity('--color-ink-50'),
          100: withOpacity('--color-ink-100'),
          200: withOpacity('--color-ink-200'),
          300: withOpacity('--color-ink-300'),
          400: withOpacity('--color-ink-400'),
          500: withOpacity('--color-ink-500'),
          600: withOpacity('--color-ink-600'),
          700: withOpacity('--color-ink-700'),
          800: withOpacity('--color-ink-800'),
          900: withOpacity('--color-ink-900'),
        },
        gold: {
          50: withOpacity('--color-gold-50'),
          100: withOpacity('--color-gold-100'),
          400: withOpacity('--color-gold-400'),
          500: withOpacity('--color-gold-500'),
          600: withOpacity('--color-gold-600'),
        },
        arcane: {
          50: withOpacity('--color-arcane-50'),
          100: withOpacity('--color-arcane-100'),
          400: withOpacity('--color-arcane-400'),
          500: withOpacity('--color-arcane-500'),
          600: withOpacity('--color-arcane-600'),
        },
        ember: {
          50: withOpacity('--color-ember-50'),
          100: withOpacity('--color-ember-100'),
          400: withOpacity('--color-ember-400'),
          500: withOpacity('--color-ember-500'),
          600: withOpacity('--color-ember-600'),
        },
        leaf: {
          50: withOpacity('--color-leaf-50'),
          100: withOpacity('--color-leaf-100'),
          400: withOpacity('--color-leaf-400'),
          500: withOpacity('--color-leaf-500'),
          600: withOpacity('--color-leaf-600'),
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 10px 1px var(--tw-shadow-color)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
