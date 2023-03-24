import { createContext, useContext, useEffect, useState } from "react"
import { useWalletManager } from "cosmodal"
import { useDebug } from "./debug.provider"
const KeplrContext = createContext()
const CHAIN_ID = "osmosis-1"
const KEY_ADDRESS = "osmosis-info-address"
const KEY_NAME = "osmosis-info-name"

const saveLogin = (name, address) => {
	localStorage.setItem(KEY_ADDRESS, address);
	localStorage.setItem(KEY_NAME, name);
}

const removeLogin = () => {
	localStorage.removeItem(KEY_ADDRESS);
	localStorage.removeItem(KEY_NAME);
}

const getLogin = () => {
	return { name: localStorage.getItem(KEY_NAME), address: localStorage.getItem(KEY_ADDRESS) }
}

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


	const documentStateChange = async (event) => {
		if (event.target && event.target.readyState === "complete") {
			if (window.keplr) {
				setKeplrStatus("installed")
				const data = getLogin()
				if (data.name && data.address) {
					setAddress(data.address)
					setName(data.name)

				}

			}
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
		saveLogin(key.name, key.bech32Address)
	}
	const disconnect = () => {
		setAddress("")
		setName("")
		clearLastUsedWallet()
		setDefaultConnectionType(undefined)
		removeLogin()
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
