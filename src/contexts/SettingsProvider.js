import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/LocalStorageHook"
const version = "0.2"
const defaultSettings = {
	tokenTable: {
		id: true,
		name: true,
		liquidity: true,
		liquidity24hChange: true,
		price: true,
		price24hChange: true,
		volume24h: true,
		volume24hChange: true,
	},
	poolTable: {
		id: true,
		name: true,
		liquidity: true,
		liquidity24hChange: true,
		volume7d: true,
		volume24h: true,
		volume24hChange: true,
        fees: true,
	},
}
const SettingsContext = createContext()

export const useSettings = () => useContext(SettingsContext)

export const SettingsProviders = ({ children }) => {
	const [settings, setSettings] = useLocalStorage("Settings", defaultSettings, version)

	const updateSettings = (newSettings) => {
		setSettings({
			...settings,
			...newSettings,
		})
	}

	return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}
