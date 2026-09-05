/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        urdu: ["'Noto Nastaliq Urdu'", 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        earth: {
          50: '#faf6ef',
          100: '#f2e8d5',
          500: '#b08a4e',
          600: '#96713a',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.04)',
        floaty: '0 8px 24px rgba(0,0,0,0.08)',
      },
      keyframes: {
        spin2: { to: { transform: 'rotate(360deg)' } },
        pulse2: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.5 } },
        bounceDot: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        waveBar: {
          from: { transform: 'scaleY(0.4)' },
          to: { transform: 'scaleY(1)' },
        },
      },
      animation: {
        pulse2: 'pulse2 2s infinite',
        bounceDot: 'bounceDot 1.2s infinite',
        waveBar: 'waveBar 0.5s infinite alternate',
      },
    },
  },
  plugins: [],
};
