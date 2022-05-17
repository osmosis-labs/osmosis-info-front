import { useCallback } from "react"
import {
	formatBalance,
	formatChartStaking,
	formatExosure,
	formatLiqudity,
	formatLiqudityToken,
} from "../formaters/dashboard.formatter"

export const useBalance =
	(request) =>
	async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/account/v1/balance/${address}`,
			method: "GET",
		})
		return formatBalance(response.data)
	}

export const useExposure =
	(request) =>
	async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/account/v1/exposure/${address}`,
			method: "GET",
		})
		return formatExosure(response.data)
	}

export const useChartStaking =
	(request) =>
	async ({ queryKey }) => {
		const [_, { address, isStakingAccumulated }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/staking/v1/rewards/historical/${address}`,
			method: "GET",
		})
		return formatChartStaking(response.data, isStakingAccumulated)
	}

export const useLiquidity =
	(request) =>
	async ({ queryKey }) => {
		const [_, { address, symbol, isAccumulated }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/lp/v1/rewards/historical/${address}/${symbol}`,
			method: "GET",
		})
		return formatLiqudity(response.data, isAccumulated)
	}

export const useLiquidityToken =
	(request) =>
	async ({ queryKey }) => {
		const [_, { address }] = queryKey
		const response = await request({
			url: `https://api-osmosis-chain.imperator.co/lp/v1/rewards/token/${address}`,
			method: "GET",
		})
		return formatLiqudityToken(response.data)
	}
