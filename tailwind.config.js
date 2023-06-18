/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        BrightBlue: "hsl(220, 98%, 61%)",
        VeryLightGray: "hsl(0, 0%, 98%)",
        VeryLightGrayishBlue: "hsl(236, 33%, 92%)",
        LightGrayishBlue: "hsl(233, 11%, 84%)",
        DarkGrayishBlue: "hsl(236, 9%, 61%)",
        VeryDarkGrayishBlue: "hsl(235, 19%, 35%)",

        VeryDarkBlueDark: "hsl(235, 21%, 11%)",
        VeryDarkDesaturatedBlueDark: "hsl(235, 24%, 19%)",
        LightGrayishBlueDark1: "hsl(234, 39%, 85%)",
        LightGrayishBlueDark2: "hsl(236, 33%, 92%)",
        DarkGrayishBlueDark: "hsl(234, 11%, 52%)",
        VeryDarkGrayishBlueDark1: "hsl(233, 14%, 35%)",
        VeryDarkGrayishBlueDark2: "hsl(237, 14%, 26%)",

        GradientOne: "hsl(192, 100%, 67%)",
        GradientTwo: "hsl(280, 87%, 65%)",
      },
      fontFamily: {
        Josefin: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
