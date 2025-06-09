import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './util/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'peak': '#ff6f08',
        'favorite': '#8803fc',
        'rating-red': '#9e150b',
        'rating-yellow': '#ffeb38',
        'rating-green': '#008f00',
        'rating-cyan': '#00ded6',
        'rating-purple': '#a855f7',
      },
      backgroundImage: {
        'gradient-rating': 'linear-gradient(90deg, #008f00, #00ded6, #a855f7)',
        'gradient-rating-animated': 'linear-gradient(90deg, #008f00 0%, #00ded6 50%, #a855f7 100%)',
      },
      animation:
      {
        fadeIn1: 'fadeIn 1s ease-in-out forwards',
        fadeIn2: 'fadeIn 1s ease-in-out 0.5s forwards',
        fadeIn3: 'fadeIn 1s ease-in-out 1s forwards',
        fadeIn4: 'fadeIn 1s ease-in-out 1.5s forwards',
        fadeIn5: 'fadeIn 1s ease-in-out 2s forwards',
        fadeIn6: 'fadeIn 1s ease-in-out 2.5s forwards',

        fadeOut1: 'fadeOut 1s ease-in-out forwards',
        fadeOut2: 'fadeOut 1s ease-in-out 0.5s forwards',
        fadeOut3: 'fadeOut 1s ease-in-out 1s forwards',
        fadeOut4: 'fadeOut 1s ease-in-out 1.5s forwards',
        fadeOut5: 'fadeOut 1s ease-in-out 2s forwards',
        fadeOut6: 'fadeOut 1s ease-in-out 2.5s forwards',
        
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        "album-slide": "albumSlide 2.5s ease-in-out forwards ",
        "album-slide-back": "albumSlide 2.5s ease-in-out backwards reverse",
        
        slideOpen: 'slideOpen 0.5s ease-out forwards',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'gradient-shift-delayed': 'gradientShift 3s ease-in-out infinite 500ms',
      },
      keyframes: {
        albumSlide : {
          '0%': { 
            transform: 'perspective(450px) rotateX(10deg)',  
            left: 'var(--initial-left)',
          },
          '25%': { 
            transform: 'perspective(450px) rotateX(15deg) translateY(-50px) ', 
            left: 'var(--initial-left)',
          },
          '50%': { 
            transform: 'perspective(600px) rotateX(15deg) translateY(150px) ', 
            left: 'var(--initial-left)',
          },
          '60%': { 
            transform: 'translateY(150px) scale(1.15) ', 
            left: 'var(--initial-left)',
          },
          '100%': { 
            transform: 'translateY(150px) scale(1.15) ', 
            top: '20%', 
            left: '5vw', 
            zIndex: '20' 
          },
        },

        slideOpen: {
          '0%': { width: '0' },
          '100%': { width: 'calc(1200px-10dvw)' }, // Target width
        },
        
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {    
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
        gradientShift: {
          '0%': { 
            backgroundPosition: '0% 50%',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
          },
          '100%': { 
            backgroundPosition: '0% 50%',
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

/*

 animation:{
        fadeIn1: 'fadeIn 1s ease-in-out forwards',
        fadeIn2: 'fadeIn 1s ease-in-out 0.5s forwards',
        fadeIn3: 'fadeIn 1s ease-in-out 1s forwards',
        fadeIn4: 'fadeIn 1s ease-in-out 1.5s forwards',
        fadeIn5: 'fadeIn 1s ease-in-out 2s forwards',
        fadeIn6: 'fadeIn 1s ease-in-out 2.5s forwards',

        fadeOut1: 'fadeOut 1s ease-in-out forwards',
        fadeOut2: 'fadeOut 1s ease-in-out 0.5s forwards',
        fadeOut3: 'fadeOut 1s ease-in-out 1s forwards',
        fadeOut4: 'fadeOut 1s ease-in-out 1.5s forwards',
        fadeOut5: 'fadeOut 1s ease-in-out 2s forwards',
        fadeOut6: 'fadeOut 1s ease-in-out 2.5s forwards',
      },

      keyframes:{

      },

      */