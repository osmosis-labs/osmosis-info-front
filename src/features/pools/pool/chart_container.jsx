import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useRef, useState } from "react"
import ButtonsCharts from "../../../components/chart/charts/ButtonsCharts"
import ButtonsTypeChart from "../../../components/chart/charts/ButtonsTypeChart"
import Charts from "../../../components/chart/charts/Charts"
import InfoCharts from "../../../components/chart/charts/InfoCharts"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import { useDebug } from "../../../contexts/debug.provider"
import { getInclude } from "../../../helpers/helpers"
import { useHistoricalPool, useLiquidityPool, useVolumePool } from "../../../hooks/data/pools.hook"
import ChartContainerSkeleton from "./chat_container_skeleton"
import { useEventTheme } from "../../../contexts/event-theme.provider"
import imgTheme from "../../../features/christmas-2022/assets/xmas2022-info.png"
const useStyles = makeStyles((theme) => {
	return {
		rootChartContainer: {
			zIndex: "0",
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			position: "relative",
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
		imgTheme: {
			height: "130px",
			position: "absolute",
			top: "-130px",
			left: "60px",
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
	}
})

const ChartContainer = ({ currency, selectedTokens, poolId, isLoadingPool }) => {
	const classes = useStyles()
	const [currentItem, setCurrentItem] = useState({ value: 0, date: "-" })
	const dataClick = useRef({ time: { day: 1, month: 1, year: 1 }, value: 0, clickedTwice: true })
	const [typeChart, setTypeChart] = useState("price") // price, volume, liquidity
	const { isLoadingDebug } = useDebug()
	const { show } = useEventTheme()

	const [rangePrice, setRangePrice] = useState("7d") // 7d, 1m, 1y, all
	const [rangeVolume, setRangeVolume] = useState("d") // d, w, m
	const [rangeLiquidity, setRangeLiquidity] = useState("d") // d, w, m

	//price
	const {
		data: historical,
		isLoading: isLdgHistorical,
		isFetching: isFetchingHistorical,
	} = useHistoricalPool({
		poolId,
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
		poolId,
	})
	const isLoadingVolume = isLdgVolume || isFetchingVolume

	// liquidity
	const {
		data: liquidity,
		isLoading: isLdgLiquidity,
		isFetching: isFetchingLiquidity,
	} = useLiquidityPool({
		poolId,
	})

	const isLoadingLiquidity = isLdgLiquidity || isFetchingLiquidity

	const isLoadingCharts = isLoadingHistorical || isLoadingVolume || isLoadingLiquidity || isLoadingPool

	const currentVolume = volume[rangeVolume]
	const currentLiquidity = liquidity[rangeLiquidity]

	useEffect(() => {
		// update default item when data is loaded
		if (historical.length > 0) {
			const lastItem = historical[historical.length - 1]
			setCurrentItem({ time: lastItem.time, value: lastItem })
		}
	}, [historical])

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

	if (isLoadingCharts || isLoadingDebug) {
		return (
			<Paper className={classes.rootChartContainer}>
				<ChartContainerSkeleton />
			</Paper>
		)
	}

	return (
		<Paper className={classes.rootChartContainer}>
			{show && <img className={classes.imgTheme} src={imgTheme} />}
			<ContainerLoader
				className={classes.chartContainer}
				classChildren={classes.rootChartContainer}
				isLoading={isLoadingCharts}
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
	)
}
export default ChartContainer
