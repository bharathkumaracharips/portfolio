import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));

  // Force dark mode as default
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => {
      if (key === "background") return ["--background", "#0a0a0a"]; // Dark mode background
      if (key === "foreground") return ["--foreground", "#ededed"]; // Light text in dark mode
      return [`--${key}`, val];
    })
  );

  addBase({
    ":root": newVars, // Apply forced dark mode variables
  });
}

export default {
  darkMode: "class", // Enables dark mode via the "dark" class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        scroll: "scrollAnimation 20s linear infinite",
      },
      keyframes: {
        scrollAnimation: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config;