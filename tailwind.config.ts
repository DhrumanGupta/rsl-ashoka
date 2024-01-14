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
        hero: "calc(100vh - 4rem)",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            secondary: "#fff",
          },
        },
        light: {
          colors: {
            secondary: "#fff",
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
