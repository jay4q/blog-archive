module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  // darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'paper': '#f1e6d6'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              color: theme('colors.black'),
              // boxShadow: '0 1px 0 0 currentColor',
            },
            p: {
              color: theme('colors.black'),
            },
            blockquote: {
              borderLeftColor: theme('colors.black'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.black'),
            },
            'ul > li': {
              color: theme('colors.black'),
            },
            'ol > li::before': {
              color: theme('colors.black'),
            },
            'ol > li': {
              color: theme('colors.black'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      scale: ['group-hover']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
}
