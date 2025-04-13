/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#0070F0",
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      }
    },
  },
  plugins: [],
}