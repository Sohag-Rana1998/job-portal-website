const withMT = require("@material-tailwind/react/utils/withMT");

const colors = require('tailwindcss/colors');

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      rose: colors.rose,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      violet: colors.violet,
      indigo: colors.indigo,
      blue: colors.blue,
      sky: colors.sky, // Only in Tailwind CSS <=v2.1
      // As of Tailwind CSS v2.2, `sky` has been renamed to `sky`  
      cyan: colors.cyan,
      teal: colors.teal,
      emerald: colors.emerald,
      green: colors.green,
      lime: colors.lime,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      red: colors.red,
      slate: colors.slate,
      zinc: colors.zinc,
      gray: colors.gray,
      neutral: colors.slate,
      stone: colors.stone,
    },
    variants: {},
    plugins: [],
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "synthwave", "cupcake"],
  },
});




