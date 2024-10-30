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
    plugin(function({ addUtilities }) {
      addUtilities({
        // Desktop
        '.text-h1-desktop': {
          fontSize: '3.125rem',   // 50pt -> 3.125rem
          lineHeight: '3.375rem', // 54pt -> 3.375rem
          fontWeight: '500',      // Medium
          color: '#BF1E2E',       // Red
          fontFamily: 'Oswald, sans-serif', // Header font
        },
        '.text-h2-desktop': {
          fontSize: '2.375rem',   // 38pt -> 2.375rem
          lineHeight: '2.625rem', // 42pt -> 2.625rem
          fontWeight: '500',      // Medium
          color: '#353A5D',       // Blue
          fontFamily: 'Oswald, sans-serif', // Header font
        },
        '.text-h3-desktop': {
          fontSize: '1.625rem',    // 26pt -> 1.625rem
          lineHeight: '2.4375rem', // 39pt -> 2.4375rem
          fontWeight: '500',       // Medium
          color: '#353A5D',        // Blue
          fontFamily: 'Oswald, sans-serif', // Header font
        },
        // Mobile
          '.text-h1-mobile': {
            fontSize: '1.875rem',    // 30pt -> 1.875rem
            lineHeight: '2.125rem',  // 34pt -> 2.125rem
            fontWeight: '500',       // Medium
            color: '#BF1E2E',        // Red
            fontFamily: 'Oswald, sans-serif', // Header font
          },
          '.text-h2-mobile': {
            fontSize: '1.875rem',    // 30pt -> 1.875rem
            lineHeight: '2.125rem',  // 34pt -> 2.125rem
            fontWeight: '500',       // Medium
            color: '#353A5D',        // Blue
            fontFamily: 'Oswald, sans-serif', // Header font
          },
          '.text-h3-mobile': {
            fontSize: '1.25rem',     // 20pt -> 1.25rem
            lineHeight: '1.875rem',  // 30pt -> 1.875rem
            fontWeight: '500',       // Medium
            color: '#353A5D',        // Blue
            fontFamily: 'Oswald, sans-serif', // Header font
          },
        // Button label
        '.text-button': {
          fontSize: '1rem',        // 16pt -> 1rem
          lineHeight: '1.1875rem', // 19pt -> 1.1875rem
          fontWeight: '700',       // Bold
          color: '#353A5D',        // Blue
          fontFamily: 'Montserrat, sans-serif', // Body font
        },
        '.text-button-label-white': {
          fontSize: '1rem',        // 16pt -> 1rem
          lineHeight: '1.1875rem', // 19pt -> 1.1875rem
          fontWeight: '700',       // Bold
          color: '#FFFFFF',        // White text
          fontFamily: 'Montserrat, sans-serif', // Body font
        },
        // Body text
        '.text-body': {
          fontSize: '1rem',       // 16pt -> 1rem
          lineHeight: '1.625rem', // 26pt -> 1.625rem
          fontWeight: '400',      // Regular
          color: '#777777',        //dark-gray
          fontFamily: 'Montserrat, sans-serif', // Body font
        },
        '.text-body-small': {
          fontSize: '0.875rem',  // 14pt -> 0.875rem
          lineHeight: '1.625rem', // 26pt -> 1.625rem
          fontWeight: '400',      // Regular
          color: '#DDDDDD',        //medium-dark-gray
          fontFamily: 'Montserrat, sans-serif', // Body font
        },
        // Tiny button
        '.text-tiny-button': {
          fontSize: '0.75rem',   // 12pt -> 0.75rem
          lineHeight: '0.9375rem', // 15pt -> 0.9375rem
          fontWeight: '700',       // Bold
          color: '#777777',        //dark-gray
          fontFamily: 'Montserrat, sans-serif', // Body font
        },
      }, ['responsive', 'hover']);
    }),
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