import React, { Suspense } from "react"
import { isMobile } from "react-device-detect"
const AppBarDesktop = React.lazy(() => (!isMobile ? import("./AppBarDesktop") : null))
const AppBarMobile = React.lazy(() => (isMobile ? import("./AppBarMobil") : null))
import { useSettings } from "../../contexts/SettingsProvider"

const AppBar = () => {
	const { settings, updateSettings } = useSettings()

	const onChangeType = (event, value) => {
		if (value) {
			updateSettings({ type: value })
		}
	}

	return (
		<Suspense fallback={""}>
			{isMobile ? (
				<AppBarMobile type={settings.type} onChangeType={onChangeType} />
			) : (
				<AppBarDesktop type={settings.type} onChangeType={onChangeType} />
			)}
		</Suspense>
	)
}

export default AppBar
