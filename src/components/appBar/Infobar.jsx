import { makeStyles } from "@material-ui/core"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useDebug } from "../../contexts/debug.provider"
import { usePrices } from "../../hooks/data/prices.hook"
import useRequest from "../../hooks/request.hook"
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
	}
})

const InfoBar = () => {
	const classes = useStyles()
	const { getter, defaultValue: defaultPrice } = usePrices()
	const { data: prices } = useQuery(["prices", {}], getter)
	const { priceOsmo, priceIon } = prices ? prices : defaultPrice
	const [time, setTime] = useState(0)
	const { MODE, setOpen } = useDebug()

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((ps) => ps + 1)
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	const reload = () => {
		document.location.reload()
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
						<Button variant="outlined" color="primary" className={classes.link} onClick={onOpenDebug}>
							Debug
						</Button>
					)}
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
