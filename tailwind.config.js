/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme': {
          primary: '#1B3A8C',
          primaryLight: '#2E5AC4',
          primaryDark: '#0F2463',
          accent: '#D4AF37',
          accentLight: '#E8C547',
          accentDark: '#B8941F',
          white: '#FFFFFF',
          black: '#1A1A1A',
          gray: '#F8F9FA',
          dark: '#0D1B4D'
        },
        'qatar': {
          maroon: '#8B1538',
          gold: '#FFD700',
          cream: '#F5F5DC',
          sand: '#C19A6B',
          burgundy: '#722F37',
          darkMaroon: '#5D0E1F',
          lightGold: '#FFF8DC',
          bronze: '#CD7F32',
          white: '#FFFFFF',
          black: '#2C1810'
        }
      },
      backgroundImage: {
        'theme-gradient': 'linear-gradient(135deg, #1B3A8C 0%, #0F2463 100%)',
        'theme-accent': 'linear-gradient(135deg, #D4AF37 0%, #E8C547 100%)',
        'theme-dark': 'linear-gradient(135deg, #0D1B4D 0%, #000000 100%)',
        'qatar-gradient': 'linear-gradient(135deg, #8B1538 0%, #5D0E1F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #CD7F32 100%)',
        'world-cup-gradient': 'linear-gradient(to bottom, #8B1538 0%, #722F37 50%, #FFD700 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(27, 58, 140, 0.1), 0 10px 20px -2px rgba(27, 58, 140, 0.05)',
        'strong': '0 10px 40px -10px rgba(27, 58, 140, 0.3)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-accent': '0 0 20px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
};
