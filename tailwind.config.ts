import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(navbar|button|link).js",
  ],
  // safelist: ["sm:hidden ssm:flex"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        hero: "calc(100vh - 5rem)",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            primary: "#2E3192",
            secondary: "#FFC200",
          },
        },
        light: {
          colors: {
            primary: "#2E3192",
            secondary: "#FFC200",
          },
        },
      },
    }),
    require("@tailwindcss/aspect-ratio"),

    // @ts-ignore
    function ({ addVariant, addComponents }) {
      addVariant("child", "& > *");
    },
  ],
};
export default config;
