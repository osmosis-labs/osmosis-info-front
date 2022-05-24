import { makeStyles } from "@material-ui/core"
import { useEffect, useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import {
	detectBestDecimalsDisplay,
	formateNumberPrice,
	formateNumberPriceDecimals,
	getPercent,
} from "../../../helpers/helpers"
import TokenPath from "./TokenPath"
import TokenTitle from "./TokenTitle"
import ContainerCharts from "./ContainerCharts"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import ExpertChartDialog from "./expertChart/ExpertChartDialog"
import TrxTable from "./trxTable/trxTable"
import { useSettings } from "../../../contexts/SettingsProvider"
import { useToast } from "../../../contexts/Toast.provider"
import {
	useHistoricalToken,
	useLiquidityToken,
	useToken,
	useTrxToken,
	useVolumeToken,
} from "../../../hooks/data/tokens.hook"

const useStyles = makeStyles((theme) => {
	return {
		tokenRoot: {
			width: "100vw",
			minHeight: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		tokenContainer: {
			margin: `${theme.spacing(2)}px 0`,
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
			position: "relative",
			maxWidth: "1200px",
			width: "90%",
		},
		charts: {
			display: "grid",
			gridTemplateColumns: "300px 1fr",
			gap: theme.spacing(1),

			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				gridTemplateRows: "1fr 1fr",
			},
		},
		right: {
			position: "relative",
			zIndex: "0",
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			flexGrow: "1",
		},

		details: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			minHeight: "350px",
		},
		detail: {
			width: "100%",
			padding: "0px 0px 50px 0",
		},
		dataDetail: {
			fontSize: "1.5rem",
			color: theme.palette.gray.contrastText,
		},
		detailsValues: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			paddingTop: "10px",
			width: "100%",
		},
		dataDetailChange: {
			fontSize: "1.2rem",
		},
		titleDetail: {
			fontWeight: "600",
		},
		tokenPrice: {
			marginTop: "20px",
			fontWeight: "500",
			fontSize: "36px",
			paddingLeft: "10px",
			color: theme.palette.gray.contrastText,
		},

		containerInfo: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			alignItems: "flex-start",
			minHeight: "180px",
		},
		loaderDetails: {
			position: "relative",
			height: "100%",
			width: "100%",
			display: "flex",
		},
		actions: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			marginBottom: theme.spacing(1),
		},
		actionLabel: {
			paddingRight: "10px",
			fontSize: "0.9rem",
		},
		loading: {
			backgroundColor: `${theme.palette.primary.dark}`,
			borderRadius: theme.spacing(2),
		},
		containerHideShow: {
			overflow: "hidden",
			display: "flex",
			flexGrow: "1",
			flexDirection: "column",
		},
		hide: {
			display: "none",
		},
		show: {
			display: "flex",
			flexGrow: "1",
			flexDirection: "column",
		},

		colorUp: { color: theme.palette.green.text },
		colorDown: { color: theme.palette.error.main },
		containerUpDown: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
		trxContainer: {
			marginBottom: `${theme.spacing(2)}px`,
			position: "relative",
			overflow: "hidden",
		},
	}
})

