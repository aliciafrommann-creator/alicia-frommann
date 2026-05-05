import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08080A',
        bg2: '#101010',
        bg3: '#161614',
        green: '#6B9E5E',
        'green-dark': '#4A7040',
        amber: '#C8834A',
        line: '#1C1C1A',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
