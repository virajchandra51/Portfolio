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
        paper: "var(--paper)",
        fg: "var(--fg)",
        body: "var(--body)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        seal: {
          DEFAULT: "var(--seal)",
          ink: "var(--seal-ink)",
        },
        cta: {
          DEFAULT: "var(--cta-bg)",
          ink: "var(--cta-ink)",
        },
        highlight: {
          DEFAULT: "var(--highlight)",
          ink: "var(--highlight-ink)",
        },
        code: {
          DEFAULT: "var(--code-bg)",
          fg: "var(--code-fg)",
          inline: "var(--code-inline)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
