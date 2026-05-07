// good-vibes-only :: postcss.config.mjs
// Tailwind v4 uses a single PostCSS plugin. No autoprefixer needed —
// Tailwind handles vendor prefixes internally.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
