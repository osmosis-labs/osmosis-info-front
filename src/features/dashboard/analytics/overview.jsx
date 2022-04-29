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
		dataInfoReturn: {
			fontSize: "1.6rem",
			color: theme.palette.primary.contrastText,
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-end",
			alignItems: "flex-end",
		},
		token: {
			fontSize: "16px",
			marginLeft: "4px",
			marginBottom: "2px",
            color: theme.palette.table.cellDark
		},
	}
})
const Overview = () => {
	const classes = useStyles()
	const { address, getWalletInfo } = useDashboard()
	const [profit, setProfit] = useState(0)
	const [worth, setWorth] = useState(0)
	const [osmosStaked, setOsmosStaked] = useState(0)

	useEffect(() => {
		const fetch = async () => {
			let { worth, balance } = await getWalletInfo({ address })
			setWorth(worth)
			setProfit(0)
			setOsmosStaked(balance.tokenValueWallet)
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
						<p className={classes.titleInfo}>Osmos liquidity</p>
						<p className={classes.dataInfoReturn}>
							{formateNumberDecimalsAuto({ price: osmosStaked })}
							<span className={classes.token}>OSMOS</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Overview
