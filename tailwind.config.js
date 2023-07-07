/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef

const { backgroundSize, backgroundPosition, backgroundImage } = require('./theme/background');
const { colors } = require('./theme/colors');
const { fontFamily } = require('./theme/font');
const { screens } = require('./theme/screens');
const { transitionDuration } = require('./theme/transition');
const { maxWidth, width } = require('./theme/width');

const topMenuHeight = 68;
const sideMenuWidthOpen = 200;
const sideMenuWidthClose = 69;
const paddingChildren = 10;
const bottomMenuHeight = 88;

module.exports = {
  content: [
    "./packages/**/*.{js,jsx,ts,tsx}",
    "./apps/**/*.{js,jsx,ts,tsx}",

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
      height: {
      },
      width: {
        ...width,

      },
      transitionDuration: {
        ...transitionDuration
      },
    },
    plugins: [],
  }
}
