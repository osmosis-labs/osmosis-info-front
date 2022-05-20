import { useInfiniteQuery, useQuery } from "react-query"
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
import { useTokens } from "./tokens.hook"

export const useTokensPool = ({ poolId }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { poolId }] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/pools/v2/${poolId}`,
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
	const { data: pools, isLoading, isFetching } = usePools({})
	let pool = defaultPool
	if (pools && pools.length > 0) {
		let finded = pools.find((p) => p.id === poolId)
		if (finded) pool = finded
	}

	return { data: pool, isLoading: pools.length === 0 ? true : isLoading, isFetching }
}

export const usePoolApr = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/apr/v2/all`,
			method: "GET",
		})
		return response.data
	}

	const { data, isLoading, isFetching } = useQuery(["poolApr", {}], getter, {})

	const apr = data ? data : []

	return { data: apr, isLoading, isFetching }
}

export const usePools = ({ lowLiquidity = false }) => {
	const { data: poolApr } = usePoolApr()
	const {
		data: { all: allTokens },
	} = useTokens()
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { lowLiquidity }] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/pools/v2/all?low_liquidity=${lowLiquidity}`,
			method: "GET",
		})
		return formatPools(response.data, poolApr, allTokens)
	}

	const { data, isLoading, isFetching } = useQuery(["pool", { lowLiquidity }], getter, {
		enabled: poolApr.length > 0 && allTokens.length > 0,
	})

	const pools = data ? data : defaultPools
	//TODO: Check main
	console.log("%cpools.hook.js -> 81 ERROR: TO DO check main", "background: #FF0000; color:#FFFFFF")

	return { data: pools, isLoading, isFetching }
}

export const usePoolTrx = ({ poolId, limit = 10 }) => {
	const request = useRequest()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { poolId, limit }] = queryKey
		let url = `https://api-osmosis-chain.imperator.co/swap/v1/pool/${poolId}?only_success=true&limit=${limit}&offset=${pageParam}`

		const response = await request({
			url,
			method: "GET",
		})
		return formatPoolTrx(response.data)
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trxsPool", { poolId, limit }], getter, {
		enabled: !!poolId,
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
		const url = `https://api-osmosis.imperator.co/pairs/v1/historical/${poolId}/chart?asset_in=${denomIn}&asset_out=${denomOut}&range=${range}&asset_type=denom`
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
		const url = `https://api-osmosis.imperator.co/pools/v2/liquidity/${poolId}/chart`
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
		const url = `https://api-osmosis.imperator.co/pools/v2/volume/${poolId}/chart`
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
