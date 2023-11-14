/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8fbc8f',
        secondary: '#ff7f50',
        typo: '#000',
        white: '#fff',
        modalBg: 'rgba(255, 255, 255, 60%)',
      },
      boxShadow: {
        1: '0px 1px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
