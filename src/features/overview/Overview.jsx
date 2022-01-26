import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import BlocLoaderOsmosis from "../../components/loader/BlocLoaderOsmosis"
import Paper from "../../components/paper/Paper"
import { useCharts } from "../../contexts/ChartsProvider"
import { useLoader } from "../../contexts/LoaderProvider"
import { usePools } from "../../contexts/PoolsProvider"
import { useTokens } from "../../contexts/TokensProvider"
import { formatDate, formateNumberPrice, twoNumber } from "../../helpers/helpers"
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
		containerLoading:{
			position: "relative",
			minWidth: "200px",
			minHeight: "200px",
		}
	}
})

const Overview = () => {
	const classes = useStyles()
	const { dataLiquidity, dataVolume, loadingData } = useCharts()
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
	const history = useHistory()

	const crossMoveLiquidity = useCallback((event, serie) => {
		if (event.time) {
			let price = formateNumberPrice(event.seriesPrices.get(serie))
			let date = new Date(`${twoNumber(event.time.year)}/${twoNumber(event.time.month)}/${twoNumber(event.time.day)}`)
			setChartLiquidityInfo({ price, date: formatDate(date) })
		}
	}, [])
	const crossMoveVolume = useCallback((event, serie) => {
		if (event.time) {
			let price = formateNumberPrice(event.seriesPrices.get(serie))
			let date = new Date(`${twoNumber(event.time.year)}/${twoNumber(event.time.month)}/${twoNumber(event.time.day)}`)
			setChartVolumeInfo({ price, date: formatDate(date) })
		}
	}, [])

	useEffect(() => {
		// set default data
		const today = new Date()
		const initDate = formatDate(today)
		let priceLiquidity = "0"
		if (dataLiquidity.length > 0) {
			priceLiquidity = formateNumberPrice(dataLiquidity[dataLiquidity.length - 1].value)
		}
		let priceVolume = "0"
		if (dataVolume.length > 0) {
			priceVolume = formateNumberPrice(dataVolume[dataVolume.length - 1].value)
		}
		setChartLiquidityInfo({ price: priceLiquidity, date: initDate })
		setChartVolumeInfo({ price: priceVolume, date: initDate })
	}, [dataLiquidity, dataVolume])

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

	return (
		<div className={classes.overviewRoot}>
			{/* <div className={classes.radiant}> </div> */}
			<div className={classes.container}>
				<p className={classes.subTitle}>Osmosis - Overview</p>
				<div className={classes.charts}>
					<Paper className={classes.chart}>
						<BlocLoaderOsmosis open={loadingData} borderRadius={true} />
						<p className={classes.chartTitle}>Liquidity</p>
						<p className={classes.chartTextBig}>{chartLiquidityInfo.price}</p>
						<p className={classes.chartTextSmall}>{chartLiquidityInfo.date}</p>
						<LiquidityChart data={dataLiquidity} crossMove={crossMoveLiquidity} />
					</Paper>
					<Paper className={classes.chart}>
						<BlocLoaderOsmosis open={loadingData} borderRadius={true} />
						<p className={classes.chartTitle}>Volume</p>
						<p className={classes.chartTextBig}>{chartVolumeInfo.price}</p>
						<p className={classes.chartTextSmall}>{chartVolumeInfo.date}</p>
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
					<BlocLoaderOsmosis open={loadingPools}  borderRadius={true}/>
					<PoolsTable data={dataPools} textEmpty={"Any rows"} size={size} sortable={true} onClickPool={onClickPool} />
				</Paper>
			</div>
		</div>
	)
}

export default Overview
