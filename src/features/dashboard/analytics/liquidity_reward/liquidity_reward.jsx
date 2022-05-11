import { makeStyles } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import ButtonCSV from "../../../../components/button/button_csv"
import BlocLoaderOsmosis from "../../../../components/loader/BlocLoaderOsmosis"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import { usePrices } from "../../../../contexts/PricesProvider"
import {
	formatDate,
	formateNumberDecimalsAuto,
	formaterNumber,
	getPercent,
	twoNumber,
} from "../../../../helpers/helpers"
import ButtonChart from "../stacking_reward/button_chart"
import Chart from "../stacking_reward/chart"
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
const LiquidityReward = () => {
	const classes = useStyles()
	const { address, getLiquidity, getLiquidityToken, getWalletInfo } = useDashboard()
	const [data, setData] = useState([])
	const [total, setTotal] = useState(0)
	const [range, setRange] = useState("3m")
	const [currentToken, setCurrentToken] = useState({symbol: "", symbolDisplay: ""})
	const [tokens, setTokens] = useState([])
	const [currentBalance, setCurrentBalance] = useState({ value: 0, percent: 0, change: 0 })
	const [isLoading, setIsLoading] = useState(false)
	const [walletSaved, setWalletSaved] = useState({})
	const [currentItem, setCurrentItem] = useState({ time: "-", value: "-", dayValue: "-" })

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true)
			let promises = [getLiquidityToken({ address }), getWalletInfo({ address })]
			let results = await Promise.all(promises)
			let tokens = results[0]
			let {
				balance: { wallet },
			} = results[1]
			let osmoToken = tokens.find((token) => token.symbol === "OSMO")

			let firstToken = tokens[0]
			if (osmoToken) {
				firstToken = osmoToken
			}
			getCurrentWallet(wallet, firstToken)
			setTokens(tokens)
			if (tokens.length > 0) {
				setCurrentToken(firstToken)
				let data = await getLiquidity({ address, range, token: firstToken.symbol })
				setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
				setCurrentItem(formatItem(data[0]))
				setData([...data])
			}
			setWalletSaved(wallet)
			setIsLoading(false)
		}
		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

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
		setIsLoading(true)
		setRange(rge)
		let data = await getLiquidity({ address, range: rge, token: currentToken.symbol })
		setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
		setCurrentItem(formatItem(data[0]))
		setData([...data])
		setIsLoading(false)
	}

	const onChangeToken = async (tkn) => {
		setIsLoading(true)
		let data = await getLiquidity({ address, range, token: tkn.symbol })
		getCurrentWallet(walletSaved, tkn)
		setCurrentToken(tkn)
		setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
		setCurrentItem(formatItem(data[0]))
		setData([...data])
		setIsLoading(false)
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

	const formatItem = (item) => {
		let res = { time: "-", value: "-", dayValue: "-" }
		if (item) {
			let date = ""
			if (item.time && typeof item.time === "string") {
				date = new Date(item.time)
			} else {
				date = new Date(item.time.year, item.time.month, item.time.day)
			}
			res.time = formatDate(date)
			res.value = formaterNumber(item.value)
			res.dayValue = formaterNumber(item.dayValue)
		}
		return res
	}

	const getItemByTime = (time) => {
		if (time) {
			let item = data.find(
				(item) => item.time.year === time.year && item.time.month === time.month && item.time.day === time.day
			)
			return item
		}
		return null
	}

	const crossMove = ({ time }) => {
		if (time) {
			let formatedItem = formatItem(getItemByTime(time))
			if (currentItem.time !== formatedItem.time) {
				setCurrentItem(formatItem(getItemByTime(time)))
			}
		}
	}

	const onMouseLeave = () => {
		setCurrentItem(formatItem(data[0]))
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
				<BlocLoaderOsmosis open={isLoading} classNameLoading={classes.loading} />
				{data.length > 0 ? (
					<>
						<div className={classes.chartContainer}>
							<Chart data={data} crossMove={crossMove} onMouseLeave={onMouseLeave} />
						</div>
						<div className={classes.chartInfo}>
							<ButtonChart range={range} onChangeRange={onChangeRange} />
							<SelectToken tokens={tokens} onChangeToken={onChangeToken} currentToken={currentToken} />
							<div className={classes.rowInfo}>
								<p className={classes.name}>{currentToken.symbolDisplay} Balance</p>
								<p className={classes.value}>${formaterNumber(currentBalance.value)}</p>
								<p className={classes.value}>{getDiplayBalance(currentBalance)}</p>
							</div>
							<div className={classes.rowInfo}>
								<p className={classes.name}>Total reward</p>
								<p className={classes.value}>
									{formaterNumber(total)} <span className={classes.token}>{currentToken.symbolDisplay}</span>
								</p>
							</div>
							<div className={classes.rowInfo}>
								<p className={classes.name}>Daily reward</p>
								<p className={classes.name}>{currentItem.time}</p>
								<p className={classes.value}>
									{currentItem.dayValue} <span className={classes.token}>{currentToken.symbolDisplay}</span>
								</p>
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

export default LiquidityReward
