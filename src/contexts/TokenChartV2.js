import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
const TokenChartV2Context = createContext()

export const useTokenChartV2 = () => useContext(TokenChartV2Context)

export const TokenChartV2Provider = ({ children }) => {
	const [tokens, setTokens] = useState([])
	const saveDataChart = useRef({})
	const [loadingTokens, setLoadingTokens] = useState(true)
	const [loadingCharts, setLoadingCharts] = useState(true)

	const getName = (chartType, tf = "-", symbol = "-") => {
		return chartType + "-" + tf + "-" + symbol
	}

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
		if (
			saveDataChart.current[getName("historical", tf, symbol)] &&
			saveDataChart.current[getName("historical", tf, symbol)].length > 0
		) {
			setLoadingCharts(false)
			return saveDataChart.current[getName("historical", tf, symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v2/historical/${symbol}/chart?tf=${tf}`,
				type: "get",
			})
			let data = response.data
			setLoadingCharts(false)

			return data
		}
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
			}}
		>
			{children}
		</TokenChartV2Context.Provider>
	)
}
