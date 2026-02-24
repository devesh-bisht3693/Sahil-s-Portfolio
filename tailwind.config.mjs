/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'portfolio-bg': '#020617',
        'portfolio-card': '#020617',
        'portfolio-accent': '#22d3ee',
        'portfolio-accent-soft': '#38bdf8',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(56, 189, 248, 0.35)',
        'glow-sm': '0 0 30px rgba(56, 189, 248, 0.25)',
        'glow-lg': '0 0 80px rgba(56, 189, 248, 0.4)',
      },
    },
  },
  plugins: [],
};
