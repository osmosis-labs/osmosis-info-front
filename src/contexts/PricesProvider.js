import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
import { formateNumberPriceDecimals } from "../helpers/helpers"
const PricesContext = createContext()

export const usePrices = () => useContext(PricesContext)

export const PricesProvider = ({ children }) => {
	const [priceOsmo, setPriceOsmo] = useState(0)
	const [priceOsmoBrut, setPriceOsmoBrut] = useState(0)
	const [priceIon, setPriceIon] = useState(0)

	useEffect(() => {
		let fetch = async () => {
			// get all Prices from server API
			let promises = [
				API.request({ url: "search/v1/price/osmo", type: "get" }),
				API.request({ url: "search/v1/price/ion", type: "get" }),
			]
			let results = await Promise.all(promises)
			setPriceOsmoBrut(parseFloat(results[0].data.price))
			setPriceOsmo(formateNumberPriceDecimals(parseFloat(results[0].data.price)))
			setPriceIon(formateNumberPriceDecimals(parseFloat(results[1].data.price)))
		}
		fetch()
	}, [])

	return <PricesContext.Provider value={{ priceOsmo, priceIon, priceOsmoBrut}}>{children}</PricesContext.Provider>
}
