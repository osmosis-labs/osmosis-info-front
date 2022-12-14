import { createContext, useContext, useState } from "react"
const EventThemeContext = createContext()

export const useEventTheme = () => useContext(EventThemeContext)

export const EventThemeProvider = ({ children }) => {
    const [show, setShow] = useState(true)
    const onToggle = () => {
        setShow(!show)
    }

    const value = {
        show,
        onToggle,
    }

    return <EventThemeContext.Provider value={value}>{children}</EventThemeContext.Provider>
}
