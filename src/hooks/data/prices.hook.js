import { defaultValuePrice, formatPrice } from "../../formaters/prices.formatter"
import useRequest from "../request.hook"

export const usePrices = () => {
	const request = useRequest()

	const getter = async ({ queryKey }) => {
		const [_, {}] = queryKey
		let promises = [
			request({ url: "https://api-osmosis.imperator.co/tokens/v2/price/osmo", type: "get" }),
			request({ url: "https://api-osmosis.imperator.co/tokens/v2/price/ion", type: "get" }),
		]
		let results = await Promise.all(promises)
		return formatPrice({ dataOsmo: results[0].data, dataIon: results[1].data })
	}

	return { getter, defaultValue: defaultValuePrice }
}
