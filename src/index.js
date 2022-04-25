import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import "./styles/index.css"
import "./styles/loader.css"
import "./styles/transitions.css"
import App from "./features/app/App"
import { ThemeCustomProvider } from "./contexts/ThemeProvider"
import { SettingsProviders } from "./contexts/SettingsProvider"

window.DEBUG = false

ReactDOM.render(
	<SettingsProviders>
		<ThemeCustomProvider>
			<App />
		</ThemeCustomProvider>
	</SettingsProviders>,
	document.getElementById("root")
)

serviceWorker.unregister()
