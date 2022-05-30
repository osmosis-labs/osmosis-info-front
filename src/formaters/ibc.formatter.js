export const MIN_CONGESTED = 5
export const MIN_BLOCKED = 20

export const defaultIbc = { ibcCouple: [], ibc: [], statusNormal: 0, statusCongested: 0, statusBlocked: 0 }
export const formatIbc = (data) => {
	let res = { ...defaultIbc }
	let ibcCouple = []
	let statusNormal = 0
	let statusCongested = 0
	let statusBlocked = 0
	let currentCouple = []

	data.forEach((ibc) => {
		currentCouple.push(ibc)

		if (currentCouple.length === 2) {
			ibcCouple.push(currentCouple)
			currentCouple = []
		}

		if (ibc.duration_minutes < MIN_CONGESTED) {
			statusNormal++
		} else if (ibc.duration_minutes < MIN_BLOCKED) {
			statusCongested++
		} else {
			statusBlocked++
		}
	})
	res.statusNormal = statusNormal
	res.statusCongested = statusCongested
	res.statusBlocked = statusBlocked
	ibcCouple.sort((a, b) => {
		let aLiquidity = a[0].token_liquidity + a[1].token_liquidity
		let bLiquidity = b[0].token_liquidity + b[1].token_liquidity
		return bLiquidity - aLiquidity
	})
	res.ibcCouple = ibcCouple
	res.ibc = data
	return res
}
