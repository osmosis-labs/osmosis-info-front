import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
import { useKeplr } from "./KeplrProvider"

const DashboardContext = createContext()

export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }) => {
	const { address } = useKeplr()

	const getNbTransaction = async () => {
		let response = await API.request({
			url: `https://api-osmosis-chain.imperator.co/txs/v1/tx/count/${address}`,
            useCompleteURL: true,
			type: "get",
		})
        return response.data
	}

	return <DashboardContext.Provider value={{ address, getNbTransaction }}>{children}</DashboardContext.Provider>
}
