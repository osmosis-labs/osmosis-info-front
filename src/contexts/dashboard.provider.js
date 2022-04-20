import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
import { useKeplr } from "./KeplrProvider"

const DashboardContext = createContext()

export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }) => {
	const { address } = useKeplr()

	return <DashboardContext.Provider value={{ address }}>{children}</DashboardContext.Provider>
}
