/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class'],

  theme: {
    colors: {
      white: {
        full: "#FFFFFF",
        high: "rgba(255, 255, 255, 0.95)",
        emphasis: "rgba(255, 255, 255, 0.87)",
        mid: "rgba(255, 255, 255, 0.6)",
        disabled: "rgba(255, 255, 255, 0.38)",
        faint: "rgba(255, 255, 255, 0.12)",
      },
      black: {
        full: "rgba(0, 0, 0, 1)",
        high: "rgba(0, 0, 0, 0.95)",
        emphasis: "rgba(0, 0, 0, 0.87)",
        mid: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)",
        faint: "rgba(0, 0, 0, 0.12)",
      },
      main: {
        100: "#E4E1FB",
        200: "#CEC8F3",
        300: "#B0AADC",
        400: "#958FC0",
        500: "#736CA3",
        600: "#565081",
        700: "#3C356D",
        800: "#282750",
        900: "#140F34",
        1000: "#090524",
      },
      frontier: {
        100: "#fbf0db",
        200: "#f6e1b8",
        300: "#f2d194",
        400: "#edc271",
        500: "#e9b34d",
        600: "#ba8f3e",
        700: "#8c6b2e",
        800: "#5d481f",
        900: "#2f240f",
        1000: "#0c0000"
      },
      ammelia: {
        100: "#F8DEF3",
        200: "#F0B8E6",
        300: "#E196DB",
        400: "#D779CF",
        500: "#CC54C2",
        600: "#CA2EBD",
        700: "#A51399",
        800: "#87087C",
      },
      rust: {
        100: "#FAE1D9",
        200: "#F8C2B0",
        300: "#F5A68C",
        400: "#F99575",
        500: "#FA825D",
        600: "#E06640",
        700: "#C6451C",
        800: "#B03A20",
      },
      bullish: {
        100: "#EBFFFB",
        200: "#C7F8EF",
        300: "#95EEDE",
        400: "#6BDEC9",
        500: "#29D0B2",
        600: "#00A399",
        700: "#007077",
        800: "#003F47",
      },
      ion: {
        100: "#DCF9FF",
        200: "#BAF3FF",
        300: "#87DDF8",
        400: "#64C5EE",
        500: "#2994D0",
        600: "#1469AF",
        700: "#0C487A",
        800: "#02345E",
      },
      wosmongton: {
        100: "#D3D1FF",
        200: "#B3B1FD",
        300: "#8C8AF9",
        400: "#6A67EA",
        500: "#5B57FA",
        600: "#462ADF",
        700: "#361FB3",
        800: "#2D1B8F",
      },
      backdrop: {
        main: "rgba(20, 15, 52, 0.7)"
      },
    },
    backgroundSize: {
      "size-x-200": "200% 100%"
    },
    backgroundPosition: {
      'pos-0': '0% 0%',
      'pos-100': '100% 0%',
    },
    fontFamily: {
      title: ['Poppins', "ui-sans-serif", "system-ui"],
      body: ['Inter', "ui-sans-serif", "system-ui"],
    },
    screens: {
      "3xl": { max: "1792px" },
      // => @media (max-width: 1792px) { ... }

      "2xl": { max: "1536px" },
      // => @media (max-width: 1536px) { ... }

      "1.5xl": { max: "1408px" },
      // => @media (max-width: 1408px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      "1.5lg": { max: "1152px" },
      // => @media (max-width: 1152px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      "1.5md": { max: "896px" },
      // => @media (max-width: 896px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 640px) { ... }

      "1.5xs": { max: "512px" },
      // => @media (max-width: 512px) { ... }

      xs: { max: "420px" },
    },
    extend: {
      maxWidth: {
        container: "1280px"
      },
      transitionDuration: {
        default: "300ms",
        fast: "150ms",
      },
      gridTemplateRows: {
        itemMenu: '2fr 1fr',
      },
    },
    plugins: [],
  }
}
