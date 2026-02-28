/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Momo Trust Sans', 'sans-serif'],
      },
      colors: {
        'primary': '#3e5ccc',
      }
    },
  },
  plugins: [],
}

