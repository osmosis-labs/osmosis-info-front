import { makeStyles } from "@material-ui/core"

import React, { useEffect, useRef, useState } from "react"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import { formatHistoricalToken } from "../../../../formaters/tokens.formatter"
import useRequest from "../../../../hooks/request.hook"
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

const ExpertChart = ({ token, className }) => {
	const classes = useStyles()
	const request = useRequest()
	const [chartIsReady, setChartIsReady] = useState(false)

	const chartRef = useRef(null)

	const chartReady = () => {
		setChartIsReady(true)
	}

	const getHistoricalChartToken = async ({ symbol, tf }) => {
		try {
			let response = await request({
				url: `https://api-osmosis.imperator.co/tokens/v2/historical/${symbol}/chart?tf=${tf}`,
				method: "GET",
			})
			return formatHistoricalToken(response.data)
		} catch (e) {
			console.log("%cExpertChart.jsx -> 41 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
		}
	}

	useEffect(() => {
		const fetch = async () => {
			window.tvWidget = new window.TradingView.widget({
				symbol: token.symbol, // default symbol
				fullscreen: false, // displays the chart in the fullscreen mode
				interval: 15, // default interval
				datafeed: getDataFeed({
					token,
					getHistoricalChartToken,
					chartReady,
				}),
				container: "chartExpert",
				library_path: "/charting_library/",
				autosize: true,
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
