import { makeStyles } from "@material-ui/core"
import { useEffect, useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import {
	detectBestDecimalsDisplay,
	formateNumberPrice,
	formateNumberPriceDecimals,
	formaterNumber,
	getPercent,
	normalize,
} from "../../../helpers/helpers"
import TokenPath from "./tokenHeader/TokenPath"
import TokenTitle from "./tokenHeader/TokenTitle"
import ContainerCharts from "./ContainerCharts"
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
import { useDebug } from "../../../contexts/debug.provider"
import TokenHeaderSkeleton from "./tokenHeader/token_header_skeleton"
import { TabPanel } from "@mui/lab"
import TokenInfo from "./token_info"
import { useScrollTop } from "../../../hooks/scroll.hook"
import PoolsTable from "../../pools/poolsTable/poolsTable"
import { usePools } from "../../../hooks/data/pools.hook"
import { useEventTheme } from "../../../contexts/event-theme.provider"
import imgTheme from "../../../features/christmas-2022/assets/xmas2022-info.png"

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
		trxContainer: {
			marginBottom: `${theme.spacing(2)}px`,
			position: "relative",
			overflow: "hidden",
		},

		poolsContainer: {
			margin: `${theme.spacing(2)}px 0`,
			position: "relative",
			overflow: "hidden",
		},
		imgTheme: {
			height: "130px",
			position: "absolute",
			top: "-130px",
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
	}
})

const Token = () => {
	const classes = useStyles()
	const history = useHistory()
	const { showToast } = useToast()
	const { isLoadingDebug } = useDebug()
	const { show } = useEventTheme()
	useScrollTop()

	const { symbol } = useParams()
	const { settings, updateSettings } = useSettings()

	//token
	const { data: tkn, isLoading: isLoadingTkn, isFetching: isFetchingTkn } = useToken({ symbol })
	const [token, setToken] = useState({ ...tkn })
	const isLoadingToken = isLoadingTkn || isFetchingTkn

	// For pools
	const [dataPools, setDataPools] = useState([])
	const {
		data: { current: pools },
		isLoading: loadingPools,
		isFetching: isFetchingPools,
	} = usePools({})

	const isLoadingPools = loadingPools || isFetchingPools || isLoadingDebug

	useEffect(() => {
		// sort pools on the first time is fetched

		if (token && token.denom) {
			let data = [...pools]
			data.sort((a, b) => {
				if (b.liquidity < a.liquidity) {
					return -1
				}
				if (b.liquidity > a.liquidity) {
					return 1
				}
				return 0
			})
			setDataPools(data.filter((value) => value.denoms.some((denom) => denom === token.denom)))
		}
	}, [pools, token])

	const onClickPool = (pool) => {
		history.push(`/pool/${pool.id}`)
	}

	const setSettingsPools = (settings) => {
		updateSettings({ poolTable: settings })
	}

	const priceDecimals = useRef(2)

	const [openExpertChart, setOpenExpertChart] = useState(false)

	const [rangePrice, setRangePrice] = useState(60)
	const [rangeLiquidity, setRangeLiquidity] = useState("d")
	const [rangeVolume, setRangeVolume] = useState("d")

	//Transactions
	const {
		data: trxs,
		isLoading: isLdgTrx,
		isFetching: isFetchingTrx,
		fetchNextPage,
	} = useTrxToken({ symbol: token.symbol, limit: 100 })
	const isLoadingTrx = isLdgTrx || isFetchingTrx
	const [defaultPage, setDefaultPage] = useState(0)

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

	const loadmore = async (currentPage) => {
		// need to loadmore transaction
		let length = trxs.length
		let result = await fetchNextPage()
		if (length < result.data.pages.flat().length) {
			// more result, go to the next page
			setDefaultPage(currentPage + 1)
		} else {
			setDefaultPage(currentPage)
		}
	}
	return (
		<div className={classes.tokenRoot}>
			<ExpertChartDialog open={openExpertChart} onClose={onCloseExpertChart} token={token} />

			<div className={classes.tokenContainer}>
				{isLoadingToken || !token.symbol || isLoadingDebug ? (
					<>
						<TokenHeaderSkeleton />
					</>
				) : (
					<div className={classes.containerInfo}>
						<TokenPath token={token} />
						<TokenTitle token={token} />
						<p className={classes.tokenPrice}>{formateNumberPriceDecimals(token.price, priceDecimals.current)}</p>
					</div>
				)}
				<div className={classes.charts}>
					<TokenInfo
						isLoading={isLoadingToken || !token.symbol || isLoadingDebug}
						token={token}
						priceDecimals={priceDecimals}
					/>
					<Paper className={classes.right}>
						{show && <img className={classes.imgTheme} src={imgTheme} />}
						<div className={classes.containerHideShow}>
							<ContainerCharts
								token={token}
								onOpenExpertChart={onOpenExpertChart}
								changeRange={changeRange}
								isLoading={isLoadingChart || !token.symbol || isLoadingDebug}
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
				<Paper className={classes.poolsContainer}>
					<PoolsTable
						data={dataPools}
						onClickPool={onClickPool}
						setSettings={setSettingsPools}
						settings={settings.poolTable}
						isLoading={isLoadingPools}
					/>
				</Paper>
				<Paper className={classes.trxContainer}>
					<TrxTable
						data={trxs}
						isLoading={isLoadingTrx || isLoadingDebug}
						loadmore={loadmore}
						defaultPage={defaultPage}
					/>
				</Paper>
			</div>
		</div>
	)
}

export default Token
