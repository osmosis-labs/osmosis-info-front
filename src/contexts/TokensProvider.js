import { createContext, useCallback, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
const TokensContext = createContext()

export const useTokens = () => useContext(TokensContext)

export const TokensProvider = ({ children }) => {
	const [tokens, setTokens] = useState([])
	const [loadingTokens, setLoadingTokens] = useState(false)

	const getTokenData = useCallback(async (symbol) => {
		setLoadingTokens(true)
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
		setLoadingTokens(false)
		return token
	}, [])

	const getChartToken = useCallback(async ({ symbol, range }) => {
		setLoadingTokens(true)
		if (range === "all") range = "50y"
		let response = await API.request({
			url: `tokens/v1/historical/${symbol}/chart?range=${range}`,
			type: "get",
		})
		setLoadingTokens(false)
		return response.data
	}, [])

	const getLiquidityChartToken = useCallback(async ({ symbol }) => {
		setLoadingTokens(true)
		let response = await API.request({
			url: `tokens/v1/liquidity/${symbol}/chart`,
			type: "get",
		})
		setLoadingTokens(false)
		return response.data
	}, [])

	const getVolumeChartToken = useCallback(async ({ symbol }) => {
		setLoadingTokens(true)
		let response = await API.request({
			url: `tokens/v1/volume/${symbol}/chart`,
			type: "get",
		})
		setLoadingTokens(false)
		return response.data
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
				loadingTokens,
				tokens,
				getTokenData,
				getChartToken,
				getLiquidityChartToken,
				getVolumeChartToken,
			}}
		>
			{children}
		</TokensContext.Provider>
	)
}
