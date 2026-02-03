/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#13c8ec",
        "primary-dark": "#1152d4", // Login primary
        "institutional-navy": "#002d56",
        "institutional-gold": "#d4af37",
        "gold-accent": "#D4AF37",
        "background-light": "#f6f8f8",
        "background-dark": "#101f22",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}
