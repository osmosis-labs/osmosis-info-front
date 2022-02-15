import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import API from "../helpers/API"
import { getWeekNumber, timeToDateUTC } from "../helpers/helpers"
const PoolsContext = createContext()

export const usePools = () => useContext(PoolsContext)

export const PoolsProvider = ({ children }) => {
	const [pools, setPools] = useState([])
	const [loadingPools, setLoadingPools] = useState(false)
	const [loadingPool, setLoadingPool] = useState(false)
	const [loadingChartPool, setLoadingChartPool] = useState(false)
	const [loadingLiquidityPool, setLoadingLiquidityPool] = useState(false)
	const [loadingVolumePool, setLoadingVolumePool] = useState(false)

	const saveDataChart = useRef({})

	const getName = (chartType, range = "-", poolId = "-") => {
		return chartType + "-" + range + "-" + poolId
	}

	const getNamePrice = (chartType, poolId = "-", denomIn = "-", denomOut = "-", range = "-") => {
		return chartType + "-" + poolId + "-" + denomIn + "-" + denomOut + "-" + range
	}

	const getPoolData = useCallback(async (poolId) => {
		setLoadingPool(true)
		let response = await API.request({
			url: `pools/v1/${poolId}`,
			type: "get",
		})
		setLoadingPool(false)
		return response.data
	}, [])

	const getChartPool = useCallback(async ({ poolId, denomIn, denomOut, range }) => {
		if (range === "all") range = "50y"
		setLoadingChartPool(true)
		if (
			saveDataChart.current[getNamePrice("price", poolId, denomIn, denomOut, range)] &&
			saveDataChart.current[getNamePrice("price", poolId, denomIn, denomOut, range)].length > 0
		) {
			setLoadingChartPool(false)
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
			setLoadingChartPool(false)
			return response.data
		}
	}, [])

	const getLiquidityChartPool = useCallback(async ({ poolId, range = "d" }) => {
		setLoadingLiquidityPool(true)
		if (
			saveDataChart.current[getName("liquidity", range, poolId)] &&
			saveDataChart.current[getName("liquidity", range, poolId)].length > 0
		) {
			setLoadingLiquidityPool(false)
			return saveDataChart.current[getName("liquidity", range, poolId)]
		} else {
			let response = await API.request({
				url: `pools/v1/liquidity/${poolId}/chart`,
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
			setLoadingLiquidityPool(false)
			if (range === "d") return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	const getVolumeChartPool = useCallback(async ({ poolId, range = "d" }) => {
		setLoadingVolumePool(true)
		if (
			saveDataChart.current[getName("volume", range, poolId)] &&
			saveDataChart.current[getName("volume", range, poolId)].length > 0
		) {
			setLoadingVolumePool(false)
			return saveDataChart.current[getName("volume", range, poolId)]
		} else {
			let response = await API.request({
				url: `pools/v1/volume/${poolId}/chart`,
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
			setLoadingVolumePool(false)
			if (range === "d") return data
			else if (range === "w") return dataW
			else if (range === "m") return dataM
		}
	}, [])

	useEffect(() => {
		let fetch = async () => {
			// get all pools from server API
			setLoadingPools(true)
			let response = await API.request({ url: "pools/v1/all", type: "get" })
			setLoadingPools(false)
			setPools(
				Object.keys(response.data).map((key) => {
					let row = response.data[key]
					return {
						id: key,
						name: row.reduce((acc, currentValue) => {
							let symbolName = currentValue.symbol.length === 0 ? currentValue.denom : currentValue.symbol
							return `${acc}${acc.length > 0 ? "-" : ""}${symbolName}`
						}, ""),
						liquidity: row[0].liquidity,
						volume_7d: row[0].volume_7d,
						volume_24h: row[0].volume_24h,
					}
				})
			)
		}
		fetch()
	}, [])

	return (
		<PoolsContext.Provider
			value={{
				pools,
				getPoolData,
				getChartPool,
				getVolumeChartPool,
				getLiquidityChartPool,
				loadingPools,
				loadingPool,
				loadingChartPool,
				loadingLiquidityPool,
				loadingVolumePool,
			}}
		>
			{children}
		</PoolsContext.Provider>
	)
}
