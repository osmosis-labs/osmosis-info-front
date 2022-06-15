import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useRef, useState } from "react"
import ButtonCSV from "../../../../components/button/button_csv"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import Paper from "../../../../components/paper/Paper"
import { useKeplr } from "../../../../contexts/KeplrProvider"
import { formatDate, formaterNumber, getPercent, twoNumber } from "../../../../helpers/helpers"
import { useBalance, useChartStaking } from "../../../../hooks/data/dashboard.hook"
import ButtonChart from "./button_chart"
import Chart from "./chart"
import SwitchStyled from "../../../../components/switch/SwitchStyled"
import DailyReward from "./daily_reward"
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
			height: "380px",
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
		toggle: {
			marginTop: "4px",
			display: "flex",
			alignItems: "center",
		},
	}
})
const StackingRewards = () => {
	const classes = useStyles()
	const { address } = useKeplr()

	const [isAccumulated, setIsAccumulated] = useState(true)

	const { data: balance, isLoading: isLoadingBalance } = useBalance({ address })

	const { data: chartStaking, isLoading: isLoadingStaking } = useChartStaking({
		address,
		isAccumulated,
	})

	const isLoading = isLoadingBalance || isLoadingStaking

	const [data, setData] = useState([])
	const [total, setTotal] = useState(0)
	const [range, setRange] = useState("3m")
	const [osmoStaked, setOsmoStaked] = useState(0)
	const [osmoReward, setOsmoReward] = useState(0)
	const [currentItem, setCurrentItem] = useState({ time: "-", value: "-" })
	const refDailyReward = useRef(null)

	useEffect(() => {
		if (chartStaking) {
			let currentData = chartStaking[range]
			setTotal(
				currentData.reduce((pr, cv) => {
					return pr + cv.dayValue
				}, 0)
			)
			setCurrentItem((i) => formatItem(currentData[0]))
			setData((c) => currentData)
		}
	}, [chartStaking])

	useEffect(() => {
		if (refDailyReward.current && refDailyReward.current.updateItem) {
			if (data) {
				refDailyReward.current.updateItem(formatItem(data[0]))
			}
		}
	}, [data, refDailyReward.current, isAccumulated])

	useEffect(() => {
		if (balance) {
			setOsmoStaked(balance.osmoStaked)
			setOsmoReward(balance.osmoReward)
		}
	}, [balance])

	const onChangeRange = async (rge) => {
		setRange(rge)
		let currentData = chartStaking[rge]
		setTotal(currentData.reduce((pr, cv) => pr + cv.dayValue, 0))
		setData(currentData)
	}

	const donwloadStacking = () => {
		let dataDownload = [
			["time", "value", "token"],
			...data.map((d) => [`${d.time.year}-${twoNumber(d.time.month)}-${twoNumber(d.time.day)}`, d.dayValue, "OSMO"]),
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

	const formatItem = useCallback((item) => {
		let res = { time: "-", value: "-", dayValue: "-" }
		if (item) {
			let date = ""
			if (item.time && typeof item.time === "string") {
				date = new Date(item.time)
			} else {
				if (item.time.month === 1) {
					date = new Date(item.time.year - 1, 11, item.time.day)
				} else {
					date = new Date(item.time.year, item.time.month - 1, item.time.day)
				}
			}
			res.time = formatDate(date)
			res.value = formaterNumber(item.value)
			res.dayValue = formaterNumber(item.dayValue)
		}
		return res
	}, [])

	const getItemByTime = useCallback(
		(time) => {
			if (time) {
				let item = data.find(
					(item) => item.time.year === time.year && item.time.month === time.month && item.time.day === time.day
				)
				return item
			}
			return null
		},
		[data]
	)

	const crossMove = useCallback(
		({ time }) => {
			if (refDailyReward.current && refDailyReward.current.updateItem) {
				if (time) {
					let formatedItem = formatItem(getItemByTime(time))
					if (currentItem.time !== formatedItem.time) {
						refDailyReward.current.updateItem(formatedItem)
					}
				}
			}
		},
		[currentItem, getItemByTime, refDailyReward]
	)

	const onMouseLeave = () => {
		setCurrentItem(formatItem(data[0]))
	}

	const toggleAccumulated = () => {
		setIsAccumulated(!isAccumulated)
	}
	return (
		<div className={classes.rootStackingRewards}>
			<div className={classes.containerTitle}>
				<p className={classes.title}>Staking Rewards</p>
				<ButtonCSV onClick={donwloadStacking} disabled={isLoading || data.length === 0}>
					.CSV
				</ButtonCSV>
			</div>
			<Paper className={classes.paper}>
				<BlocLoaderOsmosis open={isLoading} classNameLoading={classes.loading} />
				{data.length > 0 ? (
					<>
						<div className={classes.chartContainer}>
							<Chart data={data} crossMove={crossMove} onMouseLeave={onMouseLeave} />
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
							<div className={classes.rowInfo}>
								<p className={classes.name}>Pending reward</p>
								<p className={classes.value}>
									{formaterNumber(osmoReward)} <span className={classes.token}>OSMO</span>
								</p>
							</div>
							<div className={classes.rowInfo}>
								<p className={classes.name}>Current reward</p>
								<p className={classes.name}>{currentItem.time}</p>
								<p className={classes.value}>
									{currentItem.value} <span className={classes.token}>OSMO</span>
								</p>
							</div>
							<DailyReward ref={refDailyReward} />

							<div className={classes.toggle}>
								<SwitchStyled size="small" checked={isAccumulated} onChange={toggleAccumulated} />
								<p className={classes.name}>Accumulated values</p>
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
