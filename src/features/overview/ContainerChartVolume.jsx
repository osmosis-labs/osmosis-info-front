import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useRef, useState } from "react"
import { getInclude } from "../../helpers/helpers"
import ButtonsVolume from "../../components/chart/volume/ButtonsVolume"
import ChartVolume from "../../components/chart/volume/ChartVolume"
import InfoVolume from "../../components/chart/volume/InfoVolume"

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

const ContainerChartVolume = ({ dataDay, dataWeek, dataMonth, title }) => {
	const classes = useStyles()

	const [currentData, setCurrantData] = useState([])
	const [defaultView, setDefaultView] = useState({
		from: null,
		to: null,
	})

	const [currentItem, setCurrentItem] = useState({ price: 0, date: "-" })

	const [range, setRange] = useState("d")

	const dataClick = useRef({ time: { day: 1, month: 1, year: 1 }, value: 0, clickedTwice: true })

	useEffect(() => {
		if (dataDay.length > 0) {
			changeRange("d")
			setDefaultView({
				from: dataDay[dataDay.length - 290].time,
				to: dataDay[dataDay.length - 1].time,
			})
		}
	}, [dataDay])

	const changeRange = (value) => {
		let data = []
		if (value === "d") {
			data = [...dataDay]
			setDefaultView({
				from: data[data.length - 290].time,
				to: data[data.length - 1].time,
			})
		} else if (value === "w") {
			data = [...dataWeek]
			setDefaultView({
				from: data[data.length - 41].time,
				to: data[data.length - 1].time,
			})
		} else if (value === "m") {
			data = [...dataMonth]
			setDefaultView({
				from: data[data.length - 10].time,
				to: data[data.length - 1].time,
			})
		}
		setCurrantData(data)
		setCurrentItem({ ...data[data.length - 1] })
		setRange(value)
	}

	const onMove = useCallback(
		(item) => {
			setCurrentItem(item, range)
		},
		[range]
	)

	const onClick = (e) => {
		let index = getInclude(currentData, (item) => {
			return item.time.year === e.time.year && item.time.month === e.time.month && item.time.day === e.time.day
		})
		if (index > -1) {
			let same =
				e.time.year === dataClick.current.time.year &&
				e.time.month === dataClick.current.time.month &&
				e.time.day === dataClick.current.time.day

			dataClick.current = {
				time: currentData[index].time,
				value: currentData[index].value,
				clickedTwice: same ? !dataClick.current.clickedTwice : false,
			}
		}
	}

	const onLeave = () => {
		if (currentData.length > 0)
			if (dataClick.current.clickedTwice) {
				let lastElt = currentData[currentData.length - 1]
				setCurrentItem({ time: lastElt.time, value: lastElt.value }, range)
			} else {
				setCurrentItem({ time: dataClick.current.time, value: dataClick.current.value }, range)
			}
	}

	return (
		<div className={classes.chartContainer}>
			<div className={classes.header}>
				<InfoVolume title={title} range={range} data={currentItem} />
				<div className={classes.headerActions}>
					<ButtonsVolume onChangeRange={changeRange} range={range} data={currentData} />
				</div>
			</div>
			<ChartVolume
				data={currentData}
				range={range}
				crossMove={onMove}
				onMouseLeave={onLeave}
				onClick={onClick}
				defaultView={defaultView}
			/>
		</div>
	)
}

export default ContainerChartVolume
