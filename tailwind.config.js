// tailwind.config.ts или .js
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  plugins: [require("tailwindcss-animate")],
}
