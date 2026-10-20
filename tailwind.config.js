/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#1A2467', // indigo vat
          deep: '#0E1330', // deep ink
        },
        chalk: '#F2F4F8',
        mist: '#D7DCEB',
        saffron: {
          DEFAULT: '#E0A526', // decorative / on dark backgrounds
          dark: '#8A5F00', // text on light backgrounds (passes AA)
        },
        wa: '#0B6B58', // WhatsApp-adjacent green, white text passes AA
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Newsreader', 'Georgia', 'serif'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-128px,-128px,0)' },
        },
      },
      animation: {
        rise: 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 40s linear infinite',
      },
    },
  },
  plugins: [],
};
