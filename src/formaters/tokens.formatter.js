import { formatTokenName, getWeekNumber, timeToDateUTC } from "../helpers/helpers"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
import { getImageFromAsset } from "../hooks/data/assets.hook"
dayjs.extend(relativeTime)
dayjs.extend(utc)

export const defaultMCap = []

export const defaultTokens = { all: [], main: [], frontier: [], current: [] }
export const formatTokens = (data, mcap, assets) => {
	let res = { all: [], main: [], frontier: [], current: [] }
	data.sort((a, b) => {
		if (a.liquidity > b.liquidity) return -1
		if (a.liquidity < b.liquidity) return 1
		return 0
	})

	data.forEach((row, index) => {
		const currentAsset = assets[row.symbol.toUpperCase()]
		let token = {
			id: index + 1,
			denom: row.denom,
			price: row.price,
			symbol: row.symbol,
			symbolDisplay: formatTokenName(row.symbol),
			liquidity: row.liquidity,
			volume24h: row.volume_24h,
			volume24hChange: row.volume_24h_change,
			name: row.name,
			main: currentAsset && currentAsset.main,
			price24hChange: row.price_24h_change,
			mcap: 0,
		}
		let mcapToken = mcap.find((mc) => {
			return mc.symbol == token.symbol
		})
		if (mcapToken) {
			token.mcap = mcapToken.market_cap
		}
		if (token.main) {
			res.main.push(token)
		}
		res.frontier.push(token)
		res.all.push(token)
		if (!currentAsset) {
			console.log("%ctokens.formatter.js -> 23 YELLOW: TOKEN NOT IN ASSETS LIST", 'background: #fff176; color:#212121', token)
		}
	})
	return res
}

export const defaultToken = {
	main: false,
	price: 0,
	denom: "",
	symbol: "",
	symbolDisplay: "",
	liquidity: 0,
	liquidity24hChange: 0,
	volume24h: 0,
	volume24hChange: 0,
	name: "",
	price24hChange: "",
	mcap: 0,
}
export const formatToken = (data, mcap, assets) => {
	const currentAsset = assets[data.symbol.toUpperCase()]
	let token = { ...defaultToken }
	token.price = data.price
	token.denom = data.denom
	token.symbol = data.symbol
	token.symbolDisplay = formatTokenName(data.symbol)
	token.liquidity = data.liquidity
	token.liquidity24hChange = data.liquidity_24h_change
	token.volume24h = data.volume_24h
	token.volume24hChange = data.volume_24h_change
	token.name = data.name
	token.price24hChange = data.price_24h_change
	token.main = currentAsset && currentAsset.main
	let mcapToken = mcap.find((mc) => {
		return mc.symbol == token.symbol
	})
	if (mcapToken) {
		token.mcap = mcapToken.market_cap
	}
	if (!currentAsset) {
		console.log("%ctokens.formatter.js -> 90 YELLOW: TOKEN NOT IN ASSETS LIST", 'background: #fff176; color:#212121', token)
	}
	return token
}

export const defaultTrxToken = []
export const formatTrxToken = (data, symbol, assets) => {
	let res = data.map((trx) => {
		let time = new Date(trx.time_tx)
		const tzOffset = new Date(trx.time_tx).getTimezoneOffset()
		let sourceDate = dayjs(trx.time_tx).add(-tzOffset, "minute")

		let timeAgo = dayjs(sourceDate).utc().fromNow(false)
		let addressDisplay = trx.address.substring(0, 5) + "..." + trx.address.substring(trx.address.length - 5)
		let hashDisplay = trx.tx_hash.substring(0, 5) + "..." + trx.tx_hash.substring(trx.tx_hash.length - 5)

		let symbolInDisplay = formatTokenName(trx.symbol_in)
		let symbolOutDisplay = formatTokenName(trx.symbol_out)

		let pools = {
			images: [
				getImageFromAsset(assets, { symbol: trx.symbol_in }),
				getImageFromAsset(assets, { symbol: trx.symbol_out }),
			],
			name: `${trx.symbol_in}/${trx.symbol_out}`,
			nameDisplay: `${symbolInDisplay}/${symbolOutDisplay}`,
			routes: trx.swap_route.routes.map((route) => {
				return {
					...route,
					poolNameDisplay: formatTokenName(route.poolName),
					tokenOutSymbolDisplay: formatTokenName(route.tokenOutSymbol),
				}
			}),
		}
		return {
			type: trx.symbol_out === symbol ? "Buy" : "Sell",
			time: { value: time, display: sourceDate.format("DD/MM/YY HH:mm:ss") },
			hash: { value: trx.tx_hash, display: hashDisplay },
			address: { value: trx.address, display: addressDisplay },
			tokenIn: { value: trx.amount_in, symbol: trx.symbol_in, symbolDisplay: symbolInDisplay },
			tokenOut: { value: trx.amount_out, symbol: trx.symbol_out, symbolDisplay: symbolOutDisplay },
			value: trx.value_usd,
			pools,
		}
	})
	return res
}

export const defaultVolumeToken = { d: [], w: [], m: [] }
export const formatVolumeToken = (data) => {
	let res = { ...defaultVolumeToken }
	let dataW = []
	let currentWeek = { time: data[0].time, value: 0 }
	let dataM = []
	let currentMonth = { time: data[0].time, value: 0 }
	data.forEach((item) => {
		let currentDate = timeToDateUTC(item.time)
		let dateMonth = timeToDateUTC(currentMonth.time)
		if (currentDate.getMonth() === dateMonth.getMonth()) {
			currentMonth.value += item.value
		} else {
			dataM.push(currentMonth)
			currentMonth = { time: item.time, value: item.value }
		}
		let dateOfCurrentWeek = timeToDateUTC(currentWeek.time)
		let numberOfWeek = getWeekNumber(currentDate)
		let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
		if (numberOfWeek === numberOfWeekOfCurrentWeek) {
			currentWeek.value += item.value
		} else {
			dataW.push(currentWeek)
			currentWeek = { time: item.time, value: item.value }
		}
	})
	dataW.push(currentWeek)
	dataM.push(currentMonth)
	res.d = data
	res.w = dataW
	res.m = dataM
	return res
}

export const defaultLiquidityToken = { d: [], w: [], m: [] }
export const formatLiquidityToken = (data) => {
	let res = { ...defaultLiquidityToken }
	let dataW = []
	let currentWeek = { time: data[0].time, value: 0 }
	let dataM = []
	let currentMonth = { time: data[0].time, value: 0 }
	data.forEach((item) => {
		let currentDate = timeToDateUTC(item.time)
		let dateMonth = timeToDateUTC(currentMonth.time)
		if (currentDate.getMonth() === dateMonth.getMonth()) {
			currentMonth.value = item.value
		} else {
			dataM.push(currentMonth)
			currentMonth = { time: item.time, value: item.value }
		}
		let dateOfCurrentWeek = timeToDateUTC(currentWeek.time)
		let numberOfWeek = getWeekNumber(currentDate)
		let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
		if (numberOfWeek === numberOfWeekOfCurrentWeek) {
			currentWeek.value = item.value
		} else {
			dataW.push(currentWeek)
			currentWeek = { time: item.time, value: item.value }
		}
	})
	dataW.push(currentWeek)
	dataM.push(currentMonth)
	res.d = data
	res.w = dataW
	res.m = dataM
	return res
}

export const defaultHistoricalToken = []
export const formatHistoricalToken = (data) => {
	let res = data
	return res
}
