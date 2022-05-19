import { useQuery } from "react-query"
import { defaultMetrics, defaultTop, formatMetrics, formatTop } from "../../formaters/metrics.formatter"
import useRequest from "../request.hook"

export const useMetrics = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/overview/v1/metrics`,
			method: "GET",
		})
		return formatMetrics(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["metrics", {}], getter, {})
	const metrics = data ? data : defaultMetrics

	return { data: metrics, isLoading, isFetching }
}

export const useGainers = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/top/gainers`,
			method: "GET",
		})
		return formatTop(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["top", {}], getter, {})
	const gainers = data ? data : defaultTop

	return { data: gainers, isLoading, isFetching }
}

export const useLosers = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `https://api-osmosis.imperator.co/tokens/v2/top/losers`,
			method: "GET",
		})
		return formatTop(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["losers", {}], getter, {})
	const losers = data ? data : defaultTop

	return { data: losers, isLoading, isFetching }
}
