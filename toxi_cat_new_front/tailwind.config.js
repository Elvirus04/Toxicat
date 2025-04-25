module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nature': {
          100: '#e6f4ea',
          200: '#c6e6d3',
          500: '#4caf50',
          600: '#388e3c',
        },
      },
    },
  },
  plugins: [],
}