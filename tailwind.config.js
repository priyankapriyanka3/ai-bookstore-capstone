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
        dark: {
          bg: '#0F1217',
          surface: '#161B22',
          card: '#1A1F27',
          border: '#272E3B',
          input: '#12161D',
          hover: '#222936',
          muted: '#8B949E',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          accent: '#38BDF8',
          gold: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
