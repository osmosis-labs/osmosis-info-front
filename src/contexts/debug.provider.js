import { createContext, useContext, useEffect, useState } from "react"
const DebugContext = createContext()

const MODE = process.env.REACT_APP_MODE

export const useDebug = () => useContext(DebugContext)

export const DebugProvider = ({ children }) => {
	const [open, setOpen] = useState(false)
	const onClose = () => setOpen(false)
	const [isAccumulated, setIsAccumulated] = useState(true)
	const [isStakingAccumulated, setIsStakingAccumulated] = useState(true)
	const [message, setMessage] = useState("The Terra blockchain has resumed with on-chain swaps disabled and IBC channels closed. LUNA and UST pools rewards will drain shortly")
	const [messageLevel, setMessageLevel] = useState("info")

	const value = {
		open,
		onClose,
		MODE,
		setOpen,
		isAccumulated,
		setIsAccumulated,
		isStakingAccumulated,
		setIsStakingAccumulated,
		message,
		setMessage,
		messageLevel,
		setMessageLevel,
	}

	return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
}
