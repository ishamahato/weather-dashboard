/** @type {import('tailwindcss').Config} */
export default {
  // "class" strategy lets us toggle dark mode manually by adding/removing
  // the "dark" class on the <html> element (see App.jsx)
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
