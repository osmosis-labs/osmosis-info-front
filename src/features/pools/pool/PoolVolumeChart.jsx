import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { useRef } from "react"
import { createChart } from "lightweight-charts"
import { formaterNumber } from "../../../helpers/helpers"
import { ResizeObserver } from "resize-observer"

const useStyles = makeStyles((theme) => {
	return {
		volumeChartRoot: {
			position: "absolute",
			top: "0",
			right: "0",
			bottom: "0",
			left: "0",
			height: "100%",
			width: "100%",
		},
		chartContainer: {
			position: "relative",
			height: "100%",
			width: "100%",
		},
	}
})

const PoolVolumeChart = ({ data, crossMove }) => {
	const classes = useStyles()
	const chartRef = useRef(null)
	const containerRef = useRef(null)
	const serieRef = useRef(null)
	const resizeObserver = useRef(null)
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))

	useEffect(() => {
		// Used to resize chart.

		// Need to change observer because the break point break the observer
		if (matchXS) {
			if (resizeObserver.current) resizeObserver.current.disconnect()
			resizeObserver.current = new ResizeObserver((entries, b) => {
				chartRef.current.applyOptions({ width: window.innerWidth - 100 })
				setTimeout(() => {
					chartRef.current.timeScale().fitContent()
				}, 0)
			})
			resizeObserver.current.observe(document.body, { box: "content-box" })
			resizeObserver.current.observe(containerRef.current, {
				box: "content-box",
			})
		} else {
			if (resizeObserver.current) resizeObserver.current.disconnect()
			resizeObserver.current = new ResizeObserver((entries, b) => {
				const { width, height } = entries[0].contentRect
				chartRef.current.applyOptions({ width, height })
				setTimeout(() => {
					chartRef.current.timeScale().fitContent()
				}, 0)
			})
			resizeObserver.current.observe(containerRef.current, {
				box: "content-box",
			})
		}
		return () => {
			resizeObserver.current.disconnect()
		}
	}, [matchXS])

	useEffect(() => {
		// Initialization
		if (chartRef.current === null) {
			let chart = createChart(containerRef.current, {
				layout: {
					backgroundColor: "rgba(31, 33, 40,0)",
					textColor: "#c3c5cb",
					fontFamily: "'Inter'",
				},
				rightPriceScale: {
					scaleMargins: {
						top: 0.1,
						bottom: 0,
					},
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
						visible: false,
						labelVisible: false,
					},
					vertLine: {
						visible: true,
						style: 0,
						width: 2,
						color: "rgba(32, 38, 46, 0.1)",
						labelVisible: false,
					},
				},
				timeScale: {
					rightOffset: 1,
					barSpacing: 28,
					lockVisibleTimeRangeOnResize: true,
				},
			})

			serieRef.current = chart.addHistogramSeries({
				color: "rgba(251, 192, 45, 0.9)",
			})
			chartRef.current = chart
		}

		chartRef.current.subscribeCrosshairMove((event) => {
			crossMove(event, serieRef.current)
		})
		return () => {
			chartRef.current.unsubscribeCrosshairMove()
		}
	}, [crossMove])

	useEffect(() => {
		// When data is updated
		serieRef.current.setData(data)
		chartRef.current.timeScale().fitContent()
	}, [data])

	return (
		<div className={classes.chartContainer}>
			<div className={classes.volumeChartRoot} ref={containerRef} />
		</div>
	)
}

export default PoolVolumeChart
