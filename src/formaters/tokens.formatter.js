import { formatTokenName } from "../helpers/helpers"

export const defaultTokens = { all: [], main: [], frontier: [], current: [] }
export const formatTokens = (data) => {
	let res = { ...defaultTokens }

	data.sort((a, b) => {
		if (a.liquidity > b.liquidity) return -1
		if (a.liquidity < b.liquidity) return 1
		return 0
	})

	data.forEach((row, index) => {
		let token = {
			id: index + 1,
			denom: row.denom,
			price: row.price,
			symbol: row.symbol,
			symbolDisplay: formatTokenName(row.symbol),
			liquidity: row.liquidity,
			liquidity24hChange: row.liquidity_24h_change,
			volume24h: row.volume_24h,
			volume24hChange: row.volume_24h_change,
			name: row.name,
			main: row.main,
			price24hChange: row.price_24h_change,
		}
		if (token.main) {
			res.main.push(token)
		} else {
			res.frontier.push(token)
		}
		res.all.push(token)
	})

	return res
}

export const defaultToken = {
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
}
export const formatToken = (data) => {
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
	return token
}

export const defaultTrxToken = []
export const formatTrxToken = (data) => {}

export const defaultVolumeToken = []
export const formatVolumeToken = (data) => {}

export const defaultLiquidityToken = []
export const formatLiquidityToken = (data) => {}

export const defaulHistoricalToken = []
export const formaHistoricalToken = (data) => {}