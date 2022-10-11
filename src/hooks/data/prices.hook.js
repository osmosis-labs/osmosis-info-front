import { useQuery } from "react-query"
import { defaultValuePrice, formatPrice } from "../../formaters/prices.formatter"
import useRequest from "../request.hook"
const API_URL = process.env.REACT_APP_API_URL
export const usePrices = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		let promises = [
			request({ url: `${API_URL}/tokens/v2/price/osmo`, type: "get" }),
			request({ url: `${API_URL}/tokens/v2/price/ion`, type: "get" }),
		]
		let results = await Promise.all(promises)
		return formatPrice({ dataOsmo: results[0].data, dataIon: results[1].data })
	}

	const { data: prices, isLoading, isFetching } = useQuery(["prices", {}], getter)
	const data = prices ? prices : defaultValuePrice

	return { data, isLoading, isFetching }
}
