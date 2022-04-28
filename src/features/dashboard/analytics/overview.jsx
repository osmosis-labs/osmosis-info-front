import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import { formateNumberDecimalsAuto, getPercent } from "../../../helpers/helpers"
const useStyles = makeStyles((theme) => {
	return {
		rootOverview: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			backgroundColor: theme.palette.primary.dark2,
			[theme.breakpoints.down("xs")]: {},
		},
		container: {
			padding: "40px 0",
			maxWidth: "1200px",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
		},
		containerInfo: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			flexWrap: "wrap",
		},
		info: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
		},
		titleInfo: {
			margin: "32px 0 16px 0",
			fontSize: "12px",
			color: theme.palette.gray.textLight,
		},
		dataInfo: {
			fontSize: "1.6rem",
			color: theme.palette.primary.contrastText,
		},
		dataInfoReturn: {
			display: "flex",

			flexDirection: "row",
		},
		up: {
			color: theme.palette.green.text,
		},
		down: {
			color: theme.palette.error.main,
		},
		arrow: {
			fontSize: "16px",
			alignSelf: "center",
		},
		returnValue: {
			fontSize: "1.6rem",
			color: theme.palette.primary.contrastText,
			margin: "0 4px",
		},
		percent: {
			fontSize: "16px",
			alignSelf: "flex-end",
		},
	}
})
const Overview = () => {
	const classes = useStyles()
	const { address, getWalletInfo } = useDashboard()
	const [profit, setProfit] = useState(0)
	const [worth, setWorth] = useState(0)
	const [d7, setD7] = useState(0)
	const [d7Percent, setD7Percent] = useState(0)

	useEffect(() => {
		const fetch = async () => {
			let { worth, profit, return7d } = await getWalletInfo({ address })
			setWorth(worth)
			setProfit(profit)
			setD7(return7d.value)
			setD7Percent(return7d.percent)
		}

		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	
	const getArrow = (value) => {
		if (value > 0) {
			return <span className={`${classes.arrow} ${classes.up}`}>↑</span>
		} else if (value < 0) {
			return <span className={`${classes.arrow} ${classes.down}`}>↓</span>
		} else return null
	}

	const getPercentDisplay = (value) => {
		if (value > 0) {
			return <span className={`${classes.percent} ${classes.up}`}>{getPercent(value)}</span>
		} else if (value < 0) {
			return <span className={`${classes.percent} ${classes.down}`}>{getPercent(value)}</span>
		} else return <span className={`${classes.percent}`}>{getPercent(value)}</span>
	}

	return (
		<div className={classes.rootOverview}>
			<div className={classes.container}>
				<p className={classes.title}>History Trading</p>
				<div className={classes.containerInfo}>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Total worth</p>
						<p className={classes.dataInfo}>${formateNumberDecimalsAuto({ price: worth })}</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Profit / Loss</p>
						<p className={classes.dataInfo}>
							{profit > 0 ? "+" : ""} ${formateNumberDecimalsAuto({ price: profit })}
						</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>7 days return</p>
						<p className={classes.dataInfoReturn}>
							{getArrow(d7)}
							<span className={classes.returnValue}>${formateNumberDecimalsAuto({ price: d7 })}</span>
							{getPercentDisplay(d7Percent)}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Overview
