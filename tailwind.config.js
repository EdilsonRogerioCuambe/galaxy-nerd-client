/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        header: '560px',
        rate: '400px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        xs: '475px',
      },
      colors: {
        main: '#121214',
        secondary: '#202024',
        tertiary: '#323238',
        quaternary: '#7c7c8a',
        quinary: '#8257e6',
        senary: '#996dff',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
