/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        header: ['Oswald', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },

    colors: {
      'red': '#BF1E2E', //primary color
      'blue': {
        800: '#353A5D',
        600: '#4A4E6E'
      }, //secondary color
      'yellow': '#FF9B19', //accent color
      'black': '#000000', //true black
      'white': '#FFFFFF',//true white
      'gray': {
        800: '#777777', // dark gray
        600: '#DDDDDD', // medium dark gray
        400: '#F0F0F0', // medium gray
        200: '#F9F9F9', // light gray
      },
      'green': '#007737', //extra color used for labels
      'purple': '#4D1FE5', //extra color used for labels

    },
  },
  plugins: [

  ],
}}

