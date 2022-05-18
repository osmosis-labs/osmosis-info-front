import { useQuery } from "react-query"
import {
	defaultBalance,
	defaultChartStaking,
	defaultExposure,
	defaultLiquidity,
	defaultLiquidityToken,
	formatBalance,
	formatChartStaking,
	formatExposure,
	formatLiqudity,
	formatLiqudityToken,
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
