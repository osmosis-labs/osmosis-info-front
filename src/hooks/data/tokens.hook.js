import { useInfiniteQuery, useQuery } from "react-query"
import { useSettings } from "../../contexts/SettingsProvider"
import {
	defaultHistoricalToken,
	defaultLiquidityToken,
	defaultMCap,
	defaultToken,
	defaultTokens,
	defaultTrxToken,
	defaultVolumeToken,
	formatHistoricalToken,
	formatLiquidityToken,
	formatToken,
	formatTokens,
	formatTrxToken,
	formatVolumeToken,
} from "../../formaters/tokens.formatter"
import useRequest from "../request.hook"
import { useAssets } from "./assets.hook"
import { useDebug } from "../../contexts/debug.provider"

const API_URL = process.env.REACT_APP_API_URL
const CHAIN_API_URL = process.env.REACT_APP_CHAIN_API_URL

export const useMCapTokens = () => {
	const request = useRequest()
	const {
		mcapError,
	} = useDebug()
	const getter = async ({ queryKey }) => {
		const [_, { }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/mcap`,
			method: "GET",
		})
		return mcapError ? { "message": "An error occured" } : response.data
	}

	const { data, isLoading, isFetching } = useQuery(["mcap-tokens", mcapError, {}], getter, {})
	let mcaps = defaultMCap
	if (data && Array.isArray(data)) mcaps = data

	return { data: mcaps, isLoading, isFetching }
}

export const useTokens = () => {
	const request = useRequest()
	const { settings } = useSettings()

	const { data: mcap, isFetching: isFetchingMCap, isLoading: isLoadingMCap } = useMCapTokens()
	const { data: assets, isFetching: isFetchingAssets, isLoading: isLoadingAssets } = useAssets()
	const getter = async ({ queryKey }) => {
		const [_, { }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/all`,
			method: "GET",
		})
		return formatTokens(response.data, mcap, assets)
	}

	const { data, isLoading, isFetching } = useQuery(["tokens", { mcap, assets }], getter, {
		enabled: !!assets["OSMO"]
	})
	if (data) {
		if (settings.type === "app") {
			data.current = data.main
		} else {
			data.current = data.frontier
		}
	}
	const tokens = data ? data : defaultTokens

	return { data: tokens, isLoading: isLoading || isLoadingMCap || isLoadingAssets, isFetching: isFetching || isFetchingMCap || isFetchingAssets }
}

export const useToken = ({ symbol }) => {
	const request = useRequest()

	const { data: mcap, isFetching: isFetchingMCap, isLoading: isLoadingMCap } = useMCapTokens()
	const { data: assets, isFetching: isFetchingAssets, isLoading: isLoadingAssets } = useAssets()

	const getter = async ({ queryKey }) => {
		const [_, { symbol }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/${symbol}`,
			method: "GET",
		})
		return formatToken(response.data[0], mcap, assets)
	}

	const { data, isLoading, isFetching } = useQuery(["token", { symbol, mcap, assets }], getter, {
		enabled: !!assets["OSMO"]
	})

	let token = data ? data : defaultToken

	return { data: token, isLoading: isLoading || isLoadingMCap || isLoadingAssets, isFetching: isFetching || isFetchingMCap || isFetchingAssets }
}

export const useTrxToken = ({ symbol, limit = 10 }) => {
	const request = useRequest()
	const { data: assets } = useAssets()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { symbol, limit }] = queryKey
		let url = `${CHAIN_API_URL}/swap/v1/token/${symbol}?only_success=true&limit=${limit}&offset=${pageParam}`

		const response = await request({
			url,
			method: "GET",
		})
		return formatTrxToken(response.data, symbol, assets)
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trxsTokens", { symbol, limit }], getter, {
		enabled: !!symbol && !!assets.OSMO,
		getNextPageParam: (_, allPages) => {
			let nextPage = allPages.length * 10
			return nextPage
		},
	})

	const trxs = data && data.pages ? data.pages.flat() : defaultTrxToken

	return { data: trxs, isLoading, isFetching, fetchNextPage }
}

export const useVolumeToken = ({ symbol }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { symbol }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/volume/${symbol}/chart`,
			method: "GET",
		})
		return formatVolumeToken(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["tokenVolume", { symbol }], getter, {
		enabled: !!symbol,
	})

	const tokens = data ? data : defaultVolumeToken

	return { data: tokens, isLoading, isFetching }
}

export const useLiquidityToken = ({ symbol }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { symbol }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/liquidity/${symbol}/chart`,
			method: "GET",
		})
		return formatLiquidityToken(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["tokenLiquidity", { symbol }], getter, {
		enabled: !!symbol,
	})

	const tokens = data ? data : defaultLiquidityToken

	return { data: tokens, isLoading, isFetching }
}

export const useHistoricalToken = ({ symbol, tf }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { symbol, tf }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/historical/${symbol}/chart?tf=${tf}`,
			method: "GET",
		})
		return formatHistoricalToken(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["tokenHistorical", { symbol, tf }], getter, {
		enabled: !!symbol && !!tf,
	})

	const tokens = data ? data : defaultHistoricalToken

	return { data: tokens, isLoading, isFetching }
}
