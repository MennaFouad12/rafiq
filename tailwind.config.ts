import type { Config } from 'tailwindcss';
console.log('CONFIG LOADED');
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003D9B',
        primaryContainer: '#0052CC',
        surefaceHighest: '#D7E2FF',
        surefaceLow: '#F1F3FF',
background:'#F9F9FF',
        neutral: {
          dark: '#041B3C',
          DEFAULT: '#4F5F7B',
          light: '#C3C6D6',
        
        },
        success: '#82F9BE',
        error: '#BA1A1A',
        warning: '#FFB300',
      },
    },
  },
  plugins: [],
};

export default config;



