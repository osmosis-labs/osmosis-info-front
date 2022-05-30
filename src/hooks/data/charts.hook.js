import { useQuery } from "react-query"
import {
	defaultLiquidityChart,
	defaultVolumeChart,
	formatLiquidityChart,
	formatVolumeChart,
} from "../../formaters/charts.formatter"
import useRequest from "../request.hook"

export const useLiquidityChart = () => {
	const request = useRequest()
	const getter = async ({ queryKey }) => {
		const [_] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/liquidity/v2/historical/chart`,
			method: "GET",
		})
		return formatLiquidityChart(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["liquidityChart", {}], getter, {})
	const liquidityChartData = data ? data : defaultLiquidityChart
	return { data: liquidityChartData, isLoading, isFetching }
}

export const useVolumeChart = () => {
	const request = useRequest()
	const getter = async ({ queryKey }) => {
		const [_] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/volume/v2/historical/chart`,
			method: "GET",
		})
		return formatVolumeChart(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["volumeChart", {}], getter, {})
	const volumeChartData = data ? data : defaultVolumeChart
	return { data: volumeChartData, isLoading, isFetching }
}
