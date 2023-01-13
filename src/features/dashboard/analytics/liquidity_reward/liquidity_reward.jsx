import { makeStyles } from "@material-ui/core"
import { DataArray } from "@mui/icons-material"
import { useCallback, useEffect, useRef, useState } from "react"
import ButtonCSV from "../../../../components/button/button_csv"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import Paper from "../../../../components/paper/Paper"
import ChartSkeleton from "../../../../components/skeleton/chart_skeleton"
import CustomSkeleton from "../../../../components/skeleton/custom_skeleton"
import SwitchStyled from "../../../../components/switch/SwitchStyled"
import { useDebug } from "../../../../contexts/debug.provider"
import { useKeplr } from "../../../../contexts/KeplrProvider"
import { formatDate, formaterNumber, getPercent, twoNumber } from "../../../../helpers/helpers"
import { useBalance, useLiquidity, useLiquidityToken } from "../../../../hooks/data/dashboard.hook"
import ButtonChart from "../stacking_reward/button_chart"
import Chart from "../stacking_reward/chart"
import DailyReward from "./daily_reward"
import SelectToken from "./select_token"

const useStyles = makeStyles((theme) => {
	return {
		rootLiquidityReward: {
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
		chartSkeleton: { margin: "10px" },
	}
})
const LiquidityReward = () => {
	const classes = useStyles()
	const [currentToken, setCurrentToken] = useState({ symbol: "", symbolDisplay: "" })
	const [isAccumulated, setIsAccumulated] = useState(true)
	const { isLoadingDebug } = useDebug()

	const { address } = useKeplr()

	//Balance
	const { data: balance, isLoading: isLoadingBalance } = useBalance({ address })

	//Token Liquidity
	const { data: liquidityToken, isLoading: isLoadingLiquidityToken } = useLiquidityToken({ address })

	//Liquidity
	const {
		data: liquidity,
		isLoading: isLoadingLiquidity,
		isFetching: isFetchingLiquidity,
	} = useLiquidity({ address, symbol: currentToken.symbol, isAccumulated })

	//Merge loading
	const isLoading =
		isLoadingBalance || isLoadingLiquidityToken || isLoadingLiquidity || isFetchingLiquidity || isLoadingDebug

	const [data, setData] = useState([])
	const [total, setTotal] = useState(0)
	const [range, setRange] = useState("3m")
	const [tokens, setTokens] = useState([])
	const [currentBalance, setCurrentBalance] = useState({ value: 0, percent: 0, change: 0 })
	const [walletSaved, setWalletSaved] = useState({})
	const [currentItem, setCurrentItem] = useState({ time: "-", value: "-", dayValue: "-" })
	const refDailyReward = useRef(null)

	useEffect(() => {
		if (balance && liquidityToken.length > 0) {
			const { wallet } = balance
			let osmoToken = liquidityToken.find((token) => token.symbol === "OSMO")
			let firstToken = liquidityToken[0]
			if (osmoToken) {
				firstToken = osmoToken
			}
			getCurrentWallet(wallet, firstToken)
			setWalletSaved(wallet)
			setTokens(liquidityToken)
			setCurrentToken(firstToken)
		}
	}, [liquidityToken, balance])

	useEffect(() => {
		if (currentToken && liquidity) {
			let data = liquidity[range]
			setTotal(data.reduce((pr, cv) => pr + cv.dayValue, 0))
			setCurrentItem(formatItem(data[0]))
			setData((d) => data)
		}
	}, [currentToken, liquidity, range])

	useEffect(() => {
		if (refDailyReward.current && refDailyReward.current.updateItem) {
			if (currentToken && data) {
				refDailyReward.current.updateItem(formatItem(data[0]))
			}
		}
	}, [currentToken.symbol, data, range, refDailyReward.current, range, isAccumulated])

	const getCurrentWallet = (wallet, token) => {
		let currentWallet = wallet.find((item) => item.symbol === token.symbol)
		if (currentWallet) {
			let res = { value: 0, percent: 0, change: 0 }
			res.percent = currentWallet.valueChange
			res.value = currentWallet.value
			res.change = res.value * (res.percent / 100)

			setCurrentBalance(res)
		}
		return currentWallet
	}

	const onChangeRange = async (rge) => {
		setRange(rge)
	}

	const onChangeToken = async (tkn) => {
		getCurrentWallet(walletSaved, tkn)
		setCurrentToken((t) => tkn)
	}

	const getDiplayBalance = (balance) => {
		let percent = balance.percent
		if (percent === 0) return <span className={classes.percent}>{getPercent(percent)}</span>
		else if (percent > 0) return <span className={`${classes.percent} ${classes.up}`}>↑ {getPercent(percent)}</span>
		return <span className={`${classes.percent} ${classes.down}`}>↓ {getPercent(percent)}</span>
	}

	const donwloadStacking = () => {
		let dataDownload = [
			["time", "value", "token"],
			...data.map((d) => [
				`${d.time.year}-${twoNumber(d.time.month)}-${twoNumber(d.time.day)}`,
				d.dayValue,
				currentToken.symbolDisplay,
			]),
		]
		let csv = dataDownload.map((row) => row.join(",")).join("\n")
		let a = document.createElement("a")
		a.href = `data:attachment/csv,${encodeURIComponent(csv)}`
		a.target = "_blank"
		a.download = `liquidity_reward_${range}.csv`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	const formatItem = useCallback((item) => {
		let res = { time: "-", value: "-", dayValue: "-" }
		if (item) {
			let date = ""
			if (item.time && typeof item.time === "string") {
				date = new Date(item.time)
			} else {
				if (item.time.month === 0) {
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
		<div className={classes.rootLiquidityReward}>
			<div className={classes.containerTitle}>
				<p className={classes.title}>Liquidity Rewards</p>
				<ButtonCSV onClick={donwloadStacking} disabled={isLoading || data.length === 0}>
					.CSV
				</ButtonCSV>
			</div>
			<Paper className={classes.paper}>
				{data.length || isLoading > 0 ? (
					<>
						<div className={classes.chartContainer}>
							{isLoading ? (
								<ChartSkeleton className={classes.chartSkeleton} sx={{ margin: "0px" }} />
							) : (
								<Chart data={data} crossMove={crossMove} onMouseLeave={onMouseLeave} />
							)}
						</div>
						<div className={classes.chartInfo}>
							{isLoading ? (
								<CustomSkeleton
									height={50}
									width={120}
									sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
								/>
							) : (
								<ButtonChart range={range} onChangeRange={onChangeRange} />
							)}
							{isLoading ? (
								<CustomSkeleton
									height={50}
									width={120}
									sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
								/>
							) : (
								<SelectToken tokens={tokens} onChangeToken={onChangeToken} currentToken={currentToken} />
							)}
							<div className={classes.rowInfo}>
								<p className={classes.name}>{currentToken.symbolDisplay} Balance</p>
								{isLoading ? (
									<>
										<CustomSkeleton
											height={30}
											width={80}
											sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
										/>
										<CustomSkeleton
											height={30}
											width={80}
											sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
										/>
									</>
								) : (
									<>
										<p className={classes.value}>${formaterNumber(currentBalance.value)}</p>
										<p className={classes.value}>{getDiplayBalance(currentBalance)}</p>
									</>
								)}
							</div>
							<div className={classes.rowInfo}>
								<p className={classes.name}>Total reward</p>
								{isLoading ? (
									<CustomSkeleton
										height={30}
										width={100}
										sx={{ margin: "0px", padding: "0px", transformOrigin: "0 20% !important" }}
									/>
								) : (
									<p className={classes.value}>
										{formaterNumber(total)} <span className={classes.token}>{currentToken.symbolDisplay}</span>
									</p>
								)}
							</div>
							<DailyReward currentToken={currentToken} ref={refDailyReward} isLoading={isLoading} />
							<div className={classes.toggle}>
								<SwitchStyled size="small" checked={isAccumulated} onChange={toggleAccumulated} />
								<p className={classes.name}>Accumulated values</p>
							</div>
						</div>
					</>
				) : (
					<>
						<div className={classes.chartContainer}>
							<p className={classes.textNotFound}>No data found.</p>
						</div>
						<div className={classes.chartInfo}>
							<SelectToken tokens={tokens} onChangeToken={onChangeToken} currentToken={currentToken} />
						</div>
					</>
				)}
			</Paper>
		</div>
	)
}

export default LiquidityReward
