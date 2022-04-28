import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import { usePrices } from "../../../../contexts/PricesProvider"
import { formateNumberDecimalsAuto, formaterNumber, getPercent } from "../../../../helpers/helpers"
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
const LiquidityReward = () => {
	const classes = useStyles()
	const { address, getLiquidity, getLiquidityToken, getWalletInfo } = useDashboard()
	const [data, setData] = useState([])
	const [total, setTotal] = useState(0)
	const [range, setRange] = useState("all")
	const [currentToken, setCurrentToken] = useState("")
	const [tokens, setTokens] = useState([])
	const [currentBalance, setCurrentBalance] = useState({ value: 0, percent: 0, change: 0 })

	useEffect(() => {
		const fetch = async () => {
			let promises = [getLiquidityToken({ address }), getWalletInfo({ address })]
			let results = await Promise.all(promises)
			let tokens = results[0]
			let {
				balance: { wallet },
			} = results[1]
			getCurrentWallet(wallet, tokens[0])
			setTokens(tokens)
			if (tokens.length > 0) {
				setCurrentToken(tokens[0])
				let data = await getLiquidity({ address, range, token: tokens[0] })
				setTotal(data.reduce((pr, cv) => pr + cv.value, 0))

				setData([...data])
			}
		}
		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	const getCurrentWallet = (wallet, token) => {
		let currentWallet = wallet.find((item) => item.symbol === token)
		if (currentWallet) {
			let res = { value: 0, percent: 0, change: 0 }
			res.percent = currentWallet.value_change
			res.value = currentWallet.value
			res.change = res.value * (res.percent / 100)

			setCurrentBalance(res)
		}
		return currentWallet
	}

	const onChangeRange = async (rge) => {
		setRange(rge)
		let data = await getLiquidity({ address, range: rge, token: currentToken })
		setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
		setData([...data])
	}

	const onChangeToken = async (tkn) => {
		setCurrentToken(tkn)
		let data = await getLiquidity({ address, range, token: tkn })
		setTotal(data.reduce((pr, cv) => pr + cv.value, 0))
		setData([...data])
	}

	const getDiplayBalance = (balance) => {
		let percent = balance.percent
		if (percent === 0)
			return (
				<span className={classes.percent}>
					{getPercent(percent)} (${formateNumberDecimalsAuto({ price: balance.change })})
				</span>
			)
		else if (percent > 0)
			return (
				<span className={`${classes.percent} ${classes.up}`}>
					↑ {getPercent(percent)} (${formateNumberDecimalsAuto({ price: balance.change })})
				</span>
			)
		return (
			<span className={`${classes.percent} ${classes.down}`}>
				↓ {getPercent(percent)} (${formateNumberDecimalsAuto({ price: balance.change })})
			</span>
		)
	}

	return (
		<div className={classes.rootLiquidityReward}>
			<p className={classes.title}>Stacking Rewards</p>
			<Paper className={classes.paper}>
				<div className={classes.chartContainer}>
					<Chart data={data} />
				</div>
				<div className={classes.chartInfo}>
					<ButtonChart range={range} onChangeRange={onChangeRange} />
					<SelectToken tokens={tokens} onChangeToken={onChangeToken} currentToken={currentToken} />
					<div className={classes.rowInfo}>
						<p className={classes.name}>{currentToken} Balance</p>
						<p className={classes.value}>${formaterNumber(currentBalance.value)}</p>
						<p className={classes.value}>{getDiplayBalance(currentBalance)}</p>
					</div>
					<div className={classes.rowInfo}>
						<p className={classes.name}>Total reward</p>
						<p className={classes.value}>
							{formaterNumber(total)} <span className={classes.token}>{currentToken}</span>
						</p>
					</div>
				</div>
			</Paper>
		</div>
	)
}

export default LiquidityReward
