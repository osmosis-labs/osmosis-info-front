import { useQuery } from "react-query"
import { defaultIbc, formatIbc } from "../../formaters/ibc.formatter"
import useRequest from "../request.hook"
const API_URL = process.env.REACT_APP_API_URL

export const useIbc = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		const response = await request({
			url: `${API_URL}/ibc/v1/all?dex=osmosis`,
			method: "GET",
		})
		return formatIbc(response.data)
	}

	const { data, isLoading, isFetching } = useQuery(["ibc", {}], getter, { refetchInterval: 60 * 1_000 })
	const ibc = data ? data : defaultIbc

	return { data: ibc, isLoading, isFetching }
}
