import { Dialog, makeStyles, Slide } from "@material-ui/core"
import React, { useEffect, useRef, useState } from "react"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import { useTokenChartV2 } from "../../../../contexts/TokenChartV2"
import AppBarExpertChart from "./AppBarExpertChart"
import getDataFeed from "./getDataFeed"
const useStyles = makeStyles((theme) => {
	return {
		expertContainer: {
			height: "100%",
			width: "100%",
			backgroundColor: theme.palette.primary.light,
			padding: theme.spacing(2),
		},
		chartContainer: {
			paddingTop: theme.spacing(1),
			display: "flex",
			flexGrow: "1",
		},
		chartExpert: {
			height: "100%",
			width: "100%",
			backgroundColor: theme.palette.primary.main,
		},
		tableContainer: {
			backgroundColor: theme.palette.primary.dark,

			paddingTop: theme.spacing(1),
			display: "flex",
			flexGrow: "1",
		},
	}
})

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const ExpertChartDialog = ({ open, onClose, token }) => {
	const classes = useStyles()
	const { getVolumeChartToken, getHistoricalChartToken, getLiquidityChartToken, loadingTokens } = useTokenChartV2()

	const [chartIsReady, setChartIsReady] = useState(false)

	const chartRef = useRef(null)

	const chartReady = () => {
		console.log("ExpertChartDialog.jsx -> 45: here")
		setChartIsReady(true)
	}

	useEffect(() => {
		console.log("ExpertChartDialog.jsx -> 53: chartRef", chartRef)
		const fetch = async () => {
			window.tvWidget = new window.TradingView.widget({
				symbol: token.symbol, // default symbol
				fullscreen: false, // displays the chart in the fullscreen mode
				interval: 60 * 24, // default interval
				datafeed: getDataFeed({
					token,
					getVolumeChartToken,
					getHistoricalChartToken,
					getLiquidityChartToken,
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
			console.log("ExpertChartDialog.jsx -> 70: token", token)
			fetch()
		}
	}, [token, chartRef.current])

	const handleClose = () => {
		onClose()
	}

	useEffect(() => {
		console.log("ExpertChartDialog.jsx -> 85: chartRef", chartRef)
	}, [chartRef])
	console.log("ExpertChartDialog.jsx -> 83: charReft", chartRef)

	return (
		<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
			<AppBarExpertChart onClose={handleClose} token={token} />
			<div className={classes.expertContainer}>
				<BlocLoaderOsmosis open={!chartIsReady} classNameLoading={classes.loading} />
				<div className={classes.chartContainer}>
					<div className={classes.chartExpert} id="chartExpert" ref={chartRef}>
						dsqcxc
					</div>
				</div>
				<div className={classes.tableContainer}></div>
			</div>
		</Dialog>
	)
}

export default ExpertChartDialog
