import { useInfiniteQuery, useQuery } from "react-query"
import {
	defaultBalance,
	defaultChartStaking,
	defaultExposure,
	defaultLiquidity,
	defaultLiquidityToken,
	defaultTrades,
	defaultTrx,
	defaultTrxs,
	defaultTypeTrx,
	formatBalance,
	formatChartStaking,
	formatExposure,
	formatLiqudity,
	formatLiqudityToken,
	formatTrades,
	formatTrx,
	formatTrxs,
	formatTypeTrx,
} from "../../formaters/dashboard.formatter"
import useRequest from "../request.hook"

export const useBalance = ({ address }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/account/v1/balance/${address}`,
			method: "GET",
		})
		return formatBalance(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["balance", { address }], getter, {
		enabled: !!address,
	})
	const balance = data ? data : defaultBalance

	return { data: balance, isLoading, isFetching }
}

export const useExposure = ({ address }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/account/v1/exposure/${address}`,
			method: "GET",
		})
		return formatExposure(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["exposure", { address }], getter, {
		enabled: !!address,
	})
	const exposure = data ? data : defaultExposure
	return { data: exposure, isLoading, isFetching }
}

export const useChartStaking = ({ address, isAccumulated }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address, isAccumulated }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/staking/v1/rewards/historical/${address}`,
			method: "GET",
		})
		return formatChartStaking(response.data, isAccumulated)
	}

	const { data, isLoading, isFetching } = useQuery(["chartStaking", { address, isAccumulated }], getter, {
		enabled: !!address,
	})
	const chartStakingReward = data ? data : defaultChartStaking

	return { data: chartStakingReward, isLoading, isFetching }
}

export const useLiquidity = ({ address, symbol, isAccumulated }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address, symbol, isAccumulated }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/lp/v1/rewards/historical/${address}/${symbol}`,
			method: "GET",
		})
		return formatLiqudity(response.data, isAccumulated)
	}

	const { data, isLoading, isFetching } = useQuery(["Liquidity", { address, isAccumulated, symbol }], getter, {
		enabled: !!address && !!symbol,
	})

	const liquidity = data ? data : defaultLiquidity

	return { data: liquidity, isLoading, isFetching }
}

export const useLiquidityToken = ({ address }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/lp/v1/rewards/token/${address}`,
			method: "GET",
		})
		return formatLiqudityToken(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["LiquidityToken", { address }], getter, {
		enabled: !!address,
	})

	const liquidityToken = data ? data : defaultLiquidityToken

	return { data: liquidityToken, isLoading, isFetching }
}

export const useTypeTrx = ({ address }, opts = { exclude: [] }) => {
	const request = useRequest()

	const { exclude } = opts

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/txs/v1/tx/count/${address}`,
			method: "GET",
		})
		return formatTypeTrx(response.data, exclude)
	}

	const { data, isLoading, isFetching } = useQuery(["typeTrx", { address }], getter, {
		enabled: !!address,
	})

	const typeTrx = data ? data : defaultTypeTrx

	return { data: typeTrx, isLoading, isFetching }
}

export const useTrxs = ({ address, limit = 10, type = "all" }, opts = { chainId: "", address: "" }) => {
	const request = useRequest()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { address, limit, type }] = queryKey
		let url = `https://api-osmosis-chain.imperator.co/txs/v1/tx/address/${address}?limit=${limit}&offset=${pageParam}`

		if (type && type !== "all") url += `&type=${type}`

		const response = await request({
			url,
			method: "GET",
		})
		return formatTrxs(response.data, opts)
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trxs", { address, limit, type }], getter, {
		enabled: !!address,
		getNextPageParam: (_, allPages) => {
			let nextPage = allPages.length * 10
			return nextPage
		},
	})

	const trxs = data && data.pages ? data.pages.flat() : defaultTrxs

	return { data: trxs, isLoading, isFetching, fetchNextPage }
}

export const useTrades = ({ address, limit = 10 }) => {
	const request = useRequest()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { address, limit }] = queryKey
		let url = `https://api-osmosis-chain.imperator.co/swap/v1/address/${address}?limit=${limit}&offset=${pageParam}`

		const response = await request({
			url,
			method: "GET",
		})
		return formatTrades(response.data)
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trades", { address, limit }], getter, {
		enabled: !!address,
		getNextPageParam: (_, allPages) => {
			let nextPage = allPages.length * 10
			return nextPage
		},
	})

	const trades = data && data.pages ? data.pages.flat() : defaultTrades

	return { data: trades, isLoading, isFetching, fetchNextPage }
}

export const useInfoTrx = ({ hash }, opts = { chainId: "", address: "", currentTrade: {} }) => {
	const request = useRequest()
	const { currentTrade } = opts

	const getter = async ({ queryKey }) => {
		const [_, { hash }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/txs/v1/tx/hash/${hash}`,
			method: "GET",
		})
		return formatTrx(response.data, opts)
	}

	const { data, isLoading, isFetching } = useQuery(["infoTrx", { hash }], getter, {
		enabled: !!hash,
	})

	const trx = data ? { ...currentTrade, ...data } : { ...currentTrade, ...defaultTrx }

	return { data: trx, isLoading, isFetching }
}
