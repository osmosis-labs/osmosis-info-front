import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import { getWeekNumber, timeToDateUTC } from "../helpers/helpers"
const PoolsV2Context = createContext()

export const usePoolsV2 = () => useContext(PoolsV2Context)

export const PoolsV2Provider = ({ children }) => {
	const [pools, setPools] = useState([])
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

	const getTrxPool = async ({ poolId, onlySuccess = true, limit = 10, offset = 0 }) => {
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
				url: `https://api-osmosis-chain.imperator.co/swap/v1/pool/${poolId}?only_success=${onlySuccess}&limit=${limit}&offset=${offset}`,
				type: "get",
				useCompleteURL: true,
			})
			dayjs.extend(relativeTime)
			data = response.data.map((trx) => {
				let time = new Date(trx.time_tx)
				let options = { month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }
				let timeDisplay = new Intl.DateTimeFormat("en-US", options).format(time)
				let addressDisplay = trx.address.substring(0, 5) + "..." + trx.address.substring(trx.address.length - 5)
				let hashDisplay = trx.tx_hash.substring(0, 5) + "..." + trx.tx_hash.substring(trx.tx_hash.length - 5)
				let timeRelative = {
					value: Date.now() - time,
					display: dayjs(trx.time_tx).fromNow(true),
				}
				return {
					time: { value: time, display: timeDisplay },
					hash: { value: trx.tx_hash, display: hashDisplay },
					address: { value: trx.address, display: addressDisplay },
					tokenIn: { value: trx.amount_in, symbol: trx.symbol_in },
					tokenOut: { value: trx.amount_out, symbol: trx.symbol_out },
					usd: trx.value_usd,
					timeRelative,
				}
			})
			saveDataChart.current = { ...saveDataChart.current, [getName("trx", poolId, limit, offset)]: data }
		}
		setLoadingTrx(false)
		return data
	}

	const getPools = useCallback(async ({ lowLiquidity = false }) => {
		setLoadingPools(true)
		if (
			saveData.current[getName("pools", lowLiquidity)] &&
			saveData.current[getName("pools", lowLiquidity)].length > 0
		) {
			let data = saveData.current[getName("pools", lowLiquidity)]
			setPools(data)
			setLoadingPools(false)
			return data
		} else {
			let response = await API.request({ url: `pools/v2/all?low_liquidity=${lowLiquidity}`, type: "get" })
			let data = Object.keys(response.data).map((key) => {
				let row = response.data[key]
				return {
					id: key,
					name: row.reduce((acc, currentValue) => {
						let symbolName = currentValue.symbol.length === 0 ? currentValue.denom : currentValue.symbol
						return `${acc}${acc.length > 0 ? "-" : ""}${symbolName}`
					}, ""),
					liquidity: row[0].liquidity,
					liquidity24hChange: row[0].liquidity_24h_change,
					volume7d: row[0].volume_7d,
					volume24h: row[0].volume_24h,
					volume24hChange: row[0].volume_24h_change,
					fees: row[0].fees,
				}
			})
			setPools(data)
			setLoadingPools(false)
			return data
		}
	}, [])

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
			setLoadingPools(false)
			getPools({})
		}
		fetch()
	}, [])

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
			}}
		>
			{children}
		</PoolsV2Context.Provider>
	)
}
