import { makeStyles } from "@material-ui/core"
import { useState, useRef } from "react"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import { formateNumberDecimals, detectBestDecimalsDisplay, getInclude } from "../../../helpers/helpers"
import Charts from "../../../components/chart/charts/Charts"
import ButtonsCharts from "../../../components/chart/charts/ButtonsCharts"
import ButtonsTypeChart from "../../../components/chart/charts/ButtonsTypeChart"
import InfoCharts from "../../../components/chart/charts/InfoCharts"
import PoolHeader from "./PoolHeader"
import PoolInfo from "./PoolInfo"
import { useCallback } from "react"
import { usePoolsV2 } from "../../../contexts/PoolsV2.provider"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import TrxTable from "./trxTable/trxTable"
import { useSettings } from "../../../contexts/SettingsProvider"

const useStyles = makeStyles((theme) => {
	return {
		poolRoot: {
			margin: `${theme.spacing(2)}px 0`,
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
		},

		charts: {
			display: "grid",
			gridTemplateColumns: "350px 1fr",
			gap: theme.spacing(1),

			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
				gridTemplateRows: "1fr 1fr",
			},
		},
		right: {
			zIndex: "0",
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			[theme.breakpoints.down("xs")]: {
				width: "100%",
			},
		},
		chartContainer: {
			position: "relative",
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
		},
		header: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "flex-start",
			},
		},
		chartsContainer: {
			display: "flex",
			flexDirection: "column",
			flexGrow: "1",
			[theme.breakpoints.down("xs")]: {},
		},
		headerActions: {
			alignSelf: "flex-end",
			display: "flex",
			alignItems: "flex-end",
			flexDirection: "column",
			justifyContent: "flex-end",
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
			},
		},
		trxContainer: {
			marginBottom: `${theme.spacing(2)}px`,
			position: "relative",
			overflow: "hidden",
		},
	}
})

