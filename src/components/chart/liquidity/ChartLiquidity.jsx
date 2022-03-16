import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { useRef } from "react"
import { createChart } from "lightweight-charts"
import { ResizeObserver } from "resize-observer"
import { formaterNumber } from "../../../helpers/helpers"

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
	}
})

const ChartLiquidity = ({ data, crossMove, onMouseLeave }) => {
	const classes = useStyles()
	const chartRef = useRef(null)
	const containerRef = useRef(null)
	const serieRef = useRef(null)
	const resizeObserver = useRef(null)
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))

	useEffect(() => {
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
		return () => {
			resizeObserver.current.disconnect()
		}
	}, [matchXS])


	useEffect(() => {
		// Initialization
		if (chartRef.current === null) {
			let chart = createChart(containerRef.current, {
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

			serieRef.current = chart.addAreaSeries({
				topColor: "rgba(196, 164, 106, 0.4)",
				bottomColor: "rgba(196, 164, 106, 0.0)",
				lineColor: "rgba(251, 192, 45, 1)",
				lineWidth: 3,
			})
			chartRef.current = chart
		}

		const hover = (event) => {
			let item = {time: event.time, value: event.seriesPrices.get(serieRef.current)}
			crossMove(item)
		}
		chartRef.current.subscribeCrosshairMove(hover)
		return () => {
			chartRef.current.unsubscribeCrosshairMove(hover)
		}
	}, [crossMove])

	useEffect(() => {
		// When data is updated
		serieRef.current.setData(data)
		chartRef.current.timeScale().fitContent()
	}, [data])

	return (
		<div className={classes.chartContainer}>
			<div onMouseLeave={onMouseLeave} className={classes.chartRoot} ref={containerRef} />
		</div>
	)
}

export default ChartLiquidity
