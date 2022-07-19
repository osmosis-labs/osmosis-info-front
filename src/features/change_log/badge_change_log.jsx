import { makeStyles } from "@material-ui/core"
import UpgradeIcon from "@mui/icons-material/Upgrade"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSettings } from "../../contexts/SettingsProvider"
import data from "./change_log"
const BadgeChangeLog = () => {
	const classes = useStyles()
	const history = useHistory()
	const { settings, updateSettings } = useSettings()
	const [newsUpdates, setNewsUpdates] = useState(false)

	useEffect(() => {
		console.log("badge_change_log.jsx (l:14): settings.dateUpdate:", settings.dateUpdate)
		if (!settings.dateUpdate) {
			setNewsUpdates(true)
		} else {
			console.log(
				"badge_change_log.jsx (l:18): new Date(settings.dateUpdate):",
				new Date(settings.dateUpdate),
				data[0].date,
				new Date(settings.dateUpdate) < data[0].date
			)
			if (data.length > 0 && new Date(settings.dateUpdate) < data[0].date) {
				setNewsUpdates(true)
			} else {
				setNewsUpdates(false)
			}
		}
	}, [settings.dateUpdate, data])

	const onClick = () => {
		updateSettings({ dateUpdate: data[0].date })
		history.push(`/changelog`)
	}

	return (
		<span className={classes.rootBadgeChangeLog} onClick={onClick}>
			{newsUpdates ? <span className={classes.badge}>!</span> : null}
			<UpgradeIcon />
		</span>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootBadgeChangeLog: {
			position: "relative",
			margin: "0 8px",
			cursor: "pointer",
			paddingRight: "4px",
			[theme.breakpoints.down("xs")]: {},
		},
		badge: {
			position: "absolute",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			top: "-2px",
			right: "-2px",
			borderRadius: "50%",
			backgroundColor: theme.palette.red.subText,
			padding: "4px",
			height: "16px",
			width: "16px",
			fontSize: "12px",
		},
	}
})

export default BadgeChangeLog
