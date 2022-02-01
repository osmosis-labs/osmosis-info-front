import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import ButtonGroup from "../../components/buttonGroup/ButtonGroup"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { useCharts } from "../../contexts/ChartsProvider"
import { usePools } from "../../contexts/PoolsProvider"
import { useTokens } from "../../contexts/TokensProvider"
import { formatDate, formateNumberPrice, getDates, twoNumber } from "../../helpers/helpers"
import PoolsTable from "../pools/PoolsTable"
import TokensTable from "../tokens/TokensTable"
import LiquidityChart from "./LiquidityChart"
import VolumeChart from "./VolumeChart"

const useStyles = makeStyles((theme) => {
	return {
		overviewRoot: {
			overflowX: "hidden",
		},
		radiant: {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			height: "200vh",
			opacity: "0.3",
			transform: "translateY(-150vh)",
			mixBlendMode: "color",
			pointerEvents: "none",
			background: `radial-gradient(50% 50% at 50% 60%, ${theme.palette.primary.main} 30%,  ${theme.palette.black.light} 100%)`,
		},
		subTitle: {
			color: theme.palette.gray.main,
		},
		container: {
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
		},
		charts: {
			width: "100%",
			display: "flex",
			justifyContent: "space-between",

			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				width: "auto",
				"&>:nth-child(1)": {
					marginBottom: theme.spacing(2),
				},
			},
		},
		chart: {
			position: "relative",
			width: "49%",
			zIndex: "0",
			[theme.breakpoints.down("xs")]: {
				width: "100%",
			},
		},
		chartTitle: {
			padding: `2px 0`,
		},
		chartTextBig: {
			fontSize: theme.fontSize.veryBig,
			color: theme.palette.gray.contrastText,
			padding: `2px 0`,
			fontVariantNumeric: "tabular-nums",
		},
		chartTextSmall: {
			fontSize: "12px",
			padding: `2px 0`,
		},
		containerLoading: {
			position: "relative",
			minWidth: "200px",
			minHeight: "200px",
		},
		chartHeader: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		chartHeaderData: {},
		chartHeaderButton: {
			display: "flex",
			alignItems: "flex-end",
			flexDirection: "column",
			justifyContent: "flex-end",
			padding: theme.spacing(1),
		},
		groupButton: {
			marginBottom: theme.spacing(1),
		},
	}
})

