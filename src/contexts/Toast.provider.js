import React, { createContext, useContext, useMemo, useState } from "react"

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
	const [toastOpen, setToastOpen] = useState(false)
	const [toastText, setToastText] = useState("")
	const [toastSeverity, setToastSeverity] = useState("success")

	const closeToast = () => setToastOpen(false)
	const showToast = ({ text, severity }) => {
		setToastText(text)
		setToastSeverity(severity)
		setToastOpen(true)
	}
	const value = useMemo(
		() => ({ toastText, toastSeverity, toastOpen, closeToast, showToast }),
		[toastText, toastSeverity, toastOpen, closeToast, showToast]
	)

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
