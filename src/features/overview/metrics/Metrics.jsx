import { makeStyles } from "@material-ui/core"
import Paper from "../../../components/paper/Paper"
import { useMetrics } from "../../../contexts/MetricsProvider"
import logo from "../../../components/appBar/logo.png"
import InsertChartIcon from "@material-ui/icons/InsertChart"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ButtonGroup from "../../../components/buttonGroup/ButtonGroup"
import { useState } from "react"
import { formateNumberDecimals, formatPercent } from "../../../helpers/helpers"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { usePrices } from "../../../contexts/PricesProvider"
const useStyles = makeStyles((theme) => {
	return {
		metricsRoot: {},
		metrics: {
			display: "grid",
			gridTemplateColumns: "6fr 6fr 7fr 5fr",
			columnGap: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				rowGap: theme.spacing(1),
			},
		},
		metric: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			width: "100%",
		},

		infoContainer: {
			width: "100%",
		},
		titleButton: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
		infoContainerButton: {
			marginTop: theme.spacing(1),
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
		title: {
			marginBottom: "4px",
		},
		logo: {
			height: "30px",
			width: "30px",
		},
		osmosPrice: {
			display: "flex",
			alignItems: "center",
		},
		osmosPricePrice: { marginRight: theme.spacing(1.5), fontWeight: "600" },
		osmosPriceVolume: { marginRight: theme.spacing(1.5), fontWeight: "600" },
		osmosPriceChange: {},
		osmosPriceChangeUp: { color: theme.palette.green.text },
		osmosPriceChangeDown: { color: theme.palette.error.main },
		iconUp: { color: theme.palette.green.text },
		iconDown: {
			color: theme.palette.error.main,
		},
		classNameLogoLoading: {
			maxHeight: "130px",
		},
		classNameLoading: {
			backgroundColor: theme.palette.primary.light,
		},
	}
})

