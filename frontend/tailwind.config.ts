import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffeeBrown: "#6B4F4F",
        cream: "#FFF8E7",
        pastelGreen: "#B8CBB9",
        warmBeige: "#EADBC8",
        darkBrown: "#4A3535",
        lightBrown: "#8B6F6F",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(107, 79, 79, 0.1)",
        medium: "0 8px 30px rgba(107, 79, 79, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