const Token = () => {
	const classes = useStyles()
	const history = useHistory()
	const { showToast } = useToast()

	const { symbol } = useParams()
	const { settings, updateSettings } = useSettings()

	const priceDecimals = useRef(2)

	const [openExpertChart, setOpenExpertChart] = useState(false)

	const [rangePrice, setRangePrice] = useState(60)
	const [rangeLiquidity, setRangeLiquidity] = useState("d")
	const [rangeVolume, setRangeVolume] = useState("d")

	//token
	const { data: tkn, isLoading: isLoadingTkn, isFetching: isFetchingTkn } = useToken({ symbol })
	const isLoadingToken = isLoadingTkn || isFetchingTkn
	const [token, setToken] = useState({ ...tkn })

	//Transactions
	const {
		data: trxs,
		isLoading: isLdgTrx,
		isFetching: isFetchingTrx,
	} = useTrxToken({ symbol: token.symbol, limit: 100 })
	const isLoadingTrx = isLdgTrx || isFetchingTrx

	//Historical
	const {
		data: historical,
		isLoading: isLdgHistorical,
		isFetching: isFetchingHistorical,
	} = useHistoricalToken({ symbol: tkn.symbol, tf: rangePrice })
	const isLoadingHistorical = isLdgHistorical || isFetchingHistorical

	//Volume
	const { data: volume, isLoading: isLdgVolume, isFetching: isFetchingVolume } = useVolumeToken({ symbol: tkn.symbol })
	const isLoadingVolume = isLdgVolume || isFetchingVolume

	//Liquidity
	const {
		data: liquidity,
		isLoading: isLdgLiquidity,
		isFetching: isFetchingLiquidity,
	} = useLiquidityToken({ symbol: tkn.symbol })
	const isLoadingLiquidity = isLdgLiquidity || isFetchingLiquidity
	const isLoadingChart = isLoadingHistorical || isLoadingVolume || isLoadingLiquidity || isLoadingToken

	useEffect(() => {
		// Check if we have a symbol
		if (!symbol) {
			showToast({
				severity: "warning",
				text: "Token not found, you are redirected to tokens page.",
			})
			history.push("/tokens")
		}
	}, [symbol, showToast, history])

	useEffect(() => {
		// check if we have a token with the symbol
		if (symbol && !isLoadingToken) {
			if (tkn.symbol) {
				//Frontier --> all data
				if (settings.type === "app" && !tkn.main) {
					// Only on frontier -> need to change
					// needed because conflict with theme button
					window.setTimeout(() => {
						updateSettings({ type: "frontier" })
						showToast({
							severity: "info",
							text: "You are redirected to frontier because the token does not exist on main.",
						})
					}, 500)
				}
			} else {
				showToast({
					severity: "warning",
					text: "Token not found, you are redirected to tokens page.",
				})
				history.push("/tokens")
			}
		}
	}, [symbol, tkn, isLoadingToken, settings.type])

	useEffect(() => {
		// needed to update price of token
		if (tkn.symbol && historical.length > 0) {
			priceDecimals.current = detectBestDecimalsDisplay(historical[0].close)
			setToken((t) => ({ ...tkn, price: historical[historical.length - 1].close }))
		}
	}, [tkn, historical])

	const onOpenExpertChart = () => {
		setOpenExpertChart(true)
	}

	const onCloseExpertChart = () => {
		setOpenExpertChart(false)
	}

	const changeRange = ({ range, typeChart }) => {
		if (typeChart === "price") {
			setRangePrice(range)
		} else if (typeChart === "liquidity") {
			setRangeLiquidity(range)
		} else if (typeChart === "volume") {
			setRangeVolume(range)
		}
	}

	return (
		<div className={classes.tokenRoot}>
			<ExpertChartDialog open={openExpertChart} onClose={onCloseExpertChart} token={token} />

			<div className={classes.tokenContainer}>
				<ContainerLoader className={classes.containerInfo} isLoading={isLoadingToken}>
					<TokenPath token={token} />
					<TokenTitle token={token} />
					<p className={classes.tokenPrice}>{formateNumberPriceDecimals(token.price, priceDecimals.current)}</p>
				</ContainerLoader>
				<div className={classes.charts}>
					<Paper className={classes.loaderDetails}>
						<BlocLoaderOsmosis open={isLoadingToken} classNameLoading={classes.loading} />
						<div className={classes.details}>
							<div className={classes.detail}>
								<p className={classes.titleDetail}>Liquidity</p>
								<div className={classes.detailsValues}>
									<p className={classes.dataDetail}>{formateNumberPrice(token.liquidity)}</p>
									<p
										className={
											token.liquidity24hChange < 0
												? `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
												: token.liquidity24hChange > 0
												? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
												: classes.dataDetailChange
										}
									>
										{token.liquidity24hChange > 0 ? "↑" : token.liquidity24hChange < 0 ? "↓" : <span />}
										{getPercent(Math.abs(token.liquidity24hChange))}
									</p>
								</div>
							</div>
							<div className={classes.detail}>
								<p className={classes.titleDetail}>Volume (24hrs)</p>
								<div className={classes.detailsValues}>
									<p className={classes.dataDetail}>{formateNumberPrice(token.volume24h)}</p>
									<p
										className={
											token.volume24hChange > 0
												? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
												: token.volume24hChange < 0
												? `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
												: classes.dataDetailChange
										}
									>
										{token.volume24hChange > 0 ? "↑" : token.volume24hChange < 0 ? "↓" : <span />}
										{getPercent(Math.abs(token.volume24hChange))}
									</p>
								</div>
							</div>

							<div className={classes.detail}>
								<p className={classes.titleDetail}>Price</p>
								<div className={classes.detailsValues}>
									<p className={classes.dataDetail}>{formateNumberPriceDecimals(token.price, priceDecimals.current)}</p>
									<p
										className={
											token.price24hChange === 0
												? classes.dataDetailChange
												: token.price24hChange > 0
												? `${classes.dataDetailChange} ${classes.colorUp} ${classes.containerUpDown}`
												: `${classes.dataDetailChange} ${classes.colorDown} ${classes.containerUpDown}`
										}
									>
										{token.price24hChange > 0 ? "↑" : token.price24hChange < 0 ? "↓" : <span />}
										{getPercent(Math.abs(token.price24hChange))}
									</p>
								</div>
							</div>
						</div>
					</Paper>
					<Paper className={classes.right}>
						<BlocLoaderOsmosis open={isLoadingChart} classNameLoading={classes.loading} />
						<div className={classes.containerHideShow}>
							<ContainerCharts
								token={token}
								onOpenExpertChart={onOpenExpertChart}
								changeRange={changeRange}
								isLoading={isLoadingChart}
								rangePrice={rangePrice}
								rangeLiquidity={rangeLiquidity}
								rangeVolume={rangeVolume}
								dataPrice={historical}
								dataVolume={volume[rangeVolume]}
								dataLiquidity={liquidity[rangeLiquidity]}
							/>
						</div>
					</Paper>
				</div>
				<Paper className={classes.trxContainer}>
					<BlocLoaderOsmosis open={isLoadingTrx} classNameLoading={classes.loading} borderRadius={true} />
					<TrxTable data={trxs} />
				</Paper>
			</div>
		</div>
	)
}

export default Token
