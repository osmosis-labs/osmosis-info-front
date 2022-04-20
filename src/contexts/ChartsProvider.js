import { createContext, useContext, useEffect, useState } from "react"
import API from "../helpers/API"
import { getWeekNumber, timeToDateUTC } from "../helpers/helpers"
const ChartsContext = createContext()

export const useCharts = () => useContext(ChartsContext)

export const ChartsProvider = ({ children }) => {
	const [dataLiquidityD, setDataLiquidityD] = useState([]) //useSessionStorage("dataLiquidity", []);
	const [dataLiquidityW, setDataLiquidityW] = useState([]) //useSessionStorage("dataLiquidity", []);
	const [dataLiquidityM, setDataLiquidityM] = useState([]) //useSessionStorage("dataLiquidity", []);
	const [dataVolumeD, setDataVolumeD] = useState([]) //useSessionStorage("dataVolume", []);
	const [dataVolumeW, setDataVolumeW] = useState([]) //useSessionStorage("dataVolume", []);
	const [dataVolumeM, setDataVolumeM] = useState([]) //useSessionStorage("dataVolume", []);
	const [loadingData, setLoadingData] = useState(false)

	useEffect(() => {
		let fetch = async () => {
			// get all Charts from server API
			let promises = [
				API.request({ url: "liquidity/v2/historical/chart", type: "get" }),
				API.request({ url: "volume/v2/historical/chart", type: "get" }),
				API.request({ url: "volume/v2/actual", type: "get" }),
				API.request({ url: "liquidity/v2/actual", type: "get" }),
			]
			let results = await Promise.all(promises)
			let liquidity = results[0].data
			let volume = results[1].data
			volume.push(results[2].data)
			setLoadingData(false)
			setDataLiquidityD(liquidity)
			setDataVolumeD(volume)

			// Aggregate by week and month for volume
			let volumeW = []
			let currentWeek = { time: volume[0].time, value: 0 }
			let volumeM = []
			let currentMonth = { time: volume[0].time, value: 0 }
			volume.forEach((item) => {
				if (timeToDateUTC(item.time).getMonth() === timeToDateUTC(currentMonth.time).getMonth()) {
					currentMonth.value += item.value
				} else {
					volumeM.push(currentMonth)
					currentMonth = { time: item.time, value: item.value }
				}
				let currentDate = timeToDateUTC(item.time)
				let dateOfCurrentWeek = timeToDateUTC(currentWeek.time)
				let numberOfWeek = getWeekNumber(currentDate)
				let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
				if (numberOfWeek === numberOfWeekOfCurrentWeek) {
					currentWeek.value += item.value
				} else {
					volumeW.push(currentWeek)
					currentWeek = { time: item.time, value: item.value }
				}
			})
			volumeW.push(currentWeek)
			volumeM.push(currentMonth)

			setDataVolumeM(volumeM)
			setDataVolumeW(volumeW)

			// Aggregate by week and month for liquidity
			let liquidityW = []
			currentWeek = { time: liquidity[0].time, value: 0, value_atom: 0, value_osmo: 0 }
			let liquidityM = []
			currentMonth = { time: liquidity[0].time, value: 0, value_atom: 0, value_osmo: 0 }
			liquidity.forEach((item) => {
				let currentDate = timeToDateUTC(item.time)
				let dateMonth = timeToDateUTC(currentMonth.time)
				if (currentDate.getMonth() === dateMonth.getMonth()) {
					currentMonth.value = item.value
					currentMonth.value_atom = item.value_atom
					currentMonth.value_osmo = item.value_osmo
				} else {
					liquidityM.push(currentMonth)
					currentMonth = {
						time: item.time,
						value: item.value,
						value_atom: item.value_atom,
						value_osmo: item.value_osmo,
					}
				}
				let dateOfCurrentWeek = timeToDateUTC(currentWeek.time)
				let numberOfWeek = getWeekNumber(currentDate)
				let numberOfWeekOfCurrentWeek = getWeekNumber(dateOfCurrentWeek)
				if (numberOfWeek === numberOfWeekOfCurrentWeek) {
					currentWeek.value = item.value
					currentWeek.value_atom = item.value_atom
					currentWeek.value_osmo = item.value_osmo
				} else {
					liquidityW.push(currentWeek)
					currentWeek = { time: item.time, value: item.value, value_atom: item.value_atom, value_osmo: item.value_osmo }
				}
			})
			liquidityW.push(currentWeek)
			liquidityM.push(currentMonth)
			setDataLiquidityM(liquidityM)
			setDataLiquidityW(liquidityW)
		}
		setLoadingData(true)
		fetch()
	}, [])

	return (
		<ChartsContext.Provider
			value={{ dataLiquidityD, dataLiquidityW, dataLiquidityM, dataVolumeD, dataVolumeW, dataVolumeM, loadingData }}
		>
			{children}
		</ChartsContext.Provider>
	)
}
