/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New color palette
        lime: {
          DEFAULT: '#BBCB2E',
          50: '#F5F8E5',
          100: '#EBF1CC',
          500: '#BBCB2E',
          600: '#A3B426',
        },
        sage: {
          DEFAULT: '#6CA651',
          50: '#E8F2E4',
          100: '#D1E5C9',
          500: '#6CA651',
          600: '#5C8F45',
        },
        olive: {
          DEFAULT: '#839705',
          50: '#EEF0D9',
          100: '#DDE1B3',
          500: '#839705',
          600: '#6F8004',
        },
        moss: {
          DEFAULT: '#6B7445',
          50: '#E9EBE1',
          100: '#D3D7C3',
          500: '#6B7445',
          600: '#5A623A',
        },
        slate: {
          DEFAULT: '#576A8F',
          50: '#E4E8F0',
          100: '#C9D1E1',
          500: '#576A8F',
          600: '#4A5A7A',
        },
        lavender: {
          DEFAULT: '#B7BDF7',
          50: '#F6F7FE',
          100: '#EDEFFC',
          500: '#B7BDF7',
          600: '#9BA3F4',
        },
        cream: {
          DEFAULT: '#FFF8DE',
          50: '#FFFEF9',
          100: '#FFFCF3',
          500: '#FFF8DE',
          600: '#FFF4C5',
        },
        coral: {
          DEFAULT: '#FF7444',
          50: '#FFE9E1',
          100: '#FFD3C3',
          500: '#FF7444',
          600: '#FF5F2E',
        },
        // Keep some legacy for compatibility
        navy: {
          900: '#1A2332',
          800: '#242E40',
          700: '#2E3849',
        },
        teal: {
          DEFAULT: '#6CA651',
          500: '#6CA651',
          600: '#5C8F45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
