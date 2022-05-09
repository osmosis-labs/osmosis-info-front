import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { useRef } from "react"
import { createChart } from "lightweight-charts"
import { ResizeObserver } from "resize-observer"
import { formateNumberDecimalsAutoV2, formaterNumber } from "../../../../helpers/helpers"

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
	}
})

const Chart = ({ data, crossMove, onMouseLeave }) => {
	const classes = useStyles()
	const chartRef = useRef(null)
	const containerRef = useRef(null)
	const serieRef = useRef(null)
	const resizeObserver = useRef(null)
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))

	useEffect(() => {
		resizeObserver.current = new ResizeObserver((entries, b) => {
			if (chartRef.current) {
				const { width, height } = entries[0].contentRect
				chartRef.current.applyOptions({ width, height })
				setTimeout(() => {
					chartRef.current.timeScale().fitContent()
				}, 0)
			}
		})
		resizeObserver.current.observe(containerRef.current, {
			box: "content-box",
		})
		return () => {
			resizeObserver.current.disconnect()
		}
	}, [matchXS])

	useEffect(() => {
		// Initialization
		if (data.length > 0) {
			if (chartRef.current === null) {
				const options = {
					rightPriceScale: {
						scaleMargins: {
							bottom: 0,
						},
					},
					layout: {
						backgroundColor: "rgba(31, 33, 40,0)",
						textColor: "#c3c5cb",
						fontFamily: "'Inter'",
					},
					localization: {
						priceFormatter: (price) => {
							return formaterNumber(price)
						},
					},
					grid: {
						horzLines: {
							visible: false,
						},
						vertLines: {
							visible: false,
						},
					},
					crosshair: {
						horzLine: {
							visible: true,
							style: 1,
							width: 2,
							color: "rgba(0, 206, 186, 0.5)",
							labelVisible: true,
						},
						vertLine: {
							visible: true,
							style: 1,
							width: 2,
							color: "rgba(0, 206, 186, 0.5)",
							labelVisible: true,
						},
					},
					timeScale: {
						rightOffset: 1,
						barSpacing: 28,
						lockVisibleTimeRangeOnResize: true,
					},
				}
				let chart = createChart(containerRef.current, options)
				chartRef.current = chart

				let min = data.reduce((pr, cv) => {
					if (pr < cv.value) {
						return pr
					} else {
						return cv.value
					}
				}, data[0].value)

				let max = data.reduce((pr, cv) => {
					if (pr > cv.value) {
						return pr
					} else {
						return cv.value
					}
				}, data[0].value)
				serieRef.current = chartRef.current.addAreaSeries({
					topColor: "rgba(0, 206, 186, 0.4)",
					bottomColor: "rgba(0, 206, 186, 0.0)",
					lineColor: "rgba(0, 206, 186, 1)",
					lineWidth: 3,
					autoscaleInfoProvider: () => ({
						priceRange: {
							minValue: min,
							maxValue: max,
						},
					}),
				})
			}
			if (serieRef.current !== null && chartRef.current !== null) {
				let min = data.reduce((pr, cv) => {
					if (pr < cv.value) {
						return pr
					} else {
						return cv.value
					}
				}, data[0].value)

				let max = data.reduce((pr, cv) => {
					if (pr > cv.value) {
						return pr
					} else {
						return cv.value
					}
				}, data[0].value)
				serieRef.current.applyOptions({
					autoscaleInfoProvider: () => ({
						priceRange: {
							minValue: min,
							maxValue: max,
						},
					}),
				})
				serieRef.current.setData([...data])
				chartRef.current.timeScale().fitContent()
				const hover = (event) => {
					let item = { time: event.time }
					crossMove(item)
				}
				chartRef.current.subscribeCrosshairMove(hover)
				return () => {
					chartRef.current.unsubscribeCrosshairMove(hover)
				}
			}
		}
	}, [data, crossMove])

	return (
		<div className={classes.chartContainer}>
			<div onMouseLeave={onMouseLeave} className={classes.chartRoot} ref={containerRef} />
		</div>
	)
}

export default Chart