const Overview = () => {
	const classes = useStyles()
	const { dataLiquidityD, dataLiquidityW, dataLiquidityM, dataVolumeD, dataVolumeW, dataVolumeM, loadingData } =
		useCharts()
	const [size, setSize] = useState("xl")
	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))
	const matchSM = useMediaQuery((theme) => theme.breakpoints.down("sm"))
	const matchMD = useMediaQuery((theme) => theme.breakpoints.down("md"))
	const matchLD = useMediaQuery((theme) => theme.breakpoints.down("ld"))
	const [chartLiquidityInfo, setChartLiquidityInfo] = useState({
		price: "0",
		date: "-",
	})
	const [chartVolumeInfo, setChartVolumeInfo] = useState({
		price: "0",
		date: "-",
	})
	const { pools, loadingPools } = usePools()
	const { tokens, loadingTokens } = useTokens()
	const [dataPools, setDataPools] = useState([])
	const [dataTokens, setDataTokens] = useState([])
	const [rangeVolume, setRangeVolume] = useState("d")
	const [rangeLiquidity, setRangeLiquidity] = useState("d")
	const history = useHistory()

	const [dataLiquidity, setDataLiquidity] = useState([])
	const [dataVolume, setDataVolume] = useState([])

	const crossMoveLiquidity = useCallback(
		(event, serie) => {
			if (event.time) {
				updateChartLiquidityInfo(
					{
						time: new Date(`${event.time.year}-${event.time.month}-${event.time.day}`),
						value: event.seriesPrices.get(serie),
					},
					rangeLiquidity
				)
			}
		},
		[rangeLiquidity]
	)

	const crossMoveVolume = useCallback((event, serie) => {
		if (event.time) {
			updateChartVolumeInfo({
				time: new Date(`${event.time.year}-${event.time.month}-${event.time.day}`),
				value: event.seriesPrices.get(serie),
			}, rangeVolume)
		}
	}, [rangeVolume])

	const updateChartLiquidityInfo = (item, range) => {
		if (item && item.time) {
			let date = new Date(item.time)
			let price = formateNumberPrice(item.value)
			let dateStr = formatDate(date)
			if (range && range != "d") {
				let dates = getDates(date, range)
				dateStr = `${formatDate(dates[0])} - ${formatDate(dates[1])}`
			}
			setChartLiquidityInfo({ price, date: dateStr })
		}
	}

	const updateChartVolumeInfo = (item, range) => {
		if (item && item.time) {
			let date = new Date(item.time)
			let price = formateNumberPrice(item.value)
			let dateStr = formatDate(date)
			if (range && range != "d") {
				let dates = getDates(date, range)
				dateStr = `${formatDate(dates[0])} - ${formatDate(dates[1])}`
			}
			setChartVolumeInfo({ price, date: dateStr })
		}
	}

	useEffect(() => {
		// set default data
		if (dataLiquidityD.length > 0) {
			let lastElt = dataLiquidityD[dataLiquidityD.length - 1]
			let date = ""
			if (lastElt.time.year) {
				date = new Date(lastElt.time.year + "-" + lastElt.time.month + "-" + lastElt.time.day)
			} else {
				date = new Date(lastElt.time)
			}
			updateChartLiquidityInfo({ time: date, value: lastElt.value })
		}
		if (dataVolumeD.length > 0) {
			let lastElt = dataVolumeD[dataVolumeD.length - 1]
			let date = ""
			if (lastElt.time.year) {
				date = new Date(lastElt.time.year + "-" + lastElt.time.month + "-" + lastElt.time.day)
			} else {
				date = new Date(lastElt.time)
			}
			updateChartVolumeInfo({ time: date, value: lastElt.value })
		}
		setDataLiquidity(dataLiquidityD)
		setDataVolume(dataVolumeD)
	}, [dataLiquidityD, dataVolumeD])

	useEffect(() => {
		// sort pools on the first time is fetched
		let data = [...pools]
		data.sort((a, b) => {
			if (b.liquidity < a.liquidity) {
				return -1
			}
			if (b.liquidity > a.liquidity) {
				return 1
			}
			return 0
		})
		setDataPools(data)
	}, [pools])

	useEffect(() => {
		// sort tokens on the first time is fetched
		let data = [...tokens]
		data.sort((a, b) => {
			if (b.liquidity < a.liquidity) {
				return -1
			}
			if (b.liquidity > a.liquidity) {
				return 1
			}
			return 0
		})
		setDataTokens(data)
	}, [tokens])

	useEffect(() => {
		if (matchXS) {
			setSize("xs")
		} else if (matchSM) {
			setSize("sm")
		} else if (matchMD) {
			setSize("md")
		} else if (matchLD) {
			setSize("ld")
		} else {
			setSize("xl")
		}
	}, [matchXS, matchSM, matchMD, matchLD])

	const onClickPool = (pool) => {
		history.push(`/pool/${pool.id}`)
	}

	const onClickToken = (token) => {
		history.push(`/token/${token.symbol}`)
	}

	const onChangeRangeVolume = (value) => {
		setRangeVolume(value)
		let volume = []
		if (value === "d") volume = dataVolumeD
		else if (value === "w") volume = dataVolumeW
		else if (value === "m") volume = dataVolumeM
		if (volume.length > 0) {
			let lastElt = volume[volume.length - 1]
			let date = ""
			if (lastElt.time.year) {
				// If time can be use to get date or need to be modified
				date = new Date(lastElt.time.year + "-" + lastElt.time.month + "-" + lastElt.time.day)
			} else {
				date = new Date(lastElt.time)
			}
			updateChartVolumeInfo({ time: date, value: lastElt.value }, value)
		}
		setDataVolume(volume)
	}

	const onChangeRangeLiquidity = (value) => {
		setRangeLiquidity(value)
		let liquidity = []
		if (value === "d") liquidity = dataLiquidityD
		else if (value === "w") liquidity = dataLiquidityW
		else if (value === "m") liquidity = dataLiquidityM
		if (liquidity.length > 0) {
			let lastElt = liquidity[liquidity.length - 1]
			let date = ""
			if (lastElt.time.year) {
				// If time can be use to get date or need to be modified
				date = new Date(lastElt.time.year + "-" + lastElt.time.month + "-" + lastElt.time.day)
			} else {
				date = new Date(lastElt.time)
			}
			console.log("Overview.jsx -> 284: date", date)
			updateChartLiquidityInfo({ time: date, value: lastElt.value }, value)
		}
		setDataLiquidity(liquidity)
	}

	return (
		<div className={classes.overviewRoot}>
			<div className={classes.container}>
				<p className={classes.subTitle}>Osmosis - Overview</p>
				<div className={classes.charts}>
					<Paper className={classes.chart}>
						<BlocLoaderOsmosis open={loadingData} borderRadius={true} />
						<div className={classes.chartHeader}>
							<div className={classes.chartHeaderData}>
								<p className={classes.chartTitle}>Liquidity</p>
								<p className={classes.chartTextBig}>{chartLiquidityInfo.price}</p>
								<p className={classes.chartTextSmall}>{chartLiquidityInfo.date}</p>
							</div>
							<div className={classes.chartHeaderButton}>
								<ButtonGroup
									className={classes.groupButton}
									buttons={[
										{
											id: "d",
											name: "D",
											onClick: () => {
												onChangeRangeLiquidity("d")
											},
										},
										{
											id: "w",
											name: "W",
											onClick: () => {
												onChangeRangeLiquidity("w")
											},
										},
										{
											id: "m",
											name: "M",
											onClick: () => {
												onChangeRangeLiquidity("m")
											},
										},
									]}
									active={rangeLiquidity}
								/>
							</div>
						</div>
						<LiquidityChart data={dataLiquidity} crossMove={crossMoveLiquidity} />
					</Paper>
					<Paper className={classes.chart}>
						<BlocLoaderOsmosis open={loadingData} borderRadius={true} />
						<div className={classes.chartHeader}>
							<div className={classes.chartHeaderData}>
								<p className={classes.chartTitle}>Volume</p>
								<p className={classes.chartTextBig}>{chartVolumeInfo.price}</p>
								<p className={classes.chartTextSmall}>{chartVolumeInfo.date}</p>
							</div>
							<div className={classes.chartHeaderButton}>
								<ButtonGroup
									className={classes.groupButton}
									buttons={[
										{
											id: "d",
											name: "D",
											onClick: () => {
												onChangeRangeVolume("d")
											},
										},
										{
											id: "w",
											name: "W",
											onClick: () => {
												onChangeRangeVolume("w")
											},
										},
										{
											id: "m",
											name: "M",
											onClick: () => {
												onChangeRangeVolume("m")
											},
										},
									]}
									active={rangeVolume}
								/>
							</div>
						</div>
						<VolumeChart data={dataVolume} crossMove={crossMoveVolume} />
					</Paper>
				</div>

				<p className={classes.subTitle}>Top tokens</p>
				<Paper className={classes.containerLoading}>
					<BlocLoaderOsmosis open={loadingTokens} borderRadius={true} />
					<TokensTable
						data={dataTokens}
						textEmpty={"Any rows"}
						size={size}
						sortable={true}
						onClickToken={onClickToken}
					/>
				</Paper>
				<p className={classes.subTitle}>Top pools</p>
				<Paper className={classes.containerLoading}>
					<BlocLoaderOsmosis open={loadingPools} borderRadius={true} />
					<PoolsTable data={dataPools} textEmpty={"Any rows"} size={size} sortable={true} onClickPool={onClickPool} />
				</Paper>
			</div>
		</div>
	)
}

export default Overview
