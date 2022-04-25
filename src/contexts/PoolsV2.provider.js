import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs"
import { getInclude, getItemInclude, getWeekNumber, timeToDateUTC } from "../helpers/helpers"
import { useTokensV2 } from "./TokensV2.provider"
import { useSettings } from "./SettingsProvider"
const PoolsV2Context = createContext()

export const usePoolsV2 = () => useContext(PoolsV2Context)

export const PoolsV2Provider = ({ children }) => {
	const [pools, setPools] = useState([])
	const [allPools, setAllPools] = useState([])
	const { allTokens } = useTokensV2()
	const { settings } = useSettings()

	const [poolsAPR, setPoolsAPR] = useState([])
	const saveData = useRef({})
	const [loadingPools, setLoadingPools] = useState(true)
	const [loadingPool, setLoadingPool] = useState(true)
	const [loadingPoolChart, setLoadingPoolChart] = useState(true)
	const [loadingTrx, setLoadingTrx] = useState(true)
	const saveDataChart = useRef({})

	const getName = (chartType, range = "-", poolId = "-") => {
		return chartType + "-" + range + "-" + poolId
	}

	const getNamePrice = (chartType, poolId = "-", denomIn = "-", denomOut = "-", range = "-") => {
		return chartType + "-" + poolId + "-" + denomIn + "-" + denomOut + "-" + range
	}

	const getChartPool = useCallback(async ({ poolId, denomIn, denomOut, range }) => {
		if (range === "all") range = "50y"
		setLoadingPoolChart(true)
		if (
			saveDataChart.current[getNamePrice("price", poolId, denomIn, denomOut, range)] &&
			saveDataChart.current[getNamePrice("price", poolId, denomIn, denomOut, range)].length > 0
		) {
			setLoadingPoolChart(false)
			return saveDataChart.current[getNamePrice("price", poolId, denomIn, denomOut, range)]
		} else {
			let response = await API.request({
				url: `pairs/v1/historical/${poolId}/chart?asset_in=${denomIn}&asset_out=${denomOut}&range=${range}&asset_type=denom`,
				type: "get",
			})
			saveDataChart.current = {
				...saveDataChart.current,
				[getNamePrice("price", poolId, denomIn, denomOut, range)]: response.data,
			}
			setLoadingPoolChart(false)
			return response.data
		}
	}, [])

	const getTrxPool = async ({ poolId, limit = 10, offset = 0 }) => {
		setLoadingTrx(true)
		let data = []
		if (
			saveDataChart.current[getName("trx", poolId)] &&
			saveDataChart.current[getName("trx", poolId, limit, offset)].length > 0
		) {
			data = saveDataChart.current[getName("trx", poolId, limit, offset)]
			return data
		} else {
			let response = await API.request({
				url: `https://api-osmosis-chain.imperator.co/swap/v1/pool/${poolId}?only_success=true&limit=${limit}&offset=${offset}`,
				type: "get",
				useCompleteURL: true,
			})
			dayjs.extend(relativeTime)
			dayjs.extend(utc)

			data = response.data.map((trx) => {
				let time = new Date(trx.time_tx)
				const tzOffset = new Date(trx.time_tx).getTimezoneOffset()
				let sourceDate = dayjs(trx.time_tx).add(-tzOffset, "minute")

				let timeAgo = dayjs(sourceDate).utc().fromNow(false)

				let addressDisplay = trx.address.substring(0, 5) + "..." + trx.address.substring(trx.address.length - 5)
				let hashDisplay = trx.tx_hash.substring(0, 5) + "..." + trx.tx_hash.substring(trx.tx_hash.length - 5)
				let pools = {
					images: [
						`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${trx.symbol_in.toLowerCase()}.png`,
						`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${trx.symbol_out.toLowerCase()}.png`,
					],
					name: `${trx.symbol_in}/${trx.symbol_out}`,
					routes: trx.swap_route.routes,
				}
				return {
					hash: { value: trx.tx_hash, display: hashDisplay },
					time: { value: time, display: timeAgo },
					pools,
					tokenIn: { value: trx.amount_in, symbol: trx.symbol_in },
					tokenOut: { value: trx.amount_out, symbol: trx.symbol_out },
					usd: trx.value_usd,
					address: { value: trx.address, display: addressDisplay },
				}
			})
			saveDataChart.current = { ...saveDataChart.current, [getName("trx", poolId, limit, offset)]: data }
		}
		setLoadingTrx(false)
		return data
	}

	const getPools = useCallback(
		async ({ lowLiquidity = false }) => {
			setLoadingPools(true)

			if (
				saveData.current[getName("pools", lowLiquidity)] &&
				saveData.current[getName("pools", lowLiquidity)].length > 0
			) {
				let data = saveData.current[getName("pools", lowLiquidity)]
				if (settings.type === "app") {
					data = data.filter((item) => item.main)
				} else {
					data = data.filter((item) => !item.main)
				}
				setPools(data)
				setLoadingPools(false)
				return data
			} else {
				let promises = [API.request({ url: `pools/v2/all?low_liquidity=${lowLiquidity}`, type: "get" })]
				if (poolsAPR.length === 0) {
					promises.push(API.request({ url: `apr/v2/all`, type: "get" }))
				}
				let responses = await Promise.all(promises)
				let responsesPools = responses[0].data
				let responsesAPR = responses[1].data
				let data = Object.keys(responsesPools).map((key) => {
					let row = responsesPools[key]
					let apr = null
					let indexAPR = getInclude(responsesAPR, (apr) => {
						return apr.pool_id + "" === key
					})
					if (indexAPR !== -1) {
						apr = { display: { total: 0, internal: 0, external: 0 } }

						responsesAPR[indexAPR].apr_list.forEach((aprItem) => {
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
									apr.internal.token = token
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
									apr.external.token = token
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
						liquidity: row[0].liquidity,
						liquidity24hChange: row[0].liquidity_24h_change,
						volume7d: row[0].volume_7d,
						volume24h: row[0].volume_24h,
						volume24hChange: row[0].volume_24h_change,
						fees: parseFloat(row[0].fees),
						apr,
						main,
					}
					return pool
				})
				setAllPools(data)
				if (settings.type === "app") {
					data = data.filter((item) => item.main)
				} else {
					data = data.filter((item) => !item.main)
				}
				setPools(data)
				setLoadingPools(false)
				return data
			}
		},
		[allTokens, settings.type]
	)

	const getLiquidityChartPool = useCallback(async ({ poolId, range = "d" }) => {
		setLoadingPoolChart(true)
		if (
			saveDataChart.current[getName("liquidity", range, poolId)] &&
			saveDataChart.current[getName("liquidity", range, poolId)].length > 0
		) {
			setLoadingPoolChart(false)
			return saveDataChart.current[getName("liquidity", range, poolId)]
		} else {
			let response = await API.request({
				url: `pools/v2/liquidity/${poolId}/chart`,
				type: "get",
			})
			let data = response.data

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

			saveDataChart.current = { ...saveDataChart.current, [getName("liquidity", "d", poolId)]: data }
			saveDataChart.current = { ...saveDataChart.current, [getName("liquidity", "w", poolId)]: dataW }
			saveDataChart.current = { ...saveDataChart.current, [getName("liquidity", "m", poolId)]: dataM }
			setLoadingPoolChart(false)
			if (range === "d") return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	const getVolumeChartPool = useCallback(async ({ poolId, range = "d" }) => {
		setLoadingPoolChart(true)
		if (
			saveDataChart.current[getName("volume", range, poolId)] &&
			saveDataChart.current[getName("volume", range, poolId)].length > 0
		) {
			setLoadingPoolChart(false)
			return saveDataChart.current[getName("volume", range, poolId)]
		} else {
			let response = await API.request({
				url: `pools/v2/volume/${poolId}/chart`,
				type: "get",
			})
			let data = response.data

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
			saveDataChart.current = { ...saveDataChart.current, [getName("volume", "d", poolId)]: data }
			saveDataChart.current = { ...saveDataChart.current, [getName("volume", "w", poolId)]: dataW }
			saveDataChart.current = { ...saveDataChart.current, [getName("volume", "m", poolId)]: dataM }
			setLoadingPoolChart(false)
			if (range === "d") return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	const getPoolData = useCallback(async (poolId) => {
		setLoadingPool(true)
		let response = await API.request({
			url: `pools/v2/${poolId}`,
			type: "get",
		})
		setLoadingPool(false)
		return response.data
	}, [])

	useEffect(() => {
		let fetch = async () => {
			if (allTokens && allTokens.length > 0) {
				setLoadingPools(false)
				getPools({})
			}
		}
		fetch()
	}, [allTokens, settings.type])

	return (
		<PoolsV2Context.Provider
			value={{
				pools,
				getPools,
				loadingPools,
				getPoolData,
				loadingPool,
				loadingPoolChart,
				getChartPool,
				getVolumeChartPool,
				getLiquidityChartPool,
				getTrxPool,
				loadingTrx,
				allPools,
			}}
		>
			{children}
		</PoolsV2Context.Provider>
	)
}
