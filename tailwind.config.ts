import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'h-1', 'h-4',
  ],
  theme: {
    extend: {
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {    
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },

    },
  },
  plugins: [],
}
export default config
