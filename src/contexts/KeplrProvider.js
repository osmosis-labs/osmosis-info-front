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
	const wm = useWalletManager()
	const { getWallet, clearLastUsedWallet, setDefaultConnectionType, connectionType } = wm
	let defaultAddress = ""
	if (MODE === "dev") defaultAddress = "" //"osmo12zkpu48ssu0h32uaccz29f5z6atyle7j6tpyeg"
	const [address, setAddress] = useState(defaultAddress)
	const [name, setName] = useState("")

	useEffect(() => {
		document.addEventListener("readystatechange", documentStateChange)
		return () => document.removeEventListener("readystatechange", documentStateChange)
	}, [])

	useEffect(() => {
		window.addEventListener("keplr_keystorechange", keplrChangeKey)
		return () => window.removeEventListener("keplr_keystorechange", keplrChangeKey)
	}, [])

	useEffect(() => {
		if (connectionType) {
			localStorage.setItem(AUTO_CONNECT_WALLET_KEY, connectionType)
		}
	}, [connectionType])

	const documentStateChange = (event) => {
		if (event.target && event.target.readyState === "complete") {
			if (window.keplr) setKeplrStatus("installed")
		}
	}

	const keplrChangeKey = async (event) => {
		const wallet = await getWallet()
		await wallet.enable([CHAIN_ID])
		const key = await wallet.getKey(CHAIN_ID)
		setAddress(key.bech32Address)
		setName(key.name)
	}

	const connect = async () => {
		const wallet = await getWallet()
		await wallet.enable([CHAIN_ID])
		const key = await wallet.getKey(CHAIN_ID)
		setAddress(key.bech32Address)
		setName(key.name)
	}
	const disconnect = () => {
		setAddress("")
		setName("")
		clearLastUsedWallet()
		setDefaultConnectionType(undefined)
		localStorage.removeItem("walletconnect")
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
