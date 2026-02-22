import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "720px",
        lg: "960px",
        xl: "1080px",
        "2xl": "1152px",
      },
    },
    extend: {
      colors: {
        // Site palette: #63333a #986369 #ffe3e8
        primary: "#63333a",
        secondary: "#986369",
        accent: "#ffe3e8",
        brand: "#63333a",
        cream: "#ffe3e8",
        "text-dark": "#63333a",
        "bg-light": "#fff8f9",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
