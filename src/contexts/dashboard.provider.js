import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
import { useKeplr } from "./KeplrProvider"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
const DashboardContext = createContext()
dayjs.extend(relativeTime)
dayjs.extend(utc)
export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }) => {
	const { address } = useKeplr()

	const getTypeTrx = async ({ address }) => {
		let response = await API.request({
			url: `https://api-osmosis-chain.imperator.co/txs/v1/tx/count/${address}`,
			useCompleteURL: true,
			type: "get",
		})
		return response.data
	}

	const getTrx = async ({ address, limit = 50, offset = 0, type }) => {
		let url = `https://api-osmosis-chain.imperator.co/txs/v1/tx/address/${address}?limit=${limit}&offset=${offset}`
		if (type) url += `&type=${type}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		console.log(
			"%cDashboard.provider.js -> 32 PURPLE: response.data",
			"background: #9c27b0; color:#FFFFFF",
			response.data
		)
		let res = []
		response.data.forEach((item) => {
			let trx = {
				status: "",
				time: { display: "", value: null },
				hash: { display: "", value: null },
				type: [],
				fees: 0,
				height: 0,
				messages: [],
			}

			trx.status = item.tx_response.code === 0 ? "success" : "failed"

			let time = new Date(item.time_tx)
			const tzOffset = new Date(item.time_tx).getTimezoneOffset()
			let sourceDate = dayjs(item.time_tx).add(-tzOffset, "minute")
			let timeAgo = dayjs(sourceDate).utc().fromNow(false)
			trx.time.display = timeAgo
			trx.time.value = time

			let hash = item.tx_response.txhash
			let hashDisplay = hash.substring(0, 5) + "..." + hash.substring(hash.length - 5)
			trx.hash.display = hashDisplay
			trx.hash.value = hash

			trx.type = item.tx_response.tx["@type"]

			let fees = item.tx_response.tx.auth_info.fee
			trx.fees = fees.amount[0].amount / 1_000_000

			trx.height = item.height

			trx.messages = item.tx_response.tx.body.messages

			res.push(trx)
		})
		return res
	}

	return <DashboardContext.Provider value={{ address, getTypeTrx, getTrx }}>{children}</DashboardContext.Provider>
}
