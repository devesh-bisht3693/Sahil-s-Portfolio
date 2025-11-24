/** @type {import('tailwindcss').Config} */
export default {
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
        display: ['system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(56, 189, 248, 0.35)',
      },
    },
  },
  plugins: [],
};


