import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import { formatDate, formateNumberPrice, getDates, isValidDate, twoNumber } from "../../helpers/helpers"
import ButtonGroup from "../buttonGroup/ButtonGroup"
import ChartLiquidity from "./ChartLiquidity"

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

const ContainerChartLiquidity = ({ dataDay, dataWeek, dataMonth, title, typeButtonGroupe }) => {
	const classes = useStyles()

	const [currentData, setCurrantData] = useState([])

	const [currentInfo, setCurrentInfo] = useState({
		price: 0,
		date: "-",
	})

	const [range, setRange] = useState("d")

	useEffect(() => {
		if (dataDay.length > 0) changeRange("d")
	}, [dataDay])

	const changeRange = (value) => {
		let data = []
		if (value === "d") {
			data = [...dataDay]
		} else if (value === "w") {
			data = [...dataWeek]
		} else if (value === "m") {
			data = [...dataMonth]
		}
		setCurrantData(data)
		formatItem(data[data.length - 1], range)

		setRange(value)
	}

	const formatItem = (item, range) => {
		if (item.time) {
			let formated = { price: item.value }
			let date = new Date(item.time)
			if (!isValidDate(date)) {
				date = new Date(
					new Date(`${twoNumber(item.time.year)}/${twoNumber(item.time.month)}/${twoNumber(item.time.day)}`)
				)
			}
			formated.date = date
			setInfo(formated, range)
		}
	}

	const setInfo = (item, range) => {
		setCurrentInfo({
			price: formatPriceForDisplay(item.price),
			date: formatDateForDisplay(item.date, range),
		})
	}

	const formatPriceForDisplay = (price) => {
		return formateNumberPrice(price)
	}

	const formatDateForDisplay = (date, range) => {
		if (range && range !== "d") {
			let dates = getDates(date, range)
			return `${formatDate(dates[0])} - ${formatDate(dates[1])}`
		}
		return formatDate(date)
	}

	const onMove =(event, serie) => {
			formatItem({ time: event.time, value: event.seriesPrices.get(serie) }, range)
		}
	
	const onLeave = () => {
		if (currentData.length > 0)
			formatItem(
				{ time: currentData[currentData.length - 1].time, value: currentData[currentData.length - 1].value },
				range
			)
	}

	return (
		<div className={classes.chartContainer}>
			<div className={classes.header}>
				<div className={classes.headerInfo}>
					<p className={classes.title}>{title}</p>
					<p className={classes.currentInfo}>{currentInfo.price}</p>
					<p className={classes.currentSubInfo}>{currentInfo.date}</p>
				</div>
				<div className={classes.headerActions}>
					{typeButtonGroupe}
					<ButtonGroup
						className={classes.groupButton}
						buttons={[
							{
								id: "d",
								name: "D",
								onClick: () => {
									changeRange("d")
								},
							},
							{
								id: "w",
								name: "W",
								onClick: () => {
									changeRange("w")
								},
							},
							{
								id: "m",
								name: "M",
								onClick: () => {
									changeRange("m")
								},
							},
						]}
						active={range}
					/>
				</div>
			</div>
			<ChartLiquidity data={currentData} crossMove={onMove} onMouseLeave={onLeave} />
		</div>
	)
}

export default ContainerChartLiquidity
