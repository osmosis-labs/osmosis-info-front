import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useEffect } from "react"
import { useRef } from "react"
import { createChart, CrosshairMode } from "lightweight-charts"
import { ResizeObserver } from "resize-observer"
import { float2Numbers, formateNumberDecimalsAutoV2 } from "../../../helpers/helpers"

const useStyles = makeStyles((theme) => {
	return {
		chartContainer: {
			position: "relative",
			height: "100%",
			width: "100%",
		},
		chart: {
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

const ChartPrice = ({ data: a, crossMove, onMouseLeave }) => {
	const classes = useStyles()
	const chartRef = useRef(null)
	const containerRef = useRef(null)
	const serieRef = useRef(null)
	const resizeObserver = useRef(null)
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))
	const data = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];

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
				layout: {
					backgroundColor: "rgba(31, 33, 40,0)",
					textColor: "#c3c5cb",
					fontFamily: "'Inter'",
				},
				localization: {
					priceFormatter: (price) => {
						return formateNumberDecimalsAutoV2({ price: price })
					},
				},
				grid: {
					vertLines: {
						visible: false,
					},
					horzLines: {
						color: "rgba(42, 46, 57, 0.5)",
						visible: false,
					},
				},
				crosshair: {
					mode: CrosshairMode.Normal,
				},
				timeScale: {
					rightOffset: 1,
					barSpacing: 28,
					lockVisibleTimeRangeOnResize: true,
				},
			})

			serieRef.current = chart.addLineSeries({ color: '#2962FF' })
			chartRef.current = chart
		}
		const hover = (event) => {
			let item = { time: event.time, value: event.seriesPrices.get(serieRef.current) }
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
			<div onMouseLeave={onMouseLeave} className={classes.chart} ref={containerRef}></div>
		</div>
	)
}

export default ChartPrice
