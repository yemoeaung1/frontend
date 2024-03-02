/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merienda: ['Merienda', 'cursive'] // Add 'cursive' as a fallback
      }
    },
  },
  plugins: [],
}
