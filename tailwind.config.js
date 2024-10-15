/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-blue':' #60A5FA',
        'light-blue': '#60A5FA99',
        'light-violet': '#AEB0B3'
      }
    },
  },
  plugins: [],
}

