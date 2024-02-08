import { link } from "fs";
import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      mono: ["IBM Plex Mono", "monospace"],
      sans: ["Satoshi", "sans-serif"],
      title: ["Clash Display", "sans-serif"],
    },
    extend: {
      colors: {
        whiteTransparent: "#43FF64D9",
        white: "#EEEEEE",
        link: "#036bfc",
        gray: "#585858",
        lightGray: "#bababa",
        black: "#000000",
        green: "#8AC285",
        yellow: "#FED481",
        purple: "#7669D2",
      },
    },
  },
  plugins: [],
};
export default config;
