import { useTheme, useMediaQuery } from "@material-ui/core"
import { useSettings } from "../../contexts/SettingsProvider"
import AppBarDesktop from "./AppBarDesktop"
import AppBarMobile from "./AppBarMobil"

const AppBar = () => {
	const theme = useTheme()
	const mobile = useMediaQuery(theme.breakpoints.down("sm"))
	const { settings, updateSettings } = useSettings()

	const onChangeType = (event, value) => {
		if (value) {
			updateSettings({ type: value })
		}
	}

	if (mobile) {
		return <AppBarMobile type={settings.type} onChangeType={onChangeType} />
	} else {
		return <AppBarDesktop type={settings.type} onChangeType={onChangeType} />
	}
}

export default AppBar
