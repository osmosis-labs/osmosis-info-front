import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"

const KeplrContext = createContext()

export const useKeplr = () => useContext(KeplrContext)

export const KeplrProvider = ({ children }) => {
	const [keplrStatus, setKeplrStatus] = useState("uninstalled")

	useEffect(() => {
		document.addEventListener("readystatechange", documentStateChange)
		return () => document.removeEventListener("readystatechange", documentStateChange)
	}, [])

	const documentStateChange = (event) => {
		if (event.target && event.target.readyState === "complete") {
			if (window.keplr) setKeplrStatus("installed")
		}
	}
	console.log("%cKeplrProvider.js -> 27 PINK: keplrStatus", "background: #e91e63; color:#FFFFFF", keplrStatus)
	return (
		<KeplrContext.Provider
			value={{
				keplrStatus,
			}}
		>
			{children}
		</KeplrContext.Provider>
	)
}
