/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        "2xs": "450px",
      },
    },
  },
  plugins: [],
};
