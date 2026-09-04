import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#121212',
          surfaceLight: '#1e1e1e',
          surfaceHover: '#262626',
          border: '#2a2a2a',
          borderHover: '#3f3f46',
        },
        accent: {
          green: '#4ade80',
          greenHover: '#22c55e',
          greenMuted: 'rgba(74, 222, 128, 0.15)',
        },
        custom: {
          text: '#f2f2f2',
          muted: '#8c8c8c',
          danger: '#f87171',
          dangerMuted: 'rgba(248, 113, 113, 0.15)',
          warning: '#fbbf24',
          warningMuted: 'rgba(251, 191, 36, 0.15)',
        },
        category: {
          food: '#f59e0b',
          transport: '#38bdf8',
          entertainment: '#a855f7',
          bills: '#ef4444',
          shopping: '#ec4899',
          other: '#94a3b8',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
