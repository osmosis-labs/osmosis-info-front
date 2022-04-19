import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/LocalStorageHook"
const version = "1.3.1"
const defaultSettings = {
	tokenTable: [
		{ name: "Id", display: true, order: 1, key: "id" },
		{ name: "Name", display: true, order: 2, key: "name" },
		{ name: "Liquidity", display: true, order: 3, key: "liquidity" },
		{ name: "Price", display: true, order: 5, key: "price" },
		{ name: "Price (24h) change", display: true, order: 6, key: "price24hChange" },
		{ name: "Volume (24h)", display: true, order: 7, key: "volume24h" },
		{ name: "Volume (24h) change", display: true, order: 8, key: "volume24hChange" },
	],
	tokenTableSearch: [
		{ name: "Id", display: true, order: 1, key: "id" },
		{ name: "Name", display: true, order: 2, key: "name" },
		{ name: "Liquidity", display: true, order: 3, key: "liquidity" },
		{ name: "Price", display: false, order: 5, key: "price" },
		{ name: "Price (24h) change", display: false, order: 6, key: "price24hChange" },
		{ name: "Volume (24h)", display: false, order: 7, key: "volume24h" },
		{ name: "Volume (24h) change", display: false, order: 8, key: "volume24hChange" },
	],
	poolTable: [
		{ name: "Id", display: true, order: 1, key: "id" },
		{ name: "Pool", display: true, order: 2, key: "name" },
		{ name: "Liquidity", display: true, order: 3, key: "liquidity" },
		{ name: "Volume (24h)", display: true, order: 7, key: "volume24h" },
		{ name: "Volume (24h) change", display: true, order: 8, key: "volume24hChange" },
		{ name: "Volume (7d)", display: true, order: 8, key: "volume7d" },
		{ name: "Fees", display: false, order: 9, key: "fees" },
		{ name: "Internal return", display: false, order: 10, key: "internalReturn" },
		{ name: "External return", display: false, order: 11, key: "externalReturn" },
		{ name: "Total return", display: true, order: 12, key: "totalReturn" },
	],
	poolTableSearch: [
		{ name: "Id", display: true, order: 1, key: "id" },
		{ name: "Pool", display: true, order: 2, key: "name" },
		{ name: "Liquidity", display: true, order: 3, key: "liquidity" },
		{ name: "Volume (24h)", display: false, order: 7, key: "volume24h" },
		{ name: "Volume (24h) change", display: false, order: 8, key: "volume24hChange" },
		{ name: "Volume (7d)", display: false, order: 8, key: "volume7d" },
		{ name: "Fees", display: false, order: 9, key: "fees" },
		{ name: "Internal return", display: false, order: 10, key: "internalReturn" },
		{ name: "External return", display: false, order: 11, key: "externalReturn" },
		{ name: "Total return", display: false, order: 12, key: "totalReturn" },
	],
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
