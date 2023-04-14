import { useInfiniteQuery, useQuery } from "react-query"
import { useSettings } from "../../contexts/SettingsProvider"
import {
	defaultHistoricalPool,
	defaultLiquidityPool,
	defaultPool,
	defaultPools,
	defaultPoolTrx,
	defaultTokensPool,
	defaultVolumePool,
	formatHistoricalPool,
	formatLiquidityPool,
	formatPools,
	formatPoolTrx,
	formatTokensPool,
	formatVolumePool,
} from "../../formaters/pools.formatter"
import useRequest from "../request.hook"
import { useAssets } from "./assets.hook"
import { useTokens } from "./tokens.hook"
import { useDebug } from "../../contexts/debug.provider"

const API_URL = process.env.REACT_APP_API_URL
const CHAIN_API_URL = process.env.REACT_APP_CHAIN_API_URL

export const useTokensPool = ({ poolId }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { poolId }] = queryKey
		const response = await request({
			url: `${API_URL}/pools/v2/${poolId}`,
			method: "GET",
		})
		return formatTokensPool(response.data, poolId)
	}

	const { data, isLoading, isFetching } = useQuery(["pool", { poolId }], getter, {
		enabled: !!poolId,
	})

	const pool = data ? data : defaultTokensPool

	return { data: pool, isLoading, isFetching }
}

export const usePool = ({ poolId }) => {
	//Merge useTokensPools, historicalPool (for the price) is one hook
	const { data: pools, isLoading, isFetching } = usePools({})
	let pool = defaultPool
	if (pools && pools.all.length > 0) {
		let finded = pools.all.find((p) => p.id === poolId)
		if (finded) pool = finded
	}
	return { data: pool, isLoading: pools.all.length === 0 ? true : isLoading, isFetching }
}

export const usePoolApr = () => {
	const request = useRequest()

	const {
		aprError
	} = useDebug()

	const getter = async ({ queryKey }) => {
		const [_, { }] = queryKey
		try {

			const response = await request({
				url: `${API_URL}/apr/v2/aldl`,
				method: "GET",
			})
			return aprError ? { "message": "An error occured" } : response.data
		} catch (e) {
			console.log("%cpools.hook.js -> 75 ERROR: e", 'background: #FF0000; color:#FFFFFF', e)
			return { "message": "An error occured" }
		}
	}

	const { data, isLoading, isFetching } = useQuery(["poolApr", aprError, {}], getter, {})
	let apr = []
	if (data && Array.isArray(data)) apr = data

	return { data: apr, isLoading, isFetching }
}

export const usePools = ({ lowLiquidity = false }) => {
	const { data: poolApr } = usePoolApr()
	const { settings } = useSettings()
	const { data: assets, isFetching: isFetchingAssets, isLoading: isLoadingAssets } = useAssets()
	const {
		data: { all: allTokens },
	} = useTokens()
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { lowLiquidity }] = queryKey
		const response = await request({
			url: `${API_URL}/pools/v2/all?low_liquidity=${lowLiquidity}`,
			method: "GET",
		})
		return formatPools(response.data, poolApr, allTokens, assets)
	}

	const { data, isLoading, isFetching } = useQuery(["pool", { lowLiquidity }, poolApr,], getter, {
		enabled: allTokens.length > 0 && !!assets["OSMO"],
	})
	if (data) {
		if (settings.type === "app") {
			data.current = data.main
		} else {
			data.current = data.frontier
		}
	}
	const pools = data ? data : defaultPools
	return { data: pools, isLoading: isLoading && isLoadingAssets, isFetching: isFetching && isFetchingAssets }
}

export const usePoolTrx = ({ poolId, limit = 10 }) => {
	const request = useRequest()
	const { data: assets } = useAssets()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { poolId, limit }] = queryKey
		let url = `${CHAIN_API_URL}/swap/v1/pool/${poolId}?only_success=true&limit=${limit}&offset=${pageParam}`

		const response = await request({
			url,
			method: "GET",
		})
		return formatPoolTrx(response.data, assets)
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trxsPool", { poolId, limit }], getter, {
		enabled: !!poolId && !!assets.OSMO,
		getNextPageParam: (_, allPages) => {
			let nextPage = allPages.length * 10
			return nextPage
		},
	})

	const trxs = data && data.pages ? data.pages.flat() : defaultPoolTrx

	return { data: trxs, isLoading, isFetching, fetchNextPage }
}

export const useHistoricalPool = ({ poolId, denomIn, denomOut, range }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { poolId, denomIn, denomOut, range }] = queryKey
		const url = `${API_URL}/pairs/v1/historical/${poolId}/chart?asset_in=${denomIn}&asset_out=${denomOut}&range=${range}&asset_type=denom`
		const response = await request({
			url,
			method: "GET",
		})
		return formatHistoricalPool(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["historicalPool", { poolId, denomIn, denomOut, range }], getter, {
		enabled: !!poolId && !!denomIn && !!denomOut && !!range,
	})
	const chartPool = data ? data : defaultHistoricalPool

	return { data: chartPool, isLoading, isFetching }
}

export const useLiquidityPool = ({ poolId }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { poolId }] = queryKey
		const url = `${API_URL}/pools/v2/liquidity/${poolId}/chart`
		const response = await request({
			url,
			method: "GET",
		})
		return formatLiquidityPool(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["liquidityPool", { poolId }], getter, {
		enabled: !!poolId,
	})
	const liquidityPool = data ? data : defaultLiquidityPool

	return { data: liquidityPool, isLoading, isFetching }
}

export const useVolumePool = ({ poolId }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { poolId }] = queryKey
		const url = `${API_URL}/pools/v2/volume/${poolId}/chart`
		const response = await request({
			url,
			method: "GET",
		})
		return formatVolumePool(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["volumePool", { poolId }], getter, {
		enabled: !!poolId,
	})
	const volumePool = data ? data : defaultVolumePool

	return { data: volumePool, isLoading, isFetching }
}
