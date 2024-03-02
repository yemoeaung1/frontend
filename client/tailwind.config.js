/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merienda: ["Merienda", "cursive"], // Add 'cursive' as a fallback
      },
    },
  },
  plugins: [require("daisyui")],
};
