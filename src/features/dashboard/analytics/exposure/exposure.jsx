import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
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
		paper: {
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
	const [currentExposure, setCurrentExposure] = useState("asset")
	const [listExposureAsset, setListExposureAsset] = useState([])
	const [listExposurePool, setListExposurePool] = useState([])

	useEffect(() => {
		const fetch = async () => {
			let { balance, exposure } = await getWalletInfo({ address })
			let indexColor = 0
			let sortedExposureAsset = exposure.pools.sort((a, b) => {
				return b.percent - a.percent
			})
			let listExposureAsset = sortedExposureAsset.map((pool, i) => {
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
			let sortedExposurePool = balance.wallet.sort((a, b) => {
				return b.tokenPercent - a.tokenPercent
			})
			let listExposurePool = sortedExposurePool.map((token) => {
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
				<ChartContainer
					data={currentExposure === "asset" ? listExposureAsset : listExposurePool}
					colorOther={colorOther}
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
