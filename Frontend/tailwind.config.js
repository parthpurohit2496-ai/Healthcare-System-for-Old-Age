/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          light: '#f0f7ff',
          primary: '#1e40af',
          secondary: '#1d4ed8',
          accent: '#3b82f6',
        },
        helper: {
          light: '#f0fdf4',
          primary: '#166534',
          secondary: '#15803d',
          accent: '#22c55e',
        },
        patient: {
          light: '#faf5ff',
          primary: '#6b21a8',
          secondary: '#7e22ce',
          accent: '#a855f7',
        }
      }
    },
  },
  plugins: [],
}
