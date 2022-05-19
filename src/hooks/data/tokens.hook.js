import { useQuery } from "react-query"
import { useSettings } from "../../contexts/SettingsProvider"
import { defaultToken, defaultTokens, formatToken, formatTokens } from "../../formaters/tokens.formatter"
import useRequest from "../request.hook"
/*

getTrxToken,
getVolumeChartToken,
getLiquidityChartToken,
getHistoricalChartToken,
*/

export const useTokens = () => {
	const request = useRequest()
	const { settings } = useSettings()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/all`,
			method: "GET",
		})
		return formatTokens(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["tokens", {}], getter, {})
	if (data) {
		if (settings.type === "app") {
			data.current = data.main
		} else {
			data.current = data.frontier
		}
	}
	const tokens = data ? data : defaultTokens

	return { data: tokens, isLoading, isFetching }
}

export const useToken = ({ symbol }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { symbol }] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/${symbol}`,
			method: "GET",
		})
		return formatToken(response.data[0])
	}

	const { data, isLoading, isFetching } = useQuery(["token", { symbol }], getter, {
		enabled: !!symbol,
	})

	const tokens = data ? data : defaultToken

	return { data: tokens, isLoading, isFetching }
}

export const useTrxToken = () => {}

export const useVolumeToken = () => {}
export const useLiquidityToken = () => {}
export const useHistoricalToken = () => {}
