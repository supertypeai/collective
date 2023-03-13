/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const { join } = require('path');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    // add blocks, icons and hooks here
    "./blocks/**/*.{js,ts,jsx,tsx}",
    "./icons/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      }
    },
  },
  daisyui: {
    themes: [
      {
        'supertype': {
          'primary': '#ad0705',
          'primary-focus': '#c4002f',
          'primary-content': '#000000',
          // 'secondary': '#909297',
          'secondary': '#6a1622',
          'secondary-focus': '#1A202C',
          'secondary-content': '#FFFFFF',
          'accent': '#37CDFF',
          'accent-focus': '#37CDFF',
          'accent-content': '#FFFFFF',
          'neutral': '#3D4451',
          'neutral-focus': '#3D4451',
          'neutral-content': '#FFFFFF',
          // info
          'info': '#b1976b',
          'info-focus': '#2094F3',
        },
      },
      "halloween"
    ]
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
}
