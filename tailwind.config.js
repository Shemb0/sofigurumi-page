/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        sofi: {
          50:  '#FFF5F5',
          100: '#FFE8E8',
          200: '#FFD0D0',
          300: '#F0AFAF',
          400: '#E08888',
          500: '#CC6B6B',
          600: '#A84040',
          700: '#8B2828',
          800: '#5C1A1A',
          900: '#3D0F0F',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
