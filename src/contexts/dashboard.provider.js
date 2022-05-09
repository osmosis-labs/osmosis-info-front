import { createContext, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
import cache from "../helpers/cache"
import { useKeplr } from "./KeplrProvider"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
import { getDaysInMonth, getTypeDashboard, getWeekNumber, timeToDateUTC } from "../helpers/helpers"
const DashboardContext = createContext()
dayjs.extend(relativeTime)
dayjs.extend(utc)
export const useDashboard = () => useContext(DashboardContext)

export const DashboardProvider = ({ children }) => {
	const { address, CHAIN_ID } = useKeplr()

	const getTypeTrx = async ({ address }) => {
		let response = await API.request({
			url: `https://api-osmosis-chain.imperator.co/txs/v1/tx/count/${address}`,
			useCompleteURL: true,
			type: "get",
		})
		let res = response.data.map((type) => {
			return {
				type: getTypeDashboard(type.type),
				count: type.count,
			}
		})
		res.sort((a, b) => {
			return b.count - a.count
		})
		return res
	}

	const getTrx = async ({ address, limit = 10, offset = 0, type }) => {
		let url = `https://api-osmosis-chain.imperator.co/txs/v1/tx/address/${address}?limit=${limit}&offset=${offset}`
		if (type) url += `&type=${type}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		let res = []
		response.data.forEach((item) => {
			let trx = {
				status: "",
				time: { display: "", value: null },
				hash: { display: "", value: null },
				types: [],
				fees: 0,
				height: 0,
				messages: [],
				chainId: "",
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

			let fees = item.tx_response.tx.auth_info.fee
			trx.fees = fees.amount.reduce((pr, cr) => pr + cr.amount, 0) / 1_000_000

			trx.height = item.height
			let types = []
			trx.messages = item.tx_response.tx.body.messages.map((message) => {
				let msg = { ...message }
				let type = msg["@type"]
				type = type.replace("/", "")
				msg.type = { value: type, display: getTypeDashboard(type) }
				if (!msg.type.display) msg.type.display = type
				if (msg.type.value === "cosmos.bank.v1beta1.MsgSend") {
					if (msg.to_address === address) {
						msg.type.display = "Receive"
					} else {
						msg.type.display = "Send"
					}
				}
				types.push(msg.type)
				return msg
			})
			trx.types = types

			trx.chainId = CHAIN_ID

			res.push(trx)
		})

		return res
	}

	const getTrades = async ({ address, limit = 10, offset = 0 }) => {
		let url = `https://api-osmosis-chain.imperator.co/swap/v1/address/${address}?limit=${limit}&offset=${offset}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		let res = []
		response.data.forEach((item) => {
			let trx = {
				status: "",
				time: { display: "", value: null },
				hash: { display: "", value: null },
				pool: {},
				tokenIn: {},
				tokenOut: {},
				address: {},
			}

			trx.status = item.code === 0 ? "success" : "failed"

			let time = new Date(item.time_tx)
			const tzOffset = new Date(item.time_tx).getTimezoneOffset()
			let sourceDate = dayjs(item.time_tx).add(-tzOffset, "minute")
			let timeAgo = dayjs(sourceDate).utc().fromNow(false)
			trx.time.display = timeAgo
			trx.time.value = time

			let hash = item.tx_hash
			let hashDisplay = hash.substring(0, 5) + "..." + hash.substring(hash.length - 5)
			trx.hash.display = hashDisplay
			trx.hash.value = hash

			let addressDisplay = item.address.substring(0, 5) + "..." + item.address.substring(item.address.length - 5)
			trx.address = { value: item.address, display: addressDisplay }

			trx.usd = item.value_usd

			trx.tokenIn = { value: item.amount_in, symbol: item.symbol_in, usd: 0 }
			if (trx.tokenIn.value != 0) {
				trx.tokenIn.usd = trx.usd / trx.tokenIn.value
			}

			trx.tokenOut = {
				value: item.amount_out ? item.amount_out : 0,
				symbol: item.symbol_out ? item.symbol_out : "",
				usd: 0,
			}
			if (trx.tokenOut.value && trx.tokenOut.value != 0) {
				trx.tokenOut.usd = trx.usd / trx.tokenOut.value
			}

			let types = [{ value: "cosmos.bank.v1beta1.MsgSend", display: getTypeDashboard("cosmos.bank.v1beta1.MsgSend") }]
			trx.types = types
			let images = []
			if (item.symbol_in) {
				images.push(
					`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${item.symbol_in.toLowerCase()}.png`
				)
			}
			if (item.symbol_out) {
				images.push(
					`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${item.symbol_out.toLowerCase()}.png`
				)
			}
			let pools = {
				images,
				name: `${item.symbol_in}/${item.symbol_out}`,
				routes: item.swap_route.routes,
			}
			trx.pools = pools
			trx.messages = [
				{
					type: types[0],
					pools: trx.pools.routes.reduce((pr, cr, ci) => {
						if (ci === 0) return cr.poolId
						else return pr + `, ${cr.poolId}`
					}, ""),
					sender: trx.address.value,
					tokenIn: { value: item.amount_in, symbol: item.symbol_in, usd: item.value_usd },
					tokenOut: {
						value: item.amount_out ? item.amount_out : 0,
						symbol: item.symbol_out ? item.symbol_out : "",
						usd: 0,
					},
					// tradeIn: { value: trx.tokenIn.usd, symbol: trx.tokenIn.symbol },
					// tradeOut: { value: trx.tokenOut.usd, symbol: trx.tokenOut.symbol },
				},
			]
			res.push(trx)
		})

		return res
	}

	const getInfoTrx = async ({ hashTRX }) => {
		let url = `https://api-osmosis-chain.imperator.co/txs/v1/tx/hash/${hashTRX}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		let trx = {
			status: "",
			time: { display: "", value: null },
			hash: { display: "", value: null },
			types: [],
			fees: 0,
			height: 0,
			messages: [],
			chainId: "",
		}

		let item = response.data[0]
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

		let fees = item.tx_response.tx.auth_info.fee
		trx.fees = fees.amount.reduce((pr, cr) => pr + cr.amount, 0) / 1_000_000

		trx.height = item.height
		let types = []
		trx.messages = item.tx_response.tx.body.messages.map((message) => {
			let msg = { ...message }
			let type = msg["@type"]
			type = type.replace("/", "")
			msg.type = { value: type, display: getTypeDashboard(type) }
			if (!msg.type.display) msg.type.display = type
			if (msg.type.value === "cosmos.bank.v1beta1.MsgSend") {
				if (msg.to_address === address) {
					msg.type.display = "Receive"
				} else {
					msg.type.display = "Send"
				}
			}
			types.push(msg.type)
			return msg
		})
		trx.types = types

		trx.chainId = CHAIN_ID

		return trx
	}

	const getAdresses = async () => {
		let url = "https://api-osmosis-chain.imperator.co/swap/v1/pool/1?only_success=false&limit=50&offset=0"
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})

		let addresses = []
		response.data.forEach((item) => {
			let address = item.address
			if (!addresses.includes(address)) addresses.push(address)
		})
		return addresses
	}

	const getWalletInfo = async ({ address }) => {
		let cachedResult = cache.getCache(
			cache.getName("walletInfo", address),
			(cachedData) => cachedData.balance.wallet.length > 0 && cachedData.exposure.pools.length > 0
		)
		if (cachedResult) {
			return cachedResult
		}

		let results = await Promise.all([
			API.request({
				url: `https://api-osmosis-chain.imperator.co/account/v1/balance/${address}`,
				useCompleteURL: true,
				type: "get",
			}),
			API.request({
				url: `https://api-osmosis-chain.imperator.co/account/v1/exposure/${address}`,
				useCompleteURL: true,
				type: "get",
			}),
		])
		let reponseBalance = results[0].data
		let responseExposure = results[1].data
		let balance = {
			osmoStaked: 0,
			osmoStakedValue: 0,
			osmoReward:0,
			osmoRewardValue:0,
			tokenValueWallet: 0,
			tokenValuePnl24h: 0,
			tokenValueChange24h: 0,
			tokenReturn24: 0,
			tokenReturnChange24: 0,
			wallet: [],
		}
		let exposure = { totalExposure: 0, pools: [], assets: [] }
		let res = { worth: 0, balance, exposure }

		if (reponseBalance.wallet && reponseBalance.wallet.length > 0) {
			balance.osmoStaked = reponseBalance.osmo_staked ? reponseBalance.osmo_staked : 0
			balance.osmoStakedValue = reponseBalance.osmo_staked_value ? reponseBalance.osmo_staked_value : 0
			balance.tokenValueWallet = reponseBalance.token_value_wallet ? reponseBalance.token_value_wallet : 0
			balance.tokenValuePnl24h = reponseBalance.token_value_pnl_24h ? reponseBalance.token_value_pnl_24h : 0
			balance.tokenValueChange24h = reponseBalance.token_value_change_24h ? reponseBalance.token_value_change_24h : 0
			balance.tokenReturn24 = reponseBalance.token_return_24h ? reponseBalance.token_return_24h : 0
			balance.tokenReturnChange24 = reponseBalance.token_return_change_24h ? reponseBalance.token_return_change_24h : 0
			balance.osmoReward = reponseBalance.osmo_reward ? reponseBalance.osmo_reward : 0
			balance.osmoRewardValue = reponseBalance.osmo_reward_value ? reponseBalance.osmo_reward_value : 0

			balance.wallet = reponseBalance.wallet.map((item) => {
				return {
					name: item.name,
					denom: item.denom,
					symbol: item.symbol,
					price: item.price,
					amount: item.amount,
					value: item.value,
					valueChange: item.value_change_24h,
					tokenPercent: item.token_percent,
				}
			})
			res.worth += balance.osmoStakedValue + balance.tokenValueWallet
			res.balance = balance
		}

		if (responseExposure.value_exposure > 0) {
			exposure.valueExposure = responseExposure.value_exposure
			exposure.totalExposure = responseExposure.value_exposure
			exposure.pools = responseExposure.pool_exposure.map((pool) => {
				return { poolId: pool.pool_id, tokens: pool.token, value: pool.pool_value, percent: pool.pool_percent }
			})
			exposure.assets = responseExposure.token_exposure.map((token) => {
				return {
					name: token.name,
					symbol: token.symbol,
					amount: token.amount,
					value: token.value,
					address: token.address,
					tokenPercent: token.token_percent,
				}
			})
			res.worth += exposure.valueExposure
			res.exposure = exposure
		}

		cache.setCache(cache.getName("walletInfo", address), res)
		return res
	}

	const getChartStacking = async ({ address, range }) => {
		let cachedResult = cache.getCache(
			cache.getName("chartStacking", address, range),
			(cachedData) => cachedData.length > 0
		)
		if (cachedResult) {
			return cachedResult
		}
		let url = `https://api-osmosis-chain.imperator.co/staking/v1/rewards/historical/${address}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		if (response.data.length > 0) {
			const data = response.data.map((item) => {
				return { time: item.day, value: item.amount }
			})

			let nbDaysLastThreeMonths = 0
			let startDate = new Date(data[0].time)
			let startDateMoreOne = new Date(new Date().setMonth(startDate.getMonth() + 1))
			let startDateMoreTwo = new Date(new Date().setMonth(startDateMoreOne.getMonth() + 2))
			nbDaysLastThreeMonths += getDaysInMonth(startDate.getMonth(), startDate.getFullYear())
			nbDaysLastThreeMonths += getDaysInMonth(startDateMoreOne.getMonth(), startDateMoreOne.getFullYear())
			nbDaysLastThreeMonths += getDaysInMonth(startDateMoreTwo.getMonth(), startDateMoreTwo.getFullYear())

			if (nbDaysLastThreeMonths > data.length) {
				nbDaysLastThreeMonths = data.length
			}
			const dataM = data.slice(0, nbDaysLastThreeMonths)
			const dataD = data.slice(0, 7)
			cache.setCache(cache.getName("chartStacking", address, "7d"), dataD)
			cache.setCache(cache.getName("chartStacking", address, "3m"), dataM)
			cache.setCache(cache.getName("chartStacking", address, "all"), data)

			if (range === "7d") return dataD
			else if (range === "3m") return dataM
			else if (range === "all") return data
		} else return []
	}

	const getLiquidityToken = async ({ address }) => {
		let url = `https://api-osmosis-chain.imperator.co/lp/v1/rewards/token/${address}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		return response.data.map((item) => item.token)
	}

	const getLiquidity = async ({ address, range, token }) => {
		let cachedResult = cache.getCache(
			cache.getName("chartStackingLiquidity", address, range, token),
			(cachedData) => cachedData.length > 0
		)
		if (cachedResult) {
			return cachedResult
		}
		let url = `https://api-osmosis-chain.imperator.co/lp/v1/rewards/historical/${address}/${token}`
		let response = await API.request({
			url,
			useCompleteURL: true,
			type: "get",
		})
		let accumulateValue = 0
		if (response.data.length > 0) {
			const dataReversed = response.data.reverse().map((item, i) => {
				accumulateValue += item.amount
				return { time: item.day, value: accumulateValue, dayValue: item.amount }
			})
			const data = dataReversed.reverse()

			let nbDaysLastThreeMonths = 0
			let startDate = new Date(data[0].time)
			let startDateMoreOne = new Date(new Date().setMonth(startDate.getMonth() + 1))
			let startDateMoreTwo = new Date(new Date().setMonth(startDateMoreOne.getMonth() + 2))
			nbDaysLastThreeMonths += getDaysInMonth(startDate.getMonth(), startDate.getFullYear())
			nbDaysLastThreeMonths += getDaysInMonth(startDateMoreOne.getMonth(), startDateMoreOne.getFullYear())
			nbDaysLastThreeMonths += getDaysInMonth(startDateMoreTwo.getMonth(), startDateMoreTwo.getFullYear())

			if (nbDaysLastThreeMonths > data.length) {
				nbDaysLastThreeMonths = data.length
			}
			const dataM = JSON.parse(JSON.stringify(data.slice(0, nbDaysLastThreeMonths)))
			const dataD = JSON.parse(JSON.stringify(data.slice(0, 7)))

			cache.setCache(cache.getName("chartStackingLiquidity", address, "7d", token), dataD)
			cache.setCache(cache.getName("chartStackingLiquidity", address, "3m", token), dataM)
			cache.setCache(cache.getName("chartStackingLiquidity", address, "all", token), data)
			if (range === "7d") return [...dataD]
			else if (range === "3m") return [...dataM]
			else if (range === "all") return [...data]
		} else return []
	}

	return (
		<DashboardContext.Provider
			value={{
				address,
				getTypeTrx,
				getTrx,
				getAdresses,
				getTrades,
				getInfoTrx,
				getWalletInfo,
				getChartStacking,
				getLiquidity,
				getLiquidityToken,
			}}
		>
			{children}
		</DashboardContext.Provider>
	)
}
