import { useQuery } from "react-query"
import { useSettings } from "../../contexts/SettingsProvider"
import { defaultMetrics, defaultTop, formatMetrics, formatTop } from "../../formaters/metrics.formatter"
import useRequest from "../request.hook"
import { useAssets } from "./assets.hook"
const API_URL = process.env.REACT_APP_API_URL

export const useMetrics = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { }] = queryKey
		const response = await request({
			url: `${API_URL}/overview/v1/metrics`,
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
	const { settings } = useSettings()
	const { data: assets, isFetching: isFetchingAssets, isLoading: isLoadingAssets } = useAssets()
	const main = settings.type === "app"

	const getter = async ({ queryKey }) => {
		const [_, { main }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/top/gainers`,
			method: "GET",
		})
		return formatTop(response.data, main, assets)
	}

	const { data, isLoading, isFetching } = useQuery(["top", { main }], getter, {
		enabled: !!assets["OSMO"]

	})
	const gainers = data ? data : defaultTop

	return { data: gainers, isLoading: isLoading && isLoadingAssets, isFetching: isFetching && isFetchingAssets }
}

export const useLosers = () => {
	const request = useRequest()
	const { settings } = useSettings()
	const { data: assets, isFetching: isFetchingAssets, isLoading: isLoadingAssets } = useAssets()
	const main = settings.type === "app"

	const getter = async ({ queryKey }) => {
		const [_, { main }] = queryKey
		const response = await request({
			url: `${API_URL}/tokens/v2/top/losers`,
			method: "GET",
		})
		return formatTop(response.data, main, assets)
	}

	const { data, isLoading, isFetching } = useQuery(["losers", { main }], getter, {
		enabled: !!assets["OSMO"]

	})
	const losers = data ? data : defaultTop

	return { data: losers, isLoading: isLoading && isLoadingAssets, isFetching: isFetching && isFetchingAssets }
}
