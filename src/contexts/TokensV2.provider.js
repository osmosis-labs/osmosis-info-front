import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
import { getWeekNumber, timeToDateUTC } from "../helpers/helpers"
const TokensV2Context = createContext()

export const useTokensV2 = () => useContext(TokensV2Context)

export const TokensV2Provider = ({ children }) => {
	const [tokens, setTokens] = useState([])
	const saveDataChart = useRef({})
	const [loadingTokens, setLoadingTokens] = useState(true)
	const [loadingCharts, setLoadingCharts] = useState(true)
	const [loadingToken, setLoadingToken] = useState(true)

	const getName = (chartType, tf = "-", symbol = "-") => {
		return chartType + "-" + tf + "-" + symbol
	}

	const getLiquidityChartToken = useCallback(async ({ symbol, range = "d" }) => {
		setLoadingCharts(true)
		if (
			saveDataChart.current[getName("liquidity", range, symbol)] &&
			saveDataChart.current[getName("liquidity", range, symbol)].length > 0
		) {
			let data = saveDataChart.current[getName("liquidity", range, symbol)]
			setLoadingCharts(false)
			return data
		} else {
			let response = await API.request({
				url: `tokens/v2/liquidity/${symbol}/chart`,
				type: "get",
			})
			let data = response.data

			let dataW = []
			let currentWeek = { time: data[0].time, value: 0 }
			let dataM = []
			let currentMonth = { time: data[0].time, value: 0 }
			data.forEach((item) => {
				let currentDate = timeToDateUTC(item.time)
				let dateMonth = timeToDateUTC(currentMonth.time)
				if (currentDate.getMonth() === dateMonth.getMonth()) {
					currentMonth.value = item.value
				} else {
					dataM.push(currentMonth)
					currentMonth = { time: item.time, value: item.value }
				}
				let dateOfCurrentWeek = timeToDateUTC(currentWeek.time)
				let numberOfWeek = getWeekNumber(currentDate)
				let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
				if (numberOfWeek === numberOfWeekOfCurrentWeek) {
					currentWeek.value = item.value
				} else {
					dataW.push(currentWeek)
					currentWeek = { time: item.time, value: item.value }
				}
			})
			dataW.push(currentWeek)
			dataM.push(currentMonth)

			saveDataChart.current = { ...saveDataChart.current, [getName("liquidity", "d", symbol)]: data }
			saveDataChart.current = { ...saveDataChart.current, [getName("liquidity", "w", symbol)]: dataW }
			saveDataChart.current = { ...saveDataChart.current, [getName("liquidity", "m", symbol)]: dataM }
			setLoadingCharts(false)
			if (range === "d" ) return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	const getVolumeChartToken = useCallback(async ({ symbol, range = "d" }) => {
		setLoadingCharts(true)
		if (
			saveDataChart.current[getName("volume", range, symbol)] &&
			saveDataChart.current[getName("volume", range, symbol)].length > 0
		) {
			setLoadingCharts(false)
			return saveDataChart.current[getName("volume", range, symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v2/volume/${symbol}/chart`,
				type: "get",
			})
			let data = response.data

			let dataW = []
			let currentWeek = { time: data[0].time, value: 0 }
			let dataM = []
			let currentMonth = { time: data[0].time, value: 0 }
			data.forEach((item) => {
				let currentDate = timeToDateUTC(item.time)
				let dateMonth = timeToDateUTC(currentMonth.time)
				if (currentDate.getMonth() === dateMonth.getMonth()) {
					currentMonth.value += item.value
				} else {
					dataM.push(currentMonth)
					currentMonth = { time: item.time, value: item.value }
				}
				let dateOfCurrentWeek = timeToDateUTC(currentWeek.time)
				let numberOfWeek = getWeekNumber(currentDate)
				let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
				if (numberOfWeek === numberOfWeekOfCurrentWeek) {
					currentWeek.value += item.value
				} else {
					dataW.push(currentWeek)
					currentWeek = { time: item.time, value: item.value }
				}
			})
			dataW.push(currentWeek)
			dataM.push(currentMonth)
			saveDataChart.current = { ...saveDataChart.current, [getName("volume", "d", symbol)]: data }
			saveDataChart.current = { ...saveDataChart.current, [getName("volume", "w", symbol)]: dataW }
			saveDataChart.current = { ...saveDataChart.current, [getName("volume", "m", symbol)]: dataM }
			setLoadingCharts(false)
			if (range === "d" ) return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
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

	const getTokenData = useCallback(async (symbol) => {
		setLoadingToken(true)
		let response = await API.request({
			url: `tokens/v2/${symbol}`,
			type: "get",
		})
		let row = response.data[0]
		let token = {
			price: row.price,
			denom: row.denom,
			symbol: row.symbol,
			liquidity: row.liquidity,
			liquidity24hChange: row.liquidity_24h_change,
			volume24h: row.volume_24h,
			volume24hChange: row.volume_24h_change,
			name: row.name,
			price24hChange: row.price_24h_change,
		}
		setLoadingToken(false)
		return token
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
		<TokensV2Context.Provider
			value={{
				tokens,
				getVolumeChartToken,
				getLiquidityChartToken,
				getHistoricalChartToken,
				loadingTokens,
				getTokenData,
				loadingToken,
				loadingCharts,
			}}
		>
			{children}
		</TokensV2Context.Provider>
	)
}
