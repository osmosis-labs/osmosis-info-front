import "./wdyr"

import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import "./styles/index.css"
import "./styles/loader.css"
import "./styles/transitions.css"
import AppDesktop from "./features/app/app_desktop"
import { ThemeCustomProvider } from "./contexts/ThemeProvider"
import { SettingsProviders } from "./contexts/SettingsProvider"

ReactDOM.render(
	<SettingsProviders>
		<ThemeCustomProvider>
			<AppDesktop />
		</ThemeCustomProvider>
	</SettingsProviders>,
	document.getElementById("root")
)

serviceWorker.unregister()
