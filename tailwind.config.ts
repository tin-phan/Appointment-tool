import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#fb7185", // rose-400
          light: "#fff1f2", // rose-50
          medium: "#fda4af", // rose-300
          dark: "#e11d48", // rose-600
        },
      },
    },
  },
  plugins: [],
};

export default config;
