import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDashboard } from "../../../contexts/dashboard.provider"
import { formateNumberDecimalsAuto, getPercent } from "../../../helpers/helpers"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { useBalance, useExposure } from "../../../hooks/data/dashboard.hook"
import useRequest from "../../../hooks/request.hook"
import { useQuery } from "react-query"
import { formatWorth } from "../../../formaters/dashboard.formatter"

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
			marginRight: "80px",
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
		percent: {
			marginLeft: "6px",
			fontSize: "20px",
		},
	}
})
const Overview = () => {
	const classes = useStyles()
	const { address } = useDashboard()

	//Balance
	const { getter: getterBalance, defaultValue: defaultBalance } = useBalance()
	const { data: dataBalance, isLoading: isLoadingBalance } = useQuery(["balance", { address }], getterBalance, {
		enabled: !!address,
	})
	const balance = dataBalance ? dataBalance : defaultBalance

	//Exposure
	const { getter: getterExposure, defaultValue: defaultExposure } = useExposure()
	const { data: dataExposure, isLoading: isLoadingExposure } = useQuery(["exposure", { address }], getterExposure, {
		enabled: !!address,
	})
	const exposure = dataExposure ? dataExposure : defaultExposure

	const [worth, setWorth] = useState(0)
	const [osmosStaked, setOsmosStaked] = useState(0)
	const [return24h, setReturn24h] = useState(0)
	const [returnChange24h, setReturnChange24h] = useState(0)

	const isLoading = isLoadingBalance || isLoadingExposure

	useEffect(() => {
		if (dataBalance && dataExposure) {
			const worth = formatWorth(balance, exposure)
			setWorth(worth)
			setReturn24h(dataBalance.tokenReturn24)
			setReturnChange24h(dataBalance.tokenReturnChange24)
			setOsmosStaked(dataBalance.tokenValueWallet)
		}
	}, [exposure, balance])

	const getPercentDisplay = (value) => {
		if (value > 0) {
			return <span className={`${classes.percent} ${classes.up}`}>↑{getPercent(value)}</span>
		} else if (value < 0) {
			return <span className={`${classes.percent} ${classes.down}`}>↓{getPercent(Math.abs(value))}</span>
		} else return <span className={`${classes.percent}`}>{getPercent(value)}</span>
	}

	if (!address || address.length === 0)
		return (
			<div className={classes.rootOverview}>
				<div className={classes.container}>
					<p className={classes.title}>Analytics</p>
					<div className={classes.containerNotFound}>
						<AccountBalanceWalletIcon className={classes.iconNotFound} />
						<p className={classes.textNotFound}>Connect your wallet.</p>
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
						<p className={classes.titleInfo}>Available liquidity</p>
						<p className={classes.dataInfoReturn}>${formateNumberDecimalsAuto({ price: osmosStaked })}</p>
					</div>
					<div className={classes.info}>
						<p className={classes.titleInfo}>Return 24h</p>
						<p className={classes.dataInfoReturn}>
							{return24h > 0 ? "+" : ""}${formateNumberDecimalsAuto({ price: return24h })}
							{getPercentDisplay(returnChange24h)}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Overview