const Metrics = () => {
	const classes = useStyles()
	const {
		osmosPrice,
		osmosChange24h,
		nbToken,
		volume24h,
		volume24hChange,
		liquidityUSD,
		liquidityUSD24h,
		liquidityAtom,
		liquidityAtom24h,
		liquidityOsmo,
		liquidityOsmo24h,
		loadingMetrics,
	} = useMetrics()
	const { priceOsmoBrut } = usePrices()


	const [typeLiquidity, setTypeLiquidity] = useState("USD")

	const onChangeTypeLiquidity = (type) => {
		setTypeLiquidity(type)
	}
	return (
		<div className={classes.metricsRoot}>
			<div className={classes.metrics}>
				<Paper className={classes.metric}>
					<BlocLoaderOsmosis
						open={loadingMetrics}
						classNameLogoLoading={classes.classNameLogoLoading}
						classNameLoading={classes.classNameLoading}
						borderRadius={true}
					/>
					<div className={classes.infoContainer}>
						<p className={classes.title}>OSMO (-24h)</p>
						<div className={classes.osmosPrice}>
							<span
								className={
									osmosChange24h < 0
										? `${classes.osmosPriceChangeDown} ${classes.osmosPricePrice}`
										: `${classes.osmosPriceChangeUp} ${classes.osmosPricePrice}`
								}
							>
								${formateNumberDecimals(priceOsmoBrut)}
							</span>
							<span
								className={
									osmosChange24h < 0
										? `${classes.osmosPriceChangeDown} ${classes.osmosPriceChange}`
										: `${classes.osmosPriceChangeUp} ${classes.osmosPriceChange}`
								}
							>
								{osmosChange24h > 0 ? "+" : ""}
								{formatPercent(osmosChange24h, 3)}
							</span>
							{osmosChange24h > 0 ? (
								<ArrowDropUpIcon className={classes.iconUp} />
							) : osmosChange24h < 0 ? (
								<ArrowDropDownIcon className={classes.iconDown} />
							) : null}
						</div>
					</div>
					<img src={logo} alt="logo" className={classes.logo} />
				</Paper>
				<Paper className={classes.metric}>
					<BlocLoaderOsmosis
						open={loadingMetrics}
						classNameLogoLoading={classes.classNameLogoLoading}
						classNameLoading={classes.classNameLoading}
						borderRadius={true}
					/>
					<div className={classes.infoContainer}>
						<p className={classes.title}>24H VOLUME</p>
						<div className={classes.osmosPrice}>
							<span
								className={
									volume24hChange < 0
										? `${classes.osmosPriceChangeDown} ${classes.osmosPriceVolume}`
										: `${classes.osmosPriceChangeUp} ${classes.osmosPriceVolume}`
								}
							>
								${formateNumberDecimals(volume24h, 0)}
							</span>
							<span
								className={
									volume24hChange < 0
										? `${classes.osmosPriceChangeDown} ${classes.osmosPriceChange}`
										: `${classes.osmosPriceChangeUp} ${classes.osmosPriceChange}`
								}
							>
								{volume24hChange > 0 ? "+" : ""}
								{formatPercent(volume24hChange, 2)}
							</span>
							{volume24hChange > 0 ? (
								<ArrowDropUpIcon className={classes.iconUp} />
							) : volume24hChange < 0 ? (
								<ArrowDropDownIcon className={classes.iconDown} />
							) : null}
						</div>
					</div>
					<InsertChartIcon />
				</Paper>
				<Paper className={classes.metric}>
					<BlocLoaderOsmosis
						open={loadingMetrics}
						classNameLogoLoading={classes.classNameLogoLoading}
						classNameLoading={classes.classNameLoading}
						borderRadius={true}
					/>
					<div className={classes.infoContainer}>
						<div className={classes.titleButton}>
							<span className={classes.title}>24H LIQUIDITY</span>
							<ButtonGroup
								className={classes.groupButton}
								buttons={[
									{
										id: "USD",
										name: "USD",
										onClick: () => {
											onChangeTypeLiquidity("USD")
										},
									},
									{
										id: "ATOM",
										name: "ATOM",
										onClick: () => {
											onChangeTypeLiquidity("ATOM")
										},
									},
									{
										id: "OSMO",
										name: "OSMO",
										onClick: () => {
											onChangeTypeLiquidity("OSMO")
										},
									},
								]}
								active={typeLiquidity}
							/>
						</div>
						<div className={classes.infoContainerButton}>
							{typeLiquidity === "USD" ? (
								<div className={classes.osmosPrice}>
									<span
										className={
											liquidityUSD24h < 0
												? `${classes.osmosPriceChangeDown} ${classes.osmosPriceVolume}`
												: `${classes.osmosPriceChangeUp} ${classes.osmosPriceVolume}`
										}
									>
										${formateNumberDecimals(liquidityUSD, 0)}
									</span>
									<span
										className={
											liquidityUSD24h < 0
												? `${classes.osmosPriceChangeDown} ${classes.osmosPriceChange}`
												: `${classes.osmosPriceChangeUp} ${classes.osmosPriceChange}`
										}
									>
										{liquidityUSD24h > 0 ? "+" : ""}
										{formatPercent(liquidityUSD24h, 2)}
									</span>
									{liquidityUSD24h > 0 ? (
										<ArrowDropUpIcon className={classes.iconUp} />
									) : liquidityUSD24h < 0 ? (
										<ArrowDropDownIcon className={classes.iconDown} />
									) : null}
								</div>
							) : typeLiquidity === "ATOM" ? (
								<div className={classes.osmosPrice}>
									<span
										className={
											liquidityAtom24h < 0
												? `${classes.osmosPriceChangeDown} ${classes.osmosPriceVolume}`
												: `${classes.osmosPriceChangeUp} ${classes.osmosPriceVolume}`
										}
									>
										{formateNumberDecimals(liquidityAtom, 0)}
									</span>
									<span
										className={
											liquidityAtom24h < 0
												? `${classes.osmosPriceChangeDown} ${classes.osmosPriceChange}`
												: `${classes.osmosPriceChangeUp} ${classes.osmosPriceChange}`
										}
									>
										{liquidityAtom24h > 0 ? "+" : ""}
										{formatPercent(liquidityAtom24h, 3)}
									</span>
									{liquidityAtom24h > 0 ? (
										<ArrowDropUpIcon className={classes.iconUp} />
									) : liquidityAtom24h < 0 ? (
										<ArrowDropDownIcon className={classes.iconDown} />
									) : null}
								</div>
							) : typeLiquidity === "OSMO" ? (
								<div className={classes.osmosPrice}>
									<span
										className={
											liquidityOsmo24h < 0
												? `${classes.osmosPriceChangeDown} ${classes.osmosPriceVolume}`
												: `${classes.osmosPriceChangeUp} ${classes.osmosPriceVolume}`
										}
									>
										{formateNumberDecimals(liquidityOsmo, 0)}
									</span>
									<span
										className={
											liquidityOsmo24h < 0
												? `${classes.osmosPriceChangeDown} ${classes.osmosPriceChange}`
												: `${classes.osmosPriceChangeUp} ${classes.osmosPriceChange}`
										}
									>
										{liquidityOsmo24h > 0 ? "+" : ""}
										{formatPercent(liquidityOsmo24h, 3)}
									</span>
									{liquidityOsmo24h > 0 ? (
										<ArrowDropUpIcon className={classes.iconUp} />
									) : liquidityOsmo24h < 0 ? (
										<ArrowDropDownIcon className={classes.iconDown} />
									) : null}
								</div>
							) : null}
							<MonetizationOnIcon />
						</div>
					</div>
				</Paper>
				<Paper className={classes.metric}>
					<BlocLoaderOsmosis
						open={loadingMetrics}
						classNameLogoLoading={classes.classNameLogoLoading}
						classNameLoading={classes.classNameLoading}
						borderRadius={true}
					/>
					<div className={classes.infoContainer}>
						<p className={classes.title}>TOKEN NUMBER</p>
						<div className={classes.osmosPrice}>
							<span className={classes.osmosPriceVolume}>{nbToken}</span>
						</div>
					</div>
					<AccountBalanceWalletIcon />
				</Paper>
			</div>
		</div>
	)
}

export default Metrics
