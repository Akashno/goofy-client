/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode:"class",
  theme: {
    
    extend: {
      colors:{
        primary:"#2A2B2E"
      },
      fontSize: {
        x: "0.5rem",
      },
    },
  },
  plugins: [],
};
