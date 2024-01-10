import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // remove backticks from code blocks
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        },
        // usage: prose-quoteless
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [typography],
}
export default config
