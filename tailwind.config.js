/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sail-blue": "#003366",
        "sail-orange": "#FF6B35",
        "sail-gray": "#F5F7FA",
      },
    },
  },
  plugins: [],
};
