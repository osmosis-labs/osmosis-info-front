import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useRef, useState } from "react"
import { getInclude } from "../../../helpers/helpers"
import ButtonsCharts from "../../../components/chart/charts/ButtonsCharts"
import ButtonsTypeChart from "../../../components/chart/charts/ButtonsTypeChart"
import Charts from "../../../components/chart/charts/Charts"
import InfoCharts from "../../../components/chart/charts/InfoCharts"
import Button from "../../../components/button/Button"
import ChartContainerSkeleton from "./chat_container_skeleton"

const useStyles = makeStyles((theme) => {
	return {
		chartContainer: {
			position: "relative",
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
		},
		chartRoot: {
			position: "absolute",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			height: "100%",
			width: "100%",
			[theme.breakpoints.down("xs")]: {},
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
		charts: {
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			[theme.breakpoints.down("xs")]: {},
		},
		headerInfo: {
			padding: "0 0 0 2px",
			display: "flex",
			flexDirection: "column",
		},
		currentTitle: {},
		currentInfo: {
			fontSize: theme.fontSize.veryBig,
			color: theme.palette.gray.contrastText,
			fontVariantNumeric: "tabular-nums",
			margin: "4px 0",
		},
		currentSubInfo: {
			fontSize: "12px",
		},
		headerActions: {
			alignSelf: "flex-end",
			display: "flex",
			alignItems: "flex-end",
			flexDirection: "column",
			justifyContent: "flex-end",
			paddingBottom: theme.spacing(1),
			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
			},
		},
		loader: {
			height: "100%",
			width: "100%",
		},
		expertButton: {
			marginBottom: theme.spacing(1),
		},
		linkTV: {
			textAlign: "right",
			fontSize: "11px",
			fontStyle: "italic",
			opacity: "0.8",
			margin: "4px 0 0 0",
			"& a": {
				color: theme.palette.secondary.main,
			},
		},
	}
})

const ContainerCharts = ({
	rangePrice,
	rangeLiquidity,
	rangeVolume,
	dataLiquidity,
	dataPrice,
	dataVolume,
	isLoading,
	onOpenExpertChart,
	changeRange,
}) => {
	const classes = useStyles()
	const [typeChart, setTypeChart] = useState("price") // price, volume, liquidity

	const [currentItem, setCurrentItem] = useState({ value: 0, date: "-" })

	const dataClick = useRef({ time: { day: 1, month: 1, year: 1 }, value: 0, clickedTwice: true })
	useEffect(() => {
		if (!isLoading) {
			if (typeChart === "price") {
				if (dataPrice.length > 0) {
					let lastItem = dataPrice[dataPrice.length - 1]
					setCurrentItem({ time: lastItem.time, value: lastItem })
				}
			} else if (typeChart === "volume") {
				if (dataVolume.length > 0) {
					setCurrentItem({ ...dataVolume[dataVolume.length - 1] })
				}
			} else if (typeChart === "liquidity") {
				if (dataLiquidity.length > 0) {
					setCurrentItem({ ...dataLiquidity[dataLiquidity.length - 1] })
				}
			}
		}
	}, [dataLiquidity, dataPrice, dataVolume, isLoading, typeChart])

	const crossMove = (item) => {
		setCurrentItem(item)
	}
	const onMouseLeave = (e) => {
		if (typeChart === "volume") {
			if (dataVolume.length > 0)
				if (dataClick.current.clickedTwice) {
					let lastElt = dataVolume[dataVolume.length - 1]
					setCurrentItem({ time: lastElt.time, value: lastElt.value }, rangeVolume)
				} else {
					setCurrentItem({ time: dataClick.current.time, value: dataClick.current.value }, rangeVolume)
				}
		} else if (typeChart === "liquidity") {
			if (dataLiquidity.length > 0) {
				setCurrentItem(dataLiquidity[dataLiquidity.length - 1])
			}
		} else if (typeChart === "price") {
			if (dataPrice.length > 0) {
				let lastItem = dataPrice[dataPrice.length - 1]
				setCurrentItem({ time: lastItem.time, value: lastItem })
			}
		}
	}
	const onClick = (e) => {
		let index = getInclude(dataVolume, (item) => {
			return item.time.year === e.time.year && item.time.month === e.time.month && item.time.day === e.time.day
		})
		if (index > -1) {
			let same =
				e.time.year === dataClick.current.time.year &&
				e.time.month === dataClick.current.time.month &&
				e.time.day === dataClick.current.time.day

			dataClick.current = {
				time: dataVolume[index].time,
				value: dataVolume[index].value,
				clickedTwice: same ? !dataClick.current.clickedTwice : false,
			}
		}
	}

	const onChangeRangeVolume = async (value) => {
		changeRange({ range: value, typeChart: "volume" })
	}

	const onChangeRangeLiquidity = async (value) => {
		changeRange({ range: value, typeChart: "liquidity" })
	}

	const onChangeRangePrice = async (value) => {
		changeRange({ range: value, typeChart: "price" })
	}

	const onChangeTypeChart = (value) => {
		setTypeChart(value)
	}

	if (isLoading) {
		return <ChartContainerSkeleton />
	}

	return (
		<div className={classes.chartContainer}>
			<div className={classes.header}>
				<InfoCharts
					data={currentItem}
					typeChart={typeChart}
					rangeLiquidity={rangeLiquidity}
					rangeVolume={rangeVolume}
					rangePrice={rangePrice}
				/>
				<div className={classes.headerActions}>
					<Button className={classes.expertButton} onclick={onOpenExpertChart}>
						Open expert chart
					</Button>
					<ButtonsTypeChart type={typeChart} onChangeType={onChangeTypeChart} />
					<ButtonsCharts
						typeChart={typeChart}
						onChangeRangeLiquidity={onChangeRangeLiquidity}
						onChangeRangePrice={onChangeRangePrice}
						onChangeRangeVolume={onChangeRangeVolume}
						rangeLiquidity={rangeLiquidity}
						rangeVolume={rangeVolume}
						rangePrice={rangePrice}
					/>
				</div>
			</div>
			<div className={classes.charts}>
				<Charts
					dataPrice={dataPrice}
					dataVolume={dataVolume}
					dataLiquidity={dataLiquidity}
					crossMove={crossMove}
					onMouseLeave={onMouseLeave}
					onClick={onClick}
					typeChart={typeChart}
					rangeLiquidity={rangeLiquidity}
					rangeVolume={rangeVolume}
					rangePrice={rangePrice}
					isLoading={isLoading}
				/>
				{typeChart === "price" && (
					<p className={classes.linkTV}>
						The chart is provided by TradingView, an advanced platform that provides unparalleled access to live data
						e.g.{" "}
						<a target="blank" href="https://www.tradingview.com/symbols/BTCUSD/">
							BTC USD chart
						</a>
						.
					</p>
				)}
			</div>
		</div>
	)
}

export default ContainerCharts
