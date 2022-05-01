import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import { formateNumberDecimalsAuto, getPercent } from "../../../helpers/helpers"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"

const useStyles = makeStyles((theme) => {
	return {
		rootOverview: {
			position: "relative",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			backgroundColor: theme.palette.primary.dark2,
			[theme.breakpoints.down("xs")]: {},
		},
		loading: {
			backgroundColor: theme.palette.primary.dark2,
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
			flexWrap: "wrap",
		},
		info: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
			marginRight: "80px"
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
			color: theme.palette.table.cellDark,
		},
		containerNotFound: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		iconNotFound: {
			width: "110px !important",
			height: "110px !important",
			color: theme.palette.primary.light2,
			padding: "24px",
			borderRadius: "50%",
			backgroundColor: theme.palette.primary.main,
		},
		textNotFound: {
			marginTop: "16px",
			color: theme.palette.primary.light2,
			fontSize: "20px",
		},
		percent:{
			marginLeft: "6px",
			fontSize: "20px"
		}
	}
})
const Overview = () => {
	const classes = useStyles()
	const { address, getWalletInfo } = useDashboard()
	const [balance, setBalance] = useState(0)
	const [worth, setWorth] = useState(0)
	const [osmosStaked, setOsmosStaked] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true)
			let { worth, balance } = await getWalletInfo({ address })
			setWorth(worth)
			setBalance(balance)
			setOsmosStaked(balance.tokenValueWallet)
			setIsLoading(false)
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
			return <span className={`${classes.percent} ${classes.up}`}>↑{getPercent(value)}</span>
		} else if (value < 0) {
			return <span className={`${classes.percent} ${classes.down}`}>↓{getPercent(Math.abs(value))}</span>
		} else return <span className={`${classes.percent}`}>{getPercent(value)}</span>
	}

	const getProfit = () => {}

	if (!address || address.length === 0)
		return (
			<div className={classes.rootOverview}>
				<div className={classes.container}>
					<p className={classes.title}>History Trading</p>
					<div className={classes.containerNotFound}>
						<AccountBalanceWalletIcon className={classes.iconNotFound} />
						<p className={classes.textNotFound}>Wallet not found.</p>
					</div>
				</div>
			</div>
		)

	return (
		<div className={classes.rootOverview}>
			<BlocLoaderOsmosis open={isLoading} classNameLoading={classes.loading} />

			<div className={classes.container}>
				<p className={classes.title}>Analytics</p>
				<div className={classes.containerInfo}>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Total worth</p>
						<p className={classes.dataInfo}>${formateNumberDecimalsAuto({ price: worth })}</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Profit / Loss (24h)</p>
						<p className={classes.dataInfo}>
							{getProfit()}
							{balance.tokenValuePnl24h == 0 ? "" : balance.tokenValuePnl24h > 0 ? "+" : "-"} $
							{formateNumberDecimalsAuto({ price: Math.abs(balance.tokenValuePnl24h) })}
							{getPercentDisplay(balance.tokenValueChange24h)}
						</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Available liquidity</p>
						<p className={classes.dataInfoReturn}>
							${formateNumberDecimalsAuto({ price: osmosStaked })}
							{/* <span className={classes.token}>OSMOS</span> */}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Overview
