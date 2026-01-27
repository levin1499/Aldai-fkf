/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme': {
          primary: '#000000',
          primaryLight: '#333333',
          primaryDark: '#000000',
          accent: '#DC143C',
          accentLight: '#FF1744',
          accentDark: '#B71C1C',
          white: '#FFFFFF',
          black: '#000000',
          gray: '#F5F5F5',
          dark: '#1A1A1A'
        },
        'qatar': {
          maroon: '#DC143C',
          gold: '#FFFFFF',
          cream: '#F5F5F5',
          sand: '#E0E0E0',
          burgundy: '#B71C1C',
          darkMaroon: '#8B0000',
          lightGold: '#FFFFFF',
          bronze: '#333333',
          white: '#FFFFFF',
          black: '#000000'
        }
      },
      backgroundImage: {
        'theme-gradient': 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)',
        'theme-accent': 'linear-gradient(135deg, #DC143C 0%, #FF1744 100%)',
        'theme-dark': 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
        'qatar-gradient': 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
        'world-cup-gradient': 'linear-gradient(to bottom, #DC143C 0%, #B71C1C 50%, #FFFFFF 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.05)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(220, 20, 60, 0.3)',
        'glow-accent': '0 0 20px rgba(220, 20, 60, 0.4)',
      }
    },
  },
  plugins: [],
};
