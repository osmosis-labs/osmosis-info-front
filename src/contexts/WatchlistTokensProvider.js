import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/LocalStorageHook"
const WatchlistTokensContext = createContext()

export const useWatchlistTokens = () => useContext(WatchlistTokensContext)

export const WatchlistTokensProvider = ({ children }) => {
	const [watchlistTokens, setWatchlistTokens] = useLocalStorage("watchlistTokens", [])
	return (
		<WatchlistTokensContext.Provider value={{ watchlistTokens, setWatchlistTokens }}>
			{children}
		</WatchlistTokensContext.Provider>
	)
}
