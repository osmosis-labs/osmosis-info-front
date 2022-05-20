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
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import TrxTable from "./trxTable/trxTable"
import { useSettings } from "../../../contexts/SettingsProvider"
import { useToast } from "../../../contexts/Toast.provider"
import {
	useHistoricalPool,
	useLiquidityPool,
	usePool,
	usePoolTrx,
	useTokensPool,
	useVolumePool,
} from "../../../hooks/data/pools.hook"

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

const Pool = () => {
	const classes = useStyles()
	const history = useHistory()
	const { showToast } = useToast()
	const { id } = useParams()

	const { settings, updateSettings } = useSettings()
	const [selectedTokens, setSelectedTokens] = useState({ one: {}, two: {} })
	const [pricesInfo, setPriceInfo] = useState(0)
	const [fees, setFees] = useState("0.0%")

	const pairDecimals = useRef(3)
	const pricesDecimals = useRef([2, 2])

	const [currentItem, setCurrentItem] = useState({ value: 0, date: "-" })
	const dataClick = useRef({ time: { day: 1, month: 1, year: 1 }, value: 0, clickedTwice: true })
	const [typeChart, setTypeChart] = useState("price") // price, volume, liquidity

	const [rangePrice, setRangePrice] = useState("7d") // 7d, 1m, 1y, all
	const [rangeVolume, setRangeVolume] = useState("d") // d, w, m
	const [rangeLiquidity, setRangeLiquidity] = useState("d") // d, w, m

	const [currency, setCurrency] = useState({ before: true, value: "$" })

	//Get data of current pool
	const { data: tokensPool, isLoading: isLoadingTokensPool } = useTokensPool({ poolId: id })

	const { data: pool, isLoading: isLoadingDataPool, isFetching: isFetchingDataPool } = usePool({ poolId: id })

	const isLoadingPool = isLoadingTokensPool || isLoadingDataPool

	//Trx
	const { data: trx, isLoading: isLoadingTrx } = usePoolTrx({ poolId: id, limit: 100 })

	//price
	const {
		data: historical,
		isLoading: isLdgHistorical,
		isFetching: isFetchingHistorical,
	} = useHistoricalPool({
		poolId: id,
		denomIn: selectedTokens.one?.denom,
		denomOut: selectedTokens.two?.denom,
		range: rangePrice,
	})
	const isLoadingHistorical = isLdgHistorical || isFetchingHistorical

	// volume
	const {
		data: volume,
		isLoading: isLdgVolume,
		isFetching: isFetchingVolume,
	} = useVolumePool({
		poolId: id,
	})
	const isLoadingVolume = isLdgVolume || isFetchingVolume

	// liquidity
	const {
		data: liquidity,
		isLoading: isLdgLiquidity,
		isFetching: isFetchingLiquidity,
	} = useLiquidityPool({
		poolId: id,
	})
	const isLoadingLiquidity = isLdgLiquidity || isFetchingLiquidity

	const isLoadingCharts = isLoadingHistorical || isLoadingVolume || isLoadingLiquidity

	const currentVolume = volume[rangeVolume]
	const currentLiquidity = liquidity[rangeLiquidity]

	useEffect(() => {
		// Check if we have a id
		if (!id) {
			showToast({
				severity: "warning",
				text: "Pool not found, you are redirected to pools page.",
			})
			history.push("/tokens")
		}
	}, [id, showToast, history])

	useEffect(() => {
		//check if pool exist
		if (id && !isLoadingDataPool && !isFetchingDataPool) {
			if (pool.id) {
				//update fees
				setFees((f) => pool.fees)

				if (pool.main && settings.type === "frontier") {
					updateSettings({ type: "app" })
					showToast({
						severity: "info",
						text: "You are redirected to main because the pool does not exist on frontier.",
					})
				} else if (!pool.main && settings.type === "app") {
					updateSettings({ type: "frontier" })
					showToast({
						severity: "info",
						text: "You are redirected to frontier because the pool does not exist on main.",
					})
				}
			} else {
				showToast({
					severity: "warning",
					text: "Pool not found, you are redirected to pools page.",
				})
				history.push("/pools")
			}
		}
	}, [pool, isLoadingDataPool, isFetchingDataPool, id])

	useEffect(() => {
		// Set tokens
		if (id && !isLoadingPool) {
			if (tokensPool.length > 0) {
				setSelectedTokens((ps) => ({
					one: { ...tokensPool[0] },
					two: { ...tokensPool[1] },
				}))
			}
		}
	}, [tokensPool, isLoadingTokensPool, id])

	useEffect(() => {
		// needed to update price of pool and fee
		if (tokensPool.length > 0) {
			setSelectedTokens((ps) => ({ one: tokensPool[0], two: tokensPool[1] }))
			let tmpPricesDecimals = [2, 2]
			for (let i = 0; i < tokensPool.length; i++) {
				tmpPricesDecimals[i] = detectBestDecimalsDisplay(tokensPool[i].price)
			}
			pricesDecimals.current = tmpPricesDecimals
			setCurrency((ps) => ({ before: false, value: tokensPool[0].symbolDisplay }))
		}
	}, [tokensPool])

	useEffect(() => {
		if (historical.length > 0) {
			pairDecimals.current = detectBestDecimalsDisplay(historical[historical.length - 1].close)
			updatePriceInfo(historical)
			console.log("Pool.jsx (l:245): historical[historical.length - 1]:", historical[historical.length - 1].close)
			const lastItem = historical[historical.length - 1]
			setCurrentItem({ time: lastItem.time, value: lastItem })
		}
	}, [historical])

	const onChangeSeletedTokens = useCallback(
		(selectedTokens) => {
			setCurrency({ before: false, value: selectedTokens.one.symbolDisplay })
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
			if (currentVolume.length > 0)
				if (dataClick.current.clickedTwice) {
					let lastElt = currentVolume[currentVolume.length - 1]
					setCurrentItem({ time: lastElt.time, value: lastElt.value })
				} else {
					setCurrentItem({ time: dataClick.current.time, value: dataClick.current.value })
				}
		} else if (typeChart === "liquidity") {
			if (currentLiquidity.length > 0) {
				setCurrentItem(currentLiquidity[currentLiquidity.length - 1])
			}
		} else if (typeChart === "price") {
			if (historical.length > 0) {
				let lastItem = historical[historical.length - 1]
				setCurrentItem({ time: lastItem.time, value: lastItem })
			}
		}
	}

	const onClick = (e) => {
		let index = getInclude(currentVolume, (item) => {
			return item.time.year === e.time.year && item.time.month === e.time.month && item.time.day === e.time.day
		})
		if (index > -1) {
			let same =
				e.time.year === dataClick.current.time.year &&
				e.time.month === dataClick.current.time.month &&
				e.time.day === dataClick.current.time.day

			dataClick.current = {
				time: currentVolume[index].time,
				value: currentVolume[index].value,
				clickedTwice: same ? !dataClick.current.clickedTwice : false,
			}
		}
	}

	const crossMove = useCallback((item) => {
		setCurrentItem(item)
	}, [])

	const onChangeRangeVolume = async (value) => {
		setRangeVolume(value)
	}

	const onChangeRangeLiquidity = async (value) => {
		setRangeLiquidity(value)
	}

	const onChangeRangePrice = async (value) => {
		if (value === "all") {
			setRangePrice("50y")
		} else {
			setRangePrice(value)
		}
	}

	const onChangeTypeChart = (value) => {
		if (value === "price") {
			onChangeRangePrice(rangePrice)
			updatePriceInfo(historical)
			const lastItem = historical[historical.length - 1]
			setCurrentItem({ time: lastItem.time, value: lastItem })
		} else if (value === "volume") {
			onChangeRangeVolume(rangeVolume)
			setCurrentItem(volume[rangeVolume][volume[rangeVolume].length - 1])
		} else if (value === "liquidity") {
			onChangeRangeLiquidity(rangeLiquidity)
			setCurrentItem(liquidity[rangeLiquidity][liquidity[rangeLiquidity].length - 1])
		}
		setTypeChart(value)
	}

	return (
		<div className={classes.poolRoot}>
			<PoolHeader
				pool={pool}
				tokens={tokensPool}
				selectedTokens={selectedTokens}
				onChangeSeletedTokens={onChangeSeletedTokens}
				loadingPoolDetails={isLoadingPool}
				pricesInfo={pricesInfo}
				key="la"
			/>
			<div className={classes.charts}>
				<PoolInfo
					loadingPoolInfo={isLoadingPool}
					pool={pool}
					tokens={tokensPool}
					fees={fees}
					pricesDecimals={pricesDecimals}
				/>
				<Paper className={classes.right}>
					<ContainerLoader className={classes.chartContainer} classChildren={classes.right} isLoading={isLoadingCharts}>
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
								dataPrice={historical}
								dataVolume={currentVolume}
								dataLiquidity={currentLiquidity}
								crossMove={crossMove}
								onMouseLeave={onMouseLeave}
								onClick={onClick}
								typeChart={typeChart}
								rangeLiquidity={rangeLiquidity}
								rangeVolume={rangeVolume}
								rangePrice={rangePrice}
								isLoading={isLoadingCharts}
							/>
						</div>
					</ContainerLoader>
				</Paper>
			</div>
			<Paper className={classes.trxContainer}>
				<BlocLoaderOsmosis open={isLoadingTrx} classNameLoading={classes.loading} borderRadius={true} />
				<TrxTable data={trx} />
			</Paper>
		</div>
	)
}

export default Pool
