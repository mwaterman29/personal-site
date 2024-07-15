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
      },
      keyframes: {
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