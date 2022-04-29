import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import { formateNumber, formaterNumber } from "../../../../../helpers/helpers"
import ReactTooltip from "react-tooltip"
const useStyles = makeStyles((theme) => {
	return {
		rootChartContainer: {
			position: "relative",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding: "8px",
			maxHeight: "350px",
			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			textAlign: "center",
			color: theme.palette.primary.contrastText,
			fontSize: "12px",
		},
		total: {
			color: theme.palette.primary.contrastText,
			marginTop: "10px",
			fontSize: "18px",
		},
	}
})

const ChartContainer = ({ data, colorOther }) => {
	const classes = useStyles()
	const [currentData, setCurrentData] = useState([])
	const [total, setTotal] = useState(0)
	const [hovered, setHovered] = useState(null)

	useEffect(() => {
		let formattedData = []
		let other = {
			title: "Others",
			color: colorOther,
			value: 0,
		}
		let total = 0
		data.forEach((item, index) => {
			total += item.value
			if (item.inOther) {
				other.value += item.percent
			} else {
				formattedData.push({
					color: item.color,
					name: item.name,
					value: parseFloat(formaterNumber(item.percent)),
				})
			}
		})
		other.value = parseFloat(formaterNumber(other.value))
		formattedData.push(other)
		setTotal(total)
		setCurrentData(formattedData)
	}, [data])

	const tooltip = () => {
		if (typeof hovered === "number") {
			let data = currentData[hovered]
			return `${data.name}: ${data.value}%`
		}
		return null
	}

	return (
		<div className={classes.rootChartContainer} data-tip="" data-for="chart">
			<div className={classes.title}>
				<p>Total Expose Value</p>
				<p className={classes.total}>${formateNumber(total)}</p>
			</div>
			<PieChart
				data={currentData}
				lineWidth={30}
				onMouseOver={(_, index) => {
					setHovered(index)
				}}
				onMouseOut={() => {
					setHovered(null)
				}}
			/>
			<ReactTooltip id="chart" data-tip="" getContent={() => tooltip()} />
		</div>
	)
}

export default ChartContainer
