import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
const ChartsContext = createContext()

export const useCharts = () => useContext(ChartsContext)

export const ChartsProvider = ({ children }) => {
	const [dataLiquidity, setDataLiquidity] = useState([]) //useSessionStorage("dataLiquidity", []);
	const [dataVolume, setDataVolume] = useState([]) //useSessionStorage("dataVolume", []);

	useEffect(() => {
		let fetch = async () => {
			// get all Charts from server API
			let promises = [
				API.request({ url: "liquidity/v1/historical/chart", type: "get" }),
				API.request({ url: "volume/v1/historical/chart", type: "get" }),
				API.request({ url: "volume/v1/actual", type: "get" }),
				API.request({ url: "liquidity/v1/actual", type: "get" }),
			]
			let results = await Promise.all(promises)
			let liquidity = results[0].data
			let volume = results[1].data
			liquidity.push(results[3].data)
			volume.push(results[2].data)
			setDataLiquidity(liquidity)
			setDataVolume(volume)
		}
		fetch()
	}, [])

	return <ChartsContext.Provider value={{ dataLiquidity, dataVolume }}>{children}</ChartsContext.Provider>
}
