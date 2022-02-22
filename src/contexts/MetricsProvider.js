import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
const MetricsContext = createContext()

export const useMetrics = () => useContext(MetricsContext)

export const MetricsProvider = ({ children }) => {
	const [osmosPrice, setOsmosPrice] = useState(0)
	const [osmosChange24h, setOsmosChange24h] = useState(-1)
	const [nbToken, setNbToken] = useState(0)
	const [volume24h, setVolume24h] = useState(0)
	const [volume24hChange, setVolume24hChange] = useState(0)
	const [liquidityUSD, setliquidityUSD] = useState(50)
	const [liquidityUSD24h, setLiquidityUSD24h] = useState(-50)
	const [liquidityAtom, setLiquidityAtom] = useState(10)
	const [liquidityAtom24h, setLiquidityAtom24h] = useState(10)
	const [liquidityOsmo, setLiquidityOsmo] = useState(100)
	const [liquidityOsmo24h, setLiquidityOsmo24h] = useState(100)

	const [dominance, setDominance] = useState([])

	const [gainers, setGainers] = useState([])
	const [losers, setLosers] = useState([])

	const [loadingDominance, setLoadingDominance] = useState(true)
	const [loadingTop, setLoadingTop] = useState(true)

	useEffect(() => {
		let fetch = async () => {
			API.request({ url: "overview/v1/metrics", type: "get" }).then((res) => {
				let data = res.data
				setOsmosPrice(data.osmo_price)
				setOsmosChange24h(data.osmo_change_24h)
				setNbToken(data.nb_tokens)
				setVolume24h(data.volume_24h)
				setVolume24hChange(data.volume_24h_change)
				setliquidityUSD(data.liquidity_usd)
				setLiquidityUSD24h(data.liquidity_usd_24h)
				setLiquidityAtom(data.liquidity_atom)
				setLiquidityAtom24h(data.liquidity_atom_24h)
				setLiquidityOsmo(data.liquidity_osmo)
				setLiquidityOsmo24h(data.liquidity_osmo_24h)
			})
			setLoadingTop(true)
			API.request({ url: "tokens/v2/top/gainers", type: "get" })
				.then((res) => {
					setGainers(res.data)
					setLoadingTop(false)
				})
				.catch((err) => {
					console.log("%cMetricsProvider.js -> 49 ERROR: err", "background: #FF0000; color:#FFFFFF", err)
					setLoadingTop(false)
				})
			API.request({ url: "tokens/v2/top/losers", type: "get" }).then((res) => {
				setLosers(res.data)
			})
			setLoadingDominance(true)
			API.request({ url: "tokens/v2/dominance/all", type: "get" })
				.then((res) => {
					let dominances = []
					let others = {
						symbol: "Others",
						dominance: 0,
					}
					res.data.forEach((dominance, index) => {
						if (index < 4) {
							dominances.push(dominance)
						} else {
							others.dominance += dominance.dominance
						}
					})
					dominances.push(others)
					setDominance(dominances)
					setLoadingDominance(false)
				})
				.catch((err) => {
					console.log("%cMetricsProvider.js -> 70 ERROR: err", "background: #FF0000; color:#FFFFFF", err)
					setLoadingDominance(false)
				})
		}
		fetch()
	}, [])

	return (
		<MetricsContext.Provider
			value={{
				osmosPrice,
				osmosChange24h,
				nbToken,
				volume24h,
				volume24hChange,
				liquidityUSD,
				liquidityUSD24h,
				liquidityAtom,
				liquidityAtom24h,
				liquidityOsmo,
				liquidityOsmo24h,
				dominance,
				gainers,
				losers,
				loadingDominance,
				loadingTop
			}}
		>
			{children}
		</MetricsContext.Provider>
	)
}
