import { createContext, useContext, useEffect, useState } from "react"
const ChangeLogContext = createContext()

export const useChangeLog = () => useContext(ChangeLogContext)

export const ChangeLogProvider = ({ children }) => {
	const [open, setOpen] = useState(false)
	const onClose = () => setOpen(false)
	const onOpen = () => setOpen(true)

	const value = {
		open,
		onClose,
		onOpen,
	}

	return <ChangeLogContext.Provider value={value}>{children}</ChangeLogContext.Provider>
}
