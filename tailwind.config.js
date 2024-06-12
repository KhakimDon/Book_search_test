/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      '2xl': {'max': '1920px'},
      'xl': {'max': '1200px'},
      'x': {'max': '900px'},
      'm': {'max': '768px'},
      's': {'max': '500px'},
      
    }
  },
  plugins: [require('daisyui')],
}

