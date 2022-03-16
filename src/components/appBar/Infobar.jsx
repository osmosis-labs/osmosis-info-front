import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { usePrices } from "../../contexts/PricesProvider"
import SoundPlay from "../../patrickTheme/soundPlay"
const useStyles = makeStyles((theme) => {
	return {
		infoBarRoot: {
			position: "fixed",
			zIndex: "1",
			height: "40px",
		},
		appBarContent: {
			position: "relative",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			height: "100%",
			backgroundColor: theme.palette.primary.dark2,
			maxWidth: "100%",
			width: "100vw",

			fontSize: theme.fontSize.small,
		},

		left: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			paddingLeft: theme.spacing(2),
		},
		right: {
			display: "flex",
			alignItems: "center",
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
	}
})

const InfoBar = () => {
	const classes = useStyles()
	const { priceOsmo, priceIon } = usePrices()
	const [time, setTime] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((ps) => ps + 1)
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	const reload = () => {
		document.location.reload()
	}
	return (
		<div className={classes.infoBarRoot}>
			<div className={classes.appBarContent}>
				<div className={classes.left}>
					<div className={classes.timer} onClick={reload} id="infoBar">
						Uploaded {time}s ago
					</div>
					<p className={classes.prices}>
						OSMO: <em className={classes.price}>{priceOsmo}</em>
					</p>
					<p className={classes.prices}>
						ION: <em className={classes.price}>{priceIon}</em>
					</p>
				</div>
				<SoundPlay />
				<div className={classes.right}>
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
