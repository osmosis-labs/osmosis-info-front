import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/LocalStorageHook"
const SettingsContext = createContext()

export const useSettings = () => useContext(SettingsContext)

export const SettingsProviders = ({ children }) => {
	const [settings, setSettings] = useLocalStorage("Settings", {
        tokenTable:{
            id: true,
            name: true,
            liquidity: true,
            price: true,
            volume24h: true,
        },
        poolTable:{
            id: true,
            name: true,
            liquidity: true,
            volume7d: true,
            volume24h: true,
        }
        
    })

    const updateSettings = (newSettings) => {
        setSettings({
            ...settings,
            ...newSettings
        })
    }

	return (
		<SettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</SettingsContext.Provider>
	)
}
