/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#020205',
          card: 'rgba(9, 11, 25, 0.82)',
          border: 'rgba(0, 243, 255, 0.22)',
          cyan: '#00f3ff',
          pink: '#ff00ff',
          green: '#39ff14',
          purple: '#9d4edd',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 243, 255, 0.35)',
        'glow-pink': '0 0 20px rgba(255, 0, 255, 0.35)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.35)',
      },
    },
  },
  plugins: [],
};
