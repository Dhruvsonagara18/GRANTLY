/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#6D28D9', // Primary violet
          700: '#5B21B6',
          800: '#4C1D95', // Deep violet
          900: '#2E1065',
        },
        indigo: {
          accent: '#4F46E5',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
        },
        primaryText: '#111827',
        secondaryText: '#64748B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(109, 40, 217, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(109, 40, 217, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px rgba(109, 40, 217, 0.25)',
      }
    },
  },
  plugins: [],
}
