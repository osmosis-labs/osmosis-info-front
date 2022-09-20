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

export const useMCapTokens = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/mcap`,
			method: "GET",
		})
		return response.data
	}

	const { data, isLoading, isFetching } = useQuery(["mcap-tokens", {}], getter, {})
	const tokens = data ? data : defaultMCap

	return { data: tokens, isLoading, isFetching }
}

export const useTokens = () => {
	const request = useRequest()
	const { settings } = useSettings()

	const { data: mcap, isFetching: isFetchingMCap, isLoading: isLoadingMCap } = useMCapTokens()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/all`,
			method: "GET",
		})
		return formatTokens(response.data, mcap)
	}

	const { data, isLoading, isFetching } = useQuery(["tokens", { mcap }], getter, {})
	if (data) {
		if (settings.type === "app") {
			data.current = data.main
		} else {
			data.current = data.frontier
		}
	}
	const tokens = data ? data : defaultTokens

	return { data: tokens, isLoading: isLoading || isLoadingMCap, isFetching: isFetching || isFetchingMCap }
}

export const useToken = ({ symbol }) => {
	const request = useRequest()

	const { data: mcap, isFetching: isFetchingMCap, isLoading: isLoadingMCap } = useMCapTokens()

	const getter = async ({ queryKey }) => {
		const [_, { symbol }] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/${symbol}`,
			method: "GET",
		})
		return formatToken(response.data[0], mcap)
	}

	const { data, isLoading, isFetching } = useQuery(["token", { symbol, mcap }], getter, {
		enabled: !!symbol,
	})

	let token = data ? data : defaultToken

	return { data: token, isLoading, isFetching }
}

export const useTrxToken = ({ symbol, limit = 10 }) => {
	const request = useRequest()
	const { data: assets } = useAssets()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { symbol, limit }] = queryKey
		let url = `https://api-osmosis-chain.imperator.co/swap/v1/token/${symbol}?only_success=true&limit=${limit}&offset=${pageParam}`

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
			url: `https://api-osmosis.imperator.co/tokens/v2/volume/${symbol}/chart`,
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
			url: `https://api-osmosis.imperator.co/tokens/v2/liquidity/${symbol}/chart`,
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
			url: `https://api-osmosis.imperator.co/tokens/v2/historical/${symbol}/chart?tf=${tf}`,
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
