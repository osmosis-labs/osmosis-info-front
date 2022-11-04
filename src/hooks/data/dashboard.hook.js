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
	formatTrxsSendReceive,
	formatTypeTrx,
} from "../../formaters/dashboard.formatter"
import useRequest from "../request.hook"
import { useAssets } from "./assets.hook"
const CHAIN_API_URL = process.env.REACT_APP_CHAIN_API_URL

export const useBalance = ({ address }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `${CHAIN_API_URL}/account/v1/balance/${address}`,
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
			url: `${CHAIN_API_URL}/account/v1/exposure/${address}`,
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
			url: `${CHAIN_API_URL}/staking/v1/rewards/historical/${address}`,
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
			url: `${CHAIN_API_URL}/lp/v1/rewards/historical/${address}/${symbol}`,
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
			url: `${CHAIN_API_URL}/lp/v1/rewards/token/${address}`,
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

export const getTrx = ({ request, address, offset }) => {
	let url = `${CHAIN_API_URL}/swap/v1/address/${address}?limit=${100}&offset=${offset}`
	return request({
		url,
		method: "GET",
	})
}

export const useTypeTrx = ({ address }, opts = { exclude: [], chainId: "", address: "" }) => {
	const request = useRequest()

	const {
		data: sendReceive,
		isLoading: isLoadingSendReceive,
		isFetching: isFetchingSendReceive,
	} = useSendReceive({ address }, opts)

	const isLoadingSendReceiveOrFetching = isLoadingSendReceive || isFetchingSendReceive

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `${CHAIN_API_URL}/txs/v1/tx/count/${address}`,
			method: "GET",
		})
		let exclude = opts.exclude
		let excludeOPT = []
		if (exclude) {
			excludeOPT = [...exclude, "cosmos.bank.v1beta1.MsgSend"]
		} else {
			excludeOPT = ["cosmos.bank.v1beta1.MsgSend"]
		}
		return formatTypeTrx(response.data, { ...opts, exclude: excludeOPT }, sendReceive)
	}

	const { data, isLoading, isFetching } = useQuery(["typeTrx", { address }], getter, {
		enabled: !!address && !isLoadingSendReceiveOrFetching,
	})

	const typeTrx = data ? data : defaultTypeTrx

	return { data: typeTrx, isLoading: isLoading || isLoadingSendReceiveOrFetching, isFetching }
}

export const useTrxs = ({ address, limit = 10, type = "all" }, opts = { chainId: "", address: "", exclude: [] }) => {
	const request = useRequest()

	const {
		data: sendReceive,
		isLoading: isLoadingSendReceive,
		isFetching: isFetchingSendReceive,
	} = useSendReceive({ address }, opts)

	const isLoadingSendReceiveOrFetching = isLoadingSendReceive || isFetchingSendReceive

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { address, limit, type }] = queryKey
		let url = `${CHAIN_API_URL}/txs/v1/tx/address/${address}?limit=${limit}&offset=${pageParam}`

		if (type && type !== "all") url += `&type=${type}`

		if (type === "cosmos.bank.v1beta1.MsgSend") {
			return sendReceive
		} else if (type === "cosmos.bank.v1beta1.MsgSend.send" || type === "cosmos.bank.v1beta1.MsgSend.receive") {
			if (pageParam > 0) {
				return []
			}
			return sendReceive.filter((trx) => trx.types.map((type) => type.value).includes(type))
		}

		const response = await request({
			url,
			method: "GET",
		})

		let formatedData = formatTrxs(response.data, { ...opts })

		return formatedData
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trxs", { address, limit, type }], getter, {
		enabled: !!address && !isLoadingSendReceiveOrFetching,
		getNextPageParam: (_, allPages) => {
			let nextPage = allPages.length * 10
			return nextPage
		},
	})

	const trxs = data && data.pages ? data.pages.flat() : defaultTrxs

	return { data: trxs, isLoading: isLoading || isLoadingSendReceiveOrFetching, isFetching, fetchNextPage }
}

export const useSendReceive = ({ address }, opts = { chainId: "", address: "" }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey

		let data = await getAllSendReceive({ request, address })
		return formatTrxs(data, opts)
	}

	const { data, isLoading, isFetching } = useQuery(["sendReceive", { address }], getter, {
		enabled: !!address,
	})

	const sendReceive = data ? data : []

	return { data: sendReceive, isLoading, isFetching }
}

const getSendReceive = ({ request, address, offset }) => {
	let url = `${CHAIN_API_URL}/txs/v1/tx/address/${address}?type=cosmos.bank.v1beta1.MsgSend&limit=${100}&offset=${offset}`
	return request({
		url,
		method: "GET",
	})
}

const getAllSendReceive = async ({ request, address, offset = 0 }) => {
	let result = await getSendReceive({ request, address, offset })

	offset += 100
	if (result.data.length >= 100) {
		let res = await getAllSendReceive({ request, address, offset })
		return [...res, ...result.data]
	} else {
		return [...result.data]
	}
}

export const useTrades = ({ address, limit = 10 }) => {
	const request = useRequest()
	const { data: assets } = useAssets()

	const getter = async ({ queryKey, pageParam = 0 }) => {
		const [_, { address, limit }] = queryKey
		let url = `${CHAIN_API_URL}/swap/v1/address/${address}?limit=${limit}&offset=${pageParam}`

		const response = await request({
			url,
			method: "GET",
		})
		return formatTrades(response.data, assets)
	}

	const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(["trades", { address, limit }], getter, {
		enabled: !!address && !!assets.OSMO,
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
			url: `${CHAIN_API_URL}/txs/v1/tx/hash/${hash}`,
			method: "GET",
		})
		return formatTrx(response.data, opts)
	}

	const { data, isLoading, isFetching } = useQuery(["infoTrx", { hash }], getter, {
		enabled: !!hash,
	})

	const trx = data ? { ...data, ...currentTrade } : { ...currentTrade, ...defaultTrx }

	return { data: trx, isLoading, isFetching }
}
