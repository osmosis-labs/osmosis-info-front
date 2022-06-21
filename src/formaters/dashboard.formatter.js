import { formatTokenName, getDaysInMonth, getTypeDashboard } from "../helpers/helpers"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
dayjs.extend(utc)

export const defaultBalance = {
	osmoStaked: 0,
	osmoStakedValue: 0,
	osmoReward: 0,
	osmoRewardValue: 0,
	tokenValueWallet: 0,
	tokenValuePnl24h: 0,
	tokenValueChange24h: 0,
	tokenReturn24: 0,
	tokenReturnChange24: 0,
	wallet: [],
}
export const formatBalance = (data) => {
	let balance = { ...defaultBalance }
	if (data.wallet && data.wallet.length > 0) {
		balance.osmoStaked = data.osmo_staked ? data.osmo_staked : 0
		balance.osmoStakedValue = data.osmo_staked_value ? data.osmo_staked_value : 0
		balance.tokenValueWallet = data.token_value_wallet ? data.token_value_wallet : 0
		balance.tokenValuePnl24h = data.token_value_pnl_24h ? data.token_value_pnl_24h : 0
		balance.tokenValueChange24h = data.token_value_change_24h ? data.token_value_change_24h : 0
		balance.tokenReturn24 = data.token_return_24h ? data.token_return_24h : 0
		balance.tokenReturnChange24 = data.token_return_change_24h ? data.token_return_change_24h : 0
		balance.osmoReward = data.osmo_reward ? data.osmo_reward : 0
		balance.osmoRewardValue = data.osmo_reward_value ? data.osmo_reward_value : 0

		balance.wallet = data.wallet.map((item) => {
			return {
				name: item.name,
				nameDisplay: formatTokenName(item.name),
				denom: item.denom,
				symbol: item.symbol,
				symbolDisplay: formatTokenName(item.symbol),
				price: item.price,
				amount: item.amount,
				value: item.value,
				valueChange: item.value_change_24h,
				tokenPercent: item.token_percent,
			}
		})
	}
	return balance
}

export const defaultExposure = { totalExposure: 0, valueExposure: 0, pools: [], assets: [] }
export const formatExposure = (data) => {
	let exposure = { ...defaultExposure }
	if (data.value_exposure > 0) {
		exposure.valueExposure = data.value_exposure
		exposure.totalExposure = data.value_exposure
		exposure.pools = data.pool_exposure.map((pool) => {
			return {
				poolId: pool.pool_id,
				tokens: pool.token.map((token) => ({
					...token,
					symbolDisplay: formatTokenName(token.symbol),
				})),
				value: pool.pool_value,
				percent: pool.pool_percent,
			}
		})
		exposure.assets = data.token_exposure.map((token) => {
			return {
				name: token.name,
				nameDisplay: formatTokenName(token.name),
				symbol: token.symbol,
				symbolDisplay: formatTokenName(token.symbol),
				amount: token.amount,
				value: token.value,
				address: token.address,
				tokenPercent: token.token_percent,
			}
		})
	}
	return exposure
}

export const defaultWorth = 0
export const formatWorth = (balance, exposure) => {
	let worth = 0
	worth += balance.osmoStakedValue + balance.tokenValueWallet
	worth += exposure.valueExposure
	return worth
}

