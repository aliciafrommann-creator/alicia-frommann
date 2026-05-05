import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-instrument)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
