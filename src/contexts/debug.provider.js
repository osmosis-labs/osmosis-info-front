import { createContext, useContext, useEffect, useState } from "react"
const DebugContext = createContext()

export const useDebug = () => useContext(DebugContext)

export const DebugProvider = ({ children, MODE }) => {
	const [open, setOpen] = useState(false)
	const onClose = () => setOpen(false)
	const [isAccumulated, setIsAccumulated] = useState(true)
	const [isStakingAccumulated, setIsStakingAccumulated] = useState(true)
	const [isLoadingDebug, setLoadingDebug] = useState(false)
	const [aprError, setAprError] = useState(false)
	const [mcapError, setMcapError] = useState(false)

	const value = {
		open,
		onClose,
		MODE,
		setOpen,
		isAccumulated,
		setIsAccumulated,
		isStakingAccumulated,
		setIsStakingAccumulated,
		isLoadingDebug,
		setLoadingDebug,
		aprError,
		setAprError,
		mcapError,
		setMcapError,
	}

	return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
}
