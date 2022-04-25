import { makeStyles } from "@material-ui/core"
import { useEffect, useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import {
	detectBestDecimalsDisplay,
	formateNumberDecimalsAuto,
	formateNumberPrice,
	formateNumberPriceDecimals,
	getInclude,
	getPercent,
} from "../../../helpers/helpers"
import TokenPath from "./TokenPath"
import TokenTitle from "./TokenTitle"
import ContainerCharts from "./ContainerCharts"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { useTokensV2 } from "../../../contexts/TokensV2.provider"

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ExpertChartDialog from "./expertChart/ExpertChartDialog"
import { useTokenChartV2 } from "../../../contexts/TokenChartV2"
import TrxTable from "./trxTable/trxTable"
import { useSettings } from "../../../contexts/SettingsProvider"

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

const Token = ({ showToast }) => {
	const classes = useStyles()
	const history = useHistory()
	const { symbol } = useParams()
	const { settings, updateSettings } = useSettings()
	const {
		getTokenData,
		tokens,
		allTokens,
		loadingToken,
		loadingCharts,
		getHistoricalChartToken,
		getVolumeChartToken,
		getLiquidityChartToken,
	} = useTokensV2()
	const { getTrxToken, loadingTrx } = useTokenChartV2()
	const [token, setToken] = useState({})
	const priceDecimals = useRef(2)

	const [dataIsLoaded, setDataIsLoaded] = useState(false) // data is loaded

	const [openExpertChart, setOpenExpertChart] = useState(false)

	useEffect(() => {
		// get token from history state
		if (!symbol) {
			showToast({
				severity: "warning",
				text: "Token not found, you are redirected to tokens page.",
			})
			history.push("/tokens")
		} else {
			if (tokens.length > 0) {
				let indexToken = getInclude(allTokens, (token) => token.symbol === symbol)
				if (indexToken >= 0) {
					let currentToken = allTokens[indexToken]
					if (currentToken.main && settings.type === "frontier") {
						updateSettings({ type: "app" })
						showToast({
							severity: "info",
							text: "You are redirected to main because the token does not exist on frontier.",
						})
					} else if (!currentToken.main && settings.type === "app") {
						updateSettings({ type: "frontier" })
						showToast({
							severity: "info",
							text: "You are redirected to frontier because the token does not exist on main.",
						})
					}
					setToken(currentToken)
				} else {
					showToast({
						severity: "warning",
						text: "Token not found, you are redirected to tokens page.",
					})
					history.push("/tokens")
				}
			}
		}
	}, [symbol, showToast, history, tokens])

	useEffect(() => {
		let fetch = async () => {
			try {
				setDataIsLoaded(false)
				let tokenData = await getTokenData(token.symbol)
				let dataPrice = await getDataPrice(10080)
				priceDecimals.current = dataPrice.length > 0 ? detectBestDecimalsDisplay(dataPrice[0].close) : 2
				setToken({ ...tokenData, price: dataPrice[dataPrice.length - 1].close })
				setDataIsLoaded(true)
			} catch (e) {
				console.log("%cToken.jsx -> 171 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
				setDataIsLoaded(true)
			}
		}
		if (token.id) {
			fetch()
		}
	}, [token, getTokenData])

	const onOpenExpertChart = () => {
		setOpenExpertChart(true)
	}

	const onCloseExpertChart = () => {
		setOpenExpertChart(false)
	}

	const getDataPrice = async (tf) => {
		let data = await getHistoricalChartToken({ symbol: token.symbol, tf })
		return data
	}

	const getDataLiquidity = async (range) => {
		let data = await getLiquidityChartToken({ symbol: token.symbol, range })
		return data
	}

	const getDataVolume = async (range) => {
		let data = await getVolumeChartToken({ symbol: token.symbol, range })
		return data
	}
	return (
		<div className={classes.tokenRoot}>
			<ExpertChartDialog open={openExpertChart} onClose={onCloseExpertChart} token={token} />

			<div className={classes.tokenContainer}>
				<ContainerLoader className={classes.containerInfo} isLoading={!dataIsLoaded}>
					<TokenPath token={token} />
					<TokenTitle token={token} />
					<p className={classes.tokenPrice}>{formateNumberPriceDecimals(token.price, priceDecimals.current)}</p>
				</ContainerLoader>
				<div className={classes.charts}>
					<Paper className={classes.loaderDetails}>
						<BlocLoaderOsmosis open={!dataIsLoaded} classNameLoading={classes.loading} />
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
						<BlocLoaderOsmosis open={!dataIsLoaded || loadingCharts} classNameLoading={classes.loading} />
						<div className={classes.containerHideShow}>
							<ContainerCharts
								token={token}
								onOpenExpertChart={onOpenExpertChart}
								getDataPrice={getDataPrice}
								getDataVolume={getDataVolume}
								getDataLiquidity={getDataLiquidity}
								dataIsLoaded={dataIsLoaded || loadingCharts}
							/>
						</div>
					</Paper>
				</div>
				<Paper className={classes.trxContainer}>
					<BlocLoaderOsmosis open={loadingTrx} classNameLoading={classes.loading} borderRadius={true} />
					<TrxTable getTrxToken={getTrxToken} loadingTrx={loadingTrx} token={token} />
				</Paper>
			</div>
		</div>
	)
}

export default Token
