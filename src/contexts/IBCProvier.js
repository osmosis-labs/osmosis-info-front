import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"

export const MIN_CONGESTED = 5
export const MIN_BLOCKED = 20
const IBCContext = createContext()

export const useIBC = () => useContext(IBCContext)

export const IBCProvider = ({ children }) => {
	const [statusNormal, setStatusNormal] = useState(0)
	const [statusCongested, setStatusCongested] = useState(0)
	const [statusBlocked, setStatusBlocked] = useState(0)

	const [ibc, setIBC] = useState([])
	const [ibcCouple, setIBCCOuple] = useState([])

	const [loaderIBC, setLoaderIBC] = useState(false)

	const getData = async () => {
		setLoaderIBC(true)
		API.request({ url: "ibc/v1/all?dex=osmosis", type: "get" })
			.then((res) => {
				setIBC(res.data)
				let ibcCouple = []
				let statusNormal = 0
				let statusCongested = 0
				let statusBlocked = 0
				let currentCouple = []

				res.data.forEach((ibc) => {
					currentCouple.push(ibc)

					if (currentCouple.length === 2) {
						ibcCouple.push(currentCouple)
						currentCouple = []
					}

					if (ibc.duration_minutes < MIN_CONGESTED) {
						statusNormal++
					} else if (ibc.duration_minutes < MIN_BLOCKED) {
						statusCongested++
					} else {
						statusBlocked++
					}
				})
				setStatusNormal(statusNormal)
				setStatusCongested(statusCongested)
				setStatusBlocked(statusBlocked)
				setIBCCOuple(ibcCouple)
				setLoaderIBC(false)
			})
			.catch((err) => {
				console.log("%cIBCProvier.js -> 52 ERROR: err", "background: #FF0000; color:#FFFFFF", err)
				setLoaderIBC(false)
			})
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<IBCContext.Provider
			value={{
				ibcCouple,
				ibc,
				statusNormal,
				statusCongested,
				statusBlocked,
				getData,
				loaderIBC,
			}}
		>
			{children}
		</IBCContext.Provider>
	)
}
