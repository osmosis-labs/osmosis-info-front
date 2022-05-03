import "./wdyr"

import { isMobile } from "react-device-detect"
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import "./styles/index.css"
import "./styles/loader.css"
import "./styles/transitions.css"
const AppDesktop = React.lazy(() => (isMobile ? import("./features/app/app_desktop") : null))
const AppMobile = React.lazy(() => (isMobile ? import("./features/app/app_mobile") : null))
import { ThemeCustomProvider } from "./contexts/ThemeProvider"
import { SettingsProviders } from "./contexts/SettingsProvider"

ReactDOM.render(
	<SettingsProviders>
		<ThemeCustomProvider>
			<Suspense fallback={<div>Loading...</div>}>
				{isMobile ? <AppMobile /> : <AppDesktop />}
			</Suspense>
		</ThemeCustomProvider>
	</SettingsProviders>,
	document.getElementById("root")
)

serviceWorker.unregister()
