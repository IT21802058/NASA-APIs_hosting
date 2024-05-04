/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container:{
        center:true,
        padding:{
          default:"1rem",
          sm: "2rem",
        }
      }
    },
  },
  plugins: [],
};