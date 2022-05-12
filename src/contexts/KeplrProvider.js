import { createContext, useContext, useEffect, useState } from "react"
import { useWalletManager } from "cosmodal"
import { useDebug } from "./debug.provider"
const KeplrContext = createContext()
const AUTO_CONNECT_WALLET_KEY = "auto_connect_wallet"
const CHAIN_ID = "osmosis-1"

export const useKeplr = () => useContext(KeplrContext)
export const KeplrProvider = ({ children }) => {
	const { MODE } = useDebug()
	const [keplrStatus, setKeplrStatus] = useState("uninstalled")
	const { getWallet, clearLastUsedWallet, setDefaultConnectionType, connectionType } = useWalletManager()
	let defaultAddress = ""
	if (MODE === "dev") defaultAddress = "osmo12zkpu48ssu0h32uaccz29f5z6atyle7j6tpyeg"
	const [address, setAddress] = useState(defaultAddress)

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
		await wallet.enable([CHAIN_ID])
		const key = await wallet.getKey(CHAIN_ID)
		setAddress(key.bech32Address)
	}
	const disconnect = () => {
		setAddress("")
		clearLastUsedWallet()
		setDefaultConnectionType(undefined)
		localStorage.removeItem(AUTO_CONNECT_WALLET_KEY)
		// localStorage.removeItem("walletconnect")
	}

	return (
		<KeplrContext.Provider
			value={{
				keplrStatus,
				connect,
				disconnect,
				address,
				name,
				CHAIN_ID,
				setAddress,
			}}
		>
			{children}
		</KeplrContext.Provider>
	)
}
