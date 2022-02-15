import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
import { getWeekNumber, timeToDateUTC } from "../helpers/helpers"
const TokensContext = createContext()

export const useTokens = () => useContext(TokensContext)

export const TokensProvider = ({ children }) => {
	const [tokens, setTokens] = useState([])
	const [loadingTokens, setLoadingTokens] = useState(false)
	const [loadingToken, setLoadingToken] = useState(false)
	const [loadingChartToken, setLoadingChartToken] = useState(false)
	const [loadingLiquidityToken, setLoadingLiquidityToken] = useState(false)
	const [loadingVolumeToken, setLoadingVolumeToken] = useState(false)

	const saveDataChart = useRef({})

	const getName = (chartType, range = "-", symbol = "-") => {
		return chartType + "-" + range + "-" + symbol
	}

	const getTokenData = useCallback(async (symbol) => {
		setLoadingToken(true)
		let response = await API.request({
			url: `tokens/v1/${symbol}`,
			type: "get",
		})
		let row = response.data[0]
		let token = {
			denom: row.denom,
			name: row.name,
			symbol: row.symbol,
			liquidity: row.liquidity,
			price: row.price,
			volume_24h: row.volume_24h,
		}
		setLoadingToken(false)
		return token
	}, [])

	const getChartToken = useCallback(async ({ symbol, range = "7d" }) => {
		setLoadingChartToken(true)
		if (range === "all") range = "50y"
		if (
			saveDataChart.current[getName("price", range, symbol)] &&
			saveDataChart.current[getName("price", range, symbol)].length > 0
		) {
			setLoadingChartToken(false)
			return saveDataChart.current[getName("price", range, symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v1/historical/${symbol}/chart?range=${range}`,
				type: "get",
			})
			saveDataChart.current = { ...saveDataChart.current, [getName("price", range, symbol)]: response.data }
			setLoadingChartToken(false)
			return response.data
		}
	}, [])

	const getLiquidityChartToken = useCallback(async ({ symbol, range = "d" }) => {
		setLoadingLiquidityToken(true)
		if (
			saveDataChart.current[getName("liquidity", range, symbol)] &&
			saveDataChart.current[getName("liquidity", range, symbol)].length > 0
		) {
			setLoadingLiquidityToken(false)
			return saveDataChart.current[getName("liquidity", range, symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v1/liquidity/${symbol}/chart`,
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
			setLoadingLiquidityToken(false)
			if (range === "d") return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	const getVolumeChartToken = useCallback(async ({ symbol, range = "d" }) => {
		setLoadingVolumeToken(true)
		if (
			saveDataChart.current[getName("volume", range, symbol)] &&
			saveDataChart.current[getName("volume", range, symbol)].length > 0
		) {
			setLoadingVolumeToken(false)
			return saveDataChart.current[getName("volume", range, symbol)]
		} else {
			let response = await API.request({
				url: `tokens/v1/volume/${symbol}/chart`,
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
			setLoadingVolumeToken(false)
			if (range === "d") return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	useEffect(() => {
		let fetch = async () => {
			// get all tokens from server API
			setLoadingTokens(true)
			let response = await API.request({ url: "tokens/v1/all", type: "get" })
			response.data.sort((a, b) => {
				if (a.liquidity > b.liquidity) return -1
				if (a.liquidity < b.liquidity) return 1
				return 0
			})
			setLoadingTokens(false)
			setTokens(
				response.data.map((row, index) => {
					return {
						id: index + 1,
						denom: row.denom,
						name: row.name,
						symbol: row.symbol,
						liquidity: row.liquidity,
						price: row.price,
						volume_24h: row.volume_24h,
					}
				})
			)
		}
		fetch()
	}, [])

	return (
		<TokensContext.Provider
			value={{
				tokens,
				getTokenData,
				getChartToken,
				getLiquidityChartToken,
				getVolumeChartToken,
				loadingTokens,
				loadingToken,
				loadingChartToken,
				loadingLiquidityToken,
				loadingVolumeToken,
			}}
		>
			{children}
		</TokensContext.Provider>
	)
}
