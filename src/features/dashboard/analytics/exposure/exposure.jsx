import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import ChartContainer from "./chart/chart_container"
import Info from "./info"

const useStyles = makeStyles((theme) => {
	return {
		rootExposure: {
			width: "100%",
			margin: "20px 0",

			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			fontSize: "1.4rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
		loading: {
			backgroundColor: theme.palette.primary.light,
		},
		paper: {
			position: "relative",
			display: "grid",
			gridTemplateColumns: "1fr 1.2fr",
			height: "350px",
			overflow: "hidden",
		},
	}
})

const colorsChart = ["#ef5350", "#ab47bc", "#29b6f6", "#26a69a", "#9ccc65", "#ffa726"]
const colorOther = "#546e7a"
const min = 2

const Exposure = () => {
	const classes = useStyles()
	const { address, getWalletInfo } = useDashboard()
	const [currentExposure, setCurrentExposure] = useState("pool")
	const [listExposureAsset, setListExposureAsset] = useState([])
	const [listExposurePool, setListExposurePool] = useState([])
	const [totalExposure, setTotalExposure] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true)
			let { balance, exposure } = await getWalletInfo({ address })
			let indexColor = 0
			setTotalExposure(exposure.totalExposure)
			let sortedExposurePool = exposure.pools.sort((a, b) => {
				return b.percent - a.percent
			})
			let listExposurePool = sortedExposurePool.map((pool, i) => {
				if (indexColor === colorsChart.length) indexColor = 0
				let color = colorOther
				let inOther = true
				if (pool.percent > min) {
					color = colorsChart[indexColor]
					indexColor++
					inOther = false
				}
				return {
					color,
					name: pool.tokens.reduce((acc, token, index) => {
						if (index === 0) {
							acc = token.symbol
							return acc
						} else {
							return acc + ` / ${token.symbol}`
						}
					}, ""),
					value: pool.value,
					percent: pool.percent,
					inOther,
				}
			})
			indexColor = 0
			let sortedExposureAsset = exposure.assets.sort((a, b) => {
				return b.tokenPercent - a.tokenPercent
			})
			let listExposureAsset = sortedExposureAsset.map((token) => {
				if (indexColor === colorsChart.length) indexColor = 0
				let color = colorOther
				let inOther = true
				if (token.tokenPercent > min) {
					color = colorsChart[indexColor]
					indexColor++
					inOther = false
				}
				return {
					color,
					name: token.symbol,
					value: token.value,
					percent: token.tokenPercent,
					inOther,
				}
			})

			setListExposureAsset(listExposureAsset)
			setListExposurePool(listExposurePool)
			setIsLoading(false)
		}
		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	const onChangeExposure = (exposure) => {
		setCurrentExposure(exposure)
	}

	return (
		<div className={classes.rootExposure}>
			<p className={classes.title}>My Exposure</p>
			<Paper className={classes.paper}>
				<BlocLoaderOsmosis open={isLoading} classNameLoading={classes.loading} />
				<ChartContainer
					data={currentExposure === "asset" ? listExposureAsset : listExposurePool}
					colorOther={colorOther}
					totalExposure={totalExposure}
				/>
				<Info
					onChangeExposure={onChangeExposure}
					currentExposure={currentExposure}
					currentList={currentExposure === "asset" ? listExposureAsset : listExposurePool}
				/>
			</Paper>
		</div>
	)
}

export default Exposure
