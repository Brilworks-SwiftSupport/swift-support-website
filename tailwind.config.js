/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colorBlack: "#212121",
        colorGray: "#6f7a7d",
        colorDarkBlue: "#2d677c",
        colorLightBlue: "#eaf9ff",
        lightGray: "#a6a8a8",
        themePink: "#fbb8b8",
        themeYellow: "#f2ed7b",
        themeBlue: "#83defc",
        themeBlueLight: "#F6FDFF",
        colorOrange: "#ffae50",
        colorWhite: "#fff",
      },
      screens: {
        xs: "480px",
        slg: "980px",
        sxl: "1200px",
      },
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
