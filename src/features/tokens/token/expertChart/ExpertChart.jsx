import { makeStyles } from "@material-ui/core"

import React, { useEffect, useRef, useState } from "react"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import getDataFeed from "./getDataFeed"

const useStyles = makeStyles((theme) => {
	return {
		expertChartRoot: {
			display: "flex",
			flexGrow: "1",
			position: "relative",
		},
		chartExpert: {
			height: "100%",
			width: "100%",
		},
	}
})

const ExpertChart = ({token, getHistoricalChartToken, className}) => {
	const classes = useStyles()
	const [chartIsReady, setChartIsReady] = useState(false)

	const chartRef = useRef(null)

	const chartReady = () => {
		setChartIsReady(true)
	}

	useEffect(() => {
		const fetch = async () => {
			window.tvWidget = new window.TradingView.widget({
				symbol: token.symbol, // default symbol
				fullscreen: false, // displays the chart in the fullscreen mode
				interval: 15, // default interval
				datafeed: getDataFeed({
					token,
					getHistoricalChartToken ,
					chartReady,
				}),
				container: "chartExpert",
				library_path: "/charting_library/",
				autosize: true,
				intervals: [],
				time_frames: [],
				theme: "dark",
			})
		}
		if (token.symbol && chartRef.current) {
			fetch()
		}
	}, [token, chartRef.current])
	return (
		<div className={`${classes.expertChartRoot} ${className}`}>
			<BlocLoaderOsmosis open={!chartIsReady} classNameLoading={classes.loading} />
			<div className={classes.chartExpert} id="chartExpert" ref={chartRef}></div>
		</div>
	)
}

export default ExpertChart
