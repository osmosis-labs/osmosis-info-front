import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import "./index.css"
import App from "./features/app/App"

// Create theme for the application
// It's used in material ui components and usable in custom components
let colors = {
	palette: {
		type: "dark",
		// primary: {
		//   light: "#b65bee",
		//   main: "#8229bb",
		//   dark: "#4f008a",
		//   contrastText: "#ffffff",
		// },
		primary: {
			light: "rgb(45, 39, 85)",
			main: "rgb(35, 29, 75)",
			dark: "rgb(28, 23, 60)",
			dark2: "rgb(23, 15, 52)",
			contrastText: "#ffffff",
		},
		error: {
			light: "#ff8080",
			main: "#ff5c5c",
			dark: "#ff3b3b",
			contrastText: "#f2f2f5",
		},
		success: {
			light: "#57eba1",
			main: "#39d98a",
			dark: "#06c270",
			contrastText: "#f2f2f5",
		},
		info: {
			light: "#9dbff9",
			main: "#5b8def",
			dark: "#0063f7",
			contrastText: "#f2f2f5",
		},
		warning: {
			light: "#ffc947",
			main: "#ff9800",
			dark: "#c66900",
			contrastText: "#000000",
		},
		black: {
			dark: "#000000",
			main: "#191B1F",
			light: "#1f2128",

			other: "#2C2F36",
			contrastText: "#FFFFFF",
		},
		gray: {
			light: "#40444f",
			main: "#c3c5cb",
			dark: "#6c7284",
			contrastText: "#FFFFFF",
		},
		yellow: {
			main: "#dddf39",
			rgb: "221, 223, 57",
		},
	},
}

const fontSize = {
	verySmall: "12px",
	small: "14px",
	medium: "16px",
	big: "24px",
	veryBig: "32px",
}
const theme = createMuiTheme({
	...colors,
	fontSize,
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 760,
			lg: 960,
			xl: 1280,
		},
	},
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: fontSize.medium,
			},
		},
	},
})

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
