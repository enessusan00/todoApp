/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {
        "108": "27rem",
        "120": "30rem",
        "132": "33rem",
        "144": "36rem",
        "156": "39rem",
        
        "screen-1/2": "50vh",
        "screen-3/4": "75vh",
      },
      width: {
        "108": "27rem",
        "120": "30rem",
        "132": "33rem",
        "144": "36rem",
        "156": "39rem",
      },

    },
  },
  plugins: [],
}

