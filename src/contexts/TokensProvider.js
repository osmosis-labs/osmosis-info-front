import { createContext, useCallback, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
import { getWeekNumber } from "../helpers/helpers"
const TokensContext = createContext()

export const useTokens = () => useContext(TokensContext)

export const TokensProvider = ({ children }) => {
	const [tokens, setTokens] = useState([])
	const [loadingTokens, setLoadingTokens] = useState(false)
	const [loadingToken, setLoadingToken] = useState(false)
	const [loadingChartToken, setLoadingChartToken] = useState(false)
	const [loadingLiquidityToken, setLoadingLiquidityToken] = useState(false)
	const [loadingVolumeToken, setLoadingVolumeToken] = useState(false)

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

	const getChartToken = useCallback(async ({ symbol, range }) => {
		setLoadingChartToken(true)
		if (range === "all") range = "50y"
		let response = await API.request({
			url: `tokens/v1/historical/${symbol}/chart?range=${range}`,
			type: "get",
		})
		setLoadingChartToken(false)
		return response.data
	}, [])

	const getLiquidityChartToken = useCallback(async ({ symbol }) => {
		setLoadingLiquidityToken(true)
		let response = await API.request({
			url: `tokens/v1/liquidity/${symbol}/chart`,
			type: "get",
		})
		setLoadingLiquidityToken(false)
		return response.data
	}, [])

	const getVolumeChartToken = useCallback(async ({ symbol, range = "d" }) => {
		setLoadingVolumeToken(true)
		let response = await API.request({
			url: `tokens/v1/volume/${symbol}/chart`,
			type: "get",
		})
		let res = response.data
		if (range === "m") {
			let resMonth = []
			let current = { time: res[0].time, value: 0 }
			res.forEach((item) => {
				if (new Date(item.time).getMonth() === new Date(current.time).getMonth()) {
					current.value += item.value
				} else {
					resMonth.push(current)
					current = { time: item.time, value: item.value }
				}
			})
			resMonth.push(current)
			res = resMonth
		} else if (range === "w") {
			let resWeek = []
			let current = { time: res[0].time, value: 0 }
			res.forEach((item) => {
				let currentDate = new Date(item.time)
				let dateOfCurrentWeek = new Date(current.time)
				let numberOfWeek = getWeekNumber(currentDate)
				let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
				if (numberOfWeek === numberOfWeekOfCurrentWeek) {
					current.value += item.value
				} else {
					resWeek.push(current)
					current = { time: item.time, value: item.value }
				}
			})
			resWeek.push(current)
			res = resWeek
		}
		setLoadingVolumeToken(false)
		return res
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
