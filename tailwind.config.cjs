const tokens = require('./config/uiTokens')

module.exports = {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'headline-lg': ['2rem', { lineHeight: '1.15' }],
        'body-lg': ['1rem', { lineHeight: '1.6' }],
        'label-md': ['0.875rem', { lineHeight: '1.2' }]
      }
    }
  },
  plugins: []
}
