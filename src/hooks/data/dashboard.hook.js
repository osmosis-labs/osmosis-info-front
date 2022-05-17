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

export const useBalance = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/account/v1/balance/${address}`,
			method: "GET",
		})
		return formatBalance(response.data)
	}

	return { getter, defaultValue: defaultBalance }
}

export const useExposure = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		console.log("%cdashboard.hook.js -> 35 BLUE: exposure called",'background: #2196f3; color:#FFFFFF',  )
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/account/v1/exposure/${address}`,
			method: "GET",
		})
		return formatExposure(response.data)
	}

	return { getter, defaultValue: defaultExposure }
}

export const useChartStaking = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address, isStakingAccumulated }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/staking/v1/rewards/historical/${address}`,
			method: "GET",
		})
		return formatChartStaking(response.data, isStakingAccumulated)
	}

	return { getter, defaultValue: defaultChartStaking }
}

export const useLiquidity = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address, symbol, isAccumulated }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/lp/v1/rewards/historical/${address}/${symbol}`,
			method: "GET",
		})
		return formatLiqudity(response.data, isAccumulated)
	}

	return { getter, defaultValue: defaultLiquidity }
}

export const useLiquidityToken = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/lp/v1/rewards/token/${address}`,
			method: "GET",
		})
		return formatLiqudityToken(response.data)
	}

	return { getter, defaultValue: defaultLiquidityToken }
}
