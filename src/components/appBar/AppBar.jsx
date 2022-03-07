import { useTheme, useMediaQuery } from "@material-ui/core"
import AppBarDesktop from "./AppBarDesktop"
import AppBarMobile from "./AppBarMobil"

const AppBar = () => {
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"))

	if (mobile) {
		return <AppBarMobile />
	} else {
		return <AppBarDesktop />
	}
}

export default AppBar
