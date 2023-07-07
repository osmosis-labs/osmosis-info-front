/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

const { backgroundSize, backgroundPosition, backgroundImage } = require('../../theme/background');
const { colors } = require('../../theme/colors');
const { fontFamily } = require('../../theme/font');
const { screens } = require('../../theme/screens');
const { transitionDuration } = require('../../theme/transition');
const { maxWidth, width } = require('../../theme/width');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class'],

  theme: {
    colors: { ...colors },
    backgroundSize: {
      ...backgroundSize
    },
    backgroundPosition: {
      ...backgroundPosition
    },
    backgroundImage: {
      ...backgroundImage
    },
    fontFamily: {
      ...fontFamily
    },
    screens: {
      ...screens
    },
    extend: {
      maxWidth: {
        ...maxWidth
      },

      width: {
        ...width,
      },
      transitionDuration: {
        ...transitionDuration
      },
      gridTemplateRows: {
      },
    },
    plugins: [],
  }
}
