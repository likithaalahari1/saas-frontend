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
          50: '#FFF5FA',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#E85AAD', // Primary requested
          600: '#C93D91', // Primary Dark requested
          700: '#A22971',
          800: '#831855',
          900: '#6C1445',
        },
        pinkbg: '#FFF7FB',
        mainbg: '#FFFDFE',
        pinkborder: '#F1E7EE',
        accent: {
          purple: '#8B5CF6',
          pink: '#E85AAD'
        },
        maintext: '#18181B',
        sectext: '#71717A'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'pink-sm': '0 2px 10px rgba(232, 90, 173, 0.06)',
        'pink-md': '0 8px 30px rgba(232, 90, 173, 0.12)',
        'pink-lg': '0 20px 40px rgba(232, 90, 173, 0.16)',
        'glass': '0 8px 32px 0 rgba(232, 90, 173, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
