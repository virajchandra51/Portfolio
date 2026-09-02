import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        body: "var(--body)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        code: {
          DEFAULT: "var(--code-bg)",
          fg: "var(--code-fg)",
          inline: "var(--code-inline)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
