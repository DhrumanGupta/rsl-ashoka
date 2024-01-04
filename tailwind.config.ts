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
  ],
};
export default config;
