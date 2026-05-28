/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        'display': ['"Space Mono"', 'monospace'],
        'sans': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        'void': '#060810',
        'surface': '#0d1117',
        'panel': '#161b22',
        'border': '#21262d',
        'muted': '#8b949e',
        'cyan': {
          400: '#22d3ee',
          500: '#06b6d4',
          glow: '#0ff',
        },
        'amber': {
          400: '#fbbf24',
        },
        'rose': {
          400: '#fb7185',
          500: '#f43f5e',
        },
        'emerald': {
          400: '#34d399',
        },
        'violet': {
          400: '#a78bfa',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
      boxShadow: {
        'cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'cyan-sm': '0 0 8px rgba(6, 182, 212, 0.2)',
        'rose': '0 0 20px rgba(244, 63, 94, 0.3)',
        'panel': '0 8px 32px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
