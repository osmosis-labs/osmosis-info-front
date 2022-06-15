import { formatTokenName } from "../helpers/helpers"

export const defaultMetrics = {
	osmosPrice: 0,
	osmosChange24h: 0,
	nbToken: 0,
	volume24h: 0,
	volume24hChange: 0,
	liquidityUSD: 0,
	liquidityUSD24h: 0,
	liquidityAtom: 0,
	liquidityAtom24h: 0,
	liquidityOsmo: 0,
	liquidityOsmo24h: 0,
}
export const formatMetrics = (data) => {
	let res = { ...defaultMetrics }
	res.osmosPrice = data.osmo_price
	res.osmosChange24h = data.osmo_change_24h
	res.nbToken = data.nb_tokens
	res.volume24h = data.volume_24h
	res.volume24hChange = data.volume_24h_change
	res.liquidityUSD = data.liquidity_usd
	res.liquidityUSD24h = data.liquidity_usd_24h
	res.liquidityAtom = data.liquidity_atom
	res.liquidityAtom24h = data.liquidity_atom_24h
	res.liquidityOsmo = data.liquidity_osmo
	res.liquidityOsmo24h = data.liquidity_osmo_24h
	return res
}

export const defaultTop = []
export const formatTop = (data, main) => {
	let res = []
	data.forEach((token) => {
		if (main) {
			if (token.main) {
				res.push({ ...token, symbolDisplay: formatTokenName(token.symbol) })
			}
		} else {
			res.push({ ...token, symbolDisplay: formatTokenName(token.symbol) })
		}
	})
	return res
}
