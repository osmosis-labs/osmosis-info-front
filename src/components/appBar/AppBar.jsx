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
	const diplayMessage = false
	const message =
		"Terra blockchain has resumed with on-chain swaps and IBC channels disabled. LUNA and UST pools rewards will drain and UST LP depool shortly"

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
