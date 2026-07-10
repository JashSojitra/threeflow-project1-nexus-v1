/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50: '#eef2f7',
          100: '#d6e0ee',
          200: '#a9bdd9',
          300: '#7a98c2',
          400: '#4d72a5',
          500: '#2f5288',
          600: '#1f3d6b',
          700: '#163056',
          800: '#0f2342',
          900: '#0a1830',
          950: '#060f20',
        },
        gold: {
          400: '#e8b94a',
          500: '#d4a017',
          600: '#b3840f',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 35, 66, 0.06), 0 1px 3px rgba(15, 35, 66, 0.04)',
        cardLg: '0 4px 16px rgba(15, 35, 66, 0.08), 0 1px 3px rgba(15, 35, 66, 0.05)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-in': 'slide-in 0.35s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'shimmer': 'shimmer 1.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
