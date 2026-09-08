/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0812',
          900: '#120e1e',
          850: '#181229',
          800: '#1f1834',
          700: '#2a2140',
          600: '#3a2f57',
        },
        gold: {
          400: '#f2cb6d',
          500: '#e0b04a',
          600: '#c1913a',
        },
        arcane: {
          400: '#8f7bff',
          500: '#7357ff',
          600: '#5b3fe0',
        },
        ember: {
          400: '#ff8a5c',
          500: '#ff6a3d',
        },
        leaf: {
          400: '#6fe0a0',
          500: '#3fc981',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 12px 2px var(--tw-shadow-color)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
