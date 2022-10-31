import { makeStyles } from "@material-ui/core"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDebug } from "../../contexts/debug.provider"
import { useSettings } from "../../contexts/SettingsProvider"
import { usePrices } from "../../hooks/data/prices.hook"
import { useQueryClient } from "react-query"

import Toggle from "../toggle/Toggle"
import ToggleItem from "../toggle/ToggleItem"
import { useHalloween } from "../../contexts/halloween.provider"
const useStyles = makeStyles((theme) => {
	return {
		infoBarRoot: {
			position: "fixed",
			zIndex: theme.zIndex.appBar,
			height: "40px",
		},
		appBarContent: {
			position: "relative",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			height: "100%",
			backgroundColor: theme.palette.primary.dark2,
			maxWidth: "100%",
			width: "100vw",

			fontSize: theme.fontSize.small,
		},

		left: {
			display: "flex",
			flexDirection: "row",
			flexGrow: "2",
			alignItems: "center",
			paddingLeft: theme.spacing(2),
		},
		right: {
			paddingRight: theme.spacing(3),
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		prices: {
			margin: theme.spacing(2),
		},
		price: {
			fontWeight: "700",
			fontStyle: "normal",
		},
		timer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			cursor: "pointer",
			fontSize: "11px",
			padding: "2px 4px 2px 3px",
			backgroundColor: theme.palette.primary.light,
			marginRight: theme.spacing(2),
			borderRadius: "4px",
			"&::before": {
				margin: theme.spacing(0.5),
				content: '""',
				display: "block",
				top: "0",
				left: "0",
				height: "10px",
				width: "10px",
				borderRadius: "50%",
				backgroundColor: theme.palette.success.main,
			},
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		link: {
			color: theme.palette.gray.contrastText,
			textDecoration: "none",
			padding: `0 ${theme.spacing(2)}px`,
			fontSize: theme.fontSize.verySmall,
		},
		debug: {
			padding: `0 ${theme.spacing(2)}px`,
			fontSize: theme.fontSize.verySmall,
			marginRight: "16px !important",
		},
		theme: {
			display: "inline-block",
			marginRight: "16px !important",
		},
	}
})

const InfoBar = () => {
	const classes = useStyles()
	const queryClient = useQueryClient()

	const {
		data: { priceOsmo, priceIon },
	} = usePrices()
	const [time, setTime] = useState(0)
	const { MODE, setOpen } = useDebug()
	const { show, onToggle } = useHalloween()
	const { settings, updateSettings } = useSettings()

	const onChangeType = (event, value) => {
		if (value) {
			updateSettings({ type: value })
		}
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((ps) => ps + 1)
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	const reload = () => {
		queryClient.invalidateQueries()
		setTime((t) => 0)
	}

	const onOpenDebug = () => {
		setOpen(true)
	}
	return (
		<div className={classes.infoBarRoot}>
			<div className={classes.appBarContent}>
				<div className={classes.left}>
					<div className={classes.timer} onClick={reload}>
						Uploaded {time}s ago
					</div>
					<p className={classes.prices}>
						OSMO: <em className={classes.price}>{priceOsmo}</em>
					</p>
					<p className={classes.prices}>
						ION: <em className={classes.price}>{priceIon}</em>
					</p>
				</div>
				<div className={classes.right}>
					{MODE === "dev" && (
						<Button variant="outlined" color="primary" className={classes.debug} onClick={onOpenDebug}>
							Debug
						</Button>
					)}
					<div className={classes.theme}>
						<Toggle color="primary" value={show} exclusive onChange={onToggle}>
							{show ? (
								<ToggleItem value={false}>Hide theme</ToggleItem>
							) : (
								<ToggleItem value={true}>Show theme</ToggleItem>
							)}
						</Toggle>
					</div>
					<Toggle color="primary" value={settings.type} exclusive onChange={onChangeType}>
						<ToggleItem value="app">App</ToggleItem>
						<ToggleItem value="frontier">Frontier</ToggleItem>
					</Toggle>
					<a className={classes.link} href="https://github.com/osmosis-labs" target="_blank">
						Github
					</a>
					<a className={classes.link} href="https://app.osmosis.zone/" target="_blank">
						App
					</a>
				</div>
			</div>
		</div>
	)
}

export default InfoBar
