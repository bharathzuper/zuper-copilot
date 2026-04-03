/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zuper: {
          primary: '#2a292e',
          sidebar: '#f8f5f0',
          'sidebar-active': '#e4d9c8',
          surface: '#ffffff',
          card: '#FFFFFF',
          border: '#e5e5e5',
          'border-light': 'rgba(0,0,0,0.06)',
          muted: 'rgba(0,0,0,0.74)',
          text: 'rgba(0,0,0,0.9)',
          'text-secondary': 'rgba(0,0,0,0.7)',
          'text-nav': '#404040',
          beige: {
            50: '#f8f5f0',
            100: '#f1ebe2',
            200: '#e4d9c8',
          },
          chip: {
            bg: '#f1ebe2',
            border: '#e4d9c8',
          },
        },
        copilot: {
          purple: '#7C3AED',
          blue: '#2563EB',
          glass: 'rgba(15, 15, 20, 0.85)',
          'glass-border': 'rgba(255, 255, 255, 0.08)',
        },
        badge: {
          started: '#d3e8fc',
          'on-hold': '#f9dddd',
          new: '#fff8e7',
          paused: '#f9dddd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        input: '8px',
        chip: '20px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06)',
        panel: '0 8px 32px rgba(0,0,0,0.12)',
        orb: '0 0 40px rgba(124, 58, 237, 0.4), 0 0 80px rgba(37, 99, 235, 0.2)',
        sm: '0 1px 2px rgba(0,0,0,0.05)',
      },
      animation: {
        'orb-rotate': 'orbRotate 4s linear infinite',
        'orb-pulse': 'orbPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        orbRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
