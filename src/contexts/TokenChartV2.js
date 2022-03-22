import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
const TokenChartV2Context = createContext()

export const useTokenChartV2 = () => useContext(TokenChartV2Context)

export const TokenChartV2Provider = ({ children }) => {
	const [tokens, setTokens] = useState([])
	const saveDataChart = useRef({})
	const [loadingTokens, setLoadingTokens] = useState(true)
	const [loadingCharts, setLoadingCharts] = useState(true)
	const [loadingTrx, setLoadingTrx] = useState(true)

	const getName = (chartType, tf = "-", symbol = "-") => {
		return chartType + "-" + tf + "-" + symbol
	}

	const getTrxToken = useCallback(async ({ symbol, limit = 10, offset = 0 }) => {
		setLoadingTrx(true)
		let data = []
		if (
			saveDataChart.current[getName("trx", symbol)] &&
			saveDataChart.current[getName("trx", symbol, limit, offset)].length > 0
		) {
			data = saveDataChart.current[getName("trx", symbol, limit, offset)]
			return data
		} else {
			let response = await API.request({
				url: `https://api-osmosis-chain.imperator.co/swap/v1/token/${symbol}?only_success=true&limit=${limit}&offset=${offset}`,
				type: "get",
				useCompleteURL: true,
			})
			data = response.data.map((trx) => {
				let time = new Date(trx.time_tx)
				let options = { month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }
				let timeDisplay = new Intl.DateTimeFormat("en-US", options).format(time)

				return {
					type: trx.symbol_out === symbol ? "Buy" : "Sell",
					time: { value: time, display: timeDisplay },
					hash: { value: trx.tx_hash, display: trx.tx_hash },
					address: { value: trx.address, display: trx.address },
					tokenIn: { value: trx.amount_in, symbol: trx.symbol_in },
					tokenOut: { value: trx.amount_out, symbol: trx.symbol_out },
				}
			})
			saveDataChart.current = { ...saveDataChart.current, [getName("trx", symbol, limit, offset)]: data }
		}
		setLoadingTrx(false)
		return data
	})

	const getVolumeChartToken = useCallback(async ({ symbol }) => {
		setLoadingCharts(true)
		if (
			saveDataChart.current[getName("volume", symbol)] &&
			saveDataChart.current[getName("volume", symbol)].length > 0
		) {
			setLoadingCharts(false)
			return saveDataChart.current[getName("volume", symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v2/volume/${symbol}/chart`,
				type: "get",
			})
			let data = response.data

			setLoadingCharts(false)
			return data
		}
	}, [])

	const getLiquidityChartToken = useCallback(async ({ symbol }) => {
		setLoadingCharts(true)
		if (
			saveDataChart.current[getName("liquidity", symbol)] &&
			saveDataChart.current[getName("liquidity", symbol)].length > 0
		) {
			setLoadingCharts(false)
			return saveDataChart.current[getName("liquidity", symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v2/liquidity/${symbol}/chart`,
				type: "get",
			})
			let data = response.data
			setLoadingCharts(false)

			return data
		}
	}, [])

	const getHistoricalChartToken = useCallback(async ({ symbol, tf = "5" }) => {
		setLoadingCharts(true)
		let data = []
		if (
			saveDataChart.current[getName("historical", tf, symbol)] &&
			saveDataChart.current[getName("historical", tf, symbol)].length > 0
		) {
			setLoadingCharts(false)
			data = saveDataChart.current[getName("historical", tf, symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v2/historical/${symbol}/chart?tf=${tf}`,
				type: "get",
			})

			data = response.data
			setLoadingCharts(false)
		}
		return data
	}, [])

	useEffect(() => {
		let fetch = async () => {
			setLoadingTokens(true)
			let response = await API.request({ url: "tokens/v2/all", type: "get" })
			response.data.sort((a, b) => {
				if (a.liquidity > b.liquidity) return -1
				if (a.liquidity < b.liquidity) return 1
				return 0
			})
			setTokens(
				response.data.map((row, index) => {
					return {
						id: index + 1,
						denom: row.denom,
						price: row.price,
						symbol: row.symbol,
						liquidity: row.liquidity,
						liquidity24hChange: row.liquidity_24h_change,
						volume24h: row.volume_24h,
						volume24hChange: row.volume_24h_change,
						name: row.name,
						price24hChange: row.price_24h_change,
					}
				})
			)
			setLoadingTokens(false)
		}
		fetch()
	}, [])

	return (
		<TokenChartV2Context.Provider
			value={{
				tokens,
				getVolumeChartToken,
				getLiquidityChartToken,
				getHistoricalChartToken,
				loadingTokens,
				getTrxToken,
				loadingTrx,
			}}
		>
			{children}
		</TokenChartV2Context.Provider>
	)
}
