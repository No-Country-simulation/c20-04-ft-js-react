import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'medium-purple': {
          '50': '#f5f2ff',
          '100': '#ede8ff',
          '200': '#dcd4ff',
          '300': '#c4b1ff',
          '400': '#a885ff',
          '500': '#8c52ff',
          '600': '#7f30f7',
          '700': '#711ee3',
          '800': '#5e18bf',
          '900': '#4e169c',
          '950': '#300b6a'
        }
      }
    }
  },
  plugins: []
}
export default config