export const defaultChartStaking = { "7d": [], "3m": [], all: [] }
export const formatChartStaking = (chartData, isAccumulated = true) => {
	let res = { ...defaultChartStaking }
	if (chartData.length > 0) {
		let accumulateValue = 0
		const dataReversed = chartData.reverse().map((item) => {
			accumulateValue += item.amount
			return { time: item.day, value: isAccumulated ? accumulateValue : item.amount, dayValue: item.amount }
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
		const dataM = data.slice(0, nbDaysLastThreeMonths)
		const dataD = data.slice(0, 7)
		res["7d"] = dataD
		res["3m"] = dataM
		res["all"] = data
	}
	return res
}

export const defaultLiquidityToken = []
export const formatLiqudityToken = (data) => {
	return data.map((item) => {
		return { symbol: item.token, symbolDisplay: formatTokenName(item.token) }
	})
}

export const defaultLiquidity = { "7d": [], "3m": [], all: [] }
export const formatLiqudity = (dataLiquidity, isAccumulated = true) => {
	let res = { ...defaultLiquidity }

	let accumulateValue = 0
	if (dataLiquidity.length > 0) {
		const dataReversed = dataLiquidity.reverse().map((item, i) => {
			accumulateValue += item.amount
			return { time: item.day, value: isAccumulated ? accumulateValue : item.amount, dayValue: item.amount }
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
		res["7d"] = dataD
		res["3m"] = dataM
		res["all"] = data
	}
	return res
}

export const defaultTypeTrx = []
export const formatTypeTrx = (data, exclude) => {
	let res = []
	data.forEach((type) => {
		if (exclude.length === 0 || !exclude.includes(type.type)) {
			res.push({
				type: getTypeDashboard(type.type),
				count: type.count,
			})
		}
	})
	res.sort((a, b) => {
		return b.count - a.count
	})
	return res
}

export const defaultTrxs = []
export const formatTrxs = (data, { chainId, address }) => {
	let res = []
	data.forEach((item) => {
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
		trx.time.display = sourceDate.format("DD/MM/YY HH:mm:ss")
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

		trx.chainId = chainId

		res.push(trx)
	})

	return res
}

export const defaultTrades = []
export const formatTrades = (data, assets) => {
	let res = []
	data.forEach((item) => {
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
		trx.time.display = sourceDate.format("DD/MM/YY HH:mm:ss")
		trx.time.value = time

		let hash = item.tx_hash
		let hashDisplay = hash.substring(0, 5) + "..." + hash.substring(hash.length - 5)
		trx.hash.display = hashDisplay
		trx.hash.value = hash

		let addressDisplay = item.address.substring(0, 5) + "..." + item.address.substring(item.address.length - 5)
		trx.address = { value: item.address, display: addressDisplay }

		trx.usd = item.value_usd

		let symbolInDisplay = formatTokenName(item.symbol_in)
		let symbolOutDisplay = item.symbol_out ? formatTokenName(item.symbol_out) : ""
		trx.tokenIn = {
			value: item.amount_in,
			symbol: item.symbol_in,
			symbolDisplay: symbolInDisplay,
			usd: 0,
		}
		if (trx.tokenIn.value != 0) {
			trx.tokenIn.usd = trx.usd / trx.tokenIn.value
		}

		trx.tokenOut = {
			value: item.amount_out ? item.amount_out : 0,
			symbol: item.symbol_out ? item.symbol_out : "",
			symbolDisplay: symbolOutDisplay,
			usd: 0,
		}
		if (trx.tokenOut.value && trx.tokenOut.value != 0) {
			trx.tokenOut.usd = trx.usd / trx.tokenOut.value
		}

		let types = [{ value: "cosmos.bank.v1beta1.MsgSend", display: getTypeDashboard("cosmos.bank.v1beta1.MsgSend") }]
		trx.types = types
		let images = []
		if (item.symbol_in) {
			images.push(assets[item.symbol_in]?.image)
		}
		if (item.symbol_out) {
			images.push(assets[item.symbol_out]?.image)
		}

		let pools = {
			images,
			name: `${item.symbol_in}/${item.symbol_out}`,
			nameDisplay: `${symbolInDisplay}/${symbolOutDisplay}`,
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
				tokenIn: {
					value: item.amount_in,
					symbol: item.symbol_in,
					symbolInDisplay: symbolInDisplay,
					usd: item.value_usd,
				},
				tokenOut: {
					value: item.amount_out ? item.amount_out : 0,
					symbol: item.symbol_out ? item.symbol_out : "",
					symbolDisplay: symbolOutDisplay,
					usd: 0,
				},
			},
		]
		res.push(trx)
	})

	return res
}

export const defaultTrx = {
	status: "",
	time: { display: "", value: new Date() },
	hash: { display: "", value: "" },
	types: [],
	fees: 0,
	height: 0,
	messages: [],
	chainId: "",
}
export const formatTrx = (data, { chainId, address }) => {
	let item = data[0]
	let trx = { ...defaultTrx }
	trx.status = item.tx_response.code === 0 ? "success" : "failed"

	let time = new Date(item.time_tx)
	const tzOffset = new Date(item.time_tx).getTimezoneOffset()
	let sourceDate = dayjs(item.time_tx).add(-tzOffset, "minute")
	let timeAgo = dayjs(sourceDate).utc().fromNow(false)
	trx.time.display = sourceDate.format("DD/MM/YY HH:mm:ss")
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

	trx.chainId = chainId

	return trx
}
