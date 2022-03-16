import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
import { useRef, useState } from "react"
import { getInclude } from "../../../helpers/helpers"
import ButtonsCharts from "../../../components/chart/charts/ButtonsCharts"
import ButtonsTypeChart from "../../../components/chart/charts/ButtonsTypeChart"
import Charts from "../../../components/chart/charts/Charts"
import InfoCharts from "../../../components/chart/charts/InfoCharts"
import Button from "../../../components/button/Button"
import ExpertChartDialog from './expertChart/ExpertChartDialog'

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
			[theme.breakpoints.down("xs")]: {
			},
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
		expertButton:{
			marginBottom: theme.spacing(1),

		}
	}
})

const ContainerCharts = ({ getDataVolume, getDataLiquidity, getDataPrice, dataIsLoaded, token, onOpenExpertChart }) => {
	const classes = useStyles()
	const [typeChart, setTypeChart] = useState("price") // price, volume, liquidity

	const [rangePrice, setRangePrice] = useState(1440)
	const [rangeVolume, setRangeVolume] = useState("d")
	const [rangeLiquidity, setRangeLiquidity] = useState("d")

	const [currentDataPrice, setCurrentDataPrice] = useState([])
	const [currentDataVolume, setCurrentDataVolume] = useState([])
	const [currentDataLiquidity, setCurrentDataLiquidity] = useState([])

	const [isLoading, setIsLoading] = useState(false)

	const [currentItem, setCurrentItem] = useState({ value: 0, date: "-" })

	const dataClick = useRef({ time: { day: 1, month: 1, year: 1 }, value: 0, clickedTwice: true })

	useEffect(() => {
		if (dataIsLoaded) {
			onChangeRangePrice(1440)
		}
	}, [dataIsLoaded])

	const crossMove = (item) => {
		setCurrentItem(item)
	}
	const onMouseLeave = (e) => {
		if (typeChart === "volume") {
			if (currentDataVolume.length > 0)
				if (dataClick.current.clickedTwice) {
					let lastElt = currentDataVolume[currentDataVolume.length - 1]
					setCurrentItem({ time: lastElt.time, value: lastElt.value }, rangeVolume)
				} else {
					setCurrentItem({ time: dataClick.current.time, value: dataClick.current.value }, rangeVolume)
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

	const onChangeRangeVolume = async (value) => {
		try {
			setIsLoading(true)
			let data = await getDataVolume(value)
			setCurrentDataVolume(data)
			setCurrentItem({ ...data[data.length - 1] })
			setRangeVolume(value)
			setIsLoading(false)
		} catch (e) {
			console.log("%cContainerCharts.jsx -> 157 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setIsLoading(false)
		}
	}

	const onChangeRangeLiquidity = async (value) => {
		try {
			setIsLoading(true)
			let data = await getDataLiquidity(value)
			setCurrentDataLiquidity(data)
			setCurrentItem({ ...data[data.length - 1] })
			setRangeLiquidity(value)
			setIsLoading(false)
		} catch (e) {
			console.log("%cContainerCharts.jsx -> 171 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setIsLoading(false)
		}
	}

	const onChangeRangePrice = async (value) => {
		try {
			setIsLoading(true)
			let data = await getDataPrice(value)
			setCurrentDataPrice(data)
			if (data.length > 0) {
				let lastItem = data[data.length - 1]
				setCurrentItem({ time: lastItem.time, value: lastItem })
				setRangePrice(value)
			}
			setIsLoading(false)
		} catch (e) {
			console.log("%cContainerCharts.jsx -> 186 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			setIsLoading(false)
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
		<div
			className={classes.chartContainer}
		>
			<div className={classes.header}>
				<InfoCharts
					data={currentItem}
					typeChart={typeChart}
					rangeLiquidity={rangeLiquidity}
					rangeVolume={rangeVolume}
					rangePrice={rangePrice}
				/>
				<div className={classes.headerActions}>
					<Button className={classes.expertButton} onclick={onOpenExpertChart}>Open expert chart</Button>
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
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}

export default ContainerCharts
