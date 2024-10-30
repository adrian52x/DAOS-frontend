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
      'blue': '#353A5D', //secondary color
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

/*
 ***HOW TO: Usage of Custom Responsive and Hover Variants***
 You can apply responsive/hover styles by using Tailwind's Built-in Responsive Variants
 
 Responsive Variants
  - Use prefixes like `sm:`, `md:`, `lg:`, and `xl:` to apply styles at different breakpoints.
  - The breakpoints are defined by Tailwind (we can change them if we want)

  - Example:
   <h1 class="text-h1 md:text-h2 lg:text-h3">Heading</h1>
   This will use `.text-h1` on smaller screens and `.text-h2` on medium and '.text-h3" on large screns.
 
 Hover Variants
  - Use the `hover:` prefix to apply styles when an element is hovered.
  - Example:
    <button class="text-button hover:text-button-label-white">Click Me</button>
    This will change the button text color to white when hovered.

 */