import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|image|navbar).js",
  ],
  // safelist: ["sm:hidden ssm:flex"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        hero: "calc(100vh - 5rem)",
      },
      colors: {
        gold: colors.amber[400],
        silver: colors.gray[300],
        bronze: colors.amber[600],
        fourth: colors.cyan[400],
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            primary: "#0e3882",
            secondary: colors.amber[400],
          },
        },
        light: {
          colors: {
            primary: "#2E3192",
            secondary: colors.amber[400],
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