const Pool = ({ showToast }) => {
	const classes = useStyles()
	const history = useHistory()
	const { id } = useParams()
	const {
		pools,
		getPoolData,
		loadingPoolChart,
		getChartPool,
		getVolumeChartPool,
		getLiquidityChartPool,
		getTrxPool,
		loadingTrx,
		allPools,
	} = usePoolsV2()

	//save data here to avoid to re fetching data if is already fetched
	const { settings, updateSettings } = useSettings()
	const [pool, setPool] = useState({})
	const [tokens, setTokens] = useState([])
	const [selectedTokens, setSelectedTokens] = useState({ one: {}, two: {} })
	const [pricesInfo, setPriceInfo] = useState(0)
	const [fees, setFees] = useState("0.0%")

	const [loadingDataChart, setLoadingDataChart] = useState(true)
	const [loadingPoolDetails, setLoadingPoolDetails] = useState(true)
	const [loadingPoolInfo, setLoadingPoolInfo] = useState(true)

	const pairDecimals = useRef(3)
	const pricesDecimals = useRef([2, 2])

	/* CHARTS */
	const [currentItem, setCurrentItem] = useState({ value: 0, date: "-" })
	const dataClick = useRef({ time: { day: 1, month: 1, year: 1 }, value: 0, clickedTwice: true })
	const [typeChart, setTypeChart] = useState("price") // price, volume, liquidity

	const [rangePrice, setRangePrice] = useState("7d") // 7d, 1m, 1y, all
	const [rangeVolume, setRangeVolume] = useState("d") // d, w, m
	const [rangeLiquidity, setRangeLiquidity] = useState("d") // d, w, m

	const [currentDataPrice, setCurrentDataPrice] = useState([])
	const [currentDataVolume, setCurrentDataVolume] = useState([])
	const [currentDataLiquidity, setCurrentDataLiquidity] = useState([])
	const [currency, setCurrency] = useState({ before: true, value: "$" })

	useEffect(() => {
		// get pool from history state
		if (!id) {
			showToast({
				severity: "warning",
				text: "Pool not found, you are redirected to pools page.",
			})
			history.push("/pools")
		} else {
			if (pools.length > 0) {
				let indexPool = getInclude(allPools, (pool) => pool.id === id)
				if (indexPool >= 0) {
					let currentPool = allPools[indexPool]
					if (currentPool.main && settings.type === "frontier") {
						updateSettings({ type: "app" })
						showToast({
							severity: "info",
							text: "You are redirected to main because the pool does not exist on frontier.",
						})
					} else if (!currentPool.main && settings.type === "app") {
						updateSettings({ type: "frontier" })
						showToast({
							severity: "info",
							text: "You are redirected to frontier because the pool does not exist on main.",
						})
					}
					setPool(currentPool)
				} else {
					showToast({
						severity: "warning",
						text: "Pool not found, you are redirected to pools page.",
					})
					history.push("/pools")
				}
			}
		}
	}, [id, showToast, history, pools])

	useEffect(() => {
		// fetch pool details from server
		const fetch = async () => {
			let tokensPool = await getPoolData(pool.id)
			setFees(tokensPool[0].fees)
			setTokens([...tokensPool])
		}
		if (pool.id) {
			fetch()
		}
	}, [pool, getPoolData])

	useEffect(() => {
		const fetch = async () => {
			setLoadingPoolDetails(true)
			setLoadingPoolInfo(true)
			setLoadingDataChart(true)
			let firstPair = await getChartPool({
				poolId: pool.id,
				denomIn: tokens[0].denom,
				denomOut: tokens[1].denom,
				range: "7d",
			})
			if (typeof firstPair === "string") {
				throw new Error(firstPair)
			}
			// Update pair token decimal
			pairDecimals.current = firstPair.length > 0 ? detectBestDecimalsDisplay(firstPair[firstPair.length - 1].open) : 3
			// Update both token price decimals
			let tmpPricesDecimals = [2, 2]
			for (let i = 0; i < tokens.length; i++) {
				tmpPricesDecimals[i] = detectBestDecimalsDisplay(tokens[i].price)
			}
			pricesDecimals.current = tmpPricesDecimals
			setCurrency({ before: false, value: tokens[0].symbol })
			setSelectedTokens({ one: tokens[0], two: tokens[1] })
			updatePriceInfo(firstPair)

			onChangeRangePrice(rangePrice, tokens[0].denom, tokens[1].denom)
			setLoadingPoolDetails(false)
			setLoadingPoolInfo(false)
			setLoadingDataChart(false)
		}
		if (pool.id && tokens.length > 0) {
			fetch()
		}
	}, [pool, tokens, getChartPool])

	const onChangeSeletedTokens = useCallback(
		(selectedTokens) => {
			setCurrency({ before: false, value: selectedTokens.one.symbol })
			setSelectedTokens(selectedTokens)
			if (typeChart === "price")
				onChangeRangePrice(rangePrice, selectedTokens.one.denom, selectedTokens.two.denom, updatePriceInfo)
		},
		[selectedTokens, typeChart]
	)

	const updatePriceInfo = (data) => {
		let lastItem = data[data.length - 1]
		pairDecimals.current = detectBestDecimalsDisplay(lastItem.close)
		setPriceInfo(formateNumberDecimals(lastItem.close, pairDecimals.current))
	}

	const onMouseLeave = (e) => {
		if (typeChart === "volume") {
			if (currentDataVolume.length > 0)
				if (dataClick.current.clickedTwice) {
					let lastElt = currentDataVolume[currentDataVolume.length - 1]
					setCurrentItem({ time: lastElt.time, value: lastElt.value })
				} else {
					setCurrentItem({ time: dataClick.current.time, value: dataClick.current.value })
				}
		} else if (typeChart === "liquidity") {
			if (currentDataLiquidity.length > 0) {
				setCurrentItem(currentDataLiquidity[currentDataLiquidity.length - 1])
			}
		} else if (typeChart === "price") {
			if (currentDataPrice.length > 0) {
				let lastItem = currentDataPrice[currentDataPrice.length - 1]
				setCurrentItem({ time: lastItem.time, value: lastItem })
			}
		}
	}
	const onClick = (e) => {
		let index = getInclude(currentDataVolume, (item) => {
			return item.time.year === e.time.year && item.time.month === e.time.month && item.time.day === e.time.day
		})
		if (index > -1) {
			let same =
				e.time.year === dataClick.current.time.year &&
				e.time.month === dataClick.current.time.month &&
				e.time.day === dataClick.current.time.day

			dataClick.current = {
				time: currentDataVolume[index].time,
				value: currentDataVolume[index].value,
				clickedTwice: same ? !dataClick.current.clickedTwice : false,
			}
		}
	}

	const crossMove = useCallback((item) => {
		setCurrentItem(item)
	}, [])

	const onChangeRangeVolume = async (value) => {
		try {
			setLoadingDataChart(true)
			let data = await getVolumeChartPool({ poolId: pool.id, range: value })
			setCurrentDataVolume(data)
			setCurrentItem(data[data.length - 1])
			setRangeVolume(value)
			setLoadingDataChart(false)
		} catch (e) {
			console.log("%cContainerCharts.jsx -> 124 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setLoadingDataChart(false)
		}
	}

	const onChangeRangeLiquidity = async (value) => {
		try {
			setLoadingDataChart(true)
			let data = await getLiquidityChartPool({ poolId: pool.id, range: value })
			setCurrentDataLiquidity(data)
			setCurrentItem(data[data.length - 1])
			setRangeLiquidity(value)
			setLoadingDataChart(false)
		} catch (e) {
			console.log("%cContainerCharts.jsx -> 124 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setLoadingDataChart(false)
		}
	}

	const onChangeRangePrice = async (value, denomIn, denomOut, cb) => {
		try {
			setLoadingDataChart(true)
			let data = await getChartPool({
				poolId: pool.id,
				denomIn: denomIn ? denomIn : selectedTokens.one.denom,
				denomOut: denomOut ? denomOut : selectedTokens.two.denom,
				range: value,
			})
			if (cb) cb(data)
			setCurrentDataPrice(data)
			let lastItem = data[data.length - 1]
			setCurrentItem({ time: lastItem.time, value: lastItem })
			setRangePrice(value)
			setLoadingDataChart(false)
		} catch (e) {
			console.log("%cContainerCharts.jsx -> 124 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setLoadingDataChart(false)
		}
	}

	const onChangeTypeChart = (value) => {
		if (value === "price") {
			onChangeRangePrice(rangePrice)
		} else if (value === "volume") {
			onChangeRangeVolume(rangeVolume)
		} else if (value === "liquidity") {
			onChangeRangeLiquidity(rangeLiquidity)
		}
		setTypeChart(value)
	}

	return (
		<div className={classes.poolRoot}>
			<PoolHeader
				pool={pool}
				tokens={tokens}
				selectedTokens={selectedTokens}
				onChangeSeletedTokens={onChangeSeletedTokens}
				loadingPoolDetails={loadingPoolDetails}
				pricesInfo={pricesInfo}
				key="la"
			/>
			<div className={classes.charts}>
				<PoolInfo
					loadingPoolInfo={loadingPoolInfo}
					tokens={tokens}
					pool={pool}
					fees={fees}
					pricesDecimals={pricesDecimals}
				/>
				<Paper className={classes.right}>
					<ContainerLoader
						className={classes.chartContainer}
						classChildren={classes.right}
						isLoading={loadingDataChart}
					>
						<div className={classes.header}>
							<InfoCharts
								data={currentItem}
								typeChart={typeChart}
								rangeLiquidity={rangeLiquidity}
								rangeVolume={rangeVolume}
								rangePrice={rangePrice}
								currency={currency}
							/>
							<div className={classes.headerActions}>
								<ButtonsTypeChart type={typeChart} onChangeType={onChangeTypeChart} />
								<ButtonsCharts
									typeChart={typeChart}
									onChangeRangeLiquidity={onChangeRangeLiquidity}
									onChangeRangePrice={onChangeRangePrice}
									onChangeRangeVolume={onChangeRangeVolume}
									rangeLiquidity={rangeLiquidity}
									rangeVolume={rangeVolume}
									rangePrice={rangePrice}
									priceV1={true}
								/>
							</div>
						</div>
						<div className={classes.chartsContainer}>
							<Charts
								dataPrice={currentDataPrice}
								dataVolume={currentDataVolume}
								dataLiquidity={currentDataLiquidity}
								crossMove={crossMove}
								onMouseLeave={onMouseLeave}
								onClick={onClick}
								typeChart={typeChart}
								rangeLiquidity={rangeLiquidity}
								rangeVolume={rangeVolume}
								rangePrice={rangePrice}
								isLoading={loadingDataChart}
							/>
						</div>
					</ContainerLoader>
				</Paper>
			</div>
			<Paper className={classes.trxContainer}>
				<BlocLoaderOsmosis open={loadingTrx} classNameLoading={classes.loading} borderRadius={true} />
				<TrxTable getTrxPool={getTrxPool} loadingTrx={loadingTrx} pool={pool} />
			</Paper>
		</div>
	)
}

export default Pool
