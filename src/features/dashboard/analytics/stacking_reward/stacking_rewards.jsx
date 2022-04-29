import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import ButtonCSV from "../../../../components/button/button_csv"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import { formateNumberDecimalsAuto, formaterNumber, getPercent, twoNumber } from "../../../../helpers/helpers"
import ButtonChart from "./button_chart"
import Chart from "./chart"
const useStyles = makeStyles((theme) => {
	return {
		rootStackingRewards: {
			width: "100%",
			margin: "20px 0",

			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			fontSize: "1.4rem",
			color: theme.palette.gray.contrastText,
			marginRight: "20px",
		},
		containerTitle: {
			display: "flex",
			marginBottom: "8px",
			alignItems: "center",
		},
		loading: {
			backgroundColor: theme.palette.primary.light,
		},
		paper: {
			position: "relative",
			display: "grid",
			gridTemplateColumns: "3fr 1fr",
			height: "350px",
			overflow: "hidden",
		},
		chartContainer: {
			minHeight: "300px",
			height: "100%",
			width: "100%",
			display: "flex",
		},
		chartInfo: {
			marginLeft: "4px",
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
		},
		rowInfo: {
			margin: "4px 2px",
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
		},
		name: {
			fontSize: "11px",
			marginBottom: "2px",
			color: theme.palette.table.cellDark,
		},
		value: {
			color: theme.palette.gray.contrastText,
		},
		token: {
			color: theme.palette.table.cellDark,
			fontSize: "12px",
		},
		up: {
			color: theme.palette.green.text,
		},
		down: {
			color: theme.palette.error.main,
		},
		percent: {
			fontSize: "10px",
			alignSelf: "flex-end",
			marginLeft: "2px",
		},
	}
})
const StackingRewards = () => {
	const classes = useStyles()
	const { address, getChartStacking, getWalletInfo } = useDashboard()
	const [data, setData] = useState([])
	const [total, setTotal] = useState(0)
	const [range, setRange] = useState("7d")
	const [osmoStaked, setOsmoStacted] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true)
			let promises = [getChartStacking({ address: address, range }), getWalletInfo({ address })]
			let results = await Promise.all(promises)
			let data = await results[0]
			let { balance } = await results[1]
			setOsmoStacted(balance.osmoStaked)
			setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
			setData(data)
			setIsLoading(false)
		}
		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	const onChangeRange = async (rge) => {
		setRange(rge)
		let data = await getChartStacking({ address: address, range: rge })
		setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
		setData(data)
	}

	const donwloadStacking = () => {
		let dataDownload = [
			["time", "value"],
			...data.map((d) => [`${d.time.year}-${twoNumber(d.time.month)}-${twoNumber(d.time.day)}`, d.value]),
		]
		let csv = dataDownload.map((row) => row.join(",")).join("\n")
		let a = document.createElement("a")
		a.href = `data:attachment/csv,${encodeURIComponent(csv)}`
		a.target = "_blank"
		a.download = `staking_reward_${range}.csv`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	const getPercentDisplay = () => {
		let percent = 0
		if (osmoStaked > 0) percent = (total * 100) / osmoStaked
		if (percent === 0) return <span className={classes.percent}>{getPercent(percent)}</span>
		else if (percent > 0) return <span className={`${classes.percent} ${classes.up}`}>↑ {getPercent(percent)}</span>
		return <span className={`${classes.percent} ${classes.down}`}>↓ {getPercent(percent)}</span>
	}

	return (
		<div className={classes.rootStackingRewards}>
			<div className={classes.containerTitle}>
				<p className={classes.title}>Stacking Rewards</p>
				<ButtonCSV onClick={donwloadStacking} disabled={isLoading || data.length === 0}>
					.CSV
				</ButtonCSV>
			</div>
			<Paper className={classes.paper}>
				<BlocLoaderOsmosis open={isLoading} classNameLoading={classes.loading} />
				{data.length > 0 ? (
					<>
						<div className={classes.chartContainer}>
							<Chart data={data} />
						</div>
						<div className={classes.chartInfo}>
							<ButtonChart range={range} onChangeRange={onChangeRange} />
							<div className={classes.rowInfo}>
								<p className={classes.name}>Total staked</p>
								<p className={classes.value}>
									{formaterNumber(osmoStaked)} <span className={classes.token}>OSMO</span>
								</p>
							</div>
							<div className={classes.rowInfo}>
								<p className={classes.name}>Total reward</p>
								<p className={classes.value}>
									{formaterNumber(total)} <span className={classes.token}>OSMO</span>
								</p>
								<p className={classes.value}>{getPercentDisplay()}</p>
							</div>
						</div>
					</>
				) : (
					<p className={classes.textNotFound}>No data found.</p>
				)}
			</Paper>
		</div>
	)
}

export default StackingRewards
