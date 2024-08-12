import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': {
          DEFAULT: '#D4A98A',
        },
        'color-secondary': {
          DEFAULT: '#F7E9D7',
        },
        'color-text': {
          DEFAULT: '#323232',
        },
      },
      fontFamily: {
        genshin: ['var(--font-genshin)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
