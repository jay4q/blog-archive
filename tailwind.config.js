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
              // boxShadow: '0 1px 0 0 currentColor',
            }
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
