import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/LocalStorageHook"
import { getInclude } from "../helpers/helpers"
const WatchlistIBCContext = createContext()

export const useWatchlistIBC = () => useContext(WatchlistIBCContext)

export const WatchlistIBCProvider = ({ children }) => {
	const [watchlistIBC, setWatchlistIBC] = useLocalStorage("watchlistIBC", [])

	const getId = (item) => `${item[0].channel_id}-${item[1].channel_id}`

	const updateWatchlistIBC = (item) => {
		let tmpWatchlistIBC = [...watchlistIBC]
		let index = getInclude(watchlistIBC, (ibcId) => {
			return ibcId === getId(item)
		})
		if (index === -1) tmpWatchlistIBC.push(getId(item))
		else tmpWatchlistIBC.splice(index, 1)
		setWatchlistIBC([...tmpWatchlistIBC])
	}

	const isInWatchlist = (ibc) => {
		let index = getInclude(watchlistIBC, (ibcId) => {
			return ibcId === getId(ibc)
		})
		return index !== -1
	}

	const getWatchList = (list) => {
		let res = list.filter((ibc) => {
			let index = getInclude(watchlistIBC, (ibcId) => {
				return ibcId === getId(ibc)
			})
			return index >= 0
		})
		return res
	}
	return (
		<WatchlistIBCContext.Provider value={{ watchlistIBC, updateWatchlistIBC, isInWatchlist, getWatchList }}>
			{children}
		</WatchlistIBCContext.Provider>
	)
}
