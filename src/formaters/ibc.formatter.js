export const MIN_CONGESTED = 5
export const MIN_BLOCKED = 20

export const defaultIbc = { ibcCouple: [], ibc: [], statusNormal: 0, statusCongested: 0, statusBlocked: 0 }
export const formatIbc = (data) => {
	let res = { ...defaultIbc }
	let ibcCouple = []
	let statusNormal = 0
	let statusCongested = 0
	let statusBlocked = 0

	let sourceMap = {}

	data.forEach((ibc, index) => {
		let id = ibc.source
		if (ibc.source === "osmosis-1") id = ibc.destination

		if (sourceMap[id]) {
			sourceMap[id].push(ibc)
		} else {
			sourceMap[id] = [ibc]
		}

		if (ibc.duration_minutes < MIN_CONGESTED) {
			statusNormal++
		} else if (ibc.duration_minutes < MIN_BLOCKED) {
			statusCongested++
		} else {
			statusBlocked++
		}
	})
	Object.keys(sourceMap).forEach((SourceKey) => {
		if (sourceMap[SourceKey].length > 1) {
			ibcCouple.push([...sourceMap[SourceKey]])
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
