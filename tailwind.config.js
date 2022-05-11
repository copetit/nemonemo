module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // 16: "repeat(auto-fit, minmax(400px, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
