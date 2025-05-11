const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {},
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        sans: ['var(--font-sans)']
      },
      colors: {
        primary: 'var(--primary)',
        'primary-active': 'var(--primary-active)',
        secondary: 'var(--secondary)',
        'secondary-active': 'var(--secondary-active)',
        'background-primary': 'var(--background-primary)',
        'background-disable': 'var(--background-disable)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-on-primary': 'var(--text-on-primary)',
        'text-disable': 'var(--text-disable)',
        'border-primary': 'var(--border-primary)',
        'border-disable': 'var(--border-disable)',
        'state-error': 'var(--state-error)'
      },
      spacing: {
        'spacing-horizontal': 'var(--spacing-horizontal)'
      },
      borderRadius: {}
    }
  },
  plugins: []
};
