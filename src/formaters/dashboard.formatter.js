import { formatTokenName, getDaysInMonth } from "../helpers/helpers"

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
