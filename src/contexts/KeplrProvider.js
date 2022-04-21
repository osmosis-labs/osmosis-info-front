import { createContext, useContext, useEffect, useState } from "react"
import { useWalletManager } from "cosmodal"
const KeplrContext = createContext()
const AUTO_CONNECT_WALLET_KEY = "auto_connect_wallet"

export const useKeplr = () => useContext(KeplrContext)
export const KeplrProvider = ({ children }) => {
	const [keplrStatus, setKeplrStatus] = useState("uninstalled")
	const { getWallet, clearLastUsedWallet, setDefaultConnectionType, connectionType } = useWalletManager()
	const [name, setName] = useState("")
	const [address, setAddress] = useState("osmo1ukzgv8ctsvsmwn6z7lhfqfs0cncy6d6f2kvl2vn")
	/*
	osmo1nzutmw5hqat76csr6qggnplemvqf5hczserhuv
	osmo1ukzgv8ctsvsmwn6z7lhfqfs0cncy6d6f2kvl2vn
	*/

	useEffect(() => {
		document.addEventListener("readystatechange", documentStateChange)
		return () => document.removeEventListener("readystatechange", documentStateChange)
	}, [])

	const documentStateChange = (event) => {
		if (event.target && event.target.readyState === "complete") {
			if (window.keplr) setKeplrStatus("installed")
		}
	}

	const connect = async () => {
		const wallet = await getWallet()
		await wallet.enable(["osmosis-1"])
		const key = await wallet.getKey("osmosis-1")
		setAddress(key.bech32Address)
		setName(key.name)
	}
	const disconnect = () => {
		setAddress("")
		clearLastUsedWallet()
		setDefaultConnectionType(undefined)
		localStorage.removeItem(AUTO_CONNECT_WALLET_KEY)
		localStorage.removeItem("walletconnect")
	}

	useEffect(() => {
		if (connectionType) {
			localStorage.setItem(AUTO_CONNECT_WALLET_KEY, connectionType)
		}
	}, [connectionType])

	// Automatically connect wallet as stored type, even if page refreshed,
	useEffect(() => {
		const autoConnectionType = localStorage.getItem(AUTO_CONNECT_WALLET_KEY)
		if (autoConnectionType) {
			setDefaultConnectionType(autoConnectionType)
			connect()
		}
	}, [])

	return (
		<KeplrContext.Provider
			value={{
				keplrStatus,
				connect,
				disconnect,
				address,
				name,
			}}
		>
			{children}
		</KeplrContext.Provider>
	)
}
