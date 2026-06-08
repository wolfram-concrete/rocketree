import type { Config } from "tailwindcss";

/**
 * Rocketree design tokens mapped into Tailwind so utility classes are available
 * alongside the ported component layer in globals.css. Values mirror the
 * "surface-soft" + "font-warm" defaults (the only production combination).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          900: "#00532e",
          800: "#006c3c",
          700: "#009048",
          600: "#1a9b4e",
          500: "#3cb448",
          400: "#5cc35a",
        },
        lime: { DEFAULT: "#90cc3c", soft: "#cfe8a8" },
        red: { DEFAULT: "#e41830", dark: "#b4243c" },
        ink: { DEFAULT: "#15201a", soft: "#46544c" },
        muted: "#6c7a71",
        faint: "#9aa79f",
        line: { DEFAULT: "#e4eae5", soft: "#eef2ee" },
        surface: { DEFAULT: "#ffffff", 2: "#f5f8f4", 3: "#eef3ec" },
        "green-wash": { DEFAULT: "#f1f7f1", 2: "#e7f1e6" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "10px",
        sm: "14px",
        md: "20px",
        lg: "28px",
        xl: "36px",
      },
      maxWidth: {
        wrap: "1180px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,40,28,0.04), 0 10px 30px -18px rgba(20,40,28,0.20)",
        lift: "0 2px 6px rgba(20,40,28,0.05), 0 28px 56px -28px rgba(20,40,28,0.30)",
        float: "0 12px 40px -12px rgba(20,40,28,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
