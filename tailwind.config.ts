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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        disabled: "var(--disabled)",
      },
      keyframes: {
        fadeIn: {
          '0%, ': { opacity: "0" },
          '100%': { opacity: "1" },
        }
      },
      animation: {
        fade: "fadeIn 0.5s forwards",
      }
    },
  },
  plugins: [],
};
export default config;
