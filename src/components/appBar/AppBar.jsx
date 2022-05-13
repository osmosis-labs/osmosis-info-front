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
	const diplayMessage = true
	const message =
		"The Terra blockchain has resumed with on-chain swaps disabled and IBC channels closed. LUNA and UST pools rewards will drain shortly."

	return (
		<Suspense fallback={""}>
			{isMobile ? (
				<AppBarMobile
					diplayMessage={diplayMessage}
					message={message}
					type={settings.type}
					onChangeType={onChangeType}
				/>
			) : (
				<AppBarDesktop
					diplayMessage={diplayMessage}
					message={message}
					type={settings.type}
					onChangeType={onChangeType}
				/>
			)}
		</Suspense>
	)
}

export default AppBar
