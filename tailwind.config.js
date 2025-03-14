/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'league-spartan': ['League Spartan', 'sans-serif'],
      },
      colors: {
        primarygreen: "#5ED85B", // Cor personalizada
      },
    },
  },
  plugins: [],
};
