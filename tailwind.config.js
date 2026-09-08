/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#faf7f0',
          100: '#f2ead8',
          200: '#e3d5b3',
          300: '#cbb489',
          400: '#a88f63',
          500: '#83704e',
          600: '#61503a',
          700: '#453a2b',
          800: '#2c251a',
          900: '#1a1610',
        },
        gold: {
          50: '#fdf6e3',
          100: '#f8e8bd',
          400: '#c9932e',
          500: '#a8781f',
          600: '#8a6119',
        },
        arcane: {
          50: '#f1edfc',
          100: '#ded3f8',
          400: '#7357ff',
          500: '#5b3fe0',
          600: '#4a30bf',
        },
        ember: {
          50: '#fff0e8',
          100: '#ffdac2',
          400: '#e0562a',
          500: '#c2431c',
          600: '#a23616',
        },
        leaf: {
          50: '#eaf8ef',
          100: '#cdeed9',
          400: '#2f9e5e',
          500: '#25824c',
          600: '#1d6a3d',
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
