import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import { usePrices } from "../../../../contexts/PricesProvider"
import { formateNumberDecimalsAuto, formaterNumber, getPercent } from "../../../../helpers/helpers"
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
			marginBottom: "20px",
		},
		paper: {
			display: "grid",
			gridTemplateColumns: "3fr 1.5fr",
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
	const [osmosStacked, setOsmosStacted] = useState(0)

	useEffect(() => {
		const fetch = async () => {
			let promises = [
				getChartStacking({ address: address, range }),
				getWalletInfo({ address }),
			]
			let results = await Promise.all(promises)
			let data = await results[0]
			let { balance } = await results[1]
			setOsmosStacted(balance.osmo_staked)
			setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
			setData(data)
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

	const getPercentDisplay = () => {
		let percent = 0
		if (osmosStacked > 0) percent = (total * 100) / osmosStacked
		if (percent === 0) return <span className={classes.percent}>{getPercent(percent)}</span>
		else if (percent > 0) return <span className={`${classes.percent} ${classes.up}`}>↑ {getPercent(percent)}</span>
		return <span className={`${classes.percent} ${classes.down}`}>↓ {getPercent(percent)}</span>
	}

	return (
		<div className={classes.rootStackingRewards}>
			<p className={classes.title}>Stacking Rewards</p>
			<Paper className={classes.paper}>
				<div className={classes.chartContainer}>
					<Chart data={data}/>
				</div>
				<div className={classes.chartInfo}>
					<ButtonChart range={range} onChangeRange={onChangeRange} />
					<div className={classes.rowInfo}>
						<p className={classes.name}>Total stacked</p>
						<p className={classes.value}>
							{formaterNumber(osmosStacked)} <span className={classes.token}>OSMO</span>
						</p>
					</div>
					<div className={classes.rowInfo}>
						<p className={classes.name}>Total reward</p>
						<p className={classes.value}>
							{formaterNumber(total)} <span className={classes.token}>OSMO</span>
							{getPercentDisplay()}
						</p>
					</div>
				</div>
			</Paper>
		</div>
	)
}

export default StackingRewards
