import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        x: {
          bg: '#000000',
          panel: '#16181c',
          hover: '#1d1f23',
          border: '#2f3336',
          blue: '#1d9bf0',
          'blue-hover': '#1a8cd8',
          text: '#ffffff',
          secondary: '#71767b',
          tertiary: '#536471',
          green: '#00ba7c',
          red: '#f4212e',
          yellow: '#ffd400',
          orange: '#ff7a00',
          pink: '#f91880',
          purple: '#7856ff',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.35s ease-out forwards',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
