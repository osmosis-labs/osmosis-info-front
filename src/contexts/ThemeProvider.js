import { createContext, useContext, useEffect, useState } from "react"
import { createTheme } from "@material-ui/core/styles"
import { useSettings } from "./SettingsProvider"
const ThemeCustomContext = createContext()

export const useThemeCustom = () => useContext(ThemeCustomContext)

export const ThemeCustomProvider = ({ children }) => {
	const { settings } = useSettings()
	let colors = {
		type: "dark",
		blueButton: {
			color: "#FFFFFF",
			background: "#322DC2",
			backgroundHover: "#534bae",
			backgroundDisabled: "#FFFFFF67",
			colorDisabled: "#FFFFFF61",
		},
		yellowButton: {
			background: "#C4A46A14",
			backgroundHover: "#92753e14",
		},
		error: {
			light: "#ff8080",
			main: "#EF3456",
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
			textLight: "rgba(255, 255, 255, 0.7)",
			textDark: "rgba(255, 255, 255, 0.4)",
			textLight2: "rgba(255, 255, 255, 0.55)",
			textDark2: "rgba(255, 255, 255, 0.2)",
			textDark3: "rgba(255, 255, 255, 0.1)",
			contrastText: "#FFFFFF",
		},
		yellow: {
			main: "#dddf39",
			rgb: "221, 223, 57",
			gold: "#C4A46A",
		},
		blue: {
			main: "#322DC2",
		},
		green: {
			first: "#52EB7D63",
			second: "#52EB7D3D",
			third: "#52EB7D16",
			text: "#52EB7D",
			subText: "#00CEBA",
			background: "#52EB7D2A",
		},
		red: {
			first: "#ef535063",
			second: "#ef53503D",
			third: "#ef535016",
			subText: "#EF3456",
			background: "#EF34562A",
		},
	}

	const fontSize = {
		verySmall: "12px",
		small: "14px",
		medium: "16px",
		big: "24px",
		veryBig: "32px",
	}

	let baseTheme = {
		fontSize,
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 760,
				lg: 1280,
				xl: 1420,
			},
		},
		menuHeight: {
			mobile: "108",
			desktop: "124",
		},
		zIndex: {
			loader: 100,
			dialog: 200,
			appBar: 300,
		},
		overrides: {
			MuiTooltip: {
				tooltip: {
					fontSize: fontSize.medium,
				},
			},
		},
	}

	let colorsApp = {
		primary: {
			light: "rgb(45, 39, 85)",
			lightLowOpacity: "rgba(45, 39, 85, 0.9)",
			light2: "#8E83AA",
			main: "rgb(35, 29, 75)",
			main2: "#39316B",
			dark: "rgb(28, 23, 60)",
			dark2: "rgb(23, 15, 52)",
			contrastText: "#ffffff",
		},
		table: {
			cell: "#FFFFFFDE",
			cellDark: "#FFFFFF66",
			border: "rgb(45, 36, 70)",
			badgeBackground: "#C4A46A1F",
			badgeText: "#C4A46A",
			link: "#4885ff",
			link2: "#8d8bff",
			hover: "rgba(255, 255, 255, 0.08)",
		},
	}

	let colorsFronier = {
		primary: {
			light: "rgb(65 61 66)",
			lightLowOpacity: "rgba(65 61 66, 0.9)",
			main: "rgb(46, 44, 47)",
			dark: "rgb(41, 36, 33)",
			dark2: " rgb(34, 27, 24)",
			contrastText: "#ffffff",
		},
		table: {
			cell: "#FFFFFFDE",
			cellDark: "#FFFFFF66",
			border: "rgb(58,56,59)",
			badgeBackground: "#C4A46A1F",
			badgeText: "#C4A46A",
			link: "#4885ff",
			link2: "#8d8bff",
			hover: "rgba(255, 255, 255, 0.08)",
		},
	}
	const themeCustomApp = createTheme({ ...baseTheme, palette: { ...colors, ...colorsApp } })

	const themeCustomFrontier = createTheme({ ...baseTheme, palette: { ...colors, ...colorsFronier } })

	return (
		<ThemeCustomContext.Provider value={settings.type === "app" ? themeCustomApp : themeCustomFrontier}>
			{children}
		</ThemeCustomContext.Provider>
	)
}
