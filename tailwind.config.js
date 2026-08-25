/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        emerald: {
          50: '#eef8f2',
          100: '#d3ecdc',
          200: '#a7d9bb',
          300: '#78c298',
          400: '#4ea677',
          500: '#2f7d57',
          600: '#1f6146',
          700: '#194f3a',
          800: '#153f2f',
          900: '#0f2e23',
          950: '#081b15',
        },
        clay: {
          50: '#fff7ed',
          100: '#ffedd0',
          200: '#ffd79f',
          300: '#ffb95c',
          400: '#fd9a2e',
          500: '#f57e14',
          600: '#d9600c',
          700: '#b3480d',
          800: '#8f3a12',
          900: '#753112',
        },
        cream: {
          50: '#fefdfb',
          100: '#faf6ee',
          200: '#f3ebd9',
          300: '#e9dcbe',
        },
        ink: {
          900: '#1a2420',
          800: '#212e28',
          700: '#2c3b34',
        },
      },
      backgroundImage: {
        'stitch': "repeating-linear-gradient(90deg, currentColor 0, currentColor 6px, transparent 6px, transparent 12px)",
      },
      boxShadow: {
        ticket: '0 1px 2px rgba(15,46,35,0.06), 0 8px 24px -8px rgba(15,46,35,0.18)',
      },
      borderRadius: {
        ticket: '14px',
      },
    },
  },
  plugins: [],
}
