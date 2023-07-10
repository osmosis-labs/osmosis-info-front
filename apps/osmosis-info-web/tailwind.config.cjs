/* eslint-disable @typescript-eslint/no-var-requires */
const { backgroundSize, backgroundPosition, backgroundImage } = require('../../theme/background');
const { colors } = require('../../theme/colors');
const { fontFamily } = require('../../theme/font');
const { screens } = require('../../theme/screens');
const { transitionDuration } = require('../../theme/transition');
const { maxWidth, width } = require('../../theme/width');

const topMenuHeight = 68;
const sideMenuWidthOpen = 200;
const sideMenuWidthClose = 69;
const paddingChildren = 10;
const bottomMenuHeight = 88;
const detailsReturnHeight = 120;

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],

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
      animation: {
        'bar-mover': 'bar-mover 120s linear infinite',
      },
      keyframes: {
        'bar-mover': {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        }
      },
      translate: {
        detailsReturn: `${detailsReturnHeight}px`,
      },
      maxWidth: {
        ...maxWidth
      },
      maxHeight: {
        detailsReturn: `${detailsReturnHeight}px`,
      },
      height: {
        topMenu: `${topMenuHeight}px`,
        bottomMenu: `${bottomMenuHeight}px`,
        detailsReturn: `${detailsReturnHeight}px`,
      },
      width: {
        ...width,
        sideMenuOpen: `${sideMenuWidthOpen}px`,
        sideMenuClose: `${sideMenuWidthClose}px`,
        childrenClose: `calc(100% - ${sideMenuWidthClose}px)`,
        childrenOpen: `calc(100% - ${sideMenuWidthOpen}px)`,
        container: "1280px",
      },
      spacing: {
        childrenClose: `${topMenuHeight + paddingChildren}px ${paddingChildren}px ${paddingChildren}px ${sideMenuWidthClose + paddingChildren
          }px`,
        childrenOpen: `${topMenuHeight + paddingChildren}px ${paddingChildren}px ${paddingChildren}px ${sideMenuWidthOpen + paddingChildren
          }px`,
        childrenBottomMenu: `${topMenuHeight + paddingChildren}px 0px ${paddingChildren + bottomMenuHeight}px 0px`,
      },

      transitionDuration: {
        ...transitionDuration
      },
      gridTemplateRows: {
        itemMenu: "2fr 1fr",
      },
    },
    plugins: [],
  },
};
