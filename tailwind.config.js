/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5680E9',
        background: '#84CEEB',
        input: '#e8f0fd',
        button: '#8860D0',
      },
      fontFamily: {
        balsamiq: 'Balsamiq Sans',
      },
      inset: {
        15: '3.75rem',
        25: '6.25rem',
        30: '7.5rem',
        34: '8.5rem',
        35: '8.75rem',
        40: '10rem',
        45: '11.25rem',
        50: '12.5rem',
      },
    },
  },
  plugins: [],
};
