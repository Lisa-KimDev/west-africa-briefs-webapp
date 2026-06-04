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
        // Webara Studio brand colours
        "bg-primary": "#131c20",
        "bg-card": "#223237",
        "bg-card-hover": "#2a3d45",
        "accent-gold": "#e0b152",
        "accent-gold-dark": "#c99a3e",
        "accent-cream": "#e2ddcd",
        "text-muted": "#8a9aa3",
        "border-subtle": "#2a3d45",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.25)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
