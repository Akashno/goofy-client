/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode:"class",
  theme: {
    
    extend: {
      colors:{
        primary:"#1A1D1D"
      },
      fontSize: {
        x: "0.5rem",
      },
    },
  },
  plugins: [],
};
