export const formatAssets = (data) => {
	let res = {}

	data.assets.forEach((asset, index) => {
		if (asset.keywords != undefined) {

			let currentAsset = {
				description: asset.description,
				base: asset.base,
				name: asset.name,
				display: asset.display,
				symbol: asset.symbol,
				coingeckoId: asset.coingecko_id,
				image: asset.logo_URIs.png,
				denomUnits: asset.denom_units,
				main: asset.keywords.includes('osmosis-main')
			}

			res[asset.symbol.toUpperCase()] = currentAsset
			if (asset.symbol.includes(".axl")) {
				let name = asset.symbol.split(".")[0]
				res[name] = currentAsset
			}

			currentAsset.denomUnits.forEach((denomUnit, index) => {
				res[denomUnit.denom] = currentAsset
			})
		}
	})
	return res
}
