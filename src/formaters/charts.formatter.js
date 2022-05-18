import { getWeekNumber, timeToDateUTC } from "../helpers/helpers"

export const defaultLiquidityChart = { d: [], w: [], m: [] }
export const formatLiquidityChart = (data) => {
	let liquidityW = []
	let currentWeek = { time: data[0].time, value: 0, value_atom: 0, value_osmo: 0 }
	let liquidityM = []
	let currentMonth = { time: data[0].time, value: 0, value_atom: 0, value_osmo: 0 }
	data.forEach((item) => {
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
	return { d: data, w: liquidityW, m: liquidityM }
}

export const defaultVolumeChart = { d: [], w: [], m: [] }
export const formatVolumeChart = (data) => {
	let volumeW = []
	let currentWeek = { time: data[0].time, value: 0 }
	let volumeM = []
	let currentMonth = { time: data[0].time, value: 0 }
	data.forEach((item) => {
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
	return { d: data, w: volumeW, m: volumeM }
}
