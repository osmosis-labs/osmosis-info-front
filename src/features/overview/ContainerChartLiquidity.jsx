import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import ButtonsLiquidity from "../../components/chart/liquidity/ButtonsLiquidity"
import ChartLiquidity from "../../components/chart/liquidity/ChartLiquidity"
import InfoLiquidity from "../../components/chart/liquidity/InfoLiquidity"
import ButtonsLiquidityType from "./ButtonsLiquidityType"

const useStyles = makeStyles((theme) => {
	return {
		chartContainer: {
			position: "relative",
			height: "100%",
			width: "100%",
		},
		chartRoot: {
			position: "absolute",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			height: "100%",
			width: "100%",
		},
		header: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				alignItems: "flex-start",
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
			padding: theme.spacing(1),
		},
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const ContainerChartLiquidity = ({ dataDay, dataWeek, dataMonth, title }) => {
	const classes = useStyles()

	const [currentData, setCurrantData] = useState([])

	const [currentItem, setCurrentItem] = useState({ price: 0, date: "-" })

	const [range, setRange] = useState("d")
	const [rangeType, setRangeType] = useState("usd")

	const [currency, setCurrency] = useState({ value: "$", before: true })

	useEffect(() => {
		if (dataDay.length > 0) changeRange("d")
	}, [dataDay])

	const changeRange = (value) => {
		let data = []
		let key = ""
		if (rangeType === "usd") {
			key = "value"
		} else if (rangeType === "osmo") {
			key = "value_osmo"
		} else {
			key = "value_atom"
		}
		if (value === "d") {
			data = dataDay.map((item) => ({ time: item.time, value: item[key] }))
		} else if (value === "w") {
			data = dataWeek.map((item) => ({ time: item.time, value: item[key] }))
		} else if (value === "m") {
			data = dataMonth.map((item) => ({ time: item.time, value: item[key] }))
		}
		setCurrantData(data)
		setCurrentItem({ ...data[data.length - 1] })
		setRange(value)
	}

	const changeRangeType = (value) => {
		let data = []
		let key = ""
		let currency = { value: "$", before: true }
		if (value === "usd") {
			key = "value"
		} else if (value === "osmo") {
			key = "value_osmo"
			currency = { value: "OSMO", before: false }
		} else {
			key = "value_atom"
			currency = { value: "ATOM", before: false }
		}
		if (range === "d") {
			data = dataDay.map((item) => ({ time: item.time, value: item[key] }))
		} else if (range === "w") {
			data = dataWeek.map((item) => ({ time: item.time, value: item[key] }))
		} else if (range === "m") {
			data = dataMonth.map((item) => ({ time: item.time, value: item[key] }))
		}
		setCurrantData(data)
		setCurrentItem({ ...data[data.length - 1] })
		setRangeType(value)
		setCurrency(currency)
	}

	const onMove = (item) => {
		setCurrentItem(item, range)
	}

	const onLeave = () => {
		if (currentData.length > 0)
			setCurrentItem(
				{ time: currentData[currentData.length - 1].time, value: currentData[currentData.length - 1].value },
				range
			)
	}

	return (
		<div className={classes.chartContainer}>
			<div className={classes.header}>
				<InfoLiquidity title={title} range={range} data={currentItem} currency={currency} />
				<div className={classes.headerActions}>
					<ButtonsLiquidityType onChangeRange={changeRangeType} range={rangeType} />
					<ButtonsLiquidity onChangeRange={changeRange} range={range} />
				</div>
			</div>
			<ChartLiquidity data={currentData} crossMove={onMove} onMouseLeave={onLeave} />
		</div>
	)
}

export default ContainerChartLiquidity
