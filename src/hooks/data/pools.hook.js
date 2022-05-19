import { useQuery } from "react-query"
import { defaultChartPool, formatChartPool } from "../../formaters/pools.formatter"
import useRequest from "../request.hook"

export const useChartPool = ({ poolId, denomIn, denomOut, range }) => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, { poolId, denomIn, denomOut, range }] = queryKey
		const url = `https://api-osmosis.imperator.co/pairs/v1/historical/${poolId}/chart?asset_in=${denomIn}&asset_out=${denomOut}&range=${range}&asset_type=denom`
		const response = await request({
			url,
			method: "GET",
		})
		return formatChartPool(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["chartPool", { poolId, denomIn, denomOut, range }], getter, {
		enabled: !!poolId && !!denomIn && !!denomOut && !!range,
	})
	const chartPool = data ? data : defaultChartPool

	return { data: chartPool, isLoading, isFetching }
}
