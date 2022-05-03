import React, { Suspense } from "react"
import { isMobile } from "react-device-detect"
const AppBarDesktop = React.lazy(() => (isMobile ? import("./AppBarDesktop") : null))
const AppBarMobile = React.lazy(() => (isMobile ? import("./AppBarMobil") : null))
import { useTheme, useMediaQuery } from "@material-ui/core"
import { useSettings } from "../../contexts/SettingsProvider"

const AppBar = () => {
	const theme = useTheme()
	const { settings, updateSettings } = useSettings()

	const onChangeType = (event, value) => {
		if (value) {
			updateSettings({ type: value })
		}
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{isMobile ? (
				<AppBarMobile type={settings.type} onChangeType={onChangeType} />
			) : (
				<AppBarDesktop type={settings.type} onChangeType={onChangeType} />
			)}
		</Suspense>
	)
}

export default AppBar
