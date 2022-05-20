import { formatTokenName, getInclude, getItemInclude, getWeekNumber, timeToDateUTC } from "../helpers/helpers"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
dayjs.extend(relativeTime)
dayjs.extend(utc)

export const defaultPool = {
	id: 0,
	name: "",
	nameDisplay: "",
	liquidity: 0,
	liquidity24hChange: 0,
	volume7d: 0,
	volume24h: 0,
	volume24hChange: 0,
	fees: 0,
	apr: {},
	main: false,
}
export const defaultTokensPool = []
export const formatTokensPool = (data) => {
	let res = data.map((pool) => {
		return { ...pool, symbolDisplay: formatTokenName(pool.symbol) }
	})
	return res
}

export const defaultPools = { all: [], main: [], frontier: [], current: [] }

export const formatPools = (dataPools, dataAPR, allTokens) => {
	let res = { ...defaultPools }
	Object.keys(dataPools).forEach((key) => {
		let row = dataPools[key]
		let apr = null
		let indexAPR = getInclude(dataAPR, (apr) => {
			return apr.pool_id + "" === key
		})
		if (indexAPR !== -1) {
			apr = { display: { total: 0, internal: 0, external: 0 } }

			dataAPR[indexAPR].apr_list.forEach((aprItem) => {
				if (aprItem.symbol === "OSMO") {
					let date = new Date(aprItem.start_date)
					if (date <= new Date()) {
						let token = getItemInclude(allTokens, (token) => aprItem.symbol === token.symbol)
						if (!apr.internal) {
							apr.internal = { apr1d: 0, apr7d: 0, apr14d: 0, token }
						}
						apr.internal.apr1d = aprItem.apr_1d
						apr.internal.apr7d = aprItem.apr_7d
						apr.internal.apr14d = aprItem.apr_14d
						apr.internal.token = { ...token, symbolDisplay: token ? formatTokenName(token.symbol) : "" }
					}
				} else {
					let date = new Date(aprItem.start_date)
					if (date <= new Date()) {
						let token = getItemInclude(allTokens, (token) => aprItem.symbol === token.symbol)
						if (!apr.external) {
							apr.external = { apr1d: 0, apr7d: 0, apr14d: 0, token }
						}
						apr.external.apr1d += aprItem.apr_1d
						apr.external.apr7d += aprItem.apr_7d
						apr.external.apr14d += aprItem.apr_14d
						apr.external.token = { ...token, symbolDisplay: token ? formatTokenName(token.symbol) : "" }
					}
				}
			})
			if (apr.internal) {
				apr.display.internal = apr.internal.apr14d
				apr.display.total += apr.internal.apr14d
			}
			if (apr.external) {
				apr.display.external = apr.external.apr14d
				apr.display.total += apr.external.apr14d
			}
		}
		let main = true
		let index = 0
		while (main && index < row.length) {
			if (!row[index].main) {
				main = false
			}
			index++
		}
		let pool = {
			id: key,
			name: row.reduce((acc, currentValue) => {
				let symbolName = currentValue.symbol.length === 0 ? currentValue.denom : currentValue.symbol
				return `${acc}${acc.length > 0 ? "/" : ""}${symbolName}`
			}, ""),
			nameDisplay: row.reduce((acc, currentValue) => {
				let symbolName = currentValue.symbol.length === 0 ? currentValue.denom : currentValue.symbol
				symbolName = formatTokenName(symbolName)
				return `${acc}${acc.length > 0 ? "/" : ""}${symbolName}`
			}, ""),
			liquidity: row[0].liquidity,
			liquidity24hChange: row[0].liquidity_24h_change,
			volume7d: row[0].volume_7d,
			volume24h: row[0].volume_24h,
			volume24hChange: row[0].volume_24h_change,
			fees: parseFloat(row[0].fees),
			apr,
			main,
		}
		if (pool.main) {
			res.main.push(pool)
		}
		res.frontier.push(pool)
		res.all.push(pool)
	})
	return res
}

export const defaultPoolTrx = []
export const formatPoolTrx = (data) => {
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
				`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${trx.symbol_in.toLowerCase()}.png`,
				`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${trx.symbol_out.toLowerCase()}.png`,
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
			hash: { value: trx.tx_hash, display: hashDisplay },
			time: { value: time, display: timeAgo },
			pools,
			tokenIn: { value: trx.amount_in, symbol: trx.symbol_in, symbolDisplay: symbolInDisplay },
			tokenOut: { value: trx.amount_out, symbol: trx.symbol_out, symbolDisplay: symbolOutDisplay },
			usd: trx.value_usd,
			address: { value: trx.address, display: addressDisplay },
		}
	})
	return res
}

export const defaultHistoricalPool = []
export const formatHistoricalPool = (data) => {
	let res = data
	return res
}

export const defaultLiquidityPool = { d: [], w: [], m: [] }
export const formatLiquidityPool = (data) => {
	let res = { ...defaultLiquidityPool }
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

export const defaultVolumePool = { d: [], w: [], m: [] }
export const formatVolumePool = (data) => {
	let res = { ...defaultVolumePool }
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
