import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/LocalStorageHook"
const WatchlistPoolsContext = createContext()

export const useWatchlistPools = () => useContext(WatchlistPoolsContext)

export const WatchlistPoolsProvider = ({ children }) => {
	const [watchlistPools, setWatchlistPools] = useLocalStorage("watchlistPools", [])
	return (
		<WatchlistPoolsContext.Provider value={{ watchlistPools, setWatchlistPools }}>
			{children}
		</WatchlistPoolsContext.Provider>
	)
}
