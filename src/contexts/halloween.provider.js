import { createContext, useContext, useState } from "react"
const HalloweenContext = createContext()

export const useHalloween = () => useContext(HalloweenContext)

export const HalloweenProvider = ({ children }) => {
	const [show, setShow] = useState(true)
	const onToggle = () => {
		setShow(!show)
	}

	const value = {
		show,
		onToggle,
	}

	return <HalloweenContext.Provider value={value}>{children}</HalloweenContext.Provider>
}
