/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:'#E8F5F1',100:'#C5E8DE',200:'#9ED9C9',300:'#6FC4AD',
          400:'#3FAF91',500:'#0A6B5C',600:'#085C4F',700:'#064D42',
          800:'#043E35',900:'#022F28'
        },
        accent: {
          50:'#FBF3E0',100:'#F5E3B8',200:'#EDD08A',300:'#E8C675',
          400:'#D4A853',500:'#C9963B',600:'#B07E2A',700:'#8A6220',
          800:'#644816',900:'#3E2E0E'
        },
        warm: {
          50:'#FDFCF9',100:'#F7F5F0',200:'#EDE9DF',300:'#D8D3CA',
          400:'#B5AFA3',500:'#8A8478',600:'#6B665C',700:'#4A473F',
          800:'#2D2B26',900:'#1C1B18'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
