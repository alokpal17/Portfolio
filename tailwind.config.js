/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070a13',
        'bg-elev': '#0d1322',
        'bg-card': '#121a2e',
        'text-main': '#f1f5fc',
        'text-muted': '#aab6cf',
        'text-dim': '#76829f',
        accent: '#6ee7a0',
        'accent-2': '#5be6f2',
        'accent-3': '#9aa6ff',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
