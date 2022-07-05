import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import Paper from "../../../../components/paper/Paper"
import ChartSkeleton from "../../../../components/skeleton/chart_skeleton"
import CustomSkeleton from "../../../../components/skeleton/custom_skeleton"
import { useDebug } from "../../../../contexts/debug.provider"
import { useKeplr } from "../../../../contexts/KeplrProvider"
import { useExposure } from "../../../../hooks/data/dashboard.hook"
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
		chartSkeleton: { margin: "10px" },
		rowSkeleton: {
			display: "flex",
			margin: "10px 20px",
		},
	}
})

const colorsChart = ["#ef5350", "#ab47bc", "#29b6f6", "#26a69a", "#9ccc65", "#ffa726"]
const colorOther = "#546e7a"
const min = 2

const Exposure = () => {
	const classes = useStyles()
	const { address } = useKeplr()
	const { isLoadingDebug } = useDebug()

	//Exposure
	const { data: exposure, isLoading: isLoadingExposure, isFetching } = useExposure({ address })

	const isLoading = isLoadingExposure || isFetching || isLoadingDebug

	const [currentExposure, setCurrentExposure] = useState("pool")
	const [listExposureAsset, setListExposureAsset] = useState([])
	const [listExposurePool, setListExposurePool] = useState([])
	const [totalExposure, setTotalExposure] = useState(0)

	useEffect(() => {
		if (exposure) {
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
							acc = token.symbolDisplay
							return acc
						} else {
							return acc + ` / ${token.symbolDisplay}`
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
					name: token.symbolDisplay,
					value: token.value,
					percent: token.tokenPercent,
					inOther,
				}
			})

			setListExposureAsset(listExposureAsset)
			setListExposurePool(listExposurePool)
		}
	}, [exposure])

	const onChangeExposure = (exposure) => {
		setCurrentExposure(exposure)
	}

	const currentData = currentExposure === "asset" ? listExposureAsset : listExposurePool

	return (
		<div className={classes.rootExposure}>
			<p className={classes.title}>My Exposure</p>
			<Paper className={classes.paper}>
				{currentData.length > 0 ? (
					<>
						{isLoading ? (
							<ChartSkeleton className={classes.chartSkeleton} sx={{ margin: "0px" }} />
						) : (
							<ChartContainer data={currentData} colorOther={colorOther} totalExposure={totalExposure} />
						)}
						{isLoading ? (
							<div>
								<div className={classes.rowSkeleton}>
									<CustomSkeleton
										height={30}
										width={80}
										sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
									<CustomSkeleton
										height={30}
										width={50}
										sx={{ margin: "0px 0px 0px 60px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
									<CustomSkeleton
										height={30}
										width={50}
										sx={{ margin: "0px 0px 0px 60px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
								</div>
								<div className={classes.rowSkeleton}>
									<CustomSkeleton
										height={30}
										width={80}
										sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
									<CustomSkeleton
										height={30}
										width={50}
										sx={{ margin: "0px 0px 0px 60px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
									<CustomSkeleton
										height={30}
										width={50}
										sx={{ margin: "0px 0px 0px 60px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
								</div>
								<div className={classes.rowSkeleton}>
									<CustomSkeleton
										height={30}
										width={80}
										sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
									<CustomSkeleton
										height={30}
										width={50}
										sx={{ margin: "0px 0px 0px 60px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
									<CustomSkeleton
										height={30}
										width={50}
										sx={{ margin: "0px 0px 0px 60px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
								</div>
							</div>
						) : (
							<Info onChangeExposure={onChangeExposure} currentExposure={currentExposure} currentList={currentData} />
						)}
					</>
				) : (
					<p className={classes.textNotFound}>No data found.</p>
				)}
			</Paper>
		</div>
	)
}

export default Exposure
