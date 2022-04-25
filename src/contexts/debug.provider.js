import { createContext, useContext, useEffect, useState } from "react"
const DebugContext = createContext()

export const useDebug = () => useContext(DebugContext)

export const DebugProvider = ({ children }) => {
	const [open, setOpen] = useState(false)
	const onClose = () => setOpen(false)

	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.ctrlKey && event.altKey && event.shiftKey && event.key === "D") {
				setOpen(!open)
			}
		}
		document.addEventListener("keydown", onKeyDown)

		return () => {
			document.removeEventListener("keydown", onKeyDown)
		}
	}, [])

	return <DebugContext.Provider value={{ open, onClose }}>{children}</DebugContext.Provider>
}
