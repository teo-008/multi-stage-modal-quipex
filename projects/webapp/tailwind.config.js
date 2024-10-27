/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontSize: {
      '2xs': '0.75rem',
      xs: '0.8125rem',
      sm: '0.875rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.6875rem',
      '3xl': '2.1875rem',
    },
    screens: {
      sm: '600px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        accent: '#02ADD7',
        emphasis: '#103441',
        subdued: '#758C95',
        border: '#D2DADF',
      },
      letterSpacing: {
        '2xs': '-0.12px',
        xs: '-0.13px',
        sm: '-0.14px',
        base: '-0.16px',
        xl: '-0.20px',
        '2xl': '-0.27px',
        '3xl': '-0.35px',
      },
      borderRadius: {
        DEFAULT: '5px',
      },
    },
  },
  plugins: [],
  prefix: 'tw-',
};
